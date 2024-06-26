#include "./dicomfile.h"
 
DicomFile::DicomFile(QObject *parent) : QObject(parent),m_diconde_file_byte_count(0)
  ,m_is_tag_e07f_1000(false),m_pixel_data_length(0),m_is_tag_rows(false),m_rows(0)
  ,m_is_tag_columns(false),m_columns(0),m_p_buf_pixel_data(nullptr)
  ,m_dicom_vr_type(EnumParamter::DICOM_VR_TYPE::VR_TYPE_NULL)
{
    m_f_map.clear();
    //若需要取DICONDE中保存的图像信息,则可以打开需要的部份
    m_f_map.insert(std::make_pair(DICOM_TAG_0028_0010,dicom_tag_0028_0010));    //图像的高度
    m_f_map.insert(std::make_pair(DICOM_TAG_0028_0011,dicom_tag_0028_0011));    //图像的宽度
    m_f_map.insert(std::make_pair(DICOM_TAG_7FE0_0010,dicom_tag_7FE0_0010));    //图像数据TAG
}
DicomFile::~DicomFile()
{
    free(m_p_buf_pixel_data); m_p_buf_pixel_data=nullptr;
}
int DicomFile::get_pixel_column(){return m_columns;}
int DicomFile::get_pixel_rows(){return  m_rows;}
uchar* DicomFile::get_pixel_data(){return m_p_buf_pixel_data;}
//
//DICOM文件的图像像素数据标识符
bool DicomFile::dicom_tag_7FE0_0010(void* arg)
{
    char c_keyword[128]; memset(c_keyword,0x00,sizeof(c_keyword));
    DicomFile* p_dicom_file = (DicomFile*)arg;
    p_dicom_file->m_is_tag_e07f_1000 = true;
 
    snprintf(c_keyword,sizeof(c_keyword),"%s",DICOM_KEYWORD_7FE0_0010);
    memcpy(p_dicom_file->m_dicom_file_meta_elements.keyword,c_keyword,sizeof(c_keyword));
    qDebug("step 2:DICOM_KEYWORD_7FE0_0010=%s",p_dicom_file->m_dicom_file_meta_elements.keyword);
    return true;
}
 
//DICOM文件的像素宽度标记
bool DicomFile::dicom_tag_0028_0011(void* arg)
{
    char c_keyword[128]; memset(c_keyword,0x00,sizeof(c_keyword));
    DicomFile* p_dicom_file = (DicomFile*)arg;
    p_dicom_file->m_is_tag_columns=true;
 
    snprintf(c_keyword,sizeof(c_keyword),"%s",DICOM_KEYWORD_0028_0011);
    memcpy(p_dicom_file->m_dicom_file_meta_elements.keyword,c_keyword,sizeof(c_keyword));
    qDebug("step 2:DICOM_KEYWORD_0028_0011=%s",p_dicom_file->m_dicom_file_meta_elements.keyword);
    return true;
}
 
