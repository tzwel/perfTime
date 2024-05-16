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
	}

	start() {
		console.log(`Measuring execution time of '${this.options.functionName}'`)
		this.timeStart = performance.now()
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
		return this.measurements.reduce((a, b) => a + b) / this.measurements.length;
	}
}

module.exports = perfTime;