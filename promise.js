
function A () {

	let _a, _b, _c;
 
	_setA = () => { 
		return new Promise(resolve => {
		   const time_A = Math.floor(Math.random() * (130 - 50 + 1) + 50);
		    setTimeout(() => {
  		    _a = Math.floor(Math.random() * (10000 - 10 + 1) + 10);
			resolve (time_A); 
			}, time_A);
		});
	};

	_setB = () => {
		
		return new Promise(resolve => {
		   const time_B = Math.floor(Math.random() * (220 - 30 + 1) + 30);
		    setTimeout(() => {
  		    _b = new Date().getTime() / 3;
			resolve (time_B);
			}, time_B);
		}); 
	};

	_setC = (val) => {
		
		return new Promise(resolve => {
		   const time_C = Math.floor(Math.random() * (300 - 10 + 1) + 10);
		    setTimeout(() => {
  		    _c = val * 10;;
			resolve (time_C);
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
            		return res;
            	});
	};

	this.show = () => {
		console.log (`a ${_a}`);
		console.log (`b ${_b}`);
		console.log (`c ${_c}`);
		};


};

a = new A;

const showData = setInterval(() => 
     a.show(), 500);

const showProcess = (i) => {

	let j=i;

	a.process().then(resProcess => {

		    console.log(`Number of iteration_i ${j}, this number ${resProcess}`);
		  
     	   	if (resProcess<100) {

     	        clearInterval(showData);
                console.log(`Break_i ${j}`);
				console.log(`Is this number ${resProcess}`);

      		   } else {

      		if (j < 10001) {
      			j++;
      			showProcess(j);
      		} else {

      		   	clearInterval(showData);
      		   	console.log('Operation full done');

      		   }
      		};

     });
};

showProcess(i=0);