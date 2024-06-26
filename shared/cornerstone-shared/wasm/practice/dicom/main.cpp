#include "DicomFile.cpp"

int main(void)
{
    DicomFile *pData = new DicomFile;
    pData->read_dicom("/Users/sparrow/Downloads/2018176250_20240429143401/817/3128/355760.dcm");

    // 1280: dicode文件宽, 1024是行,注意log日志有
    // QImage image = QImage(pData->m_p_buf_pixel_data,1280,1024,QImage::Format_Grayscale16);
    QImage image = QImage(pData->get_pixel_data(), pData->get_pixel_column(), pData->get_pixel_rows(), QImage::Format_Grayscale16);
    
    return 0
}