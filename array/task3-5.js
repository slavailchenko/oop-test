// Task 3

const iterableObject = {
	firstField: 1,
	secondField: 2
}

// здесь сделать объект итерируемым 

iterableObject.thirdField = 3
iterableObject.fourthField = 4

iterableObject[Symbol.iterator] = function() {

  let current = this.firstField;
  let last = this.fourthField;

  return {
    next() {
      if (current <= last) {
        return {
          done: false,
          value: current++
        };
      } else {
        return {
          done: true
        };
      }
    }

  }
};

for (const o of iterableObject) {
	console.log(o)
};

TASK 4

// свой reduce
function reduce (array, callback, initialValue) {
	return array.reduce(callback, initialValue);
}

let sum = reduce ([1,2,3,4], ((acc, val) => {
  return acc + val;
}), 0);

console.log (sum);

// свой map
function map (array, callback) {
	return array.map(callback);
}

let arr = map([2, 5, 6, 7], ((item)=>{
	return item*item;
}));

console.log (arr);

// прочитать про Big O нотацию. знать как высчитывается сложность алгоритмов

// сортировка пузырьком. возвращаем новый массив - старый не трогаем

function bubleSort (array, callback) {
 
 for (let i=0; i<(array.length-1); i++) {
      array.forEach (callback); 
      }; 
 return array;
};


let s =	bubleSort([545, 65, 78, 10], ((el, i, array) => {
      if (el > array[i+1]) {
        array[i] = array[i+1];
        array[i+1] = el;
      }
    })
);

console.log(s);


// OPTIONAL сортировка выбором. возвращаем новый массив - старый не трогаем

function selectionSort(array, callback) {
	return array.reduce (callback, []); 
}

let arr = selectionSort (array = [545, 65, 78, 10],((sortArr, el) => {
  let index = 0;
  while(index < array.length && el > array[index]) index++;
  sortArr.splice(index, 0, el);
  return sortArr;
})
);

console.log(arr);

// OPTIONAL сортировка слиянием. возвращаем новый массив - старый не трогаем
function mergeSort (array, callback) {

   if (!array || !array.length) {
        return null;
    }
   
   if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const arrLeft = array.slice(0, middle);
    const arrRight = array.slice(middle);

    return merge(mergeSort(arrLeft), mergeSort(arrRight));
	
};

let arr = mergeSort (array = [545, 65, 78, 10],(merge = (arrFirst, arrSecond) => {
    const arrSort = [];
    let i = j = 0;
    
    while (i < arrFirst.length && j < arrSecond.length) {
        arrSort.push(
            (arrFirst[i] < arrSecond[j]) ?
                arrFirst[i++] : arrSecond[j++]
        );
    }

    return [
        ...arrSort,
        ...arrFirst.slice(i),
        ...arrSecond.slice(j)
    ];
})
);

console.log (arr);

// OPTIONAL быстрая сортировка. возвращаем новый массив - старый не трогаем
function quickSort (array, callback) {
	return array.sort(callback);
	
}

let quick = quickSort(array=[545, 65, 78, 10], ((a,b)=> {
	return a> b ? 1 : -1;
})
	);
console.log(quick);

//TASK 5

const cars = [
	{make: 'Audi', status: 'ACTIVE', valueIndicator: 5612, price: 150000},
	{make: 'Audi', status: 'ACTIVE', valueIndicator: 6543, price: 172099},
	{make: 'Mercedes', status: 'ACTIVE', valueIndicator: 13314, price: 320999},
	{make: 'Mercedes', status: 'SOLD', valueIndicator: 20000, price: 199999},
	{make: 'BMW', status: 'ACTIVE', valueIndicator: 7502, price: 210999}
];

// weights : valueIndicator * 10 = price
// valueIndicator -> max
// price -> min
// methods cannot work with SOLD cars.

function dynamicSort(property) {
    
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a,b) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {

    let arg = arguments;
    return function (obj1, obj2) {
        let i = 0, result = 0, numberOfProperties = arg.length;

        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(arg[i])(obj1, obj2);
            i++;
        }
        return result;
    }
};

function getTheBest () {

	let array = cars.filter((item)=>{
		if (item.status=='ACTIVE') {
			return item;
		}
	});

	let sorted = array.sort(dynamicSortMultiple('-price'));
	return sorted[0];
}

console.log (getTheBest ());

function getMostEqualTo (valueIndicator, price) {
	
}


