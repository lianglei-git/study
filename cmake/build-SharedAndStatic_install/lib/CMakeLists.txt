SET(LIBHELLO_SRC hello.cpp)
 
ADD_LIBRARY(hello_static STATIC ${LIBHELLO_SRC})
 
# 对hello_static的重名为hello
SET_TARGET_PROPERTIES(hello_static PROPERTIES  OUTPUT_NAME "hello")
# cmake 在构建一个新的target 时，会尝试清理掉其他使用这个名字的库，因为，在构建 libhello.so 时， 就会清理掉 libhello.a
SET_TARGET_PROPERTIES(hello_static PROPERTIES CLEAN_DIRECT_OUTPUT 1)
 
ADD_LIBRARY(hello SHARED ${LIBHELLO_SRC})
 
SET_TARGET_PROPERTIES(hello PROPERTIES  OUTPUT_NAME "hello")
SET_TARGET_PROPERTIES(hello PROPERTIES CLEAN_DIRECT_OUTPUT 1)

INSTALL(FILES hello.h DESTINATION include/hello)
 
# 二进制，静态库，动态库安装都用TARGETS
# ARCHIVE 特指静态库，LIBRARY 特指动态库，RUNTIME 特指可执行目标二进制。
INSTALL(TARGETS hello hello_static LIBRARY DESTINATION lib ARCHIVE DESTINATION lib)