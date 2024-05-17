const perfTime = require('./perftime')

function someRandomFunction() {
	// function code to be measured
	
}

const measurement = new perfTime({function: someRandomFunction}).start()
someRandomFunction()
measurement.stop()
console.log(measurement.averageTime);

