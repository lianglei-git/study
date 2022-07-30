#include <iostream>

using namespace std;
// 循环和js 等同
// for循环 while循环 do while循环

//判断 三目运算 which ifelse 都一一样的

// 跳转语句
void test_goany() {
    int b = 1;
    cout << "这是一个" << endl;
    goto woshi;
    cout << "这是2个" << endl;
    cout << "这是3个" << endl;
    woshi: // 中间那两个都跳过了, 注意这里是冒号结尾
    cout << "这是4个" << endl;
    cout << "这是5个" << endl;
    // 下面这个例子是 往上执行，这个有意思 这里还有一个官网给出的demo
    shenme:
    cout << "这是6个" << endl;
    b++;
    if(b == 1)goto shenme;

    //这是一个
    //    这是4个
    //    这是5个

    //    官网demo
    {
        // 局部变量声明
        int a = 10;

        // do 循环执行
    LOOP:do
        {
            if( a == 15)
            {
                // 跳过迭代
                a = a + 1;
                goto LOOP;
            }
            cout << "a 的值：" << a << endl;
            a = a + 1;
        }while( a < 20 );
        //goto 语句一个很好的作用是退出深嵌套例程
        //        a 的值： 10
        //        a 的值： 11
        //        a 的值： 12
        //        a 的值： 13
        //        a 的值： 14
        //        a 的值： 16
        //        a 的值： 17
        //        a 的值： 18
        //        a 的值： 19
    }

}


// 重新 定义
void testvar(){
    int a = 10;
    cout << a << endl;
    // int a = 20; // 肉眼可见的报错了， c++不允许重复定义
    cout << a << endl;
}

void log(auto int any){
    cout << any << endl;
}

// ============== 数组 ==============

// 数组
void test_array(){
//    string arr = "阿三开的快乐";
    long arr[4];

    int i = 0;
    int length = sizeof(arr) / sizeof (arr[0]);
    while(i<length) {
        cout << "数组每个元素" << arr[i] << endl;
        i++;
    }
    cout << sizeof (arr)<< "长度是 ：：： " << length << endl;

    // 初始化
    int arr2[4] = {0,2,3}; // 没有定义部分为0; ==> 0,2,3,0,0
    int arr3[5] = {[2]=10, [4] = 30}; // 给制定的赋值
    int arr4[10] = {0}; // 全都初始化为0；
   int arr3length = sizeof(arr3) / sizeof (arr3[0]);
    for(int n =0; n < arr3length; n++){
        cout << "arr4 ->>"<< arr4[n] << endl;
    }

}

// 二维数组
void erwei_arr(){
    int arr[3][3] = {2};
    int row = sizeof(arr) / sizeof (arr[0]);
    int col = sizeof(arr[0]) / sizeof (arr[0][0]);
    for(int i = 0; i< row; i++){
        for(int j = 0; j < col; j++){
            cin >> arr[i][j];
        }
    }

    for(int i = 0; i< row; i++){
        for(int j = 0; j < col; j++){
            cout  << arr[i][j] << " ";
        }
        cout << endl;
    }
}

// 字符串数组
void test_stringArr() {
    char arr[6] = "hello"; // 一种定义方式
    char arr2[6] = {'h', 'e', 'l', 'l', 'o'}; //两种定义方式
    cout << arr << endl; // 直接输出hello, 遇见\0会停止
    char arr3[] = "hel\0lo";
    cout << arr3 << endl; // 输出 hel

    char str[32] = "";
    cin.getline(str, sizeof (str)); // 获取带空格输入
    int i = 0;
    while (str[i] != '\0') i++;

    cout << str << "长度是" << i<<endl;
}


// 二维字符串数组 循环
void test10(){
    char string[5][128] = {"hello", "world", "hehehheheheh", "alksdlaksdlkjlkad", "阿克苏记得了"};
    int row = sizeof (string) / sizeof (string[0]);
    for(int i = 0; i< row; i++){
        cout << string[i] << endl;
    }
}

