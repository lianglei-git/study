#include "link.h"
STU *head = NULL;
namespace paramA {
void func() {}
}
void star() {

    using namespace paramA;
    char cmd[64] = "";
    cout << "请输入操作指令:" << endl;
    cin >> cmd;
    if(strcmp(cmd, "help") == 0) {
        cout << "帮助信息" << endl;
         help();
    }else if(strcmp(cmd, "insert") == 0) {
        cout << "请输入要插入的链表信息(num name)" << endl;
        STU tmp;
        cin >> tmp.num >> tmp.name;
        head = insertLink(head, tmp);
    }else if(strcmp(cmd, "print") == 0){
        cout << "循环链表" << endl;
        printLink(head);
    }
     else if(strcmp(cmd, "quit") == 0) {
        _Exit(-1);
    }
    star();
}

int main()
{

    help();
    star();
//    int num = 20;
//    int str = 77;
//    int *p = NULL;
//    char name[32] = "张三";
//    char *bs = new char[32];
//    p = &num;
//    *p = str;
//    cout << p << "   " << *p << endl;
//    STU student = {
//        98,
//        "梁磊",
//        NULL
//    };

//    STU *k = NULL;
//    k = &student;
//    k->num = str;
//    k->name = name;

//    cout <<"student --> "<< student.num << student.name << student.next << endl;



    return 0;
}
