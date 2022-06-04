class Node {
    next = null;
    data = null;
    constructor(data, next) {
        this.data = data;
        this.next = next || null;
    }

}

class LinkedList {
    head = null;
    size = 0;


    length() {
        return this.size;
    }

    getNode(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current.next && (current = current.next)
        }
        return current;
    }

    add(index, element) {
        if (arguments.length == 1) {
            element = index;
            index = this.size;
        }
        if (index == 0) {
            let head = this.head
            this.head = new Node(element, head);
        } else {
            let preNode = this.getNode(index - 1);
            preNode.next = new Node(element, preNode.next);

        }
        this.size++;
    }

    remove(index) {
        let reCur = null;
        if (index == 0) {
            reCur = this.head;
            this.head = reCur?.next;
        } else {
            let current = this.getNode(index - 1);
            reCur = current.next;

            current.next = reCur.next
        }
        this.size--;
        return reCur;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    set(index, element) {
        let current = this.getNode(index - 1);
        current.data = element
    }

    get(index) {
        return this.getNode(index);
    }
}

// const l = new LinkedList();
// l.add('9988');
// l.add(1234);
// l.add(0, 99777);
// l.add(4567);
// // l.clear()
// ;
// l.set(0, 'haobuh')
// console.log(l.remove(0), l)


class Queue {
    constructor(){
        this.linkedList = new LinkedList();
    }

    enQueue(data) {
        this.linkedList.add(data)
    }

    unQueue() {
        return this.linkedList.remove(0)
    }
}

// const q = new Queue();

// q.enQueue('111');
// q.enQueue(',,');
// q.enQueue('2222');
// console.log(q.linkedList);
// q.unQueue();
// console.log(q.linkedList);

module.exports = {
    Queue
}
