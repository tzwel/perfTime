const defaultOptions = {
	function: undefined,
	functionName: 'unnamed function',
	compensation: 0.0192
}

class perfTime {
	time;
	measurements = [];
	constructor (options) {
		this.options = Object.assign(defaultOptions, options)
		if (this.options.function) {
			this.options.functionName = options.function.name
		}
		this.timeStart = undefined
		this.timeStop = undefined
		return this
	}

	start() {
		console.log(`Measuring execution time of '${this.options.functionName}'`)
		this.timeStart = performance.now()
		return this
	}

	stop() {
		this.timeStop = performance.now()
		if (!this.timeStart) {
			return console.log(`Can't stop! You haven't started the timer! (${this.options.functionName})`);
		}
		const time = this.timeStop - this.timeStart - this.options.compensation
		console.log(`Executing '${this.options.functionName}' took ${time}ms`)
		this.measurements.push(time)
		this.timeStart = undefined
		this.timeStop = undefined
	}

	get averageTime() {
		let measurements = this.measurements
		if (measurements.length < 1) {
			throw 'No measurements were taken, can\'t get average time'
		}
		if (measurements.length > 1) {
			measurements.shift() // Remove first element of array because later calls get optimized
		}
		return measurements.reduce((a, b) => a + b) / measurements.length;
	}
}

module.exports = perfTime;