class MyArray {

  constructor(array) {
    this.data = array;
  }


  mapParallel (callback) {
    const data = Array.from(this.data);
    return Promise.all(data.map(callback)).then(d => 
    console.log(d)
    )}; 

  filterParallel (callback) {
    const data = Array.from(this.data);
    return Promise.all(data.map(el => filter(el))).
    then(item => data.filter(el => item.shift()));
  }

  reducePromise (fn) {
    const data = Array.from(this.data);
    return data.reduce(
        (a, i) => a.then((arr) => fn(i).then(d => arr.concat([d]))),
        Promise.resolve([])
    )
}   

}

const dealerships = [
{
        "dealershipId" : 113,
        "name" : "Drezdner Chevrolet",
        "state" : "NY",
        "sellingArea" : [ 
            "NY", 
            "NJ", 
            "CT"
        ]
    },
{
        "dealershipId" : 100002,
        "name" : "VIP Westbury CDJR",
        "state" : "NY",
        "sellingArea" : [ 
            "NY", 
            "NJ", 
            "CT"
        ]
    },
{
        "dealershipId" : 100145,
        "name" : "Honda of Thousand Oaks",
        "state" : "CA",
        "sellingArea" : [ 
            "CA"
        ]
    },
{
        "dealershipId" : 100138,
        "name" : "Route 44 Hyundai",
        "state" : "MA",
        "sellingArea" : [ 
            "MA", 
            "RI"
        ]
    },
    {
        "dealershipId" : 100146,
        "name" : "Crown CDJR",
        "state" : "CA",
        "sellingArea" : [ 
            "CA"
        ]
    }
];

let a = new MyArray (dealerships);

// map

let arrayMap = a.mapParallel ((item) => {
    return new Promise(resolve => setTimeout(() => {
        if (item.state == 'CA') item.isActive = true;
        resolve(item);
    }, 0));
});

console.log (arrayMap);

// filter 

let filter = item => new Promise(resolve => setTimeout(resolve, 10)).
then(() => item.state == 'CA');

let arrayFilter = a.filterParallel (filter).
then(results => console.log(results))
.catch(e => console.error(e));

console.log (arrayFilter);

// reduce

let fn = (i) => new Promise(res => {
    if (i.state == 'CA') i.isActive = true; res(i)})

let arrayReduce = a.reducePromise(fn).
            then(data => console.log(data)).
        catch(e => console.error(e));

console.log (arrayReduce);