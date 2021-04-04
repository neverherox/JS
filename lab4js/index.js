function Collection(){
    this.array = [];
}

Collection.from = function(array){
    let collection =  new Collection(array);
    collection.array = array;
    return collection;
};

Collection.prototype = {

    append: function(appended){
        if(appended instanceof Collection)
        {
            this.array = this.array.concat(appended.values());
        }
        this.array.push(appended);
    },

    removeAt: function(position) {
        if (position < 1 || position > this.array.length || isNaN(position))
        {
            return false;
        }
        this.array.splice(--position, 1);
        return true;
    },

    at: function(position) {
        if (position < 1 || position > this.array.length || isNaN(position))
        {
            return null;
        }
        return this.array[--position];
    },

    values: function() {
        return this.array;
    },

    count: function() {
        return this.array.length;
    },

    constructor: Collection
}

let collection1 = Collection.from(['a', 1 , 2 ,3, 'b', 'c', 'd', 8, 9, 'e']);
let collection2 = Collection.from(['a', 1 , 2 ,3, 'b', 'c', 'd', 8, 9, 'e']);
let collection3 = new Collection();

console.log(collection1.removeAt(10));
console.log(collection1.values());
console.log(collection1.append(collection2));
console.log(collection1.count());
console.log(collection1.values());