//DICOM文件的像素高度标记
bool DicomFile::dicom_tag_0028_0010(void* arg)
{
    char c_keyword[128]; memset(c_keyword,0x00,sizeof(c_keyword));
    DicomFile* p_dicom_file = (DicomFile*)arg;
    p_dicom_file->m_is_tag_rows=true;
 
    snprintf(c_keyword,sizeof(c_keyword),"%s",DICOM_KEYWORD_0028_0010);
    memcpy(p_dicom_file->m_dicom_file_meta_elements.keyword,c_keyword,sizeof(c_keyword));
    qDebug("step 2:DICOM_KEYWORD_0028_0010=%s",p_dicom_file->m_dicom_file_meta_elements.keyword);
    return true;
}
//
bool DicomFile::read_dicom(QString e)
{
    bool ret_val=false;
    m_diconde_file_byte_count = 0;
    m_is_tag_e07f_1000 =false;  m_pixel_data_length=0;
    m_is_tag_rows=false;        m_rows=0;
    m_is_tag_columns=false;     m_columns=0;
    m_p_buf_pixel_data=nullptr;
    FILE *p_file_diconde = fopen(e.toLatin1().data(), "rb");
    if (nullptr == p_file_diconde)
    {
        qDebug("step 0 :read_diconde nullptr == p_file_diconde error file=%s.",e.toLatin1().data());
        return ret_val;
    }
    if(false == get_is_valid_diconde_file(p_file_diconde))
    {
        qDebug("step 1 : dicom file error!"); return ret_val;
    }
    memset(&m_dicm_file_meta_elements_list,0x00,sizeof(m_dicm_file_meta_elements_list));
 
    bool is_need_save_element = false;    int circulation = -1;
    while (!m_is_tag_e07f_1000)
    {
        is_need_save_element = false;
        memset(&m_dicom_file_meta_elements,0x00,sizeof(m_dicom_file_meta_elements));
 
        is_need_save_element = dicom_data_element_tag(p_file_diconde);
        dicom_value_representation(p_file_diconde);
        dicom_value_length(p_file_diconde);
        dicom_value_field(p_file_diconde);
 
        if(is_need_save_element)
        {
            ++circulation;  if(64 <= circulation){ qDebug("Error: Max elements is %d.",circulation); break;}
            m_dicm_file_meta_elements_list.elements_length = m_dicm_file_meta_elements_list.elements_length+1;
            m_dicm_file_meta_elements_list.elements[circulation]=m_dicom_file_meta_elements;
        }
 
        if(m_is_tag_e07f_1000 && get_pixel_data(p_file_diconde))
        {
            ret_val=true;
        }
    }
 
#if DIYE_READ_DICOM_DETIAL
    for(int i= 0 ; i <m_dicm_file_meta_elements_list.elements_length;i++)
    {
        qDebug("i=%d, group[%02x%02x], element[%02x%02x], vr[%02x%02x] ,value_lenght=%d"
               ",value_byte_lenght[%02x%02x%02x%02x], value_field=%s"
               ,i,m_dicm_file_meta_elements_list.elements[i].group[0]
                ,m_dicm_file_meta_elements_list.elements[i].group[1]
                ,m_dicm_file_meta_elements_list.elements[i].element[0]
                ,m_dicm_file_meta_elements_list.elements[i].element[1]
                ,m_dicm_file_meta_elements_list.elements[i].vr[0]
                ,m_dicm_file_meta_elements_list.elements[i].vr[1]
                ,m_dicm_file_meta_elements_list.elements[i].value_lenght
                ,m_dicm_file_meta_elements_list.elements[i].value_byte_lenght[0]
                ,m_dicm_file_meta_elements_list.elements[i].value_byte_lenght[1]
                ,m_dicm_file_meta_elements_list.elements[i].value_byte_lenght[2]
                ,m_dicm_file_meta_elements_list.elements[i].value_byte_lenght[3]
                ,m_dicm_file_meta_elements_list.elements[i].value_field);
    }
#endif
    clearerr(p_file_diconde);
    fclose(p_file_diconde);
    qDebug("p_file_diconde=%s; byte count=%d.",e.toLatin1().data(),m_diconde_file_byte_count);
    return  ret_val;
}
/**
 * @brief An ordered pair of 16-bit unsigned integers representing the Group Number followed by Element Number
 * @param p_file_diconde
 * @return true:
 */
bool DicomFile::dicom_data_element_tag(FILE *p_file_diconde)
{
    bool ret_val = false;
 
    size_t count = 0;
    int fixed_length = 4;       uchar buf[fixed_length];
    char tag[32];               string key;
 
    fixed_length = 4; buf[fixed_length]; memset(buf,0x00,sizeof(buf));
    if(fixed_length == (int)(count = fread(buf, 1, fixed_length, p_file_diconde)))      //tag: Registry of DICOM File Meta Elements
    {
        m_diconde_file_byte_count = m_diconde_file_byte_count + count;
 
        memset(tag,0x00,sizeof(tag));//buf:4个字节串 02 00 00 02-->dicom_tag_0002_0200
        sprintf(tag, "dicom_tag_%02X%02X_%02X%02X",buf[1],buf[0],buf[3],buf[2]);
        key = (string)tag;
 
#if DIYE_READ_DICOM_DETIAL
        qDebug("step 2: [%s; raw_data: %02X %02X %02X %02X],m_diconde_file_byte_count=%d",tag,buf[0],buf[1],buf[2],buf[3],m_diconde_file_byte_count);
        if(m_f_map.find(key) == m_f_map.end())
        {
            qDebug("step 2: data_element_tag={%s} isn't exist in this programe.", key.c_str());
        }
#endif
        if(m_f_map.find(key) != m_f_map.end())
        {
            m_f_map[key](this); ret_val = true;
        }
 
        m_dicom_file_meta_elements.group[0]=buf[0];
        m_dicom_file_meta_elements.group[1]=buf[1];
        m_dicom_file_meta_elements.element[0]=buf[2];
        m_dicom_file_meta_elements.element[1]=buf[3];
    }
    return  ret_val;
}
 
