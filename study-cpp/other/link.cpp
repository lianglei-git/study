#include "link.h"
#include<string.h>
void help(void)
{
    cout<<"*******************************"<<endl;
    cout<<"*help:帮助信息                *"<<endl;
    cout<<"*insert:插入链表节点          *"<<endl;
    cout<<"*print:遍历链表               *"<<endl;
    cout<<"*search:查询链表某个节点      *"<<endl;
    cout<<"*delete:删除链表某个节点      *"<<endl;
    cout<<"*free:释放整个链表            *"<<endl;
    cout<<"*quit:退出程序                *"<<endl;
    cout<<"*cls:清空屏幕                 *"<<endl;
    cout<<"*******************************"<<endl;
}
#if 0
//链表插入只之 头部之前插入
STU* insertLink(STU *head, STU tmp)
{
    //从堆区申请带插入的节点空间
    STU *pi = new STU;
    //给空间赋值
    *pi = tmp;
    pi->next = NULL;

    //判断链表是否存在
    if(NULL == head)//不存在
    {
        head = pi;
    }
    else//链表存在
    {
        pi->next = head;
        head = pi;
    }
    return head;
}
#endif

#if 0
//链表插入只之 尾部之前插入
STU* insertLink(STU *head, STU tmp)
{
    //从堆区申请带插入的节点空间
    STU *pi = new STU;
    //给空间赋值
    *pi = tmp;
    pi->next = NULL;

    //判断链表是否存在
    if(NULL == head)//不存在
    {
        head = pi;
    }
    else//链表存在
    {
        //寻找尾节点
        STU *pb = head;
        while(pb->next != NULL)
            pb = pb->next;
        //在尾节点插入pi
        pb->next = pi;
    }
    return head;
}
#endif
#if 1
//链表插入只之 有序插入
STU* insertLink(STU *head, STU tmp)
{
    //从堆区申请带插入的节点空间
    STU *pi = new STU;
    //给空间赋值
    *pi = tmp;
    pi->next = NULL;

    //判断链表是否存在
    if(NULL == head)//不存在
    {
        head = pi;
    }
    else//链表存在
    {
        //寻找插入点
        STU *pf=head, *pb=head;
        while((pb->num < pi->num) && (pb->next != NULL))
        {
            //pf保存pb的位置
            pf = pb;
            //pb移动到下一个节点
            pb = pb->next;
        }

        //判断插入点的位置
        if(pb->num >= pi->num)//头部、中部插入
        {
            if(pb == head)//头部插入
            {
                pi->next = head;
                head = pi;
            }
            else//中部插入
            {
                pf->next = pi;
                pi->next = pb;
            }
        }
        else//尾部插入
        {
            pb->next = pi;
        }
    }
    return head;
}
#endif
//遍历链表
void printLink(STU *head)
{
    //判断链表是否存在
    if(NULL == head)
    {
        cout<<"link not exist"<<endl;
        return;
    }

    STU *pb = head;
    while(pb != NULL)
    {
        cout<<pb->num<<" "<<pb->name<<endl;
        pb = pb->next;
    }

    return;
}

STU* searchLink(STU *head, char *name)
{
    //判断链表是否存在
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //逐个节点查询
    STU *pb = head;
    while((strcmp(pb->name,name) != 0) &&(pb->next != NULL))
        pb = pb->next;

    if(strcmp(pb->name,name) == 0)
    {
        return pb;
    }
    else
    {
        cout<<"未找到相关节点"<<endl;
    }

    return NULL;
}

STU* deleteLink(STU *head, int num)
{
    //判断链表是否存在
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //逐个节点比较 寻找删除点
    STU *pf=head, *pb = head;
    while((pb->num != num)&&(pb->next != NULL))
    {
        pf = pb;
        pb=pb->next;
    }

    //找到删除点
    if(pb->num == num)
    {
        if(pb == head)//头节点删除
        {
            head=head->next;
        }
        else//中、尾不删除节点
        {
            pf->next = pb->next;
        }
        delete pb;
    }
    else
    {
        cout<<"未找到需要删除的节点"<<endl;
    }

    return head;
}

STU* freeLink(STU *head)
{
    //判断链表是否存在
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //逐个节点释放
    STU *pb = head;
    while(pb!=NULL)
    {
        head = head->next;
        delete pb;
        pb = head;
    }
    return head;
}
