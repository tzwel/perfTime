const perfTime = require('./perftime')

function someRandomFunction() {
	// function code to be measured
	for (let index = 0; index < 730; index++) {
		console.log(index);
	}
}

const measurement = new perfTime({function: someRandomFunction})
for (let index = 0; index < 15; index++) {
	measurement.start()
	someRandomFunction()
	measurement.stop()
}
console.log(measurement.averageTime);