bool DicomFile::dicom_value_representation(FILE *p_file_diconde)
{
    bool ret_val = false;
    m_dicom_vr_type = EnumParamter::DICOM_VR_TYPE::VR_TYPE_NULL;
    size_t count = 0; int fixed_length = 2;
    uchar buf[fixed_length];memset(buf,0x00,sizeof(buf));
    if(fixed_length == (int)(count = fread(buf, 1, fixed_length, p_file_diconde)))
    {
        ret_val = true;
        m_diconde_file_byte_count = m_diconde_file_byte_count + count;
        if(is_data_structures_and_encoding_vr_table_7_1_2(buf))
        {
            m_dicom_vr_type = EnumParamter::DICOM_VR_TYPE::VR_TYPE_EXPLICIT_TABLE_7_1_2;
        }
        else if(is_data_structures_and_encoding_vr_table_7_1_1(buf,p_file_diconde))
        {
            m_dicom_vr_type = EnumParamter::DICOM_VR_TYPE::VR_TYPE_EXPLICIT_TABLE_7_1_1;
        }
        else
        {
            m_dicom_vr_type = EnumParamter::DICOM_VR_TYPE::VR_TYPE_IMPLICIT_TABLE_7_1_3;
            m_dicom_file_meta_elements.value_lenght = 4;
            for(int i = 0 ; i< fixed_length; i++)
            {
                m_dicom_file_meta_elements.value_byte_lenght[i]=buf[i];
            }
        }
    }
    return ret_val;
}
 
bool DicomFile::dicom_value_length(FILE *p_file_diconde)
{
    bool ret_val = false;
    size_t count = 0;
    int fixed_length = m_dicom_file_meta_elements.value_lenght;
    if(EnumParamter::DICOM_VR_TYPE::VR_TYPE_IMPLICIT_TABLE_7_1_3 == m_dicom_vr_type){fixed_length = 2;}
 
    uchar buf[fixed_length];memset(buf,0x00,sizeof(buf));
 
    if(fixed_length == (int)(count = fread(buf, 1, fixed_length, p_file_diconde)))
    {
        m_diconde_file_byte_count = m_diconde_file_byte_count + count;
        if(EnumParamter::DICOM_VR_TYPE::VR_TYPE_IMPLICIT_TABLE_7_1_3 == m_dicom_vr_type)
        {
            for(int i = 0 ; i<fixed_length;i++)
            {
                m_dicom_file_meta_elements.value_byte_lenght[2+i]=buf[i];
            }
#if DIYE_READ_DICOM_DETIAL
            qDebug("step 4: value_byte_lenght =[0]=0x%02x,[1]=0x%02x,[2]=0x%02x,[3]=0x%02x"
                   ,m_dicom_file_meta_elements.value_byte_lenght[0]
                    ,m_dicom_file_meta_elements.value_byte_lenght[1]
                    ,m_dicom_file_meta_elements.value_byte_lenght[2]
                    ,m_dicom_file_meta_elements.value_byte_lenght[3]);
#endif
        }
        else
        {
            for(int i = 0 ; i<fixed_length;i++)
            {
                m_dicom_file_meta_elements.value_byte_lenght[i]=buf[i];
#if DIYE_READ_DICOM_DETIAL
                qDebug("step 4:value_byte_lenght=0x%02x; m_diconde_file_byte_count=%d",buf[i],m_diconde_file_byte_count);
#endif
            }
        }
        ret_val = true;
    }
 
    return  ret_val;
}
 
