#include <stdio.h>
#include <stdlib.h>
#include <iostream>
// include 头文件包含 <> 包含系统头文件 iotream 是标准的输入输出流
// 此文件会把知识点处理成 md 文档
using namespace std;
//void log( any) {
//    cout << any << endl;
//}
// 命名空间
// main 只有一个 它是程序的唯一入口
// main 左面是函数返回的类型
void test() {
//    void num; // 无法给num开启空间
// 短整型变量是 short data； data占用2字节
// 长整型是 long data；32位平台 data占用4字节
//    cout<<"askd"<<data;
    int data;
    int num = 10;
    data = num;
    cout << "请输入整形数字"<< endl;
    cin>>data; // 需要用终端打开才可以看到效果
    cout << "data-- >rest ::"<< data <<endl;
    cout << "Hello World中文可以吗!" << endl;

}

// 键盘流输入
void test1()
{
    int data = 0;
    int num = 1;
    cout <<"请输入两个字符的数据"<<endl;
    cin>>data>>num; // 在输入的时候用空格隔开来分别赋值；
    cout << data << "<<data--num>>"<<num<<endl;
}

// 传说中的案例
void test2()
{
    int num1 = 0;
    int num2 = 0;
    cout<<"请输入num1 和 num2"<<endl;
    cin>>num1>>num2;
    if(num1>num2){
        cout << "最大值" << num1<< endl;
    }else {
        cout << "最小值" << num1<< endl;
    }

}

// 字符常量
void test3(){
//    int data = 0;
    cout << 'a' << endl;
    cout << (int)'a' << endl; // 输出ASCII 值 内存存的具体数字是啥
//    cin>>data;
}

// 字符变量 -- char
void test4(){
    char ch;
    ch = 'x'; // 这个字符x是ASCII中对应的120；即 存储到内存里面的是 120 这个数字，不是x这个值 存120 本质其实是一样的；
    cout << ch << endl; // x
    cout << (int)ch<<endl; // 120

    char ch1 = 120; // 这种不是很严格，应为左右两边要相同类型；
    cout << ch1 << endl; // 输出x；
    cout <<(int)ch1<<endl; // 输出 120

    char ch2; // 没有初始化
    cout << ch2 << endl; // 返回的是个空呢

    char ch3 = (char)120; // 把120转移成char的格式 // x
    char ch4 = '\120'; // P
    char ch5 = '\0';
    char ch6 = '0';
    cout << "对比几个不同的输出ASCII 反斜杠0 输出 --> "<<(int)ch5<<" 字符串0输出--> "<<(int)'0'<<" 数字0--> "<<(int)0 << endl;
    cout << "判断一下呢" << (bool)(ch3 == ch4) << ch3 << ch4 << endl; // 不相等

    // cin
    char ch7 = '\0';
    cout<<"请输入ch7"<<endl;
    cin>>ch7;
    cout << "ch7 = "<< ch7<< endl;
}

// 大小写转换
// 小写转大写 ==>  ch-('a'-'A');
// 大写转小写 ==>  ch+('a'-'A');
void test5(){
    // 定一个字符变量
       char ch = '\0';
    // 给字符变量获取键盘输入
       cout << "请输入一个字符" <<endl;
       cin >> ch;
    // 大小写转换
       if(ch >= 'a' && ch <= 'z') // 他们回转成acsii值来对比
       {
         // 乔重点了
        ch = ch-('a'-'A');
       }
       else  if(ch >= 'A' && ch <= 'Z')
       {
        ch = ch+('a'-'A');
       }

       cout << "ch最终为" << ch << endl;
}


// 实型 （浮点数） 分为两种，一种为单精度浮点数(float 4字节)，另一种位双精度浮点数；(double 8字节)
// 不以f结尾的实型常量位dobule类型 如：3.14；
// 以f结尾的实型常量为float类型：3.14f
// 指数形式： 12e3 ==> 12 * 10的三次方
void test6() {
    float f = 0.0f;
    double d = 0.0;
    cout << f << d << endl;
}



// 有符号数和无符号数
// 我理解的： 有符号数就是 在数字前面会添加 + - 两个符号，也就是我们平常的常数
// 无符号数值得就是没有 + - 他全部都是正数；这样子，区分不同
void test7(){
    signed int num = 10; // 显示定义有符号数；
    unsigned int num2 = -10;  // 定义无符号数
    cout << "有符号数 <-->  无符号数 "<< num2 << endl;
    printf("这里面有几个\n");
}

// 进制的转换
// 二进制: 0-1 以0b开头 bitset<8>输出
// 八进制： 0-7 以0为开头 oct输出
// 十进制： 0-9 默认10进制 cout输出
// 16进制： 0-9 a-f 以0x开头 0x12 hex输出 不区分正负数
void test8(){
       cout << bitset<10>(15) << endl;
       cout << oct << 15 << endl;
}

