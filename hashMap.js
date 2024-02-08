// ====================[ Hash Map ]==================== //
class HashMap{
    constructor(size = 16){
        this.size = size;
        this.bucket = new Array(size)
        .fill()
        .map(() => new LinkedList());
        this.loadFactor = 0.75;
    }

    // Self imposed bucket limit 
    index(hash){
        if (hash < 0 || hash >= this.size) {
            throw new Error("Trying to access index out of bound");
          }else{
            return hash;
          }
    }

    // Method for generating hash code
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0; i < key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.size;
        }

        return hashCode;
    }

    // Method for assigning key & value to the hash key
    set(key, value){

        let index = this.index(this.hash(key));
        if(this.bucket[index].checkDuplicate(key)){
            console.log('Key: ' + key + ' allready exists at this index.');
            console.log('Updating the key with new value');
            
            this.bucket[index].updateValue(key,value);

        } else {
            console.log('-==-==-==-==-==-==-==-');
            console.log(' - key: ' + key);
            console.log(' - value: ' + value);
            console.log(' - index: ' + index);
            console.log('-==-==-==-==-==-==-==-');
    
            this.bucket[index].insertNode(key, value);
        }
    }

    // Method for printing values inside a bucket
    printBucketData(index){
        console.log('-= Printing data for index: ' + index + ' =-');
        this.bucket[index].printData();
        console.log('-= End of data printing =-')
    }

    // Method that gets the value of the key if the key is present in the hash map.
    get(key){
        let isFound = false;
        this.bucket.forEach(LinkedList => {
            let current = LinkedList.head;

            while(current !== null){
                if(current.key === key){
                    console.log('Key has been found in the hash map');
                    console.log('Key: '+key+' Value: '+ current.value);
                    console.log(LinkedList);
                    isFound = true;
                    break;
                }
                current = current.nextNode;
            }
        })
        if(isFound !== true)
            console.log('Key: ' + key + ' has not been found in the hash map.');
        return null;
    }

    // Method that checks if the key is present in the hash map, returns true if present, false if not.
    has(key){
        let isPresent = false;
        this.bucket.forEach(LinkedList => {
            let current = LinkedList.head;
            while(current !== null){
                if(key === current.key){
                    isPresent = true;
                    break;
                }

                current = current.nextNode;
            }
        })

        if(isPresent !== true){
            console.log('Key: ' + key + ' has not been found in the hash map.');
            return false;
        } else {
            console.log('Key: ' + key + ' is present in the hash map.');
            return true;
        }
    }

    // Removes the key from the hash map
    remove(key){
        let index = this.index(this.hash(key));
        let previous;
        let current = this.bucket[index].head;

        if (current.key === key){
            if(current.nextNode === undefined || current.nextNode === null){
                this.bucket[index].head = null;
                return true;
            }
            else {
                this.bucket[index].head = current.nextNode;
            }

        } else {
            previous = current;
            current = current.nextNode;
            while(current !== null){
                if(current.key === key){
                    previous.nextNode = current.nextNode;
                    return true;
                }
                previous = current;
                current = current.nextNode;
            }
        }

        console.log('Key not found in the hash map.');
    }

    // Return the number of keys inside the hash map
    length(){
        let numOfKeys = 0;
        this.bucket.forEach(LinkedList => {
            let current = LinkedList.head;
            while(current !== null){
                numOfKeys ++;
                current = current.nextNode;
            }
        })

        console.log(numOfKeys);
    }

    // Removes all entries in the hash map
    clear(){
        this.bucket.forEach(LinkedList => {
            LinkedList.head = null;
        })
    }

    // Returns an array containing all the keys inside the hash map
    keys(){
        let keys = [];
        let current;
        this.bucket.forEach(LinkedList => {
            current = LinkedList.head;
            while(current !== null){
                keys.push(current.key);

                current = current.nextNode;
            }
        })

        console.log(keys);
        return keys;
    }

    // Returns an array containing all the values inside the has map
    values(){
        let values = [];
        let current;
        this.bucket.forEach(LinkedList => {
            current = LinkedList.head;
            while(current !== null){
                values.push(current.value);

                current = current.nextNode;
            }
        })

        console.log(values);
        return values;
    }

    // Returns an array that contains each key / value pair
    entries(){
        let entries = [];
        let current;
        this.bucket.forEach(LinkedList => {
            current = LinkedList.head;
            while(current !== null){
                entries.push([current.key, current.value]);

                current = current.nextNode;
            }
        })

        console.log(entries);
        return entries;
    }
}
// ====================[ \Hash Map ]==================== //




// ====================[ Linked List ]==================== //
class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    // Inserts a new node into the linked list
    insertNode(key,value){
        if(this.head === null){
            this.head = new Node(key, value, null);
            this.size ++;
        } else {
            let current = this.head;
            this.head = new Node(key, value, current);
            this.size ++;
        }
    }

    // Prints all the data from the linked list
    printData(){
        if(this.head === null){
            console.log('   There are no nodes in the list!');
        } else {
            let current = this.head;
            while (current !== null){
                console.log(' - key: ' + current.key);
                console.log(' - value: ' + current.value);
                console.log('');
                current = current.nextNode;
            }
        }
    }

    // Looks for existing key inside the linked list
    checkDuplicate(key){
        let current = this.head;
        while(current !== null){


            if(current.key === key){
                return true;
            }

            current = current.nextNode;
        }

        return false;
    }

    // Method for updaing the new value
    updateValue(key, newValue){
        let current = this.head;
        while(current !== null){
            if (current.key === key){
                console.log('Updating ' + key + ' with new value: ' + newValue);

                current.value = newValue;
                return;
            }

            current = current.nextNode;
        }

        console.log('Value update failed, key reference not found for ' + key);
    }
}
// ====================[ \Linked List ]==================== //



// ====================[ Node ]==================== //
class Node {
    constructor(key = null,value = null,nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}
// ====================[ \Node ]==================== //





// ====================[ Testing all methods ]==================== //

// Creating new Has Map
let hm = new HashMap();

// Testing value update when multiple nodes with key are being added
hm.set('Nick', 12);
hm.set('Nick', 23);
hm.set('Nick', 43);

// Adding new key value pairs to the hash map
hm.set('Jelena', 43);
hm.set('Jenna', 43);
hm.set('Sirius', 43);
hm.set('Kitana', 43);
hm.set('Jhonny', 36);
hm.set('Carlos', 43);
hm.set('Carla', 36);
hm.set('Mario', 36);
hm.set('Marcus', 36);
hm.set('MarcusAurelius', 36);
hm.set('Konstantin', 36);
hm.set('Helena', 36);
hm.set('Caesar', 36);

// Print the data of bucket index
hm.printBucketData(3);
hm.printBucketData(9);

// Returns value for inserted key
hm.get('Nick');
hm.get('Malina');

// Method that checks if the hash map contains the given key
hm.has('Malina');
hm.has('Marcus');

// Testing method for removing entries
hm.printBucketData(3);
hm.remove('Nick');
hm.printBucketData(3);
hm.remove('Marcus');
hm.printBucketData(3);
hm.remove('Teddy');

// Method for total number of keys inside the hash map
hm.length();

// Method that returns all keys from the hash map
hm.keys();

// Method that returns all values from the hash map
hm.values();

// Method that returns all [key, value] pairs from the hash map
hm.entries();

// Method that removes all entries from the hash map
hm.clear();
hm.length();

// ====================[ \Testing all methods ]==================== //