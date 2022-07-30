#include "link.h"

void help(){
    cout << "********************" << endl;
    cout << "*help  帮助信息" << endl;
    cout << "*insert  插入" << endl;
    cout << "*print 遍历链表" << endl;
    cout << "*search 查询链表的某个点" << endl;
    cout << "*delete 删除链表的某个点" << endl;
    cout << "*free 释放整个链表" << endl;
    cout << "*quit 退出程序" << endl;
    cout << "*cls 清屏" << endl;
    cout << "********************" << endl;
}


STU* insertLink(STU *head, STU tmp) {
   STU *pi = new STU;
   *pi = tmp;
   pi -> next = NULL;
   // 判断链表是否存在
   if(NULL == head) {
       head = pi;

   }else {
       pi -> next = head;
        head = pi;
   }
   return head;
}

void printLink(STU * head){
    if(head == NULL) {
        cout<< "链表没东西!" << endl;
        return;
    }else {
        STU *pb = head;
        while (pb!=NULL) {
            cout << pb->num << " " << pb->name << endl;
            pb = pb->next;
        }
        return;
    }
}
