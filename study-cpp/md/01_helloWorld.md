>ps: 我觉得学习一门语言可以从简单的文档开始，然后速度快的就要看看视频，总结是刷面试题最好的方式。训练就找个视频跟着刷项目
菜单
- <a href='#goto'>goto</a>


### <span id='goto'>goto</span>

goto的意思是跳过一段得代码
```c++
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

```
