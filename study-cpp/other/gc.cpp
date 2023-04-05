#include<iostream>
using namespace std;

class CRefCount {
	public: 
		CRefCount(); // Cutstructor init
		CRefCount(const CRefCount& obj);		 // copy GC ref Count
												 // 申请空间
												 // 计数增加
												 // 计数减少
	private: 
			void* m_pBuf;
			int* m_pRefCount;

}

CRefCount:: CRefCount() {
	m_pBud = nullptr;
	m_pRefCount = nullptr;
}

CRefCount::CRefCount(const CRefCount& obj){
	m_pBuf = obj.m_pBuf;
	m_pBufcount = obj.m_pBufCount;
	AddRef();
}

void* CRefCount::Alloc(int size) {
	m_pBuf = new char[size + 1]; // 申请缓冲区
	m_pBufCount = new int(0);
	AddRef();	// 每次构造对象计数+1
}
int main() {
	cout << "hello worled!" << endl;
	return 0;
}