// 二维数组 键盘输入
void test11(){
    char arr[5][32] = {""};
    int row = sizeof (arr) / sizeof (arr[0]);

    for(int i = 0; i < row; i++){
        cin >> arr[i];
    }

    for(int i = 0; i < row; i++){
        cout << arr[i] << endl;
    }
}


// ============== 函数 ==============
// 数组排序
void inputIntArray(int arr[], int n);
void sortIntArray(int arr[], int n);
void printIntArray(int arr[],int n);
void test_func(){
    int arr[5] = {0};
    int n = sizeof(arr) / sizeof(arr[0]);

    inputIntArray(arr, n);
    sortIntArray(arr, n);
    printIntArray(arr, n);
}

void inputIntArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
}

void sortIntArray(int arr[], int n) {
    for(int i = 0; i<n-1; i++){
        for(int j = 0; j < n-i-1;j++){
            if(arr[j] > arr[j+1]) {
                int last = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = last;
            }
        }
    }
}
void printIntArray(int arr[],int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << endl;
    }
}

void myGetString(char arr[],int n) {
    cin.getline(arr, n);
}
void test_strong(){
   char str[128] = "";

   // 键盘获取字符串
   myGetString(str, sizeof (str));

   // 获取长度
   int i = 0;
   while(str[i]) i++;
   cout << "length === " << i << endl;
}

// ============== 预处理 ==============
// 每个进程内存里分为： 内存分区
// 堆区 （使用malloc、callc、realloc、free）动态申请： 可读可写
// 栈区 （局部函数、函数的型参、返回值）： & 可读可写
// 全局区（普通全局变量、静态全局变量、静态局部变量）： & 可读可写
// 文字常量 （数值常量、字符常量、字符串常量、符号常量）：可读
// 代码区 （代码二进制指令）：可读

// 静态局部变量
void test_staticnum(){
    static int num = 0; // 只有第一次执行太会初始化， 下一次执行还是上一次的值
    num++;
    cout << num << endl;
}
// 全局静态变量 只能在当前文件使用


// 头文件一般做类型的定义、变量或者函数的声明、宏定义
// 宏函数
// 编译四阶段： 预处理、编译、汇编、链接
//使用关键字 define 定义宏
//🌰: #define PI 3.14  无参数定义
//🌰；#define PI(a,b) a*b // 有参数定义, 没有类型说明
// cout << PI(10, 20); // 200
// cout << PI(10+10, 20+20); // 230 => 10+10*20+20


// ============== 指针 ==============
// 在32为平台中，每个进程有4g的空间
// 指针变量： 本质是变量 只是该变量保存的是 内存的地址编号（不是普通的数值）；
// *修饰指针变量
// *p 表示通过p所存储的地址变好 取对应空间的内容
void test_probe(){
    int a = 10;
    int *p;
//    *p = 19; // 这时候没有引用普通变量， 那么赋值肯定会报错的呀
    p = &a; // 引用了a // 这个是普通变量和指针变量相关联
    cout << p << " 是p的值" << endl;// 地址编号
    cout << *p << " 是*p的值" << endl; // 10
    int b = 20;
    p = &b; // 这个是关联b的指针地址；看来关联地址会改变地址， 并不会改变原有的值.
    cout << "修改指针地址后a的值是 "<< a<<endl;
    *p = 2;
    cout << "修改指针地址后b的值是 "<< b<<endl;
    *p = a; // 这玩意是改变指向地址变量的那个值

    cout << p << " 是p的值" << endl;// 地址编号
    cout << *p << " 是*p的值" << endl; // 10
    *p = 999;
    cout<<"b ===" << b << endl;

}

//指针变量的初始化， 指针变量在操作之前必须指向合法的地址空间。
// 1. 如果指针变量不初始化，立即操作会出现错误

// 2. 指针变量 如果没有指向合法的空间，可以直接初始化为NULL, 不要操作为NULL的指针变量


int main()
{
    test_probe();
    return 0;
}
