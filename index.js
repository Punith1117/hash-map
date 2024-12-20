class HashMap {
    constructor() {
        this.size = 16;
        this.buckets = new Array(this.size);
        this.elements = 0;
        this.loadFactor = 0.75;
    }
    
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 
    
    set(key, value) {
        let hashCode = this.hash(key);
        let index = hashCode % this.size;
        if (this.buckets[index] == undefined) {
            this.buckets[index] = []
        }
        for (let pair of this.buckets[index]) {
            if (pair[0] == key) {
                pair[1] = value
                return
            }
        }
        this.buckets[index].push([key, value]);
        this.elements++
        this.refactor();
    }
    
    get(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.size;
        for (let pair of this.buckets[index]) {
            if (pair[0] == key)
                return pair[1]
        }
        return null
    }
    
    has(key) {
        let entries = this.entries();
        for (let pair of entries) {
            if (pair[0] == key) {
                return true
            }
        }
        return false
    }
    
    remove(key) {
        if (this.has(key)) {
            let hashCode = this.hash(key);
            let index = hashCode % this.size;
            let bucket = this.buckets[index];
            let i, pair
            for (i = 0, pair = bucket[i]; pair[i] == key; i++);
            bucket.splice(i-1, 1);
            this.buckets[index] = bucket;
            this.elements--;
            return true;
        } 
        return false
    }
    
    length() {
        return this.elements
    }

    clear() {
        this.buckets = new Array(16);
        return true;
    }

    keys() {
        let arr = []
        for (let bucket of this.buckets) {
            if (bucket != undefined) {
                for (let pair of bucket) {
                    if (pair != undefined)
                        arr.push(pair[0])
                }
            }
        }
        return arr
    }

    values() {
        let arr = []
        for (let bucket of this.buckets) {
            if (bucket != undefined) {
                for (let pair of bucket) {
                    if (pair != undefined)
                        arr.push(pair[1])
                }
            }
        }
        return arr
    }

    entries() {
        let arr = []
        for (let bucket of this.buckets) {
            if (bucket != undefined) {
                for (let pair of bucket) {
                    if (pair != undefined)
                        arr.push(pair)
                }
            }
        }
        return arr
    }

    display() {
        for (let bucket of this.buckets) {
            if (bucket == undefined) {
                console.log(undefined)
                continue
            }
            
            console.log('bucket: ')
            for (let pair of bucket) {
                console.log("   " + pair[0] + ": " + pair[1]);
            }
        }
    }
    
    refactor() {
        let condition = this.size * this.loadFactor
        if (this.elements >= condition) {
            let entries = this.entries();
            console.log(entries)
            console.log(this.size)
            this.size *= 2;
            this.buckets = new Array(this.size)
            for (let pair of entries) {
                this.set(pair[0], pair[1])
            }
        }
    }
}

let m = new HashMap();
console.log(m.buckets)
m.set('ice cream', 'cornetto');
m.set('color', 'blue');
m.set('Name', 'you');
m.set('yellow', 'mine');
m.set('red', 'mine');
m.set('blue', 'mine');
m.set('Carla', 'value 1');
m.set('Carlos', 'value 2');
m.display()
m.set('CarLOS', 'value 3');
console.log(' new map: ')
m.display()
// let value = m.get('blue')
// console.log(value)
let keyExists = m.has('yello');
console.log(keyExists)
// m.display();
// m.remove('Carla')
// m.display();
// console.log(m.length())
// m.clear()
// m.set('blue', 'mine');
// m.set('Carla', 'value 1');
// m.set('Carlos', 'value 2');
// m.set('CarLOS', 'value 3');
// console.log(m.keys());
// console.log(m.values());
// console.log(m.entries());
