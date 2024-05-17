# ⏱️ perfTime

PerfTime is a simple and flexible utility for measuring function execution time

It works by wrapping the `performance.now()` method and gives you a simple to use API for quick debugging purposes

## Installation:
```
npm i @tzwel/perftime
```

Then require it in your project

```js
const perfTime = require('@tzwel/perftime')
```

## Usage:

### One-liner
You can pass your function to perfTime and then call the `.run()` method. This exectues the function, measures its execution time and then logs the result.
```js
new perfTime({function: yourFunctionHere}).run()
```

### Basic usage
```js
function someRandomFunction() {
	// initialize perfTime and start measuring
	const measurement = new perfTime('function name (or you can leave this blank)').start()

	// code to be measured goes here

	measurement.stop() // stop the measurement and log results
	// => Executing 'someRandomFunction' took 0.006400000000000735ms
}
```

You can also start the measurement in any point later:
```js
const measurement = new perfTime({function: someRandomFunction})
measurement.start()
// code to be measured goes here
measurement.stop()

```

The name of the measured function can be set in four different ways;

PerfTime accepts an `options` object or a `string` with a name as argument
```js
new perfTime('some function name') // string name
new perfTime({functionName: 'some function name'}) // options object with provided function name
new perfTime({function: someFunction}) // options object with the function name derived automatically from the passed function
new perfTime() // empty, function gets called an *unnamed function*
```


### Multiple measures and average
You can measure a function multiple times and then get its average execution time

> [!WARNING]
> When getting average time, the first result always gets omitted in calculating the average, because the first function call is always slower before optimizations take place

It can be done inside the function like this: 

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

Or by wrapping the function call in a for loop (you can implement this however you want)

```js
const measurement = new perfTime({function: someRandomFunction})
for (let index = 0; index < 15; index++) {
	measurement.start()
	someRandomFunction()
	measurement.stop()
}
console.log(measurement.averageTime);
```

## Compensation

PerfTime subtracts 0.0092 from the result by default. To disable this behavior, set compensation to 0:
```js
const measurement = new perfTime({compensation: 0})
```