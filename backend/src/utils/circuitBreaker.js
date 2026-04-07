
//circuitBreakder.js
class CircuitBreaker {
    constructor(action, options) {
        options = options || {};
        this.action = action;
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.failureThreshold = options.failureThreshold || 3;
        this.resetTimeout = options.resetTimeout || 5000;
        this.nextTry = Date.now();
    }
    async fire(action, ...args) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextTry) {
                throw new Error('Circuit is OPEN');
            } else {
                this.state = "HALF";
            }
        }
        try {
            const result = await action(...args);
            this.failureCount = 0;
            this.state = 'CLOSED';
            return result;
        } catch (err) {

            if (this.state === 'HALF') {
                this.state = 'OPEN';
                this.nextTry = Date.now() + this.resetTimeout;
                throw err;
            }
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
                this.state = 'OPEN';
                this.nextTry = Date.now() + this.resetTimeout;
            }
            throw err;
        }
    }


}

module.exports = new CircuitBreaker();//