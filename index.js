class HashMap {
    constructor(size) {
        this.size = size;
        this.buckets = new Array(this.size);
        this.elements = 0;
        this.loadFactor = 0.5;
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
        let hashCode = this.hash(key);
        let index = hashCode % 16;
        let bucket = this.buckets[index];
        for (let i = 0, pair = bucket[i] ; i < bucket.length; i++) {
            if (pair[i] == key) {
                return true
            }
        }
        return false
    }
    
    remove(key) {
        if (this.has(key)) {
            let hashCode = this.hash(key);
            let index = hashCode % 16;
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

    display() {
        for (let bucket of this.buckets) {
            if (bucket == undefined) {
                console.log('undefined bucket')
                continue
            }
            
            console.log('bucket: ')
            for (let pair of bucket) {
                console.log("   " + pair[0] + ": " + pair[1]);
            }
        }
    }
    
}

let m = new HashMap(16);
console.log(m.buckets)
m.set('ice cream', 'cornetto');
m.set('color', 'blue');
m.set('Name', 'you');
m.set('yellow', 'mine');
m.set('red', 'mine');
m.set('blue', 'mine');
m.set('Carla', 'value 1');
m.set('Carlos', 'value 2');
m.set('CarLOS', 'value 3');
let value = m.get('blue')
console.log(value)
let valueExists = m.has('yellow');
console.log(valueExists)
m.display();
m.remove('Carla')
m.display();
console.log(m.length())
m.clear()
m.set('blue', 'mine');
m.set('Carla', 'value 1');
m.set('Carlos', 'value 2');
m.set('CarLOS', 'value 3');
console.log(m.keys());
console.log(m.values());
