const defaultOptions = {
	function: undefined,
	functionName: 'unnamed function'
}

class perfTime {
	time;
	measurements = [];
	constructor (options) {
		if (typeof options === 'string') {
			this.options = defaultOptions
			this.options.functionName = options
		} else {
			this.options = Object.assign(defaultOptions, options)
		}
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
		this.time = this.timeStop - this.timeStart
		console.log(`Executing '${this.options.functionName}' took ${this.time}ms`)
		this.measurements.push(this.time)
		this.timeStart = undefined
		this.timeStop = undefined
	}

	run(times = 1) {
		for (let index = 0; index < Math.max(1, times); index++) {
			this.start()
			this.options.function()
			this.stop()
		}
		return this
	}

	async runAsync(times = 1) {
		for (let index = 0; index < Math.max(1, times); index++) {
			this.start()
			await this.options.function()
			this.stop()
		}
		return this
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
