#include <emscripten.h>
#include "iostream"
#include <stdio.h>

extern "C"
{
  // extern char getText(std::string t);
  // 声明在外部模块中定义的custom_add函数
  extern int custom_add(int x, int y);

  EMSCRIPTEN_KEEPALIVE
  int fibonacci(int n)
  {
    if (n < 2)
    {
      return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  EMSCRIPTEN_KEEPALIVE
  int getT(int a, int b){
    return custom_add(a,b);
  }
  
}
int main(int argc, char **argv)
{
  printf("Hello World\n");
  printf("ready to call js func>>\n");
  printf("call js func return %d\n", custom_add(2, 3));
  return 0;
}

// 参考
// https://blog.csdn.net/wangxudongx/article/details/125833200