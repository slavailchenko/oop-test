
function A () {
 
	_setA = () => { 
		return new Promise(resolve => {
		   const time_A = Math.floor(Math.random() * (130 - 50 + 1) + 50);
		    setTimeout(() => {
  		       this._a = Math.floor(Math.random() * (10000 - 10 + 1) + 10);
			// console.log (this._a);
			resolve (time_A); 
			// console.log(time_A);
			}, time_A);
		});
	};

	_setB = () => {
		
		return new Promise(resolve => {
		   const time_B = Math.floor(Math.random() * (220 - 30 + 1) + 30);
		    setTimeout(() => {
  		        this._b = new Date().getTime() / 3;
			// console.log (this._b);
			resolve (time_B);
			// console.log(time_B);
			}, time_B);
		}); 
	};

	_setC = (val) => {
		
		return new Promise(resolve => {
		   const time_C = Math.floor(Math.random() * (300 - 10 + 1) + 10);
		    setTimeout(() => {
  		        this._c = val * 10;;
			// console.log (this._c);
			resolve (time_C);
			// console.log(time_C);
			}, time_C);
		}); 
	};


	this.process = () => {

		return Promise.all([_setA(), _setB()]).
		
		then(([time_A, time_B]) => {
                	let tmp = (time_A + time_B)/2;
                	time1 = time_A;
                	time2 = time_B;
                	return _setC(tmp);
            	}).
		
		then(tmp => {
                	time3 = tmp;
            	})

            	.then((res) => { 
            		res = (time1 + time2 + time3)/3;
            		// console.log (res);
            		return res;
            	});
	};

	this.show = () => {
		console.log (`a ${this._a}`);
		console.log (`b ${this._b}`);
		console.log (`c ${this._c}`);
		};


};

a = new A;
// console.log (a.process());
// a.show();

const showData = setInterval(() => 
     a.show(), 500);


const showProcess = (i) => {

	let j=i;

	a.process().then(resProcess => {

		    console.log(`Number of iteration_i ${j}, this number ${resProcess}`);
		    j++;

     	   	if (resProcess<100) {

     	        clearInterval(showData);
                console.log(`Break_i ${j}`);
				console.log(`Is this number ${resProcess}`);

      		   } else {

      		if (j < 10001) {
      			showProcess(j);
      		} else {

      		   	clearInterval(showData);
      		   	console.log('Operation full done');

      		   }
      		}
     });
};

	showProcess(i=0);





