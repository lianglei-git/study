#ifndef LINK_H
#define LINK_H
#include <iostream>
struct STU {
    int num;
    char name[32];
    STU *next;
};
using namespace std;
extern void help(void);
extern STU* insertLink(STU* head, STU tmp);
void printLink(STU * head);



#endif // LINK_H
