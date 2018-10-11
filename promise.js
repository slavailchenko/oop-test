 function A () {
	let _a, _b, _c;
	
	let _setA = () => { 
			_a = Math.floor(Math.random() * (10000 - 10 + 1) + 10)
			return _a;
	};

	let setTimeout_A = () => {
		let time_A = Math.floor(Math.random() * (130 - 50 + 1) + 50);
		setTimeout(_setA(), time_A);
		return time_A;
	};

	let _setB = () => { 
			_b = new Date().getTime() / 3
			return _b;
	};

	let setTimeout_B = () => { 
		let time_B = Math.floor(Math.random() * (220 - 30 + 1) + 30);
		setTimeout (_setB(), time_B);
		return time_B;
	};

	let _setC = (val) => { 
		_c = val * 10;
		return _c;
	};

	let setTimeout_C = (val) => { 
		let time_C = Math.floor(Math.random() * (300 - 10 + 1) + 10);
		setTimeout (_setC(val), time_C);
		return time_C;
	};

	this.process = () => {

		return Promise.all([setTimeout_A(), setTimeout_B()]).
		then (result => {
			let tmp = (setTimeout_A() + setTimeout_B())/2;
			// console.log (tmp);
			return tmp;
			}).
		then (tmp => {
			let avg = (tmp+setTimeout_C(tmp))/3;
			return avg; 
			});

		};

	this.show = () => {
		console.log (`a ${_setA()}`);
		console.log (`b ${_setB()}`);
		console.log (`c ${_setC((setTimeout_A() + setTimeout_B())/2)}`);
		};


};

a = new A;
console.log(a.process());
a.show();

// const showData = () => {
//   let i = 1;
//   let timerId = setInterval(function() {
//     console.log(a.show());
//     if (i == 30) clearInterval(timerId);
//     i++;
//   }, 500);
// }

// showData();

for (let j=1; j<10001; j++) {
	let tmp = a.process(); console.log(tmp);
	if (tmp < 100) {
		console.log(`Break_i${j}`);
		console.log(`Is this number${tmp}`);
		break;
	} else 
	if (j==10000) {
			console.log('Operation full done');
	};	


};