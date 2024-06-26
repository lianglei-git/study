#ifndef GLOBAL_CONST_H
#define GLOBAL_CONST_H
 
///其它↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
#define DIYE_READ_DICOM_DETIAL                0   //1:处理DICOM显示详细信息
 
 
///常量↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
#define DATA_LENGTH_256                                         256
#define BOOL_FALSE                                              0
#define BOOL_TRUE                                               1
#define INT_0                                                   0
#define INT_1                                                   1
#define INT_16                                                  16
#define INT_30                                                  30
#define MAX_KERNEL_LENGTH                                       31
#define INT_100                                                 100
#define INT_255                                                 255
#define INT_256                                                 256
#define INT_700                                                 700
#define INT_1000                                                1000
#define INT_1024                                                1024
#define INT_2048                                                2048
#define STRING_EMPTY                                            ""
 
 
///协议文档:<<DICOM Part 5 Data Structures and Encoding.pdf & DICOM Part 6 Data Dictionary.pdf>>↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
#define DICOM_D_0x44                                            0x44        //D:DICOM文件格式是以DICM打头的
#define DICOM_I_0x49                                            0x49        //I:DICOM文件格式是以DICM打头的
#define DICOM_C_0x43                                            0x43        //C:DICOM文件格式是以DICM打头的
#define DICOM_M_0x4D                                            0x4D        //M:DICOM文件格式是以DICM打头的
 
#define DICOM_TAG_0028_0010                                     "dicom_tag_0028_0010"   //DICOM文件的像素高度标记
#define DICOM_KEYWORD_0028_0010                                 "rows"
#define DICOM_TAG_0028_0011                                     "dicom_tag_0028_0011"   //DICOM文件的像素宽度标记
#define DICOM_KEYWORD_0028_0011                                 "columns"
 
#define DICOM_TAG_7FE0_0010                                     "dicom_tag_7FE0_0010"   //DICOM文件的像素数据标记
#define DICOM_KEYWORD_7FE0_0010                                 "pixel_data"
///协议文档:<<DICOM Part 5 Data Structures and Encoding.pdf & DICOM Part 6 Data Dictionary.pdf>>↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
#endif // GLOBAL_CONST_H