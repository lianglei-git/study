#ifndef DICOMFILE_H
#define DICOMFILE_H
 
#include <QObject>
#include <QFile>
#include <map>
extern "C"{
#include <stdio.h>
#include <io.h>
#include <fcntl.h>
#include <unistd.h>
}
#include "./global_const.h"
#include "./global_struct.h"
 
//此处枚举变量根据实际场景修正一下
enum DICOM_VR_TYPE
    {
        VR_TYPE_NULL,
        VR_TYPE_EXPLICIT_TABLE_7_1_1,
        VR_TYPE_EXPLICIT_TABLE_7_1_2,
        VR_TYPE_IMPLICIT_TABLE_7_1_3
    };
 
using namespace std;
typedef bool (*f_group_element)(void*);
 
class DicomFile : public QObject
{
    Q_OBJECT
public:
    explicit DicomFile(QObject *parent = nullptr);
    ~DicomFile();
    int get_pixel_column();     //像素宽
    int get_pixel_rows();       //像素高
    uchar* get_pixel_data();
 
    //字符集:组号与元素号
    static bool dicom_tag_7FE0_0010(void*);     //DICOM文件的图像像素数据标识符
    static bool dicom_tag_0028_0011(void*);
    static bool dicom_tag_0028_0010(void*);
    /**
     * @brief 读取DICOM文件
     */
    void read_dicom(QString);
 
    /**
     * @brief 当前文件有效性标记位一定是在文件的index=128,129,130,131处
     * @param p_file_diconde
     * @return true; 文件有效
     */
    bool get_is_valid_diconde_file(FILE *p_file_diconde);
    inline bool dicom_data_element_tag(FILE *p_file_diconde);           //组号及元素号
    inline bool dicom_value_representation(FILE *p_file_diconde);       //值代表的意思VR
    inline bool dicom_value_length(FILE *p_file_diconde);               //值占据的长度
    inline bool dicom_value_field(FILE *p_file_diconde);                //具体的值
    inline bool is_data_structures_and_encoding_vr_table_7_1_1(const uchar*,FILE *p_file_diconde);
    inline bool is_data_structures_and_encoding_vr_table_7_1_2(const uchar*);
    bool get_pixel_data(FILE *p_file_diconde);                          //图像像素数据
 
 
    inline int hex_to_int_little_endian(uchar* src, int offset);
signals:
 
private:
    int m_diconde_file_byte_count;         //DICOM文件字节总数
 
    //DICOM的单个数据元数
    GlobalStruct::DICOM_FILE_META_ELEMENTS_LIST m_dicm_file_meta_elements_list; 
    //DICOM的所有数据元数集
    GlobalStruct::DICOM_FILE_META_ELEMENTS m_dicom_file_meta_elements;          
 
    std::map<string,f_group_element> m_f_map;          //DICOM的Dataset的TAG
    bool m_is_tag_e07f_1000;int m_pixel_data_length;    //图像数据标志位
    bool m_is_tag_rows;     int m_rows;              //图像的行像素
    bool m_is_tag_columns;  int m_columns;                //图像的列像素
    uchar *m_p_buf_pixel_data;                 //图像的像素字节
    //参见<<DICOM Part 5 Data Structures and Encoding.pdf>>Page53
    //显示VR在Table 7.1-2中,其值有固定长度表示;  则不在Table 7.1-2中,其值灵活变化
    EnumParamter::DICOM_VR_TYPE m_dicom_vr_type;
 
 
};
 
#endif // DICOMFILE_H