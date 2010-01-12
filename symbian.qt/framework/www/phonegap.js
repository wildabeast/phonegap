
function Notification() {
}

Notification.prototype.vibrate = function (duration, intensity) {
	if (isNaN(duration))
		duration = 3000;
	if (isNaN(intensity))
		intensity = 50;
	GapNotification.vibrate(duration, intensity);	
}

if (typeof navigator.notification == "undefined") navigator.notification = new Notification();

function DebugConsole() {
}

DebugConsole.prototype.log = function (output) {
	GapDebugConsole.log(output);
}

if (typeof debug == "undefined") debug = new DebugConsole();

/**
 * This class provides access to device GPS data.
 * @constructor
 */
function Geolocation() {
    /**
     * The last known GPS position.
     */
    this.lastPosition = null;
    this.lastError = null;
};

/**
 * Asynchronously aquires the current position.
 * @param {Function} successCallback The function to call when the position
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the position data.
 * @param {PositionOptions} options The options for getting the position data
 * such as timeout.
 */
Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback, options) {
    var referenceTime = 0;
    if (this.lastPosition)
        referenceTime = this.lastPosition.timeout;
    else
        this.start(options);

    var timeout = 20000;
    var interval = 500;
    if (typeof(options) == 'object' && options.interval)
        interval = options.interval;

    if (typeof(successCallback) != 'function')
        successCallback = function() {};
    if (typeof(errorCallback) != 'function')
        errorCallback = function() {};

    var dis = this;
    var delay = 0;
    var timer = setInterval(function() {
        delay += interval;
		
		//if we have a new position, call success and cancel the timer
        if (typeof(dis.lastPosition) == 'object' && dis.lastPosition.timestamp > referenceTime) {
            successCallback(dis.lastPosition);
            clearInterval(timer);
        } else if (delay >= timeout) { //else if timeout has occured then call error and cancel the timer
            errorCallback();
            clearInterval(timer);
        }
		//else the interval gets called again
    }, interval);
};

/**
 * Asynchronously aquires the position repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the position
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the position data.
 * @param {PositionOptions} options The options for getting the position data
 * such as timeout and the frequency of the watch.
 */
Geolocation.prototype.watchPosition = function(successCallback, errorCallback, options) {
	// Invoke the appropriate callback with a new Position object every time the implementation 
	// determines that the position of the hosting device has changed. 
	
	this.getCurrentPosition(successCallback, errorCallback, options);
	var frequency = 10000;
        if (typeof(options) == 'object' && options.frequency)
            frequency = options.frequency;
	
	var that = this;
	return setInterval(function() {
		that.getCurrentPosition(successCallback, errorCallback, options);
	}, frequency);
};


/**
 * Clears the specified position watch.
 * @param {String} watchId The ID of the watch returned from #watchPosition.
 */
Geolocation.prototype.clearWatch = function(watchId) {
	clearInterval(watchId);
};

Geolocation.prototype.start = function(options) {
	GapGeolocation.start(options.interval);
}

Geolocation.prototype.stop = function() {
	GapGeolocation.stop();
}

if (typeof navigator.geolocation == "undefined") navigator.geolocation = new Geolocation();

/**
 * This class provides access to the device orientation.
 * @constructor
 */
function Orientation() {
	/**
	 * The current orientation, or null if the orientation hasn't changed yet.
	 */
	this.currentOrientation = null;
}

/**
 * Asynchronously aquires the current orientation.
 * @param {Function} successCallback The function to call when the orientation
 * is known.
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the orientation.
 */
Orientation.prototype.getCurrentOrientation = function(successCallback, errorCallback) {
	// If the orientation is available then call success
	// If the orientation is not available then call error
	
	debug.log("getting orientation");
	
    if (typeof(successCallback) != 'function')
        successCallback = function() {};
    if (typeof(errorCallback) != 'function')
        errorCallback = function() {};
		
	if (this.currentOrientation) {
		successCallback(this.currentOrientation);
		return;
	}
	
	this.start();
	
    var timeout = 5000;
    var interval = 500;
    if (typeof(options) == 'object' && options.interval)
        interval = options.interval;
    if (typeof(options) == 'object' && options.timeout)
        timeout = options.timeout;

    var dis = this;
    var delay = 0;
    var timer = setInterval(function() {
        delay += interval;
		
		//if we have a new orientation, call success and cancel the timer
        if (dis.currentOrientation) {
            successCallback(dis.currentOrientation);
            clearInterval(timer);
        } else if (delay >= timeout) { //else if timeout has occured then call error and cancel the timer
            errorCallback();
            clearInterval(timer);
        }
		//else the interval gets called again
    }, interval);
};

Orientation.prototype.start = function () {
	debug.log("starting orientation");
	GapOrientation.start();
}

/**
 * Asynchronously aquires the orientation repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the orientation
 * data is available.
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the orientation data.
 */
Orientation.prototype.watchOrientation = function(successCallback, errorCallback, options) {
	// Invoke the appropriate callback with a new Position object every time the implementation 
	// determines that the position of the hosting device has changed. 
	
	debug.log("watching orientation");
	
	this.getCurrentOrientation(successCallback, errorCallback);
	var frequency = (options != undefined)? options.frequency : 1000;
	return setInterval(function() {
		navigator.orientation.getCurrentOrientation(successCallback, errorCallback);
	}, frequency);
};

/**
 * Clears the specified orientation watch.
 * @param {String} watchId The ID of the watch returned from #watchOrientation.
 */
Orientation.prototype.clearWatch = function(watchId) {
	clearInterval(watchId);
};

if (typeof navigator.orientation == "undefined") navigator.orientation = new Orientation();