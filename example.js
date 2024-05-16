const { perfTime } = require('tzwel@perfTime')

function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction})
	measurement.start()

	// function code to be measured
	for (let index = 0; index < 70; index++) {
		console.log(index);
	}

	const result = measurement.stop()
	console.log(result);
}

someRandomFunction()