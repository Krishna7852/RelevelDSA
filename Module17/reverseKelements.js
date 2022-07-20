class Queue {
    constructor() {
        this.maxSize = 4; // total capacity of the queue
        this.size = 0; // how many elements are there
        this.arr = Array(this.maxSize);
        this.front = 0;
        this.rear = this.maxSize - 1;
    }

    isFull() {
        /**
         * Time: O(1)
         */
        return this.size == this.maxSize;
    }

    isEmpty() {
        /**
         * Time: O(1)
         */
        return this.size == 0;
    }

    enqueue(data) {
        /**
         * Time: O(1)
         */
        if(!this.isFull()) {
            this.rear = (this.rear+1) % this.maxSize;
            this.arr[this.rear] = data;
            this.size++;
            return;
        }
        this.maxSize*=2;
        let temp = Array(this.maxSize);
        let i = 0;
        let newSize = 0;
        while(!this.isEmpty()) {
            temp[i] = this.getFront();
            this.dequeue();
            newSize++;
            i++;
        }
        temp[i] = data;
        newSize++;
        this.arr = temp;
        this.size = newSize;
        this.front = 0;
        this.rear = newSize-1;
    }

    dequeue() {
        /**
         * Time: O(1)
         */
        if(!this.isEmpty()) {
            this.size--;
            this.front = (this.front+1)%this.maxSize;
            return;
        }
        console.log("Cannot remove from an empty queue");
    }

    getFront() {
        /**
         * Time: O(1)
         */
        if(!this.isEmpty()) {
            return this.arr[this.front];
        }
        console.log("Queue is empty");
    }
    display() {
        console.log(this.arr);
    }
}

function kReverse(qu, k) {
    /**
     * Time: O(n)
     * Space: O(n)
     */
    let st = [];
    let temp = new Queue();
    for(let i = 0; i < k; i++) {
        st.push(qu.getFront());
        qu.dequeue();
    }
    while(!qu.isEmpty()) {
        temp.enqueue(qu.getFront());
        qu.dequeue();
    }
    while(st.length != 0) {
        qu.enqueue(st[st.length - 1]);
        st.pop();
    }
    while(!temp.isEmpty()) {
        qu.enqueue(temp.getFront());
        temp.dequeue();
    }
}

let qu = new Queue();
qu.enqueue(10);
qu.enqueue(20);
qu.enqueue(30);
qu.enqueue(40);
qu.enqueue(50);
qu.enqueue(60);
qu.enqueue(70);
qu.enqueue(80);
qu.enqueue(90);
qu.enqueue(100);

kReverse(qu, 5);
while(!qu.isEmpty()) {
    console.log(qu.getFront());
    qu.dequeue();
}