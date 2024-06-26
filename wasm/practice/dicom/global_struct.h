#ifndef GLOBAL_STRUCT_H
#define GLOBAL_STRUCT_H
 
#include <QObject>
class GlobalStruct : public QObject
{
    Q_OBJECT
public:   
    //DICOM:
    typedef struct DICOM_FILE_META_ELEMENTS
    {
        uchar group[2];                      //TAG:组编号
        uchar element[2];                    //TAG:元素编号
        uchar keyword[128];                  //元素描述
        uchar vr[2];                         //值代表缩写
        uchar value_lenght;                  //用N个字节表示值的长度
        uchar value_byte_lenght[4];          //实际值的长度:小端模式
        uchar value_field[256];              //实际值
    }_DICOM_FILE_META_ELEMENTS;
    typedef struct DICOM_FILE_META_ELEMENTS_LIST
    {
        DICOM_FILE_META_ELEMENTS elements[64];
        int elements_length;
    }_DICOM_FILE_META_ELEMENTS_LIST;
 
};
 
#endif // GLOBAL_STRUCT_H