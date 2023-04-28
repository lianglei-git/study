#include <iostream>
// 1) include_directories字段
// 2） target_link_libraries 字段

// 1. 
#include "hello/hello.h"
// 2. 
// 去CMakeLists.txt中添加库链接,这就要把这个 include_directories字段 参数变成 /usr/local/include/hello 了
// #include <hello.h>
int main()
{
    HelloFunc();
    return 0;
}