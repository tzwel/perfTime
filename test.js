const perfTime = require('./perfTime')

function someRandomFunction() {
	// function code to be measured
	for (let index = 0; index < 500; index++) {
	}
}

new perfTime({function: someRandomFunction}).run(1)