bool DicomFile::dicom_value_field(FILE *p_file_diconde)
{
    bool ret_val = false;
    size_t count = 0;
    int fixed_length = 0;
    if(2 == m_dicom_file_meta_elements.value_lenght)
    {
        fixed_length = (int)((m_dicom_file_meta_elements.value_byte_lenght[0] & 0xFF)
                | ((m_dicom_file_meta_elements.value_byte_lenght[1] & 0xFF) << 8));
    }
    else if(4 == m_dicom_file_meta_elements.value_lenght)
    {
        fixed_length = (int)((m_dicom_file_meta_elements.value_byte_lenght[0] & 0xFF)
                | ((m_dicom_file_meta_elements.value_byte_lenght[1] & 0xFF) << 8)
                | ((m_dicom_file_meta_elements.value_byte_lenght[2] & 0xFF) << 16)
                | ((m_dicom_file_meta_elements.value_byte_lenght[3] & 0xFF) << 24));
    }
 
#if DIYE_READ_DICOM_DETIAL
    qDebug("step 5:dicom_value_field_lenght=%d",fixed_length);
#endif
 
    if(m_is_tag_e07f_1000)
    {
        m_pixel_data_length = fixed_length;                     //DICOM文件像素值数据长度
        return ret_val = true;
    }
    else if(!m_is_tag_e07f_1000 && (INT_256 < fixed_length))    //此字段存贮的字符串长度过大,丢弃处理!若需要可另处理
    {
        uchar buf[fixed_length]; memset(buf,0x00,sizeof(buf));
        count = fread(buf, 1, fixed_length, p_file_diconde);
        qDebug("DICOM Value field[fixed_length=%d | count=%d] more than 256",fixed_length,(int)count);
        return ret_val;
    }
 
    if(0 < fixed_length )
    {
        uchar buf[fixed_length]; memset(buf,0x00,sizeof(buf));
        if(fixed_length == (int)(count = fread(buf, 1, fixed_length, p_file_diconde)))
        {
            ret_val = true;
            m_diconde_file_byte_count = m_diconde_file_byte_count + count;
 
            for(int i = 0 ; i<fixed_length;i++)
            {
                m_dicom_file_meta_elements.value_field[i]=buf[i];
#if DIYE_READ_DICOM_DETIAL
                qDebug("step 5:0x%02x; m_diconde_file_byte_count=%d",buf[i],m_diconde_file_byte_count);
#endif
            }
#if DIYE_READ_DICOM_DETIAL
            qDebug("step 5:value_field=%s", m_dicom_file_meta_elements.value_field);
#endif
            if(m_is_tag_rows)
            {
                m_is_tag_rows=false; m_rows = hex_to_int_little_endian(buf,0);
                qDebug("step 5:m_rows=%d", m_rows);
            }
            else if(m_is_tag_columns)
            {
                m_is_tag_columns=false; m_columns = hex_to_int_little_endian(buf,0);
                qDebug("step 5:m_columns=%d", m_columns);
            }
        }
    }
    else if(-1 == fixed_length &&
            EnumParamter::DICOM_VR_TYPE::VR_TYPE_IMPLICIT_TABLE_7_1_3 == m_dicom_vr_type)
    {
        vector<uchar> vector_buf; //用 vector 来存储
        vector_buf.clear();
 
        int sum = 0 ;
        size_t count = 0; int fixed_length = 1;
        uchar temp[4]; memset(temp,0x00,sizeof(temp));
        while (true)
        {
            for(int i = 3; i > 0; i--){ temp[i] = temp[i-1];}
            if(fixed_length == (int)(count = fread(temp, 1, fixed_length, p_file_diconde)))
            {
                m_diconde_file_byte_count = m_diconde_file_byte_count + count;
                sum++;
                vector_buf.push_back(temp[0]);
#if DIYE_READ_DICOM_DETIAL
                qDebug("sum =%d : %02X %02X %02X %02X",sum,temp[0],temp[1],temp[2],temp[3]);
#endif
                if(0xE0 == temp[0] && 0xDD == temp[1] && 0xFF == temp[2] && 0xFE == temp[3])
                {
                    //参见《DICOM Part 5 Data Structures and Encoding.pdf》
                    //P53  Section:7.1-3. Data Element with Implicit VR     结合才能明白
                    //P56  Section:7.5 Nesting of Data Sets                 结合才能明白
                    fread(temp, 1, 4, p_file_diconde);//0x00 00 00 00 跟在 FE FF DD E0之后的固定格式
                    ret_val = true; break;
                }
            }
            else
            {
                qDebug("DICOM file formate error.");
                ret_val = false; break;
            }
        }
 
        if(ret_val)
        {
            fixed_length = vector_buf.size();
            for(int i = 0 ; i < fixed_length; i++)
            {
                m_dicom_file_meta_elements.value_field[i]=vector_buf[i];
#if DIYE_READ_DICOM_DETIAL
                qDebug("step 5:0x%02x; m_diconde_file_byte_count=%d",vector_buf[i],m_diconde_file_byte_count);
#endif
            }
            qDebug("step 5:value_field=%s", m_dicom_file_meta_elements.value_field);
        }
    }
 
    return  ret_val;
}
 
