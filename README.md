# perfTime

PerfTime is a simple utility for measuring function execution time

It works by wrapping the `performance.now()` method and gives you a simple to use API for quick debugging purposes

## Installation:
```
npm i @tzwel/perftime
```

## Usage:
Assign perfTime to a variable and pass an options object containing the function. If omitted, function name is set to *unnamed function*
```js
const perfTime = require('@tzwel/perftime')

function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction})
	measurement.start()

	// function code to be measured

	measurement.stop()
	// => Executing 'someRandomFunction' took 0.006400000000000735ms
}

someRandomFunction()
```

### Multiple measures and average

You can measure a function multiple times and then get its average execution time

It can be done inside the function like this (useful when you want to limit the scope of the measurement): 

```js
function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction})
	
	for (let index = 0; index < 15; index++) { // a for loop that executes code multiple times
		measurement.start()

		// function code to be measured goes here

		measurement.stop()
	}

	console.log(measurement.averageTime); // log the average time of execution
}
```

Or by wrapping the function call in a for loop

```js
const measurement = new perfTime({function: someRandomFunction})
for (let index = 0; index < 15; index++) {
	measurement.start()
	someRandomFunction()
	measurement.stop()
}
console.log(measurement.averageTime);
```


### Compensation
PerfTime subtracts `0.0192` from the result by default. To disable this behavior, set compensation to 0:
```js
const measurement = new perfTime({compensation: 0})
```