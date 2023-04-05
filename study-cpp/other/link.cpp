#include "link.h"
#include<string.h>
void help(void)
{
    cout<<"*******************************"<<endl;
    cout<<"*help:������Ϣ                *"<<endl;
    cout<<"*insert:��������ڵ�          *"<<endl;
    cout<<"*print:��������               *"<<endl;
    cout<<"*search:��ѯ����ĳ���ڵ�      *"<<endl;
    cout<<"*delete:ɾ������ĳ���ڵ�      *"<<endl;
    cout<<"*free:�ͷ���������            *"<<endl;
    cout<<"*quit:�˳�����                *"<<endl;
    cout<<"*cls:�����Ļ                 *"<<endl;
    cout<<"*******************************"<<endl;
}
#if 0
//�������ֻ֮ ͷ��֮ǰ����
STU* insertLink(STU *head, STU tmp)
{
    //�Ӷ������������Ľڵ�ռ�
    STU *pi = new STU;
    //���ռ丳ֵ
    *pi = tmp;
    pi->next = NULL;

    //�ж������Ƿ����
    if(NULL == head)//������
    {
        head = pi;
    }
    else//�������
    {
        pi->next = head;
        head = pi;
    }
    return head;
}
#endif

#if 0
//�������ֻ֮ β��֮ǰ����
STU* insertLink(STU *head, STU tmp)
{
    //�Ӷ������������Ľڵ�ռ�
    STU *pi = new STU;
    //���ռ丳ֵ
    *pi = tmp;
    pi->next = NULL;

    //�ж������Ƿ����
    if(NULL == head)//������
    {
        head = pi;
    }
    else//�������
    {
        //Ѱ��β�ڵ�
        STU *pb = head;
        while(pb->next != NULL)
            pb = pb->next;
        //��β�ڵ����pi
        pb->next = pi;
    }
    return head;
}
#endif
#if 1
//�������ֻ֮ �������
STU* insertLink(STU *head, STU tmp)
{
    //�Ӷ������������Ľڵ�ռ�
    STU *pi = new STU;
    //���ռ丳ֵ
    *pi = tmp;
    pi->next = NULL;

    //�ж������Ƿ����
    if(NULL == head)//������
    {
        head = pi;
    }
    else//�������
    {
        //Ѱ�Ҳ����
        STU *pf=head, *pb=head;
        while((pb->num < pi->num) && (pb->next != NULL))
        {
            //pf����pb��λ��
            pf = pb;
            //pb�ƶ�����һ���ڵ�
            pb = pb->next;
        }

        //�жϲ�����λ��
        if(pb->num >= pi->num)//ͷ�����в�����
        {
            if(pb == head)//ͷ������
            {
                pi->next = head;
                head = pi;
            }
            else//�в�����
            {
                pf->next = pi;
                pi->next = pb;
            }
        }
        else//β������
        {
            pb->next = pi;
        }
    }
    return head;
}
#endif
//��������
void printLink(STU *head)
{
    //�ж������Ƿ����
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
    //�ж������Ƿ����
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //����ڵ��ѯ
    STU *pb = head;
    while((strcmp(pb->name,name) != 0) &&(pb->next != NULL))
        pb = pb->next;

    if(strcmp(pb->name,name) == 0)
    {
        return pb;
    }
    else
    {
        cout<<"δ�ҵ���ؽڵ�"<<endl;
    }

    return NULL;
}

STU* deleteLink(STU *head, int num)
{
    //�ж������Ƿ����
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //����ڵ�Ƚ� Ѱ��ɾ����
    STU *pf=head, *pb = head;
    while((pb->num != num)&&(pb->next != NULL))
    {
        pf = pb;
        pb=pb->next;
    }

    //�ҵ�ɾ����
    if(pb->num == num)
    {
        if(pb == head)//ͷ�ڵ�ɾ��
        {
            head=head->next;
        }
        else//�С�β��ɾ���ڵ�
        {
            pf->next = pb->next;
        }
        delete pb;
    }
    else
    {
        cout<<"δ�ҵ���Ҫɾ���Ľڵ�"<<endl;
    }

    return head;
}

STU* freeLink(STU *head)
{
    //�ж������Ƿ����
    if(NULL==head)
    {
        cout<<"link not exist"<<endl;
        return NULL;
    }

    //����ڵ��ͷ�
    STU *pb = head;
    while(pb!=NULL)
    {
        head = head->next;
        delete pb;
        pb = head;
    }
    return head;
}
