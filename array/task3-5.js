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
}