//DICOM Part 5 Data Structures and Encoding
//OB, OD, OF, OL, OV, OW, SQ and UN
bool DicomFile::is_data_structures_and_encoding_vr_table_7_1_1(const uchar* p_vr,FILE *p_file_diconde)
{
    bool ret_val = false;
    if((0x4F == p_vr[0] && 0x42 == p_vr[1])             //VR:OB
            || (0x4F == p_vr[0] && 0x44 == p_vr[1])     //VR:OD
            || (0x4F == p_vr[0] && 0x46 == p_vr[1])     //VR:OF
            || (0x4F == p_vr[0] && 0x4C == p_vr[1])     //VR:OL
            || (0x4F == p_vr[0] && 0x56 == p_vr[1])     //VR:OV
            || (0x4F == p_vr[0] && 0x57 == p_vr[1])     //VR:OW
            || (0x53 == p_vr[0] && 0x51 == p_vr[1])     //VR:SQ
            || (0x55 == p_vr[0] && 0x4E == p_vr[1])     //VR:UN
 
            || (0x55 == p_vr[0] && 0x43 == p_vr[1])     //VR:UC
            || (0x55 == p_vr[0] && 0x52 == p_vr[1])     //VR:UR
            || (0x55 == p_vr[0] && 0x54 == p_vr[1])     //VR:UT
            ){ret_val = true;}
 
    if(ret_val)
    {
        m_dicom_file_meta_elements.vr[0]=p_vr[0];
        m_dicom_file_meta_elements.vr[1]=p_vr[1];
        m_dicom_file_meta_elements.value_lenght = 4;
 
        //参见<<DICOM Part 5 Data Structures and Encoding.pdf>>Page53
        //表<Table 7.1-1. Data Element with Explicit VR other than as shown in Table 7.1-2>中字段VR保留
        int fixed_length = 2;     size_t count = 0;
        uchar buf[fixed_length]; memset(buf,0x00,sizeof(buf));
        count = fread(buf, 1, fixed_length, p_file_diconde);
        m_diconde_file_byte_count = m_diconde_file_byte_count + count;
#if DIYE_READ_DICOM_DETIAL
        qDebug("step 3 table_7_1_1:Reserved bytes [0x%02X][0x%02X]",buf[0],buf[1]);
        qDebug("step 3 table_7_1_1:vr is exist in table_7_1_1. vr[0]=0x%02x, vr[1]=0x%02x; m_diconde_file_byte_count=%d"
               ,m_dicom_file_meta_elements.vr[0], m_dicom_file_meta_elements.vr[1],m_diconde_file_byte_count);
#endif
    }
    else
    {
        m_dicom_file_meta_elements.value_lenght = 0;
#if DIYE_READ_DICOM_DETIAL
        qDebug("step 3 table_7_1_1:vr isn't exist in table_7_1_1. vr[0]=0x%02x, vr[1]=0x%02x; m_diconde_file_byte_count=%d"
               ,m_dicom_file_meta_elements.vr[0], m_dicom_file_meta_elements.vr[1],m_diconde_file_byte_count);
#endif
    }
    return  ret_val;
}
 
