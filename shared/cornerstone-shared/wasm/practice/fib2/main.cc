#include <emscripten.h>

extern "C"
{
  EMSCRIPTEN_KEEPALIVE
  int fibonacci(int n)
  {
    int total = 0;
    for(int i = 0; i < n; i++){
      if(i < 10)continue;
      total += i;
    }
    return total;
    // if (n < 2)
    // {
    //   return 1;
    // }
    // return fibonacci(n - 1) + fibonacci(n - 2);
  }
}