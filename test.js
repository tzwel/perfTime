const perfTime = require('./perfTime')

function someRandomFunction() {
	// function code to be measured
	for (let index = 0; index < 500; index++) {
	}
}

async function asyncFunction() {
	return new Promise(resolve => setTimeout(resolve, 1));
}

// (async()=> {
// 	await asyncFunction()
// })()

// new perfTime({function: asyncFunction}).runAsync(3).then((measurement)=> {
// 	console.log(measurement.averageTime);
// })

new perfTime({function: asyncFunction}).runAsync()