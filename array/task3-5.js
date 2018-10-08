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
  items=array.map (callback);
};

let s =	bubleSort([545, 65, 78, 90], ((item, i, items) => {
		let length = items.length; console.log (length, i, item);
 			// for (let i = 0; i < length; i++) { 
    			// for (let j = 0; j < (length - i - 1); j++) { 
      				if (item > items[i + 1]) {
                		let tmp = item; 
        				item = items[i + 1]; 
        				items[i + 1] = tmp; 
      					};
      					return item; console.log (item);
   					// };
  				// };
  				
  			})
);

console.log(s);


// OPTIONAL сортировка выбором. возвращаем новый массив - старый не трогаем
function selectionSort (array, callback) {
	
}

// OPTIONAL сортировка слиянием. возвращаем новый массив - старый не трогаем
function mergeSort (array, callback) {
	
}

// OPTIONAL быстрая сортировка. возвращаем новый массив - старый не трогаем
function quickSort (array, callback) {
	
}