//参见<<DICOM Part 5 Data Structures and Encoding.pdf>>Page53
//AE, AS, AT, CS, DA, DS, DT, FL, FD, IS, LO, LT, PN, SH, SL, SS, ST, TM, UI, UL and US
//true:VR在table_7_1_2中存在,其值则有固定的值长底
bool DicomFile::is_data_structures_and_encoding_vr_table_7_1_2(const uchar* p_vr)
{
    bool ret_val = false;
    if((0x41 == p_vr[0] && 0x45 == p_vr[1])             //VR:AE
            || (0x41 == p_vr[0] && 0x53 == p_vr[1])     //VR:AS
            || (0x41 == p_vr[0] && 0x54 == p_vr[1])     //VR:AT
            || (0x43 == p_vr[0] && 0x53 == p_vr[1])     //VR:CS
            || (0x44 == p_vr[0] && 0x41 == p_vr[1])     //VR:DA
            || (0x44 == p_vr[0] && 0x53 == p_vr[1])     //VR:DS
            || (0x44 == p_vr[0] && 0x54 == p_vr[1])     //VR:DT
            || (0x46 == p_vr[0] && 0x4C == p_vr[1])     //VR:FL
            || (0x46 == p_vr[0] && 0x44 == p_vr[1])     //VR:FD
            || (0x49 == p_vr[0] && 0x53 == p_vr[1])     //VR:IS
            || (0x4C == p_vr[0] && 0x4F == p_vr[1])     //VR:LO
            || (0x4C == p_vr[0] && 0x54 == p_vr[1])     //VR:LT
            || (0x50 == p_vr[0] && 0x4E == p_vr[1])     //VR:PN
            || (0x53 == p_vr[0] && 0x48 == p_vr[1])     //VR:SH
            || (0x53 == p_vr[0] && 0x4C == p_vr[1])     //VR:SL
            || (0x53 == p_vr[0] && 0x53 == p_vr[1])     //VR:SS
            || (0x53 == p_vr[0] && 0x54 == p_vr[1])     //VR:ST
            || (0x54 == p_vr[0] && 0x4D == p_vr[1])     //VR:TM
            || (0x55 == p_vr[0] && 0x49 == p_vr[1])     //VR:UI
            || (0x55 == p_vr[0] && 0x4C == p_vr[1])     //VR:UL
            || (0x55 == p_vr[0] && 0x53 == p_vr[1])     //VR:US
            ){ ret_val = true; }
 
    if(ret_val)
    {
        m_dicom_file_meta_elements.vr[0]=p_vr[0];
        m_dicom_file_meta_elements.vr[1]=p_vr[1];
 
        m_dicom_file_meta_elements.value_lenght = 2;
#if DIYE_READ_DICOM_DETIAL
        qDebug("step 3 table_7_1_2:vr is exist in table_7_1_2. vr[0]=0x%02x, vr[1]=0x%02x; m_diconde_file_byte_count=%d"
               ,m_dicom_file_meta_elements.vr[0], m_dicom_file_meta_elements.vr[1],m_diconde_file_byte_count);
#endif
    }
    else
    {
        m_dicom_file_meta_elements.value_lenght = 0;
#if DIYE_READ_DICOM_DETIAL
        qDebug("step 3 table_7_1_2:vr isn't exist in table_7_1_2. vr[0]=0x%02x, vr[1]=0x%02x; m_diconde_file_byte_count=%d"
               ,m_dicom_file_meta_elements.vr[0], m_dicom_file_meta_elements.vr[1],m_diconde_file_byte_count);
#endif
    }
    return  ret_val;
}

bool DicomFile::get_pixel_data(FILE *p_file_diconde)
{
    bool ret_val = false;
    size_t count = 0;
    if(nullptr != m_p_buf_pixel_data){free(m_p_buf_pixel_data); m_p_buf_pixel_data=nullptr;}
    m_p_buf_pixel_data = (uchar*)malloc(sizeof(uchar) * m_pixel_data_length);
    if(m_pixel_data_length == (int)(count = fread(m_p_buf_pixel_data, 1, m_pixel_data_length, p_file_diconde)))
    {
        ret_val =true; qDebug("step 6:get pixel data successful.");
    }
    else{ qDebug("step 6:get pixel data fail."); }
    return ret_val;
}
 
/**
 * @brief 当前文件有效性标记位一定是在文件的index=128,129,130,131处
 * @param p_file_diconde
 * @return
 */
bool DicomFile::get_is_valid_diconde_file(FILE *p_file_diconde)
{
    bool ret_val = false;
    size_t count = 0;
    int fixed_length = 4;
 
    uchar buf[fixed_length]; memset(buf,0x00,sizeof(buf));
    while((fixed_length == (int)(count = fread(buf, 1, fixed_length, p_file_diconde)))
          && 132 >= m_diconde_file_byte_count)
    {
        m_diconde_file_byte_count = m_diconde_file_byte_count + count;
        if(buf[0] == DICOM_D_0x44  &&  buf[1] == DICOM_I_0x49
                && buf[2] == DICOM_C_0x43 && buf[3] == DICOM_M_0x4D)
        {
            qDebug("step 1:dicom file OK!");
            ret_val = true; break;
        }
        memset(buf,0x00,sizeof(buf));
    }
    return  ret_val;
}
 
/**
 * @brief DicomFile::bytes_to_int_little_endian
 * @param src
 * @param offset
 * @return
 */
int DicomFile::hex_to_int_little_endian(uchar* src, int offset)
{
    int value;
    value = (int) ((src[offset] & 0xFF)
                   | ((src[offset + 1] & 0xFF) << 8));
    return value;
}