void test9(){
    unsigned int a = -1;
    cout << a << endl; // 4294967295 // 什么补码 反码 原码
}

// const 和js一样的 只读
void test10() {
     const int data = 100; // 必须初始化
     int *p = (int *)&data;
     *p = 2000; // 这时候*为2000
//     data = 123; // err报错
     cout << data << endl; // data还是100


}


// 下面这个关于空间的有些意思
void test12() {
    int a = 10; // 空间指向这里
    const int data = a; // 变量初始化 他直接开辟空间
    int *p = (int *)&data;
    *p = 2000; // 这时候*为2000
    cout <<"data ="<< data << endl; // data竟然是2000;
    cout << "*p = " <<*p << endl; // 这个也是2000
    cout << "a = "<<a <<endl; // 10
}


// register 修饰寄存器变量， 如果变量高频率使用，那么就放到这个寄存器里面，提高访问效率
void test11(){
    register int data = 10;// 将data 放到寄存器中 显示的告诉 使用register关键字， 不会放入内存中，而是放在cpu里面
    // 尽量不要取寄存器变量的地址； 取地址是对内存的操作，而不是对cpu的操作
    cout << &data << endl;
    // register 修饰的变量尽量放入寄存器中的；寄存器里面的大小是有限的， 没有频繁使用就放入失败的

}

// volatile 强制访问内存
void test13() {
    volatile int data = 100; // 对data的访问必须从内存中强制访问
    // 对传感器操作比较多
    cout << data << endl;
}

// sizeof 测量内存大小
void test_sizeof(){
    cout << sizeof ("啊三弟") << endl;
    cout << sizeof ("3") << endl;
    cout << sizeof (long) << endl; // 8
    cout << sizeof (double) << endl; // 8
    cout << sizeof (float) << endl; // 4
    cout << sizeof (short) << endl; // 2
    cout << sizeof (string) << endl; // 24bit
}

// typedef 给已有类型重新定义
void test_typedef(){
    typedef int Any;
    Any l = 99;
    printf("这是啥啊%d\n", l);

    typedef int MYARRAY[5]; // 说是数组里面有长度为5
    MYARRAY arr = {10,20,30,40,50};
    for(int i = 0; i < 5; i++){
        cout << arr[i]<<endl;
    }
}

//转义字符
void type_ASCII() {
    cout << "##" << '\n' << "##" << endl;// 换行
    cout << "##" << '\t' << "##" << endl;// tab缩进
    cout << "##" << '\r' << "##" << endl;// 回到行首符号
    cout << "##" << '\a' << "##" << endl;// 发出警报

}


// 类型转换
void test_tansform_type() {
//    强制类型转换
    float f = 3.14f;
    int n = 0;
    n = (int)f; // n = 3; f = 3.14f

}

// 运算符
// 算数运算符 + - * / % += -= /= %=
// "/" 取整， 5/3 == 1, 5/2 == 2 都是对的， 奇葩啊
// "/" 除法运算 5/2.0 == 2.5 这样是对的
// 目前看到的其他应该也遵循这个逻辑，

void test_chu(){
    cout << (5/2) << endl; // 输出2
    cout << (5/2.0) << endl; // 输出2.5


}


// 随机数测试
#include <time.h>
void test_round(){
//        srand()// 这是种子， 获取种子 rand()
    srand(time(NULL));
    cout << rand() << "-->>>" << time(NULL)<< endl;
}


// 与 运算 “｜”
// 两位同时为“1”，结果才为“1”，否则为0;;; ：0&0=0; 0&1=0; 1&0=0; 1&1=1;

// 可以参考 --》 https://blog.csdn.net/Gransand/article/details/79575080
// 位运算 --》 "&"
// 全1为1 有0为0 ； 11000011 & 1111000 => 输出 11000000
void test_huo(){
    bitset<8> num("11001100");
    bitset<8> num2("11110000");
    cout << (num & num2) << endl; // 11000000
}


// 按位取反 "~"; --> ～110011 ==>  001100
void test_qufan(){
    bitset<8> num("11001100");
    cout << ~num << endl; // 00110011
}


// 按位异或： 相同为0， 不同为1； 🌰：11----11
void test_yihuo(){
    int num = 3; // 00000011;
    int num2 = 5;// 00000101;
    cout << "num1 --> " << bitset<8>(num) << endl;
    cout << "num2 --> " << bitset<8>(num2) << endl;
    // 应该输出 --> 00000110
    cout << bitset<8>(num ^ num2) << endl;
//    bitset<8> num3(11000011);
//    cout<< num3.to_string() << endl;
 }

void test_ifelse (){
//    if(条件表达式) {
//        语句1;
//        语句2
//    }
}
int main()
{ // {} 复合语句
    test_huo();
    return 0;
}
