
# 这里引用头文件的路径，目前没有去寻到自动引入的api，比如include/**
# 这个路径加上 hello 就指在这下面的头文件，根据输出有关。
include_directories(/usr/local/include)

add_executable(hello main.cpp)

# 这里库文件的路径，就是存放具体代码的，目前也没有找自动引入的地方，比如include/**
# 因为是mac 所以这样使用呢(dylib)
target_link_libraries(hello /usr/local/lib/libhello.a)