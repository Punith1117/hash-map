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
        if (this.buckets.length == 0) {
            return false
        } else {
            for (let bucket of this.buckets) {
                if ((bucket == undefined) || (bucket.length == 0))
                    continue;
                for (let pair of bucket) {
                    if (pair[0] == key)
                        return true
                }
            }
            return false
        }
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
m.display()
let value = m.get('blue')
console.log(value)
let valueExists = m.has('yellow');
console.log(valueExists)