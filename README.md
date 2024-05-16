# perfTime

PerfTime is a simple utility for measuring function execution time

It works by wrapping `performance.now()` method and gives you a simple to use API for quick debugging purposes

## Basic usage:
Assign perfTime to a variable and pass an options object containing the function. If omitted, function name is set to *unnamed function*
```js
const { perfTime } = require('./perfTime')

function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction})
	measurement.start()

	// function code to be measured

	measurement.stop()
	// => Executing 'someRandomFunction' took 0.006400000000000735ms
}

someRandomFunction()
```

### Compensation
PerfTime subtracts `0.0192` from the result by default. To disable this behavior, set compensation to 0:
```js
const measurement = new perfTime({compensation: 0})
```