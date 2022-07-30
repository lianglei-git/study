#include <iostream>

using namespace std;

// ==================================== 引用 ====================================
void func1(){};
// 函数返回值类型为引用类型
// 这样好像不太行 应该不能返回局部的变量，因为这样就会被释放掉了
int &func3(){
    int b = 10;
    return b;
}
void ref1() {
      int a = 10;
      // 系统不会为引用开辟空间
      // 引用必须初始化
      int &b = a;// 这里的b不是取得地址符， 而是引用
      // a和b代表同一空间的内容
      cout << a;
      cout << " <== aa  bb ==>";
      cout << b;

      cout << "修改后的值" << endl;
      // 赋值
      b = 100;
      cout << a;
      cout << " <== aa  bb ==>";
      cout << b;


      // 引用指针
      int *p = &a;
      int* &pa = p;

      // 引用数组
      char str[32] = {"去将卡上的"};
      char (&cstr)[32] = str;
      // cout << cstr << endl;


      // 引用函数
      void (&cFunc)(void) = func1;

      int &ccc = func3();
      cout << "引用函数返回值 ：： "<< (int) ccc<< endl;
//      int &ns = 100;
      // 常量引用
//      const int &b = 10;
}


// 函数参数引用
void func2(int &a, int &b) { // 直接引用嘛
    int tmp = a;
    a = b;
    b = tmp;
}


int main()
{
    cout << "Hello World!" << endl;
    ref1();
    return 0;
}
