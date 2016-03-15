/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/leaflet/leaflet.d.ts"/>
	/// <reference path="./typings/require.d.ts"/>
	"use strict";
	__webpack_require__(244);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(298);
	__webpack_require__(306);


/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
	 (c) 2010-2013, Vladimir Agafonkin
	 (c) 2010-2011, CloudMade
	*/
	(function (window, document, undefined) {
	var oldL = window.L,
	    L = {};
	
	L.version = '0.7.7';
	
	// define Leaflet for Node module pattern loaders, including Browserify
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = L;
	
	// define Leaflet as an AMD module
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (L), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	// define Leaflet as a global L variable, saving the original L to restore later if needed
	
	L.noConflict = function () {
		window.L = oldL;
		return this;
	};
	
	window.L = L;
	
	
	/*
	 * L.Util contains various utility functions used throughout Leaflet code.
	 */
	
	L.Util = {
		extend: function (dest) { // (Object[, Object, ...]) ->
			var sources = Array.prototype.slice.call(arguments, 1),
			    i, j, len, src;
	
			for (j = 0, len = sources.length; j < len; j++) {
				src = sources[j] || {};
				for (i in src) {
					if (src.hasOwnProperty(i)) {
						dest[i] = src[i];
					}
				}
			}
			return dest;
		},
	
		bind: function (fn, obj) { // (Function, Object) -> Function
			var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
			return function () {
				return fn.apply(obj, args || arguments);
			};
		},
	
		stamp: (function () {
			var lastId = 0,
			    key = '_leaflet_id';
			return function (obj) {
				obj[key] = obj[key] || ++lastId;
				return obj[key];
			};
		}()),
	
		invokeEach: function (obj, method, context) {
			var i, args;
	
			if (typeof obj === 'object') {
				args = Array.prototype.slice.call(arguments, 3);
	
				for (i in obj) {
					method.apply(context, [i, obj[i]].concat(args));
				}
				return true;
			}
	
			return false;
		},
	
		limitExecByInterval: function (fn, time, context) {
			var lock, execOnUnlock;
	
			return function wrapperFn() {
				var args = arguments;
	
				if (lock) {
					execOnUnlock = true;
					return;
				}
	
				lock = true;
	
				setTimeout(function () {
					lock = false;
	
					if (execOnUnlock) {
						wrapperFn.apply(context, args);
						execOnUnlock = false;
					}
				}, time);
	
				fn.apply(context, args);
			};
		},
	
		falseFn: function () {
			return false;
		},
	
		formatNum: function (num, digits) {
			var pow = Math.pow(10, digits || 5);
			return Math.round(num * pow) / pow;
		},
	
		trim: function (str) {
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
		},
	
		splitWords: function (str) {
			return L.Util.trim(str).split(/\s+/);
		},
	
		setOptions: function (obj, options) {
			obj.options = L.extend({}, obj.options, options);
			return obj.options;
		},
	
		getParamString: function (obj, existingUrl, uppercase) {
			var params = [];
			for (var i in obj) {
				params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
			}
			return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
		},
		template: function (str, data) {
			return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
				var value = data[key];
				if (value === undefined) {
					throw new Error('No value provided for variable ' + str);
				} else if (typeof value === 'function') {
					value = value(data);
				}
				return value;
			});
		},
	
		isArray: Array.isArray || function (obj) {
			return (Object.prototype.toString.call(obj) === '[object Array]');
		},
	
		emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
	};
	
	(function () {
	
		// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	
		function getPrefixed(name) {
			var i, fn,
			    prefixes = ['webkit', 'moz', 'o', 'ms'];
	
			for (i = 0; i < prefixes.length && !fn; i++) {
				fn = window[prefixes[i] + name];
			}
	
			return fn;
		}
	
		var lastTime = 0;
	
		function timeoutDefer(fn) {
			var time = +new Date(),
			    timeToCall = Math.max(0, 16 - (time - lastTime));
	
			lastTime = time + timeToCall;
			return window.setTimeout(fn, timeToCall);
		}
	
		var requestFn = window.requestAnimationFrame ||
		        getPrefixed('RequestAnimationFrame') || timeoutDefer;
	
		var cancelFn = window.cancelAnimationFrame ||
		        getPrefixed('CancelAnimationFrame') ||
		        getPrefixed('CancelRequestAnimationFrame') ||
		        function (id) { window.clearTimeout(id); };
	
	
		L.Util.requestAnimFrame = function (fn, context, immediate, element) {
			fn = L.bind(fn, context);
	
			if (immediate && requestFn === timeoutDefer) {
				fn();
			} else {
				return requestFn.call(window, fn, element);
			}
		};
	
		L.Util.cancelAnimFrame = function (id) {
			if (id) {
				cancelFn.call(window, id);
			}
		};
	
	}());
	
	// shortcuts for most used utility functions
	L.extend = L.Util.extend;
	L.bind = L.Util.bind;
	L.stamp = L.Util.stamp;
	L.setOptions = L.Util.setOptions;
	
	
	/*
	 * L.Class powers the OOP facilities of the library.
	 * Thanks to John Resig and Dean Edwards for inspiration!
	 */
	
	L.Class = function () {};
	
	L.Class.extend = function (props) {
	
		// extended class with the new prototype
		var NewClass = function () {
	
			// call the constructor
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
	
			// call all constructor hooks
			if (this._initHooks) {
				this.callInitHooks();
			}
		};
	
		// instantiate class without calling constructor
		var F = function () {};
		F.prototype = this.prototype;
	
		var proto = new F();
		proto.constructor = NewClass;
	
		NewClass.prototype = proto;
	
		//inherit parent's statics
		for (var i in this) {
			if (this.hasOwnProperty(i) && i !== 'prototype') {
				NewClass[i] = this[i];
			}
		}
	
		// mix static properties into the class
		if (props.statics) {
			L.extend(NewClass, props.statics);
			delete props.statics;
		}
	
		// mix includes into the prototype
		if (props.includes) {
			L.Util.extend.apply(null, [proto].concat(props.includes));
			delete props.includes;
		}
	
		// merge options
		if (props.options && proto.options) {
			props.options = L.extend({}, proto.options, props.options);
		}
	
		// mix given properties into the prototype
		L.extend(proto, props);
	
		proto._initHooks = [];
	
		var parent = this;
		// jshint camelcase: false
		NewClass.__super__ = parent.prototype;
	
		// add method for calling all hooks
		proto.callInitHooks = function () {
	
			if (this._initHooksCalled) { return; }
	
			if (parent.prototype.callInitHooks) {
				parent.prototype.callInitHooks.call(this);
			}
	
			this._initHooksCalled = true;
	
			for (var i = 0, len = proto._initHooks.length; i < len; i++) {
				proto._initHooks[i].call(this);
			}
		};
	
		return NewClass;
	};
	
	
	// method for adding properties to prototype
	L.Class.include = function (props) {
		L.extend(this.prototype, props);
	};
	
	// merge new default options to the Class
	L.Class.mergeOptions = function (options) {
		L.extend(this.prototype.options, options);
	};
	
	// add a constructor hook
	L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
		var args = Array.prototype.slice.call(arguments, 1);
	
		var init = typeof fn === 'function' ? fn : function () {
			this[fn].apply(this, args);
		};
	
		this.prototype._initHooks = this.prototype._initHooks || [];
		this.prototype._initHooks.push(init);
	};
	
	
	/*
	 * L.Mixin.Events is used to add custom events functionality to Leaflet classes.
	 */
	
	var eventsKey = '_leaflet_events';
	
	L.Mixin = {};
	
	L.Mixin.Events = {
	
		addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])
	
			// types can be a map of types/handlers
			if (L.Util.invokeEach(types, this.addEventListener, this, fn, context)) { return this; }
	
			var events = this[eventsKey] = this[eventsKey] || {},
			    contextId = context && context !== this && L.stamp(context),
			    i, len, event, type, indexKey, indexLenKey, typeIndex;
	
			// types can be a string of space-separated words
			types = L.Util.splitWords(types);
	
			for (i = 0, len = types.length; i < len; i++) {
				event = {
					action: fn,
					context: context || this
				};
				type = types[i];
	
				if (contextId) {
					// store listeners of a particular context in a separate hash (if it has an id)
					// gives a major performance boost when removing thousands of map layers
	
					indexKey = type + '_idx';
					indexLenKey = indexKey + '_len';
	
					typeIndex = events[indexKey] = events[indexKey] || {};
	
					if (!typeIndex[contextId]) {
						typeIndex[contextId] = [];
	
						// keep track of the number of keys in the index to quickly check if it's empty
						events[indexLenKey] = (events[indexLenKey] || 0) + 1;
					}
	
					typeIndex[contextId].push(event);
	
	
				} else {
					events[type] = events[type] || [];
					events[type].push(event);
				}
			}
	
			return this;
		},
	
		hasEventListeners: function (type) { // (String) -> Boolean
			var events = this[eventsKey];
			return !!events && ((type in events && events[type].length > 0) ||
			                    (type + '_idx' in events && events[type + '_idx_len'] > 0));
		},
	
		removeEventListener: function (types, fn, context) { // ([String, Function, Object]) or (Object[, Object])
	
			if (!this[eventsKey]) {
				return this;
			}
	
			if (!types) {
				return this.clearAllEventListeners();
			}
	
			if (L.Util.invokeEach(types, this.removeEventListener, this, fn, context)) { return this; }
	
			var events = this[eventsKey],
			    contextId = context && context !== this && L.stamp(context),
			    i, len, type, listeners, j, indexKey, indexLenKey, typeIndex, removed;
	
			types = L.Util.splitWords(types);
	
			for (i = 0, len = types.length; i < len; i++) {
				type = types[i];
				indexKey = type + '_idx';
				indexLenKey = indexKey + '_len';
	
				typeIndex = events[indexKey];
	
				if (!fn) {
					// clear all listeners for a type if function isn't specified
					delete events[type];
					delete events[indexKey];
					delete events[indexLenKey];
	
				} else {
					listeners = contextId && typeIndex ? typeIndex[contextId] : events[type];
	
					if (listeners) {
						for (j = listeners.length - 1; j >= 0; j--) {
							if ((listeners[j].action === fn) && (!context || (listeners[j].context === context))) {
								removed = listeners.splice(j, 1);
								// set the old action to a no-op, because it is possible
								// that the listener is being iterated over as part of a dispatch
								removed[0].action = L.Util.falseFn;
							}
						}
	
						if (context && typeIndex && (listeners.length === 0)) {
							delete typeIndex[contextId];
							events[indexLenKey]--;
						}
					}
				}
			}
	
			return this;
		},
	
		clearAllEventListeners: function () {
			delete this[eventsKey];
			return this;
		},
	
		fireEvent: function (type, data) { // (String[, Object])
			if (!this.hasEventListeners(type)) {
				return this;
			}
	
			var event = L.Util.extend({}, data, { type: type, target: this });
	
			var events = this[eventsKey],
			    listeners, i, len, typeIndex, contextId;
	
			if (events[type]) {
				// make sure adding/removing listeners inside other listeners won't cause infinite loop
				listeners = events[type].slice();
	
				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].action.call(listeners[i].context, event);
				}
			}
	
			// fire event for the context-indexed listeners as well
			typeIndex = events[type + '_idx'];
	
			for (contextId in typeIndex) {
				listeners = typeIndex[contextId].slice();
	
				if (listeners) {
					for (i = 0, len = listeners.length; i < len; i++) {
						listeners[i].action.call(listeners[i].context, event);
					}
				}
			}
	
			return this;
		},
	
		addOneTimeEventListener: function (types, fn, context) {
	
			if (L.Util.invokeEach(types, this.addOneTimeEventListener, this, fn, context)) { return this; }
	
			var handler = L.bind(function () {
				this
				    .removeEventListener(types, fn, context)
				    .removeEventListener(types, handler, context);
			}, this);
	
			return this
			    .addEventListener(types, fn, context)
			    .addEventListener(types, handler, context);
		}
	};
	
	L.Mixin.Events.on = L.Mixin.Events.addEventListener;
	L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
	L.Mixin.Events.once = L.Mixin.Events.addOneTimeEventListener;
	L.Mixin.Events.fire = L.Mixin.Events.fireEvent;
	
	
	/*
	 * L.Browser handles different browser and feature detections for internal Leaflet use.
	 */
	
	(function () {
	
		var ie = 'ActiveXObject' in window,
			ielt9 = ie && !document.addEventListener,
	
		    // terrible browser detection to work around Safari / iOS / Android browser bugs
		    ua = navigator.userAgent.toLowerCase(),
		    webkit = ua.indexOf('webkit') !== -1,
		    chrome = ua.indexOf('chrome') !== -1,
		    phantomjs = ua.indexOf('phantom') !== -1,
		    android = ua.indexOf('android') !== -1,
		    android23 = ua.search('android [23]') !== -1,
			gecko = ua.indexOf('gecko') !== -1,
	
		    mobile = typeof orientation !== undefined + '',
		    msPointer = !window.PointerEvent && window.MSPointerEvent,
			pointer = (window.PointerEvent && window.navigator.pointerEnabled) ||
					  msPointer,
		    retina = ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
		             ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)') &&
		              window.matchMedia('(min-resolution:144dpi)').matches),
	
		    doc = document.documentElement,
		    ie3d = ie && ('transition' in doc.style),
		    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
		    gecko3d = 'MozPerspective' in doc.style,
		    opera3d = 'OTransition' in doc.style,
		    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs;
	
		var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));
	
		L.Browser = {
			ie: ie,
			ielt9: ielt9,
			webkit: webkit,
			gecko: gecko && !webkit && !window.opera && !ie,
	
			android: android,
			android23: android23,
	
			chrome: chrome,
	
			ie3d: ie3d,
			webkit3d: webkit3d,
			gecko3d: gecko3d,
			opera3d: opera3d,
			any3d: any3d,
	
			mobile: mobile,
			mobileWebkit: mobile && webkit,
			mobileWebkit3d: mobile && webkit3d,
			mobileOpera: mobile && window.opera,
	
			touch: touch,
			msPointer: msPointer,
			pointer: pointer,
	
			retina: retina
		};
	
	}());
	
	
	/*
	 * L.Point represents a point with x and y coordinates.
	 */
	
	L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
		this.x = (round ? Math.round(x) : x);
		this.y = (round ? Math.round(y) : y);
	};
	
	L.Point.prototype = {
	
		clone: function () {
			return new L.Point(this.x, this.y);
		},
	
		// non-destructive, returns a new point
		add: function (point) {
			return this.clone()._add(L.point(point));
		},
	
		// destructive, used directly for performance in situations where it's safe to modify existing point
		_add: function (point) {
			this.x += point.x;
			this.y += point.y;
			return this;
		},
	
		subtract: function (point) {
			return this.clone()._subtract(L.point(point));
		},
	
		_subtract: function (point) {
			this.x -= point.x;
			this.y -= point.y;
			return this;
		},
	
		divideBy: function (num) {
			return this.clone()._divideBy(num);
		},
	
		_divideBy: function (num) {
			this.x /= num;
			this.y /= num;
			return this;
		},
	
		multiplyBy: function (num) {
			return this.clone()._multiplyBy(num);
		},
	
		_multiplyBy: function (num) {
			this.x *= num;
			this.y *= num;
			return this;
		},
	
		round: function () {
			return this.clone()._round();
		},
	
		_round: function () {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			return this;
		},
	
		floor: function () {
			return this.clone()._floor();
		},
	
		_floor: function () {
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			return this;
		},
	
		distanceTo: function (point) {
			point = L.point(point);
	
			var x = point.x - this.x,
			    y = point.y - this.y;
	
			return Math.sqrt(x * x + y * y);
		},
	
		equals: function (point) {
			point = L.point(point);
	
			return point.x === this.x &&
			       point.y === this.y;
		},
	
		contains: function (point) {
			point = L.point(point);
	
			return Math.abs(point.x) <= Math.abs(this.x) &&
			       Math.abs(point.y) <= Math.abs(this.y);
		},
	
		toString: function () {
			return 'Point(' +
			        L.Util.formatNum(this.x) + ', ' +
			        L.Util.formatNum(this.y) + ')';
		}
	};
	
	L.point = function (x, y, round) {
		if (x instanceof L.Point) {
			return x;
		}
		if (L.Util.isArray(x)) {
			return new L.Point(x[0], x[1]);
		}
		if (x === undefined || x === null) {
			return x;
		}
		return new L.Point(x, y, round);
	};
	
	
	/*
	 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
	 */
	
	L.Bounds = function (a, b) { //(Point, Point) or Point[]
		if (!a) { return; }
	
		var points = b ? [a, b] : a;
	
		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	};
	
	L.Bounds.prototype = {
		// extend the bounds to contain the given point
		extend: function (point) { // (Point)
			point = L.point(point);
	
			if (!this.min && !this.max) {
				this.min = point.clone();
				this.max = point.clone();
			} else {
				this.min.x = Math.min(point.x, this.min.x);
				this.max.x = Math.max(point.x, this.max.x);
				this.min.y = Math.min(point.y, this.min.y);
				this.max.y = Math.max(point.y, this.max.y);
			}
			return this;
		},
	
		getCenter: function (round) { // (Boolean) -> Point
			return new L.Point(
			        (this.min.x + this.max.x) / 2,
			        (this.min.y + this.max.y) / 2, round);
		},
	
		getBottomLeft: function () { // -> Point
			return new L.Point(this.min.x, this.max.y);
		},
	
		getTopRight: function () { // -> Point
			return new L.Point(this.max.x, this.min.y);
		},
	
		getSize: function () {
			return this.max.subtract(this.min);
		},
	
		contains: function (obj) { // (Bounds) or (Point) -> Boolean
			var min, max;
	
			if (typeof obj[0] === 'number' || obj instanceof L.Point) {
				obj = L.point(obj);
			} else {
				obj = L.bounds(obj);
			}
	
			if (obj instanceof L.Bounds) {
				min = obj.min;
				max = obj.max;
			} else {
				min = max = obj;
			}
	
			return (min.x >= this.min.x) &&
			       (max.x <= this.max.x) &&
			       (min.y >= this.min.y) &&
			       (max.y <= this.max.y);
		},
	
		intersects: function (bounds) { // (Bounds) -> Boolean
			bounds = L.bounds(bounds);
	
			var min = this.min,
			    max = this.max,
			    min2 = bounds.min,
			    max2 = bounds.max,
			    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
			    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);
	
			return xIntersects && yIntersects;
		},
	
		isValid: function () {
			return !!(this.min && this.max);
		}
	};
	
	L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
		if (!a || a instanceof L.Bounds) {
			return a;
		}
		return new L.Bounds(a, b);
	};
	
	
	/*
	 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
	 */
	
	L.Transformation = function (a, b, c, d) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	};
	
	L.Transformation.prototype = {
		transform: function (point, scale) { // (Point, Number) -> Point
			return this._transform(point.clone(), scale);
		},
	
		// destructive transform (faster)
		_transform: function (point, scale) {
			scale = scale || 1;
			point.x = scale * (this._a * point.x + this._b);
			point.y = scale * (this._c * point.y + this._d);
			return point;
		},
	
		untransform: function (point, scale) {
			scale = scale || 1;
			return new L.Point(
			        (point.x / scale - this._b) / this._a,
			        (point.y / scale - this._d) / this._c);
		}
	};
	
	
	/*
	 * L.DomUtil contains various utility functions for working with DOM.
	 */
	
	L.DomUtil = {
		get: function (id) {
			return (typeof id === 'string' ? document.getElementById(id) : id);
		},
	
		getStyle: function (el, style) {
	
			var value = el.style[style];
	
			if (!value && el.currentStyle) {
				value = el.currentStyle[style];
			}
	
			if ((!value || value === 'auto') && document.defaultView) {
				var css = document.defaultView.getComputedStyle(el, null);
				value = css ? css[style] : null;
			}
	
			return value === 'auto' ? null : value;
		},
	
		getViewportOffset: function (element) {
	
			var top = 0,
			    left = 0,
			    el = element,
			    docBody = document.body,
			    docEl = document.documentElement,
			    pos;
	
			do {
				top  += el.offsetTop  || 0;
				left += el.offsetLeft || 0;
	
				//add borders
				top += parseInt(L.DomUtil.getStyle(el, 'borderTopWidth'), 10) || 0;
				left += parseInt(L.DomUtil.getStyle(el, 'borderLeftWidth'), 10) || 0;
	
				pos = L.DomUtil.getStyle(el, 'position');
	
				if (el.offsetParent === docBody && pos === 'absolute') { break; }
	
				if (pos === 'fixed') {
					top  += docBody.scrollTop  || docEl.scrollTop  || 0;
					left += docBody.scrollLeft || docEl.scrollLeft || 0;
					break;
				}
	
				if (pos === 'relative' && !el.offsetLeft) {
					var width = L.DomUtil.getStyle(el, 'width'),
					    maxWidth = L.DomUtil.getStyle(el, 'max-width'),
					    r = el.getBoundingClientRect();
	
					if (width !== 'none' || maxWidth !== 'none') {
						left += r.left + el.clientLeft;
					}
	
					//calculate full y offset since we're breaking out of the loop
					top += r.top + (docBody.scrollTop  || docEl.scrollTop  || 0);
	
					break;
				}
	
				el = el.offsetParent;
	
			} while (el);
	
			el = element;
	
			do {
				if (el === docBody) { break; }
	
				top  -= el.scrollTop  || 0;
				left -= el.scrollLeft || 0;
	
				el = el.parentNode;
			} while (el);
	
			return new L.Point(left, top);
		},
	
		documentIsLtr: function () {
			if (!L.DomUtil._docIsLtrCached) {
				L.DomUtil._docIsLtrCached = true;
				L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === 'ltr';
			}
			return L.DomUtil._docIsLtr;
		},
	
		create: function (tagName, className, container) {
	
			var el = document.createElement(tagName);
			el.className = className;
	
			if (container) {
				container.appendChild(el);
			}
	
			return el;
		},
	
		hasClass: function (el, name) {
			if (el.classList !== undefined) {
				return el.classList.contains(name);
			}
			var className = L.DomUtil._getClass(el);
			return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
		},
	
		addClass: function (el, name) {
			if (el.classList !== undefined) {
				var classes = L.Util.splitWords(name);
				for (var i = 0, len = classes.length; i < len; i++) {
					el.classList.add(classes[i]);
				}
			} else if (!L.DomUtil.hasClass(el, name)) {
				var className = L.DomUtil._getClass(el);
				L.DomUtil._setClass(el, (className ? className + ' ' : '') + name);
			}
		},
	
		removeClass: function (el, name) {
			if (el.classList !== undefined) {
				el.classList.remove(name);
			} else {
				L.DomUtil._setClass(el, L.Util.trim((' ' + L.DomUtil._getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
			}
		},
	
		_setClass: function (el, name) {
			if (el.className.baseVal === undefined) {
				el.className = name;
			} else {
				// in case of SVG element
				el.className.baseVal = name;
			}
		},
	
		_getClass: function (el) {
			return el.className.baseVal === undefined ? el.className : el.className.baseVal;
		},
	
		setOpacity: function (el, value) {
	
			if ('opacity' in el.style) {
				el.style.opacity = value;
	
			} else if ('filter' in el.style) {
	
				var filter = false,
				    filterName = 'DXImageTransform.Microsoft.Alpha';
	
				// filters collection throws an error if we try to retrieve a filter that doesn't exist
				try {
					filter = el.filters.item(filterName);
				} catch (e) {
					// don't set opacity to 1 if we haven't already set an opacity,
					// it isn't needed and breaks transparent pngs.
					if (value === 1) { return; }
				}
	
				value = Math.round(value * 100);
	
				if (filter) {
					filter.Enabled = (value !== 100);
					filter.Opacity = value;
				} else {
					el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
				}
			}
		},
	
		testProp: function (props) {
	
			var style = document.documentElement.style;
	
			for (var i = 0; i < props.length; i++) {
				if (props[i] in style) {
					return props[i];
				}
			}
			return false;
		},
	
		getTranslateString: function (point) {
			// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
			// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
			// (same speed either way), Opera 12 doesn't support translate3d
	
			var is3d = L.Browser.webkit3d,
			    open = 'translate' + (is3d ? '3d' : '') + '(',
			    close = (is3d ? ',0' : '') + ')';
	
			return open + point.x + 'px,' + point.y + 'px' + close;
		},
	
		getScaleString: function (scale, origin) {
	
			var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
			    scaleStr = ' scale(' + scale + ') ';
	
			return preTranslateStr + scaleStr;
		},
	
		setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])
	
			// jshint camelcase: false
			el._leaflet_pos = point;
	
			if (!disable3D && L.Browser.any3d) {
				el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
			} else {
				el.style.left = point.x + 'px';
				el.style.top = point.y + 'px';
			}
		},
	
		getPosition: function (el) {
			// this method is only used for elements previously positioned using setPosition,
			// so it's safe to cache the position for performance
	
			// jshint camelcase: false
			return el._leaflet_pos;
		}
	};
	
	
	// prefix style property names
	
	L.DomUtil.TRANSFORM = L.DomUtil.testProp(
	        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);
	
	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser
	
	L.DomUtil.TRANSITION = L.DomUtil.testProp(
	        ['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);
	
	L.DomUtil.TRANSITION_END =
	        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
	        L.DomUtil.TRANSITION + 'End' : 'transitionend';
	
	(function () {
	    if ('onselectstart' in document) {
	        L.extend(L.DomUtil, {
	            disableTextSelection: function () {
	                L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
	            },
	
	            enableTextSelection: function () {
	                L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
	            }
	        });
	    } else {
	        var userSelectProperty = L.DomUtil.testProp(
	            ['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);
	
	        L.extend(L.DomUtil, {
	            disableTextSelection: function () {
	                if (userSelectProperty) {
	                    var style = document.documentElement.style;
	                    this._userSelect = style[userSelectProperty];
	                    style[userSelectProperty] = 'none';
	                }
	            },
	
	            enableTextSelection: function () {
	                if (userSelectProperty) {
	                    document.documentElement.style[userSelectProperty] = this._userSelect;
	                    delete this._userSelect;
	                }
	            }
	        });
	    }
	
		L.extend(L.DomUtil, {
			disableImageDrag: function () {
				L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
			},
	
			enableImageDrag: function () {
				L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
			}
		});
	})();
	
	
	/*
	 * L.LatLng represents a geographical point with latitude and longitude coordinates.
	 */
	
	L.LatLng = function (lat, lng, alt) { // (Number, Number, Number)
		lat = parseFloat(lat);
		lng = parseFloat(lng);
	
		if (isNaN(lat) || isNaN(lng)) {
			throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
		}
	
		this.lat = lat;
		this.lng = lng;
	
		if (alt !== undefined) {
			this.alt = parseFloat(alt);
		}
	};
	
	L.extend(L.LatLng, {
		DEG_TO_RAD: Math.PI / 180,
		RAD_TO_DEG: 180 / Math.PI,
		MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
	});
	
	L.LatLng.prototype = {
		equals: function (obj) { // (LatLng) -> Boolean
			if (!obj) { return false; }
	
			obj = L.latLng(obj);
	
			var margin = Math.max(
			        Math.abs(this.lat - obj.lat),
			        Math.abs(this.lng - obj.lng));
	
			return margin <= L.LatLng.MAX_MARGIN;
		},
	
		toString: function (precision) { // (Number) -> String
			return 'LatLng(' +
			        L.Util.formatNum(this.lat, precision) + ', ' +
			        L.Util.formatNum(this.lng, precision) + ')';
		},
	
		// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
		// TODO move to projection code, LatLng shouldn't know about Earth
		distanceTo: function (other) { // (LatLng) -> Number
			other = L.latLng(other);
	
			var R = 6378137, // earth radius in meters
			    d2r = L.LatLng.DEG_TO_RAD,
			    dLat = (other.lat - this.lat) * d2r,
			    dLon = (other.lng - this.lng) * d2r,
			    lat1 = this.lat * d2r,
			    lat2 = other.lat * d2r,
			    sin1 = Math.sin(dLat / 2),
			    sin2 = Math.sin(dLon / 2);
	
			var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);
	
			return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		},
	
		wrap: function (a, b) { // (Number, Number) -> LatLng
			var lng = this.lng;
	
			a = a || -180;
			b = b ||  180;
	
			lng = (lng + b) % (b - a) + (lng < a || lng === b ? b : a);
	
			return new L.LatLng(this.lat, lng);
		}
	};
	
	L.latLng = function (a, b) { // (LatLng) or ([Number, Number]) or (Number, Number)
		if (a instanceof L.LatLng) {
			return a;
		}
		if (L.Util.isArray(a)) {
			if (typeof a[0] === 'number' || typeof a[0] === 'string') {
				return new L.LatLng(a[0], a[1], a[2]);
			} else {
				return null;
			}
		}
		if (a === undefined || a === null) {
			return a;
		}
		if (typeof a === 'object' && 'lat' in a) {
			return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
		}
		if (b === undefined) {
			return null;
		}
		return new L.LatLng(a, b);
	};
	
	
	
	/*
	 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
	 */
	
	L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
		if (!southWest) { return; }
	
		var latlngs = northEast ? [southWest, northEast] : southWest;
	
		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	};
	
	L.LatLngBounds.prototype = {
		// extend the bounds to contain the given point or bounds
		extend: function (obj) { // (LatLng) or (LatLngBounds)
			if (!obj) { return this; }
	
			var latLng = L.latLng(obj);
			if (latLng !== null) {
				obj = latLng;
			} else {
				obj = L.latLngBounds(obj);
			}
	
			if (obj instanceof L.LatLng) {
				if (!this._southWest && !this._northEast) {
					this._southWest = new L.LatLng(obj.lat, obj.lng);
					this._northEast = new L.LatLng(obj.lat, obj.lng);
				} else {
					this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
					this._southWest.lng = Math.min(obj.lng, this._southWest.lng);
	
					this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
					this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
				}
			} else if (obj instanceof L.LatLngBounds) {
				this.extend(obj._southWest);
				this.extend(obj._northEast);
			}
			return this;
		},
	
		// extend the bounds by a percentage
		pad: function (bufferRatio) { // (Number) -> LatLngBounds
			var sw = this._southWest,
			    ne = this._northEast,
			    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
			    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
	
			return new L.LatLngBounds(
			        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
			        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
		},
	
		getCenter: function () { // -> LatLng
			return new L.LatLng(
			        (this._southWest.lat + this._northEast.lat) / 2,
			        (this._southWest.lng + this._northEast.lng) / 2);
		},
	
		getSouthWest: function () {
			return this._southWest;
		},
	
		getNorthEast: function () {
			return this._northEast;
		},
	
		getNorthWest: function () {
			return new L.LatLng(this.getNorth(), this.getWest());
		},
	
		getSouthEast: function () {
			return new L.LatLng(this.getSouth(), this.getEast());
		},
	
		getWest: function () {
			return this._southWest.lng;
		},
	
		getSouth: function () {
			return this._southWest.lat;
		},
	
		getEast: function () {
			return this._northEast.lng;
		},
	
		getNorth: function () {
			return this._northEast.lat;
		},
	
		contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
			if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
				obj = L.latLng(obj);
			} else {
				obj = L.latLngBounds(obj);
			}
	
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2, ne2;
	
			if (obj instanceof L.LatLngBounds) {
				sw2 = obj.getSouthWest();
				ne2 = obj.getNorthEast();
			} else {
				sw2 = ne2 = obj;
			}
	
			return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
			       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
		},
	
		intersects: function (bounds) { // (LatLngBounds)
			bounds = L.latLngBounds(bounds);
	
			var sw = this._southWest,
			    ne = this._northEast,
			    sw2 = bounds.getSouthWest(),
			    ne2 = bounds.getNorthEast(),
	
			    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
			    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);
	
			return latIntersects && lngIntersects;
		},
	
		toBBoxString: function () {
			return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
		},
	
		equals: function (bounds) { // (LatLngBounds)
			if (!bounds) { return false; }
	
			bounds = L.latLngBounds(bounds);
	
			return this._southWest.equals(bounds.getSouthWest()) &&
			       this._northEast.equals(bounds.getNorthEast());
		},
	
		isValid: function () {
			return !!(this._southWest && this._northEast);
		}
	};
	
	//TODO International date line?
	
	L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
		if (!a || a instanceof L.LatLngBounds) {
			return a;
		}
		return new L.LatLngBounds(a, b);
	};
	
	
	/*
	 * L.Projection contains various geographical projections used by CRS classes.
	 */
	
	L.Projection = {};
	
	
	/*
	 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
	 */
	
	L.Projection.SphericalMercator = {
		MAX_LATITUDE: 85.0511287798,
	
		project: function (latlng) { // (LatLng) -> Point
			var d = L.LatLng.DEG_TO_RAD,
			    max = this.MAX_LATITUDE,
			    lat = Math.max(Math.min(max, latlng.lat), -max),
			    x = latlng.lng * d,
			    y = lat * d;
	
			y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));
	
			return new L.Point(x, y);
		},
	
		unproject: function (point) { // (Point, Boolean) -> LatLng
			var d = L.LatLng.RAD_TO_DEG,
			    lng = point.x * d,
			    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;
	
			return new L.LatLng(lat, lng);
		}
	};
	
	
	/*
	 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
	 */
	
	L.Projection.LonLat = {
		project: function (latlng) {
			return new L.Point(latlng.lng, latlng.lat);
		},
	
		unproject: function (point) {
			return new L.LatLng(point.y, point.x);
		}
	};
	
	
	/*
	 * L.CRS is a base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
	 */
	
	L.CRS = {
		latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
			var projectedPoint = this.projection.project(latlng),
			    scale = this.scale(zoom);
	
			return this.transformation._transform(projectedPoint, scale);
		},
	
		pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
			var scale = this.scale(zoom),
			    untransformedPoint = this.transformation.untransform(point, scale);
	
			return this.projection.unproject(untransformedPoint);
		},
	
		project: function (latlng) {
			return this.projection.project(latlng);
		},
	
		scale: function (zoom) {
			return 256 * Math.pow(2, zoom);
		},
	
		getSize: function (zoom) {
			var s = this.scale(zoom);
			return L.point(s, s);
		}
	};
	
	
	/*
	 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
	 */
	
	L.CRS.Simple = L.extend({}, L.CRS, {
		projection: L.Projection.LonLat,
		transformation: new L.Transformation(1, 0, -1, 0),
	
		scale: function (zoom) {
			return Math.pow(2, zoom);
		}
	});
	
	
	/*
	 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping
	 * and is used by Leaflet by default.
	 */
	
	L.CRS.EPSG3857 = L.extend({}, L.CRS, {
		code: 'EPSG:3857',
	
		projection: L.Projection.SphericalMercator,
		transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),
	
		project: function (latlng) { // (LatLng) -> Point
			var projectedPoint = this.projection.project(latlng),
			    earthRadius = 6378137;
			return projectedPoint.multiplyBy(earthRadius);
		}
	});
	
	L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
		code: 'EPSG:900913'
	});
	
	
	/*
	 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
	 */
	
	L.CRS.EPSG4326 = L.extend({}, L.CRS, {
		code: 'EPSG:4326',
	
		projection: L.Projection.LonLat,
		transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
	});
	
	
	/*
	 * L.Map is the central class of the API - it is used to create a map.
	 */
	
	L.Map = L.Class.extend({
	
		includes: L.Mixin.Events,
	
		options: {
			crs: L.CRS.EPSG3857,
	
			/*
			center: LatLng,
			zoom: Number,
			layers: Array,
			*/
	
			fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
			trackResize: true,
			markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
		},
	
		initialize: function (id, options) { // (HTMLElement or String, Object)
			options = L.setOptions(this, options);
	
	
			this._initContainer(id);
			this._initLayout();
	
			// hack for https://github.com/Leaflet/Leaflet/issues/1980
			this._onResize = L.bind(this._onResize, this);
	
			this._initEvents();
	
			if (options.maxBounds) {
				this.setMaxBounds(options.maxBounds);
			}
	
			if (options.center && options.zoom !== undefined) {
				this.setView(L.latLng(options.center), options.zoom, {reset: true});
			}
	
			this._handlers = [];
	
			this._layers = {};
			this._zoomBoundLayers = {};
			this._tileLayersNum = 0;
	
			this.callInitHooks();
	
			this._addLayers(options.layers);
		},
	
	
		// public methods that modify map state
	
		// replaced by animation-powered implementation in Map.PanAnimation.js
		setView: function (center, zoom) {
			zoom = zoom === undefined ? this.getZoom() : zoom;
			this._resetView(L.latLng(center), this._limitZoom(zoom));
			return this;
		},
	
		setZoom: function (zoom, options) {
			if (!this._loaded) {
				this._zoom = this._limitZoom(zoom);
				return this;
			}
			return this.setView(this.getCenter(), zoom, {zoom: options});
		},
	
		zoomIn: function (delta, options) {
			return this.setZoom(this._zoom + (delta || 1), options);
		},
	
		zoomOut: function (delta, options) {
			return this.setZoom(this._zoom - (delta || 1), options);
		},
	
		setZoomAround: function (latlng, zoom, options) {
			var scale = this.getZoomScale(zoom),
			    viewHalf = this.getSize().divideBy(2),
			    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),
	
			    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
	
			return this.setView(newCenter, zoom, {zoom: options});
		},
	
		fitBounds: function (bounds, options) {
	
			options = options || {};
			bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);
	
			var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
			    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),
	
			    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
	
			zoom = (options.maxZoom) ? Math.min(options.maxZoom, zoom) : zoom;
	
			var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),
	
			    swPoint = this.project(bounds.getSouthWest(), zoom),
			    nePoint = this.project(bounds.getNorthEast(), zoom),
			    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);
	
			return this.setView(center, zoom, options);
		},
	
		fitWorld: function (options) {
			return this.fitBounds([[-90, -180], [90, 180]], options);
		},
	
		panTo: function (center, options) { // (LatLng)
			return this.setView(center, this._zoom, {pan: options});
		},
	
		panBy: function (offset) { // (Point)
			// replaced with animated panBy in Map.PanAnimation.js
			this.fire('movestart');
	
			this._rawPanBy(L.point(offset));
	
			this.fire('move');
			return this.fire('moveend');
		},
	
		setMaxBounds: function (bounds) {
			bounds = L.latLngBounds(bounds);
	
			this.options.maxBounds = bounds;
	
			if (!bounds) {
				return this.off('moveend', this._panInsideMaxBounds, this);
			}
	
			if (this._loaded) {
				this._panInsideMaxBounds();
			}
	
			return this.on('moveend', this._panInsideMaxBounds, this);
		},
	
		panInsideBounds: function (bounds, options) {
			var center = this.getCenter(),
				newCenter = this._limitCenter(center, this._zoom, bounds);
	
			if (center.equals(newCenter)) { return this; }
	
			return this.panTo(newCenter, options);
		},
	
		addLayer: function (layer) {
			// TODO method is too big, refactor
	
			var id = L.stamp(layer);
	
			if (this._layers[id]) { return this; }
	
			this._layers[id] = layer;
	
			// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
			if (layer.options && (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom))) {
				this._zoomBoundLayers[id] = layer;
				this._updateZoomLevels();
			}
	
			// TODO looks ugly, refactor!!!
			if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
				this._tileLayersNum++;
				this._tileLayersToLoad++;
				layer.on('load', this._onTileLayerLoad, this);
			}
	
			if (this._loaded) {
				this._layerAdd(layer);
			}
	
			return this;
		},
	
		removeLayer: function (layer) {
			var id = L.stamp(layer);
	
			if (!this._layers[id]) { return this; }
	
			if (this._loaded) {
				layer.onRemove(this);
			}
	
			delete this._layers[id];
	
			if (this._loaded) {
				this.fire('layerremove', {layer: layer});
			}
	
			if (this._zoomBoundLayers[id]) {
				delete this._zoomBoundLayers[id];
				this._updateZoomLevels();
			}
	
			// TODO looks ugly, refactor
			if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
				this._tileLayersNum--;
				this._tileLayersToLoad--;
				layer.off('load', this._onTileLayerLoad, this);
			}
	
			return this;
		},
	
		hasLayer: function (layer) {
			if (!layer) { return false; }
	
			return (L.stamp(layer) in this._layers);
		},
	
		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},
	
		invalidateSize: function (options) {
			if (!this._loaded) { return this; }
	
			options = L.extend({
				animate: false,
				pan: true
			}, options === true ? {animate: true} : options);
	
			var oldSize = this.getSize();
			this._sizeChanged = true;
			this._initialCenter = null;
	
			var newSize = this.getSize(),
			    oldCenter = oldSize.divideBy(2).round(),
			    newCenter = newSize.divideBy(2).round(),
			    offset = oldCenter.subtract(newCenter);
	
			if (!offset.x && !offset.y) { return this; }
	
			if (options.animate && options.pan) {
				this.panBy(offset);
	
			} else {
				if (options.pan) {
					this._rawPanBy(offset);
				}
	
				this.fire('move');
	
				if (options.debounceMoveend) {
					clearTimeout(this._sizeTimer);
					this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
				} else {
					this.fire('moveend');
				}
			}
	
			return this.fire('resize', {
				oldSize: oldSize,
				newSize: newSize
			});
		},
	
		// TODO handler.addTo
		addHandler: function (name, HandlerClass) {
			if (!HandlerClass) { return this; }
	
			var handler = this[name] = new HandlerClass(this);
	
			this._handlers.push(handler);
	
			if (this.options[name]) {
				handler.enable();
			}
	
			return this;
		},
	
		remove: function () {
			if (this._loaded) {
				this.fire('unload');
			}
	
			this._initEvents('off');
	
			try {
				// throws error in IE6-8
				delete this._container._leaflet;
			} catch (e) {
				this._container._leaflet = undefined;
			}
	
			this._clearPanes();
			if (this._clearControlPos) {
				this._clearControlPos();
			}
	
			this._clearHandlers();
	
			return this;
		},
	
	
		// public methods for getting map state
	
		getCenter: function () { // (Boolean) -> LatLng
			this._checkIfLoaded();
	
			if (this._initialCenter && !this._moved()) {
				return this._initialCenter;
			}
			return this.layerPointToLatLng(this._getCenterLayerPoint());
		},
	
		getZoom: function () {
			return this._zoom;
		},
	
		getBounds: function () {
			var bounds = this.getPixelBounds(),
			    sw = this.unproject(bounds.getBottomLeft()),
			    ne = this.unproject(bounds.getTopRight());
	
			return new L.LatLngBounds(sw, ne);
		},
	
		getMinZoom: function () {
			return this.options.minZoom === undefined ?
				(this._layersMinZoom === undefined ? 0 : this._layersMinZoom) :
				this.options.minZoom;
		},
	
		getMaxZoom: function () {
			return this.options.maxZoom === undefined ?
				(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
				this.options.maxZoom;
		},
	
		getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
			bounds = L.latLngBounds(bounds);
	
			var zoom = this.getMinZoom() - (inside ? 1 : 0),
			    maxZoom = this.getMaxZoom(),
			    size = this.getSize(),
	
			    nw = bounds.getNorthWest(),
			    se = bounds.getSouthEast(),
	
			    zoomNotFound = true,
			    boundsSize;
	
			padding = L.point(padding || [0, 0]);
	
			do {
				zoom++;
				boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
				zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;
	
			} while (zoomNotFound && zoom <= maxZoom);
	
			if (zoomNotFound && inside) {
				return null;
			}
	
			return inside ? zoom : zoom - 1;
		},
	
		getSize: function () {
			if (!this._size || this._sizeChanged) {
				this._size = new L.Point(
					this._container.clientWidth,
					this._container.clientHeight);
	
				this._sizeChanged = false;
			}
			return this._size.clone();
		},
	
		getPixelBounds: function () {
			var topLeftPoint = this._getTopLeftPoint();
			return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
		},
	
		getPixelOrigin: function () {
			this._checkIfLoaded();
			return this._initialTopLeftPoint;
		},
	
		getPanes: function () {
			return this._panes;
		},
	
		getContainer: function () {
			return this._container;
		},
	
	
		// TODO replace with universal implementation after refactoring projections
	
		getZoomScale: function (toZoom) {
			var crs = this.options.crs;
			return crs.scale(toZoom) / crs.scale(this._zoom);
		},
	
		getScaleZoom: function (scale) {
			return this._zoom + (Math.log(scale) / Math.LN2);
		},
	
	
		// conversion methods
	
		project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
		},
	
		unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.pointToLatLng(L.point(point), zoom);
		},
	
		layerPointToLatLng: function (point) { // (Point)
			var projectedPoint = L.point(point).add(this.getPixelOrigin());
			return this.unproject(projectedPoint);
		},
	
		latLngToLayerPoint: function (latlng) { // (LatLng)
			var projectedPoint = this.project(L.latLng(latlng))._round();
			return projectedPoint._subtract(this.getPixelOrigin());
		},
	
		containerPointToLayerPoint: function (point) { // (Point)
			return L.point(point).subtract(this._getMapPanePos());
		},
	
		layerPointToContainerPoint: function (point) { // (Point)
			return L.point(point).add(this._getMapPanePos());
		},
	
		containerPointToLatLng: function (point) {
			var layerPoint = this.containerPointToLayerPoint(L.point(point));
			return this.layerPointToLatLng(layerPoint);
		},
	
		latLngToContainerPoint: function (latlng) {
			return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
		},
	
		mouseEventToContainerPoint: function (e) { // (MouseEvent)
			return L.DomEvent.getMousePosition(e, this._container);
		},
	
		mouseEventToLayerPoint: function (e) { // (MouseEvent)
			return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
		},
	
		mouseEventToLatLng: function (e) { // (MouseEvent)
			return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
		},
	
	
		// map initialization methods
	
		_initContainer: function (id) {
			var container = this._container = L.DomUtil.get(id);
	
			if (!container) {
				throw new Error('Map container not found.');
			} else if (container._leaflet) {
				throw new Error('Map container is already initialized.');
			}
	
			container._leaflet = true;
		},
	
		_initLayout: function () {
			var container = this._container;
	
			L.DomUtil.addClass(container, 'leaflet-container' +
				(L.Browser.touch ? ' leaflet-touch' : '') +
				(L.Browser.retina ? ' leaflet-retina' : '') +
				(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
				(this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));
	
			var position = L.DomUtil.getStyle(container, 'position');
	
			if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
				container.style.position = 'relative';
			}
	
			this._initPanes();
	
			if (this._initControlPos) {
				this._initControlPos();
			}
		},
	
		_initPanes: function () {
			var panes = this._panes = {};
	
			this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);
	
			this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
			panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
			panes.shadowPane = this._createPane('leaflet-shadow-pane');
			panes.overlayPane = this._createPane('leaflet-overlay-pane');
			panes.markerPane = this._createPane('leaflet-marker-pane');
			panes.popupPane = this._createPane('leaflet-popup-pane');
	
			var zoomHide = ' leaflet-zoom-hide';
	
			if (!this.options.markerZoomAnimation) {
				L.DomUtil.addClass(panes.markerPane, zoomHide);
				L.DomUtil.addClass(panes.shadowPane, zoomHide);
				L.DomUtil.addClass(panes.popupPane, zoomHide);
			}
		},
	
		_createPane: function (className, container) {
			return L.DomUtil.create('div', className, container || this._panes.objectsPane);
		},
	
		_clearPanes: function () {
			this._container.removeChild(this._mapPane);
		},
	
		_addLayers: function (layers) {
			layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];
	
			for (var i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		},
	
	
		// private methods that modify map state
	
		_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {
	
			var zoomChanged = (this._zoom !== zoom);
	
			if (!afterZoomAnim) {
				this.fire('movestart');
	
				if (zoomChanged) {
					this.fire('zoomstart');
				}
			}
	
			this._zoom = zoom;
			this._initialCenter = center;
	
			this._initialTopLeftPoint = this._getNewTopLeftPoint(center);
	
			if (!preserveMapOffset) {
				L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
			} else {
				this._initialTopLeftPoint._add(this._getMapPanePos());
			}
	
			this._tileLayersToLoad = this._tileLayersNum;
	
			var loading = !this._loaded;
			this._loaded = true;
	
			this.fire('viewreset', {hard: !preserveMapOffset});
	
			if (loading) {
				this.fire('load');
				this.eachLayer(this._layerAdd, this);
			}
	
			this.fire('move');
	
			if (zoomChanged || afterZoomAnim) {
				this.fire('zoomend');
			}
	
			this.fire('moveend', {hard: !preserveMapOffset});
		},
	
		_rawPanBy: function (offset) {
			L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
		},
	
		_getZoomSpan: function () {
			return this.getMaxZoom() - this.getMinZoom();
		},
	
		_updateZoomLevels: function () {
			var i,
				minZoom = Infinity,
				maxZoom = -Infinity,
				oldZoomSpan = this._getZoomSpan();
	
			for (i in this._zoomBoundLayers) {
				var layer = this._zoomBoundLayers[i];
				if (!isNaN(layer.options.minZoom)) {
					minZoom = Math.min(minZoom, layer.options.minZoom);
				}
				if (!isNaN(layer.options.maxZoom)) {
					maxZoom = Math.max(maxZoom, layer.options.maxZoom);
				}
			}
	
			if (i === undefined) { // we have no tilelayers
				this._layersMaxZoom = this._layersMinZoom = undefined;
			} else {
				this._layersMaxZoom = maxZoom;
				this._layersMinZoom = minZoom;
			}
	
			if (oldZoomSpan !== this._getZoomSpan()) {
				this.fire('zoomlevelschange');
			}
		},
	
		_panInsideMaxBounds: function () {
			this.panInsideBounds(this.options.maxBounds);
		},
	
		_checkIfLoaded: function () {
			if (!this._loaded) {
				throw new Error('Set map center and zoom first.');
			}
		},
	
		// map events
	
		_initEvents: function (onOff) {
			if (!L.DomEvent) { return; }
	
			onOff = onOff || 'on';
	
			L.DomEvent[onOff](this._container, 'click', this._onMouseClick, this);
	
			var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
			              'mouseleave', 'mousemove', 'contextmenu'],
			    i, len;
	
			for (i = 0, len = events.length; i < len; i++) {
				L.DomEvent[onOff](this._container, events[i], this._fireMouseEvent, this);
			}
	
			if (this.options.trackResize) {
				L.DomEvent[onOff](window, 'resize', this._onResize, this);
			}
		},
	
		_onResize: function () {
			L.Util.cancelAnimFrame(this._resizeRequest);
			this._resizeRequest = L.Util.requestAnimFrame(
			        function () { this.invalidateSize({debounceMoveend: true}); }, this, false, this._container);
		},
	
		_onMouseClick: function (e) {
			if (!this._loaded || (!e._simulated &&
			        ((this.dragging && this.dragging.moved()) ||
			         (this.boxZoom  && this.boxZoom.moved()))) ||
			            L.DomEvent._skipped(e)) { return; }
	
			this.fire('preclick');
			this._fireMouseEvent(e);
		},
	
		_fireMouseEvent: function (e) {
			if (!this._loaded || L.DomEvent._skipped(e)) { return; }
	
			var type = e.type;
	
			type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));
	
			if (!this.hasEventListeners(type)) { return; }
	
			if (type === 'contextmenu') {
				L.DomEvent.preventDefault(e);
			}
	
			var containerPoint = this.mouseEventToContainerPoint(e),
			    layerPoint = this.containerPointToLayerPoint(containerPoint),
			    latlng = this.layerPointToLatLng(layerPoint);
	
			this.fire(type, {
				latlng: latlng,
				layerPoint: layerPoint,
				containerPoint: containerPoint,
				originalEvent: e
			});
		},
	
		_onTileLayerLoad: function () {
			this._tileLayersToLoad--;
			if (this._tileLayersNum && !this._tileLayersToLoad) {
				this.fire('tilelayersload');
			}
		},
	
		_clearHandlers: function () {
			for (var i = 0, len = this._handlers.length; i < len; i++) {
				this._handlers[i].disable();
			}
		},
	
		whenReady: function (callback, context) {
			if (this._loaded) {
				callback.call(context || this, this);
			} else {
				this.on('load', callback, context);
			}
			return this;
		},
	
		_layerAdd: function (layer) {
			layer.onAdd(this);
			this.fire('layeradd', {layer: layer});
		},
	
	
		// private methods for getting map state
	
		_getMapPanePos: function () {
			return L.DomUtil.getPosition(this._mapPane);
		},
	
		_moved: function () {
			var pos = this._getMapPanePos();
			return pos && !pos.equals([0, 0]);
		},
	
		_getTopLeftPoint: function () {
			return this.getPixelOrigin().subtract(this._getMapPanePos());
		},
	
		_getNewTopLeftPoint: function (center, zoom) {
			var viewHalf = this.getSize()._divideBy(2);
			// TODO round on display, not calculation to increase precision?
			return this.project(center, zoom)._subtract(viewHalf)._round();
		},
	
		_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
			var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
			return this.project(latlng, newZoom)._subtract(topLeft);
		},
	
		// layer point of the current center
		_getCenterLayerPoint: function () {
			return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
		},
	
		// offset of the specified place to the current center in pixels
		_getCenterOffset: function (latlng) {
			return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
		},
	
		// adjust center for view to get inside bounds
		_limitCenter: function (center, zoom, bounds) {
	
			if (!bounds) { return center; }
	
			var centerPoint = this.project(center, zoom),
			    viewHalf = this.getSize().divideBy(2),
			    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
			    offset = this._getBoundsOffset(viewBounds, bounds, zoom);
	
			return this.unproject(centerPoint.add(offset), zoom);
		},
	
		// adjust offset for view to get inside bounds
		_limitOffset: function (offset, bounds) {
			if (!bounds) { return offset; }
	
			var viewBounds = this.getPixelBounds(),
			    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
	
			return offset.add(this._getBoundsOffset(newBounds, bounds));
		},
	
		// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
		_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
			var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
			    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),
	
			    dx = this._rebound(nwOffset.x, -seOffset.x),
			    dy = this._rebound(nwOffset.y, -seOffset.y);
	
			return new L.Point(dx, dy);
		},
	
		_rebound: function (left, right) {
			return left + right > 0 ?
				Math.round(left - right) / 2 :
				Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
		},
	
		_limitZoom: function (zoom) {
			var min = this.getMinZoom(),
			    max = this.getMaxZoom();
	
			return Math.max(min, Math.min(max, zoom));
		}
	});
	
	L.map = function (id, options) {
		return new L.Map(id, options);
	};
	
	
	/*
	 * Mercator projection that takes into account that the Earth is not a perfect sphere.
	 * Less popular than spherical mercator; used by projections like EPSG:3395.
	 */
	
	L.Projection.Mercator = {
		MAX_LATITUDE: 85.0840591556,
	
		R_MINOR: 6356752.314245179,
		R_MAJOR: 6378137,
	
		project: function (latlng) { // (LatLng) -> Point
			var d = L.LatLng.DEG_TO_RAD,
			    max = this.MAX_LATITUDE,
			    lat = Math.max(Math.min(max, latlng.lat), -max),
			    r = this.R_MAJOR,
			    r2 = this.R_MINOR,
			    x = latlng.lng * d * r,
			    y = lat * d,
			    tmp = r2 / r,
			    eccent = Math.sqrt(1.0 - tmp * tmp),
			    con = eccent * Math.sin(y);
	
			con = Math.pow((1 - con) / (1 + con), eccent * 0.5);
	
			var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
			y = -r * Math.log(ts);
	
			return new L.Point(x, y);
		},
	
		unproject: function (point) { // (Point, Boolean) -> LatLng
			var d = L.LatLng.RAD_TO_DEG,
			    r = this.R_MAJOR,
			    r2 = this.R_MINOR,
			    lng = point.x * d / r,
			    tmp = r2 / r,
			    eccent = Math.sqrt(1 - (tmp * tmp)),
			    ts = Math.exp(- point.y / r),
			    phi = (Math.PI / 2) - 2 * Math.atan(ts),
			    numIter = 15,
			    tol = 1e-7,
			    i = numIter,
			    dphi = 0.1,
			    con;
	
			while ((Math.abs(dphi) > tol) && (--i > 0)) {
				con = eccent * Math.sin(phi);
				dphi = (Math.PI / 2) - 2 * Math.atan(ts *
				            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
				phi += dphi;
			}
	
			return new L.LatLng(phi * d, lng);
		}
	};
	
	
	
	L.CRS.EPSG3395 = L.extend({}, L.CRS, {
		code: 'EPSG:3395',
	
		projection: L.Projection.Mercator,
	
		transformation: (function () {
			var m = L.Projection.Mercator,
			    r = m.R_MAJOR,
			    scale = 0.5 / (Math.PI * r);
	
			return new L.Transformation(scale, 0.5, -scale, 0.5);
		}())
	});
	
	
	/*
	 * L.TileLayer is used for standard xyz-numbered tile layers.
	 */
	
	L.TileLayer = L.Class.extend({
		includes: L.Mixin.Events,
	
		options: {
			minZoom: 0,
			maxZoom: 18,
			tileSize: 256,
			subdomains: 'abc',
			errorTileUrl: '',
			attribution: '',
			zoomOffset: 0,
			opacity: 1,
			/*
			maxNativeZoom: null,
			zIndex: null,
			tms: false,
			continuousWorld: false,
			noWrap: false,
			zoomReverse: false,
			detectRetina: false,
			reuseTiles: false,
			bounds: false,
			*/
			unloadInvisibleTiles: L.Browser.mobile,
			updateWhenIdle: L.Browser.mobile
		},
	
		initialize: function (url, options) {
			options = L.setOptions(this, options);
	
			// detecting retina displays, adjusting tileSize and zoom levels
			if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {
	
				options.tileSize = Math.floor(options.tileSize / 2);
				options.zoomOffset++;
	
				if (options.minZoom > 0) {
					options.minZoom--;
				}
				this.options.maxZoom--;
			}
	
			if (options.bounds) {
				options.bounds = L.latLngBounds(options.bounds);
			}
	
			this._url = url;
	
			var subdomains = this.options.subdomains;
	
			if (typeof subdomains === 'string') {
				this.options.subdomains = subdomains.split('');
			}
		},
	
		onAdd: function (map) {
			this._map = map;
			this._animated = map._zoomAnimated;
	
			// create a container div for tiles
			this._initContainer();
	
			// set up events
			map.on({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);
	
			if (this._animated) {
				map.on({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this);
			}
	
			if (!this.options.updateWhenIdle) {
				this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
				map.on('move', this._limitedUpdate, this);
			}
	
			this._reset();
			this._update();
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		onRemove: function (map) {
			this._container.parentNode.removeChild(this._container);
	
			map.off({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);
	
			if (this._animated) {
				map.off({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this);
			}
	
			if (!this.options.updateWhenIdle) {
				map.off('move', this._limitedUpdate, this);
			}
	
			this._container = null;
			this._map = null;
		},
	
		bringToFront: function () {
			var pane = this._map._panes.tilePane;
	
			if (this._container) {
				pane.appendChild(this._container);
				this._setAutoZIndex(pane, Math.max);
			}
	
			return this;
		},
	
		bringToBack: function () {
			var pane = this._map._panes.tilePane;
	
			if (this._container) {
				pane.insertBefore(this._container, pane.firstChild);
				this._setAutoZIndex(pane, Math.min);
			}
	
			return this;
		},
	
		getAttribution: function () {
			return this.options.attribution;
		},
	
		getContainer: function () {
			return this._container;
		},
	
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
	
			if (this._map) {
				this._updateOpacity();
			}
	
			return this;
		},
	
		setZIndex: function (zIndex) {
			this.options.zIndex = zIndex;
			this._updateZIndex();
	
			return this;
		},
	
		setUrl: function (url, noRedraw) {
			this._url = url;
	
			if (!noRedraw) {
				this.redraw();
			}
	
			return this;
		},
	
		redraw: function () {
			if (this._map) {
				this._reset({hard: true});
				this._update();
			}
			return this;
		},
	
		_updateZIndex: function () {
			if (this._container && this.options.zIndex !== undefined) {
				this._container.style.zIndex = this.options.zIndex;
			}
		},
	
		_setAutoZIndex: function (pane, compare) {
	
			var layers = pane.children,
			    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
			    zIndex, i, len;
	
			for (i = 0, len = layers.length; i < len; i++) {
	
				if (layers[i] !== this._container) {
					zIndex = parseInt(layers[i].style.zIndex, 10);
	
					if (!isNaN(zIndex)) {
						edgeZIndex = compare(edgeZIndex, zIndex);
					}
				}
			}
	
			this.options.zIndex = this._container.style.zIndex =
			        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
		},
	
		_updateOpacity: function () {
			var i,
			    tiles = this._tiles;
	
			if (L.Browser.ielt9) {
				for (i in tiles) {
					L.DomUtil.setOpacity(tiles[i], this.options.opacity);
				}
			} else {
				L.DomUtil.setOpacity(this._container, this.options.opacity);
			}
		},
	
		_initContainer: function () {
			var tilePane = this._map._panes.tilePane;
	
			if (!this._container) {
				this._container = L.DomUtil.create('div', 'leaflet-layer');
	
				this._updateZIndex();
	
				if (this._animated) {
					var className = 'leaflet-tile-container';
	
					this._bgBuffer = L.DomUtil.create('div', className, this._container);
					this._tileContainer = L.DomUtil.create('div', className, this._container);
	
				} else {
					this._tileContainer = this._container;
				}
	
				tilePane.appendChild(this._container);
	
				if (this.options.opacity < 1) {
					this._updateOpacity();
				}
			}
		},
	
		_reset: function (e) {
			for (var key in this._tiles) {
				this.fire('tileunload', {tile: this._tiles[key]});
			}
	
			this._tiles = {};
			this._tilesToLoad = 0;
	
			if (this.options.reuseTiles) {
				this._unusedTiles = [];
			}
	
			this._tileContainer.innerHTML = '';
	
			if (this._animated && e && e.hard) {
				this._clearBgBuffer();
			}
	
			this._initContainer();
		},
	
		_getTileSize: function () {
			var map = this._map,
			    zoom = map.getZoom() + this.options.zoomOffset,
			    zoomN = this.options.maxNativeZoom,
			    tileSize = this.options.tileSize;
	
			if (zoomN && zoom > zoomN) {
				tileSize = Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * tileSize);
			}
	
			return tileSize;
		},
	
		_update: function () {
	
			if (!this._map) { return; }
	
			var map = this._map,
			    bounds = map.getPixelBounds(),
			    zoom = map.getZoom(),
			    tileSize = this._getTileSize();
	
			if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
				return;
			}
	
			var tileBounds = L.bounds(
			        bounds.min.divideBy(tileSize)._floor(),
			        bounds.max.divideBy(tileSize)._floor());
	
			this._addTilesFromCenterOut(tileBounds);
	
			if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
				this._removeOtherTiles(tileBounds);
			}
		},
	
		_addTilesFromCenterOut: function (bounds) {
			var queue = [],
			    center = bounds.getCenter();
	
			var j, i, point;
	
			for (j = bounds.min.y; j <= bounds.max.y; j++) {
				for (i = bounds.min.x; i <= bounds.max.x; i++) {
					point = new L.Point(i, j);
	
					if (this._tileShouldBeLoaded(point)) {
						queue.push(point);
					}
				}
			}
	
			var tilesToLoad = queue.length;
	
			if (tilesToLoad === 0) { return; }
	
			// load tiles in order of their distance to center
			queue.sort(function (a, b) {
				return a.distanceTo(center) - b.distanceTo(center);
			});
	
			var fragment = document.createDocumentFragment();
	
			// if its the first batch of tiles to load
			if (!this._tilesToLoad) {
				this.fire('loading');
			}
	
			this._tilesToLoad += tilesToLoad;
	
			for (i = 0; i < tilesToLoad; i++) {
				this._addTile(queue[i], fragment);
			}
	
			this._tileContainer.appendChild(fragment);
		},
	
		_tileShouldBeLoaded: function (tilePoint) {
			if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
				return false; // already loaded
			}
	
			var options = this.options;
	
			if (!options.continuousWorld) {
				var limit = this._getWrapTileNum();
	
				// don't load if exceeds world bounds
				if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
					tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
			}
	
			if (options.bounds) {
				var tileSize = this._getTileSize(),
				    nwPoint = tilePoint.multiplyBy(tileSize),
				    sePoint = nwPoint.add([tileSize, tileSize]),
				    nw = this._map.unproject(nwPoint),
				    se = this._map.unproject(sePoint);
	
				// TODO temporary hack, will be removed after refactoring projections
				// https://github.com/Leaflet/Leaflet/issues/1618
				if (!options.continuousWorld && !options.noWrap) {
					nw = nw.wrap();
					se = se.wrap();
				}
	
				if (!options.bounds.intersects([nw, se])) { return false; }
			}
	
			return true;
		},
	
		_removeOtherTiles: function (bounds) {
			var kArr, x, y, key;
	
			for (key in this._tiles) {
				kArr = key.split(':');
				x = parseInt(kArr[0], 10);
				y = parseInt(kArr[1], 10);
	
				// remove tile if it's out of bounds
				if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
					this._removeTile(key);
				}
			}
		},
	
		_removeTile: function (key) {
			var tile = this._tiles[key];
	
			this.fire('tileunload', {tile: tile, url: tile.src});
	
			if (this.options.reuseTiles) {
				L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
				this._unusedTiles.push(tile);
	
			} else if (tile.parentNode === this._tileContainer) {
				this._tileContainer.removeChild(tile);
			}
	
			// for https://github.com/CloudMade/Leaflet/issues/137
			if (!L.Browser.android) {
				tile.onload = null;
				tile.src = L.Util.emptyImageUrl;
			}
	
			delete this._tiles[key];
		},
	
		_addTile: function (tilePoint, container) {
			var tilePos = this._getTilePos(tilePoint);
	
			// get unused tile - or create a new tile
			var tile = this._getTile();
	
			/*
			Chrome 20 layouts much faster with top/left (verify with timeline, frames)
			Android 4 browser has display issues with top/left and requires transform instead
			(other browsers don't currently care) - see debug/hacks/jitter.html for an example
			*/
			L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);
	
			this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
	
			this._loadTile(tile, tilePoint);
	
			if (tile.parentNode !== this._tileContainer) {
				container.appendChild(tile);
			}
		},
	
		_getZoomForUrl: function () {
	
			var options = this.options,
			    zoom = this._map.getZoom();
	
			if (options.zoomReverse) {
				zoom = options.maxZoom - zoom;
			}
	
			zoom += options.zoomOffset;
	
			return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
		},
	
		_getTilePos: function (tilePoint) {
			var origin = this._map.getPixelOrigin(),
			    tileSize = this._getTileSize();
	
			return tilePoint.multiplyBy(tileSize).subtract(origin);
		},
	
		// image-specific code (override to implement e.g. Canvas or SVG tile layer)
	
		getTileUrl: function (tilePoint) {
			return L.Util.template(this._url, L.extend({
				s: this._getSubdomain(tilePoint),
				z: tilePoint.z,
				x: tilePoint.x,
				y: tilePoint.y
			}, this.options));
		},
	
		_getWrapTileNum: function () {
			var crs = this._map.options.crs,
			    size = crs.getSize(this._map.getZoom());
			return size.divideBy(this._getTileSize())._floor();
		},
	
		_adjustTilePoint: function (tilePoint) {
	
			var limit = this._getWrapTileNum();
	
			// wrap tile coordinates
			if (!this.options.continuousWorld && !this.options.noWrap) {
				tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
			}
	
			if (this.options.tms) {
				tilePoint.y = limit.y - tilePoint.y - 1;
			}
	
			tilePoint.z = this._getZoomForUrl();
		},
	
		_getSubdomain: function (tilePoint) {
			var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
			return this.options.subdomains[index];
		},
	
		_getTile: function () {
			if (this.options.reuseTiles && this._unusedTiles.length > 0) {
				var tile = this._unusedTiles.pop();
				this._resetTile(tile);
				return tile;
			}
			return this._createTile();
		},
	
		// Override if data stored on a tile needs to be cleaned up before reuse
		_resetTile: function (/*tile*/) {},
	
		_createTile: function () {
			var tile = L.DomUtil.create('img', 'leaflet-tile');
			tile.style.width = tile.style.height = this._getTileSize() + 'px';
			tile.galleryimg = 'no';
	
			tile.onselectstart = tile.onmousemove = L.Util.falseFn;
	
			if (L.Browser.ielt9 && this.options.opacity !== undefined) {
				L.DomUtil.setOpacity(tile, this.options.opacity);
			}
			// without this hack, tiles disappear after zoom on Chrome for Android
			// https://github.com/Leaflet/Leaflet/issues/2078
			if (L.Browser.mobileWebkit3d) {
				tile.style.WebkitBackfaceVisibility = 'hidden';
			}
			return tile;
		},
	
		_loadTile: function (tile, tilePoint) {
			tile._layer  = this;
			tile.onload  = this._tileOnLoad;
			tile.onerror = this._tileOnError;
	
			this._adjustTilePoint(tilePoint);
			tile.src     = this.getTileUrl(tilePoint);
	
			this.fire('tileloadstart', {
				tile: tile,
				url: tile.src
			});
		},
	
		_tileLoaded: function () {
			this._tilesToLoad--;
	
			if (this._animated) {
				L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
			}
	
			if (!this._tilesToLoad) {
				this.fire('load');
	
				if (this._animated) {
					// clear scaled tiles after all new tiles are loaded (for performance)
					clearTimeout(this._clearBgBufferTimer);
					this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
				}
			}
		},
	
		_tileOnLoad: function () {
			var layer = this._layer;
	
			//Only if we are loading an actual image
			if (this.src !== L.Util.emptyImageUrl) {
				L.DomUtil.addClass(this, 'leaflet-tile-loaded');
	
				layer.fire('tileload', {
					tile: this,
					url: this.src
				});
			}
	
			layer._tileLoaded();
		},
	
		_tileOnError: function () {
			var layer = this._layer;
	
			layer.fire('tileerror', {
				tile: this,
				url: this.src
			});
	
			var newUrl = layer.options.errorTileUrl;
			if (newUrl) {
				this.src = newUrl;
			}
	
			layer._tileLoaded();
		}
	});
	
	L.tileLayer = function (url, options) {
		return new L.TileLayer(url, options);
	};
	
	
	/*
	 * L.TileLayer.WMS is used for putting WMS tile layers on the map.
	 */
	
	L.TileLayer.WMS = L.TileLayer.extend({
	
		defaultWmsParams: {
			service: 'WMS',
			request: 'GetMap',
			version: '1.1.1',
			layers: '',
			styles: '',
			format: 'image/jpeg',
			transparent: false
		},
	
		initialize: function (url, options) { // (String, Object)
	
			this._url = url;
	
			var wmsParams = L.extend({}, this.defaultWmsParams),
			    tileSize = options.tileSize || this.options.tileSize;
	
			if (options.detectRetina && L.Browser.retina) {
				wmsParams.width = wmsParams.height = tileSize * 2;
			} else {
				wmsParams.width = wmsParams.height = tileSize;
			}
	
			for (var i in options) {
				// all keys that are not TileLayer options go to WMS params
				if (!this.options.hasOwnProperty(i) && i !== 'crs') {
					wmsParams[i] = options[i];
				}
			}
	
			this.wmsParams = wmsParams;
	
			L.setOptions(this, options);
		},
	
		onAdd: function (map) {
	
			this._crs = this.options.crs || map.options.crs;
	
			this._wmsVersion = parseFloat(this.wmsParams.version);
	
			var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
			this.wmsParams[projectionKey] = this._crs.code;
	
			L.TileLayer.prototype.onAdd.call(this, map);
		},
	
		getTileUrl: function (tilePoint) { // (Point, Number) -> String
	
			var map = this._map,
			    tileSize = this.options.tileSize,
	
			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),
	
			    nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
			    se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
			    bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
			        [se.y, nw.x, nw.y, se.x].join(',') :
			        [nw.x, se.y, se.x, nw.y].join(','),
	
			    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});
	
			return url + L.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
		},
	
		setParams: function (params, noRedraw) {
	
			L.extend(this.wmsParams, params);
	
			if (!noRedraw) {
				this.redraw();
			}
	
			return this;
		}
	});
	
	L.tileLayer.wms = function (url, options) {
		return new L.TileLayer.WMS(url, options);
	};
	
	
	/*
	 * L.TileLayer.Canvas is a class that you can use as a base for creating
	 * dynamically drawn Canvas-based tile layers.
	 */
	
	L.TileLayer.Canvas = L.TileLayer.extend({
		options: {
			async: false
		},
	
		initialize: function (options) {
			L.setOptions(this, options);
		},
	
		redraw: function () {
			if (this._map) {
				this._reset({hard: true});
				this._update();
			}
	
			for (var i in this._tiles) {
				this._redrawTile(this._tiles[i]);
			}
			return this;
		},
	
		_redrawTile: function (tile) {
			this.drawTile(tile, tile._tilePoint, this._map._zoom);
		},
	
		_createTile: function () {
			var tile = L.DomUtil.create('canvas', 'leaflet-tile');
			tile.width = tile.height = this.options.tileSize;
			tile.onselectstart = tile.onmousemove = L.Util.falseFn;
			return tile;
		},
	
		_loadTile: function (tile, tilePoint) {
			tile._layer = this;
			tile._tilePoint = tilePoint;
	
			this._redrawTile(tile);
	
			if (!this.options.async) {
				this.tileDrawn(tile);
			}
		},
	
		drawTile: function (/*tile, tilePoint*/) {
			// override with rendering code
		},
	
		tileDrawn: function (tile) {
			this._tileOnLoad.call(tile);
		}
	});
	
	
	L.tileLayer.canvas = function (options) {
		return new L.TileLayer.Canvas(options);
	};
	
	
	/*
	 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
	 */
	
	L.ImageOverlay = L.Class.extend({
		includes: L.Mixin.Events,
	
		options: {
			opacity: 1
		},
	
		initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
			this._url = url;
			this._bounds = L.latLngBounds(bounds);
	
			L.setOptions(this, options);
		},
	
		onAdd: function (map) {
			this._map = map;
	
			if (!this._image) {
				this._initImage();
			}
	
			map._panes.overlayPane.appendChild(this._image);
	
			map.on('viewreset', this._reset, this);
	
			if (map.options.zoomAnimation && L.Browser.any3d) {
				map.on('zoomanim', this._animateZoom, this);
			}
	
			this._reset();
		},
	
		onRemove: function (map) {
			map.getPanes().overlayPane.removeChild(this._image);
	
			map.off('viewreset', this._reset, this);
	
			if (map.options.zoomAnimation) {
				map.off('zoomanim', this._animateZoom, this);
			}
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			this._updateOpacity();
			return this;
		},
	
		// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
		bringToFront: function () {
			if (this._image) {
				this._map._panes.overlayPane.appendChild(this._image);
			}
			return this;
		},
	
		bringToBack: function () {
			var pane = this._map._panes.overlayPane;
			if (this._image) {
				pane.insertBefore(this._image, pane.firstChild);
			}
			return this;
		},
	
		setUrl: function (url) {
			this._url = url;
			this._image.src = this._url;
		},
	
		getAttribution: function () {
			return this.options.attribution;
		},
	
		_initImage: function () {
			this._image = L.DomUtil.create('img', 'leaflet-image-layer');
	
			if (this._map.options.zoomAnimation && L.Browser.any3d) {
				L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
			} else {
				L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
			}
	
			this._updateOpacity();
	
			//TODO createImage util method to remove duplication
			L.extend(this._image, {
				galleryimg: 'no',
				onselectstart: L.Util.falseFn,
				onmousemove: L.Util.falseFn,
				onload: L.bind(this._onImageLoad, this),
				src: this._url
			});
		},
	
		_animateZoom: function (e) {
			var map = this._map,
			    image = this._image,
			    scale = map.getZoomScale(e.zoom),
			    nw = this._bounds.getNorthWest(),
			    se = this._bounds.getSouthEast(),
	
			    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
			    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
			    origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));
	
			image.style[L.DomUtil.TRANSFORM] =
			        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
		},
	
		_reset: function () {
			var image   = this._image,
			    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			    size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);
	
			L.DomUtil.setPosition(image, topLeft);
	
			image.style.width  = size.x + 'px';
			image.style.height = size.y + 'px';
		},
	
		_onImageLoad: function () {
			this.fire('load');
		},
	
		_updateOpacity: function () {
			L.DomUtil.setOpacity(this._image, this.options.opacity);
		}
	});
	
	L.imageOverlay = function (url, bounds, options) {
		return new L.ImageOverlay(url, bounds, options);
	};
	
	
	/*
	 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
	 */
	
	L.Icon = L.Class.extend({
		options: {
			/*
			iconUrl: (String) (required)
			iconRetinaUrl: (String) (optional, used for retina devices if detected)
			iconSize: (Point) (can be set through CSS)
			iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
			popupAnchor: (Point) (if not specified, popup opens in the anchor point)
			shadowUrl: (String) (no shadow by default)
			shadowRetinaUrl: (String) (optional, used for retina devices if detected)
			shadowSize: (Point)
			shadowAnchor: (Point)
			*/
			className: ''
		},
	
		initialize: function (options) {
			L.setOptions(this, options);
		},
	
		createIcon: function (oldIcon) {
			return this._createIcon('icon', oldIcon);
		},
	
		createShadow: function (oldIcon) {
			return this._createIcon('shadow', oldIcon);
		},
	
		_createIcon: function (name, oldIcon) {
			var src = this._getIconUrl(name);
	
			if (!src) {
				if (name === 'icon') {
					throw new Error('iconUrl not set in Icon options (see the docs).');
				}
				return null;
			}
	
			var img;
			if (!oldIcon || oldIcon.tagName !== 'IMG') {
				img = this._createImg(src);
			} else {
				img = this._createImg(src, oldIcon);
			}
			this._setIconStyles(img, name);
	
			return img;
		},
	
		_setIconStyles: function (img, name) {
			var options = this.options,
			    size = L.point(options[name + 'Size']),
			    anchor;
	
			if (name === 'shadow') {
				anchor = L.point(options.shadowAnchor || options.iconAnchor);
			} else {
				anchor = L.point(options.iconAnchor);
			}
	
			if (!anchor && size) {
				anchor = size.divideBy(2, true);
			}
	
			img.className = 'leaflet-marker-' + name + ' ' + options.className;
	
			if (anchor) {
				img.style.marginLeft = (-anchor.x) + 'px';
				img.style.marginTop  = (-anchor.y) + 'px';
			}
	
			if (size) {
				img.style.width  = size.x + 'px';
				img.style.height = size.y + 'px';
			}
		},
	
		_createImg: function (src, el) {
			el = el || document.createElement('img');
			el.src = src;
			return el;
		},
	
		_getIconUrl: function (name) {
			if (L.Browser.retina && this.options[name + 'RetinaUrl']) {
				return this.options[name + 'RetinaUrl'];
			}
			return this.options[name + 'Url'];
		}
	});
	
	L.icon = function (options) {
		return new L.Icon(options);
	};
	
	
	/*
	 * L.Icon.Default is the blue marker icon used by default in Leaflet.
	 */
	
	L.Icon.Default = L.Icon.extend({
	
		options: {
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
	
			shadowSize: [41, 41]
		},
	
		_getIconUrl: function (name) {
			var key = name + 'Url';
	
			if (this.options[key]) {
				return this.options[key];
			}
	
			if (L.Browser.retina && name === 'icon') {
				name += '-2x';
			}
	
			var path = L.Icon.Default.imagePath;
	
			if (!path) {
				throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
			}
	
			return path + '/marker-' + name + '.png';
		}
	});
	
	L.Icon.Default.imagePath = (function () {
		var scripts = document.getElementsByTagName('script'),
		    leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
	
		var i, len, src, matches, path;
	
		for (i = 0, len = scripts.length; i < len; i++) {
			src = scripts[i].src;
			matches = src.match(leafletRe);
	
			if (matches) {
				path = src.split(leafletRe)[0];
				return (path ? path + '/' : '') + 'images';
			}
		}
	}());
	
	
	/*
	 * L.Marker is used to display clickable/draggable icons on the map.
	 */
	
	L.Marker = L.Class.extend({
	
		includes: L.Mixin.Events,
	
		options: {
			icon: new L.Icon.Default(),
			title: '',
			alt: '',
			clickable: true,
			draggable: false,
			keyboard: true,
			zIndexOffset: 0,
			opacity: 1,
			riseOnHover: false,
			riseOffset: 250
		},
	
		initialize: function (latlng, options) {
			L.setOptions(this, options);
			this._latlng = L.latLng(latlng);
		},
	
		onAdd: function (map) {
			this._map = map;
	
			map.on('viewreset', this.update, this);
	
			this._initIcon();
			this.update();
			this.fire('add');
	
			if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
				map.on('zoomanim', this._animateZoom, this);
			}
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		onRemove: function (map) {
			if (this.dragging) {
				this.dragging.disable();
			}
	
			this._removeIcon();
			this._removeShadow();
	
			this.fire('remove');
	
			map.off({
				'viewreset': this.update,
				'zoomanim': this._animateZoom
			}, this);
	
			this._map = null;
		},
	
		getLatLng: function () {
			return this._latlng;
		},
	
		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);
	
			this.update();
	
			return this.fire('move', { latlng: this._latlng });
		},
	
		setZIndexOffset: function (offset) {
			this.options.zIndexOffset = offset;
			this.update();
	
			return this;
		},
	
		setIcon: function (icon) {
	
			this.options.icon = icon;
	
			if (this._map) {
				this._initIcon();
				this.update();
			}
	
			if (this._popup) {
				this.bindPopup(this._popup);
			}
	
			return this;
		},
	
		update: function () {
			if (this._icon) {
				this._setPos(this._map.latLngToLayerPoint(this._latlng).round());
			}
			return this;
		},
	
		_initIcon: function () {
			var options = this.options,
			    map = this._map,
			    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
			    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide';
	
			var icon = options.icon.createIcon(this._icon),
				addIcon = false;
	
			// if we're not reusing the icon, remove the old one and init new one
			if (icon !== this._icon) {
				if (this._icon) {
					this._removeIcon();
				}
				addIcon = true;
	
				if (options.title) {
					icon.title = options.title;
				}
	
				if (options.alt) {
					icon.alt = options.alt;
				}
			}
	
			L.DomUtil.addClass(icon, classToAdd);
	
			if (options.keyboard) {
				icon.tabIndex = '0';
			}
	
			this._icon = icon;
	
			this._initInteraction();
	
			if (options.riseOnHover) {
				L.DomEvent
					.on(icon, 'mouseover', this._bringToFront, this)
					.on(icon, 'mouseout', this._resetZIndex, this);
			}
	
			var newShadow = options.icon.createShadow(this._shadow),
				addShadow = false;
	
			if (newShadow !== this._shadow) {
				this._removeShadow();
				addShadow = true;
			}
	
			if (newShadow) {
				L.DomUtil.addClass(newShadow, classToAdd);
			}
			this._shadow = newShadow;
	
	
			if (options.opacity < 1) {
				this._updateOpacity();
			}
	
	
			var panes = this._map._panes;
	
			if (addIcon) {
				panes.markerPane.appendChild(this._icon);
			}
	
			if (newShadow && addShadow) {
				panes.shadowPane.appendChild(this._shadow);
			}
		},
	
		_removeIcon: function () {
			if (this.options.riseOnHover) {
				L.DomEvent
				    .off(this._icon, 'mouseover', this._bringToFront)
				    .off(this._icon, 'mouseout', this._resetZIndex);
			}
	
			this._map._panes.markerPane.removeChild(this._icon);
	
			this._icon = null;
		},
	
		_removeShadow: function () {
			if (this._shadow) {
				this._map._panes.shadowPane.removeChild(this._shadow);
			}
			this._shadow = null;
		},
	
		_setPos: function (pos) {
			L.DomUtil.setPosition(this._icon, pos);
	
			if (this._shadow) {
				L.DomUtil.setPosition(this._shadow, pos);
			}
	
			this._zIndex = pos.y + this.options.zIndexOffset;
	
			this._resetZIndex();
		},
	
		_updateZIndex: function (offset) {
			this._icon.style.zIndex = this._zIndex + offset;
		},
	
		_animateZoom: function (opt) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
	
			this._setPos(pos);
		},
	
		_initInteraction: function () {
	
			if (!this.options.clickable) { return; }
	
			// TODO refactor into something shared with Map/Path/etc. to DRY it up
	
			var icon = this._icon,
			    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];
	
			L.DomUtil.addClass(icon, 'leaflet-clickable');
			L.DomEvent.on(icon, 'click', this._onMouseClick, this);
			L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);
	
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
			}
	
			if (L.Handler.MarkerDrag) {
				this.dragging = new L.Handler.MarkerDrag(this);
	
				if (this.options.draggable) {
					this.dragging.enable();
				}
			}
		},
	
		_onMouseClick: function (e) {
			var wasDragged = this.dragging && this.dragging.moved();
	
			if (this.hasEventListeners(e.type) || wasDragged) {
				L.DomEvent.stopPropagation(e);
			}
	
			if (wasDragged) { return; }
	
			if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }
	
			this.fire(e.type, {
				originalEvent: e,
				latlng: this._latlng
			});
		},
	
		_onKeyPress: function (e) {
			if (e.keyCode === 13) {
				this.fire('click', {
					originalEvent: e,
					latlng: this._latlng
				});
			}
		},
	
		_fireMouseEvent: function (e) {
	
			this.fire(e.type, {
				originalEvent: e,
				latlng: this._latlng
			});
	
			// TODO proper custom event propagation
			// this line will always be called if marker is in a FeatureGroup
			if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
				L.DomEvent.preventDefault(e);
			}
			if (e.type !== 'mousedown') {
				L.DomEvent.stopPropagation(e);
			} else {
				L.DomEvent.preventDefault(e);
			}
		},
	
		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			if (this._map) {
				this._updateOpacity();
			}
	
			return this;
		},
	
		_updateOpacity: function () {
			L.DomUtil.setOpacity(this._icon, this.options.opacity);
			if (this._shadow) {
				L.DomUtil.setOpacity(this._shadow, this.options.opacity);
			}
		},
	
		_bringToFront: function () {
			this._updateZIndex(this.options.riseOffset);
		},
	
		_resetZIndex: function () {
			this._updateZIndex(0);
		}
	});
	
	L.marker = function (latlng, options) {
		return new L.Marker(latlng, options);
	};
	
	
	/*
	 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
	 * to use with L.Marker.
	 */
	
	L.DivIcon = L.Icon.extend({
		options: {
			iconSize: [12, 12], // also can be set through CSS
			/*
			iconAnchor: (Point)
			popupAnchor: (Point)
			html: (String)
			bgPos: (Point)
			*/
			className: 'leaflet-div-icon',
			html: false
		},
	
		createIcon: function (oldIcon) {
			var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
			    options = this.options;
	
			if (options.html !== false) {
				div.innerHTML = options.html;
			} else {
				div.innerHTML = '';
			}
	
			if (options.bgPos) {
				div.style.backgroundPosition =
				        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
			}
	
			this._setIconStyles(div, 'icon');
			return div;
		},
	
		createShadow: function () {
			return null;
		}
	});
	
	L.divIcon = function (options) {
		return new L.DivIcon(options);
	};
	
	
	/*
	 * L.Popup is used for displaying popups on the map.
	 */
	
	L.Map.mergeOptions({
		closePopupOnClick: true
	});
	
	L.Popup = L.Class.extend({
		includes: L.Mixin.Events,
	
		options: {
			minWidth: 50,
			maxWidth: 300,
			// maxHeight: null,
			autoPan: true,
			closeButton: true,
			offset: [0, 7],
			autoPanPadding: [5, 5],
			// autoPanPaddingTopLeft: null,
			// autoPanPaddingBottomRight: null,
			keepInView: false,
			className: '',
			zoomAnimation: true
		},
	
		initialize: function (options, source) {
			L.setOptions(this, options);
	
			this._source = source;
			this._animated = L.Browser.any3d && this.options.zoomAnimation;
			this._isOpen = false;
		},
	
		onAdd: function (map) {
			this._map = map;
	
			if (!this._container) {
				this._initLayout();
			}
	
			var animFade = map.options.fadeAnimation;
	
			if (animFade) {
				L.DomUtil.setOpacity(this._container, 0);
			}
			map._panes.popupPane.appendChild(this._container);
	
			map.on(this._getEvents(), this);
	
			this.update();
	
			if (animFade) {
				L.DomUtil.setOpacity(this._container, 1);
			}
	
			this.fire('open');
	
			map.fire('popupopen', {popup: this});
	
			if (this._source) {
				this._source.fire('popupopen', {popup: this});
			}
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		openOn: function (map) {
			map.openPopup(this);
			return this;
		},
	
		onRemove: function (map) {
			map._panes.popupPane.removeChild(this._container);
	
			L.Util.falseFn(this._container.offsetWidth); // force reflow
	
			map.off(this._getEvents(), this);
	
			if (map.options.fadeAnimation) {
				L.DomUtil.setOpacity(this._container, 0);
			}
	
			this._map = null;
	
			this.fire('close');
	
			map.fire('popupclose', {popup: this});
	
			if (this._source) {
				this._source.fire('popupclose', {popup: this});
			}
		},
	
		getLatLng: function () {
			return this._latlng;
		},
	
		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);
			if (this._map) {
				this._updatePosition();
				this._adjustPan();
			}
			return this;
		},
	
		getContent: function () {
			return this._content;
		},
	
		setContent: function (content) {
			this._content = content;
			this.update();
			return this;
		},
	
		update: function () {
			if (!this._map) { return; }
	
			this._container.style.visibility = 'hidden';
	
			this._updateContent();
			this._updateLayout();
			this._updatePosition();
	
			this._container.style.visibility = '';
	
			this._adjustPan();
		},
	
		_getEvents: function () {
			var events = {
				viewreset: this._updatePosition
			};
	
			if (this._animated) {
				events.zoomanim = this._zoomAnimation;
			}
			if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
				events.preclick = this._close;
			}
			if (this.options.keepInView) {
				events.moveend = this._adjustPan;
			}
	
			return events;
		},
	
		_close: function () {
			if (this._map) {
				this._map.closePopup(this);
			}
		},
	
		_initLayout: function () {
			var prefix = 'leaflet-popup',
				containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
				        (this._animated ? 'animated' : 'hide'),
				container = this._container = L.DomUtil.create('div', containerClass),
				closeButton;
	
			if (this.options.closeButton) {
				closeButton = this._closeButton =
				        L.DomUtil.create('a', prefix + '-close-button', container);
				closeButton.href = '#close';
				closeButton.innerHTML = '&#215;';
				L.DomEvent.disableClickPropagation(closeButton);
	
				L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
			}
	
			var wrapper = this._wrapper =
			        L.DomUtil.create('div', prefix + '-content-wrapper', container);
			L.DomEvent.disableClickPropagation(wrapper);
	
			this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
	
			L.DomEvent.disableScrollPropagation(this._contentNode);
			L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);
	
			this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
			this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
		},
	
		_updateContent: function () {
			if (!this._content) { return; }
	
			if (typeof this._content === 'string') {
				this._contentNode.innerHTML = this._content;
			} else {
				while (this._contentNode.hasChildNodes()) {
					this._contentNode.removeChild(this._contentNode.firstChild);
				}
				this._contentNode.appendChild(this._content);
			}
			this.fire('contentupdate');
		},
	
		_updateLayout: function () {
			var container = this._contentNode,
			    style = container.style;
	
			style.width = '';
			style.whiteSpace = 'nowrap';
	
			var width = container.offsetWidth;
			width = Math.min(width, this.options.maxWidth);
			width = Math.max(width, this.options.minWidth);
	
			style.width = (width + 1) + 'px';
			style.whiteSpace = '';
	
			style.height = '';
	
			var height = container.offsetHeight,
			    maxHeight = this.options.maxHeight,
			    scrolledClass = 'leaflet-popup-scrolled';
	
			if (maxHeight && height > maxHeight) {
				style.height = maxHeight + 'px';
				L.DomUtil.addClass(container, scrolledClass);
			} else {
				L.DomUtil.removeClass(container, scrolledClass);
			}
	
			this._containerWidth = this._container.offsetWidth;
		},
	
		_updatePosition: function () {
			if (!this._map) { return; }
	
			var pos = this._map.latLngToLayerPoint(this._latlng),
			    animated = this._animated,
			    offset = L.point(this.options.offset);
	
			if (animated) {
				L.DomUtil.setPosition(this._container, pos);
			}
	
			this._containerBottom = -offset.y - (animated ? 0 : pos.y);
			this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);
	
			// bottom position the popup in case the height of the popup changes (images loading etc)
			this._container.style.bottom = this._containerBottom + 'px';
			this._container.style.left = this._containerLeft + 'px';
		},
	
		_zoomAnimation: function (opt) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);
	
			L.DomUtil.setPosition(this._container, pos);
		},
	
		_adjustPan: function () {
			if (!this.options.autoPan) { return; }
	
			var map = this._map,
			    containerHeight = this._container.offsetHeight,
			    containerWidth = this._containerWidth,
	
			    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);
	
			if (this._animated) {
				layerPos._add(L.DomUtil.getPosition(this._container));
			}
	
			var containerPos = map.layerPointToContainerPoint(layerPos),
			    padding = L.point(this.options.autoPanPadding),
			    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
			    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
			    size = map.getSize(),
			    dx = 0,
			    dy = 0;
	
			if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
				dx = containerPos.x + containerWidth - size.x + paddingBR.x;
			}
			if (containerPos.x - dx - paddingTL.x < 0) { // left
				dx = containerPos.x - paddingTL.x;
			}
			if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
				dy = containerPos.y + containerHeight - size.y + paddingBR.y;
			}
			if (containerPos.y - dy - paddingTL.y < 0) { // top
				dy = containerPos.y - paddingTL.y;
			}
	
			if (dx || dy) {
				map
				    .fire('autopanstart')
				    .panBy([dx, dy]);
			}
		},
	
		_onCloseButtonClick: function (e) {
			this._close();
			L.DomEvent.stop(e);
		}
	});
	
	L.popup = function (options, source) {
		return new L.Popup(options, source);
	};
	
	
	L.Map.include({
		openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
			this.closePopup();
	
			if (!(popup instanceof L.Popup)) {
				var content = popup;
	
				popup = new L.Popup(options)
				    .setLatLng(latlng)
				    .setContent(content);
			}
			popup._isOpen = true;
	
			this._popup = popup;
			return this.addLayer(popup);
		},
	
		closePopup: function (popup) {
			if (!popup || popup === this._popup) {
				popup = this._popup;
				this._popup = null;
			}
			if (popup) {
				this.removeLayer(popup);
				popup._isOpen = false;
			}
			return this;
		}
	});
	
	
	/*
	 * Popup extension to L.Marker, adding popup-related methods.
	 */
	
	L.Marker.include({
		openPopup: function () {
			if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
				this._popup.setLatLng(this._latlng);
				this._map.openPopup(this._popup);
			}
	
			return this;
		},
	
		closePopup: function () {
			if (this._popup) {
				this._popup._close();
			}
			return this;
		},
	
		togglePopup: function () {
			if (this._popup) {
				if (this._popup._isOpen) {
					this.closePopup();
				} else {
					this.openPopup();
				}
			}
			return this;
		},
	
		bindPopup: function (content, options) {
			var anchor = L.point(this.options.icon.options.popupAnchor || [0, 0]);
	
			anchor = anchor.add(L.Popup.prototype.options.offset);
	
			if (options && options.offset) {
				anchor = anchor.add(options.offset);
			}
	
			options = L.extend({offset: anchor}, options);
	
			if (!this._popupHandlersAdded) {
				this
				    .on('click', this.togglePopup, this)
				    .on('remove', this.closePopup, this)
				    .on('move', this._movePopup, this);
				this._popupHandlersAdded = true;
			}
	
			if (content instanceof L.Popup) {
				L.setOptions(content, options);
				this._popup = content;
				content._source = this;
			} else {
				this._popup = new L.Popup(options, this)
					.setContent(content);
			}
	
			return this;
		},
	
		setPopupContent: function (content) {
			if (this._popup) {
				this._popup.setContent(content);
			}
			return this;
		},
	
		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this
				    .off('click', this.togglePopup, this)
				    .off('remove', this.closePopup, this)
				    .off('move', this._movePopup, this);
				this._popupHandlersAdded = false;
			}
			return this;
		},
	
		getPopup: function () {
			return this._popup;
		},
	
		_movePopup: function (e) {
			this._popup.setLatLng(e.latlng);
		}
	});
	
	
	/*
	 * L.LayerGroup is a class to combine several layers into one so that
	 * you can manipulate the group (e.g. add/remove it) as one layer.
	 */
	
	L.LayerGroup = L.Class.extend({
		initialize: function (layers) {
			this._layers = {};
	
			var i, len;
	
			if (layers) {
				for (i = 0, len = layers.length; i < len; i++) {
					this.addLayer(layers[i]);
				}
			}
		},
	
		addLayer: function (layer) {
			var id = this.getLayerId(layer);
	
			this._layers[id] = layer;
	
			if (this._map) {
				this._map.addLayer(layer);
			}
	
			return this;
		},
	
		removeLayer: function (layer) {
			var id = layer in this._layers ? layer : this.getLayerId(layer);
	
			if (this._map && this._layers[id]) {
				this._map.removeLayer(this._layers[id]);
			}
	
			delete this._layers[id];
	
			return this;
		},
	
		hasLayer: function (layer) {
			if (!layer) { return false; }
	
			return (layer in this._layers || this.getLayerId(layer) in this._layers);
		},
	
		clearLayers: function () {
			this.eachLayer(this.removeLayer, this);
			return this;
		},
	
		invoke: function (methodName) {
			var args = Array.prototype.slice.call(arguments, 1),
			    i, layer;
	
			for (i in this._layers) {
				layer = this._layers[i];
	
				if (layer[methodName]) {
					layer[methodName].apply(layer, args);
				}
			}
	
			return this;
		},
	
		onAdd: function (map) {
			this._map = map;
			this.eachLayer(map.addLayer, map);
		},
	
		onRemove: function (map) {
			this.eachLayer(map.removeLayer, map);
			this._map = null;
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},
	
		getLayer: function (id) {
			return this._layers[id];
		},
	
		getLayers: function () {
			var layers = [];
	
			for (var i in this._layers) {
				layers.push(this._layers[i]);
			}
			return layers;
		},
	
		setZIndex: function (zIndex) {
			return this.invoke('setZIndex', zIndex);
		},
	
		getLayerId: function (layer) {
			return L.stamp(layer);
		}
	});
	
	L.layerGroup = function (layers) {
		return new L.LayerGroup(layers);
	};
	
	
	/*
	 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
	 * shared between a group of interactive layers (like vectors or markers).
	 */
	
	L.FeatureGroup = L.LayerGroup.extend({
		includes: L.Mixin.Events,
	
		statics: {
			EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
		},
	
		addLayer: function (layer) {
			if (this.hasLayer(layer)) {
				return this;
			}
	
			if ('on' in layer) {
				layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
			}
	
			L.LayerGroup.prototype.addLayer.call(this, layer);
	
			if (this._popupContent && layer.bindPopup) {
				layer.bindPopup(this._popupContent, this._popupOptions);
			}
	
			return this.fire('layeradd', {layer: layer});
		},
	
		removeLayer: function (layer) {
			if (!this.hasLayer(layer)) {
				return this;
			}
			if (layer in this._layers) {
				layer = this._layers[layer];
			}
	
			if ('off' in layer) {
				layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);
			}
	
			L.LayerGroup.prototype.removeLayer.call(this, layer);
	
			if (this._popupContent) {
				this.invoke('unbindPopup');
			}
	
			return this.fire('layerremove', {layer: layer});
		},
	
		bindPopup: function (content, options) {
			this._popupContent = content;
			this._popupOptions = options;
			return this.invoke('bindPopup', content, options);
		},
	
		openPopup: function (latlng) {
			// open popup on the first layer
			for (var id in this._layers) {
				this._layers[id].openPopup(latlng);
				break;
			}
			return this;
		},
	
		setStyle: function (style) {
			return this.invoke('setStyle', style);
		},
	
		bringToFront: function () {
			return this.invoke('bringToFront');
		},
	
		bringToBack: function () {
			return this.invoke('bringToBack');
		},
	
		getBounds: function () {
			var bounds = new L.LatLngBounds();
	
			this.eachLayer(function (layer) {
				bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
			});
	
			return bounds;
		},
	
		_propagateEvent: function (e) {
			e = L.extend({
				layer: e.target,
				target: this
			}, e);
			this.fire(e.type, e);
		}
	});
	
	L.featureGroup = function (layers) {
		return new L.FeatureGroup(layers);
	};
	
	
	/*
	 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
	 */
	
	L.Path = L.Class.extend({
		includes: [L.Mixin.Events],
	
		statics: {
			// how much to extend the clip area around the map view
			// (relative to its size, e.g. 0.5 is half the screen in each direction)
			// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
			CLIP_PADDING: (function () {
				var max = L.Browser.mobile ? 1280 : 2000,
				    target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
				return Math.max(0, Math.min(0.5, target));
			})()
		},
	
		options: {
			stroke: true,
			color: '#0033ff',
			dashArray: null,
			lineCap: null,
			lineJoin: null,
			weight: 5,
			opacity: 0.5,
	
			fill: false,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
	
			clickable: true
		},
	
		initialize: function (options) {
			L.setOptions(this, options);
		},
	
		onAdd: function (map) {
			this._map = map;
	
			if (!this._container) {
				this._initElements();
				this._initEvents();
			}
	
			this.projectLatlngs();
			this._updatePath();
	
			if (this._container) {
				this._map._pathRoot.appendChild(this._container);
			}
	
			this.fire('add');
	
			map.on({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this);
		},
	
		addTo: function (map) {
			map.addLayer(this);
			return this;
		},
	
		onRemove: function (map) {
			map._pathRoot.removeChild(this._container);
	
			// Need to fire remove event before we set _map to null as the event hooks might need the object
			this.fire('remove');
			this._map = null;
	
			if (L.Browser.vml) {
				this._container = null;
				this._stroke = null;
				this._fill = null;
			}
	
			map.off({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this);
		},
	
		projectLatlngs: function () {
			// do all projection stuff here
		},
	
		setStyle: function (style) {
			L.setOptions(this, style);
	
			if (this._container) {
				this._updateStyle();
			}
	
			return this;
		},
	
		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._updatePath();
			}
			return this;
		}
	});
	
	L.Map.include({
		_updatePathViewport: function () {
			var p = L.Path.CLIP_PADDING,
			    size = this.getSize(),
			    panePos = L.DomUtil.getPosition(this._mapPane),
			    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
			    max = min.add(size.multiplyBy(1 + p * 2)._round());
	
			this._pathViewport = new L.Bounds(min, max);
		}
	});
	
	
	/*
	 * Extends L.Path with SVG-specific rendering code.
	 */
	
	L.Path.SVG_NS = 'http://www.w3.org/2000/svg';
	
	L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);
	
	L.Path = L.Path.extend({
		statics: {
			SVG: L.Browser.svg
		},
	
		bringToFront: function () {
			var root = this._map._pathRoot,
			    path = this._container;
	
			if (path && root.lastChild !== path) {
				root.appendChild(path);
			}
			return this;
		},
	
		bringToBack: function () {
			var root = this._map._pathRoot,
			    path = this._container,
			    first = root.firstChild;
	
			if (path && first !== path) {
				root.insertBefore(path, first);
			}
			return this;
		},
	
		getPathString: function () {
			// form path string here
		},
	
		_createElement: function (name) {
			return document.createElementNS(L.Path.SVG_NS, name);
		},
	
		_initElements: function () {
			this._map._initPathRoot();
			this._initPath();
			this._initStyle();
		},
	
		_initPath: function () {
			this._container = this._createElement('g');
	
			this._path = this._createElement('path');
	
			if (this.options.className) {
				L.DomUtil.addClass(this._path, this.options.className);
			}
	
			this._container.appendChild(this._path);
		},
	
		_initStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke-linejoin', 'round');
				this._path.setAttribute('stroke-linecap', 'round');
			}
			if (this.options.fill) {
				this._path.setAttribute('fill-rule', 'evenodd');
			}
			if (this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', this.options.pointerEvents);
			}
			if (!this.options.clickable && !this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', 'none');
			}
			this._updateStyle();
		},
	
		_updateStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke', this.options.color);
				this._path.setAttribute('stroke-opacity', this.options.opacity);
				this._path.setAttribute('stroke-width', this.options.weight);
				if (this.options.dashArray) {
					this._path.setAttribute('stroke-dasharray', this.options.dashArray);
				} else {
					this._path.removeAttribute('stroke-dasharray');
				}
				if (this.options.lineCap) {
					this._path.setAttribute('stroke-linecap', this.options.lineCap);
				}
				if (this.options.lineJoin) {
					this._path.setAttribute('stroke-linejoin', this.options.lineJoin);
				}
			} else {
				this._path.setAttribute('stroke', 'none');
			}
			if (this.options.fill) {
				this._path.setAttribute('fill', this.options.fillColor || this.options.color);
				this._path.setAttribute('fill-opacity', this.options.fillOpacity);
			} else {
				this._path.setAttribute('fill', 'none');
			}
		},
	
		_updatePath: function () {
			var str = this.getPathString();
			if (!str) {
				// fix webkit empty string parsing bug
				str = 'M0 0';
			}
			this._path.setAttribute('d', str);
		},
	
		// TODO remove duplication with L.Map
		_initEvents: function () {
			if (this.options.clickable) {
				if (L.Browser.svg || !L.Browser.vml) {
					L.DomUtil.addClass(this._path, 'leaflet-clickable');
				}
	
				L.DomEvent.on(this._container, 'click', this._onMouseClick, this);
	
				var events = ['dblclick', 'mousedown', 'mouseover',
				              'mouseout', 'mousemove', 'contextmenu'];
				for (var i = 0; i < events.length; i++) {
					L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
				}
			}
		},
	
		_onMouseClick: function (e) {
			if (this._map.dragging && this._map.dragging.moved()) { return; }
	
			this._fireMouseEvent(e);
		},
	
		_fireMouseEvent: function (e) {
			if (!this._map || !this.hasEventListeners(e.type)) { return; }
	
			var map = this._map,
			    containerPoint = map.mouseEventToContainerPoint(e),
			    layerPoint = map.containerPointToLayerPoint(containerPoint),
			    latlng = map.layerPointToLatLng(layerPoint);
	
			this.fire(e.type, {
				latlng: latlng,
				layerPoint: layerPoint,
				containerPoint: containerPoint,
				originalEvent: e
			});
	
			if (e.type === 'contextmenu') {
				L.DomEvent.preventDefault(e);
			}
			if (e.type !== 'mousemove') {
				L.DomEvent.stopPropagation(e);
			}
		}
	});
	
	L.Map.include({
		_initPathRoot: function () {
			if (!this._pathRoot) {
				this._pathRoot = L.Path.prototype._createElement('svg');
				this._panes.overlayPane.appendChild(this._pathRoot);
	
				if (this.options.zoomAnimation && L.Browser.any3d) {
					L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');
	
					this.on({
						'zoomanim': this._animatePathZoom,
						'zoomend': this._endPathZoom
					});
				} else {
					L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
				}
	
				this.on('moveend', this._updateSvgViewport);
				this._updateSvgViewport();
			}
		},
	
		_animatePathZoom: function (e) {
			var scale = this.getZoomScale(e.zoom),
			    offset = this._getCenterOffset(e.center)._multiplyBy(-scale)._add(this._pathViewport.min);
	
			this._pathRoot.style[L.DomUtil.TRANSFORM] =
			        L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ') ';
	
			this._pathZooming = true;
		},
	
		_endPathZoom: function () {
			this._pathZooming = false;
		},
	
		_updateSvgViewport: function () {
	
			if (this._pathZooming) {
				// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
				// When the zoom animation ends we will be updated again anyway
				// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
				return;
			}
	
			this._updatePathViewport();
	
			var vp = this._pathViewport,
			    min = vp.min,
			    max = vp.max,
			    width = max.x - min.x,
			    height = max.y - min.y,
			    root = this._pathRoot,
			    pane = this._panes.overlayPane;
	
			// Hack to make flicker on drag end on mobile webkit less irritating
			if (L.Browser.mobileWebkit) {
				pane.removeChild(root);
			}
	
			L.DomUtil.setPosition(root, min);
			root.setAttribute('width', width);
			root.setAttribute('height', height);
			root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));
	
			if (L.Browser.mobileWebkit) {
				pane.appendChild(root);
			}
		}
	});
	
	
	/*
	 * Popup extension to L.Path (polylines, polygons, circles), adding popup-related methods.
	 */
	
	L.Path.include({
	
		bindPopup: function (content, options) {
	
			if (content instanceof L.Popup) {
				this._popup = content;
			} else {
				if (!this._popup || options) {
					this._popup = new L.Popup(options, this);
				}
				this._popup.setContent(content);
			}
	
			if (!this._popupHandlersAdded) {
				this
				    .on('click', this._openPopup, this)
				    .on('remove', this.closePopup, this);
	
				this._popupHandlersAdded = true;
			}
	
			return this;
		},
	
		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this
				    .off('click', this._openPopup)
				    .off('remove', this.closePopup);
	
				this._popupHandlersAdded = false;
			}
			return this;
		},
	
		openPopup: function (latlng) {
	
			if (this._popup) {
				// open the popup from one of the path's points if not specified
				latlng = latlng || this._latlng ||
				         this._latlngs[Math.floor(this._latlngs.length / 2)];
	
				this._openPopup({latlng: latlng});
			}
	
			return this;
		},
	
		closePopup: function () {
			if (this._popup) {
				this._popup._close();
			}
			return this;
		},
	
		_openPopup: function (e) {
			this._popup.setLatLng(e.latlng);
			this._map.openPopup(this._popup);
		}
	});
	
	
	/*
	 * Vector rendering for IE6-8 through VML.
	 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
	 */
	
	L.Browser.vml = !L.Browser.svg && (function () {
		try {
			var div = document.createElement('div');
			div.innerHTML = '<v:shape adj="1"/>';
	
			var shape = div.firstChild;
			shape.style.behavior = 'url(#default#VML)';
	
			return shape && (typeof shape.adj === 'object');
	
		} catch (e) {
			return false;
		}
	}());
	
	L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
		statics: {
			VML: true,
			CLIP_PADDING: 0.02
		},
	
		_createElement: (function () {
			try {
				document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
				return function (name) {
					return document.createElement('<lvml:' + name + ' class="lvml">');
				};
			} catch (e) {
				return function (name) {
					return document.createElement(
					        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
				};
			}
		}()),
	
		_initPath: function () {
			var container = this._container = this._createElement('shape');
	
			L.DomUtil.addClass(container, 'leaflet-vml-shape' +
				(this.options.className ? ' ' + this.options.className : ''));
	
			if (this.options.clickable) {
				L.DomUtil.addClass(container, 'leaflet-clickable');
			}
	
			container.coordsize = '1 1';
	
			this._path = this._createElement('path');
			container.appendChild(this._path);
	
			this._map._pathRoot.appendChild(container);
		},
	
		_initStyle: function () {
			this._updateStyle();
		},
	
		_updateStyle: function () {
			var stroke = this._stroke,
			    fill = this._fill,
			    options = this.options,
			    container = this._container;
	
			container.stroked = options.stroke;
			container.filled = options.fill;
	
			if (options.stroke) {
				if (!stroke) {
					stroke = this._stroke = this._createElement('stroke');
					stroke.endcap = 'round';
					container.appendChild(stroke);
				}
				stroke.weight = options.weight + 'px';
				stroke.color = options.color;
				stroke.opacity = options.opacity;
	
				if (options.dashArray) {
					stroke.dashStyle = L.Util.isArray(options.dashArray) ?
					    options.dashArray.join(' ') :
					    options.dashArray.replace(/( *, *)/g, ' ');
				} else {
					stroke.dashStyle = '';
				}
				if (options.lineCap) {
					stroke.endcap = options.lineCap.replace('butt', 'flat');
				}
				if (options.lineJoin) {
					stroke.joinstyle = options.lineJoin;
				}
	
			} else if (stroke) {
				container.removeChild(stroke);
				this._stroke = null;
			}
	
			if (options.fill) {
				if (!fill) {
					fill = this._fill = this._createElement('fill');
					container.appendChild(fill);
				}
				fill.color = options.fillColor || options.color;
				fill.opacity = options.fillOpacity;
	
			} else if (fill) {
				container.removeChild(fill);
				this._fill = null;
			}
		},
	
		_updatePath: function () {
			var style = this._container.style;
	
			style.display = 'none';
			this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
			style.display = '';
		}
	});
	
	L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
		_initPathRoot: function () {
			if (this._pathRoot) { return; }
	
			var root = this._pathRoot = document.createElement('div');
			root.className = 'leaflet-vml-container';
			this._panes.overlayPane.appendChild(root);
	
			this.on('moveend', this._updatePathViewport);
			this._updatePathViewport();
		}
	});
	
	
	/*
	 * Vector rendering for all browsers that support canvas.
	 */
	
	L.Browser.canvas = (function () {
		return !!document.createElement('canvas').getContext;
	}());
	
	L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
		statics: {
			//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
			CANVAS: true,
			SVG: false
		},
	
		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._requestUpdate();
			}
			return this;
		},
	
		setStyle: function (style) {
			L.setOptions(this, style);
	
			if (this._map) {
				this._updateStyle();
				this._requestUpdate();
			}
			return this;
		},
	
		onRemove: function (map) {
			map
			    .off('viewreset', this.projectLatlngs, this)
			    .off('moveend', this._updatePath, this);
	
			if (this.options.clickable) {
				this._map.off('click', this._onClick, this);
				this._map.off('mousemove', this._onMouseMove, this);
			}
	
			this._requestUpdate();
			
			this.fire('remove');
			this._map = null;
		},
	
		_requestUpdate: function () {
			if (this._map && !L.Path._updateRequest) {
				L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
			}
		},
	
		_fireMapMoveEnd: function () {
			L.Path._updateRequest = null;
			this.fire('moveend');
		},
	
		_initElements: function () {
			this._map._initPathRoot();
			this._ctx = this._map._canvasCtx;
		},
	
		_updateStyle: function () {
			var options = this.options;
	
			if (options.stroke) {
				this._ctx.lineWidth = options.weight;
				this._ctx.strokeStyle = options.color;
			}
			if (options.fill) {
				this._ctx.fillStyle = options.fillColor || options.color;
			}
	
			if (options.lineCap) {
				this._ctx.lineCap = options.lineCap;
			}
			if (options.lineJoin) {
				this._ctx.lineJoin = options.lineJoin;
			}
		},
	
		_drawPath: function () {
			var i, j, len, len2, point, drawMethod;
	
			this._ctx.beginPath();
	
			for (i = 0, len = this._parts.length; i < len; i++) {
				for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
					point = this._parts[i][j];
					drawMethod = (j === 0 ? 'move' : 'line') + 'To';
	
					this._ctx[drawMethod](point.x, point.y);
				}
				// TODO refactor ugly hack
				if (this instanceof L.Polygon) {
					this._ctx.closePath();
				}
			}
		},
	
		_checkIfEmpty: function () {
			return !this._parts.length;
		},
	
		_updatePath: function () {
			if (this._checkIfEmpty()) { return; }
	
			var ctx = this._ctx,
			    options = this.options;
	
			this._drawPath();
			ctx.save();
			this._updateStyle();
	
			if (options.fill) {
				ctx.globalAlpha = options.fillOpacity;
				ctx.fill(options.fillRule || 'evenodd');
			}
	
			if (options.stroke) {
				ctx.globalAlpha = options.opacity;
				ctx.stroke();
			}
	
			ctx.restore();
	
			// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
		},
	
		_initEvents: function () {
			if (this.options.clickable) {
				this._map.on('mousemove', this._onMouseMove, this);
				this._map.on('click dblclick contextmenu', this._fireMouseEvent, this);
			}
		},
	
		_fireMouseEvent: function (e) {
			if (this._containsPoint(e.layerPoint)) {
				this.fire(e.type, e);
			}
		},
	
		_onMouseMove: function (e) {
			if (!this._map || this._map._animatingZoom) { return; }
	
			// TODO don't do on each move
			if (this._containsPoint(e.layerPoint)) {
				this._ctx.canvas.style.cursor = 'pointer';
				this._mouseInside = true;
				this.fire('mouseover', e);
	
			} else if (this._mouseInside) {
				this._ctx.canvas.style.cursor = '';
				this._mouseInside = false;
				this.fire('mouseout', e);
			}
		}
	});
	
	L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
		_initPathRoot: function () {
			var root = this._pathRoot,
			    ctx;
	
			if (!root) {
				root = this._pathRoot = document.createElement('canvas');
				root.style.position = 'absolute';
				ctx = this._canvasCtx = root.getContext('2d');
	
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
	
				this._panes.overlayPane.appendChild(root);
	
				if (this.options.zoomAnimation) {
					this._pathRoot.className = 'leaflet-zoom-animated';
					this.on('zoomanim', this._animatePathZoom);
					this.on('zoomend', this._endPathZoom);
				}
				this.on('moveend', this._updateCanvasViewport);
				this._updateCanvasViewport();
			}
		},
	
		_updateCanvasViewport: function () {
			// don't redraw while zooming. See _updateSvgViewport for more details
			if (this._pathZooming) { return; }
			this._updatePathViewport();
	
			var vp = this._pathViewport,
			    min = vp.min,
			    size = vp.max.subtract(min),
			    root = this._pathRoot;
	
			//TODO check if this works properly on mobile webkit
			L.DomUtil.setPosition(root, min);
			root.width = size.x;
			root.height = size.y;
			root.getContext('2d').translate(-min.x, -min.y);
		}
	});
	
	
	/*
	 * L.LineUtil contains different utility functions for line segments
	 * and polylines (clipping, simplification, distances, etc.)
	 */
	
	/*jshint bitwise:false */ // allow bitwise operations for this file
	
	L.LineUtil = {
	
		// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
		// Improves rendering performance dramatically by lessening the number of points to draw.
	
		simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
			if (!tolerance || !points.length) {
				return points.slice();
			}
	
			var sqTolerance = tolerance * tolerance;
	
			// stage 1: vertex reduction
			points = this._reducePoints(points, sqTolerance);
	
			// stage 2: Douglas-Peucker simplification
			points = this._simplifyDP(points, sqTolerance);
	
			return points;
		},
	
		// distance from a point to a segment between two points
		pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
			return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
		},
	
		closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
			return this._sqClosestPointOnSegment(p, p1, p2);
		},
	
		// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
		_simplifyDP: function (points, sqTolerance) {
	
			var len = points.length,
			    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
			    markers = new ArrayConstructor(len);
	
			markers[0] = markers[len - 1] = 1;
	
			this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
	
			var i,
			    newPoints = [];
	
			for (i = 0; i < len; i++) {
				if (markers[i]) {
					newPoints.push(points[i]);
				}
			}
	
			return newPoints;
		},
	
		_simplifyDPStep: function (points, markers, sqTolerance, first, last) {
	
			var maxSqDist = 0,
			    index, i, sqDist;
	
			for (i = first + 1; i <= last - 1; i++) {
				sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);
	
				if (sqDist > maxSqDist) {
					index = i;
					maxSqDist = sqDist;
				}
			}
	
			if (maxSqDist > sqTolerance) {
				markers[index] = 1;
	
				this._simplifyDPStep(points, markers, sqTolerance, first, index);
				this._simplifyDPStep(points, markers, sqTolerance, index, last);
			}
		},
	
		// reduce points that are too close to each other to a single point
		_reducePoints: function (points, sqTolerance) {
			var reducedPoints = [points[0]];
	
			for (var i = 1, prev = 0, len = points.length; i < len; i++) {
				if (this._sqDist(points[i], points[prev]) > sqTolerance) {
					reducedPoints.push(points[i]);
					prev = i;
				}
			}
			if (prev < len - 1) {
				reducedPoints.push(points[len - 1]);
			}
			return reducedPoints;
		},
	
		// Cohen-Sutherland line clipping algorithm.
		// Used to avoid rendering parts of a polyline that are not currently visible.
	
		clipSegment: function (a, b, bounds, useLastCode) {
			var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
			    codeB = this._getBitCode(b, bounds),
	
			    codeOut, p, newCode;
	
			// save 2nd code to avoid calculating it on the next segment
			this._lastCode = codeB;
	
			while (true) {
				// if a,b is inside the clip window (trivial accept)
				if (!(codeA | codeB)) {
					return [a, b];
				// if a,b is outside the clip window (trivial reject)
				} else if (codeA & codeB) {
					return false;
				// other cases
				} else {
					codeOut = codeA || codeB;
					p = this._getEdgeIntersection(a, b, codeOut, bounds);
					newCode = this._getBitCode(p, bounds);
	
					if (codeOut === codeA) {
						a = p;
						codeA = newCode;
					} else {
						b = p;
						codeB = newCode;
					}
				}
			}
		},
	
		_getEdgeIntersection: function (a, b, code, bounds) {
			var dx = b.x - a.x,
			    dy = b.y - a.y,
			    min = bounds.min,
			    max = bounds.max;
	
			if (code & 8) { // top
				return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
			} else if (code & 4) { // bottom
				return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
			} else if (code & 2) { // right
				return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
			} else if (code & 1) { // left
				return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
			}
		},
	
		_getBitCode: function (/*Point*/ p, bounds) {
			var code = 0;
	
			if (p.x < bounds.min.x) { // left
				code |= 1;
			} else if (p.x > bounds.max.x) { // right
				code |= 2;
			}
			if (p.y < bounds.min.y) { // bottom
				code |= 4;
			} else if (p.y > bounds.max.y) { // top
				code |= 8;
			}
	
			return code;
		},
	
		// square distance (to avoid unnecessary Math.sqrt calls)
		_sqDist: function (p1, p2) {
			var dx = p2.x - p1.x,
			    dy = p2.y - p1.y;
			return dx * dx + dy * dy;
		},
	
		// return closest point on segment or distance to that point
		_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
			var x = p1.x,
			    y = p1.y,
			    dx = p2.x - x,
			    dy = p2.y - y,
			    dot = dx * dx + dy * dy,
			    t;
	
			if (dot > 0) {
				t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
	
				if (t > 1) {
					x = p2.x;
					y = p2.y;
				} else if (t > 0) {
					x += dx * t;
					y += dy * t;
				}
			}
	
			dx = p.x - x;
			dy = p.y - y;
	
			return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
		}
	};
	
	
	/*
	 * L.Polyline is used to display polylines on a map.
	 */
	
	L.Polyline = L.Path.extend({
		initialize: function (latlngs, options) {
			L.Path.prototype.initialize.call(this, options);
	
			this._latlngs = this._convertLatLngs(latlngs);
		},
	
		options: {
			// how much to simplify the polyline on each zoom level
			// more = better performance and smoother look, less = more accurate
			smoothFactor: 1.0,
			noClip: false
		},
	
		projectLatlngs: function () {
			this._originalPoints = [];
	
			for (var i = 0, len = this._latlngs.length; i < len; i++) {
				this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
			}
		},
	
		getPathString: function () {
			for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
				str += this._getPathPartStr(this._parts[i]);
			}
			return str;
		},
	
		getLatLngs: function () {
			return this._latlngs;
		},
	
		setLatLngs: function (latlngs) {
			this._latlngs = this._convertLatLngs(latlngs);
			return this.redraw();
		},
	
		addLatLng: function (latlng) {
			this._latlngs.push(L.latLng(latlng));
			return this.redraw();
		},
	
		spliceLatLngs: function () { // (Number index, Number howMany)
			var removed = [].splice.apply(this._latlngs, arguments);
			this._convertLatLngs(this._latlngs, true);
			this.redraw();
			return removed;
		},
	
		closestLayerPoint: function (p) {
			var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;
	
			for (var j = 0, jLen = parts.length; j < jLen; j++) {
				var points = parts[j];
				for (var i = 1, len = points.length; i < len; i++) {
					p1 = points[i - 1];
					p2 = points[i];
					var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
					if (sqDist < minDistance) {
						minDistance = sqDist;
						minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
					}
				}
			}
			if (minPoint) {
				minPoint.distance = Math.sqrt(minDistance);
			}
			return minPoint;
		},
	
		getBounds: function () {
			return new L.LatLngBounds(this.getLatLngs());
		},
	
		_convertLatLngs: function (latlngs, overwrite) {
			var i, len, target = overwrite ? latlngs : [];
	
			for (i = 0, len = latlngs.length; i < len; i++) {
				if (L.Util.isArray(latlngs[i]) && typeof latlngs[i][0] !== 'number') {
					return;
				}
				target[i] = L.latLng(latlngs[i]);
			}
			return target;
		},
	
		_initEvents: function () {
			L.Path.prototype._initEvents.call(this);
		},
	
		_getPathPartStr: function (points) {
			var round = L.Path.VML;
	
			for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
				p = points[j];
				if (round) {
					p._round();
				}
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}
			return str;
		},
	
		_clipPoints: function () {
			var points = this._originalPoints,
			    len = points.length,
			    i, k, segment;
	
			if (this.options.noClip) {
				this._parts = [points];
				return;
			}
	
			this._parts = [];
	
			var parts = this._parts,
			    vp = this._map._pathViewport,
			    lu = L.LineUtil;
	
			for (i = 0, k = 0; i < len - 1; i++) {
				segment = lu.clipSegment(points[i], points[i + 1], vp, i);
				if (!segment) {
					continue;
				}
	
				parts[k] = parts[k] || [];
				parts[k].push(segment[0]);
	
				// if segment goes out of screen, or it's the last one, it's the end of the line part
				if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
					parts[k].push(segment[1]);
					k++;
				}
			}
		},
	
		// simplify each clipped part of the polyline
		_simplifyPoints: function () {
			var parts = this._parts,
			    lu = L.LineUtil;
	
			for (var i = 0, len = parts.length; i < len; i++) {
				parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
			}
		},
	
		_updatePath: function () {
			if (!this._map) { return; }
	
			this._clipPoints();
			this._simplifyPoints();
	
			L.Path.prototype._updatePath.call(this);
		}
	});
	
	L.polyline = function (latlngs, options) {
		return new L.Polyline(latlngs, options);
	};
	
	
	/*
	 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
	 */
	
	/*jshint bitwise:false */ // allow bitwise operations here
	
	L.PolyUtil = {};
	
	/*
	 * Sutherland-Hodgeman polygon clipping algorithm.
	 * Used to avoid rendering parts of a polygon that are not currently visible.
	 */
	L.PolyUtil.clipPolygon = function (points, bounds) {
		var clippedPoints,
		    edges = [1, 4, 2, 8],
		    i, j, k,
		    a, b,
		    len, edge, p,
		    lu = L.LineUtil;
	
		for (i = 0, len = points.length; i < len; i++) {
			points[i]._code = lu._getBitCode(points[i], bounds);
		}
	
		// for each edge (left, bottom, right, top)
		for (k = 0; k < 4; k++) {
			edge = edges[k];
			clippedPoints = [];
	
			for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
				a = points[i];
				b = points[j];
	
				// if a is inside the clip window
				if (!(a._code & edge)) {
					// if b is outside the clip window (a->b goes out of screen)
					if (b._code & edge) {
						p = lu._getEdgeIntersection(b, a, edge, bounds);
						p._code = lu._getBitCode(p, bounds);
						clippedPoints.push(p);
					}
					clippedPoints.push(a);
	
				// else if b is inside the clip window (a->b enters the screen)
				} else if (!(b._code & edge)) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
			}
			points = clippedPoints;
		}
	
		return points;
	};
	
	
	/*
	 * L.Polygon is used to display polygons on a map.
	 */
	
	L.Polygon = L.Polyline.extend({
		options: {
			fill: true
		},
	
		initialize: function (latlngs, options) {
			L.Polyline.prototype.initialize.call(this, latlngs, options);
			this._initWithHoles(latlngs);
		},
	
		_initWithHoles: function (latlngs) {
			var i, len, hole;
			if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
				this._latlngs = this._convertLatLngs(latlngs[0]);
				this._holes = latlngs.slice(1);
	
				for (i = 0, len = this._holes.length; i < len; i++) {
					hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
					if (hole[0].equals(hole[hole.length - 1])) {
						hole.pop();
					}
				}
			}
	
			// filter out last point if its equal to the first one
			latlngs = this._latlngs;
	
			if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
				latlngs.pop();
			}
		},
	
		projectLatlngs: function () {
			L.Polyline.prototype.projectLatlngs.call(this);
	
			// project polygon holes points
			// TODO move this logic to Polyline to get rid of duplication
			this._holePoints = [];
	
			if (!this._holes) { return; }
	
			var i, j, len, len2;
	
			for (i = 0, len = this._holes.length; i < len; i++) {
				this._holePoints[i] = [];
	
				for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
					this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
				}
			}
		},
	
		setLatLngs: function (latlngs) {
			if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
				this._initWithHoles(latlngs);
				return this.redraw();
			} else {
				return L.Polyline.prototype.setLatLngs.call(this, latlngs);
			}
		},
	
		_clipPoints: function () {
			var points = this._originalPoints,
			    newParts = [];
	
			this._parts = [points].concat(this._holePoints);
	
			if (this.options.noClip) { return; }
	
			for (var i = 0, len = this._parts.length; i < len; i++) {
				var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
				if (clipped.length) {
					newParts.push(clipped);
				}
			}
	
			this._parts = newParts;
		},
	
		_getPathPartStr: function (points) {
			var str = L.Polyline.prototype._getPathPartStr.call(this, points);
			return str + (L.Browser.svg ? 'z' : 'x');
		}
	});
	
	L.polygon = function (latlngs, options) {
		return new L.Polygon(latlngs, options);
	};
	
	
	/*
	 * Contains L.MultiPolyline and L.MultiPolygon layers.
	 */
	
	(function () {
		function createMulti(Klass) {
	
			return L.FeatureGroup.extend({
	
				initialize: function (latlngs, options) {
					this._layers = {};
					this._options = options;
					this.setLatLngs(latlngs);
				},
	
				setLatLngs: function (latlngs) {
					var i = 0,
					    len = latlngs.length;
	
					this.eachLayer(function (layer) {
						if (i < len) {
							layer.setLatLngs(latlngs[i++]);
						} else {
							this.removeLayer(layer);
						}
					}, this);
	
					while (i < len) {
						this.addLayer(new Klass(latlngs[i++], this._options));
					}
	
					return this;
				},
	
				getLatLngs: function () {
					var latlngs = [];
	
					this.eachLayer(function (layer) {
						latlngs.push(layer.getLatLngs());
					});
	
					return latlngs;
				}
			});
		}
	
		L.MultiPolyline = createMulti(L.Polyline);
		L.MultiPolygon = createMulti(L.Polygon);
	
		L.multiPolyline = function (latlngs, options) {
			return new L.MultiPolyline(latlngs, options);
		};
	
		L.multiPolygon = function (latlngs, options) {
			return new L.MultiPolygon(latlngs, options);
		};
	}());
	
	
	/*
	 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
	 */
	
	L.Rectangle = L.Polygon.extend({
		initialize: function (latLngBounds, options) {
			L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
		},
	
		setBounds: function (latLngBounds) {
			this.setLatLngs(this._boundsToLatLngs(latLngBounds));
		},
	
		_boundsToLatLngs: function (latLngBounds) {
			latLngBounds = L.latLngBounds(latLngBounds);
			return [
				latLngBounds.getSouthWest(),
				latLngBounds.getNorthWest(),
				latLngBounds.getNorthEast(),
				latLngBounds.getSouthEast()
			];
		}
	});
	
	L.rectangle = function (latLngBounds, options) {
		return new L.Rectangle(latLngBounds, options);
	};
	
	
	/*
	 * L.Circle is a circle overlay (with a certain radius in meters).
	 */
	
	L.Circle = L.Path.extend({
		initialize: function (latlng, radius, options) {
			L.Path.prototype.initialize.call(this, options);
	
			this._latlng = L.latLng(latlng);
			this._mRadius = radius;
		},
	
		options: {
			fill: true
		},
	
		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);
			return this.redraw();
		},
	
		setRadius: function (radius) {
			this._mRadius = radius;
			return this.redraw();
		},
	
		projectLatlngs: function () {
			var lngRadius = this._getLngRadius(),
			    latlng = this._latlng,
			    pointLeft = this._map.latLngToLayerPoint([latlng.lat, latlng.lng - lngRadius]);
	
			this._point = this._map.latLngToLayerPoint(latlng);
			this._radius = Math.max(this._point.x - pointLeft.x, 1);
		},
	
		getBounds: function () {
			var lngRadius = this._getLngRadius(),
			    latRadius = (this._mRadius / 40075017) * 360,
			    latlng = this._latlng;
	
			return new L.LatLngBounds(
			        [latlng.lat - latRadius, latlng.lng - lngRadius],
			        [latlng.lat + latRadius, latlng.lng + lngRadius]);
		},
	
		getLatLng: function () {
			return this._latlng;
		},
	
		getPathString: function () {
			var p = this._point,
			    r = this._radius;
	
			if (this._checkIfEmpty()) {
				return '';
			}
	
			if (L.Browser.svg) {
				return 'M' + p.x + ',' + (p.y - r) +
				       'A' + r + ',' + r + ',0,1,1,' +
				       (p.x - 0.1) + ',' + (p.y - r) + ' z';
			} else {
				p._round();
				r = Math.round(r);
				return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
			}
		},
	
		getRadius: function () {
			return this._mRadius;
		},
	
		// TODO Earth hardcoded, move into projection code!
	
		_getLatRadius: function () {
			return (this._mRadius / 40075017) * 360;
		},
	
		_getLngRadius: function () {
			return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
		},
	
		_checkIfEmpty: function () {
			if (!this._map) {
				return false;
			}
			var vp = this._map._pathViewport,
			    r = this._radius,
			    p = this._point;
	
			return p.x - r > vp.max.x || p.y - r > vp.max.y ||
			       p.x + r < vp.min.x || p.y + r < vp.min.y;
		}
	});
	
	L.circle = function (latlng, radius, options) {
		return new L.Circle(latlng, radius, options);
	};
	
	
	/*
	 * L.CircleMarker is a circle overlay with a permanent pixel radius.
	 */
	
	L.CircleMarker = L.Circle.extend({
		options: {
			radius: 10,
			weight: 2
		},
	
		initialize: function (latlng, options) {
			L.Circle.prototype.initialize.call(this, latlng, null, options);
			this._radius = this.options.radius;
		},
	
		projectLatlngs: function () {
			this._point = this._map.latLngToLayerPoint(this._latlng);
		},
	
		_updateStyle : function () {
			L.Circle.prototype._updateStyle.call(this);
			this.setRadius(this.options.radius);
		},
	
		setLatLng: function (latlng) {
			L.Circle.prototype.setLatLng.call(this, latlng);
			if (this._popup && this._popup._isOpen) {
				this._popup.setLatLng(latlng);
			}
			return this;
		},
	
		setRadius: function (radius) {
			this.options.radius = this._radius = radius;
			return this.redraw();
		},
	
		getRadius: function () {
			return this._radius;
		}
	});
	
	L.circleMarker = function (latlng, options) {
		return new L.CircleMarker(latlng, options);
	};
	
	
	/*
	 * Extends L.Polyline to be able to manually detect clicks on Canvas-rendered polylines.
	 */
	
	L.Polyline.include(!L.Path.CANVAS ? {} : {
		_containsPoint: function (p, closed) {
			var i, j, k, len, len2, dist, part,
			    w = this.options.weight / 2;
	
			if (L.Browser.touch) {
				w += 10; // polyline click tolerance on touch devices
			}
	
			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];
				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					if (!closed && (j === 0)) {
						continue;
					}
	
					dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);
	
					if (dist <= w) {
						return true;
					}
				}
			}
			return false;
		}
	});
	
	
	/*
	 * Extends L.Polygon to be able to manually detect clicks on Canvas-rendered polygons.
	 */
	
	L.Polygon.include(!L.Path.CANVAS ? {} : {
		_containsPoint: function (p) {
			var inside = false,
			    part, p1, p2,
			    i, j, k,
			    len, len2;
	
			// TODO optimization: check if within bounds first
	
			if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
				// click on polygon border
				return true;
			}
	
			// ray casting algorithm for detecting if point is in polygon
	
			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];
	
				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					p1 = part[j];
					p2 = part[k];
	
					if (((p1.y > p.y) !== (p2.y > p.y)) &&
							(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
						inside = !inside;
					}
				}
			}
	
			return inside;
		}
	});
	
	
	/*
	 * Extends L.Circle with Canvas-specific code.
	 */
	
	L.Circle.include(!L.Path.CANVAS ? {} : {
		_drawPath: function () {
			var p = this._point;
			this._ctx.beginPath();
			this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
		},
	
		_containsPoint: function (p) {
			var center = this._point,
			    w2 = this.options.stroke ? this.options.weight / 2 : 0;
	
			return (p.distanceTo(center) <= this._radius + w2);
		}
	});
	
	
	/*
	 * CircleMarker canvas specific drawing parts.
	 */
	
	L.CircleMarker.include(!L.Path.CANVAS ? {} : {
		_updateStyle: function () {
			L.Path.prototype._updateStyle.call(this);
		}
	});
	
	
	/*
	 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
	 */
	
	L.GeoJSON = L.FeatureGroup.extend({
	
		initialize: function (geojson, options) {
			L.setOptions(this, options);
	
			this._layers = {};
	
			if (geojson) {
				this.addData(geojson);
			}
		},
	
		addData: function (geojson) {
			var features = L.Util.isArray(geojson) ? geojson : geojson.features,
			    i, len, feature;
	
			if (features) {
				for (i = 0, len = features.length; i < len; i++) {
					// Only add this if geometry or geometries are set and not null
					feature = features[i];
					if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
						this.addData(features[i]);
					}
				}
				return this;
			}
	
			var options = this.options;
	
			if (options.filter && !options.filter(geojson)) { return; }
	
			var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
			layer.feature = L.GeoJSON.asFeature(geojson);
	
			layer.defaultOptions = layer.options;
			this.resetStyle(layer);
	
			if (options.onEachFeature) {
				options.onEachFeature(geojson, layer);
			}
	
			return this.addLayer(layer);
		},
	
		resetStyle: function (layer) {
			var style = this.options.style;
			if (style) {
				// reset any custom styles
				L.Util.extend(layer.options, layer.defaultOptions);
	
				this._setLayerStyle(layer, style);
			}
		},
	
		setStyle: function (style) {
			this.eachLayer(function (layer) {
				this._setLayerStyle(layer, style);
			}, this);
		},
	
		_setLayerStyle: function (layer, style) {
			if (typeof style === 'function') {
				style = style(layer.feature);
			}
			if (layer.setStyle) {
				layer.setStyle(style);
			}
		}
	});
	
	L.extend(L.GeoJSON, {
		geometryToLayer: function (geojson, pointToLayer, coordsToLatLng, vectorOptions) {
			var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
			    coords = geometry.coordinates,
			    layers = [],
			    latlng, latlngs, i, len;
	
			coordsToLatLng = coordsToLatLng || this.coordsToLatLng;
	
			switch (geometry.type) {
			case 'Point':
				latlng = coordsToLatLng(coords);
				return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);
	
			case 'MultiPoint':
				for (i = 0, len = coords.length; i < len; i++) {
					latlng = coordsToLatLng(coords[i]);
					layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
				}
				return new L.FeatureGroup(layers);
	
			case 'LineString':
				latlngs = this.coordsToLatLngs(coords, 0, coordsToLatLng);
				return new L.Polyline(latlngs, vectorOptions);
	
			case 'Polygon':
				if (coords.length === 2 && !coords[1].length) {
					throw new Error('Invalid GeoJSON object.');
				}
				latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
				return new L.Polygon(latlngs, vectorOptions);
	
			case 'MultiLineString':
				latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
				return new L.MultiPolyline(latlngs, vectorOptions);
	
			case 'MultiPolygon':
				latlngs = this.coordsToLatLngs(coords, 2, coordsToLatLng);
				return new L.MultiPolygon(latlngs, vectorOptions);
	
			case 'GeometryCollection':
				for (i = 0, len = geometry.geometries.length; i < len; i++) {
	
					layers.push(this.geometryToLayer({
						geometry: geometry.geometries[i],
						type: 'Feature',
						properties: geojson.properties
					}, pointToLayer, coordsToLatLng, vectorOptions));
				}
				return new L.FeatureGroup(layers);
	
			default:
				throw new Error('Invalid GeoJSON object.');
			}
		},
	
		coordsToLatLng: function (coords) { // (Array[, Boolean]) -> LatLng
			return new L.LatLng(coords[1], coords[0], coords[2]);
		},
	
		coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) { // (Array[, Number, Function]) -> Array
			var latlng, i, len,
			    latlngs = [];
	
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = levelsDeep ?
				        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
				        (coordsToLatLng || this.coordsToLatLng)(coords[i]);
	
				latlngs.push(latlng);
			}
	
			return latlngs;
		},
	
		latLngToCoords: function (latlng) {
			var coords = [latlng.lng, latlng.lat];
	
			if (latlng.alt !== undefined) {
				coords.push(latlng.alt);
			}
			return coords;
		},
	
		latLngsToCoords: function (latLngs) {
			var coords = [];
	
			for (var i = 0, len = latLngs.length; i < len; i++) {
				coords.push(L.GeoJSON.latLngToCoords(latLngs[i]));
			}
	
			return coords;
		},
	
		getFeature: function (layer, newGeometry) {
			return layer.feature ? L.extend({}, layer.feature, {geometry: newGeometry}) : L.GeoJSON.asFeature(newGeometry);
		},
	
		asFeature: function (geoJSON) {
			if (geoJSON.type === 'Feature') {
				return geoJSON;
			}
	
			return {
				type: 'Feature',
				properties: {},
				geometry: geoJSON
			};
		}
	});
	
	var PointToGeoJSON = {
		toGeoJSON: function () {
			return L.GeoJSON.getFeature(this, {
				type: 'Point',
				coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
			});
		}
	};
	
	L.Marker.include(PointToGeoJSON);
	L.Circle.include(PointToGeoJSON);
	L.CircleMarker.include(PointToGeoJSON);
	
	L.Polyline.include({
		toGeoJSON: function () {
			return L.GeoJSON.getFeature(this, {
				type: 'LineString',
				coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs())
			});
		}
	});
	
	L.Polygon.include({
		toGeoJSON: function () {
			var coords = [L.GeoJSON.latLngsToCoords(this.getLatLngs())],
			    i, len, hole;
	
			coords[0].push(coords[0][0]);
	
			if (this._holes) {
				for (i = 0, len = this._holes.length; i < len; i++) {
					hole = L.GeoJSON.latLngsToCoords(this._holes[i]);
					hole.push(hole[0]);
					coords.push(hole);
				}
			}
	
			return L.GeoJSON.getFeature(this, {
				type: 'Polygon',
				coordinates: coords
			});
		}
	});
	
	(function () {
		function multiToGeoJSON(type) {
			return function () {
				var coords = [];
	
				this.eachLayer(function (layer) {
					coords.push(layer.toGeoJSON().geometry.coordinates);
				});
	
				return L.GeoJSON.getFeature(this, {
					type: type,
					coordinates: coords
				});
			};
		}
	
		L.MultiPolyline.include({toGeoJSON: multiToGeoJSON('MultiLineString')});
		L.MultiPolygon.include({toGeoJSON: multiToGeoJSON('MultiPolygon')});
	
		L.LayerGroup.include({
			toGeoJSON: function () {
	
				var geometry = this.feature && this.feature.geometry,
					jsons = [],
					json;
	
				if (geometry && geometry.type === 'MultiPoint') {
					return multiToGeoJSON('MultiPoint').call(this);
				}
	
				var isGeometryCollection = geometry && geometry.type === 'GeometryCollection';
	
				this.eachLayer(function (layer) {
					if (layer.toGeoJSON) {
						json = layer.toGeoJSON();
						jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
					}
				});
	
				if (isGeometryCollection) {
					return L.GeoJSON.getFeature(this, {
						geometries: jsons,
						type: 'GeometryCollection'
					});
				}
	
				return {
					type: 'FeatureCollection',
					features: jsons
				};
			}
		});
	}());
	
	L.geoJson = function (geojson, options) {
		return new L.GeoJSON(geojson, options);
	};
	
	
	/*
	 * L.DomEvent contains functions for working with DOM events.
	 */
	
	L.DomEvent = {
		/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
		addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])
	
			var id = L.stamp(fn),
			    key = '_leaflet_' + type + id,
			    handler, originalHandler, newType;
	
			if (obj[key]) { return this; }
	
			handler = function (e) {
				return fn.call(context || obj, e || L.DomEvent._getEvent());
			};
	
			if (L.Browser.pointer && type.indexOf('touch') === 0) {
				return this.addPointerListener(obj, type, handler, id);
			}
			if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
				this.addDoubleTapListener(obj, handler, id);
			}
	
			if ('addEventListener' in obj) {
	
				if (type === 'mousewheel') {
					obj.addEventListener('DOMMouseScroll', handler, false);
					obj.addEventListener(type, handler, false);
	
				} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
	
					originalHandler = handler;
					newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');
	
					handler = function (e) {
						if (!L.DomEvent._checkMouse(obj, e)) { return; }
						return originalHandler(e);
					};
	
					obj.addEventListener(newType, handler, false);
	
				} else if (type === 'click' && L.Browser.android) {
					originalHandler = handler;
					handler = function (e) {
						return L.DomEvent._filterClick(e, originalHandler);
					};
	
					obj.addEventListener(type, handler, false);
				} else {
					obj.addEventListener(type, handler, false);
				}
	
			} else if ('attachEvent' in obj) {
				obj.attachEvent('on' + type, handler);
			}
	
			obj[key] = handler;
	
			return this;
		},
	
		removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)
	
			var id = L.stamp(fn),
			    key = '_leaflet_' + type + id,
			    handler = obj[key];
	
			if (!handler) { return this; }
	
			if (L.Browser.pointer && type.indexOf('touch') === 0) {
				this.removePointerListener(obj, type, id);
			} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
				this.removeDoubleTapListener(obj, id);
	
			} else if ('removeEventListener' in obj) {
	
				if (type === 'mousewheel') {
					obj.removeEventListener('DOMMouseScroll', handler, false);
					obj.removeEventListener(type, handler, false);
	
				} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
					obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
				} else {
					obj.removeEventListener(type, handler, false);
				}
			} else if ('detachEvent' in obj) {
				obj.detachEvent('on' + type, handler);
			}
	
			obj[key] = null;
	
			return this;
		},
	
		stopPropagation: function (e) {
	
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			L.DomEvent._skipped(e);
	
			return this;
		},
	
		disableScrollPropagation: function (el) {
			var stop = L.DomEvent.stopPropagation;
	
			return L.DomEvent
				.on(el, 'mousewheel', stop)
				.on(el, 'MozMousePixelScroll', stop);
		},
	
		disableClickPropagation: function (el) {
			var stop = L.DomEvent.stopPropagation;
	
			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.on(el, L.Draggable.START[i], stop);
			}
	
			return L.DomEvent
				.on(el, 'click', L.DomEvent._fakeStop)
				.on(el, 'dblclick', stop);
		},
	
		preventDefault: function (e) {
	
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return this;
		},
	
		stop: function (e) {
			return L.DomEvent
				.preventDefault(e)
				.stopPropagation(e);
		},
	
		getMousePosition: function (e, container) {
			if (!container) {
				return new L.Point(e.clientX, e.clientY);
			}
	
			var rect = container.getBoundingClientRect();
	
			return new L.Point(
				e.clientX - rect.left - container.clientLeft,
				e.clientY - rect.top - container.clientTop);
		},
	
		getWheelDelta: function (e) {
	
			var delta = 0;
	
			if (e.wheelDelta) {
				delta = e.wheelDelta / 120;
			}
			if (e.detail) {
				delta = -e.detail / 3;
			}
			return delta;
		},
	
		_skipEvents: {},
	
		_fakeStop: function (e) {
			// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
			L.DomEvent._skipEvents[e.type] = true;
		},
	
		_skipped: function (e) {
			var skipped = this._skipEvents[e.type];
			// reset when checking, as it's only used in map container and propagates outside of the map
			this._skipEvents[e.type] = false;
			return skipped;
		},
	
		// check if element really left/entered the event target (for mouseenter/mouseleave)
		_checkMouse: function (el, e) {
	
			var related = e.relatedTarget;
	
			if (!related) { return true; }
	
			try {
				while (related && (related !== el)) {
					related = related.parentNode;
				}
			} catch (err) {
				return false;
			}
			return (related !== el);
		},
	
		_getEvent: function () { // evil magic for IE
			/*jshint noarg:false */
			var e = window.event;
			if (!e) {
				var caller = arguments.callee.caller;
				while (caller) {
					e = caller['arguments'][0];
					if (e && window.Event === e.constructor) {
						break;
					}
					caller = caller.caller;
				}
			}
			return e;
		},
	
		// this is a horrible workaround for a bug in Android where a single touch triggers two click events
		_filterClick: function (e, handler) {
			var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
				elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);
	
			// are they closer together than 500ms yet more than 100ms?
			// Android typically triggers them ~300ms apart while multiple listeners
			// on the same event should be triggered far faster;
			// or check if click is simulated on the element, and if it is, reject any non-simulated events
	
			if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
				L.DomEvent.stop(e);
				return;
			}
			L.DomEvent._lastClick = timeStamp;
	
			return handler(e);
		}
	};
	
	L.DomEvent.on = L.DomEvent.addListener;
	L.DomEvent.off = L.DomEvent.removeListener;
	
	
	/*
	 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
	 */
	
	L.Draggable = L.Class.extend({
		includes: L.Mixin.Events,
	
		statics: {
			START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
			END: {
				mousedown: 'mouseup',
				touchstart: 'touchend',
				pointerdown: 'touchend',
				MSPointerDown: 'touchend'
			},
			MOVE: {
				mousedown: 'mousemove',
				touchstart: 'touchmove',
				pointerdown: 'touchmove',
				MSPointerDown: 'touchmove'
			}
		},
	
		initialize: function (element, dragStartTarget) {
			this._element = element;
			this._dragStartTarget = dragStartTarget || element;
		},
	
		enable: function () {
			if (this._enabled) { return; }
	
			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.on(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
			}
	
			this._enabled = true;
		},
	
		disable: function () {
			if (!this._enabled) { return; }
	
			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.off(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
			}
	
			this._enabled = false;
			this._moved = false;
		},
	
		_onDown: function (e) {
			this._moved = false;
	
			if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
	
			L.DomEvent.stopPropagation(e);
	
			if (L.Draggable._disabled) { return; }
	
			L.DomUtil.disableImageDrag();
			L.DomUtil.disableTextSelection();
	
			if (this._moving) { return; }
	
			var first = e.touches ? e.touches[0] : e;
	
			this._startPoint = new L.Point(first.clientX, first.clientY);
			this._startPos = this._newPos = L.DomUtil.getPosition(this._element);
	
			L.DomEvent
			    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
			    .on(document, L.Draggable.END[e.type], this._onUp, this);
		},
	
		_onMove: function (e) {
			if (e.touches && e.touches.length > 1) {
				this._moved = true;
				return;
			}
	
			var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			    newPoint = new L.Point(first.clientX, first.clientY),
			    offset = newPoint.subtract(this._startPoint);
	
			if (!offset.x && !offset.y) { return; }
			if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }
	
			L.DomEvent.preventDefault(e);
	
			if (!this._moved) {
				this.fire('dragstart');
	
				this._moved = true;
				this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);
	
				L.DomUtil.addClass(document.body, 'leaflet-dragging');
				this._lastTarget = e.target || e.srcElement;
				L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
			}
	
			this._newPos = this._startPos.add(offset);
			this._moving = true;
	
			L.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
		},
	
		_updatePosition: function () {
			this.fire('predrag');
			L.DomUtil.setPosition(this._element, this._newPos);
			this.fire('drag');
		},
	
		_onUp: function () {
			L.DomUtil.removeClass(document.body, 'leaflet-dragging');
	
			if (this._lastTarget) {
				L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
				this._lastTarget = null;
			}
	
			for (var i in L.Draggable.MOVE) {
				L.DomEvent
				    .off(document, L.Draggable.MOVE[i], this._onMove)
				    .off(document, L.Draggable.END[i], this._onUp);
			}
	
			L.DomUtil.enableImageDrag();
			L.DomUtil.enableTextSelection();
	
			if (this._moved && this._moving) {
				// ensure drag is not fired after dragend
				L.Util.cancelAnimFrame(this._animRequest);
	
				this.fire('dragend', {
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
	
			this._moving = false;
		}
	});
	
	
	/*
		L.Handler is a base class for handler classes that are used internally to inject
		interaction features like dragging to classes like Map and Marker.
	*/
	
	L.Handler = L.Class.extend({
		initialize: function (map) {
			this._map = map;
		},
	
		enable: function () {
			if (this._enabled) { return; }
	
			this._enabled = true;
			this.addHooks();
		},
	
		disable: function () {
			if (!this._enabled) { return; }
	
			this._enabled = false;
			this.removeHooks();
		},
	
		enabled: function () {
			return !!this._enabled;
		}
	});
	
	
	/*
	 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
	 */
	
	L.Map.mergeOptions({
		dragging: true,
	
		inertia: !L.Browser.android23,
		inertiaDeceleration: 3400, // px/s^2
		inertiaMaxSpeed: Infinity, // px/s
		inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
		easeLinearity: 0.25,
	
		// TODO refactor, move to CRS
		worldCopyJump: false
	});
	
	L.Map.Drag = L.Handler.extend({
		addHooks: function () {
			if (!this._draggable) {
				var map = this._map;
	
				this._draggable = new L.Draggable(map._mapPane, map._container);
	
				this._draggable.on({
					'dragstart': this._onDragStart,
					'drag': this._onDrag,
					'dragend': this._onDragEnd
				}, this);
	
				if (map.options.worldCopyJump) {
					this._draggable.on('predrag', this._onPreDrag, this);
					map.on('viewreset', this._onViewReset, this);
	
					map.whenReady(this._onViewReset, this);
				}
			}
			this._draggable.enable();
		},
	
		removeHooks: function () {
			this._draggable.disable();
		},
	
		moved: function () {
			return this._draggable && this._draggable._moved;
		},
	
		_onDragStart: function () {
			var map = this._map;
	
			if (map._panAnim) {
				map._panAnim.stop();
			}
	
			map
			    .fire('movestart')
			    .fire('dragstart');
	
			if (map.options.inertia) {
				this._positions = [];
				this._times = [];
			}
		},
	
		_onDrag: function () {
			if (this._map.options.inertia) {
				var time = this._lastTime = +new Date(),
				    pos = this._lastPos = this._draggable._newPos;
	
				this._positions.push(pos);
				this._times.push(time);
	
				if (time - this._times[0] > 200) {
					this._positions.shift();
					this._times.shift();
				}
			}
	
			this._map
			    .fire('move')
			    .fire('drag');
		},
	
		_onViewReset: function () {
			// TODO fix hardcoded Earth values
			var pxCenter = this._map.getSize()._divideBy(2),
			    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
	
			this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
			this._worldWidth = this._map.project([0, 180]).x;
		},
	
		_onPreDrag: function () {
			// TODO refactor to be able to adjust map pane position after zoom
			var worldWidth = this._worldWidth,
			    halfWidth = Math.round(worldWidth / 2),
			    dx = this._initialWorldOffset,
			    x = this._draggable._newPos.x,
			    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
			    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
			    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
	
			this._draggable._newPos.x = newX;
		},
	
		_onDragEnd: function (e) {
			var map = this._map,
			    options = map.options,
			    delay = +new Date() - this._lastTime,
	
			    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];
	
			map.fire('dragend', e);
	
			if (noInertia) {
				map.fire('moveend');
	
			} else {
	
				var direction = this._lastPos.subtract(this._positions[0]),
				    duration = (this._lastTime + delay - this._times[0]) / 1000,
				    ease = options.easeLinearity,
	
				    speedVector = direction.multiplyBy(ease / duration),
				    speed = speedVector.distanceTo([0, 0]),
	
				    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
				    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),
	
				    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
				    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
	
				if (!offset.x || !offset.y) {
					map.fire('moveend');
	
				} else {
					offset = map._limitOffset(offset, map.options.maxBounds);
	
					L.Util.requestAnimFrame(function () {
						map.panBy(offset, {
							duration: decelerationDuration,
							easeLinearity: ease,
							noMoveStart: true
						});
					});
				}
			}
		}
	});
	
	L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);
	
	
	/*
	 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
	 */
	
	L.Map.mergeOptions({
		doubleClickZoom: true
	});
	
	L.Map.DoubleClickZoom = L.Handler.extend({
		addHooks: function () {
			this._map.on('dblclick', this._onDoubleClick, this);
		},
	
		removeHooks: function () {
			this._map.off('dblclick', this._onDoubleClick, this);
		},
	
		_onDoubleClick: function (e) {
			var map = this._map,
			    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);
	
			if (map.options.doubleClickZoom === 'center') {
				map.setZoom(zoom);
			} else {
				map.setZoomAround(e.containerPoint, zoom);
			}
		}
	});
	
	L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);
	
	
	/*
	 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
	 */
	
	L.Map.mergeOptions({
		scrollWheelZoom: true
	});
	
	L.Map.ScrollWheelZoom = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
			L.DomEvent.on(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
			this._delta = 0;
		},
	
		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
			L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
		},
	
		_onWheelScroll: function (e) {
			var delta = L.DomEvent.getWheelDelta(e);
	
			this._delta += delta;
			this._lastMousePos = this._map.mouseEventToContainerPoint(e);
	
			if (!this._startTime) {
				this._startTime = +new Date();
			}
	
			var left = Math.max(40 - (+new Date() - this._startTime), 0);
	
			clearTimeout(this._timer);
			this._timer = setTimeout(L.bind(this._performZoom, this), left);
	
			L.DomEvent.preventDefault(e);
			L.DomEvent.stopPropagation(e);
		},
	
		_performZoom: function () {
			var map = this._map,
			    delta = this._delta,
			    zoom = map.getZoom();
	
			delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
			delta = Math.max(Math.min(delta, 4), -4);
			delta = map._limitZoom(zoom + delta) - zoom;
	
			this._delta = 0;
			this._startTime = null;
	
			if (!delta) { return; }
	
			if (map.options.scrollWheelZoom === 'center') {
				map.setZoom(zoom + delta);
			} else {
				map.setZoomAround(this._lastMousePos, zoom + delta);
			}
		}
	});
	
	L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);
	
	
	/*
	 * Extends the event handling code with double tap support for mobile browsers.
	 */
	
	L.extend(L.DomEvent, {
	
		_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
		_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',
	
		// inspired by Zepto touch code by Thomas Fuchs
		addDoubleTapListener: function (obj, handler, id) {
			var last,
			    doubleTap = false,
			    delay = 250,
			    touch,
			    pre = '_leaflet_',
			    touchstart = this._touchstart,
			    touchend = this._touchend,
			    trackedTouches = [];
	
			function onTouchStart(e) {
				var count;
	
				if (L.Browser.pointer) {
					trackedTouches.push(e.pointerId);
					count = trackedTouches.length;
				} else {
					count = e.touches.length;
				}
				if (count > 1) {
					return;
				}
	
				var now = Date.now(),
					delta = now - (last || now);
	
				touch = e.touches ? e.touches[0] : e;
				doubleTap = (delta > 0 && delta <= delay);
				last = now;
			}
	
			function onTouchEnd(e) {
				if (L.Browser.pointer) {
					var idx = trackedTouches.indexOf(e.pointerId);
					if (idx === -1) {
						return;
					}
					trackedTouches.splice(idx, 1);
				}
	
				if (doubleTap) {
					if (L.Browser.pointer) {
						// work around .type being readonly with MSPointer* events
						var newTouch = { },
							prop;
	
						// jshint forin:false
						for (var i in touch) {
							prop = touch[i];
							if (typeof prop === 'function') {
								newTouch[i] = prop.bind(touch);
							} else {
								newTouch[i] = prop;
							}
						}
						touch = newTouch;
					}
					touch.type = 'dblclick';
					handler(touch);
					last = null;
				}
			}
			obj[pre + touchstart + id] = onTouchStart;
			obj[pre + touchend + id] = onTouchEnd;
	
			// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
			// will not come through to us, so we will lose track of how many touches are ongoing
			var endElement = L.Browser.pointer ? document.documentElement : obj;
	
			obj.addEventListener(touchstart, onTouchStart, false);
			endElement.addEventListener(touchend, onTouchEnd, false);
	
			if (L.Browser.pointer) {
				endElement.addEventListener(L.DomEvent.POINTER_CANCEL, onTouchEnd, false);
			}
	
			return this;
		},
	
		removeDoubleTapListener: function (obj, id) {
			var pre = '_leaflet_';
	
			obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
			(L.Browser.pointer ? document.documentElement : obj).removeEventListener(
			        this._touchend, obj[pre + this._touchend + id], false);
	
			if (L.Browser.pointer) {
				document.documentElement.removeEventListener(L.DomEvent.POINTER_CANCEL, obj[pre + this._touchend + id],
					false);
			}
	
			return this;
		}
	});
	
	
	/*
	 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
	 */
	
	L.extend(L.DomEvent, {
	
		//static
		POINTER_DOWN: L.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
		POINTER_MOVE: L.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
		POINTER_UP: L.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
		POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',
	
		_pointers: [],
		_pointerDocumentListener: false,
	
		// Provides a touch events wrapper for (ms)pointer events.
		// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019
		//ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890
	
		addPointerListener: function (obj, type, handler, id) {
	
			switch (type) {
			case 'touchstart':
				return this.addPointerListenerStart(obj, type, handler, id);
			case 'touchend':
				return this.addPointerListenerEnd(obj, type, handler, id);
			case 'touchmove':
				return this.addPointerListenerMove(obj, type, handler, id);
			default:
				throw 'Unknown touch event type';
			}
		},
	
		addPointerListenerStart: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    pointers = this._pointers;
	
			var cb = function (e) {
				if (e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
					L.DomEvent.preventDefault(e);
				}
	
				var alreadyInArray = false;
				for (var i = 0; i < pointers.length; i++) {
					if (pointers[i].pointerId === e.pointerId) {
						alreadyInArray = true;
						break;
					}
				}
				if (!alreadyInArray) {
					pointers.push(e);
				}
	
				e.touches = pointers.slice();
				e.changedTouches = [e];
	
				handler(e);
			};
	
			obj[pre + 'touchstart' + id] = cb;
			obj.addEventListener(this.POINTER_DOWN, cb, false);
	
			// need to also listen for end events to keep the _pointers list accurate
			// this needs to be on the body and never go away
			if (!this._pointerDocumentListener) {
				var internalCb = function (e) {
					for (var i = 0; i < pointers.length; i++) {
						if (pointers[i].pointerId === e.pointerId) {
							pointers.splice(i, 1);
							break;
						}
					}
				};
				//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
				document.documentElement.addEventListener(this.POINTER_UP, internalCb, false);
				document.documentElement.addEventListener(this.POINTER_CANCEL, internalCb, false);
	
				this._pointerDocumentListener = true;
			}
	
			return this;
		},
	
		addPointerListenerMove: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    touches = this._pointers;
	
			function cb(e) {
	
				// don't fire touch moves when mouse isn't down
				if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }
	
				for (var i = 0; i < touches.length; i++) {
					if (touches[i].pointerId === e.pointerId) {
						touches[i] = e;
						break;
					}
				}
	
				e.touches = touches.slice();
				e.changedTouches = [e];
	
				handler(e);
			}
	
			obj[pre + 'touchmove' + id] = cb;
			obj.addEventListener(this.POINTER_MOVE, cb, false);
	
			return this;
		},
	
		addPointerListenerEnd: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    touches = this._pointers;
	
			var cb = function (e) {
				for (var i = 0; i < touches.length; i++) {
					if (touches[i].pointerId === e.pointerId) {
						touches.splice(i, 1);
						break;
					}
				}
	
				e.touches = touches.slice();
				e.changedTouches = [e];
	
				handler(e);
			};
	
			obj[pre + 'touchend' + id] = cb;
			obj.addEventListener(this.POINTER_UP, cb, false);
			obj.addEventListener(this.POINTER_CANCEL, cb, false);
	
			return this;
		},
	
		removePointerListener: function (obj, type, id) {
			var pre = '_leaflet_',
			    cb = obj[pre + type + id];
	
			switch (type) {
			case 'touchstart':
				obj.removeEventListener(this.POINTER_DOWN, cb, false);
				break;
			case 'touchmove':
				obj.removeEventListener(this.POINTER_MOVE, cb, false);
				break;
			case 'touchend':
				obj.removeEventListener(this.POINTER_UP, cb, false);
				obj.removeEventListener(this.POINTER_CANCEL, cb, false);
				break;
			}
	
			return this;
		}
	});
	
	
	/*
	 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
	 */
	
	L.Map.mergeOptions({
		touchZoom: L.Browser.touch && !L.Browser.android23,
		bounceAtZoomLimits: true
	});
	
	L.Map.TouchZoom = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
		},
	
		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
		},
	
		_onTouchStart: function (e) {
			var map = this._map;
	
			if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }
	
			var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			    p2 = map.mouseEventToLayerPoint(e.touches[1]),
			    viewCenter = map._getCenterLayerPoint();
	
			this._startCenter = p1.add(p2)._divideBy(2);
			this._startDist = p1.distanceTo(p2);
	
			this._moved = false;
			this._zooming = true;
	
			this._centerOffset = viewCenter.subtract(this._startCenter);
	
			if (map._panAnim) {
				map._panAnim.stop();
			}
	
			L.DomEvent
			    .on(document, 'touchmove', this._onTouchMove, this)
			    .on(document, 'touchend', this._onTouchEnd, this);
	
			L.DomEvent.preventDefault(e);
		},
	
		_onTouchMove: function (e) {
			var map = this._map;
	
			if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }
	
			var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			    p2 = map.mouseEventToLayerPoint(e.touches[1]);
	
			this._scale = p1.distanceTo(p2) / this._startDist;
			this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);
	
			if (this._scale === 1) { return; }
	
			if (!map.options.bounceAtZoomLimits) {
				if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
				    (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
			}
	
			if (!this._moved) {
				L.DomUtil.addClass(map._mapPane, 'leaflet-touching');
	
				map
				    .fire('movestart')
				    .fire('zoomstart');
	
				this._moved = true;
			}
	
			L.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = L.Util.requestAnimFrame(
			        this._updateOnMove, this, true, this._map._container);
	
			L.DomEvent.preventDefault(e);
		},
	
		_updateOnMove: function () {
			var map = this._map,
			    origin = this._getScaleOrigin(),
			    center = map.layerPointToLatLng(origin),
			    zoom = map.getScaleZoom(this._scale);
	
			map._animateZoom(center, zoom, this._startCenter, this._scale, this._delta, false, true);
		},
	
		_onTouchEnd: function () {
			if (!this._moved || !this._zooming) {
				this._zooming = false;
				return;
			}
	
			var map = this._map;
	
			this._zooming = false;
			L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');
			L.Util.cancelAnimFrame(this._animRequest);
	
			L.DomEvent
			    .off(document, 'touchmove', this._onTouchMove)
			    .off(document, 'touchend', this._onTouchEnd);
	
			var origin = this._getScaleOrigin(),
			    center = map.layerPointToLatLng(origin),
	
			    oldZoom = map.getZoom(),
			    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
			    roundZoomDelta = (floatZoomDelta > 0 ?
			            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),
	
			    zoom = map._limitZoom(oldZoom + roundZoomDelta),
			    scale = map.getZoomScale(zoom) / this._scale;
	
			map._animateZoom(center, zoom, origin, scale);
		},
	
		_getScaleOrigin: function () {
			var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
			return this._startCenter.add(centerOffset);
		}
	});
	
	L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);
	
	
	/*
	 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
	 */
	
	L.Map.mergeOptions({
		tap: true,
		tapTolerance: 15
	});
	
	L.Map.Tap = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
		},
	
		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
		},
	
		_onDown: function (e) {
			if (!e.touches) { return; }
	
			L.DomEvent.preventDefault(e);
	
			this._fireClick = true;
	
			// don't simulate click or track longpress if more than 1 touch
			if (e.touches.length > 1) {
				this._fireClick = false;
				clearTimeout(this._holdTimeout);
				return;
			}
	
			var first = e.touches[0],
			    el = first.target;
	
			this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);
	
			// if touching a link, highlight it
			if (el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.addClass(el, 'leaflet-active');
			}
	
			// simulate long hold but setting a timeout
			this._holdTimeout = setTimeout(L.bind(function () {
				if (this._isTapValid()) {
					this._fireClick = false;
					this._onUp();
					this._simulateEvent('contextmenu', first);
				}
			}, this), 1000);
	
			L.DomEvent
				.on(document, 'touchmove', this._onMove, this)
				.on(document, 'touchend', this._onUp, this);
		},
	
		_onUp: function (e) {
			clearTimeout(this._holdTimeout);
	
			L.DomEvent
				.off(document, 'touchmove', this._onMove, this)
				.off(document, 'touchend', this._onUp, this);
	
			if (this._fireClick && e && e.changedTouches) {
	
				var first = e.changedTouches[0],
				    el = first.target;
	
				if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
					L.DomUtil.removeClass(el, 'leaflet-active');
				}
	
				// simulate click if the touch didn't move too much
				if (this._isTapValid()) {
					this._simulateEvent('click', first);
				}
			}
		},
	
		_isTapValid: function () {
			return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
		},
	
		_onMove: function (e) {
			var first = e.touches[0];
			this._newPos = new L.Point(first.clientX, first.clientY);
		},
	
		_simulateEvent: function (type, e) {
			var simulatedEvent = document.createEvent('MouseEvents');
	
			simulatedEvent._simulated = true;
			e.target._simulatedClick = true;
	
			simulatedEvent.initMouseEvent(
			        type, true, true, window, 1,
			        e.screenX, e.screenY,
			        e.clientX, e.clientY,
			        false, false, false, false, 0, null);
	
			e.target.dispatchEvent(simulatedEvent);
		}
	});
	
	if (L.Browser.touch && !L.Browser.pointer) {
		L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
	}
	
	
	/*
	 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
	  * (zoom to a selected bounding box), enabled by default.
	 */
	
	L.Map.mergeOptions({
		boxZoom: true
	});
	
	L.Map.BoxZoom = L.Handler.extend({
		initialize: function (map) {
			this._map = map;
			this._container = map._container;
			this._pane = map._panes.overlayPane;
			this._moved = false;
		},
	
		addHooks: function () {
			L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
		},
	
		removeHooks: function () {
			L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
			this._moved = false;
		},
	
		moved: function () {
			return this._moved;
		},
	
		_onMouseDown: function (e) {
			this._moved = false;
	
			if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }
	
			L.DomUtil.disableTextSelection();
			L.DomUtil.disableImageDrag();
	
			this._startLayerPoint = this._map.mouseEventToLayerPoint(e);
	
			L.DomEvent
			    .on(document, 'mousemove', this._onMouseMove, this)
			    .on(document, 'mouseup', this._onMouseUp, this)
			    .on(document, 'keydown', this._onKeyDown, this);
		},
	
		_onMouseMove: function (e) {
			if (!this._moved) {
				this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
				L.DomUtil.setPosition(this._box, this._startLayerPoint);
	
				//TODO refactor: move cursor to styles
				this._container.style.cursor = 'crosshair';
				this._map.fire('boxzoomstart');
			}
	
			var startPoint = this._startLayerPoint,
			    box = this._box,
	
			    layerPoint = this._map.mouseEventToLayerPoint(e),
			    offset = layerPoint.subtract(startPoint),
	
			    newPos = new L.Point(
			        Math.min(layerPoint.x, startPoint.x),
			        Math.min(layerPoint.y, startPoint.y));
	
			L.DomUtil.setPosition(box, newPos);
	
			this._moved = true;
	
			// TODO refactor: remove hardcoded 4 pixels
			box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
			box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
		},
	
		_finish: function () {
			if (this._moved) {
				this._pane.removeChild(this._box);
				this._container.style.cursor = '';
			}
	
			L.DomUtil.enableTextSelection();
			L.DomUtil.enableImageDrag();
	
			L.DomEvent
			    .off(document, 'mousemove', this._onMouseMove)
			    .off(document, 'mouseup', this._onMouseUp)
			    .off(document, 'keydown', this._onKeyDown);
		},
	
		_onMouseUp: function (e) {
	
			this._finish();
	
			var map = this._map,
			    layerPoint = map.mouseEventToLayerPoint(e);
	
			if (this._startLayerPoint.equals(layerPoint)) { return; }
	
			var bounds = new L.LatLngBounds(
			        map.layerPointToLatLng(this._startLayerPoint),
			        map.layerPointToLatLng(layerPoint));
	
			map.fitBounds(bounds);
	
			map.fire('boxzoomend', {
				boxZoomBounds: bounds
			});
		},
	
		_onKeyDown: function (e) {
			if (e.keyCode === 27) {
				this._finish();
			}
		}
	});
	
	L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);
	
	
	/*
	 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
	 */
	
	L.Map.mergeOptions({
		keyboard: true,
		keyboardPanOffset: 80,
		keyboardZoomOffset: 1
	});
	
	L.Map.Keyboard = L.Handler.extend({
	
		keyCodes: {
			left:    [37],
			right:   [39],
			down:    [40],
			up:      [38],
			zoomIn:  [187, 107, 61, 171],
			zoomOut: [189, 109, 173]
		},
	
		initialize: function (map) {
			this._map = map;
	
			this._setPanOffset(map.options.keyboardPanOffset);
			this._setZoomOffset(map.options.keyboardZoomOffset);
		},
	
		addHooks: function () {
			var container = this._map._container;
	
			// make the container focusable by tabbing
			if (container.tabIndex === -1) {
				container.tabIndex = '0';
			}
	
			L.DomEvent
			    .on(container, 'focus', this._onFocus, this)
			    .on(container, 'blur', this._onBlur, this)
			    .on(container, 'mousedown', this._onMouseDown, this);
	
			this._map
			    .on('focus', this._addHooks, this)
			    .on('blur', this._removeHooks, this);
		},
	
		removeHooks: function () {
			this._removeHooks();
	
			var container = this._map._container;
	
			L.DomEvent
			    .off(container, 'focus', this._onFocus, this)
			    .off(container, 'blur', this._onBlur, this)
			    .off(container, 'mousedown', this._onMouseDown, this);
	
			this._map
			    .off('focus', this._addHooks, this)
			    .off('blur', this._removeHooks, this);
		},
	
		_onMouseDown: function () {
			if (this._focused) { return; }
	
			var body = document.body,
			    docEl = document.documentElement,
			    top = body.scrollTop || docEl.scrollTop,
			    left = body.scrollLeft || docEl.scrollLeft;
	
			this._map._container.focus();
	
			window.scrollTo(left, top);
		},
	
		_onFocus: function () {
			this._focused = true;
			this._map.fire('focus');
		},
	
		_onBlur: function () {
			this._focused = false;
			this._map.fire('blur');
		},
	
		_setPanOffset: function (pan) {
			var keys = this._panKeys = {},
			    codes = this.keyCodes,
			    i, len;
	
			for (i = 0, len = codes.left.length; i < len; i++) {
				keys[codes.left[i]] = [-1 * pan, 0];
			}
			for (i = 0, len = codes.right.length; i < len; i++) {
				keys[codes.right[i]] = [pan, 0];
			}
			for (i = 0, len = codes.down.length; i < len; i++) {
				keys[codes.down[i]] = [0, pan];
			}
			for (i = 0, len = codes.up.length; i < len; i++) {
				keys[codes.up[i]] = [0, -1 * pan];
			}
		},
	
		_setZoomOffset: function (zoom) {
			var keys = this._zoomKeys = {},
			    codes = this.keyCodes,
			    i, len;
	
			for (i = 0, len = codes.zoomIn.length; i < len; i++) {
				keys[codes.zoomIn[i]] = zoom;
			}
			for (i = 0, len = codes.zoomOut.length; i < len; i++) {
				keys[codes.zoomOut[i]] = -zoom;
			}
		},
	
		_addHooks: function () {
			L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
		},
	
		_removeHooks: function () {
			L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
		},
	
		_onKeyDown: function (e) {
			var key = e.keyCode,
			    map = this._map;
	
			if (key in this._panKeys) {
	
				if (map._panAnim && map._panAnim._inProgress) { return; }
	
				map.panBy(this._panKeys[key]);
	
				if (map.options.maxBounds) {
					map.panInsideBounds(map.options.maxBounds);
				}
	
			} else if (key in this._zoomKeys) {
				map.setZoom(map.getZoom() + this._zoomKeys[key]);
	
			} else {
				return;
			}
	
			L.DomEvent.stop(e);
		}
	});
	
	L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);
	
	
	/*
	 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
	 */
	
	L.Handler.MarkerDrag = L.Handler.extend({
		initialize: function (marker) {
			this._marker = marker;
		},
	
		addHooks: function () {
			var icon = this._marker._icon;
			if (!this._draggable) {
				this._draggable = new L.Draggable(icon, icon);
			}
	
			this._draggable
				.on('dragstart', this._onDragStart, this)
				.on('drag', this._onDrag, this)
				.on('dragend', this._onDragEnd, this);
			this._draggable.enable();
			L.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable');
		},
	
		removeHooks: function () {
			this._draggable
				.off('dragstart', this._onDragStart, this)
				.off('drag', this._onDrag, this)
				.off('dragend', this._onDragEnd, this);
	
			this._draggable.disable();
			L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
		},
	
		moved: function () {
			return this._draggable && this._draggable._moved;
		},
	
		_onDragStart: function () {
			this._marker
			    .closePopup()
			    .fire('movestart')
			    .fire('dragstart');
		},
	
		_onDrag: function () {
			var marker = this._marker,
			    shadow = marker._shadow,
			    iconPos = L.DomUtil.getPosition(marker._icon),
			    latlng = marker._map.layerPointToLatLng(iconPos);
	
			// update shadow position
			if (shadow) {
				L.DomUtil.setPosition(shadow, iconPos);
			}
	
			marker._latlng = latlng;
	
			marker
			    .fire('move', {latlng: latlng})
			    .fire('drag');
		},
	
		_onDragEnd: function (e) {
			this._marker
			    .fire('moveend')
			    .fire('dragend', e);
		}
	});
	
	
	/*
	 * L.Control is a base class for implementing map controls. Handles positioning.
	 * All other controls extend from this class.
	 */
	
	L.Control = L.Class.extend({
		options: {
			position: 'topright'
		},
	
		initialize: function (options) {
			L.setOptions(this, options);
		},
	
		getPosition: function () {
			return this.options.position;
		},
	
		setPosition: function (position) {
			var map = this._map;
	
			if (map) {
				map.removeControl(this);
			}
	
			this.options.position = position;
	
			if (map) {
				map.addControl(this);
			}
	
			return this;
		},
	
		getContainer: function () {
			return this._container;
		},
	
		addTo: function (map) {
			this._map = map;
	
			var container = this._container = this.onAdd(map),
			    pos = this.getPosition(),
			    corner = map._controlCorners[pos];
	
			L.DomUtil.addClass(container, 'leaflet-control');
	
			if (pos.indexOf('bottom') !== -1) {
				corner.insertBefore(container, corner.firstChild);
			} else {
				corner.appendChild(container);
			}
	
			return this;
		},
	
		removeFrom: function (map) {
			var pos = this.getPosition(),
			    corner = map._controlCorners[pos];
	
			corner.removeChild(this._container);
			this._map = null;
	
			if (this.onRemove) {
				this.onRemove(map);
			}
	
			return this;
		},
	
		_refocusOnMap: function () {
			if (this._map) {
				this._map.getContainer().focus();
			}
		}
	});
	
	L.control = function (options) {
		return new L.Control(options);
	};
	
	
	// adds control-related methods to L.Map
	
	L.Map.include({
		addControl: function (control) {
			control.addTo(this);
			return this;
		},
	
		removeControl: function (control) {
			control.removeFrom(this);
			return this;
		},
	
		_initControlPos: function () {
			var corners = this._controlCorners = {},
			    l = 'leaflet-',
			    container = this._controlContainer =
			            L.DomUtil.create('div', l + 'control-container', this._container);
	
			function createCorner(vSide, hSide) {
				var className = l + vSide + ' ' + l + hSide;
	
				corners[vSide + hSide] = L.DomUtil.create('div', className, container);
			}
	
			createCorner('top', 'left');
			createCorner('top', 'right');
			createCorner('bottom', 'left');
			createCorner('bottom', 'right');
		},
	
		_clearControlPos: function () {
			this._container.removeChild(this._controlContainer);
		}
	});
	
	
	/*
	 * L.Control.Zoom is used for the default zoom buttons on the map.
	 */
	
	L.Control.Zoom = L.Control.extend({
		options: {
			position: 'topleft',
			zoomInText: '+',
			zoomInTitle: 'Zoom in',
			zoomOutText: '-',
			zoomOutTitle: 'Zoom out'
		},
	
		onAdd: function (map) {
			var zoomName = 'leaflet-control-zoom',
			    container = L.DomUtil.create('div', zoomName + ' leaflet-bar');
	
			this._map = map;
	
			this._zoomInButton  = this._createButton(
			        this.options.zoomInText, this.options.zoomInTitle,
			        zoomName + '-in',  container, this._zoomIn,  this);
			this._zoomOutButton = this._createButton(
			        this.options.zoomOutText, this.options.zoomOutTitle,
			        zoomName + '-out', container, this._zoomOut, this);
	
			this._updateDisabled();
			map.on('zoomend zoomlevelschange', this._updateDisabled, this);
	
			return container;
		},
	
		onRemove: function (map) {
			map.off('zoomend zoomlevelschange', this._updateDisabled, this);
		},
	
		_zoomIn: function (e) {
			this._map.zoomIn(e.shiftKey ? 3 : 1);
		},
	
		_zoomOut: function (e) {
			this._map.zoomOut(e.shiftKey ? 3 : 1);
		},
	
		_createButton: function (html, title, className, container, fn, context) {
			var link = L.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;
	
			var stop = L.DomEvent.stopPropagation;
	
			L.DomEvent
			    .on(link, 'click', stop)
			    .on(link, 'mousedown', stop)
			    .on(link, 'dblclick', stop)
			    .on(link, 'click', L.DomEvent.preventDefault)
			    .on(link, 'click', fn, context)
			    .on(link, 'click', this._refocusOnMap, context);
	
			return link;
		},
	
		_updateDisabled: function () {
			var map = this._map,
				className = 'leaflet-disabled';
	
			L.DomUtil.removeClass(this._zoomInButton, className);
			L.DomUtil.removeClass(this._zoomOutButton, className);
	
			if (map._zoom === map.getMinZoom()) {
				L.DomUtil.addClass(this._zoomOutButton, className);
			}
			if (map._zoom === map.getMaxZoom()) {
				L.DomUtil.addClass(this._zoomInButton, className);
			}
		}
	});
	
	L.Map.mergeOptions({
		zoomControl: true
	});
	
	L.Map.addInitHook(function () {
		if (this.options.zoomControl) {
			this.zoomControl = new L.Control.Zoom();
			this.addControl(this.zoomControl);
		}
	});
	
	L.control.zoom = function (options) {
		return new L.Control.Zoom(options);
	};
	
	
	
	/*
	 * L.Control.Attribution is used for displaying attribution on the map (added by default).
	 */
	
	L.Control.Attribution = L.Control.extend({
		options: {
			position: 'bottomright',
			prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
		},
	
		initialize: function (options) {
			L.setOptions(this, options);
	
			this._attributions = {};
		},
	
		onAdd: function (map) {
			this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
			L.DomEvent.disableClickPropagation(this._container);
	
			for (var i in map._layers) {
				if (map._layers[i].getAttribution) {
					this.addAttribution(map._layers[i].getAttribution());
				}
			}
			
			map
			    .on('layeradd', this._onLayerAdd, this)
			    .on('layerremove', this._onLayerRemove, this);
	
			this._update();
	
			return this._container;
		},
	
		onRemove: function (map) {
			map
			    .off('layeradd', this._onLayerAdd)
			    .off('layerremove', this._onLayerRemove);
	
		},
	
		setPrefix: function (prefix) {
			this.options.prefix = prefix;
			this._update();
			return this;
		},
	
		addAttribution: function (text) {
			if (!text) { return; }
	
			if (!this._attributions[text]) {
				this._attributions[text] = 0;
			}
			this._attributions[text]++;
	
			this._update();
	
			return this;
		},
	
		removeAttribution: function (text) {
			if (!text) { return; }
	
			if (this._attributions[text]) {
				this._attributions[text]--;
				this._update();
			}
	
			return this;
		},
	
		_update: function () {
			if (!this._map) { return; }
	
			var attribs = [];
	
			for (var i in this._attributions) {
				if (this._attributions[i]) {
					attribs.push(i);
				}
			}
	
			var prefixAndAttribs = [];
	
			if (this.options.prefix) {
				prefixAndAttribs.push(this.options.prefix);
			}
			if (attribs.length) {
				prefixAndAttribs.push(attribs.join(', '));
			}
	
			this._container.innerHTML = prefixAndAttribs.join(' | ');
		},
	
		_onLayerAdd: function (e) {
			if (e.layer.getAttribution) {
				this.addAttribution(e.layer.getAttribution());
			}
		},
	
		_onLayerRemove: function (e) {
			if (e.layer.getAttribution) {
				this.removeAttribution(e.layer.getAttribution());
			}
		}
	});
	
	L.Map.mergeOptions({
		attributionControl: true
	});
	
	L.Map.addInitHook(function () {
		if (this.options.attributionControl) {
			this.attributionControl = (new L.Control.Attribution()).addTo(this);
		}
	});
	
	L.control.attribution = function (options) {
		return new L.Control.Attribution(options);
	};
	
	
	/*
	 * L.Control.Scale is used for displaying metric/imperial scale on the map.
	 */
	
	L.Control.Scale = L.Control.extend({
		options: {
			position: 'bottomleft',
			maxWidth: 100,
			metric: true,
			imperial: true,
			updateWhenIdle: false
		},
	
		onAdd: function (map) {
			this._map = map;
	
			var className = 'leaflet-control-scale',
			    container = L.DomUtil.create('div', className),
			    options = this.options;
	
			this._addScales(options, className, container);
	
			map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
			map.whenReady(this._update, this);
	
			return container;
		},
	
		onRemove: function (map) {
			map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		},
	
		_addScales: function (options, className, container) {
			if (options.metric) {
				this._mScale = L.DomUtil.create('div', className + '-line', container);
			}
			if (options.imperial) {
				this._iScale = L.DomUtil.create('div', className + '-line', container);
			}
		},
	
		_update: function () {
			var bounds = this._map.getBounds(),
			    centerLat = bounds.getCenter().lat,
			    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
			    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,
	
			    size = this._map.getSize(),
			    options = this.options,
			    maxMeters = 0;
	
			if (size.x > 0) {
				maxMeters = dist * (options.maxWidth / size.x);
			}
	
			this._updateScales(options, maxMeters);
		},
	
		_updateScales: function (options, maxMeters) {
			if (options.metric && maxMeters) {
				this._updateMetric(maxMeters);
			}
	
			if (options.imperial && maxMeters) {
				this._updateImperial(maxMeters);
			}
		},
	
		_updateMetric: function (maxMeters) {
			var meters = this._getRoundNum(maxMeters);
	
			this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
			this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
		},
	
		_updateImperial: function (maxMeters) {
			var maxFeet = maxMeters * 3.2808399,
			    scale = this._iScale,
			    maxMiles, miles, feet;
	
			if (maxFeet > 5280) {
				maxMiles = maxFeet / 5280;
				miles = this._getRoundNum(maxMiles);
	
				scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
				scale.innerHTML = miles + ' mi';
	
			} else {
				feet = this._getRoundNum(maxFeet);
	
				scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
				scale.innerHTML = feet + ' ft';
			}
		},
	
		_getScaleWidth: function (ratio) {
			return Math.round(this.options.maxWidth * ratio) - 10;
		},
	
		_getRoundNum: function (num) {
			var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
			    d = num / pow10;
	
			d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
	
			return pow10 * d;
		}
	});
	
	L.control.scale = function (options) {
		return new L.Control.Scale(options);
	};
	
	
	/*
	 * L.Control.Layers is a control to allow users to switch between different layers on the map.
	 */
	
	L.Control.Layers = L.Control.extend({
		options: {
			collapsed: true,
			position: 'topright',
			autoZIndex: true
		},
	
		initialize: function (baseLayers, overlays, options) {
			L.setOptions(this, options);
	
			this._layers = {};
			this._lastZIndex = 0;
			this._handlingClick = false;
	
			for (var i in baseLayers) {
				this._addLayer(baseLayers[i], i);
			}
	
			for (i in overlays) {
				this._addLayer(overlays[i], i, true);
			}
		},
	
		onAdd: function (map) {
			this._initLayout();
			this._update();
	
			map
			    .on('layeradd', this._onLayerChange, this)
			    .on('layerremove', this._onLayerChange, this);
	
			return this._container;
		},
	
		onRemove: function (map) {
			map
			    .off('layeradd', this._onLayerChange, this)
			    .off('layerremove', this._onLayerChange, this);
		},
	
		addBaseLayer: function (layer, name) {
			this._addLayer(layer, name);
			this._update();
			return this;
		},
	
		addOverlay: function (layer, name) {
			this._addLayer(layer, name, true);
			this._update();
			return this;
		},
	
		removeLayer: function (layer) {
			var id = L.stamp(layer);
			delete this._layers[id];
			this._update();
			return this;
		},
	
		_initLayout: function () {
			var className = 'leaflet-control-layers',
			    container = this._container = L.DomUtil.create('div', className);
	
			//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
			container.setAttribute('aria-haspopup', true);
	
			if (!L.Browser.touch) {
				L.DomEvent
					.disableClickPropagation(container)
					.disableScrollPropagation(container);
			} else {
				L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
			}
	
			var form = this._form = L.DomUtil.create('form', className + '-list');
	
			if (this.options.collapsed) {
				if (!L.Browser.android) {
					L.DomEvent
					    .on(container, 'mouseover', this._expand, this)
					    .on(container, 'mouseout', this._collapse, this);
				}
				var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
				link.href = '#';
				link.title = 'Layers';
	
				if (L.Browser.touch) {
					L.DomEvent
					    .on(link, 'click', L.DomEvent.stop)
					    .on(link, 'click', this._expand, this);
				}
				else {
					L.DomEvent.on(link, 'focus', this._expand, this);
				}
				//Work around for Firefox android issue https://github.com/Leaflet/Leaflet/issues/2033
				L.DomEvent.on(form, 'click', function () {
					setTimeout(L.bind(this._onInputClick, this), 0);
				}, this);
	
				this._map.on('click', this._collapse, this);
				// TODO keyboard accessibility
			} else {
				this._expand();
			}
	
			this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
			this._separator = L.DomUtil.create('div', className + '-separator', form);
			this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);
	
			container.appendChild(form);
		},
	
		_addLayer: function (layer, name, overlay) {
			var id = L.stamp(layer);
	
			this._layers[id] = {
				layer: layer,
				name: name,
				overlay: overlay
			};
	
			if (this.options.autoZIndex && layer.setZIndex) {
				this._lastZIndex++;
				layer.setZIndex(this._lastZIndex);
			}
		},
	
		_update: function () {
			if (!this._container) {
				return;
			}
	
			this._baseLayersList.innerHTML = '';
			this._overlaysList.innerHTML = '';
	
			var baseLayersPresent = false,
			    overlaysPresent = false,
			    i, obj;
	
			for (i in this._layers) {
				obj = this._layers[i];
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
			}
	
			this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
		},
	
		_onLayerChange: function (e) {
			var obj = this._layers[L.stamp(e.layer)];
	
			if (!obj) { return; }
	
			if (!this._handlingClick) {
				this._update();
			}
	
			var type = obj.overlay ?
				(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
				(e.type === 'layeradd' ? 'baselayerchange' : null);
	
			if (type) {
				this._map.fire(type, obj);
			}
		},
	
		// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
		_createRadioElement: function (name, checked) {
	
			var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
			if (checked) {
				radioHtml += ' checked="checked"';
			}
			radioHtml += '/>';
	
			var radioFragment = document.createElement('div');
			radioFragment.innerHTML = radioHtml;
	
			return radioFragment.firstChild;
		},
	
		_addItem: function (obj) {
			var label = document.createElement('label'),
			    input,
			    checked = this._map.hasLayer(obj.layer);
	
			if (obj.overlay) {
				input = document.createElement('input');
				input.type = 'checkbox';
				input.className = 'leaflet-control-layers-selector';
				input.defaultChecked = checked;
			} else {
				input = this._createRadioElement('leaflet-base-layers', checked);
			}
	
			input.layerId = L.stamp(obj.layer);
	
			L.DomEvent.on(input, 'click', this._onInputClick, this);
	
			var name = document.createElement('span');
			name.innerHTML = ' ' + obj.name;
	
			label.appendChild(input);
			label.appendChild(name);
	
			var container = obj.overlay ? this._overlaysList : this._baseLayersList;
			container.appendChild(label);
	
			return label;
		},
	
		_onInputClick: function () {
			var i, input, obj,
			    inputs = this._form.getElementsByTagName('input'),
			    inputsLen = inputs.length;
	
			this._handlingClick = true;
	
			for (i = 0; i < inputsLen; i++) {
				input = inputs[i];
				obj = this._layers[input.layerId];
	
				if (input.checked && !this._map.hasLayer(obj.layer)) {
					this._map.addLayer(obj.layer);
	
				} else if (!input.checked && this._map.hasLayer(obj.layer)) {
					this._map.removeLayer(obj.layer);
				}
			}
	
			this._handlingClick = false;
	
			this._refocusOnMap();
		},
	
		_expand: function () {
			L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
		},
	
		_collapse: function () {
			this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
		}
	});
	
	L.control.layers = function (baseLayers, overlays, options) {
		return new L.Control.Layers(baseLayers, overlays, options);
	};
	
	
	/*
	 * L.PosAnimation is used by Leaflet internally for pan animations.
	 */
	
	L.PosAnimation = L.Class.extend({
		includes: L.Mixin.Events,
	
		run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
			this.stop();
	
			this._el = el;
			this._inProgress = true;
			this._newPos = newPos;
	
			this.fire('start');
	
			el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
			        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';
	
			L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
			L.DomUtil.setPosition(el, newPos);
	
			// toggle reflow, Chrome flickers for some reason if you don't do this
			L.Util.falseFn(el.offsetWidth);
	
			// there's no native way to track value updates of transitioned properties, so we imitate this
			this._stepTimer = setInterval(L.bind(this._onStep, this), 50);
		},
	
		stop: function () {
			if (!this._inProgress) { return; }
	
			// if we just removed the transition property, the element would jump to its final position,
			// so we need to make it stay at the current position
	
			L.DomUtil.setPosition(this._el, this._getPos());
			this._onTransitionEnd();
			L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
		},
	
		_onStep: function () {
			var stepPos = this._getPos();
			if (!stepPos) {
				this._onTransitionEnd();
				return;
			}
			// jshint camelcase: false
			// make L.DomUtil.getPosition return intermediate position value during animation
			this._el._leaflet_pos = stepPos;
	
			this.fire('step');
		},
	
		// you can't easily get intermediate values of properties animated with CSS3 Transitions,
		// we need to parse computed style (in case of transform it returns matrix string)
	
		_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
	
		_getPos: function () {
			var left, top, matches,
			    el = this._el,
			    style = window.getComputedStyle(el);
	
			if (L.Browser.any3d) {
				matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
				if (!matches) { return; }
				left = parseFloat(matches[1]);
				top  = parseFloat(matches[2]);
			} else {
				left = parseFloat(style.left);
				top  = parseFloat(style.top);
			}
	
			return new L.Point(left, top, true);
		},
	
		_onTransitionEnd: function () {
			L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
	
			if (!this._inProgress) { return; }
			this._inProgress = false;
	
			this._el.style[L.DomUtil.TRANSITION] = '';
	
			// jshint camelcase: false
			// make sure L.DomUtil.getPosition returns the final position value after animation
			this._el._leaflet_pos = this._newPos;
	
			clearInterval(this._stepTimer);
	
			this.fire('step').fire('end');
		}
	
	});
	
	
	/*
	 * Extends L.Map to handle panning animations.
	 */
	
	L.Map.include({
	
		setView: function (center, zoom, options) {
	
			zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
			center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
			options = options || {};
	
			if (this._panAnim) {
				this._panAnim.stop();
			}
	
			if (this._loaded && !options.reset && options !== true) {
	
				if (options.animate !== undefined) {
					options.zoom = L.extend({animate: options.animate}, options.zoom);
					options.pan = L.extend({animate: options.animate}, options.pan);
				}
	
				// try animating pan or zoom
				var animated = (this._zoom !== zoom) ?
					this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
					this._tryAnimatedPan(center, options.pan);
	
				if (animated) {
					// prevent resize handler call, the view will refresh after animation anyway
					clearTimeout(this._sizeTimer);
					return this;
				}
			}
	
			// animation didn't start, just reset the map view
			this._resetView(center, zoom);
	
			return this;
		},
	
		panBy: function (offset, options) {
			offset = L.point(offset).round();
			options = options || {};
	
			if (!offset.x && !offset.y) {
				return this;
			}
	
			if (!this._panAnim) {
				this._panAnim = new L.PosAnimation();
	
				this._panAnim.on({
					'step': this._onPanTransitionStep,
					'end': this._onPanTransitionEnd
				}, this);
			}
	
			// don't fire movestart if animating inertia
			if (!options.noMoveStart) {
				this.fire('movestart');
			}
	
			// animate pan unless animate: false specified
			if (options.animate !== false) {
				L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');
	
				var newPos = this._getMapPanePos().subtract(offset);
				this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
			} else {
				this._rawPanBy(offset);
				this.fire('move').fire('moveend');
			}
	
			return this;
		},
	
		_onPanTransitionStep: function () {
			this.fire('move');
		},
	
		_onPanTransitionEnd: function () {
			L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
			this.fire('moveend');
		},
	
		_tryAnimatedPan: function (center, options) {
			// difference between the new and current centers in pixels
			var offset = this._getCenterOffset(center)._floor();
	
			// don't animate too far unless animate: true specified in options
			if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }
	
			this.panBy(offset, options);
	
			return true;
		}
	});
	
	
	/*
	 * L.PosAnimation fallback implementation that powers Leaflet pan animations
	 * in browsers that don't support CSS3 Transitions.
	 */
	
	L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({
	
		run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
			this.stop();
	
			this._el = el;
			this._inProgress = true;
			this._duration = duration || 0.25;
			this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
	
			this._startPos = L.DomUtil.getPosition(el);
			this._offset = newPos.subtract(this._startPos);
			this._startTime = +new Date();
	
			this.fire('start');
	
			this._animate();
		},
	
		stop: function () {
			if (!this._inProgress) { return; }
	
			this._step();
			this._complete();
		},
	
		_animate: function () {
			// animation loop
			this._animId = L.Util.requestAnimFrame(this._animate, this);
			this._step();
		},
	
		_step: function () {
			var elapsed = (+new Date()) - this._startTime,
			    duration = this._duration * 1000;
	
			if (elapsed < duration) {
				this._runFrame(this._easeOut(elapsed / duration));
			} else {
				this._runFrame(1);
				this._complete();
			}
		},
	
		_runFrame: function (progress) {
			var pos = this._startPos.add(this._offset.multiplyBy(progress));
			L.DomUtil.setPosition(this._el, pos);
	
			this.fire('step');
		},
	
		_complete: function () {
			L.Util.cancelAnimFrame(this._animId);
	
			this._inProgress = false;
			this.fire('end');
		},
	
		_easeOut: function (t) {
			return 1 - Math.pow(1 - t, this._easeOutPower);
		}
	});
	
	
	/*
	 * Extends L.Map to handle zoom animations.
	 */
	
	L.Map.mergeOptions({
		zoomAnimation: true,
		zoomAnimationThreshold: 4
	});
	
	if (L.DomUtil.TRANSITION) {
	
		L.Map.addInitHook(function () {
			// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
			this._zoomAnimated = this.options.zoomAnimation && L.DomUtil.TRANSITION &&
					L.Browser.any3d && !L.Browser.android23 && !L.Browser.mobileOpera;
	
			// zoom transitions run with the same duration for all layers, so if one of transitionend events
			// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
			if (this._zoomAnimated) {
				L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
			}
		});
	}
	
	L.Map.include(!L.DomUtil.TRANSITION ? {} : {
	
		_catchTransitionEnd: function (e) {
			if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
				this._onZoomTransitionEnd();
			}
		},
	
		_nothingToAnimate: function () {
			return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
		},
	
		_tryAnimatedZoom: function (center, zoom, options) {
	
			if (this._animatingZoom) { return true; }
	
			options = options || {};
	
			// don't animate if disabled, not supported or zoom difference is too large
			if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
			        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }
	
			// offset is the pixel coords of the zoom origin relative to the current center
			var scale = this.getZoomScale(zoom),
			    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale),
				origin = this._getCenterLayerPoint()._add(offset);
	
			// don't animate if the zoom origin isn't within one screen from the current center, unless forced
			if (options.animate !== true && !this.getSize().contains(offset)) { return false; }
	
			this
			    .fire('movestart')
			    .fire('zoomstart');
	
			this._animateZoom(center, zoom, origin, scale, null, true);
	
			return true;
		},
	
		_animateZoom: function (center, zoom, origin, scale, delta, backwards, forTouchZoom) {
	
			if (!forTouchZoom) {
				this._animatingZoom = true;
			}
	
			// put transform transition on all layers with leaflet-zoom-animated class
			L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');
	
			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;
	
			// disable any dragging during animation
			if (L.Draggable) {
				L.Draggable._disabled = true;
			}
	
			L.Util.requestAnimFrame(function () {
				this.fire('zoomanim', {
					center: center,
					zoom: zoom,
					origin: origin,
					scale: scale,
					delta: delta,
					backwards: backwards
				});
				// horrible hack to work around a Chrome bug https://github.com/Leaflet/Leaflet/issues/3689
				setTimeout(L.bind(this._onZoomTransitionEnd, this), 250);
			}, this);
		},
	
		_onZoomTransitionEnd: function () {
			if (!this._animatingZoom) { return; }
	
			this._animatingZoom = false;
	
			L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');
	
			L.Util.requestAnimFrame(function () {
				this._resetView(this._animateToCenter, this._animateToZoom, true, true);
	
				if (L.Draggable) {
					L.Draggable._disabled = false;
				}
			}, this);
		}
	});
	
	
	/*
		Zoom animation logic for L.TileLayer.
	*/
	
	L.TileLayer.include({
		_animateZoom: function (e) {
			if (!this._animating) {
				this._animating = true;
				this._prepareBgBuffer();
			}
	
			var bg = this._bgBuffer,
			    transform = L.DomUtil.TRANSFORM,
			    initialTransform = e.delta ? L.DomUtil.getTranslateString(e.delta) : bg.style[transform],
			    scaleStr = L.DomUtil.getScaleString(e.scale, e.origin);
	
			bg.style[transform] = e.backwards ?
					scaleStr + ' ' + initialTransform :
					initialTransform + ' ' + scaleStr;
		},
	
		_endZoomAnim: function () {
			var front = this._tileContainer,
			    bg = this._bgBuffer;
	
			front.style.visibility = '';
			front.parentNode.appendChild(front); // Bring to fore
	
			// force reflow
			L.Util.falseFn(bg.offsetWidth);
	
			var zoom = this._map.getZoom();
			if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
				this._clearBgBuffer();
			}
	
			this._animating = false;
		},
	
		_clearBgBuffer: function () {
			var map = this._map;
	
			if (map && !map._animatingZoom && !map.touchZoom._zooming) {
				this._bgBuffer.innerHTML = '';
				this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
			}
		},
	
		_prepareBgBuffer: function () {
	
			var front = this._tileContainer,
			    bg = this._bgBuffer;
	
			// if foreground layer doesn't have many tiles but bg layer does,
			// keep the existing bg layer and just zoom it some more
	
			var bgLoaded = this._getLoadedTilesPercentage(bg),
			    frontLoaded = this._getLoadedTilesPercentage(front);
	
			if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {
	
				front.style.visibility = 'hidden';
				this._stopLoadingImages(front);
				return;
			}
	
			// prepare the buffer to become the front tile pane
			bg.style.visibility = 'hidden';
			bg.style[L.DomUtil.TRANSFORM] = '';
	
			// switch out the current layer to be the new bg layer (and vice-versa)
			this._tileContainer = bg;
			bg = this._bgBuffer = front;
	
			this._stopLoadingImages(bg);
	
			//prevent bg buffer from clearing right after zoom
			clearTimeout(this._clearBgBufferTimer);
		},
	
		_getLoadedTilesPercentage: function (container) {
			var tiles = container.getElementsByTagName('img'),
			    i, len, count = 0;
	
			for (i = 0, len = tiles.length; i < len; i++) {
				if (tiles[i].complete) {
					count++;
				}
			}
			return count / len;
		},
	
		// stops loading all tiles in the background layer
		_stopLoadingImages: function (container) {
			var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
			    i, len, tile;
	
			for (i = 0, len = tiles.length; i < len; i++) {
				tile = tiles[i];
	
				if (!tile.complete) {
					tile.onload = L.Util.falseFn;
					tile.onerror = L.Util.falseFn;
					tile.src = L.Util.emptyImageUrl;
	
					tile.parentNode.removeChild(tile);
				}
			}
		}
	});
	
	
	/*
	 * Provides L.Map with convenient shortcuts for using browser geolocation features.
	 */
	
	L.Map.include({
		_defaultLocateOptions: {
			watch: false,
			setView: false,
			maxZoom: Infinity,
			timeout: 10000,
			maximumAge: 0,
			enableHighAccuracy: false
		},
	
		locate: function (/*Object*/ options) {
	
			options = this._locateOptions = L.extend(this._defaultLocateOptions, options);
	
			if (!navigator.geolocation) {
				this._handleGeolocationError({
					code: 0,
					message: 'Geolocation not supported.'
				});
				return this;
			}
	
			var onResponse = L.bind(this._handleGeolocationResponse, this),
				onError = L.bind(this._handleGeolocationError, this);
	
			if (options.watch) {
				this._locationWatchId =
				        navigator.geolocation.watchPosition(onResponse, onError, options);
			} else {
				navigator.geolocation.getCurrentPosition(onResponse, onError, options);
			}
			return this;
		},
	
		stopLocate: function () {
			if (navigator.geolocation) {
				navigator.geolocation.clearWatch(this._locationWatchId);
			}
			if (this._locateOptions) {
				this._locateOptions.setView = false;
			}
			return this;
		},
	
		_handleGeolocationError: function (error) {
			var c = error.code,
			    message = error.message ||
			            (c === 1 ? 'permission denied' :
			            (c === 2 ? 'position unavailable' : 'timeout'));
	
			if (this._locateOptions.setView && !this._loaded) {
				this.fitWorld();
			}
	
			this.fire('locationerror', {
				code: c,
				message: 'Geolocation error: ' + message + '.'
			});
		},
	
		_handleGeolocationResponse: function (pos) {
			var lat = pos.coords.latitude,
			    lng = pos.coords.longitude,
			    latlng = new L.LatLng(lat, lng),
	
			    latAccuracy = 180 * pos.coords.accuracy / 40075017,
			    lngAccuracy = latAccuracy / Math.cos(L.LatLng.DEG_TO_RAD * lat),
	
			    bounds = L.latLngBounds(
			            [lat - latAccuracy, lng - lngAccuracy],
			            [lat + latAccuracy, lng + lngAccuracy]),
	
			    options = this._locateOptions;
	
			if (options.setView) {
				var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
				this.setView(latlng, zoom);
			}
	
			var data = {
				latlng: latlng,
				bounds: bounds,
				timestamp: pos.timestamp
			};
	
			for (var i in pos.coords) {
				if (typeof pos.coords[i] === 'number') {
					data[i] = pos.coords[i];
				}
			}
	
			this.fire('locationfound', data);
		}
	});
	
	
	}(window, document));

/***/ },

/***/ 288:
/***/ function(module, exports) {

	/**
	 @license
	The MIT License
	
	Copyright (c) 2016 Google, Inc.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	 */
	
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {'use strict';
		var microtask = __webpack_require__(1);
		var es6Promise = __webpack_require__(2);
		var core = __webpack_require__(6);
		var browserPatch = __webpack_require__(10);
		if (core.Zone.prototype['scheduleMicrotask']) {
		    console.warn('Zone-microtasks already exported on window the object!');
		}
		else {
		    microtask.addMicrotaskSupport(core.Zone);
		    global.Zone = core.Zone;
		    global.zone = new global.Zone();
		    // Monkey patch the Promise implementation to add support for microtasks
		    global.Promise = es6Promise.Promise;
		    browserPatch.apply();
		}
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1taWNyb3Rhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvYnJvd3Nlci96b25lLW1pY3JvdGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLFNBQVMsV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUMxQyxJQUFZLFVBQVUsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUMxQyxJQUFZLElBQUksV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNoQyxJQUFZLFlBQVksV0FBTSxrQkFBa0IsQ0FBQyxDQUFBO0FBRWpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhDLHdFQUF3RTtJQUN4RSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFFcEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIG1pY3JvdGFzayBmcm9tICcuLi9taWNyb3Rhc2snO1xuaW1wb3J0ICogYXMgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0ICogYXMgYnJvd3NlclBhdGNoIGZyb20gJy4uL3BhdGNoL2Jyb3dzZXInO1xuXG5pZiAoY29yZS5ab25lLnByb3RvdHlwZVsnc2NoZWR1bGVNaWNyb3Rhc2snXSkge1xuICBjb25zb2xlLndhcm4oJ1pvbmUtbWljcm90YXNrcyBhbHJlYWR5IGV4cG9ydGVkIG9uIHdpbmRvdyB0aGUgb2JqZWN0IScpO1xufSBlbHNlIHtcbiAgbWljcm90YXNrLmFkZE1pY3JvdGFza1N1cHBvcnQoY29yZS5ab25lKTtcblxuICBnbG9iYWwuWm9uZSA9IGNvcmUuWm9uZTtcbiAgZ2xvYmFsLnpvbmUgPSBuZXcgZ2xvYmFsLlpvbmUoKTtcblxuICAvLyBNb25rZXkgcGF0Y2ggdGhlIFByb21pc2UgaW1wbGVtZW50YXRpb24gdG8gYWRkIHN1cHBvcnQgZm9yIG1pY3JvdGFza3NcbiAgZ2xvYmFsLlByb21pc2UgPSBlczZQcm9taXNlLlByb21pc2U7XG5cbiAgYnJvd3NlclBhdGNoLmFwcGx5KCk7XG59XG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {// TODO(vicb): Create a benchmark for the different methods & the usage of the queue
		// see https://github.com/angular/zone.js/issues/97
		// It is required to initialize hasNativePromise before requiring es6-promise otherwise es6-promise would
		// overwrite the native Promise implementation on v8 and the check would always return false.
		// see https://github.com/jakearchibald/es6-promise/issues/140
		var hasNativePromise = typeof Promise !== "undefined" &&
		    Promise.toString().indexOf("[native code]") !== -1;
		var isFirefox = global.navigator &&
		    global.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		var resolvedPromise;
		// TODO(vicb): remove '!isFirefox' when the bug gets fixed:
		// https://bugzilla.mozilla.org/show_bug.cgi?id=1162013
		if (hasNativePromise && !isFirefox) {
		    // When available use a native Promise to schedule microtasks.
		    // When not available, es6-promise fallback will be used
		    resolvedPromise = Promise.resolve();
		}
		var es6Promise = __webpack_require__(2).Promise;
		if (resolvedPromise) {
		    es6Promise._setScheduler(function (fn) {
		        resolvedPromise.then(fn);
		    });
		}
		// es6-promise asap should schedule microtasks via zone.scheduleMicrotask so that any
		// user defined hooks are triggered
		es6Promise._setAsap(function (fn, arg) {
		    global.zone.scheduleMicrotask(function () {
		        fn(arg);
		    });
		});
		// The default implementation of scheduleMicrotask use the original es6-promise implementation
		// to schedule a microtask
		function scheduleMicrotask(fn) {
		    es6Promise._asap(this.bind(fn));
		}
		function addMicrotaskSupport(zoneClass) {
		    zoneClass.prototype.scheduleMicrotask = scheduleMicrotask;
		    return zoneClass;
		}
		exports.addMicrotaskSupport = addMicrotaskSupport;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm90YXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pY3JvdGFzay50cyJdLCJuYW1lcyI6WyJzY2hlZHVsZU1pY3JvdGFzayIsImFkZE1pY3JvdGFza1N1cHBvcnQiXSwibWFwcGluZ3MiOiJBQUFBLG9GQUFvRjtBQUNwRixtREFBbUQ7QUFFbkQseUdBQXlHO0FBQ3pHLDZGQUE2RjtBQUM3Riw4REFBOEQ7QUFDOUQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLE9BQU8sS0FBSyxXQUFXO0lBQ2pELE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFFdkQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVM7SUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXJFLElBQUksZUFBZSxDQUFDO0FBRXBCLDJEQUEyRDtBQUMzRCx1REFBdUQ7QUFDdkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25DLDhEQUE4RDtJQUM5RCx3REFBd0Q7SUFDeEQsZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN0QyxDQUFDO0FBRUQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUVoRCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBUyxFQUFFO1FBQ2xDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQscUZBQXFGO0FBQ3JGLG1DQUFtQztBQUNuQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVMsRUFBRSxFQUFFLEdBQUc7SUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUM1QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsOEZBQThGO0FBQzlGLDBCQUEwQjtBQUMxQiwyQkFBMkIsRUFBRTtJQUMzQkEsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDbENBLENBQUNBO0FBRUQsNkJBQW9DLFNBQVM7SUFDM0NDLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsR0FBR0EsaUJBQWlCQSxDQUFDQTtJQUMxREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7QUFDbkJBLENBQUNBO0FBSGUsMkJBQW1CLHNCQUdsQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETyh2aWNiKTogQ3JlYXRlIGEgYmVuY2htYXJrIGZvciB0aGUgZGlmZmVyZW50IG1ldGhvZHMgJiB0aGUgdXNhZ2Ugb2YgdGhlIHF1ZXVlXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvOTdcblxuLy8gSXQgaXMgcmVxdWlyZWQgdG8gaW5pdGlhbGl6ZSBoYXNOYXRpdmVQcm9taXNlIGJlZm9yZSByZXF1aXJpbmcgZXM2LXByb21pc2Ugb3RoZXJ3aXNlIGVzNi1wcm9taXNlIHdvdWxkXG4vLyBvdmVyd3JpdGUgdGhlIG5hdGl2ZSBQcm9taXNlIGltcGxlbWVudGF0aW9uIG9uIHY4IGFuZCB0aGUgY2hlY2sgd291bGQgYWx3YXlzIHJldHVybiBmYWxzZS5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFrZWFyY2hpYmFsZC9lczYtcHJvbWlzZS9pc3N1ZXMvMTQwXG52YXIgaGFzTmF0aXZlUHJvbWlzZSA9IHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgUHJvbWlzZS50b1N0cmluZygpLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpICE9PSAtMTtcblxudmFyIGlzRmlyZWZveCA9IGdsb2JhbC5uYXZpZ2F0b3IgJiZcbiAgICBnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xuXG52YXIgcmVzb2x2ZWRQcm9taXNlO1xuXG4vLyBUT0RPKHZpY2IpOiByZW1vdmUgJyFpc0ZpcmVmb3gnIHdoZW4gdGhlIGJ1ZyBnZXRzIGZpeGVkOlxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTE2MjAxM1xuaWYgKGhhc05hdGl2ZVByb21pc2UgJiYgIWlzRmlyZWZveCkge1xuICAvLyBXaGVuIGF2YWlsYWJsZSB1c2UgYSBuYXRpdmUgUHJvbWlzZSB0byBzY2hlZHVsZSBtaWNyb3Rhc2tzLlxuICAvLyBXaGVuIG5vdCBhdmFpbGFibGUsIGVzNi1wcm9taXNlIGZhbGxiYWNrIHdpbGwgYmUgdXNlZFxuICByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbn1cblxudmFyIGVzNlByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpLlByb21pc2U7XG5cbmlmIChyZXNvbHZlZFByb21pc2UpIHtcbiAgZXM2UHJvbWlzZS5fc2V0U2NoZWR1bGVyKGZ1bmN0aW9uKGZuKSB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oZm4pO1xuICB9KTtcbn1cblxuLy8gZXM2LXByb21pc2UgYXNhcCBzaG91bGQgc2NoZWR1bGUgbWljcm90YXNrcyB2aWEgem9uZS5zY2hlZHVsZU1pY3JvdGFzayBzbyB0aGF0IGFueVxuLy8gdXNlciBkZWZpbmVkIGhvb2tzIGFyZSB0cmlnZ2VyZWRcbmVzNlByb21pc2UuX3NldEFzYXAoZnVuY3Rpb24oZm4sIGFyZykge1xuICBnbG9iYWwuem9uZS5zY2hlZHVsZU1pY3JvdGFzayhmdW5jdGlvbigpIHtcbiAgICBmbihhcmcpO1xuICB9KTtcbn0pO1xuXG4vLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBzY2hlZHVsZU1pY3JvdGFzayB1c2UgdGhlIG9yaWdpbmFsIGVzNi1wcm9taXNlIGltcGxlbWVudGF0aW9uXG4vLyB0byBzY2hlZHVsZSBhIG1pY3JvdGFza1xuZnVuY3Rpb24gc2NoZWR1bGVNaWNyb3Rhc2soZm4pIHtcbiAgZXM2UHJvbWlzZS5fYXNhcCh0aGlzLmJpbmQoZm4pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1pY3JvdGFza1N1cHBvcnQoem9uZUNsYXNzKSB7XG4gIHpvbmVDbGFzcy5wcm90b3R5cGUuc2NoZWR1bGVNaWNyb3Rhc2sgPSBzY2hlZHVsZU1pY3JvdGFzaztcbiAgcmV0dXJuIHpvbmVDbGFzcztcbn1cbiJdfQ==
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
		 * @version   3.0.2
		 */
	
		(function() {
		    "use strict";
		    function lib$es6$promise$utils$$objectOrFunction(x) {
		      return typeof x === 'function' || (typeof x === 'object' && x !== null);
		    }
	
		    function lib$es6$promise$utils$$isFunction(x) {
		      return typeof x === 'function';
		    }
	
		    function lib$es6$promise$utils$$isMaybeThenable(x) {
		      return typeof x === 'object' && x !== null;
		    }
	
		    var lib$es6$promise$utils$$_isArray;
		    if (!Array.isArray) {
		      lib$es6$promise$utils$$_isArray = function (x) {
		        return Object.prototype.toString.call(x) === '[object Array]';
		      };
		    } else {
		      lib$es6$promise$utils$$_isArray = Array.isArray;
		    }
	
		    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
		    var lib$es6$promise$asap$$len = 0;
		    var lib$es6$promise$asap$$toString = {}.toString;
		    var lib$es6$promise$asap$$vertxNext;
		    var lib$es6$promise$asap$$customSchedulerFn;
	
		    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
		      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
		      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
		      lib$es6$promise$asap$$len += 2;
		      if (lib$es6$promise$asap$$len === 2) {
		        // If len is 2, that means that we need to schedule an async flush.
		        // If additional callbacks are queued before the queue is flushed, they
		        // will be processed by this flush that we are scheduling.
		        if (lib$es6$promise$asap$$customSchedulerFn) {
		          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
		        } else {
		          lib$es6$promise$asap$$scheduleFlush();
		        }
		      }
		    }
	
		    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
		      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
		    }
	
		    function lib$es6$promise$asap$$setAsap(asapFn) {
		      lib$es6$promise$asap$$asap = asapFn;
		    }
	
		    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
		    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
		    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
		    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
		    // test for web worker but not in IE10
		    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
		      typeof importScripts !== 'undefined' &&
		      typeof MessageChannel !== 'undefined';
	
		    // node
		    function lib$es6$promise$asap$$useNextTick() {
		      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
		      // see https://github.com/cujojs/when/issues/410 for details
		      return function() {
		        process.nextTick(lib$es6$promise$asap$$flush);
		      };
		    }
	
		    // vertx
		    function lib$es6$promise$asap$$useVertxTimer() {
		      return function() {
		        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
		      };
		    }
	
		    function lib$es6$promise$asap$$useMutationObserver() {
		      var iterations = 0;
		      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
		      var node = document.createTextNode('');
		      observer.observe(node, { characterData: true });
	
		      return function() {
		        node.data = (iterations = ++iterations % 2);
		      };
		    }
	
		    // web worker
		    function lib$es6$promise$asap$$useMessageChannel() {
		      var channel = new MessageChannel();
		      channel.port1.onmessage = lib$es6$promise$asap$$flush;
		      return function () {
		        channel.port2.postMessage(0);
		      };
		    }
	
		    function lib$es6$promise$asap$$useSetTimeout() {
		      return function() {
		        setTimeout(lib$es6$promise$asap$$flush, 1);
		      };
		    }
	
		    var lib$es6$promise$asap$$queue = new Array(1000);
		    function lib$es6$promise$asap$$flush() {
		      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
		        var callback = lib$es6$promise$asap$$queue[i];
		        var arg = lib$es6$promise$asap$$queue[i+1];
	
		        callback(arg);
	
		        lib$es6$promise$asap$$queue[i] = undefined;
		        lib$es6$promise$asap$$queue[i+1] = undefined;
		      }
	
		      lib$es6$promise$asap$$len = 0;
		    }
	
		    function lib$es6$promise$asap$$attemptVertx() {
		      try {
		        var r = require;
		        var vertx = __webpack_require__(4);
		        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
		        return lib$es6$promise$asap$$useVertxTimer();
		      } catch(e) {
		        return lib$es6$promise$asap$$useSetTimeout();
		      }
		    }
	
		    var lib$es6$promise$asap$$scheduleFlush;
		    // Decide what async method to use to triggering processing of queued callbacks:
		    if (lib$es6$promise$asap$$isNode) {
		      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
		    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
		      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
		    } else if (lib$es6$promise$asap$$isWorker) {
		      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
		    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
		      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
		    } else {
		      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
		    }
	
		    function lib$es6$promise$$internal$$noop() {}
	
		    var lib$es6$promise$$internal$$PENDING   = void 0;
		    var lib$es6$promise$$internal$$FULFILLED = 1;
		    var lib$es6$promise$$internal$$REJECTED  = 2;
	
		    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
		    function lib$es6$promise$$internal$$selfFulfillment() {
		      return new TypeError("You cannot resolve a promise with itself");
		    }
	
		    function lib$es6$promise$$internal$$cannotReturnOwn() {
		      return new TypeError('A promises callback cannot return that same promise.');
		    }
	
		    function lib$es6$promise$$internal$$getThen(promise) {
		      try {
		        return promise.then;
		      } catch(error) {
		        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
		        return lib$es6$promise$$internal$$GET_THEN_ERROR;
		      }
		    }
	
		    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
		      try {
		        then.call(value, fulfillmentHandler, rejectionHandler);
		      } catch(e) {
		        return e;
		      }
		    }
	
		    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
		       lib$es6$promise$asap$$asap(function(promise) {
		        var sealed = false;
		        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
		          if (sealed) { return; }
		          sealed = true;
		          if (thenable !== value) {
		            lib$es6$promise$$internal$$resolve(promise, value);
		          } else {
		            lib$es6$promise$$internal$$fulfill(promise, value);
		          }
		        }, function(reason) {
		          if (sealed) { return; }
		          sealed = true;
	
		          lib$es6$promise$$internal$$reject(promise, reason);
		        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
		        if (!sealed && error) {
		          sealed = true;
		          lib$es6$promise$$internal$$reject(promise, error);
		        }
		      }, promise);
		    }
	
		    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
		      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
		        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
		      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
		        lib$es6$promise$$internal$$reject(promise, thenable._result);
		      } else {
		        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
		          lib$es6$promise$$internal$$resolve(promise, value);
		        }, function(reason) {
		          lib$es6$promise$$internal$$reject(promise, reason);
		        });
		      }
		    }
	
		    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
		      if (maybeThenable.constructor === promise.constructor) {
		        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
		      } else {
		        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
		        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
		          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
		        } else if (then === undefined) {
		          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
		        } else if (lib$es6$promise$utils$$isFunction(then)) {
		          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
		        } else {
		          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
		        }
		      }
		    }
	
		    function lib$es6$promise$$internal$$resolve(promise, value) {
		      if (promise === value) {
		        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
		      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
		        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
		      } else {
		        lib$es6$promise$$internal$$fulfill(promise, value);
		      }
		    }
	
		    function lib$es6$promise$$internal$$publishRejection(promise) {
		      if (promise._onerror) {
		        promise._onerror(promise._result);
		      }
	
		      lib$es6$promise$$internal$$publish(promise);
		    }
	
		    function lib$es6$promise$$internal$$fulfill(promise, value) {
		      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
		      promise._result = value;
		      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
		      if (promise._subscribers.length !== 0) {
		        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
		      }
		    }
	
		    function lib$es6$promise$$internal$$reject(promise, reason) {
		      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
		      promise._state = lib$es6$promise$$internal$$REJECTED;
		      promise._result = reason;
	
		      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
		    }
	
		    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
		      var subscribers = parent._subscribers;
		      var length = subscribers.length;
	
		      parent._onerror = null;
	
		      subscribers[length] = child;
		      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
		      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
		      if (length === 0 && parent._state) {
		        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
		      }
		    }
	
		    function lib$es6$promise$$internal$$publish(promise) {
		      var subscribers = promise._subscribers;
		      var settled = promise._state;
	
		      if (subscribers.length === 0) { return; }
	
		      var child, callback, detail = promise._result;
	
		      for (var i = 0; i < subscribers.length; i += 3) {
		        child = subscribers[i];
		        callback = subscribers[i + settled];
	
		        if (child) {
		          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
		        } else {
		          callback(detail);
		        }
		      }
	
		      promise._subscribers.length = 0;
		    }
	
		    function lib$es6$promise$$internal$$ErrorObject() {
		      this.error = null;
		    }
	
		    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
		    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
		      try {
		        return callback(detail);
		      } catch(e) {
		        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
		        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
		      }
		    }
	
		    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
		      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
		          value, error, succeeded, failed;
	
		      if (hasCallback) {
		        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
		        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
		          failed = true;
		          error = value.error;
		          value = null;
		        } else {
		          succeeded = true;
		        }
	
		        if (promise === value) {
		          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
		          return;
		        }
	
		      } else {
		        value = detail;
		        succeeded = true;
		      }
	
		      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
		        // noop
		      } else if (hasCallback && succeeded) {
		        lib$es6$promise$$internal$$resolve(promise, value);
		      } else if (failed) {
		        lib$es6$promise$$internal$$reject(promise, error);
		      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
		        lib$es6$promise$$internal$$fulfill(promise, value);
		      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
		        lib$es6$promise$$internal$$reject(promise, value);
		      }
		    }
	
		    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
		      try {
		        resolver(function resolvePromise(value){
		          lib$es6$promise$$internal$$resolve(promise, value);
		        }, function rejectPromise(reason) {
		          lib$es6$promise$$internal$$reject(promise, reason);
		        });
		      } catch(e) {
		        lib$es6$promise$$internal$$reject(promise, e);
		      }
		    }
	
		    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
		      var enumerator = this;
	
		      enumerator._instanceConstructor = Constructor;
		      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
		      if (enumerator._validateInput(input)) {
		        enumerator._input     = input;
		        enumerator.length     = input.length;
		        enumerator._remaining = input.length;
	
		        enumerator._init();
	
		        if (enumerator.length === 0) {
		          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
		        } else {
		          enumerator.length = enumerator.length || 0;
		          enumerator._enumerate();
		          if (enumerator._remaining === 0) {
		            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
		          }
		        }
		      } else {
		        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
		      }
		    }
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
		      return lib$es6$promise$utils$$isArray(input);
		    };
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
		      return new Error('Array Methods must be provided an Array');
		    };
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
		      this._result = new Array(this.length);
		    };
	
		    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
		      var enumerator = this;
	
		      var length  = enumerator.length;
		      var promise = enumerator.promise;
		      var input   = enumerator._input;
	
		      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
		        enumerator._eachEntry(input[i], i);
		      }
		    };
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
		      var enumerator = this;
		      var c = enumerator._instanceConstructor;
	
		      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
		        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
		          entry._onerror = null;
		          enumerator._settledAt(entry._state, i, entry._result);
		        } else {
		          enumerator._willSettleAt(c.resolve(entry), i);
		        }
		      } else {
		        enumerator._remaining--;
		        enumerator._result[i] = entry;
		      }
		    };
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
		      var enumerator = this;
		      var promise = enumerator.promise;
	
		      if (promise._state === lib$es6$promise$$internal$$PENDING) {
		        enumerator._remaining--;
	
		        if (state === lib$es6$promise$$internal$$REJECTED) {
		          lib$es6$promise$$internal$$reject(promise, value);
		        } else {
		          enumerator._result[i] = value;
		        }
		      }
	
		      if (enumerator._remaining === 0) {
		        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
		      }
		    };
	
		    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
		      var enumerator = this;
	
		      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
		        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
		      }, function(reason) {
		        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
		      });
		    };
		    function lib$es6$promise$promise$all$$all(entries) {
		      return new lib$es6$promise$enumerator$$default(this, entries).promise;
		    }
		    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
		    function lib$es6$promise$promise$race$$race(entries) {
		      /*jshint validthis:true */
		      var Constructor = this;
	
		      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
		      if (!lib$es6$promise$utils$$isArray(entries)) {
		        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
		        return promise;
		      }
	
		      var length = entries.length;
	
		      function onFulfillment(value) {
		        lib$es6$promise$$internal$$resolve(promise, value);
		      }
	
		      function onRejection(reason) {
		        lib$es6$promise$$internal$$reject(promise, reason);
		      }
	
		      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
		        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
		      }
	
		      return promise;
		    }
		    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
		    function lib$es6$promise$promise$resolve$$resolve(object) {
		      /*jshint validthis:true */
		      var Constructor = this;
	
		      if (object && typeof object === 'object' && object.constructor === Constructor) {
		        return object;
		      }
	
		      var promise = new Constructor(lib$es6$promise$$internal$$noop);
		      lib$es6$promise$$internal$$resolve(promise, object);
		      return promise;
		    }
		    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
		    function lib$es6$promise$promise$reject$$reject(reason) {
		      /*jshint validthis:true */
		      var Constructor = this;
		      var promise = new Constructor(lib$es6$promise$$internal$$noop);
		      lib$es6$promise$$internal$$reject(promise, reason);
		      return promise;
		    }
		    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
		    var lib$es6$promise$promise$$counter = 0;
	
		    function lib$es6$promise$promise$$needsResolver() {
		      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
		    }
	
		    function lib$es6$promise$promise$$needsNew() {
		      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		    }
	
		    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
		    /**
		      Promise objects represent the eventual result of an asynchronous operation. The
		      primary way of interacting with a promise is through its `then` method, which
		      registers callbacks to receive either a promise's eventual value or the reason
		      why the promise cannot be fulfilled.
	
		      Terminology
		      -----------
	
		      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
		      - `thenable` is an object or function that defines a `then` method.
		      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
		      - `exception` is a value that is thrown using the throw statement.
		      - `reason` is a value that indicates why a promise was rejected.
		      - `settled` the final resting state of a promise, fulfilled or rejected.
	
		      A promise can be in one of three states: pending, fulfilled, or rejected.
	
		      Promises that are fulfilled have a fulfillment value and are in the fulfilled
		      state.  Promises that are rejected have a rejection reason and are in the
		      rejected state.  A fulfillment value is never a thenable.
	
		      Promises can also be said to *resolve* a value.  If this value is also a
		      promise, then the original promise's settled state will match the value's
		      settled state.  So a promise that *resolves* a promise that rejects will
		      itself reject, and a promise that *resolves* a promise that fulfills will
		      itself fulfill.
	
	
		      Basic Usage:
		      ------------
	
		      ```js
		      var promise = new Promise(function(resolve, reject) {
		        // on success
		        resolve(value);
	
		        // on failure
		        reject(reason);
		      });
	
		      promise.then(function(value) {
		        // on fulfillment
		      }, function(reason) {
		        // on rejection
		      });
		      ```
	
		      Advanced Usage:
		      ---------------
	
		      Promises shine when abstracting away asynchronous interactions such as
		      `XMLHttpRequest`s.
	
		      ```js
		      function getJSON(url) {
		        return new Promise(function(resolve, reject){
		          var xhr = new XMLHttpRequest();
	
		          xhr.open('GET', url);
		          xhr.onreadystatechange = handler;
		          xhr.responseType = 'json';
		          xhr.setRequestHeader('Accept', 'application/json');
		          xhr.send();
	
		          function handler() {
		            if (this.readyState === this.DONE) {
		              if (this.status === 200) {
		                resolve(this.response);
		              } else {
		                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		              }
		            }
		          };
		        });
		      }
	
		      getJSON('/posts.json').then(function(json) {
		        // on fulfillment
		      }, function(reason) {
		        // on rejection
		      });
		      ```
	
		      Unlike callbacks, promises are great composable primitives.
	
		      ```js
		      Promise.all([
		        getJSON('/posts'),
		        getJSON('/comments')
		      ]).then(function(values){
		        values[0] // => postsJSON
		        values[1] // => commentsJSON
	
		        return values;
		      });
		      ```
	
		      @class Promise
		      @param {function} resolver
		      Useful for tooling.
		      @constructor
		    */
		    function lib$es6$promise$promise$$Promise(resolver) {
		      this._id = lib$es6$promise$promise$$counter++;
		      this._state = undefined;
		      this._result = undefined;
		      this._subscribers = [];
	
		      if (lib$es6$promise$$internal$$noop !== resolver) {
		        if (!lib$es6$promise$utils$$isFunction(resolver)) {
		          lib$es6$promise$promise$$needsResolver();
		        }
	
		        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
		          lib$es6$promise$promise$$needsNew();
		        }
	
		        lib$es6$promise$$internal$$initializePromise(this, resolver);
		      }
		    }
	
		    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
		    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
		    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
		    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
		    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
		    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
		    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
		    lib$es6$promise$promise$$Promise.prototype = {
		      constructor: lib$es6$promise$promise$$Promise,
	
		    /**
		      The primary way of interacting with a promise is through its `then` method,
		      which registers callbacks to receive either a promise's eventual value or the
		      reason why the promise cannot be fulfilled.
	
		      ```js
		      findUser().then(function(user){
		        // user is available
		      }, function(reason){
		        // user is unavailable, and you are given the reason why
		      });
		      ```
	
		      Chaining
		      --------
	
		      The return value of `then` is itself a promise.  This second, 'downstream'
		      promise is resolved with the return value of the first promise's fulfillment
		      or rejection handler, or rejected if the handler throws an exception.
	
		      ```js
		      findUser().then(function (user) {
		        return user.name;
		      }, function (reason) {
		        return 'default name';
		      }).then(function (userName) {
		        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
		        // will be `'default name'`
		      });
	
		      findUser().then(function (user) {
		        throw new Error('Found user, but still unhappy');
		      }, function (reason) {
		        throw new Error('`findUser` rejected and we're unhappy');
		      }).then(function (value) {
		        // never reached
		      }, function (reason) {
		        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
		        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
		      });
		      ```
		      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
		      ```js
		      findUser().then(function (user) {
		        throw new PedagogicalException('Upstream error');
		      }).then(function (value) {
		        // never reached
		      }).then(function (value) {
		        // never reached
		      }, function (reason) {
		        // The `PedgagocialException` is propagated all the way down to here
		      });
		      ```
	
		      Assimilation
		      ------------
	
		      Sometimes the value you want to propagate to a downstream promise can only be
		      retrieved asynchronously. This can be achieved by returning a promise in the
		      fulfillment or rejection handler. The downstream promise will then be pending
		      until the returned promise is settled. This is called *assimilation*.
	
		      ```js
		      findUser().then(function (user) {
		        return findCommentsByAuthor(user);
		      }).then(function (comments) {
		        // The user's comments are now available
		      });
		      ```
	
		      If the assimliated promise rejects, then the downstream promise will also reject.
	
		      ```js
		      findUser().then(function (user) {
		        return findCommentsByAuthor(user);
		      }).then(function (comments) {
		        // If `findCommentsByAuthor` fulfills, we'll have the value here
		      }, function (reason) {
		        // If `findCommentsByAuthor` rejects, we'll have the reason here
		      });
		      ```
	
		      Simple Example
		      --------------
	
		      Synchronous Example
	
		      ```javascript
		      var result;
	
		      try {
		        result = findResult();
		        // success
		      } catch(reason) {
		        // failure
		      }
		      ```
	
		      Errback Example
	
		      ```js
		      findResult(function(result, err){
		        if (err) {
		          // failure
		        } else {
		          // success
		        }
		      });
		      ```
	
		      Promise Example;
	
		      ```javascript
		      findResult().then(function(result){
		        // success
		      }, function(reason){
		        // failure
		      });
		      ```
	
		      Advanced Example
		      --------------
	
		      Synchronous Example
	
		      ```javascript
		      var author, books;
	
		      try {
		        author = findAuthor();
		        books  = findBooksByAuthor(author);
		        // success
		      } catch(reason) {
		        // failure
		      }
		      ```
	
		      Errback Example
	
		      ```js
	
		      function foundBooks(books) {
	
		      }
	
		      function failure(reason) {
	
		      }
	
		      findAuthor(function(author, err){
		        if (err) {
		          failure(err);
		          // failure
		        } else {
		          try {
		            findBoooksByAuthor(author, function(books, err) {
		              if (err) {
		                failure(err);
		              } else {
		                try {
		                  foundBooks(books);
		                } catch(reason) {
		                  failure(reason);
		                }
		              }
		            });
		          } catch(error) {
		            failure(err);
		          }
		          // success
		        }
		      });
		      ```
	
		      Promise Example;
	
		      ```javascript
		      findAuthor().
		        then(findBooksByAuthor).
		        then(function(books){
		          // found books
		      }).catch(function(reason){
		        // something went wrong
		      });
		      ```
	
		      @method then
		      @param {Function} onFulfilled
		      @param {Function} onRejected
		      Useful for tooling.
		      @return {Promise}
		    */
		      then: function(onFulfillment, onRejection) {
		        var parent = this;
		        var state = parent._state;
	
		        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
		          return this;
		        }
	
		        var child = new this.constructor(lib$es6$promise$$internal$$noop);
		        var result = parent._result;
	
		        if (state) {
		          var callback = arguments[state - 1];
		          lib$es6$promise$asap$$asap(function(){
		            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
		          });
		        } else {
		          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
		        }
	
		        return child;
		      },
	
		    /**
		      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
		      as the catch block of a try/catch statement.
	
		      ```js
		      function findAuthor(){
		        throw new Error('couldn't find that author');
		      }
	
		      // synchronous
		      try {
		        findAuthor();
		      } catch(reason) {
		        // something went wrong
		      }
	
		      // async with promises
		      findAuthor().catch(function(reason){
		        // something went wrong
		      });
		      ```
	
		      @method catch
		      @param {Function} onRejection
		      Useful for tooling.
		      @return {Promise}
		    */
		      'catch': function(onRejection) {
		        return this.then(null, onRejection);
		      }
		    };
		    function lib$es6$promise$polyfill$$polyfill() {
		      var local;
	
		      if (typeof global !== 'undefined') {
		          local = global;
		      } else if (typeof self !== 'undefined') {
		          local = self;
		      } else {
		          try {
		              local = Function('return this')();
		          } catch (e) {
		              throw new Error('polyfill failed because global object is unavailable in this environment');
		          }
		      }
	
		      var P = local.Promise;
	
		      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
		        return;
		      }
	
		      local.Promise = lib$es6$promise$promise$$default;
		    }
		    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
		    var lib$es6$promise$umd$$ES6Promise = {
		      'Promise': lib$es6$promise$promise$$default,
		      'polyfill': lib$es6$promise$polyfill$$default
		    };
	
		    /* global define:true module:true window: true */
		    if ("function" === 'function' && __webpack_require__(5)['amd']) {
		      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		    } else if (typeof module !== 'undefined' && module['exports']) {
		      module['exports'] = lib$es6$promise$umd$$ES6Promise;
		    } else if (typeof this !== 'undefined') {
		      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
		    }
	
		    lib$es6$promise$polyfill$$default();
		}).call(this);
	
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)(module)))
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		module.exports = function(module) {
			if(!module.webpackPolyfill) {
				module.deprecate = function() {};
				module.paths = [];
				// module.parent = undefined by default
				module.children = [];
				module.webpackPolyfill = 1;
			}
			return module;
		}
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		/* (ignored) */
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		module.exports = function() { throw new Error("define cannot be used indirect"); };
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
		var promise = __webpack_require__(8);
		var deprecated = {};
		function deprecatedWarning(key, text) {
		    if (!deprecated.hasOwnProperty(key)) {
		        deprecated[key] = true;
		        console.warn("DEPRECATION WARNING: '" + key +
		            "' is no longer supported and will be removed in next major release. " + text);
		    }
		}
		var Zone = (function () {
		    function Zone(parentZone, data) {
		        this.parent = null;
		        // onError is used to override error handling.
		        // When a custom error handler is provided, it should most probably rethrow the exception
		        // not to break the expected control flow:
		        //
		        // `promise.then(fnThatThrows).catch(fn);`
		        //
		        // When this code is executed in a zone with a custom onError handler that doesn't rethrow, the
		        // `.catch()` branch will not be taken as the `fnThatThrows` exception will be swallowed by the
		        // handler.
		        this.onError = null;
		        var zone = (arguments.length) ? Object.create(parentZone) : this;
		        zone.parent = parentZone || null;
		        Object.keys(data || {}).forEach(function (property) {
		            var _property = property.substr(1);
		            // augment the new zone with a hook decorates the parent's hook
		            if (property[0] === '$') {
		                zone[_property] = data[property](parentZone[_property] || function () { });
		            }
		            else if (property[0] === '+') {
		                if (parentZone[_property]) {
		                    zone[_property] = function () {
		                        var result = parentZone[_property].apply(this, arguments);
		                        data[property].apply(this, arguments);
		                        return result;
		                    };
		                }
		                else {
		                    zone[_property] = data[property];
		                }
		            }
		            else if (property[0] === '-') {
		                if (parentZone[_property]) {
		                    zone[_property] = function () {
		                        data[property].apply(this, arguments);
		                        return parentZone[_property].apply(this, arguments);
		                    };
		                }
		                else {
		                    zone[_property] = data[property];
		                }
		            }
		            else {
		                zone[property] = (typeof data[property] === 'object') ?
		                    JSON.parse(JSON.stringify(data[property])) :
		                    data[property];
		            }
		        });
		        zone.$id = Zone.nextId++;
		        return zone;
		    }
		    Zone.prototype.fork = function (locals) {
		        this.onZoneCreated();
		        return new Zone(this, locals);
		    };
		    Zone.prototype.bind = function (fn, skipEnqueue) {
		        if (typeof fn !== 'function') {
		            throw new Error('Expecting function got: ' + fn);
		        }
		        skipEnqueue || this.enqueueTask(fn);
		        var zone = this.isRootZone() ? this : this.fork();
		        return function zoneBoundFn() {
		            return zone.run(fn, this, arguments);
		        };
		    };
		    /// @deprecated
		    Zone.prototype.bindOnce = function (fn) {
		        deprecatedWarning('bindOnce', 'There is no replacement.');
		        var boundZone = this;
		        return this.bind(function () {
		            var result = fn.apply(this, arguments);
		            boundZone.dequeueTask(fn);
		            return result;
		        });
		    };
		    Zone.prototype.isRootZone = function () {
		        return this.parent === null;
		    };
		    Zone.prototype.run = function (fn, applyTo, applyWith) {
		        applyWith = applyWith || [];
		        var oldZone = global.zone;
		        // MAKE THIS ZONE THE CURRENT ZONE
		        global.zone = this;
		        try {
		            this.beforeTask();
		            return fn.apply(applyTo, applyWith);
		        }
		        catch (e) {
		            if (this.onError) {
		                this.onError(e);
		            }
		            else {
		                throw e;
		            }
		        }
		        finally {
		            this.afterTask();
		            // REVERT THE CURRENT ZONE BACK TO THE ORIGINAL ZONE
		            global.zone = oldZone;
		        }
		    };
		    Zone.prototype.beforeTask = function () { };
		    Zone.prototype.onZoneCreated = function () { };
		    Zone.prototype.afterTask = function () { };
		    Zone.prototype.enqueueTask = function (fn) {
		        deprecatedWarning('enqueueTask', 'Use addTask/addRepeatingTask/addMicroTask');
		    };
		    Zone.prototype.dequeueTask = function (fn) {
		        deprecatedWarning('dequeueTask', 'Use removeTask/removeRepeatingTask/removeMicroTask');
		    };
		    Zone.prototype.addTask = function (taskFn) { this.enqueueTask(taskFn); };
		    Zone.prototype.removeTask = function (taskFn) { this.dequeueTask(taskFn); };
		    Zone.prototype.addRepeatingTask = function (taskFn) { this.enqueueTask(taskFn); };
		    Zone.prototype.removeRepeatingTask = function (taskFn) { this.dequeueTask(taskFn); };
		    Zone.prototype.addMicrotask = function (taskFn) { this.enqueueTask(taskFn); };
		    Zone.prototype.removeMicrotask = function (taskFn) { this.dequeueTask(taskFn); };
		    Zone.prototype.addEventListener = function () {
		        return this[keys.common.addEventListener].apply(this, arguments);
		    };
		    Zone.prototype.removeEventListener = function () {
		        return this[keys.common.removeEventListener].apply(this, arguments);
		    };
		    // Root zone ID === 1
		    Zone.nextId = 1;
		    Zone.bindPromiseFn = promise.bindPromiseFn;
		    return Zone;
		})();
		exports.Zone = Zone;
		;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlLnRzIl0sIm5hbWVzIjpbImRlcHJlY2F0ZWRXYXJuaW5nIiwiWm9uZSIsIlpvbmUuY29uc3RydWN0b3IiLCJab25lLmZvcmsiLCJab25lLmJpbmQiLCJab25lLmJpbmQuem9uZUJvdW5kRm4iLCJab25lLmJpbmRPbmNlIiwiWm9uZS5pc1Jvb3Rab25lIiwiWm9uZS5ydW4iLCJab25lLmJlZm9yZVRhc2siLCJab25lLm9uWm9uZUNyZWF0ZWQiLCJab25lLmFmdGVyVGFzayIsIlpvbmUuZW5xdWV1ZVRhc2siLCJab25lLmRlcXVldWVUYXNrIiwiWm9uZS5hZGRUYXNrIiwiWm9uZS5yZW1vdmVUYXNrIiwiWm9uZS5hZGRSZXBlYXRpbmdUYXNrIiwiWm9uZS5yZW1vdmVSZXBlYXRpbmdUYXNrIiwiWm9uZS5hZGRNaWNyb3Rhc2siLCJab25lLnJlbW92ZU1pY3JvdGFzayIsIlpvbmUuYWRkRXZlbnRMaXN0ZW5lciIsIlpvbmUucmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxJQUFJLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDL0IsSUFBWSxPQUFPLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUUzQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFcEIsMkJBQTJCLEdBQUcsRUFBRSxJQUFJO0lBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDdkJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLHdCQUF3QkEsR0FBR0EsR0FBR0E7WUFDdkNBLHNFQUFzRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckZBLENBQUNBO0FBQ0hBLENBQUNBO0FBRUQ7SUFRRUMsY0FBWUEsVUFBV0EsRUFBRUEsSUFBS0E7UUFGOUJDLFdBQU1BLEdBQVNBLElBQUlBLENBQUNBO1FBMEdwQkEsOENBQThDQTtRQUM5Q0EseUZBQXlGQTtRQUN6RkEsMENBQTBDQTtRQUMxQ0EsRUFBRUE7UUFDRkEsMENBQTBDQTtRQUMxQ0EsRUFBRUE7UUFDRkEsK0ZBQStGQTtRQUMvRkEsK0ZBQStGQTtRQUMvRkEsV0FBV0E7UUFDWEEsWUFBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFoSGJBLElBQUlBLElBQUlBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBRWpFQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtRQUVqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBU0EsUUFBUUE7WUFFL0MsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQywrREFBK0Q7WUFDL0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWEsQ0FBQyxDQUFDLENBQUM7WUFHNUUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO3dCQUNoQixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLENBQUMsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFHSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUc7d0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFHSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDO29CQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDQSxDQUFDQTtRQUVIQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFTQSxJQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtRQUVoQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFFREQsbUJBQUlBLEdBQUpBLFVBQUtBLE1BQU9BO1FBQ1ZFLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO1FBQ3JCQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFFREYsbUJBQUlBLEdBQUpBLFVBQUtBLEVBQUVBLEVBQUVBLFdBQVlBO1FBQ25CRyxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxLQUFLQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsMEJBQTBCQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7UUFDREEsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDcENBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2xEQSxNQUFNQSxDQUFDQTtZQUNMQyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN2Q0EsQ0FBQ0EsQ0FBQ0Q7SUFDSkEsQ0FBQ0E7SUFFREgsZUFBZUE7SUFDZkEsdUJBQVFBLEdBQVJBLFVBQVNBLEVBQUVBO1FBQ1RLLGlCQUFpQkEsQ0FBQ0EsVUFBVUEsRUFBRUEsMEJBQTBCQSxDQUFDQSxDQUFDQTtRQUMxREEsSUFBSUEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDckJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFREwseUJBQVVBLEdBQVZBO1FBQ0VNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEtBQUtBLElBQUlBLENBQUNBO0lBQzlCQSxDQUFDQTtJQUVETixrQkFBR0EsR0FBSEEsVUFBSUEsRUFBRUEsRUFBRUEsT0FBUUEsRUFBRUEsU0FBVUE7UUFDMUJPLFNBQVNBLEdBQUdBLFNBQVNBLElBQUlBLEVBQUVBLENBQUNBO1FBRTVCQSxJQUFJQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUUxQkEsa0NBQWtDQTtRQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFbkJBLElBQUlBLENBQUNBO1lBQ0hBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1lBQ2xCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN0Q0EsQ0FBRUE7UUFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsQkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBO1FBQ0hBLENBQUNBO2dCQUFTQSxDQUFDQTtZQUNUQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNqQkEsb0RBQW9EQTtZQUNwREEsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDeEJBLENBQUNBO0lBQ0hBLENBQUNBO0lBWURQLHlCQUFVQSxHQUFWQSxjQUFjUSxDQUFDQTtJQUNmUiw0QkFBYUEsR0FBYkEsY0FBaUJTLENBQUNBO0lBQ2xCVCx3QkFBU0EsR0FBVEEsY0FBYVUsQ0FBQ0E7SUFFZFYsMEJBQVdBLEdBQVhBLFVBQVlBLEVBQVlBO1FBQ3RCVyxpQkFBaUJBLENBQUNBLGFBQWFBLEVBQUVBLDJDQUEyQ0EsQ0FBQ0EsQ0FBQ0E7SUFDaEZBLENBQUNBO0lBQ0RYLDBCQUFXQSxHQUFYQSxVQUFZQSxFQUFZQTtRQUN0QlksaUJBQWlCQSxDQUFDQSxhQUFhQSxFQUFFQSxvREFBb0RBLENBQUNBLENBQUNBO0lBQ3pGQSxDQUFDQTtJQUVEWixzQkFBT0EsR0FBUEEsVUFBUUEsTUFBTUEsSUFBSWEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDN0NiLHlCQUFVQSxHQUFWQSxVQUFXQSxNQUFNQSxJQUFJYyxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVoRGQsK0JBQWdCQSxHQUFoQkEsVUFBaUJBLE1BQU1BLElBQUllLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3REZixrQ0FBbUJBLEdBQW5CQSxVQUFvQkEsTUFBTUEsSUFBSWdCLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXpEaEIsMkJBQVlBLEdBQVpBLFVBQWFBLE1BQU1BLElBQUlpQixJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNsRGpCLDhCQUFlQSxHQUFmQSxVQUFnQkEsTUFBTUEsSUFBSWtCLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXJEbEIsK0JBQWdCQSxHQUFoQkE7UUFDRW1CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDbkVBLENBQUNBO0lBRURuQixrQ0FBbUJBLEdBQW5CQTtRQUNFb0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUN0RUEsQ0FBQ0E7SUFuSkRwQixxQkFBcUJBO0lBQ2RBLFdBQU1BLEdBQUdBLENBQUNBLENBQUNBO0lBQ1hBLGtCQUFhQSxHQUFHQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQTtJQWtKL0NBLFdBQUNBO0FBQURBLENBQUNBLEFBckpELElBcUpDO0FBckpZLFlBQUksT0FxSmhCLENBQUE7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMga2V5cyBmcm9tICcuL2tleXMnO1xuaW1wb3J0ICogYXMgcHJvbWlzZSBmcm9tICcuL3BhdGNoL3Byb21pc2UnO1xuXG52YXIgZGVwcmVjYXRlZCA9IHt9O1xuXG5mdW5jdGlvbiBkZXByZWNhdGVkV2FybmluZyhrZXksIHRleHQpIHtcbiAgaWYgKCFkZXByZWNhdGVkLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBkZXByZWNhdGVkW2tleV0gPSB0cnVlO1xuICAgIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6ICdcIiArIGtleSArXG4gICAgICAgIFwiJyBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gbmV4dCBtYWpvciByZWxlYXNlLiBcIiArIHRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lIHtcbiAgLy8gUm9vdCB6b25lIElEID09PSAxXG4gIHN0YXRpYyBuZXh0SWQgPSAxO1xuICBzdGF0aWMgYmluZFByb21pc2VGbiA9IHByb21pc2UuYmluZFByb21pc2VGbjtcblxuXG4gIHBhcmVudDogWm9uZSA9IG51bGw7XG4gICRpZDogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihwYXJlbnRab25lPywgZGF0YT8pIHtcbiAgICB2YXIgem9uZSA9IChhcmd1bWVudHMubGVuZ3RoKSA/IE9iamVjdC5jcmVhdGUocGFyZW50Wm9uZSkgOiB0aGlzO1xuXG4gICAgem9uZS5wYXJlbnQgPSBwYXJlbnRab25lIHx8IG51bGw7XG5cbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5cbiAgICAgIHZhciBfcHJvcGVydHkgPSBwcm9wZXJ0eS5zdWJzdHIoMSk7XG5cbiAgICAgIC8vIGF1Z21lbnQgdGhlIG5ldyB6b25lIHdpdGggYSBob29rIGRlY29yYXRlcyB0aGUgcGFyZW50J3MgaG9va1xuICAgICAgaWYgKHByb3BlcnR5WzBdID09PSAnJCcpIHtcbiAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV0ocGFyZW50Wm9uZVtfcHJvcGVydHldIHx8IGZ1bmN0aW9uICgpIHt9KTtcblxuICAgICAgLy8gYXVnbWVudCB0aGUgbmV3IHpvbmUgd2l0aCBhIGhvb2sgdGhhdCBydW5zIGFmdGVyIHRoZSBwYXJlbnQncyBob29rXG4gICAgICB9IGVsc2UgaWYgKHByb3BlcnR5WzBdID09PSAnKycpIHtcbiAgICAgICAgaWYgKHBhcmVudFpvbmVbX3Byb3BlcnR5XSkge1xuICAgICAgICAgIHpvbmVbX3Byb3BlcnR5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwYXJlbnRab25lW19wcm9wZXJ0eV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGRhdGFbcHJvcGVydHldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIH1cblxuICAgICAgLy8gYXVnbWVudCB0aGUgbmV3IHpvbmUgd2l0aCBhIGhvb2sgdGhhdCBydW5zIGJlZm9yZSB0aGUgcGFyZW50J3MgaG9va1xuICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eVswXSA9PT0gJy0nKSB7XG4gICAgICAgIGlmIChwYXJlbnRab25lW19wcm9wZXJ0eV0pIHtcbiAgICAgICAgICB6b25lW19wcm9wZXJ0eV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkYXRhW3Byb3BlcnR5XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudFpvbmVbX3Byb3BlcnR5XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBuZXcgem9uZSdzIGhvb2sgKHJlcGxhY2luZyB0aGUgcGFyZW50IHpvbmUncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHpvbmVbcHJvcGVydHldID0gKHR5cGVvZiBkYXRhW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhW3Byb3BlcnR5XSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB6b25lLiRpZCA9ICg8YW55PlpvbmUpLm5leHRJZCsrO1xuXG4gICAgcmV0dXJuIHpvbmU7XG4gIH1cblxuICBmb3JrKGxvY2Fscz8pIHtcbiAgICB0aGlzLm9uWm9uZUNyZWF0ZWQoKTtcbiAgICByZXR1cm4gbmV3IFpvbmUodGhpcywgbG9jYWxzKTtcbiAgfVxuXG4gIGJpbmQoZm4sIHNraXBFbnF1ZXVlPykge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0aW5nIGZ1bmN0aW9uIGdvdDogJyArIGZuKTtcbiAgICB9XG4gICAgc2tpcEVucXVldWUgfHwgdGhpcy5lbnF1ZXVlVGFzayhmbik7XG4gICAgdmFyIHpvbmUgPSB0aGlzLmlzUm9vdFpvbmUoKSA/IHRoaXMgOiB0aGlzLmZvcmsoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gem9uZUJvdW5kRm4oKSB7XG4gICAgICByZXR1cm4gem9uZS5ydW4oZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vLyBAZGVwcmVjYXRlZFxuICBiaW5kT25jZShmbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdiaW5kT25jZScsICdUaGVyZSBpcyBubyByZXBsYWNlbWVudC4nKTtcbiAgICB2YXIgYm91bmRab25lID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgYm91bmRab25lLmRlcXVldWVUYXNrKGZuKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gIH1cblxuICBpc1Jvb3Rab25lKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gbnVsbDtcbiAgfVxuXG4gIHJ1bihmbiwgYXBwbHlUbz8sIGFwcGx5V2l0aD8pIHtcbiAgICBhcHBseVdpdGggPSBhcHBseVdpdGggfHwgW107XG5cbiAgICB2YXIgb2xkWm9uZSA9IGdsb2JhbC56b25lO1xuXG4gICAgLy8gTUFLRSBUSElTIFpPTkUgVEhFIENVUlJFTlQgWk9ORVxuICAgIGdsb2JhbC56b25lID0gdGhpcztcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmJlZm9yZVRhc2soKTtcbiAgICAgIHJldHVybiBmbi5hcHBseShhcHBseVRvLCBhcHBseVdpdGgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5hZnRlclRhc2soKTtcbiAgICAgIC8vIFJFVkVSVCBUSEUgQ1VSUkVOVCBaT05FIEJBQ0sgVE8gVEhFIE9SSUdJTkFMIFpPTkVcbiAgICAgIGdsb2JhbC56b25lID0gb2xkWm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBvbkVycm9yIGlzIHVzZWQgdG8gb3ZlcnJpZGUgZXJyb3IgaGFuZGxpbmcuXG4gIC8vIFdoZW4gYSBjdXN0b20gZXJyb3IgaGFuZGxlciBpcyBwcm92aWRlZCwgaXQgc2hvdWxkIG1vc3QgcHJvYmFibHkgcmV0aHJvdyB0aGUgZXhjZXB0aW9uXG4gIC8vIG5vdCB0byBicmVhayB0aGUgZXhwZWN0ZWQgY29udHJvbCBmbG93OlxuICAvL1xuICAvLyBgcHJvbWlzZS50aGVuKGZuVGhhdFRocm93cykuY2F0Y2goZm4pO2BcbiAgLy9cbiAgLy8gV2hlbiB0aGlzIGNvZGUgaXMgZXhlY3V0ZWQgaW4gYSB6b25lIHdpdGggYSBjdXN0b20gb25FcnJvciBoYW5kbGVyIHRoYXQgZG9lc24ndCByZXRocm93LCB0aGVcbiAgLy8gYC5jYXRjaCgpYCBicmFuY2ggd2lsbCBub3QgYmUgdGFrZW4gYXMgdGhlIGBmblRoYXRUaHJvd3NgIGV4Y2VwdGlvbiB3aWxsIGJlIHN3YWxsb3dlZCBieSB0aGVcbiAgLy8gaGFuZGxlci5cbiAgb25FcnJvciA9IG51bGw7XG4gIGJlZm9yZVRhc2soKSB7fVxuICBvblpvbmVDcmVhdGVkKCkge31cbiAgYWZ0ZXJUYXNrKCkge31cbiAgXG4gIGVucXVldWVUYXNrKGZuOiBGdW5jdGlvbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdlbnF1ZXVlVGFzaycsICdVc2UgYWRkVGFzay9hZGRSZXBlYXRpbmdUYXNrL2FkZE1pY3JvVGFzaycpO1xuICB9XG4gIGRlcXVldWVUYXNrKGZuOiBGdW5jdGlvbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdkZXF1ZXVlVGFzaycsICdVc2UgcmVtb3ZlVGFzay9yZW1vdmVSZXBlYXRpbmdUYXNrL3JlbW92ZU1pY3JvVGFzaycpO1xuICB9XG5cbiAgYWRkVGFzayh0YXNrRm4pIHsgdGhpcy5lbnF1ZXVlVGFzayh0YXNrRm4pOyB9XG4gIHJlbW92ZVRhc2sodGFza0ZuKSB7IHRoaXMuZGVxdWV1ZVRhc2sodGFza0ZuKTsgfVxuXG4gIGFkZFJlcGVhdGluZ1Rhc2sodGFza0ZuKSB7IHRoaXMuZW5xdWV1ZVRhc2sodGFza0ZuKTsgfVxuICByZW1vdmVSZXBlYXRpbmdUYXNrKHRhc2tGbikgeyB0aGlzLmRlcXVldWVUYXNrKHRhc2tGbik7IH1cblxuICBhZGRNaWNyb3Rhc2sodGFza0ZuKSB7IHRoaXMuZW5xdWV1ZVRhc2sodGFza0ZuKTsgfVxuICByZW1vdmVNaWNyb3Rhc2sodGFza0ZuKSB7IHRoaXMuZGVxdWV1ZVRhc2sodGFza0ZuKTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNba2V5cy5jb21tb24uYWRkRXZlbnRMaXN0ZW5lcl0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNba2V5cy5jb21tb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcl0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufTtcblxuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		/**
		 * Creates keys for `private` properties on exposed objects to minimize interactions with other codebases.
		 */
		function create(name) {
		    // `Symbol` implementation is broken in Chrome 39.0.2171, do not use them even if they are available
		    return '_zone$' + name;
		}
		exports.create = create;
		exports.common = {
		    addEventListener: create('addEventListener'),
		    removeEventListener: create('removeEventListener')
		};
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9rZXlzLnRzIl0sIm5hbWVzIjpbImNyZWF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxnQkFBdUIsSUFBSTtJQUN6QkEsb0dBQW9HQTtJQUNwR0EsTUFBTUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0E7QUFDekJBLENBQUNBO0FBSGUsY0FBTSxTQUdyQixDQUFBO0FBRVUsY0FBTSxHQUFHO0lBQ2xCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QyxtQkFBbUIsRUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUM7Q0FDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlcyBrZXlzIGZvciBgcHJpdmF0ZWAgcHJvcGVydGllcyBvbiBleHBvc2VkIG9iamVjdHMgdG8gbWluaW1pemUgaW50ZXJhY3Rpb25zIHdpdGggb3RoZXIgY29kZWJhc2VzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUobmFtZSkge1xuICAvLyBgU3ltYm9sYCBpbXBsZW1lbnRhdGlvbiBpcyBicm9rZW4gaW4gQ2hyb21lIDM5LjAuMjE3MSwgZG8gbm90IHVzZSB0aGVtIGV2ZW4gaWYgdGhleSBhcmUgYXZhaWxhYmxlXG4gIHJldHVybiAnX3pvbmUkJyArIG5hbWU7XG59XG5cbmV4cG9ydCB2YXIgY29tbW9uID0ge1xuICBhZGRFdmVudExpc3RlbmVyOiBjcmVhdGUoJ2FkZEV2ZW50TGlzdGVuZXInKSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogY3JlYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbn07XG4iXX0=
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
		if (global.Promise) {
		    exports.bindPromiseFn = function (delegate) {
		        return function () {
		            var delegatePromise = delegate.apply(this, arguments);
		            // if the delegate returned an instance of Promise, forward it.
		            if (delegatePromise instanceof Promise) {
		                return delegatePromise;
		            }
		            // Otherwise wrap the Promise-like in a global Promise
		            return new Promise(function (resolve, reject) {
		                delegatePromise.then(resolve, reject);
		            });
		        };
		    };
		}
		else {
		    exports.bindPromiseFn = function (delegate) {
		        return function () {
		            return _patchThenable(delegate.apply(this, arguments));
		        };
		    };
		}
		function _patchPromiseFnsOnObject(objectPath, fnNames) {
		    var obj = global;
		    var exists = objectPath.every(function (segment) {
		        obj = obj[segment];
		        return obj;
		    });
		    if (!exists) {
		        return;
		    }
		    fnNames.forEach(function (name) {
		        var fn = obj[name];
		        if (fn) {
		            obj[name] = exports.bindPromiseFn(fn);
		        }
		    });
		}
		function _patchThenable(thenable) {
		    var then = thenable.then;
		    thenable.then = function () {
		        var args = utils.bindArguments(arguments);
		        var nextThenable = then.apply(thenable, args);
		        return _patchThenable(nextThenable);
		    };
		    var ocatch = thenable.catch;
		    thenable.catch = function () {
		        var args = utils.bindArguments(arguments);
		        var nextThenable = ocatch.apply(thenable, args);
		        return _patchThenable(nextThenable);
		    };
		    return thenable;
		}
		function apply() {
		    // Patch .then() and .catch() on native Promises to execute callbacks in the zone where
		    // those functions are called.
		    if (global.Promise) {
		        utils.patchPrototype(Promise.prototype, [
		            'then',
		            'catch'
		        ]);
		        // Patch browser APIs that return a Promise
		        var patchFns = [
		            // fetch
		            [[], ['fetch']],
		            [['Response', 'prototype'], ['arrayBuffer', 'blob', 'json', 'text']]
		        ];
		        patchFns.forEach(function (objPathAndFns) {
		            _patchPromiseFnsOnObject(objPathAndFns[0], objPathAndFns[1]);
		        });
		    }
		}
		exports.apply = apply;
		module.exports = {
		    apply: apply,
		    bindPromiseFn: exports.bindPromiseFn
		};
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9wcm9taXNlLnRzIl0sIm5hbWVzIjpbIl9wYXRjaFByb21pc2VGbnNPbk9iamVjdCIsIl9wYXRjaFRoZW5hYmxlIiwiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBdUJsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQixxQkFBYSxHQUFHLFVBQVUsUUFBUTtRQUNoQyxNQUFNLENBQUM7WUFDTCxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV0RCwrREFBK0Q7WUFDL0QsRUFBRSxDQUFDLENBQUMsZUFBZSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDekIsQ0FBQztZQUVELHNEQUFzRDtZQUN0RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtnQkFDekMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixxQkFBYSxHQUFHLFVBQVUsUUFBUTtRQUNoQyxNQUFNLENBQUM7WUFDTCxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUdELGtDQUFrQyxVQUFVLEVBQUUsT0FBTztJQUNuREEsSUFBSUEsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFFakJBLElBQUlBLE1BQU1BLEdBQUdBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLE9BQU9BO1FBQzdDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFFSEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWkEsTUFBTUEsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsSUFBSUE7UUFDNUIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDQSxDQUFDQTtBQUNMQSxDQUFDQTtBQUVELHdCQUF3QixRQUFRO0lBQzlCQyxJQUFJQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUN6QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0E7UUFDZCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxNQUFNQSxHQUFHQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUM1QkEsUUFBUUEsQ0FBQ0EsS0FBS0EsR0FBR0E7UUFDZixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtBQUNsQkEsQ0FBQ0E7QUFHRDtJQUNFQyx1RkFBdUZBO0lBQ3ZGQSw4QkFBOEJBO0lBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQkEsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUE7WUFDdENBLE1BQU1BO1lBQ05BLE9BQU9BO1NBQ1JBLENBQUNBLENBQUNBO1FBRUhBLDJDQUEyQ0E7UUFDM0NBLElBQUlBLFFBQVFBLEdBQUdBO1lBQ2JBLFFBQVFBO1lBQ1JBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2ZBLENBQUNBLENBQUNBLFVBQVVBLEVBQUVBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLGFBQWFBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1NBQ3JFQSxDQUFDQTtRQUVGQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFTQSxhQUFhQTtZQUNyQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtBQUNIQSxDQUFDQTtBQXBCZSxhQUFLLFFBb0JwQixDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEtBQUssRUFBRSxLQUFLO0lBQ1osYUFBYSxFQUFFLHFCQUFhO0NBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbi8qXG4gKiBQYXRjaGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZS1saWtlIGluc3RhbmNlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gbXVzdCBiZSB1c2VkIHdoZW4gZWl0aGVyOlxuICogLSBOYXRpdmUgUHJvbWlzZXMgYXJlIG5vdCBhdmFpbGFibGUsXG4gKiAtIFRoZSBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS1saWtlIG9iamVjdC5cbiAqXG4gKiBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2Ugem9uZXMgcmVseSBvbiBhIFByb21pc2UgbW9ua2V5IHBhdGNoIHRoYXQgY291bGQgbm90IGJlIGFwcGxpZWQgd2hlblxuICogUHJvbWlzZSBpcyBub3QgbmF0aXZlbHkgYXZhaWxhYmxlIG9yIHdoZW4gdGhlIHJldHVybmVkIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUHJvbWlzZS5cbiAqXG4gKiBOb3RlIHRoYXQgY2FsbGluZyBgYmluZFByb21pc2VGbmAgb24gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBuYXRpdmUgUHJvbWlzZSB3aWxsIGFsc28gd29ya1xuICogd2l0aCBtaW5pbWFsIG92ZXJoZWFkLlxuICpcbiAqIGBgYFxuICogdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kUHJvbWlzZUZuKEZ1bmN0aW9uUmV0dXJuaW5nQVByb21pc2UpO1xuICpcbiAqIGJvdW5kRnVuY3Rpb24udGhlbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKTtcbiAqIGBgYFxuICovXG5leHBvcnQgdmFyIGJpbmRQcm9taXNlRm47XG5cbmlmIChnbG9iYWwuUHJvbWlzZSkge1xuICBiaW5kUHJvbWlzZUZuID0gZnVuY3Rpb24gKGRlbGVnYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlbGVnYXRlUHJvbWlzZSA9IGRlbGVnYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgIC8vIGlmIHRoZSBkZWxlZ2F0ZSByZXR1cm5lZCBhbiBpbnN0YW5jZSBvZiBQcm9taXNlLCBmb3J3YXJkIGl0LlxuICAgICAgaWYgKGRlbGVnYXRlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGRlbGVnYXRlUHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHdyYXAgdGhlIFByb21pc2UtbGlrZSBpbiBhIGdsb2JhbCBQcm9taXNlXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGRlbGVnYXRlUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufSBlbHNlIHtcbiAgYmluZFByb21pc2VGbiA9IGZ1bmN0aW9uIChkZWxlZ2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3BhdGNoVGhlbmFibGUoZGVsZWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBfcGF0Y2hQcm9taXNlRm5zT25PYmplY3Qob2JqZWN0UGF0aCwgZm5OYW1lcykge1xuICB2YXIgb2JqID0gZ2xvYmFsO1xuXG4gIHZhciBleGlzdHMgPSBvYmplY3RQYXRoLmV2ZXJ5KGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgb2JqID0gb2JqW3NlZ21lbnRdO1xuICAgIHJldHVybiBvYmo7XG4gIH0pO1xuXG4gIGlmICghZXhpc3RzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm5OYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGZuID0gb2JqW25hbWVdO1xuICAgIGlmIChmbikge1xuICAgICAgb2JqW25hbWVdID0gYmluZFByb21pc2VGbihmbik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX3BhdGNoVGhlbmFibGUodGhlbmFibGUpIHtcbiAgdmFyIHRoZW4gPSB0aGVuYWJsZS50aGVuO1xuICB0aGVuYWJsZS50aGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gdXRpbHMuYmluZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgIHZhciBuZXh0VGhlbmFibGUgPSB0aGVuLmFwcGx5KHRoZW5hYmxlLCBhcmdzKTtcbiAgICByZXR1cm4gX3BhdGNoVGhlbmFibGUobmV4dFRoZW5hYmxlKTtcbiAgfTtcblxuICB2YXIgb2NhdGNoID0gdGhlbmFibGUuY2F0Y2g7XG4gIHRoZW5hYmxlLmNhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gdXRpbHMuYmluZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgIHZhciBuZXh0VGhlbmFibGUgPSBvY2F0Y2guYXBwbHkodGhlbmFibGUsIGFyZ3MpO1xuICAgIHJldHVybiBfcGF0Y2hUaGVuYWJsZShuZXh0VGhlbmFibGUpO1xuICB9O1xuXG4gIHJldHVybiB0aGVuYWJsZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIC8vIFBhdGNoIC50aGVuKCkgYW5kIC5jYXRjaCgpIG9uIG5hdGl2ZSBQcm9taXNlcyB0byBleGVjdXRlIGNhbGxiYWNrcyBpbiB0aGUgem9uZSB3aGVyZVxuICAvLyB0aG9zZSBmdW5jdGlvbnMgYXJlIGNhbGxlZC5cbiAgaWYgKGdsb2JhbC5Qcm9taXNlKSB7XG4gICAgdXRpbHMucGF0Y2hQcm90b3R5cGUoUHJvbWlzZS5wcm90b3R5cGUsIFtcbiAgICAgICd0aGVuJyxcbiAgICAgICdjYXRjaCdcbiAgICBdKTtcblxuICAgIC8vIFBhdGNoIGJyb3dzZXIgQVBJcyB0aGF0IHJldHVybiBhIFByb21pc2VcbiAgICB2YXIgcGF0Y2hGbnMgPSBbXG4gICAgICAvLyBmZXRjaFxuICAgICAgW1tdLCBbJ2ZldGNoJ11dLFxuICAgICAgW1snUmVzcG9uc2UnLCAncHJvdG90eXBlJ10sIFsnYXJyYXlCdWZmZXInLCAnYmxvYicsICdqc29uJywgJ3RleHQnXV1cbiAgICBdO1xuXG4gICAgcGF0Y2hGbnMuZm9yRWFjaChmdW5jdGlvbihvYmpQYXRoQW5kRm5zKSB7XG4gICAgICBfcGF0Y2hQcm9taXNlRm5zT25PYmplY3Qob2JqUGF0aEFuZEZuc1swXSwgb2JqUGF0aEFuZEZuc1sxXSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcGx5OiBhcHBseSxcbiAgYmluZFByb21pc2VGbjogYmluZFByb21pc2VGblxufTtcbiJdfQ==
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
		function bindArguments(args) {
		    for (var i = args.length - 1; i >= 0; i--) {
		        if (typeof args[i] === 'function') {
		            args[i] = global.zone.bind(args[i]);
		        }
		    }
		    return args;
		}
		exports.bindArguments = bindArguments;
		;
		function patchPrototype(obj, fnNames) {
		    fnNames.forEach(function (name) {
		        var delegate = obj[name];
		        if (delegate) {
		            obj[name] = function () {
		                return delegate.apply(this, bindArguments(arguments));
		            };
		        }
		    });
		}
		exports.patchPrototype = patchPrototype;
		;
		function isWebWorker() {
		    return (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
		}
		exports.isWebWorker = isWebWorker;
		function isNode() {
		    return (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
		}
		exports.isNode = isNode;
		function patchProperty(obj, prop) {
		    var desc = Object.getOwnPropertyDescriptor(obj, prop) || {
		        enumerable: true,
		        configurable: true
		    };
		    // A property descriptor cannot have getter/setter and be writable
		    // deleting the writable and value properties avoids this error:
		    //
		    // TypeError: property descriptors must not specify a value or be writable when a
		    // getter or setter has been specified
		    delete desc.writable;
		    delete desc.value;
		    // substr(2) cuz 'onclick' -> 'click', etc
		    var eventName = prop.substr(2);
		    var _prop = '_' + prop;
		    desc.set = function (fn) {
		        if (this[_prop]) {
		            this.removeEventListener(eventName, this[_prop]);
		        }
		        if (typeof fn === 'function') {
		            this[_prop] = fn;
		            this.addEventListener(eventName, fn, false);
		        }
		        else {
		            this[_prop] = null;
		        }
		    };
		    desc.get = function () {
		        return this[_prop];
		    };
		    Object.defineProperty(obj, prop, desc);
		}
		exports.patchProperty = patchProperty;
		;
		function patchProperties(obj, properties) {
		    (properties || (function () {
		        var props = [];
		        for (var prop in obj) {
		            props.push(prop);
		        }
		        return props;
		    }()).
		        filter(function (propertyName) {
		        return propertyName.substr(0, 2) === 'on';
		    })).
		        forEach(function (eventName) {
		        patchProperty(obj, eventName);
		    });
		}
		exports.patchProperties = patchProperties;
		;
		var originalFnKey = keys.create('originalFn');
		var boundFnsKey = keys.create('boundFns');
		function patchEventTargetMethods(obj) {
		    // This is required for the addEventListener hook on the root zone.
		    obj[keys.common.addEventListener] = obj.addEventListener;
		    obj.addEventListener = function (eventName, handler, useCapturing) {
		        //Ignore special listeners of IE11 & Edge dev tools, see https://github.com/angular/zone.js/issues/150
		        if (handler && handler.toString() !== "[object FunctionWrapper]") {
		            var eventType = eventName + (useCapturing ? '$capturing' : '$bubbling');
		            var fn;
		            if (handler.handleEvent) {
		                // Have to pass in 'handler' reference as an argument here, otherwise it gets clobbered in
		                // IE9 by the arguments[1] assignment at end of this function.
		                fn = (function (handler) {
		                    return function () {
		                        handler.handleEvent.apply(handler, arguments);
		                    };
		                })(handler);
		            }
		            else {
		                fn = handler;
		            }
		            handler[originalFnKey] = fn;
		            handler[boundFnsKey] = handler[boundFnsKey] || {};
		            handler[boundFnsKey][eventType] = handler[boundFnsKey][eventType] || global.zone.bind(fn);
		            arguments[1] = handler[boundFnsKey][eventType];
		        }
		        // - Inside a Web Worker, `this` is undefined, the context is `global` (= `self`)
		        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
		        // see https://github.com/angular/zone.js/issues/190
		        var target = this || global;
		        return global.zone.addEventListener.apply(target, arguments);
		    };
		    // This is required for the removeEventListener hook on the root zone.
		    obj[keys.common.removeEventListener] = obj.removeEventListener;
		    obj.removeEventListener = function (eventName, handler, useCapturing) {
		        var eventType = eventName + (useCapturing ? '$capturing' : '$bubbling');
		        if (handler && handler[boundFnsKey] && handler[boundFnsKey][eventType]) {
		            var _bound = handler[boundFnsKey];
		            arguments[1] = _bound[eventType];
		            delete _bound[eventType];
		            global.zone.dequeueTask(handler[originalFnKey]);
		        }
		        // - Inside a Web Worker, `this` is undefined, the context is `global`
		        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
		        // see https://github.com/angular/zone.js/issues/190
		        var target = this || global;
		        var result = global.zone.removeEventListener.apply(target, arguments);
		        return result;
		    };
		}
		exports.patchEventTargetMethods = patchEventTargetMethods;
		;
		var originalInstanceKey = keys.create('originalInstance');
		// wrap some native API on `window`
		function patchClass(className) {
		    var OriginalClass = global[className];
		    if (!OriginalClass)
		        return;
		    global[className] = function () {
		        var a = bindArguments(arguments);
		        switch (a.length) {
		            case 0:
		                this[originalInstanceKey] = new OriginalClass();
		                break;
		            case 1:
		                this[originalInstanceKey] = new OriginalClass(a[0]);
		                break;
		            case 2:
		                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
		                break;
		            case 3:
		                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
		                break;
		            case 4:
		                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
		                break;
		            default: throw new Error('what are you even doing?');
		        }
		    };
		    var instance = new OriginalClass();
		    var prop;
		    for (prop in instance) {
		        (function (prop) {
		            if (typeof instance[prop] === 'function') {
		                global[className].prototype[prop] = function () {
		                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
		                };
		            }
		            else {
		                Object.defineProperty(global[className].prototype, prop, {
		                    set: function (fn) {
		                        if (typeof fn === 'function') {
		                            this[originalInstanceKey][prop] = global.zone.bind(fn);
		                        }
		                        else {
		                            this[originalInstanceKey][prop] = fn;
		                        }
		                    },
		                    get: function () {
		                        return this[originalInstanceKey][prop];
		                    }
		                });
		            }
		        }(prop));
		    }
		    for (prop in OriginalClass) {
		        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
		            global[className][prop] = OriginalClass[prop];
		        }
		    }
		}
		exports.patchClass = patchClass;
		;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOlsiYmluZEFyZ3VtZW50cyIsInBhdGNoUHJvdG90eXBlIiwiaXNXZWJXb3JrZXIiLCJpc05vZGUiLCJwYXRjaFByb3BlcnR5IiwicGF0Y2hQcm9wZXJ0aWVzIiwicGF0Y2hFdmVudFRhcmdldE1ldGhvZHMiLCJwYXRjaENsYXNzIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLElBQUksV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUkvQix1QkFBOEIsSUFBSTtJQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDMUNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDZEEsQ0FBQ0E7QUFQZSxxQkFBYSxnQkFPNUIsQ0FBQTtBQUFBLENBQUM7QUFFRix3QkFBK0IsR0FBRyxFQUFFLE9BQU87SUFDekNDLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLElBQUlBO1FBQzVCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNWLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQyxDQUFDQSxDQUFDQTtBQUNMQSxDQUFDQTtBQVRlLHNCQUFjLGlCQVM3QixDQUFBO0FBQUEsQ0FBQztBQUVGO0lBQ0VDLE1BQU1BLENBQUNBLENBQUNBLE9BQU9BLGlCQUFpQkEsS0FBS0EsV0FBV0EsSUFBSUEsSUFBSUEsWUFBWUEsaUJBQWlCQSxDQUFDQSxDQUFDQTtBQUN6RkEsQ0FBQ0E7QUFGZSxtQkFBVyxjQUUxQixDQUFBO0FBRUQ7SUFDRUMsTUFBTUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsT0FBT0EsS0FBS0EsV0FBV0EsSUFBSUEsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtBQUM5RkEsQ0FBQ0E7QUFGZSxjQUFNLFNBRXJCLENBQUE7QUFFRCx1QkFBOEIsR0FBRyxFQUFFLElBQUk7SUFDckNDLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLHdCQUF3QkEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUE7UUFDdkRBLFVBQVVBLEVBQUVBLElBQUlBO1FBQ2hCQSxZQUFZQSxFQUFFQSxJQUFJQTtLQUNuQkEsQ0FBQ0E7SUFFRkEsa0VBQWtFQTtJQUNsRUEsZ0VBQWdFQTtJQUNoRUEsRUFBRUE7SUFDRkEsaUZBQWlGQTtJQUNqRkEsc0NBQXNDQTtJQUN0Q0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7SUFDckJBLE9BQU9BLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO0lBRWxCQSwwQ0FBMENBO0lBQzFDQSxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMvQkEsSUFBSUEsS0FBS0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFFdkJBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLFVBQVVBLEVBQUVBO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUMsQ0FBQ0E7SUFFRkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0E7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQ0E7SUFFRkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7QUFDekNBLENBQUNBO0FBcENlLHFCQUFhLGdCQW9DNUIsQ0FBQTtBQUFBLENBQUM7QUFFRix5QkFBZ0MsR0FBRyxFQUFFLFVBQVc7SUFDOUNDLENBQUNBLFVBQVVBLElBQUlBLENBQUNBO1FBQ1osSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUVBLENBQUNBO1FBQ0pBLE1BQU1BLENBQUNBLFVBQVVBLFlBQVlBO1FBQzNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDM0MsQ0FBQyxDQUFDQSxDQUFDQTtRQUNIQSxPQUFPQSxDQUFDQSxVQUFVQSxTQUFTQTtRQUN6QixhQUFhLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQ0EsQ0FBQ0E7QUFDUEEsQ0FBQ0E7QUFkZSx1QkFBZSxrQkFjOUIsQ0FBQTtBQUFBLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzlDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFMUMsaUNBQXdDLEdBQUc7SUFDekNDLG1FQUFtRUE7SUFDbkVBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtJQUN6REEsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxVQUFVQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxZQUFZQTtRQUMvRCxzR0FBc0c7UUFDdEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsWUFBWSxHQUFHLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQztZQUN4RSxJQUFJLEVBQUUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN4QiwwRkFBMEY7Z0JBQzFGLDhEQUE4RDtnQkFDOUQsRUFBRSxHQUFHLENBQUMsVUFBUyxPQUFPO29CQUNwQixNQUFNLENBQUM7d0JBQ0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNoRCxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUNmLENBQUM7WUFFRCxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUYsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsaUZBQWlGO1FBQ2pGLGdHQUFnRztRQUNoRyxvREFBb0Q7UUFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQ0E7SUFFRkEsc0VBQXNFQTtJQUN0RUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxtQkFBbUJBLENBQUNBO0lBQy9EQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEdBQUdBLFVBQVVBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFlBQVlBO1FBQ2xFLElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLFlBQVksR0FBRyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDeEUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxzRUFBc0U7UUFDdEUsZ0dBQWdHO1FBQ2hHLG9EQUFvRDtRQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksTUFBTSxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUMsQ0FBQ0E7QUFDSkEsQ0FBQ0E7QUFuRGUsK0JBQXVCLDBCQW1EdEMsQ0FBQTtBQUFBLENBQUM7QUFFRixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUxRCxtQ0FBbUM7QUFDbkMsb0JBQTJCLFNBQVM7SUFDbENDLElBQUlBLGFBQWFBLEdBQUdBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO0lBQ3RDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUFDQSxNQUFNQSxDQUFDQTtJQUUzQkEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0E7UUFDbEIsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUMvRCxLQUFLLENBQUM7Z0JBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ25FLEtBQUssQ0FBQztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3pFLEtBQUssQ0FBQztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUMvRSxLQUFLLENBQUM7Z0JBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3JGLFNBQVMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDSCxDQUFDLENBQUNBO0lBRUZBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLGFBQWFBLEVBQUVBLENBQUNBO0lBRW5DQSxJQUFJQSxJQUFJQSxDQUFDQTtJQUNUQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0EsVUFBVUEsSUFBSUE7WUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRixDQUFDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtvQkFDdkQsR0FBRyxFQUFFLFVBQVUsRUFBRTt3QkFDZixFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3ZDLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxHQUFHLEVBQUU7d0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QyxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBQ1hBLENBQUNBO0lBRURBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBO1FBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxXQUFXQSxJQUFJQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMvREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDaERBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0hBLENBQUNBO0FBL0NlLGtCQUFVLGFBK0N6QixDQUFBO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGtleXMgZnJvbSAnLi9rZXlzJztcbi8vIEhhY2sgc2luY2UgVHlwZVNjcmlwdCBpc24ndCBjb21waWxpbmcgdGhpcyBmb3IgYSB3b3JrZXIuXG5kZWNsYXJlIHZhciBXb3JrZXJHbG9iYWxTY29wZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBcmd1bWVudHMoYXJncykge1xuICBmb3IgKHZhciBpID0gYXJncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0eXBlb2YgYXJnc1tpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYXJnc1tpXSA9IGdsb2JhbC56b25lLmJpbmQoYXJnc1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcmdzO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoUHJvdG90eXBlKG9iaiwgZm5OYW1lcykge1xuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGVsZWdhdGUgPSBvYmpbbmFtZV07XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBvYmpbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZWxlZ2F0ZS5hcHBseSh0aGlzLCBiaW5kQXJndW1lbnRzKGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2ViV29ya2VyKCkge1xuICByZXR1cm4gKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZSgpIHtcbiAgcmV0dXJuICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApIHx8IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9O1xuXG4gIC8vIEEgcHJvcGVydHkgZGVzY3JpcHRvciBjYW5ub3QgaGF2ZSBnZXR0ZXIvc2V0dGVyIGFuZCBiZSB3cml0YWJsZVxuICAvLyBkZWxldGluZyB0aGUgd3JpdGFibGUgYW5kIHZhbHVlIHByb3BlcnRpZXMgYXZvaWRzIHRoaXMgZXJyb3I6XG4gIC8vXG4gIC8vIFR5cGVFcnJvcjogcHJvcGVydHkgZGVzY3JpcHRvcnMgbXVzdCBub3Qgc3BlY2lmeSBhIHZhbHVlIG9yIGJlIHdyaXRhYmxlIHdoZW4gYVxuICAvLyBnZXR0ZXIgb3Igc2V0dGVyIGhhcyBiZWVuIHNwZWNpZmllZFxuICBkZWxldGUgZGVzYy53cml0YWJsZTtcbiAgZGVsZXRlIGRlc2MudmFsdWU7XG5cbiAgLy8gc3Vic3RyKDIpIGN1eiAnb25jbGljaycgLT4gJ2NsaWNrJywgZXRjXG4gIHZhciBldmVudE5hbWUgPSBwcm9wLnN1YnN0cigyKTtcbiAgdmFyIF9wcm9wID0gJ18nICsgcHJvcDtcblxuICBkZXNjLnNldCA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICh0aGlzW19wcm9wXSkge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpc1tfcHJvcF0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbX3Byb3BdID0gZm47XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbiwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW19wcm9wXSA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGRlc2MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzW19wcm9wXTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaFByb3BlcnRpZXMob2JqLCBwcm9wZXJ0aWVzPykge1xuICAocHJvcGVydGllcyB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHByb3BzID0gW107XG4gICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0oKSkuXG4gICAgZmlsdGVyKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0eU5hbWUuc3Vic3RyKDAsMikgPT09ICdvbic7XG4gICAgfSkpLlxuICAgIGZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgcGF0Y2hQcm9wZXJ0eShvYmosIGV2ZW50TmFtZSk7XG4gICAgfSk7XG59O1xuXG52YXIgb3JpZ2luYWxGbktleSA9IGtleXMuY3JlYXRlKCdvcmlnaW5hbEZuJyk7XG52YXIgYm91bmRGbnNLZXkgPSBrZXlzLmNyZWF0ZSgnYm91bmRGbnMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKG9iaikge1xuICAvLyBUaGlzIGlzIHJlcXVpcmVkIGZvciB0aGUgYWRkRXZlbnRMaXN0ZW5lciBob29rIG9uIHRoZSByb290IHpvbmUuXG4gIG9ialtrZXlzLmNvbW1vbi5hZGRFdmVudExpc3RlbmVyXSA9IG9iai5hZGRFdmVudExpc3RlbmVyO1xuICBvYmouYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmluZykge1xuICAgIC8vSWdub3JlIHNwZWNpYWwgbGlzdGVuZXJzIG9mIElFMTEgJiBFZGdlIGRldiB0b29scywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE1MFxuICAgIGlmIChoYW5kbGVyICYmIGhhbmRsZXIudG9TdHJpbmcoKSAhPT0gXCJbb2JqZWN0IEZ1bmN0aW9uV3JhcHBlcl1cIikge1xuICAgICAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50TmFtZSArICh1c2VDYXB0dXJpbmcgPyAnJGNhcHR1cmluZycgOiAnJGJ1YmJsaW5nJyk7XG4gICAgICB2YXIgZm47XG4gICAgICBpZiAoaGFuZGxlci5oYW5kbGVFdmVudCkge1xuICAgICAgICAvLyBIYXZlIHRvIHBhc3MgaW4gJ2hhbmRsZXInIHJlZmVyZW5jZSBhcyBhbiBhcmd1bWVudCBoZXJlLCBvdGhlcndpc2UgaXQgZ2V0cyBjbG9iYmVyZWQgaW5cbiAgICAgICAgLy8gSUU5IGJ5IHRoZSBhcmd1bWVudHNbMV0gYXNzaWdubWVudCBhdCBlbmQgb2YgdGhpcyBmdW5jdGlvbi5cbiAgICAgICAgZm4gPSAoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhhbmRsZXIuaGFuZGxlRXZlbnQuYXBwbHkoaGFuZGxlciwgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShoYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuID0gaGFuZGxlcjtcbiAgICAgIH1cblxuICAgICAgaGFuZGxlcltvcmlnaW5hbEZuS2V5XSA9IGZuO1xuICAgICAgaGFuZGxlcltib3VuZEZuc0tleV0gPSBoYW5kbGVyW2JvdW5kRm5zS2V5XSB8fCB7fTtcbiAgICAgIGhhbmRsZXJbYm91bmRGbnNLZXldW2V2ZW50VHlwZV0gPSBoYW5kbGVyW2JvdW5kRm5zS2V5XVtldmVudFR5cGVdIHx8IGdsb2JhbC56b25lLmJpbmQoZm4pO1xuICAgICAgYXJndW1lbnRzWzFdID0gaGFuZGxlcltib3VuZEZuc0tleV1bZXZlbnRUeXBlXTtcbiAgICB9XG5cbiAgICAvLyAtIEluc2lkZSBhIFdlYiBXb3JrZXIsIGB0aGlzYCBpcyB1bmRlZmluZWQsIHRoZSBjb250ZXh0IGlzIGBnbG9iYWxgICg9IGBzZWxmYClcbiAgICAvLyAtIFdoZW4gYGFkZEV2ZW50TGlzdGVuZXJgIGlzIGNhbGxlZCBvbiB0aGUgZ2xvYmFsIGNvbnRleHQgaW4gc3RyaWN0IG1vZGUsIGB0aGlzYCBpcyB1bmRlZmluZWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvMTkwXG4gICAgdmFyIHRhcmdldCA9IHRoaXMgfHwgZ2xvYmFsO1xuICAgIHJldHVybiBnbG9iYWwuem9uZS5hZGRFdmVudExpc3RlbmVyLmFwcGx5KHRhcmdldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIHJlcXVpcmVkIGZvciB0aGUgcmVtb3ZlRXZlbnRMaXN0ZW5lciBob29rIG9uIHRoZSByb290IHpvbmUuXG4gIG9ialtrZXlzLmNvbW1vbi5yZW1vdmVFdmVudExpc3RlbmVyXSA9IG9iai5yZW1vdmVFdmVudExpc3RlbmVyO1xuICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmluZykge1xuICAgIHZhciBldmVudFR5cGUgPSBldmVudE5hbWUgKyAodXNlQ2FwdHVyaW5nID8gJyRjYXB0dXJpbmcnIDogJyRidWJibGluZycpO1xuICAgIGlmIChoYW5kbGVyICYmIGhhbmRsZXJbYm91bmRGbnNLZXldICYmIGhhbmRsZXJbYm91bmRGbnNLZXldW2V2ZW50VHlwZV0pIHtcbiAgICAgIHZhciBfYm91bmQgPSBoYW5kbGVyW2JvdW5kRm5zS2V5XTtcbiAgICAgIGFyZ3VtZW50c1sxXSA9IF9ib3VuZFtldmVudFR5cGVdO1xuICAgICAgZGVsZXRlIF9ib3VuZFtldmVudFR5cGVdO1xuICAgICAgZ2xvYmFsLnpvbmUuZGVxdWV1ZVRhc2soaGFuZGxlcltvcmlnaW5hbEZuS2V5XSk7XG4gICAgfVxuXG4gICAgLy8gLSBJbnNpZGUgYSBXZWIgV29ya2VyLCBgdGhpc2AgaXMgdW5kZWZpbmVkLCB0aGUgY29udGV4dCBpcyBgZ2xvYmFsYFxuICAgIC8vIC0gV2hlbiBgYWRkRXZlbnRMaXN0ZW5lcmAgaXMgY2FsbGVkIG9uIHRoZSBnbG9iYWwgY29udGV4dCBpbiBzdHJpY3QgbW9kZSwgYHRoaXNgIGlzIHVuZGVmaW5lZFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci96b25lLmpzL2lzc3Vlcy8xOTBcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcyB8fCBnbG9iYWw7XG4gICAgdmFyIHJlc3VsdCA9IGdsb2JhbC56b25lLnJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG52YXIgb3JpZ2luYWxJbnN0YW5jZUtleSA9IGtleXMuY3JlYXRlKCdvcmlnaW5hbEluc3RhbmNlJyk7XG5cbi8vIHdyYXAgc29tZSBuYXRpdmUgQVBJIG9uIGB3aW5kb3dgXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hDbGFzcyhjbGFzc05hbWUpIHtcbiAgdmFyIE9yaWdpbmFsQ2xhc3MgPSBnbG9iYWxbY2xhc3NOYW1lXTtcbiAgaWYgKCFPcmlnaW5hbENsYXNzKSByZXR1cm47XG5cbiAgZ2xvYmFsW2NsYXNzTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSBiaW5kQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgc3dpdGNoIChhLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoKTsgYnJlYWs7XG4gICAgICBjYXNlIDE6IHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdKTsgYnJlYWs7XG4gICAgICBjYXNlIDI6IHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdKTsgYnJlYWs7XG4gICAgICBjYXNlIDM6IHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdLCBhWzJdKTsgYnJlYWs7XG4gICAgICBjYXNlIDQ6IHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ3doYXQgYXJlIHlvdSBldmVuIGRvaW5nPycpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaW5zdGFuY2UgPSBuZXcgT3JpZ2luYWxDbGFzcygpO1xuXG4gIHZhciBwcm9wO1xuICBmb3IgKHByb3AgaW4gaW5zdGFuY2UpIHtcbiAgICAoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2VbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdLmFwcGx5KHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0sIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXSA9IGdsb2JhbC56b25lLmJpbmQoZm4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXSA9IGZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0ocHJvcCkpO1xuICB9XG5cbiAgZm9yIChwcm9wIGluIE9yaWdpbmFsQ2xhc3MpIHtcbiAgICBpZiAocHJvcCAhPT0gJ3Byb3RvdHlwZScgJiYgT3JpZ2luYWxDbGFzcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgZ2xvYmFsW2NsYXNzTmFtZV1bcHJvcF0gPSBPcmlnaW5hbENsYXNzW3Byb3BdO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var fnPatch = __webpack_require__(11);
		var promisePatch = __webpack_require__(8);
		var mutationObserverPatch = __webpack_require__(13);
		var definePropertyPatch = __webpack_require__(14);
		var registerElementPatch = __webpack_require__(15);
		var eventTargetPatch = __webpack_require__(16);
		var propertyDescriptorPatch = __webpack_require__(17);
		var geolocationPatch = __webpack_require__(19);
		var fileReaderPatch = __webpack_require__(20);
		function apply() {
		    fnPatch.patchSetClearFunction(global, global.Zone, [
		        ['setTimeout', 'clearTimeout', false, false],
		        ['setInterval', 'clearInterval', true, false],
		        ['setImmediate', 'clearImmediate', false, false],
		        ['requestAnimationFrame', 'cancelAnimationFrame', false, true],
		        ['mozRequestAnimationFrame', 'mozCancelAnimationFrame', false, true],
		        ['webkitRequestAnimationFrame', 'webkitCancelAnimationFrame', false, true]
		    ]);
		    fnPatch.patchFunction(global, [
		        'alert',
		        'prompt'
		    ]);
		    eventTargetPatch.apply();
		    propertyDescriptorPatch.apply();
		    promisePatch.apply();
		    mutationObserverPatch.patchClass('MutationObserver');
		    mutationObserverPatch.patchClass('WebKitMutationObserver');
		    definePropertyPatch.apply();
		    registerElementPatch.apply();
		    geolocationPatch.apply();
		    fileReaderPatch.apply();
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9icm93c2VyLnRzIl0sIm5hbWVzIjpbImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLE9BQU8sV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUN2QyxJQUFZLFlBQVksV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUMxQyxJQUFZLHFCQUFxQixXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDN0QsSUFBWSxtQkFBbUIsV0FBTSxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pELElBQVksb0JBQW9CLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUUzRCxJQUFZLGdCQUFnQixXQUFNLGdCQUFnQixDQUFDLENBQUE7QUFDbkQsSUFBWSx1QkFBdUIsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pFLElBQVksZ0JBQWdCLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFDbEQsSUFBWSxlQUFlLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFFakQ7SUFDRUEsT0FBT0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQTtRQUNqREEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDNUNBLENBQUNBLGFBQWFBLEVBQUVBLGVBQWVBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLENBQUNBO1FBQzdDQSxDQUFDQSxjQUFjQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ2hEQSxDQUFDQSx1QkFBdUJBLEVBQUVBLHNCQUFzQkEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDOURBLENBQUNBLDBCQUEwQkEsRUFBRUEseUJBQXlCQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNwRUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQSw0QkFBNEJBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBO0tBQzNFQSxDQUFDQSxDQUFDQTtJQUVIQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxFQUFFQTtRQUM1QkEsT0FBT0E7UUFDUEEsUUFBUUE7S0FDVEEsQ0FBQ0EsQ0FBQ0E7SUFFSEEsZ0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUV6QkEsdUJBQXVCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUVoQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7SUFFckJBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtJQUNyREEscUJBQXFCQSxDQUFDQSxVQUFVQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQUNBO0lBRTNEQSxtQkFBbUJBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRTVCQSxvQkFBb0JBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRTdCQSxnQkFBZ0JBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRXpCQSxlQUFlQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtBQUMxQkEsQ0FBQ0E7QUEvQmUsYUFBSyxRQStCcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZuUGF0Y2ggZnJvbSAnLi9mdW5jdGlvbnMnO1xuaW1wb3J0ICogYXMgcHJvbWlzZVBhdGNoIGZyb20gJy4vcHJvbWlzZSc7XG5pbXBvcnQgKiBhcyBtdXRhdGlvbk9ic2VydmVyUGF0Y2ggZnJvbSAnLi9tdXRhdGlvbi1vYnNlcnZlcic7XG5pbXBvcnQgKiBhcyBkZWZpbmVQcm9wZXJ0eVBhdGNoIGZyb20gJy4vZGVmaW5lLXByb3BlcnR5JztcbmltcG9ydCAqIGFzIHJlZ2lzdGVyRWxlbWVudFBhdGNoIGZyb20gJy4vcmVnaXN0ZXItZWxlbWVudCc7XG5pbXBvcnQgKiBhcyB3ZWJTb2NrZXRQYXRjaCBmcm9tICcuL3dlYnNvY2tldCc7XG5pbXBvcnQgKiBhcyBldmVudFRhcmdldFBhdGNoIGZyb20gJy4vZXZlbnQtdGFyZ2V0JztcbmltcG9ydCAqIGFzIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoIGZyb20gJy4vcHJvcGVydHktZGVzY3JpcHRvcic7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvblBhdGNoIGZyb20gJy4vZ2VvbG9jYXRpb24nO1xuaW1wb3J0ICogYXMgZmlsZVJlYWRlclBhdGNoIGZyb20gJy4vZmlsZS1yZWFkZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGZuUGF0Y2gucGF0Y2hTZXRDbGVhckZ1bmN0aW9uKGdsb2JhbCwgZ2xvYmFsLlpvbmUsIFtcbiAgICBbJ3NldFRpbWVvdXQnLCAnY2xlYXJUaW1lb3V0JywgZmFsc2UsIGZhbHNlXSxcbiAgICBbJ3NldEludGVydmFsJywgJ2NsZWFySW50ZXJ2YWwnLCB0cnVlLCBmYWxzZV0sXG4gICAgWydzZXRJbW1lZGlhdGUnLCAnY2xlYXJJbW1lZGlhdGUnLCBmYWxzZSwgZmFsc2VdLFxuICAgIFsncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ2NhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdLFxuICAgIFsnbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ21vekNhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdLFxuICAgIFsnd2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ3dlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdXG4gIF0pO1xuXG4gIGZuUGF0Y2gucGF0Y2hGdW5jdGlvbihnbG9iYWwsIFtcbiAgICAnYWxlcnQnLFxuICAgICdwcm9tcHQnXG4gIF0pO1xuXG4gIGV2ZW50VGFyZ2V0UGF0Y2guYXBwbHkoKTtcblxuICBwcm9wZXJ0eURlc2NyaXB0b3JQYXRjaC5hcHBseSgpO1xuXG4gIHByb21pc2VQYXRjaC5hcHBseSgpO1xuXG4gIG11dGF0aW9uT2JzZXJ2ZXJQYXRjaC5wYXRjaENsYXNzKCdNdXRhdGlvbk9ic2VydmVyJyk7XG4gIG11dGF0aW9uT2JzZXJ2ZXJQYXRjaC5wYXRjaENsYXNzKCdXZWJLaXRNdXRhdGlvbk9ic2VydmVyJyk7XG5cbiAgZGVmaW5lUHJvcGVydHlQYXRjaC5hcHBseSgpO1xuXG4gIHJlZ2lzdGVyRWxlbWVudFBhdGNoLmFwcGx5KCk7XG5cbiAgZ2VvbG9jYXRpb25QYXRjaC5hcHBseSgpO1xuXG4gIGZpbGVSZWFkZXJQYXRjaC5hcHBseSgpO1xufVxuXG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var wtf = __webpack_require__(12);
		function patchSetClearFunction(window, Zone, fnNames) {
		    function patchMacroTaskMethod(setName, clearName, repeating, isRaf) {
		        var setNative = window[setName];
		        var clearNative = window[clearName];
		        var ids = {};
		        if (setNative) {
		            var wtfSetEventFn = wtf.createEvent('Zone#' + setName + '(uint32 zone, uint32 id, uint32 delay)');
		            var wtfClearEventFn = wtf.createEvent('Zone#' + clearName + '(uint32 zone, uint32 id)');
		            var wtfCallbackFn = wtf.createScope('Zone#cb:' + setName + '(uint32 zone, uint32 id, uint32 delay)');
		            // Forward all calls from the window through the zone.
		            window[setName] = function () {
		                return global.zone[setName].apply(global.zone, arguments);
		            };
		            window[clearName] = function () {
		                return global.zone[clearName].apply(global.zone, arguments);
		            };
		            // Set up zone processing for the set function.
		            Zone.prototype[setName] = function (fn, delay) {
		                // We need to save `fn` in var different then argument. This is because
		                // in IE9 `argument[0]` and `fn` have same identity, and assigning to
		                // `argument[0]` changes `fn`.
		                var callbackFn = fn;
		                if (typeof callbackFn !== 'function') {
		                    // force the error by calling the method with wrong args
		                    setNative.apply(window, arguments);
		                }
		                var zone = this;
		                var setId = null;
		                // wrap the callback function into the zone.
		                arguments[0] = function () {
		                    var callbackZone = zone.isRootZone() || isRaf ? zone : zone.fork();
		                    var callbackThis = this;
		                    var callbackArgs = arguments;
		                    return wtf.leaveScope(wtfCallbackFn(callbackZone.$id, setId, delay), callbackZone.run(function () {
		                        if (!repeating) {
		                            delete ids[setId];
		                            callbackZone.removeTask(callbackFn);
		                        }
		                        return callbackFn.apply(callbackThis, callbackArgs);
		                    }));
		                };
		                if (repeating) {
		                    zone.addRepeatingTask(callbackFn);
		                }
		                else {
		                    zone.addTask(callbackFn);
		                }
		                setId = setNative.apply(window, arguments);
		                ids[setId] = callbackFn;
		                wtfSetEventFn(zone.$id, setId, delay);
		                return setId;
		            };
		            Zone.prototype[setName + 'Unpatched'] = function () {
		                return setNative.apply(window, arguments);
		            };
		            // Set up zone processing for the clear function.
		            Zone.prototype[clearName] = function (id) {
		                wtfClearEventFn(this.$id, id);
		                if (ids.hasOwnProperty(id)) {
		                    var callbackFn = ids[id];
		                    delete ids[id];
		                    if (repeating) {
		                        this.removeRepeatingTask(callbackFn);
		                    }
		                    else {
		                        this.removeTask(callbackFn);
		                    }
		                }
		                return clearNative.apply(window, arguments);
		            };
		            Zone.prototype[clearName + 'Unpatched'] = function () {
		                return clearNative.apply(window, arguments);
		            };
		        }
		    }
		    fnNames.forEach(function (args) {
		        patchMacroTaskMethod.apply(null, args);
		    });
		}
		exports.patchSetClearFunction = patchSetClearFunction;
		;
		function patchFunction(obj, fnNames) {
		    fnNames.forEach(function (name) {
		        var delegate = obj[name];
		        global.zone[name] = function () {
		            return delegate.apply(obj, arguments);
		        };
		        obj[name] = function () {
		            return global.zone[name].apply(this, arguments);
		        };
		    });
		}
		exports.patchFunction = patchFunction;
		;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6WyJwYXRjaFNldENsZWFyRnVuY3Rpb24iLCJwYXRjaFNldENsZWFyRnVuY3Rpb24ucGF0Y2hNYWNyb1Rhc2tNZXRob2QiLCJwYXRjaEZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFDQSxJQUFZLEdBQUcsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU5QiwrQkFBc0MsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPO0lBQ3pEQSw4QkFBOEJBLE9BQU9BLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLEtBQUtBO1FBQ2hFQyxJQUFJQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNoQ0EsSUFBSUEsV0FBV0EsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDcENBLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1FBRWJBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2RBLElBQUlBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLEdBQUdBLHdDQUF3Q0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLGVBQWVBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEdBQUdBLFNBQVNBLEdBQUdBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0E7WUFDeEZBLElBQUlBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLEdBQUdBLE9BQU9BLEdBQUdBLHdDQUF3Q0EsQ0FBQ0EsQ0FBQ0E7WUFFckdBLHNEQUFzREE7WUFDdERBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBO2dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUNBO1lBQ0ZBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUNBO1lBR0ZBLCtDQUErQ0E7WUFDL0NBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLFVBQVVBLEVBQUVBLEVBQUVBLEtBQUtBO2dCQUMzQyx1RUFBdUU7Z0JBQ3ZFLHFFQUFxRTtnQkFDckUsOEJBQThCO2dCQUM5QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLHdEQUF3RDtvQkFDeEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLDRDQUE0QztnQkFDNUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHO29CQUNiLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbkUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN4QixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUNqQixhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQzdDLFlBQVksQ0FBQyxHQUFHLENBQUM7d0JBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUNmLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNsQixZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN0QyxDQUFDO3dCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQ0wsQ0FBQztnQkFDSixDQUFDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQ0E7WUFFRkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0EsR0FBR0E7Z0JBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUNBO1lBRUZBLGlEQUFpREE7WUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLFVBQVVBLEVBQUVBO2dCQUN0QyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUNBO1lBRUZBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEdBQUdBLFdBQVdBLENBQUNBLEdBQUdBO2dCQUN4QyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDQTtRQUVKQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUNERCxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFTQSxJQUFJQTtRQUMzQixvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUF2RmUsNkJBQXFCLHdCQXVGcEMsQ0FBQTtBQUFBLENBQUM7QUFFRix1QkFBOEIsR0FBRyxFQUFFLE9BQU87SUFDeENFLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLElBQUlBO1FBQzVCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDVixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUFYZSxxQkFBYSxnQkFXNUIsQ0FBQTtBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgKiBhcyB3dGYgZnJvbSAnLi4vd3RmJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoU2V0Q2xlYXJGdW5jdGlvbih3aW5kb3csIFpvbmUsIGZuTmFtZXMpIHtcbiAgZnVuY3Rpb24gcGF0Y2hNYWNyb1Rhc2tNZXRob2Qoc2V0TmFtZSwgY2xlYXJOYW1lLCByZXBlYXRpbmcsIGlzUmFmKSB7XG4gICAgdmFyIHNldE5hdGl2ZSA9IHdpbmRvd1tzZXROYW1lXTtcbiAgICB2YXIgY2xlYXJOYXRpdmUgPSB3aW5kb3dbY2xlYXJOYW1lXTtcbiAgICB2YXIgaWRzID0ge307XG5cbiAgICBpZiAoc2V0TmF0aXZlKSB7XG4gICAgICB2YXIgd3RmU2V0RXZlbnRGbiA9IHd0Zi5jcmVhdGVFdmVudCgnWm9uZSMnICsgc2V0TmFtZSArICcodWludDMyIHpvbmUsIHVpbnQzMiBpZCwgdWludDMyIGRlbGF5KScpO1xuICAgICAgdmFyIHd0ZkNsZWFyRXZlbnRGbiA9IHd0Zi5jcmVhdGVFdmVudCgnWm9uZSMnICsgY2xlYXJOYW1lICsgJyh1aW50MzIgem9uZSwgdWludDMyIGlkKScpO1xuICAgICAgdmFyIHd0ZkNhbGxiYWNrRm4gPSB3dGYuY3JlYXRlU2NvcGUoJ1pvbmUjY2I6JyArIHNldE5hbWUgKyAnKHVpbnQzMiB6b25lLCB1aW50MzIgaWQsIHVpbnQzMiBkZWxheSknKTtcblxuICAgICAgLy8gRm9yd2FyZCBhbGwgY2FsbHMgZnJvbSB0aGUgd2luZG93IHRocm91Z2ggdGhlIHpvbmUuXG4gICAgICB3aW5kb3dbc2V0TmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwuem9uZVtzZXROYW1lXS5hcHBseShnbG9iYWwuem9uZSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3dbY2xlYXJOYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC56b25lW2NsZWFyTmFtZV0uYXBwbHkoZ2xvYmFsLnpvbmUsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG5cbiAgICAgIC8vIFNldCB1cCB6b25lIHByb2Nlc3NpbmcgZm9yIHRoZSBzZXQgZnVuY3Rpb24uXG4gICAgICBab25lLnByb3RvdHlwZVtzZXROYW1lXSA9IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBzYXZlIGBmbmAgaW4gdmFyIGRpZmZlcmVudCB0aGVuIGFyZ3VtZW50LiBUaGlzIGlzIGJlY2F1c2VcbiAgICAgICAgLy8gaW4gSUU5IGBhcmd1bWVudFswXWAgYW5kIGBmbmAgaGF2ZSBzYW1lIGlkZW50aXR5LCBhbmQgYXNzaWduaW5nIHRvXG4gICAgICAgIC8vIGBhcmd1bWVudFswXWAgY2hhbmdlcyBgZm5gLlxuICAgICAgICB2YXIgY2FsbGJhY2tGbiA9IGZuO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrRm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBmb3JjZSB0aGUgZXJyb3IgYnkgY2FsbGluZyB0aGUgbWV0aG9kIHdpdGggd3JvbmcgYXJnc1xuICAgICAgICAgIHNldE5hdGl2ZS5hcHBseSh3aW5kb3csIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHpvbmUgPSB0aGlzO1xuICAgICAgICB2YXIgc2V0SWQgPSBudWxsO1xuICAgICAgICAvLyB3cmFwIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpbnRvIHRoZSB6b25lLlxuICAgICAgICBhcmd1bWVudHNbMF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2FsbGJhY2tab25lID0gem9uZS5pc1Jvb3Rab25lKCkgfHwgaXNSYWYgPyB6b25lIDogem9uZS5mb3JrKCk7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrVGhpcyA9IHRoaXM7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICByZXR1cm4gd3RmLmxlYXZlU2NvcGUoXG4gICAgICAgICAgICAgIHd0ZkNhbGxiYWNrRm4oY2FsbGJhY2tab25lLiRpZCwgc2V0SWQsIGRlbGF5KSxcbiAgICAgICAgICAgICAgY2FsbGJhY2tab25lLnJ1bihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcGVhdGluZykge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGlkc1tzZXRJZF07XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja1pvbmUucmVtb3ZlVGFzayhjYWxsYmFja0ZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrRm4uYXBwbHkoY2FsbGJhY2tUaGlzLCBjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChyZXBlYXRpbmcpIHtcbiAgICAgICAgICB6b25lLmFkZFJlcGVhdGluZ1Rhc2soY2FsbGJhY2tGbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZS5hZGRUYXNrKGNhbGxiYWNrRm4pO1xuICAgICAgICB9XG4gICAgICAgIHNldElkID0gc2V0TmF0aXZlLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcbiAgICAgICAgaWRzW3NldElkXSA9IGNhbGxiYWNrRm47XG4gICAgICAgIHd0ZlNldEV2ZW50Rm4oem9uZS4kaWQsIHNldElkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiBzZXRJZDtcbiAgICAgIH07XG5cbiAgICAgIFpvbmUucHJvdG90eXBlW3NldE5hbWUgKyAnVW5wYXRjaGVkJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNldE5hdGl2ZS5hcHBseSh3aW5kb3csIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG4gICAgICAvLyBTZXQgdXAgem9uZSBwcm9jZXNzaW5nIGZvciB0aGUgY2xlYXIgZnVuY3Rpb24uXG4gICAgICBab25lLnByb3RvdHlwZVtjbGVhck5hbWVdID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHd0ZkNsZWFyRXZlbnRGbih0aGlzLiRpZCwgaWQpO1xuICAgICAgICBpZiAoaWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIHZhciBjYWxsYmFja0ZuID0gaWRzW2lkXTtcbiAgICAgICAgICBkZWxldGUgaWRzW2lkXTtcbiAgICAgICAgICBpZiAocmVwZWF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJlcGVhdGluZ1Rhc2soY2FsbGJhY2tGbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFzayhjYWxsYmFja0ZuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFyTmF0aXZlLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcbiAgICAgIH07XG5cbiAgICAgIFpvbmUucHJvdG90eXBlW2NsZWFyTmFtZSArICdVbnBhdGNoZWQnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2xlYXJOYXRpdmUuYXBwbHkod2luZG93LCBhcmd1bWVudHMpO1xuICAgICAgfTtcblxuICAgIH1cbiAgfVxuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24oYXJncykge1xuICAgIHBhdGNoTWFjcm9UYXNrTWV0aG9kLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaEZ1bmN0aW9uKG9iaiwgZm5OYW1lcykge1xuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGVsZWdhdGUgPSBvYmpbbmFtZV07XG4gICAgZ2xvYmFsLnpvbmVbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBvYmpbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsLnpvbmVbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcbn07XG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		/* WEBPACK VAR INJECTION */(function(global) {// Detect and setup WTF.
		var wtfTrace = null;
		var wtfEvents = null;
		var wtfEnabled = (function () {
		    var wtf = global['wtf'];
		    if (wtf) {
		        wtfTrace = wtf['trace'];
		        if (wtfTrace) {
		            wtfEvents = wtfTrace['events'];
		            return true;
		        }
		    }
		    return false;
		})();
		function noop() {
		}
		exports.enabled = wtfEnabled;
		exports.createScope = wtfEnabled ? function (signature, flags) {
		    return wtfEvents.createScope(signature, flags);
		} : function (s, f) {
		    return noop;
		};
		exports.createEvent = wtfEnabled ? function (signature, flags) {
		    return wtfEvents.createInstance(signature, flags);
		} : function (s, f) {
		    return noop;
		};
		exports.leaveScope = wtfEnabled ? function (scope, returnValue) {
		    wtfTrace.leaveScope(scope, returnValue);
		    return returnValue;
		} : function (s, v) {
		    return v;
		};
		exports.beginTimeRange = wtfEnabled ? function (rangeType, action) {
		    return wtfTrace.beginTimeRange(rangeType, action);
		} : function (t, a) {
		    return null;
		};
		exports.endTimeRange = wtfEnabled ? function (range) {
		    wtfTrace.endTimeRange(range);
		} : function (r) {
		};
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3RmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3d0Zi50cyJdLCJuYW1lcyI6WyJub29wIl0sIm1hcHBpbmdzIjoiQUFBQSx3QkFBd0I7QUFDeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDO0lBQ2hCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1IsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMO0FBQ0FBLENBQUNBO0FBVVksZUFBTyxHQUFXLFVBQVUsQ0FBQztBQUM3QixtQkFBVyxHQUFnRCxVQUFVLEdBQUcsVUFBVSxTQUFTLEVBQUUsS0FBSztJQUM3RyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNXLG1CQUFXLEdBQXVELFVBQVUsR0FBRyxVQUFVLFNBQVMsRUFBRSxLQUFLO0lBQ3BILE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNwRCxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBQ1csa0JBQVUsR0FBRyxVQUFVLEdBQUcsVUFBVSxLQUFnQixFQUFFLFdBQWU7SUFDaEYsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNyQixDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBQ1csc0JBQWMsR0FBRyxVQUFVLEdBQUcsVUFBVSxTQUFTLEVBQUUsTUFBTTtJQUNwRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNXLG9CQUFZLEdBQUcsVUFBVSxHQUFHLFVBQVUsS0FBSztJQUN0RCxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDZixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXRlY3QgYW5kIHNldHVwIFdURi5cbnZhciB3dGZUcmFjZSA9IG51bGw7XG52YXIgd3RmRXZlbnRzID0gbnVsbDtcbnZhciB3dGZFbmFibGVkID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHd0ZiA9IGdsb2JhbFsnd3RmJ107XG4gIGlmICh3dGYpIHtcbiAgICB3dGZUcmFjZSA9IHd0ZlsndHJhY2UnXTtcbiAgICBpZiAod3RmVHJhY2UpIHtcbiAgICAgIHd0ZkV2ZW50cyA9IHd0ZlRyYWNlWydldmVudHMnXTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiBub29wKCkge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFd0ZlNjb3BlRm4ge1xuICAoLi4uYXJncyk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXdGZFdmVudEZuIHtcbiAgKC4uLmFyZ3MpOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBlbmFibGVkOmJvb2xlYW4gPSB3dGZFbmFibGVkO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNjb3BlOihzaWduYXR1cmU6c3RyaW5nLCBmbGFncz86YW55KSA9PiBXdGZTY29wZUZuID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChzaWduYXR1cmUsIGZsYWdzKSB7XG4gIHJldHVybiB3dGZFdmVudHMuY3JlYXRlU2NvcGUoc2lnbmF0dXJlLCBmbGFncyk7XG59IDogZnVuY3Rpb24gKHMsIGYpIHtcbiAgcmV0dXJuIG5vb3A7XG59O1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUV2ZW50OiAoc2lnbmF0dXJlOiBzdHJpbmcsIGFjdGlvbj86IHN0cmluZykgPT4gV3RmRXZlbnRGbiA9IHd0ZkVuYWJsZWQgPyBmdW5jdGlvbiAoc2lnbmF0dXJlLCBmbGFncykge1xuICByZXR1cm4gd3RmRXZlbnRzLmNyZWF0ZUluc3RhbmNlKHNpZ25hdHVyZSwgZmxhZ3MpO1xufSA6IGZ1bmN0aW9uIChzLCBmKSB7XG4gIHJldHVybiBub29wO1xufTtcbmV4cG9ydCBjb25zdCBsZWF2ZVNjb3BlID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChzY29wZTpXdGZTY29wZUZuLCByZXR1cm5WYWx1ZTphbnkpOmFueSB7XG4gIHd0ZlRyYWNlLmxlYXZlU2NvcGUoc2NvcGUsIHJldHVyblZhbHVlKTtcbiAgcmV0dXJuIHJldHVyblZhbHVlO1xufSA6IGZ1bmN0aW9uIChzLCB2KSB7XG4gIHJldHVybiB2O1xufTtcbmV4cG9ydCBjb25zdCBiZWdpblRpbWVSYW5nZSA9IHd0ZkVuYWJsZWQgPyBmdW5jdGlvbiAocmFuZ2VUeXBlLCBhY3Rpb24pIHtcbiAgcmV0dXJuIHd0ZlRyYWNlLmJlZ2luVGltZVJhbmdlKHJhbmdlVHlwZSwgYWN0aW9uKTtcbn0gOiBmdW5jdGlvbiAodCwgYSkge1xuICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgZW5kVGltZVJhbmdlID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChyYW5nZSkge1xuICB3dGZUcmFjZS5lbmRUaW1lUmFuZ2UocmFuZ2UpO1xufSA6IGZ1bmN0aW9uIChyKSB7XG59O1xuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
		var originalInstanceKey = keys.create('originalInstance');
		var creationZoneKey = keys.create('creationZone');
		var isActiveKey = keys.create('isActive');
		// wrap some native API on `window`
		function patchClass(className) {
		    var OriginalClass = global[className];
		    if (!OriginalClass)
		        return;
		    global[className] = function (fn) {
		        this[originalInstanceKey] = new OriginalClass(global.zone.bind(fn, true));
		        // Remember where the class was instantiate to execute the enqueueTask and dequeueTask hooks
		        this[creationZoneKey] = global.zone;
		    };
		    var instance = new OriginalClass(function () { });
		    global[className].prototype.disconnect = function () {
		        var result = this[originalInstanceKey].disconnect.apply(this[originalInstanceKey], arguments);
		        if (this[isActiveKey]) {
		            this[creationZoneKey].dequeueTask();
		            this[isActiveKey] = false;
		        }
		        return result;
		    };
		    global[className].prototype.observe = function () {
		        if (!this[isActiveKey]) {
		            this[creationZoneKey].enqueueTask();
		            this[isActiveKey] = true;
		        }
		        return this[originalInstanceKey].observe.apply(this[originalInstanceKey], arguments);
		    };
		    var prop;
		    for (prop in instance) {
		        (function (prop) {
		            if (typeof global[className].prototype !== 'undefined') {
		                return;
		            }
		            if (typeof instance[prop] === 'function') {
		                global[className].prototype[prop] = function () {
		                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
		                };
		            }
		            else {
		                Object.defineProperty(global[className].prototype, prop, {
		                    set: function (fn) {
		                        if (typeof fn === 'function') {
		                            this[originalInstanceKey][prop] = global.zone.bind(fn);
		                        }
		                        else {
		                            this[originalInstanceKey][prop] = fn;
		                        }
		                    },
		                    get: function () {
		                        return this[originalInstanceKey][prop];
		                    }
		                });
		            }
		        }(prop));
		    }
		}
		exports.patchClass = patchClass;
		;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvbXV0YXRpb24tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOlsicGF0Y2hDbGFzcyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFaEMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDMUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTFDLG1DQUFtQztBQUNuQyxvQkFBMkIsU0FBUztJQUNsQ0EsSUFBSUEsYUFBYUEsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDdENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLGFBQWFBLENBQUNBO1FBQUNBLE1BQU1BLENBQUNBO0lBRTNCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxVQUFVQSxFQUFFQTtRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRSw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxhQUFhQSxDQUFDQSxjQUFhLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFFakRBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBO1FBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxJQUFJQSxDQUFDQTtJQUNUQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0EsVUFBVUEsSUFBSUE7WUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JGLENBQUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO29CQUN2RCxHQUFHLEVBQUUsVUFBVSxFQUFFO3dCQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkMsQ0FBQztvQkFDSCxDQUFDO29CQUNELEdBQUcsRUFBRTt3QkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUF2RGUsa0JBQVUsYUF1RHpCLENBQUE7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMga2V5cyBmcm9tICcuLi9rZXlzJztcblxudmFyIG9yaWdpbmFsSW5zdGFuY2VLZXkgPSBrZXlzLmNyZWF0ZSgnb3JpZ2luYWxJbnN0YW5jZScpO1xudmFyIGNyZWF0aW9uWm9uZUtleSA9IGtleXMuY3JlYXRlKCdjcmVhdGlvblpvbmUnKTtcbnZhciBpc0FjdGl2ZUtleSA9IGtleXMuY3JlYXRlKCdpc0FjdGl2ZScpO1xuXG4vLyB3cmFwIHNvbWUgbmF0aXZlIEFQSSBvbiBgd2luZG93YFxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIHZhciBPcmlnaW5hbENsYXNzID0gZ2xvYmFsW2NsYXNzTmFtZV07XG4gIGlmICghT3JpZ2luYWxDbGFzcykgcmV0dXJuO1xuXG4gIGdsb2JhbFtjbGFzc05hbWVdID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGdsb2JhbC56b25lLmJpbmQoZm4sIHRydWUpKTtcbiAgICAvLyBSZW1lbWJlciB3aGVyZSB0aGUgY2xhc3Mgd2FzIGluc3RhbnRpYXRlIHRvIGV4ZWN1dGUgdGhlIGVucXVldWVUYXNrIGFuZCBkZXF1ZXVlVGFzayBob29rc1xuICAgIHRoaXNbY3JlYXRpb25ab25lS2V5XSA9IGdsb2JhbC56b25lO1xuICB9O1xuXG4gIHZhciBpbnN0YW5jZSA9IG5ldyBPcmlnaW5hbENsYXNzKGZ1bmN0aW9uICgpIHt9KTtcblxuICBnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XS5kaXNjb25uZWN0LmFwcGx5KHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0sIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXNbaXNBY3RpdmVLZXldKSB7XG4gICAgICB0aGlzW2NyZWF0aW9uWm9uZUtleV0uZGVxdWV1ZVRhc2soKTtcbiAgICAgIHRoaXNbaXNBY3RpdmVLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzW2lzQWN0aXZlS2V5XSkge1xuICAgICAgdGhpc1tjcmVhdGlvblpvbmVLZXldLmVucXVldWVUYXNrKCk7XG4gICAgICB0aGlzW2lzQWN0aXZlS2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldLm9ic2VydmUuYXBwbHkodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICB2YXIgcHJvcDtcbiAgZm9yIChwcm9wIGluIGluc3RhbmNlKSB7XG4gICAgKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIGdsb2JhbFtjbGFzc05hbWVdLnByb3RvdHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0uYXBwbHkodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gZ2xvYmFsLnpvbmUuYmluZChmbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gZm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfShwcm9wKSk7XG4gIH1cbn07XG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		var keys = __webpack_require__(7);
		// might need similar for object.freeze
		// i regret nothing
		var _defineProperty = Object.defineProperty;
		var _getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		var _create = Object.create;
		var unconfigurablesKey = keys.create('unconfigurables');
		function apply() {
		    Object.defineProperty = function (obj, prop, desc) {
		        if (isUnconfigurable(obj, prop)) {
		            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
		        }
		        if (prop !== 'prototype') {
		            desc = rewriteDescriptor(obj, prop, desc);
		        }
		        return _defineProperty(obj, prop, desc);
		    };
		    Object.defineProperties = function (obj, props) {
		        Object.keys(props).forEach(function (prop) {
		            Object.defineProperty(obj, prop, props[prop]);
		        });
		        return obj;
		    };
		    Object.create = function (obj, proto) {
		        if (typeof proto === 'object') {
		            Object.keys(proto).forEach(function (prop) {
		                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
		            });
		        }
		        return _create(obj, proto);
		    };
		    Object.getOwnPropertyDescriptor = function (obj, prop) {
		        var desc = _getOwnPropertyDescriptor(obj, prop);
		        if (isUnconfigurable(obj, prop)) {
		            desc.configurable = false;
		        }
		        return desc;
		    };
		}
		exports.apply = apply;
		;
		function _redefineProperty(obj, prop, desc) {
		    desc = rewriteDescriptor(obj, prop, desc);
		    return _defineProperty(obj, prop, desc);
		}
		exports._redefineProperty = _redefineProperty;
		;
		function isUnconfigurable(obj, prop) {
		    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
		}
		function rewriteDescriptor(obj, prop, desc) {
		    desc.configurable = true;
		    if (!desc.configurable) {
		        if (!obj[unconfigurablesKey]) {
		            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
		        }
		        obj[unconfigurablesKey][prop] = true;
		    }
		    return desc;
		}
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2RlZmluZS1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6WyJhcHBseSIsIl9yZWRlZmluZVByb3BlcnR5IiwiaXNVbmNvbmZpZ3VyYWJsZSIsInJld3JpdGVEZXNjcmlwdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLElBQUksV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVoQyx1Q0FBdUM7QUFDdkMsbUJBQW1CO0FBRW5CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDNUMsSUFBSSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUM7QUFDaEUsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM1QixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV4RDtJQUNFQSxNQUFNQSxDQUFDQSxjQUFjQSxHQUFHQSxVQUFVQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLGdCQUFnQkEsR0FBR0EsVUFBVUEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQ3ZDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLFVBQVVBLEdBQUdBLEVBQUVBLEtBQUtBO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO2dCQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLHdCQUF3QkEsR0FBR0EsVUFBVUEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDbkQsSUFBSSxJQUFJLEdBQUcseUJBQXlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUNBO0FBQ0pBLENBQUNBO0FBbENlLGFBQUssUUFrQ3BCLENBQUE7QUFBQSxDQUFDO0FBRUYsMkJBQWtDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUMvQ0MsSUFBSUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUMxQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7QUFDMUNBLENBQUNBO0FBSGUseUJBQWlCLG9CQUdoQyxDQUFBO0FBQUEsQ0FBQztBQUVGLDBCQUEyQixHQUFHLEVBQUUsSUFBSTtJQUNsQ0MsTUFBTUEsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0FBQ3pFQSxDQUFDQTtBQUVELDJCQUE0QixHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDekNDLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsZUFBZUEsQ0FBQ0EsR0FBR0EsRUFBRUEsa0JBQWtCQSxFQUFFQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUMxRUEsQ0FBQ0E7UUFDREEsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDZEEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBrZXlzIGZyb20gJy4uL2tleXMnO1xuXG4vLyBtaWdodCBuZWVkIHNpbWlsYXIgZm9yIG9iamVjdC5mcmVlemVcbi8vIGkgcmVncmV0IG5vdGhpbmdcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciB1bmNvbmZpZ3VyYWJsZXNLZXkgPSBrZXlzLmNyZWF0ZSgndW5jb25maWd1cmFibGVzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseSgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgZGVzYykge1xuICAgIGlmIChpc1VuY29uZmlndXJhYmxlKG9iaiwgcHJvcCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBhc3NpZ24gdG8gcmVhZCBvbmx5IHByb3BlcnR5IFxcJycgKyBwcm9wICsgJ1xcJyBvZiAnICsgb2JqKTtcbiAgICB9XG4gICAgaWYgKHByb3AgIT09ICdwcm90b3R5cGUnKSB7XG4gICAgICBkZXNjID0gcmV3cml0ZURlc2NyaXB0b3Iob2JqLCBwcm9wLCBkZXNjKTtcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwgcHJvcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgcHJvcHNbcHJvcF0pO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChvYmosIHByb3RvKSB7XG4gICAgaWYgKHR5cGVvZiBwcm90byA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3RvKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHByb3RvW3Byb3BdID0gcmV3cml0ZURlc2NyaXB0b3Iob2JqLCBwcm9wLCBwcm90b1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGUob2JqLCBwcm90byk7XG4gIH07XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICB2YXIgZGVzYyA9IF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcbiAgICBpZiAoaXNVbmNvbmZpZ3VyYWJsZShvYmosIHByb3ApKSB7XG4gICAgICBkZXNjLmNvbmZpZ3VyYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZGVzYztcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfcmVkZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpIHtcbiAgZGVzYyA9IHJld3JpdGVEZXNjcmlwdG9yKG9iaiwgcHJvcCwgZGVzYyk7XG4gIHJldHVybiBfZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjKTtcbn07XG5cbmZ1bmN0aW9uIGlzVW5jb25maWd1cmFibGUgKG9iaiwgcHJvcCkge1xuICByZXR1cm4gb2JqICYmIG9ialt1bmNvbmZpZ3VyYWJsZXNLZXldICYmIG9ialt1bmNvbmZpZ3VyYWJsZXNLZXldW3Byb3BdO1xufVxuXG5mdW5jdGlvbiByZXdyaXRlRGVzY3JpcHRvciAob2JqLCBwcm9wLCBkZXNjKSB7XG4gIGRlc2MuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgaWYgKCFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgIGlmICghb2JqW3VuY29uZmlndXJhYmxlc0tleV0pIHtcbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShvYmosIHVuY29uZmlndXJhYmxlc0tleSwgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHt9IH0pO1xuICAgIH1cbiAgICBvYmpbdW5jb25maWd1cmFibGVzS2V5XVtwcm9wXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGRlc2M7XG59XG5cblxuIl19
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var define_property_1 = __webpack_require__(14);
		var utils = __webpack_require__(9);
		function apply() {
		    if (utils.isWebWorker() || utils.isNode() || !('registerElement' in global.document)) {
		        return;
		    }
		    var _registerElement = document.registerElement;
		    var callbacks = [
		        'createdCallback',
		        'attachedCallback',
		        'detachedCallback',
		        'attributeChangedCallback'
		    ];
		    document.registerElement = function (name, opts) {
		        if (opts && opts.prototype) {
		            callbacks.forEach(function (callback) {
		                if (opts.prototype.hasOwnProperty(callback)) {
		                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
		                    if (descriptor && descriptor.value) {
		                        descriptor.value = global.zone.bind(descriptor.value);
		                        define_property_1._redefineProperty(opts.prototype, callback, descriptor);
		                    }
		                    else {
		                        opts.prototype[callback] = global.zone.bind(opts.prototype[callback]);
		                    }
		                }
		                else if (opts.prototype[callback]) {
		                    opts.prototype[callback] = global.zone.bind(opts.prototype[callback]);
		                }
		            });
		        }
		        return _registerElement.apply(document, [name, opts]);
		    };
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9yZWdpc3Rlci1lbGVtZW50LnRzIl0sIm5hbWVzIjpbImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0MsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUVsQztJQUNFQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxpQkFBaUJBLElBQVVBLE1BQU9BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzVGQSxNQUFNQSxDQUFDQTtJQUNUQSxDQUFDQTtJQUVEQSxJQUFJQSxnQkFBZ0JBLEdBQVNBLFFBQVNBLENBQUNBLGVBQWVBLENBQUNBO0lBQ3ZEQSxJQUFJQSxTQUFTQSxHQUFHQTtRQUNkQSxpQkFBaUJBO1FBQ2pCQSxrQkFBa0JBO1FBQ2xCQSxrQkFBa0JBO1FBQ2xCQSwwQkFBMEJBO0tBQzNCQSxDQUFDQTtJQUVJQSxRQUFTQSxDQUFDQSxlQUFlQSxHQUFHQSxVQUFVQSxJQUFJQSxFQUFFQSxJQUFJQTtRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVE7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzNFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RELG1DQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMxRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDQTtBQUNKQSxDQUFDQTtBQWhDZSxhQUFLLFFBZ0NwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtfcmVkZWZpbmVQcm9wZXJ0eX0gZnJvbSAnLi9kZWZpbmUtcHJvcGVydHknO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGlmICh1dGlscy5pc1dlYldvcmtlcigpIHx8IHV0aWxzLmlzTm9kZSgpIHx8ICEoJ3JlZ2lzdGVyRWxlbWVudCcgaW4gKDxhbnk+Z2xvYmFsKS5kb2N1bWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX3JlZ2lzdGVyRWxlbWVudCA9ICg8YW55PmRvY3VtZW50KS5yZWdpc3RlckVsZW1lbnQ7XG4gIHZhciBjYWxsYmFja3MgPSBbXG4gICAgJ2NyZWF0ZWRDYWxsYmFjaycsXG4gICAgJ2F0dGFjaGVkQ2FsbGJhY2snLFxuICAgICdkZXRhY2hlZENhbGxiYWNrJyxcbiAgICAnYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJ1xuICBdO1xuXG4gICg8YW55PmRvY3VtZW50KS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xuICAgIGlmIChvcHRzICYmIG9wdHMucHJvdG90eXBlKSB7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9wdHMucHJvdG90eXBlLmhhc093blByb3BlcnR5KGNhbGxiYWNrKSkge1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcHRzLnByb3RvdHlwZSwgY2FsbGJhY2spO1xuICAgICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWUpIHtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBnbG9iYWwuem9uZS5iaW5kKGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgICAgICAgX3JlZGVmaW5lUHJvcGVydHkob3B0cy5wcm90b3R5cGUsIGNhbGxiYWNrLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cy5wcm90b3R5cGVbY2FsbGJhY2tdID0gZ2xvYmFsLnpvbmUuYmluZChvcHRzLnByb3RvdHlwZVtjYWxsYmFja10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLnByb3RvdHlwZVtjYWxsYmFja10pIHtcbiAgICAgICAgICBvcHRzLnByb3RvdHlwZVtjYWxsYmFja10gPSBnbG9iYWwuem9uZS5iaW5kKG9wdHMucHJvdG90eXBlW2NhbGxiYWNrXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBfcmVnaXN0ZXJFbGVtZW50LmFwcGx5KGRvY3VtZW50LCBbbmFtZSwgb3B0c10pO1xuICB9O1xufVxuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {'use strict';
		var utils = __webpack_require__(9);
		function apply() {
		    // patched properties depend on addEventListener, so this needs to come first
		    if (global.EventTarget) {
		        utils.patchEventTargetMethods(global.EventTarget.prototype);
		    }
		    else {
		        var apis = [
		            'ApplicationCache',
		            'EventSource',
		            'FileReader',
		            'InputMethodContext',
		            'MediaController',
		            'MessagePort',
		            'Node',
		            'Performance',
		            'SVGElementInstance',
		            'SharedWorker',
		            'TextTrack',
		            'TextTrackCue',
		            'TextTrackList',
		            'WebKitNamedFlow',
		            'Worker',
		            'WorkerGlobalScope',
		            'XMLHttpRequest',
		            'XMLHttpRequestEventTarget',
		            'XMLHttpRequestUpload'
		        ];
		        apis.forEach(function (api) {
		            var proto = global[api] && global[api].prototype;
		            // Some browsers e.g. Android 4.3's don't actually implement
		            // the EventTarget methods for all of these e.g. FileReader.
		            // In this case, there is nothing to patch.
		            if (proto && proto.addEventListener) {
		                utils.patchEventTargetMethods(proto);
		            }
		        });
		        // Patch the methods on `window` instead of `Window.prototype`
		        // `Window` is not accessible on Android 4.3
		        if (typeof (window) !== 'undefined') {
		            utils.patchEventTargetMethods(window);
		        }
		    }
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdGFyZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2V2ZW50LXRhcmdldC50cyJdLCJuYW1lcyI6WyJhcHBseSJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFFbEM7SUFDRUEsNkVBQTZFQTtJQUM3RUEsRUFBRUEsQ0FBQ0EsQ0FBT0EsTUFBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBT0EsTUFBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFJckVBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ05BLElBQUlBLElBQUlBLEdBQUdBO1lBQ1RBLGtCQUFrQkE7WUFDbEJBLGFBQWFBO1lBQ2JBLFlBQVlBO1lBQ1pBLG9CQUFvQkE7WUFDcEJBLGlCQUFpQkE7WUFDakJBLGFBQWFBO1lBQ2JBLE1BQU1BO1lBQ05BLGFBQWFBO1lBQ2JBLG9CQUFvQkE7WUFDcEJBLGNBQWNBO1lBQ2RBLFdBQVdBO1lBQ1hBLGNBQWNBO1lBQ2RBLGVBQWVBO1lBQ2ZBLGlCQUFpQkE7WUFDakJBLFFBQVFBO1lBQ1JBLG1CQUFtQkE7WUFDbkJBLGdCQUFnQkE7WUFDaEJBLDJCQUEyQkE7WUFDM0JBLHNCQUFzQkE7U0FDdkJBLENBQUNBO1FBRUZBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFVBQVNBLEdBQUdBO1lBQ3ZCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRWpELDREQUE0RDtZQUM1RCw0REFBNEQ7WUFDNUQsMkNBQTJDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUMsQ0FBQ0EsQ0FBQ0E7UUFFSEEsOERBQThEQTtRQUM5REEsNENBQTRDQTtRQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0hBLENBQUNBO0FBL0NlLGFBQUssUUErQ3BCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KCkge1xuICAvLyBwYXRjaGVkIHByb3BlcnRpZXMgZGVwZW5kIG9uIGFkZEV2ZW50TGlzdGVuZXIsIHNvIHRoaXMgbmVlZHMgdG8gY29tZSBmaXJzdFxuICBpZiAoKDxhbnk+Z2xvYmFsKS5FdmVudFRhcmdldCkge1xuICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKCg8YW55Pmdsb2JhbCkuRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcblxuICAvLyBOb3RlOiBFdmVudFRhcmdldCBpcyBub3QgYXZhaWxhYmxlIGluIGFsbCBicm93c2VycyxcbiAgLy8gaWYgaXQncyBub3QgYXZhaWxhYmxlLCB3ZSBpbnN0ZWFkIHBhdGNoIHRoZSBBUElzIGluIHRoZSBJREwgdGhhdCBpbmhlcml0IGZyb20gRXZlbnRUYXJnZXRcbiAgfSBlbHNlIHtcbiAgICB2YXIgYXBpcyA9IFtcbiAgICAgICdBcHBsaWNhdGlvbkNhY2hlJyxcbiAgICAgICdFdmVudFNvdXJjZScsXG4gICAgICAnRmlsZVJlYWRlcicsXG4gICAgICAnSW5wdXRNZXRob2RDb250ZXh0JyxcbiAgICAgICdNZWRpYUNvbnRyb2xsZXInLFxuICAgICAgJ01lc3NhZ2VQb3J0JyxcbiAgICAgICdOb2RlJyxcbiAgICAgICdQZXJmb3JtYW5jZScsXG4gICAgICAnU1ZHRWxlbWVudEluc3RhbmNlJyxcbiAgICAgICdTaGFyZWRXb3JrZXInLFxuICAgICAgJ1RleHRUcmFjaycsXG4gICAgICAnVGV4dFRyYWNrQ3VlJyxcbiAgICAgICdUZXh0VHJhY2tMaXN0JyxcbiAgICAgICdXZWJLaXROYW1lZEZsb3cnLFxuICAgICAgJ1dvcmtlcicsXG4gICAgICAnV29ya2VyR2xvYmFsU2NvcGUnLFxuICAgICAgJ1hNTEh0dHBSZXF1ZXN0JyxcbiAgICAgICdYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0JyxcbiAgICAgICdYTUxIdHRwUmVxdWVzdFVwbG9hZCdcbiAgICBdO1xuXG4gICAgYXBpcy5mb3JFYWNoKGZ1bmN0aW9uKGFwaSkge1xuICAgICAgdmFyIHByb3RvID0gZ2xvYmFsW2FwaV0gJiYgZ2xvYmFsW2FwaV0ucHJvdG90eXBlO1xuXG4gICAgICAvLyBTb21lIGJyb3dzZXJzIGUuZy4gQW5kcm9pZCA0LjMncyBkb24ndCBhY3R1YWxseSBpbXBsZW1lbnRcbiAgICAgIC8vIHRoZSBFdmVudFRhcmdldCBtZXRob2RzIGZvciBhbGwgb2YgdGhlc2UgZS5nLiBGaWxlUmVhZGVyLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCB0aGVyZSBpcyBub3RoaW5nIHRvIHBhdGNoLlxuICAgICAgaWYgKHByb3RvICYmIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdXRpbHMucGF0Y2hFdmVudFRhcmdldE1ldGhvZHMocHJvdG8pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUGF0Y2ggdGhlIG1ldGhvZHMgb24gYHdpbmRvd2AgaW5zdGVhZCBvZiBgV2luZG93LnByb3RvdHlwZWBcbiAgICAvLyBgV2luZG93YCBpcyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDQuM1xuICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKHdpbmRvdyk7XG4gICAgfVxuICB9XG59XG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var webSocketPatch = __webpack_require__(18);
		var utils = __webpack_require__(9);
		var keys = __webpack_require__(7);
		var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');
		function apply() {
		    if (utils.isNode()) {
		        return;
		    }
		    var supportsWebSocket = typeof WebSocket !== 'undefined';
		    if (canPatchViaPropertyDescriptor()) {
		        // for browsers that we can patch the descriptor:  Chrome & Firefox
		        if (!utils.isWebWorker()) {
		            var onEventNames = eventNames.map(function (property) {
		                return 'on' + property;
		            });
		            utils.patchProperties(HTMLElement.prototype, onEventNames);
		        }
		        utils.patchProperties(XMLHttpRequest.prototype);
		        if (supportsWebSocket) {
		            utils.patchProperties(WebSocket.prototype);
		        }
		    }
		    else {
		        // Safari, Android browsers (Jelly Bean)
		        if (!utils.isWebWorker()) {
		            patchViaCapturingAllTheEvents();
		        }
		        utils.patchClass('XMLHttpRequest');
		        if (supportsWebSocket) {
		            webSocketPatch.apply();
		        }
		    }
		}
		exports.apply = apply;
		function canPatchViaPropertyDescriptor() {
		    if (!utils.isWebWorker() && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick')
		        && typeof Element !== 'undefined') {
		        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
		        // IDL interface attributes are not configurable
		        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
		        if (desc && !desc.configurable)
		            return false;
		    }
		    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
		        get: function () {
		            return true;
		        }
		    });
		    var req = new XMLHttpRequest();
		    var result = !!req.onreadystatechange;
		    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
		    return result;
		}
		;
		var unboundKey = keys.create('unbound');
		// Whenever any event fires, we check the event target and all parents
		// for `onwhatever` properties and replace them with zone-bound functions
		// - Chrome (for now)
		function patchViaCapturingAllTheEvents() {
		    eventNames.forEach(function (property) {
		        var onproperty = 'on' + property;
		        document.addEventListener(property, function (event) {
		            var elt = event.target, bound;
		            while (elt) {
		                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
		                    bound = global.zone.bind(elt[onproperty]);
		                    bound[unboundKey] = elt[onproperty];
		                    elt[onproperty] = bound;
		                }
		                elt = elt.parentElement;
		            }
		        }, true);
		    });
		}
		;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9wcm9wZXJ0eS1kZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbImFwcGx5IiwiY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IiLCJwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxjQUFjLFdBQU0sYUFBYSxDQUFDLENBQUE7QUFDOUMsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDbEMsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFaEMsSUFBSSxVQUFVLEdBQUcsdW1CQUF1bUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFcG9CO0lBQ0VBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ25CQSxNQUFNQSxDQUFDQTtJQUNUQSxDQUFDQTtJQUVEQSxJQUFJQSxpQkFBaUJBLEdBQUdBLE9BQU9BLFNBQVNBLEtBQUtBLFdBQVdBLENBQUNBO0lBQ3pEQSxFQUFFQSxDQUFDQSxDQUFDQSw2QkFBNkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BDQSxtRUFBbUVBO1FBQ25FQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUN4QkEsSUFBSUEsWUFBWUEsR0FBR0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsUUFBUUE7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLENBQUMsQ0FBQ0EsQ0FBQ0E7WUFDSEEsS0FBS0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLENBQUNBO1FBQ0RBLEtBQUtBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQ2hEQSxFQUFFQSxDQUFDQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxLQUFLQSxDQUFDQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDTkEsd0NBQXdDQTtRQUN4Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7WUFDeEJBLDZCQUE2QkEsRUFBRUEsQ0FBQ0E7UUFDbENBLENBQUNBO1FBQ0RBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLEVBQUVBLENBQUNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLGNBQWNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtJQUNIQSxDQUFDQTtBQUNIQSxDQUFDQTtBQTVCZSxhQUFLLFFBNEJwQixDQUFBO0FBRUQ7SUFDRUMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxXQUFXQSxDQUFDQSxTQUFTQSxFQUFFQSxTQUFTQSxDQUFDQTtXQUN2RkEsT0FBT0EsT0FBT0EsS0FBS0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdENBLHdEQUF3REE7UUFDeERBLGdEQUFnREE7UUFDaERBLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLHdCQUF3QkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekVBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQy9DQSxDQUFDQTtJQUVEQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxFQUFFQSxvQkFBb0JBLEVBQUVBO1FBQ3BFQSxHQUFHQSxFQUFFQTtZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0ZBLENBQUNBLENBQUNBO0lBQ0hBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLGNBQWNBLEVBQUVBLENBQUNBO0lBQy9CQSxJQUFJQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBO0lBQ3RDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxFQUFFQSxvQkFBb0JBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBQzFFQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtBQUNoQkEsQ0FBQ0E7QUFBQSxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV4QyxzRUFBc0U7QUFDdEUseUVBQXlFO0FBQ3pFLHFCQUFxQjtBQUNyQjtJQUNFQyxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxRQUFRQTtRQUNuQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxLQUFLO1lBQ2pELElBQUksR0FBRyxHQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ3BDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNwQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixDQUFDO2dCQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUNBLENBQUNBO0FBQ0xBLENBQUNBO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdlYlNvY2tldFBhdGNoIGZyb20gJy4vd2Vic29ja2V0JztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCAqIGFzIGtleXMgZnJvbSAnLi4va2V5cyc7XG5cbnZhciBldmVudE5hbWVzID0gJ2NvcHkgY3V0IHBhc3RlIGFib3J0IGJsdXIgZm9jdXMgY2FucGxheSBjYW5wbGF5dGhyb3VnaCBjaGFuZ2UgY2xpY2sgY29udGV4dG1lbnUgZGJsY2xpY2sgZHJhZyBkcmFnZW5kIGRyYWdlbnRlciBkcmFnbGVhdmUgZHJhZ292ZXIgZHJhZ3N0YXJ0IGRyb3AgZHVyYXRpb25jaGFuZ2UgZW1wdGllZCBlbmRlZCBpbnB1dCBpbnZhbGlkIGtleWRvd24ga2V5cHJlc3Mga2V5dXAgbG9hZCBsb2FkZWRkYXRhIGxvYWRlZG1ldGFkYXRhIGxvYWRzdGFydCBtZXNzYWdlIG1vdXNlZG93biBtb3VzZWVudGVyIG1vdXNlbGVhdmUgbW91c2Vtb3ZlIG1vdXNlb3V0IG1vdXNlb3ZlciBtb3VzZXVwIHBhdXNlIHBsYXkgcGxheWluZyBwcm9ncmVzcyByYXRlY2hhbmdlIHJlc2V0IHNjcm9sbCBzZWVrZWQgc2Vla2luZyBzZWxlY3Qgc2hvdyBzdGFsbGVkIHN1Ym1pdCBzdXNwZW5kIHRpbWV1cGRhdGUgdm9sdW1lY2hhbmdlIHdhaXRpbmcgbW96ZnVsbHNjcmVlbmNoYW5nZSBtb3pmdWxsc2NyZWVuZXJyb3IgbW96cG9pbnRlcmxvY2tjaGFuZ2UgbW96cG9pbnRlcmxvY2tlcnJvciBlcnJvciB3ZWJnbGNvbnRleHRyZXN0b3JlZCB3ZWJnbGNvbnRleHRsb3N0IHdlYmdsY29udGV4dGNyZWF0aW9uZXJyb3InLnNwbGl0KCcgJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseSgpIHtcbiAgaWYgKHV0aWxzLmlzTm9kZSgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICB2YXIgc3VwcG9ydHNXZWJTb2NrZXQgPSB0eXBlb2YgV2ViU29ja2V0ICE9PSAndW5kZWZpbmVkJztcbiAgaWYgKGNhblBhdGNoVmlhUHJvcGVydHlEZXNjcmlwdG9yKCkpIHtcbiAgICAvLyBmb3IgYnJvd3NlcnMgdGhhdCB3ZSBjYW4gcGF0Y2ggdGhlIGRlc2NyaXB0b3I6ICBDaHJvbWUgJiBGaXJlZm94XG4gICAgaWYgKCF1dGlscy5pc1dlYldvcmtlcigpKXtcbiAgICAgIHZhciBvbkV2ZW50TmFtZXMgPSBldmVudE5hbWVzLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuICdvbicgKyBwcm9wZXJ0eTtcbiAgICAgIH0pO1xuICAgICAgdXRpbHMucGF0Y2hQcm9wZXJ0aWVzKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgb25FdmVudE5hbWVzKTtcbiAgICB9XG4gICAgdXRpbHMucGF0Y2hQcm9wZXJ0aWVzKFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSk7XG4gICAgaWYgKHN1cHBvcnRzV2ViU29ja2V0KSB7XG4gICAgICB1dGlscy5wYXRjaFByb3BlcnRpZXMoV2ViU29ja2V0LnByb3RvdHlwZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNhZmFyaSwgQW5kcm9pZCBicm93c2VycyAoSmVsbHkgQmVhbilcbiAgICBpZiAoIXV0aWxzLmlzV2ViV29ya2VyKCkpe1xuICAgICAgcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKTtcbiAgICB9XG4gICAgdXRpbHMucGF0Y2hDbGFzcygnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHdlYlNvY2tldFBhdGNoLmFwcGx5KCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhblBhdGNoVmlhUHJvcGVydHlEZXNjcmlwdG9yKCkge1xuICBpZiAoIXV0aWxzLmlzV2ViV29ya2VyKCkgJiYgIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnb25jbGljaycpXG4gICAgICAmJiB0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBXZWJLaXQgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDM2NFxuICAgIC8vIElETCBpbnRlcmZhY2UgYXR0cmlidXRlcyBhcmUgbm90IGNvbmZpZ3VyYWJsZVxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKTtcbiAgICBpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciByZXN1bHQgPSAhIXJlcS5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7fSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgdW5ib3VuZEtleSA9IGtleXMuY3JlYXRlKCd1bmJvdW5kJyk7XG5cbi8vIFdoZW5ldmVyIGFueSBldmVudCBmaXJlcywgd2UgY2hlY2sgdGhlIGV2ZW50IHRhcmdldCBhbmQgYWxsIHBhcmVudHNcbi8vIGZvciBgb253aGF0ZXZlcmAgcHJvcGVydGllcyBhbmQgcmVwbGFjZSB0aGVtIHdpdGggem9uZS1ib3VuZCBmdW5jdGlvbnNcbi8vIC0gQ2hyb21lIChmb3Igbm93KVxuZnVuY3Rpb24gcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKSB7XG4gIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgb25wcm9wZXJ0eSA9ICdvbicgKyBwcm9wZXJ0eTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHByb3BlcnR5LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBlbHQgPSA8Tm9kZT5ldmVudC50YXJnZXQsIGJvdW5kO1xuICAgICAgd2hpbGUgKGVsdCkge1xuICAgICAgICBpZiAoZWx0W29ucHJvcGVydHldICYmICFlbHRbb25wcm9wZXJ0eV1bdW5ib3VuZEtleV0pIHtcbiAgICAgICAgICBib3VuZCA9IGdsb2JhbC56b25lLmJpbmQoZWx0W29ucHJvcGVydHldKTtcbiAgICAgICAgICBib3VuZFt1bmJvdW5kS2V5XSA9IGVsdFtvbnByb3BlcnR5XTtcbiAgICAgICAgICBlbHRbb25wcm9wZXJ0eV0gPSBib3VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHQgPSBlbHQucGFyZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9LCB0cnVlKTtcbiAgfSk7XG59O1xuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
		// we have to patch the instance since the proto is non-configurable
		function apply() {
		    var WS = global.WebSocket;
		    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
		    // On older Chrome, no need since EventTarget was already patched
		    if (!global.EventTarget) {
		        utils.patchEventTargetMethods(WS.prototype);
		    }
		    global.WebSocket = function (a, b) {
		        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
		        var proxySocket;
		        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
		        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
		        if (onmessageDesc && onmessageDesc.configurable === false) {
		            proxySocket = Object.create(socket);
		            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
		                proxySocket[propName] = function () {
		                    return socket[propName].apply(socket, arguments);
		                };
		            });
		        }
		        else {
		            // we can patch the real socket
		            proxySocket = socket;
		        }
		        utils.patchProperties(proxySocket, ['onclose', 'onerror', 'onmessage', 'onopen']);
		        return proxySocket;
		    };
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL3dlYnNvY2tldC50cyJdLCJuYW1lcyI6WyJhcHBseSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFFbEMsb0VBQW9FO0FBQ3BFO0lBQ0VBLElBQUlBLEVBQUVBLEdBQVNBLE1BQU9BLENBQUNBLFNBQVNBLENBQUNBO0lBQ2pDQSx5RkFBeUZBO0lBQ3pGQSxpRUFBaUVBO0lBQ2pFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFPQSxNQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvQkEsS0FBS0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7SUFDS0EsTUFBT0EsQ0FBQ0EsU0FBU0EsR0FBR0EsVUFBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDckMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksV0FBVyxDQUFDO1FBRWhCLGdHQUFnRztRQUNoRyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtnQkFDcEYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sK0JBQStCO1lBQy9CLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVsRixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQ0E7QUFDSkEsQ0FBQ0E7QUE3QmUsYUFBSyxRQTZCcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuLy8gd2UgaGF2ZSB0byBwYXRjaCB0aGUgaW5zdGFuY2Ugc2luY2UgdGhlIHByb3RvIGlzIG5vbi1jb25maWd1cmFibGVcbmV4cG9ydCBmdW5jdGlvbiBhcHBseSgpIHtcbiAgdmFyIFdTID0gKDxhbnk+Z2xvYmFsKS5XZWJTb2NrZXQ7XG4gIC8vIE9uIFNhZmFyaSB3aW5kb3cuRXZlbnRUYXJnZXQgZG9lc24ndCBleGlzdCBzbyBuZWVkIHRvIHBhdGNoIFdTIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyXG4gIC8vIE9uIG9sZGVyIENocm9tZSwgbm8gbmVlZCBzaW5jZSBFdmVudFRhcmdldCB3YXMgYWxyZWFkeSBwYXRjaGVkXG4gIGlmICghKDxhbnk+Z2xvYmFsKS5FdmVudFRhcmdldCkge1xuICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKFdTLnByb3RvdHlwZSk7XG4gIH1cbiAgKDxhbnk+Z2xvYmFsKS5XZWJTb2NrZXQgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNvY2tldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gbmV3IFdTKGEsIGIpIDogbmV3IFdTKGEpO1xuICAgIHZhciBwcm94eVNvY2tldDtcblxuICAgIC8vIFNhZmFyaSA3LjAgaGFzIG5vbi1jb25maWd1cmFibGUgb3duICdvbm1lc3NhZ2UnIGFuZCBmcmllbmRzIHByb3BlcnRpZXMgb24gdGhlIHNvY2tldCBpbnN0YW5jZVxuICAgIHZhciBvbm1lc3NhZ2VEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb2NrZXQsICdvbm1lc3NhZ2UnKTtcbiAgICBpZiAob25tZXNzYWdlRGVzYyAmJiBvbm1lc3NhZ2VEZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHByb3h5U29ja2V0ID0gT2JqZWN0LmNyZWF0ZShzb2NrZXQpO1xuICAgICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnc2VuZCcsICdjbG9zZSddLmZvckVhY2goZnVuY3Rpb24ocHJvcE5hbWUpIHtcbiAgICAgICAgcHJveHlTb2NrZXRbcHJvcE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNvY2tldFtwcm9wTmFtZV0uYXBwbHkoc29ja2V0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGNhbiBwYXRjaCB0aGUgcmVhbCBzb2NrZXRcbiAgICAgIHByb3h5U29ja2V0ID0gc29ja2V0O1xuICAgIH1cblxuICAgIHV0aWxzLnBhdGNoUHJvcGVydGllcyhwcm94eVNvY2tldCwgWydvbmNsb3NlJywgJ29uZXJyb3InLCAnb25tZXNzYWdlJywgJ29ub3BlbiddKTtcblxuICAgIHJldHVybiBwcm94eVNvY2tldDtcbiAgfTtcbn1cbiJdfQ==
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
		function apply() {
		    if (global.navigator && global.navigator.geolocation) {
		        utils.patchPrototype(global.navigator.geolocation, [
		            'getCurrentPosition',
		            'watchPosition'
		        ]);
		    }
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvZ2VvbG9jYXRpb24udHMiXSwibmFtZXMiOlsiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBRWxDO0lBQ0VBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLElBQUlBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3JEQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQTtZQUNqREEsb0JBQW9CQTtZQUNwQkEsZUFBZUE7U0FDaEJBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0FBQ0hBLENBQUNBO0FBUGUsYUFBSyxRQU9wQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGlmIChnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICB1dGlscy5wYXRjaFByb3RvdHlwZShnbG9iYWwubmF2aWdhdG9yLmdlb2xvY2F0aW9uLCBbXG4gICAgICAnZ2V0Q3VycmVudFBvc2l0aW9uJyxcbiAgICAgICd3YXRjaFBvc2l0aW9uJ1xuICAgIF0pO1xuICB9XG59XG4iXX0=
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		var utils = __webpack_require__(9);
		function apply() {
		    utils.patchClass('FileReader');
		}
		exports.apply = apply;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1yZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvZmlsZS1yZWFkZXIudHMiXSwibmFtZXMiOlsiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBRWxDO0lBQ0VBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0FBQ2pDQSxDQUFDQTtBQUZlLGFBQUssUUFFcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KCkge1xuICB1dGlscy5wYXRjaENsYXNzKCdGaWxlUmVhZGVyJyk7XG59XG4iXX0=
	
	/***/ }
	/******/ ]);
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {var long_stack_trace_1 = __webpack_require__(1);
		if (!global.Zone) {
		    throw new Error('zone.js should be installed before loading the long stack trace zone');
		}
		global.Zone.longStackTraceZone = long_stack_trace_1.longStackTraceZone;
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1zdGFjay10cmFjZS16b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2Jyb3dzZXIvbG9uZy1zdGFjay10cmFjZS16b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlDQUFpQywyQkFBMkIsQ0FBQyxDQUFBO0FBRTdELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0FBQzFGLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHFDQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb25nU3RhY2tUcmFjZVpvbmV9IGZyb20gJy4uL3pvbmVzL2xvbmctc3RhY2stdHJhY2UnO1xuXG5pZiAoIWdsb2JhbC5ab25lKSB7XG4gIHRocm93IG5ldyBFcnJvcignem9uZS5qcyBzaG91bGQgYmUgaW5zdGFsbGVkIGJlZm9yZSBsb2FkaW5nIHRoZSBsb25nIHN0YWNrIHRyYWNlIHpvbmUnKTtcbn1cblxuZ2xvYmFsLlpvbmUubG9uZ1N0YWNrVHJhY2Vab25lID0gbG9uZ1N0YWNrVHJhY2Vab25lO1xuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		/* WEBPACK VAR INJECTION */(function(global) {/*
		 * Wrapped stacktrace
		 *
		 * We need this because in some implementations, constructing a trace is slow
		 * and so we want to defer accessing the trace for as long as possible
		 */
		'use strict';
		function _Stacktrace(e) {
		    this._e = e;
		}
		_Stacktrace.prototype.get = function () {
		    if (global.zone.stackFramesFilter && this._e.stack) {
		        return this._e.stack
		            .split('\n')
		            .filter(global.zone.stackFramesFilter)
		            .join('\n');
		    }
		    return this._e.stack;
		};
		function _getStacktraceWithUncaughtError() {
		    return new _Stacktrace(new Error());
		}
		function _getStacktraceWithCaughtError() {
		    try {
		        throw new Error();
		    }
		    catch (e) {
		        return new _Stacktrace(e);
		    }
		}
		// Some implementations of exception handling don't create a stack trace if the exception
		// isn't thrown, however it's faster not to actually throw the exception.
		var stack = _getStacktraceWithUncaughtError();
		var _getStacktrace = stack && stack._e.stack
		    ? _getStacktraceWithUncaughtError
		    : _getStacktraceWithCaughtError;
		exports.longStackTraceZone = {
		    getLongStacktrace: function (exception) {
		        var traces = [];
		        var currentZone = this;
		        if (exception) {
		            if (currentZone.stackFramesFilter && exception.stack) {
		                traces.push(exception.stack.split('\n')
		                    .filter(currentZone.stackFramesFilter)
		                    .join('\n'));
		            }
		            else {
		                traces.push(exception.stack);
		            }
		        }
		        var now = Date.now();
		        while (currentZone && currentZone.constructedAtException) {
		            traces.push('--- ' + (new Date(currentZone.constructedAtTime)).toString() +
		                ' - ' + (now - currentZone.constructedAtTime) + 'ms ago', currentZone.constructedAtException.get());
		            currentZone = currentZone.parent;
		        }
		        return traces.join('\n');
		    },
		    stackFramesFilter: function (line) {
		        return !/zone(-microtask)?(\.min)?\.js/.test(line);
		    },
		    onError: function (exception) {
		        var reporter = this.reporter || console.log.bind(console);
		        reporter(exception.toString());
		        reporter(this.getLongStacktrace(exception));
		    },
		    '$fork': function (parentFork) {
		        return function () {
		            var newZone = parentFork.apply(this, arguments);
		            newZone.constructedAtException = _getStacktrace();
		            newZone.constructedAtTime = Date.now();
		            return newZone;
		        };
		    }
		};
		//# sourceMappingURLDisabled=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1zdGFjay10cmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi96b25lcy9sb25nLXN0YWNrLXRyYWNlLnRzIl0sIm5hbWVzIjpbIl9TdGFja3RyYWNlIiwiX2dldFN0YWNrdHJhY2VXaXRoVW5jYXVnaHRFcnJvciIsIl9nZXRTdGFja3RyYWNlV2l0aENhdWdodEVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILFlBQVksQ0FBQztBQUViLHFCQUFxQixDQUFDO0lBQ3BCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtBQUNkQSxDQUFDQTtBQUVELFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUs7YUFDakIsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQUVGO0lBQ0VDLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLElBQUlBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBO0FBQ3RDQSxDQUFDQTtBQUVEO0lBQ0VDLElBQUlBLENBQUNBO1FBQ0hBLE1BQU1BLElBQUlBLEtBQUtBLEVBQUVBLENBQUNBO0lBQ3BCQSxDQUFFQTtJQUFBQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNYQSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUFFRCx5RkFBeUY7QUFDekYseUVBQXlFO0FBQ3pFLElBQUksS0FBSyxHQUFHLCtCQUErQixFQUFFLENBQUM7QUFFOUMsSUFBSSxjQUFjLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSztNQUN4QywrQkFBK0I7TUFDL0IsNkJBQTZCLENBQUM7QUFFckIsMEJBQWtCLEdBQUc7SUFDaEMsaUJBQWlCLEVBQUUsVUFBVSxTQUFTO1FBQ3BDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7cUJBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVyQixPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN6RCxNQUFNLENBQUMsSUFBSSxDQUNQLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUM3RCxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsUUFBUSxFQUN4RCxXQUFXLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQixFQUFFLFVBQVUsSUFBSTtRQUMvQixNQUFNLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELE9BQU8sRUFBRSxVQUFVLFNBQVM7UUFDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxPQUFPLEVBQUUsVUFBVSxVQUFVO1FBQzNCLE1BQU0sQ0FBQztZQUNMLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxzQkFBc0IsR0FBRyxjQUFjLEVBQUUsQ0FBQztZQUNsRCxPQUFPLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV3JhcHBlZCBzdGFja3RyYWNlXG4gKlxuICogV2UgbmVlZCB0aGlzIGJlY2F1c2UgaW4gc29tZSBpbXBsZW1lbnRhdGlvbnMsIGNvbnN0cnVjdGluZyBhIHRyYWNlIGlzIHNsb3dcbiAqIGFuZCBzbyB3ZSB3YW50IHRvIGRlZmVyIGFjY2Vzc2luZyB0aGUgdHJhY2UgZm9yIGFzIGxvbmcgYXMgcG9zc2libGVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9TdGFja3RyYWNlKGUpIHtcbiAgdGhpcy5fZSA9IGU7XG59XG5cbl9TdGFja3RyYWNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChnbG9iYWwuem9uZS5zdGFja0ZyYW1lc0ZpbHRlciAmJiB0aGlzLl9lLnN0YWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Uuc3RhY2tcbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5maWx0ZXIoZ2xvYmFsLnpvbmUuc3RhY2tGcmFtZXNGaWx0ZXIpXG4gICAgICAuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5fZS5zdGFjaztcbn07XG5cbmZ1bmN0aW9uIF9nZXRTdGFja3RyYWNlV2l0aFVuY2F1Z2h0RXJyb3IgKCkge1xuICByZXR1cm4gbmV3IF9TdGFja3RyYWNlKG5ldyBFcnJvcigpKTtcbn1cblxuZnVuY3Rpb24gX2dldFN0YWNrdHJhY2VXaXRoQ2F1Z2h0RXJyb3IgKCkge1xuICB0cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RhY2t0cmFjZShlKTtcbiAgfVxufVxuXG4vLyBTb21lIGltcGxlbWVudGF0aW9ucyBvZiBleGNlcHRpb24gaGFuZGxpbmcgZG9uJ3QgY3JlYXRlIGEgc3RhY2sgdHJhY2UgaWYgdGhlIGV4Y2VwdGlvblxuLy8gaXNuJ3QgdGhyb3duLCBob3dldmVyIGl0J3MgZmFzdGVyIG5vdCB0byBhY3R1YWxseSB0aHJvdyB0aGUgZXhjZXB0aW9uLlxudmFyIHN0YWNrID0gX2dldFN0YWNrdHJhY2VXaXRoVW5jYXVnaHRFcnJvcigpO1xuXG52YXIgX2dldFN0YWNrdHJhY2UgPSBzdGFjayAmJiBzdGFjay5fZS5zdGFja1xuICA/IF9nZXRTdGFja3RyYWNlV2l0aFVuY2F1Z2h0RXJyb3JcbiAgOiBfZ2V0U3RhY2t0cmFjZVdpdGhDYXVnaHRFcnJvcjtcblxuZXhwb3J0IGNvbnN0IGxvbmdTdGFja1RyYWNlWm9uZSA9IHtcbiAgZ2V0TG9uZ1N0YWNrdHJhY2U6IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICB2YXIgdHJhY2VzID0gW107XG4gICAgdmFyIGN1cnJlbnRab25lID0gdGhpcztcbiAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICBpZiAoY3VycmVudFpvbmUuc3RhY2tGcmFtZXNGaWx0ZXIgJiYgZXhjZXB0aW9uLnN0YWNrKSB7XG4gICAgICAgIHRyYWNlcy5wdXNoKGV4Y2VwdGlvbi5zdGFjay5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgICAgLmZpbHRlcihjdXJyZW50Wm9uZS5zdGFja0ZyYW1lc0ZpbHRlcilcbiAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYWNlcy5wdXNoKGV4Y2VwdGlvbi5zdGFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRab25lICYmIGN1cnJlbnRab25lLmNvbnN0cnVjdGVkQXRFeGNlcHRpb24pIHtcbiAgICAgIHRyYWNlcy5wdXNoKFxuICAgICAgICAgICctLS0gJyArIChuZXcgRGF0ZShjdXJyZW50Wm9uZS5jb25zdHJ1Y3RlZEF0VGltZSkpLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICcgLSAnICsgKG5vdyAtIGN1cnJlbnRab25lLmNvbnN0cnVjdGVkQXRUaW1lKSArICdtcyBhZ28nLFxuICAgICAgICAgIGN1cnJlbnRab25lLmNvbnN0cnVjdGVkQXRFeGNlcHRpb24uZ2V0KCkpO1xuICAgICAgY3VycmVudFpvbmUgPSBjdXJyZW50Wm9uZS5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYWNlcy5qb2luKCdcXG4nKTtcbiAgfSxcblxuICBzdGFja0ZyYW1lc0ZpbHRlcjogZnVuY3Rpb24gKGxpbmUpIHtcbiAgICByZXR1cm4gIS96b25lKC1taWNyb3Rhc2spPyhcXC5taW4pP1xcLmpzLy50ZXN0KGxpbmUpO1xuICB9LFxuXG4gIG9uRXJyb3I6IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICB2YXIgcmVwb3J0ZXIgPSB0aGlzLnJlcG9ydGVyIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgcmVwb3J0ZXIoZXhjZXB0aW9uLnRvU3RyaW5nKCkpO1xuICAgIHJlcG9ydGVyKHRoaXMuZ2V0TG9uZ1N0YWNrdHJhY2UoZXhjZXB0aW9uKSk7XG4gIH0sXG5cbiAgJyRmb3JrJzogZnVuY3Rpb24gKHBhcmVudEZvcmspIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbmV3Wm9uZSA9IHBhcmVudEZvcmsuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIG5ld1pvbmUuY29uc3RydWN0ZWRBdEV4Y2VwdGlvbiA9IF9nZXRTdGFja3RyYWNlKCk7XG4gICAgICBuZXdab25lLmNvbnN0cnVjdGVkQXRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHJldHVybiBuZXdab25lO1xuICAgIH1cbiAgfVxufTtcblxuIl19
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ }
	/******/ ]);
	/**
	 @license
	Apache License
	
	Version 2.0, January 2004
	
	http://www.apache.org/licenses/ 
	
	TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
	
	1. Definitions.
	
	"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
	
	"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
	
	"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
	
	"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.
	
	"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
	
	"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
	
	"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
	
	"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
	
	"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."
	
	"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
	
	2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
	
	3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
	
	4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
	
	You must give any other recipients of the Work or Derivative Works a copy of this License; and
	
	You must cause any modified files to carry prominent notices stating that You changed the files; and
	
	You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
	
	If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
	
	5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
	
	6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
	
	7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
	
	8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
	
	9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.
	
	END OF TERMS AND CONDITIONS
	 */
	
	/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	"use strict";
	var Reflect;
	(function (Reflect) {
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
	    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    var __Metadata__ = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param targetKey (Optional) The property key to decorate.
	      * @param targetDescriptor (Optional) The property descriptor for the target key
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     C = Reflect.decorate(decoratorsArray, C);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(C, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, C, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(C, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(C.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, C.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(C.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, targetKey, targetDescriptor) {
	        if (!IsUndefined(targetDescriptor)) {
	            if (!IsArray(decorators)) {
	                throw new TypeError();
	            }
	            else if (!IsObject(target)) {
	                throw new TypeError();
	            }
	            else if (IsUndefined(targetKey)) {
	                throw new TypeError();
	            }
	            else if (!IsObject(targetDescriptor)) {
	                throw new TypeError();
	            }
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	        }
	        else if (!IsUndefined(targetKey)) {
	            if (!IsArray(decorators)) {
	                throw new TypeError();
	            }
	            else if (!IsObject(target)) {
	                throw new TypeError();
	            }
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	        }
	        else {
	            if (!IsArray(decorators)) {
	                throw new TypeError();
	            }
	            else if (!IsConstructor(target)) {
	                throw new TypeError();
	            }
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class C {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class C {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class C {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class C {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class C {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, targetKey) {
	            if (!IsUndefined(targetKey)) {
	                if (!IsObject(target)) {
	                    throw new TypeError();
	                }
	                targetKey = ToPropertyKey(targetKey);
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	            }
	            else {
	                if (!IsConstructor(target)) {
	                    throw new TypeError();
	                }
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
	            }
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param targetKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, C);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryHasMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", C.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryGetMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(C.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryMetadataKeys(target, targetKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(C.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        return OrdinaryOwnMetadataKeys(target, targetKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class C {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", C);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", C, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", C, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (!IsUndefined(targetKey)) {
	            targetKey = ToPropertyKey(targetKey);
	        }
	        // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#deletemetadata-metadatakey-p-
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
	        if (IsUndefined(metadataMap)) {
	            return false;
	        }
	        if (!metadataMap.delete(metadataKey)) {
	            return false;
	        }
	        if (metadataMap.size > 0) {
	            return true;
	        }
	        var targetMetadata = __Metadata__.get(target);
	        targetMetadata.delete(targetKey);
	        if (targetMetadata.size > 0) {
	            return true;
	        }
	        __Metadata__.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated)) {
	                if (!IsConstructor(decorated)) {
	                    throw new TypeError();
	                }
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated)) {
	                if (!IsObject(decorated)) {
	                    throw new TypeError();
	                }
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            decorator(target, propertyKey);
	        }
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
	    function GetOrCreateMetadataMap(target, targetKey, create) {
	        var targetMetadata = __Metadata__.get(target);
	        if (!targetMetadata) {
	            if (!create) {
	                return undefined;
	            }
	            targetMetadata = new _Map();
	            __Metadata__.set(target, targetMetadata);
	        }
	        var keyMetadata = targetMetadata.get(targetKey);
	        if (!keyMetadata) {
	            if (!create) {
	                return undefined;
	            }
	            keyMetadata = new _Map();
	            targetMetadata.set(targetKey, keyMetadata);
	        }
	        return keyMetadata;
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn) {
	            return true;
	        }
	        var parent = GetPrototypeOf(O);
	        if (parent !== null) {
	            return OrdinaryHasMetadata(MetadataKey, parent, P);
	        }
	        return false;
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, false);
	        if (metadataMap === undefined) {
	            return false;
	        }
	        return Boolean(metadataMap.has(MetadataKey));
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn) {
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        }
	        var parent = GetPrototypeOf(O);
	        if (parent !== null) {
	            return OrdinaryGetMetadata(MetadataKey, parent, P);
	        }
	        return undefined;
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, false);
	        if (metadataMap === undefined) {
	            return undefined;
	        }
	        return metadataMap.get(MetadataKey);
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = GetPrototypeOf(O);
	        if (parent === null) {
	            return ownKeys;
	        }
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0) {
	            return ownKeys;
	        }
	        if (ownKeys.length <= 0) {
	            return parentKeys;
	        }
	        var set = new _Set();
	        var keys = [];
	        for (var _i = 0; _i < ownKeys.length; _i++) {
	            var key = ownKeys[_i];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        for (var _a = 0; _a < parentKeys.length; _a++) {
	            var key = parentKeys[_a];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        return keys;
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
	    function OrdinaryOwnMetadataKeys(target, targetKey) {
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
	        var keys = [];
	        if (metadataMap) {
	            metadataMap.forEach(function (_, key) { return keys.push(key); });
	        }
	        return keys;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	    function IsArray(x) {
	        return Array.isArray(x);
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	    function IsConstructor(x) {
	        return typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	    function ToPropertyKey(value) {
	        if (IsSymbol(value)) {
	            return value;
	        }
	        return String(value);
	    }
	    function GetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype) {
	            return proto;
	        }
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard. 
	        // Try to determine the superclass constructor. Compatible implementations
	        // must either set __proto__ on a subclass constructor to the superclass constructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype) {
	            return proto;
	        }
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype) {
	            return proto;
	        }
	        // if the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function") {
	            return proto;
	        }
	        // if we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O) {
	            return proto;
	        }
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        function Map() {
	            this._keys = [];
	            this._values = [];
	            this._cache = cacheSentinel;
	        }
	        Map.prototype = {
	            get size() {
	                return this._keys.length;
	            },
	            has: function (key) {
	                if (key === this._cache) {
	                    return true;
	                }
	                if (this._find(key) >= 0) {
	                    this._cache = key;
	                    return true;
	                }
	                return false;
	            },
	            get: function (key) {
	                var index = this._find(key);
	                if (index >= 0) {
	                    this._cache = key;
	                    return this._values[index];
	                }
	                return undefined;
	            },
	            set: function (key, value) {
	                this.delete(key);
	                this._keys.push(key);
	                this._values.push(value);
	                this._cache = key;
	                return this;
	            },
	            delete: function (key) {
	                var index = this._find(key);
	                if (index >= 0) {
	                    this._keys.splice(index, 1);
	                    this._values.splice(index, 1);
	                    this._cache = cacheSentinel;
	                    return true;
	                }
	                return false;
	            },
	            clear: function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cache = cacheSentinel;
	            },
	            forEach: function (callback, thisArg) {
	                var size = this.size;
	                for (var i = 0; i < size; ++i) {
	                    var key = this._keys[i];
	                    var value = this._values[i];
	                    this._cache = key;
	                    callback.call(this, value, key, this);
	                }
	            },
	            _find: function (key) {
	                var keys = this._keys;
	                var size = keys.length;
	                for (var i = 0; i < size; ++i) {
	                    if (keys[i] === key) {
	                        return i;
	                    }
	                }
	                return -1;
	            }
	        };
	        return Map;
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        var cacheSentinel = {};
	        function Set() {
	            this._map = new _Map();
	        }
	        Set.prototype = {
	            get size() {
	                return this._map.length;
	            },
	            has: function (value) {
	                return this._map.has(value);
	            },
	            add: function (value) {
	                this._map.set(value, value);
	                return this;
	            },
	            delete: function (value) {
	                return this._map.delete(value);
	            },
	            clear: function () {
	                this._map.clear();
	            },
	            forEach: function (callback, thisArg) {
	                this._map.forEach(callback, thisArg);
	            }
	        };
	        return Set;
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === '[object process]';
	        var nodeCrypto = isNode && require("crypto");
	        var hasOwn = Object.prototype.hasOwnProperty;
	        var keys = {};
	        var rootKey = CreateUniqueKey();
	        function WeakMap() {
	            this._key = CreateUniqueKey();
	        }
	        WeakMap.prototype = {
	            has: function (target) {
	                var table = GetOrCreateWeakMapTable(target, false);
	                if (table) {
	                    return this._key in table;
	                }
	                return false;
	            },
	            get: function (target) {
	                var table = GetOrCreateWeakMapTable(target, false);
	                if (table) {
	                    return table[this._key];
	                }
	                return undefined;
	            },
	            set: function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, true);
	                table[this._key] = value;
	                return this;
	            },
	            delete: function (target) {
	                var table = GetOrCreateWeakMapTable(target, false);
	                if (table && this._key in table) {
	                    return delete table[this._key];
	                }
	                return false;
	            },
	            clear: function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            }
	        };
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i) {
	                buffer[i] = Math.random() * 255 | 0;
	            }
	        }
	        function GenRandomBytes(size) {
	            if (nodeCrypto) {
	                var data = nodeCrypto.randomBytes(size);
	                return data;
	            }
	            else if (typeof Uint8Array === "function") {
	                var data = new Uint8Array(size);
	                if (typeof crypto !== "undefined") {
	                    crypto.getRandomValues(data);
	                }
	                else if (typeof msCrypto !== "undefined") {
	                    msCrypto.getRandomValues(data);
	                }
	                else {
	                    FillRandomBytes(data, size);
	                }
	                return data;
	            }
	            else {
	                var data = new Array(size);
	                FillRandomBytes(data, size);
	                return data;
	            }
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8) {
	                    result += "-";
	                }
	                if (byte < 16) {
	                    result += "0";
	                }
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	        function CreateUniqueKey() {
	            var key;
	            do {
	                key = "@@WeakMap@@" + CreateUUID();
	            } while (hasOwn.call(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create) {
	                    return undefined;
	                }
	                Object.defineProperty(target, rootKey, { value: Object.create(null) });
	            }
	            return target[rootKey];
	        }
	        return WeakMap;
	    }
	    // hook global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    __global.Reflect[p] = Reflect[p];
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof window !== "undefined" ? window :
	        typeof WorkerGlobalScope !== "undefined" ? self :
	            typeof global !== "undefined" ? global :
	                Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURLDisabled=Reflect.js.map

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(290);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(297)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./bootstrap.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./bootstrap.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(291)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * Bootstrap v3.3.6 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  margin: .67em 0;\n  font-size: 2em;\n}\nmark {\n  color: #000;\n  background: #ff0;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\nsup {\n  top: -.5em;\n}\nsub {\n  bottom: -.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  height: 0;\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n  font: inherit;\n  color: inherit;\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-appearance: textfield;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  padding: .35em .625em .75em;\n  margin: 0 2px;\n  border: 1px solid #c0c0c0;\n}\nlegend {\n  padding: 0;\n  border: 0;\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-spacing: 0;\n  border-collapse: collapse;\n}\ntd,\nth {\n  padding: 0;\n}\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    color: #000 !important;\n    text-shadow: none !important;\n    background: transparent !important;\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n@font-face {\n  font-family: 'Glyphicons Halflings';\n\n  src: url(" + __webpack_require__(292) + ");\n  src: url(" + __webpack_require__(292) + "?#iefix) format('embedded-opentype'), url(" + __webpack_require__(293) + ") format('woff2'), url(" + __webpack_require__(294) + ") format('woff'), url(" + __webpack_require__(295) + ") format('truetype'), url(" + __webpack_require__(296) + "#glyphicons_halflingsregular) format('svg');\n}\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.glyphicon-asterisk:before {\n  content: \"*\";\n}\n.glyphicon-plus:before {\n  content: \"+\";\n}\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\";\n}\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n.glyphicon-pencil:before {\n  content: \"\\270F\";\n}\n.glyphicon-glass:before {\n  content: \"\\E001\";\n}\n.glyphicon-music:before {\n  content: \"\\E002\";\n}\n.glyphicon-search:before {\n  content: \"\\E003\";\n}\n.glyphicon-heart:before {\n  content: \"\\E005\";\n}\n.glyphicon-star:before {\n  content: \"\\E006\";\n}\n.glyphicon-star-empty:before {\n  content: \"\\E007\";\n}\n.glyphicon-user:before {\n  content: \"\\E008\";\n}\n.glyphicon-film:before {\n  content: \"\\E009\";\n}\n.glyphicon-th-large:before {\n  content: \"\\E010\";\n}\n.glyphicon-th:before {\n  content: \"\\E011\";\n}\n.glyphicon-th-list:before {\n  content: \"\\E012\";\n}\n.glyphicon-ok:before {\n  content: \"\\E013\";\n}\n.glyphicon-remove:before {\n  content: \"\\E014\";\n}\n.glyphicon-zoom-in:before {\n  content: \"\\E015\";\n}\n.glyphicon-zoom-out:before {\n  content: \"\\E016\";\n}\n.glyphicon-off:before {\n  content: \"\\E017\";\n}\n.glyphicon-signal:before {\n  content: \"\\E018\";\n}\n.glyphicon-cog:before {\n  content: \"\\E019\";\n}\n.glyphicon-trash:before {\n  content: \"\\E020\";\n}\n.glyphicon-home:before {\n  content: \"\\E021\";\n}\n.glyphicon-file:before {\n  content: \"\\E022\";\n}\n.glyphicon-time:before {\n  content: \"\\E023\";\n}\n.glyphicon-road:before {\n  content: \"\\E024\";\n}\n.glyphicon-download-alt:before {\n  content: \"\\E025\";\n}\n.glyphicon-download:before {\n  content: \"\\E026\";\n}\n.glyphicon-upload:before {\n  content: \"\\E027\";\n}\n.glyphicon-inbox:before {\n  content: \"\\E028\";\n}\n.glyphicon-play-circle:before {\n  content: \"\\E029\";\n}\n.glyphicon-repeat:before {\n  content: \"\\E030\";\n}\n.glyphicon-refresh:before {\n  content: \"\\E031\";\n}\n.glyphicon-list-alt:before {\n  content: \"\\E032\";\n}\n.glyphicon-lock:before {\n  content: \"\\E033\";\n}\n.glyphicon-flag:before {\n  content: \"\\E034\";\n}\n.glyphicon-headphones:before {\n  content: \"\\E035\";\n}\n.glyphicon-volume-off:before {\n  content: \"\\E036\";\n}\n.glyphicon-volume-down:before {\n  content: \"\\E037\";\n}\n.glyphicon-volume-up:before {\n  content: \"\\E038\";\n}\n.glyphicon-qrcode:before {\n  content: \"\\E039\";\n}\n.glyphicon-barcode:before {\n  content: \"\\E040\";\n}\n.glyphicon-tag:before {\n  content: \"\\E041\";\n}\n.glyphicon-tags:before {\n  content: \"\\E042\";\n}\n.glyphicon-book:before {\n  content: \"\\E043\";\n}\n.glyphicon-bookmark:before {\n  content: \"\\E044\";\n}\n.glyphicon-print:before {\n  content: \"\\E045\";\n}\n.glyphicon-camera:before {\n  content: \"\\E046\";\n}\n.glyphicon-font:before {\n  content: \"\\E047\";\n}\n.glyphicon-bold:before {\n  content: \"\\E048\";\n}\n.glyphicon-italic:before {\n  content: \"\\E049\";\n}\n.glyphicon-text-height:before {\n  content: \"\\E050\";\n}\n.glyphicon-text-width:before {\n  content: \"\\E051\";\n}\n.glyphicon-align-left:before {\n  content: \"\\E052\";\n}\n.glyphicon-align-center:before {\n  content: \"\\E053\";\n}\n.glyphicon-align-right:before {\n  content: \"\\E054\";\n}\n.glyphicon-align-justify:before {\n  content: \"\\E055\";\n}\n.glyphicon-list:before {\n  content: \"\\E056\";\n}\n.glyphicon-indent-left:before {\n  content: \"\\E057\";\n}\n.glyphicon-indent-right:before {\n  content: \"\\E058\";\n}\n.glyphicon-facetime-video:before {\n  content: \"\\E059\";\n}\n.glyphicon-picture:before {\n  content: \"\\E060\";\n}\n.glyphicon-map-marker:before {\n  content: \"\\E062\";\n}\n.glyphicon-adjust:before {\n  content: \"\\E063\";\n}\n.glyphicon-tint:before {\n  content: \"\\E064\";\n}\n.glyphicon-edit:before {\n  content: \"\\E065\";\n}\n.glyphicon-share:before {\n  content: \"\\E066\";\n}\n.glyphicon-check:before {\n  content: \"\\E067\";\n}\n.glyphicon-move:before {\n  content: \"\\E068\";\n}\n.glyphicon-step-backward:before {\n  content: \"\\E069\";\n}\n.glyphicon-fast-backward:before {\n  content: \"\\E070\";\n}\n.glyphicon-backward:before {\n  content: \"\\E071\";\n}\n.glyphicon-play:before {\n  content: \"\\E072\";\n}\n.glyphicon-pause:before {\n  content: \"\\E073\";\n}\n.glyphicon-stop:before {\n  content: \"\\E074\";\n}\n.glyphicon-forward:before {\n  content: \"\\E075\";\n}\n.glyphicon-fast-forward:before {\n  content: \"\\E076\";\n}\n.glyphicon-step-forward:before {\n  content: \"\\E077\";\n}\n.glyphicon-eject:before {\n  content: \"\\E078\";\n}\n.glyphicon-chevron-left:before {\n  content: \"\\E079\";\n}\n.glyphicon-chevron-right:before {\n  content: \"\\E080\";\n}\n.glyphicon-plus-sign:before {\n  content: \"\\E081\";\n}\n.glyphicon-minus-sign:before {\n  content: \"\\E082\";\n}\n.glyphicon-remove-sign:before {\n  content: \"\\E083\";\n}\n.glyphicon-ok-sign:before {\n  content: \"\\E084\";\n}\n.glyphicon-question-sign:before {\n  content: \"\\E085\";\n}\n.glyphicon-info-sign:before {\n  content: \"\\E086\";\n}\n.glyphicon-screenshot:before {\n  content: \"\\E087\";\n}\n.glyphicon-remove-circle:before {\n  content: \"\\E088\";\n}\n.glyphicon-ok-circle:before {\n  content: \"\\E089\";\n}\n.glyphicon-ban-circle:before {\n  content: \"\\E090\";\n}\n.glyphicon-arrow-left:before {\n  content: \"\\E091\";\n}\n.glyphicon-arrow-right:before {\n  content: \"\\E092\";\n}\n.glyphicon-arrow-up:before {\n  content: \"\\E093\";\n}\n.glyphicon-arrow-down:before {\n  content: \"\\E094\";\n}\n.glyphicon-share-alt:before {\n  content: \"\\E095\";\n}\n.glyphicon-resize-full:before {\n  content: \"\\E096\";\n}\n.glyphicon-resize-small:before {\n  content: \"\\E097\";\n}\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\";\n}\n.glyphicon-gift:before {\n  content: \"\\E102\";\n}\n.glyphicon-leaf:before {\n  content: \"\\E103\";\n}\n.glyphicon-fire:before {\n  content: \"\\E104\";\n}\n.glyphicon-eye-open:before {\n  content: \"\\E105\";\n}\n.glyphicon-eye-close:before {\n  content: \"\\E106\";\n}\n.glyphicon-warning-sign:before {\n  content: \"\\E107\";\n}\n.glyphicon-plane:before {\n  content: \"\\E108\";\n}\n.glyphicon-calendar:before {\n  content: \"\\E109\";\n}\n.glyphicon-random:before {\n  content: \"\\E110\";\n}\n.glyphicon-comment:before {\n  content: \"\\E111\";\n}\n.glyphicon-magnet:before {\n  content: \"\\E112\";\n}\n.glyphicon-chevron-up:before {\n  content: \"\\E113\";\n}\n.glyphicon-chevron-down:before {\n  content: \"\\E114\";\n}\n.glyphicon-retweet:before {\n  content: \"\\E115\";\n}\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\";\n}\n.glyphicon-folder-close:before {\n  content: \"\\E117\";\n}\n.glyphicon-folder-open:before {\n  content: \"\\E118\";\n}\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\";\n}\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\";\n}\n.glyphicon-hdd:before {\n  content: \"\\E121\";\n}\n.glyphicon-bullhorn:before {\n  content: \"\\E122\";\n}\n.glyphicon-bell:before {\n  content: \"\\E123\";\n}\n.glyphicon-certificate:before {\n  content: \"\\E124\";\n}\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\";\n}\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\";\n}\n.glyphicon-hand-right:before {\n  content: \"\\E127\";\n}\n.glyphicon-hand-left:before {\n  content: \"\\E128\";\n}\n.glyphicon-hand-up:before {\n  content: \"\\E129\";\n}\n.glyphicon-hand-down:before {\n  content: \"\\E130\";\n}\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\";\n}\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\";\n}\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\";\n}\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\";\n}\n.glyphicon-globe:before {\n  content: \"\\E135\";\n}\n.glyphicon-wrench:before {\n  content: \"\\E136\";\n}\n.glyphicon-tasks:before {\n  content: \"\\E137\";\n}\n.glyphicon-filter:before {\n  content: \"\\E138\";\n}\n.glyphicon-briefcase:before {\n  content: \"\\E139\";\n}\n.glyphicon-fullscreen:before {\n  content: \"\\E140\";\n}\n.glyphicon-dashboard:before {\n  content: \"\\E141\";\n}\n.glyphicon-paperclip:before {\n  content: \"\\E142\";\n}\n.glyphicon-heart-empty:before {\n  content: \"\\E143\";\n}\n.glyphicon-link:before {\n  content: \"\\E144\";\n}\n.glyphicon-phone:before {\n  content: \"\\E145\";\n}\n.glyphicon-pushpin:before {\n  content: \"\\E146\";\n}\n.glyphicon-usd:before {\n  content: \"\\E148\";\n}\n.glyphicon-gbp:before {\n  content: \"\\E149\";\n}\n.glyphicon-sort:before {\n  content: \"\\E150\";\n}\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\";\n}\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\";\n}\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\";\n}\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\";\n}\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\";\n}\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\";\n}\n.glyphicon-unchecked:before {\n  content: \"\\E157\";\n}\n.glyphicon-expand:before {\n  content: \"\\E158\";\n}\n.glyphicon-collapse-down:before {\n  content: \"\\E159\";\n}\n.glyphicon-collapse-up:before {\n  content: \"\\E160\";\n}\n.glyphicon-log-in:before {\n  content: \"\\E161\";\n}\n.glyphicon-flash:before {\n  content: \"\\E162\";\n}\n.glyphicon-log-out:before {\n  content: \"\\E163\";\n}\n.glyphicon-new-window:before {\n  content: \"\\E164\";\n}\n.glyphicon-record:before {\n  content: \"\\E165\";\n}\n.glyphicon-save:before {\n  content: \"\\E166\";\n}\n.glyphicon-open:before {\n  content: \"\\E167\";\n}\n.glyphicon-saved:before {\n  content: \"\\E168\";\n}\n.glyphicon-import:before {\n  content: \"\\E169\";\n}\n.glyphicon-export:before {\n  content: \"\\E170\";\n}\n.glyphicon-send:before {\n  content: \"\\E171\";\n}\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\";\n}\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\";\n}\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\";\n}\n.glyphicon-floppy-save:before {\n  content: \"\\E175\";\n}\n.glyphicon-floppy-open:before {\n  content: \"\\E176\";\n}\n.glyphicon-credit-card:before {\n  content: \"\\E177\";\n}\n.glyphicon-transfer:before {\n  content: \"\\E178\";\n}\n.glyphicon-cutlery:before {\n  content: \"\\E179\";\n}\n.glyphicon-header:before {\n  content: \"\\E180\";\n}\n.glyphicon-compressed:before {\n  content: \"\\E181\";\n}\n.glyphicon-earphone:before {\n  content: \"\\E182\";\n}\n.glyphicon-phone-alt:before {\n  content: \"\\E183\";\n}\n.glyphicon-tower:before {\n  content: \"\\E184\";\n}\n.glyphicon-stats:before {\n  content: \"\\E185\";\n}\n.glyphicon-sd-video:before {\n  content: \"\\E186\";\n}\n.glyphicon-hd-video:before {\n  content: \"\\E187\";\n}\n.glyphicon-subtitles:before {\n  content: \"\\E188\";\n}\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\";\n}\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\";\n}\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\";\n}\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\";\n}\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\";\n}\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\";\n}\n.glyphicon-registration-mark:before {\n  content: \"\\E195\";\n}\n.glyphicon-cloud-download:before {\n  content: \"\\E197\";\n}\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\";\n}\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\";\n}\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\";\n}\n.glyphicon-cd:before {\n  content: \"\\E201\";\n}\n.glyphicon-save-file:before {\n  content: \"\\E202\";\n}\n.glyphicon-open-file:before {\n  content: \"\\E203\";\n}\n.glyphicon-level-up:before {\n  content: \"\\E204\";\n}\n.glyphicon-copy:before {\n  content: \"\\E205\";\n}\n.glyphicon-paste:before {\n  content: \"\\E206\";\n}\n.glyphicon-alert:before {\n  content: \"\\E209\";\n}\n.glyphicon-equalizer:before {\n  content: \"\\E210\";\n}\n.glyphicon-king:before {\n  content: \"\\E211\";\n}\n.glyphicon-queen:before {\n  content: \"\\E212\";\n}\n.glyphicon-pawn:before {\n  content: \"\\E213\";\n}\n.glyphicon-bishop:before {\n  content: \"\\E214\";\n}\n.glyphicon-knight:before {\n  content: \"\\E215\";\n}\n.glyphicon-baby-formula:before {\n  content: \"\\E216\";\n}\n.glyphicon-tent:before {\n  content: \"\\26FA\";\n}\n.glyphicon-blackboard:before {\n  content: \"\\E218\";\n}\n.glyphicon-bed:before {\n  content: \"\\E219\";\n}\n.glyphicon-apple:before {\n  content: \"\\F8FF\";\n}\n.glyphicon-erase:before {\n  content: \"\\E221\";\n}\n.glyphicon-hourglass:before {\n  content: \"\\231B\";\n}\n.glyphicon-lamp:before {\n  content: \"\\E223\";\n}\n.glyphicon-duplicate:before {\n  content: \"\\E224\";\n}\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\";\n}\n.glyphicon-scissors:before {\n  content: \"\\E226\";\n}\n.glyphicon-bitcoin:before {\n  content: \"\\E227\";\n}\n.glyphicon-btc:before {\n  content: \"\\E227\";\n}\n.glyphicon-xbt:before {\n  content: \"\\E227\";\n}\n.glyphicon-yen:before {\n  content: \"\\A5\";\n}\n.glyphicon-jpy:before {\n  content: \"\\A5\";\n}\n.glyphicon-ruble:before {\n  content: \"\\20BD\";\n}\n.glyphicon-rub:before {\n  content: \"\\20BD\";\n}\n.glyphicon-scale:before {\n  content: \"\\E230\";\n}\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\";\n}\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\";\n}\n.glyphicon-education:before {\n  content: \"\\E233\";\n}\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\";\n}\n.glyphicon-option-vertical:before {\n  content: \"\\E235\";\n}\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\";\n}\n.glyphicon-modal-window:before {\n  content: \"\\E237\";\n}\n.glyphicon-oil:before {\n  content: \"\\E238\";\n}\n.glyphicon-grain:before {\n  content: \"\\E239\";\n}\n.glyphicon-sunglasses:before {\n  content: \"\\E240\";\n}\n.glyphicon-text-size:before {\n  content: \"\\E241\";\n}\n.glyphicon-text-color:before {\n  content: \"\\E242\";\n}\n.glyphicon-text-background:before {\n  content: \"\\E243\";\n}\n.glyphicon-object-align-top:before {\n  content: \"\\E244\";\n}\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\";\n}\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\";\n}\n.glyphicon-object-align-left:before {\n  content: \"\\E247\";\n}\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\";\n}\n.glyphicon-object-align-right:before {\n  content: \"\\E249\";\n}\n.glyphicon-triangle-right:before {\n  content: \"\\E250\";\n}\n.glyphicon-triangle-left:before {\n  content: \"\\E251\";\n}\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\";\n}\n.glyphicon-triangle-top:before {\n  content: \"\\E253\";\n}\n.glyphicon-console:before {\n  content: \"\\E254\";\n}\n.glyphicon-superscript:before {\n  content: \"\\E255\";\n}\n.glyphicon-subscript:before {\n  content: \"\\E256\";\n}\n.glyphicon-menu-left:before {\n  content: \"\\E257\";\n}\n.glyphicon-menu-right:before {\n  content: \"\\E258\";\n}\n.glyphicon-menu-down:before {\n  content: \"\\E259\";\n}\n.glyphicon-menu-up:before {\n  content: \"\\E260\";\n}\n* {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\nhtml {\n  font-size: 10px;\n\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333;\n  background-color: #fff;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #337ab7;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nfigure {\n  margin: 0;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive,\n.thumbnail > img,\n.thumbnail a > img,\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-thumbnail {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n  padding: 4px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all .2s ease-in-out;\n       -o-transition: all .2s ease-in-out;\n          transition: all .2s ease-in-out;\n}\n.img-circle {\n  border-radius: 50%;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n[role=\"button\"] {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small,\nh1 .small,\nh2 .small,\nh3 .small,\nh4 .small,\nh5 .small,\nh6 .small,\n.h1 .small,\n.h2 .small,\n.h3 .small,\n.h4 .small,\n.h5 .small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #777;\n}\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh1 small,\n.h1 small,\nh2 small,\n.h2 small,\nh3 small,\n.h3 small,\nh1 .small,\n.h1 .small,\nh2 .small,\n.h2 .small,\nh3 .small,\n.h3 .small {\n  font-size: 65%;\n}\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh4 small,\n.h4 small,\nh5 small,\n.h5 small,\nh6 small,\n.h6 small,\nh4 .small,\n.h4 .small,\nh5 .small,\n.h5 .small,\nh6 .small,\n.h6 .small {\n  font-size: 75%;\n}\nh1,\n.h1 {\n  font-size: 36px;\n}\nh2,\n.h2 {\n  font-size: 30px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall,\n.small {\n  font-size: 85%;\n}\nmark,\n.mark {\n  padding: .2em;\n  background-color: #fcf8e3;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n.text-nowrap {\n  white-space: nowrap;\n}\n.text-lowercase {\n  text-transform: lowercase;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-muted {\n  color: #777;\n}\n.text-primary {\n  color: #337ab7;\n}\na.text-primary:hover,\na.text-primary:focus {\n  color: #286090;\n}\n.text-success {\n  color: #3c763d;\n}\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c;\n}\n.text-info {\n  color: #31708f;\n}\na.text-info:hover,\na.text-info:focus {\n  color: #245269;\n}\n.text-warning {\n  color: #8a6d3b;\n}\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c;\n}\n.text-danger {\n  color: #a94442;\n}\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534;\n}\n.bg-primary {\n  color: #fff;\n  background-color: #337ab7;\n}\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #286090;\n}\n.bg-success {\n  background-color: #dff0d8;\n}\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3;\n}\n.bg-info {\n  background-color: #d9edf7;\n}\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee;\n}\n.bg-warning {\n  background-color: #fcf8e3;\n}\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5;\n}\n.bg-danger {\n  background-color: #f2dede;\n}\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eee;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  margin-left: -5px;\n  list-style: none;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.42857143;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    overflow: hidden;\n    clear: left;\n    text-align: right;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777;\n}\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eee;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857143;\n  color: #777;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014   \\A0';\n}\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  text-align: right;\n  border-right: 5px solid #eee;\n  border-left: 0;\n}\n.blockquote-reverse footer:before,\nblockquote.pull-right footer:before,\n.blockquote-reverse small:before,\nblockquote.pull-right small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\nblockquote.pull-right footer:after,\n.blockquote-reverse small:after,\nblockquote.pull-right small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right .small:after {\n  content: '\\A0   \\2014';\n}\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857143;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  color: #333;\n  word-break: break-all;\n  word-wrap: break-word;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n.container-fluid {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n.row {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n.col-xs-12 {\n  width: 100%;\n}\n.col-xs-11 {\n  width: 91.66666667%;\n}\n.col-xs-10 {\n  width: 83.33333333%;\n}\n.col-xs-9 {\n  width: 75%;\n}\n.col-xs-8 {\n  width: 66.66666667%;\n}\n.col-xs-7 {\n  width: 58.33333333%;\n}\n.col-xs-6 {\n  width: 50%;\n}\n.col-xs-5 {\n  width: 41.66666667%;\n}\n.col-xs-4 {\n  width: 33.33333333%;\n}\n.col-xs-3 {\n  width: 25%;\n}\n.col-xs-2 {\n  width: 16.66666667%;\n}\n.col-xs-1 {\n  width: 8.33333333%;\n}\n.col-xs-pull-12 {\n  right: 100%;\n}\n.col-xs-pull-11 {\n  right: 91.66666667%;\n}\n.col-xs-pull-10 {\n  right: 83.33333333%;\n}\n.col-xs-pull-9 {\n  right: 75%;\n}\n.col-xs-pull-8 {\n  right: 66.66666667%;\n}\n.col-xs-pull-7 {\n  right: 58.33333333%;\n}\n.col-xs-pull-6 {\n  right: 50%;\n}\n.col-xs-pull-5 {\n  right: 41.66666667%;\n}\n.col-xs-pull-4 {\n  right: 33.33333333%;\n}\n.col-xs-pull-3 {\n  right: 25%;\n}\n.col-xs-pull-2 {\n  right: 16.66666667%;\n}\n.col-xs-pull-1 {\n  right: 8.33333333%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-12 {\n  left: 100%;\n}\n.col-xs-push-11 {\n  left: 91.66666667%;\n}\n.col-xs-push-10 {\n  left: 83.33333333%;\n}\n.col-xs-push-9 {\n  left: 75%;\n}\n.col-xs-push-8 {\n  left: 66.66666667%;\n}\n.col-xs-push-7 {\n  left: 58.33333333%;\n}\n.col-xs-push-6 {\n  left: 50%;\n}\n.col-xs-push-5 {\n  left: 41.66666667%;\n}\n.col-xs-push-4 {\n  left: 33.33333333%;\n}\n.col-xs-push-3 {\n  left: 25%;\n}\n.col-xs-push-2 {\n  left: 16.66666667%;\n}\n.col-xs-push-1 {\n  left: 8.33333333%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n.col-xs-offset-11 {\n  margin-left: 91.66666667%;\n}\n.col-xs-offset-10 {\n  margin-left: 83.33333333%;\n}\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n.col-xs-offset-8 {\n  margin-left: 66.66666667%;\n}\n.col-xs-offset-7 {\n  margin-left: 58.33333333%;\n}\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n.col-xs-offset-5 {\n  margin-left: 41.66666667%;\n}\n.col-xs-offset-4 {\n  margin-left: 33.33333333%;\n}\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n.col-xs-offset-2 {\n  margin-left: 16.66666667%;\n}\n.col-xs-offset-1 {\n  margin-left: 8.33333333%;\n}\n.col-xs-offset-0 {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n  .col-sm-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-sm-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n  .col-sm-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-sm-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n  .col-sm-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-sm-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n  .col-sm-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-sm-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-12 {\n    left: 100%;\n  }\n  .col-sm-push-11 {\n    left: 91.66666667%;\n  }\n  .col-sm-push-10 {\n    left: 83.33333333%;\n  }\n  .col-sm-push-9 {\n    left: 75%;\n  }\n  .col-sm-push-8 {\n    left: 66.66666667%;\n  }\n  .col-sm-push-7 {\n    left: 58.33333333%;\n  }\n  .col-sm-push-6 {\n    left: 50%;\n  }\n  .col-sm-push-5 {\n    left: 41.66666667%;\n  }\n  .col-sm-push-4 {\n    left: 33.33333333%;\n  }\n  .col-sm-push-3 {\n    left: 25%;\n  }\n  .col-sm-push-2 {\n    left: 16.66666667%;\n  }\n  .col-sm-push-1 {\n    left: 8.33333333%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .col-md-pull-12 {\n    right: 100%;\n  }\n  .col-md-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-md-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-md-pull-9 {\n    right: 75%;\n  }\n  .col-md-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-md-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-md-pull-6 {\n    right: 50%;\n  }\n  .col-md-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-md-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-md-pull-3 {\n    right: 25%;\n  }\n  .col-md-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-md-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-12 {\n    left: 100%;\n  }\n  .col-md-push-11 {\n    left: 91.66666667%;\n  }\n  .col-md-push-10 {\n    left: 83.33333333%;\n  }\n  .col-md-push-9 {\n    left: 75%;\n  }\n  .col-md-push-8 {\n    left: 66.66666667%;\n  }\n  .col-md-push-7 {\n    left: 58.33333333%;\n  }\n  .col-md-push-6 {\n    left: 50%;\n  }\n  .col-md-push-5 {\n    left: 41.66666667%;\n  }\n  .col-md-push-4 {\n    left: 33.33333333%;\n  }\n  .col-md-push-3 {\n    left: 25%;\n  }\n  .col-md-push-2 {\n    left: 16.66666667%;\n  }\n  .col-md-push-1 {\n    left: 8.33333333%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n  .col-md-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-md-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n  .col-md-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-md-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n  .col-md-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-md-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n  .col-md-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-md-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n  .col-lg-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-lg-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n  .col-lg-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-lg-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n  .col-lg-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-lg-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n  .col-lg-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-lg-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-12 {\n    left: 100%;\n  }\n  .col-lg-push-11 {\n    left: 91.66666667%;\n  }\n  .col-lg-push-10 {\n    left: 83.33333333%;\n  }\n  .col-lg-push-9 {\n    left: 75%;\n  }\n  .col-lg-push-8 {\n    left: 66.66666667%;\n  }\n  .col-lg-push-7 {\n    left: 58.33333333%;\n  }\n  .col-lg-push-6 {\n    left: 50%;\n  }\n  .col-lg-push-5 {\n    left: 41.66666667%;\n  }\n  .col-lg-push-4 {\n    left: 33.33333333%;\n  }\n  .col-lg-push-3 {\n    left: 25%;\n  }\n  .col-lg-push-2 {\n    left: 16.66666667%;\n  }\n  .col-lg-push-1 {\n    left: 8.33333333%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0;\n  }\n}\ntable {\n  background-color: transparent;\n}\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777;\n  text-align: left;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #ddd;\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #ddd;\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid #ddd;\n}\n.table .table {\n  background-color: #fff;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5;\n}\ntable col[class*=\"col-\"] {\n  position: static;\n  display: table-column;\n  float: none;\n}\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  display: table-cell;\n  float: none;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n.table > thead > tr > td.info,\n.table > tbody > tr > td.info,\n.table > tfoot > tr > td.info,\n.table > thead > tr > th.info,\n.table > tbody > tr > th.info,\n.table > tfoot > tr > th.info,\n.table > thead > tr.info > td,\n.table > tbody > tr.info > td,\n.table > tfoot > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr.info > th,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n.table-responsive {\n  min-height: .01%;\n  overflow-x: auto;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #ddd;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\n       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);\n          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);\n}\n.form-control::-moz-placeholder {\n  color: #999;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #999;\n}\n.form-control::-webkit-input-placeholder {\n  color: #999;\n}\n.form-control::-ms-expand {\n  background-color: transparent;\n  border: 0;\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #eee;\n  opacity: 1;\n}\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\ntextarea.form-control {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px;\n  }\n  input[type=\"date\"].input-sm,\n  input[type=\"time\"].input-sm,\n  input[type=\"datetime-local\"].input-sm,\n  input[type=\"month\"].input-sm,\n  .input-group-sm input[type=\"date\"],\n  .input-group-sm input[type=\"time\"],\n  .input-group-sm input[type=\"datetime-local\"],\n  .input-group-sm input[type=\"month\"] {\n    line-height: 30px;\n  }\n  input[type=\"date\"].input-lg,\n  input[type=\"time\"].input-lg,\n  input[type=\"datetime-local\"].input-lg,\n  input[type=\"month\"].input-lg,\n  .input-group-lg input[type=\"date\"],\n  .input-group-lg input[type=\"time\"],\n  .input-group-lg input[type=\"datetime-local\"],\n  .input-group-lg input[type=\"month\"] {\n    line-height: 46px;\n  }\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  min-height: 20px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-top: 4px \\9;\n  margin-left: -20px;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  vertical-align: middle;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"].disabled,\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\nfieldset[disabled] input[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n.radio-inline.disabled,\n.checkbox-inline.disabled,\nfieldset[disabled] .radio-inline,\nfieldset[disabled] .checkbox-inline {\n  cursor: not-allowed;\n}\n.radio.disabled label,\n.checkbox.disabled label,\nfieldset[disabled] .radio label,\nfieldset[disabled] .checkbox label {\n  cursor: not-allowed;\n}\n.form-control-static {\n  min-height: 34px;\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n}\n.form-control-static.input-lg,\n.form-control-static.input-sm {\n  padding-right: 0;\n  padding-left: 0;\n}\n.input-sm {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-sm {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-sm,\nselect[multiple].input-sm {\n  height: auto;\n}\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px;\n}\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto;\n}\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.input-lg {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-lg {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-lg,\nselect[multiple].input-lg {\n  height: auto;\n}\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px;\n}\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto;\n}\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none;\n}\n.input-lg + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n.input-sm + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d;\n}\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\n}\n.has-success .input-group-addon {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #3c763d;\n}\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b;\n}\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;\n}\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #8a6d3b;\n}\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442;\n}\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\n}\n.has-error .input-group-addon {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #a94442;\n}\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n.has-feedback label ~ .form-control-feedback {\n  top: 25px;\n}\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  padding-top: 7px;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    padding-top: 7px;\n    margin-bottom: 0;\n    text-align: right;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px;\n  }\n}\n.btn {\n  display: inline-block;\n  padding: 6px 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.btn:focus,\n.btn:active:focus,\n.btn.active:focus,\n.btn.focus,\n.btn:active.focus,\n.btn.active.focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #333;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  background-image: none;\n  outline: 0;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  opacity: .65;\n}\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default:focus,\n.btn-default.focus {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #8c8c8c;\n}\n.btn-default:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active:hover,\n.btn-default.active:hover,\n.open > .dropdown-toggle.btn-default:hover,\n.btn-default:active:focus,\n.btn-default.active:focus,\n.open > .dropdown-toggle.btn-default:focus,\n.btn-default:active.focus,\n.btn-default.active.focus,\n.open > .dropdown-toggle.btn-default.focus {\n  color: #333;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  background-image: none;\n}\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default.focus {\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default .badge {\n  color: #fff;\n  background-color: #333;\n}\n.btn-primary {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary:focus,\n.btn-primary.focus {\n  color: #fff;\n  background-color: #286090;\n  border-color: #122b40;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n.btn-primary:active:hover,\n.btn-primary.active:hover,\n.open > .dropdown-toggle.btn-primary:hover,\n.btn-primary:active:focus,\n.btn-primary.active:focus,\n.open > .dropdown-toggle.btn-primary:focus,\n.btn-primary:active.focus,\n.btn-primary.active.focus,\n.open > .dropdown-toggle.btn-primary.focus {\n  color: #fff;\n  background-color: #204d74;\n  border-color: #122b40;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  background-image: none;\n}\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary.focus {\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success:focus,\n.btn-success.focus {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #255625;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active:hover,\n.btn-success.active:hover,\n.open > .dropdown-toggle.btn-success:hover,\n.btn-success:active:focus,\n.btn-success.active:focus,\n.open > .dropdown-toggle.btn-success:focus,\n.btn-success:active.focus,\n.btn-success.active.focus,\n.open > .dropdown-toggle.btn-success.focus {\n  color: #fff;\n  background-color: #398439;\n  border-color: #255625;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  background-image: none;\n}\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success.focus {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #fff;\n}\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info:focus,\n.btn-info.focus {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #1b6d85;\n}\n.btn-info:hover {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active:hover,\n.btn-info.active:hover,\n.open > .dropdown-toggle.btn-info:hover,\n.btn-info:active:focus,\n.btn-info.active:focus,\n.open > .dropdown-toggle.btn-info:focus,\n.btn-info:active.focus,\n.btn-info.active.focus,\n.open > .dropdown-toggle.btn-info.focus {\n  color: #fff;\n  background-color: #269abc;\n  border-color: #1b6d85;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  background-image: none;\n}\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info.focus {\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info .badge {\n  color: #5bc0de;\n  background-color: #fff;\n}\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning:focus,\n.btn-warning.focus {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #985f0d;\n}\n.btn-warning:hover {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active:hover,\n.btn-warning.active:hover,\n.open > .dropdown-toggle.btn-warning:hover,\n.btn-warning:active:focus,\n.btn-warning.active:focus,\n.open > .dropdown-toggle.btn-warning:focus,\n.btn-warning:active.focus,\n.btn-warning.active.focus,\n.open > .dropdown-toggle.btn-warning.focus {\n  color: #fff;\n  background-color: #d58512;\n  border-color: #985f0d;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  background-image: none;\n}\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning.focus {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #fff;\n}\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger:focus,\n.btn-danger.focus {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #761c19;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active:hover,\n.btn-danger.active:hover,\n.open > .dropdown-toggle.btn-danger:hover,\n.btn-danger:active:focus,\n.btn-danger.active:focus,\n.open > .dropdown-toggle.btn-danger:focus,\n.btn-danger:active.focus,\n.btn-danger.active.focus,\n.open > .dropdown-toggle.btn-danger.focus {\n  color: #fff;\n  background-color: #ac2925;\n  border-color: #761c19;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  background-image: none;\n}\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger.focus {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #fff;\n}\n.btn-link {\n  font-weight: normal;\n  color: #337ab7;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #23527c;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #777;\n  text-decoration: none;\n}\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity .15s linear;\n       -o-transition: opacity .15s linear;\n          transition: opacity .15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\ntr.collapse.in {\n  display: table-row;\n}\ntbody.collapse.in {\n  display: table-row-group;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-timing-function: ease;\n       -o-transition-timing-function: ease;\n          transition-timing-function: ease;\n  -webkit-transition-duration: .35s;\n       -o-transition-duration: .35s;\n          transition-duration: .35s;\n  -webkit-transition-property: height, visibility;\n       -o-transition-property: height, visibility;\n          transition-property: height, visibility;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.dropup,\n.dropdown {\n  position: relative;\n}\n.dropdown-toggle:focus {\n  outline: 0;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  font-size: 14px;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857143;\n  color: #333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  color: #262626;\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #337ab7;\n  outline: 0;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #777;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-menu-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  color: #777;\n  white-space: nowrap;\n}\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  content: \"\";\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto;\n  }\n  .navbar-right .dropdown-menu-left {\n    right: auto;\n    left: 0;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar .btn,\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-right: 8px;\n  padding-left: 8px;\n}\n.btn-group > .btn-lg + .dropdown-toggle {\n  padding-right: 12px;\n  padding-left: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-lg .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n.dropup .btn-lg .caret {\n  border-width: 0 5px 5px;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  display: table-cell;\n  float: none;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-right: 0;\n  padding-left: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group .form-control:focus {\n  z-index: 3;\n}\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-group-lg > .form-control,\nselect.input-group-lg > .input-group-addon,\nselect.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-group-lg > .form-control,\ntextarea.input-group-lg > .input-group-addon,\ntextarea.input-group-lg > .input-group-btn > .btn,\nselect[multiple].input-group-lg > .form-control,\nselect[multiple].input-group-lg > .input-group-addon,\nselect[multiple].input-group-lg > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-group-sm > .form-control,\nselect.input-group-sm > .input-group-addon,\nselect.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-group-sm > .form-control,\ntextarea.input-group-sm > .input-group-addon,\ntextarea.input-group-sm > .input-group-btn > .btn,\nselect[multiple].input-group-sm > .form-control,\nselect[multiple].input-group-sm > .input-group-addon,\nselect[multiple].input-group-sm > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555;\n  text-align: center;\n  background-color: #eee;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n.nav {\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.nav > li.disabled > a {\n  color: #777;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #777;\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n}\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #eee;\n  border-color: #337ab7;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eee #eee #ddd;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555;\n  cursor: default;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-tabs.nav-justified > li > a {\n  margin-bottom: 5px;\n  text-align: center;\n}\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #337ab7;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a {\n  margin-bottom: 5px;\n  text-align: center;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n.navbar-collapse {\n  padding-right: 15px;\n  padding-left: 15px;\n  overflow-x: visible;\n  -webkit-overflow-scrolling: touch;\n  border-top: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n.container > .navbar-header,\n.container-fluid > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container-fluid > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n.navbar-brand {\n  float: left;\n  height: 50px;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n.navbar-brand > img {\n  display: block;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n.navbar-toggle {\n  position: relative;\n  float: right;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-right: 15px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n}\n.navbar-form {\n  padding: 10px 15px;\n  margin-top: 8px;\n  margin-right: -15px;\n  margin-bottom: 8px;\n  margin-left: -15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);\n}\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    padding-top: 0;\n    padding-bottom: 0;\n    margin-right: 0;\n    margin-left: 0;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.navbar-btn.btn-sm {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.navbar-btn.btn-xs {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-right: 15px;\n    margin-left: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-brand {\n  color: #777;\n}\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #333;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #555;\n  background-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #ddd;\n}\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #ddd;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  color: #555;\n  background-color: #e7e7e7;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #777;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #333;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #555;\n    background-color: #e7e7e7;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #777;\n}\n.navbar-default .navbar-link:hover {\n  color: #333;\n}\n.navbar-default .btn-link {\n  color: #777;\n}\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #333;\n}\n.navbar-default .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-default .btn-link:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #ccc;\n}\n.navbar-inverse {\n  background-color: #222;\n  border-color: #080808;\n}\n.navbar-inverse .navbar-brand {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  color: #fff;\n  background-color: #080808;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #9d9d9d;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n.navbar-inverse .btn-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n.navbar-inverse .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  padding: 0 5px;\n  color: #ccc;\n  content: \"/\\A0\";\n}\n.breadcrumb > .active {\n  color: #777;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  margin-left: -1px;\n  line-height: 1.42857143;\n  color: #337ab7;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > span:hover,\n.pagination > li > a:focus,\n.pagination > li > span:focus {\n  z-index: 2;\n  color: #23527c;\n  background-color: #eee;\n  border-color: #ddd;\n}\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  z-index: 3;\n  color: #fff;\n  cursor: default;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #777;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd;\n}\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-top-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  text-align: center;\n  list-style: none;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #777;\n  cursor: not-allowed;\n  background-color: #fff;\n}\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\na.label:hover,\na.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.label:empty {\n  display: none;\n}\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n.label-default {\n  background-color: #777;\n}\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n.label-primary {\n  background-color: #337ab7;\n}\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #286090;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  background-color: #777;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.badge:hover,\na.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eee;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n.container .jumbotron,\n.container-fluid .jumbotron {\n  padding-right: 15px;\n  padding-left: 15px;\n  border-radius: 6px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-right: 60px;\n    padding-left: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border .2s ease-in-out;\n       -o-transition: border .2s ease-in-out;\n          transition: border .2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  margin-right: auto;\n  margin-left: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333;\n}\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #2b542c;\n}\n.alert-info {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #245269;\n}\n.alert-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n.alert-warning .alert-link {\n  color: #66512c;\n}\n.alert-danger {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n.alert-danger .alert-link {\n  color: #843534;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  height: 20px;\n  margin-bottom: 20px;\n  overflow: hidden;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\n          box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\n}\n.progress-bar {\n  float: left;\n  width: 0;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);\n  -webkit-transition: width .6s ease;\n       -o-transition: width .6s ease;\n          transition: width .6s ease;\n}\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 40px 40px;\n          background-size: 40px 40px;\n}\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n       -o-animation: progress-bar-stripes 2s linear infinite;\n          animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1;\n}\n.media-body {\n  width: 10000px;\n}\n.media-object {\n  display: block;\n}\n.media-object.img-thumbnail {\n  max-width: none;\n}\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n.media-middle {\n  vertical-align: middle;\n}\n.media-bottom {\n  vertical-align: bottom;\n}\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.list-group {\n  padding-left: 0;\n  margin-bottom: 20px;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n.list-group-item:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\na.list-group-item,\nbutton.list-group-item {\n  color: #555;\n}\na.list-group-item .list-group-item-heading,\nbutton.list-group-item .list-group-item-heading {\n  color: #333;\n}\na.list-group-item:hover,\nbutton.list-group-item:hover,\na.list-group-item:focus,\nbutton.list-group-item:focus {\n  color: #555;\n  text-decoration: none;\n  background-color: #f5f5f5;\n}\nbutton.list-group-item {\n  width: 100%;\n  text-align: left;\n}\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  color: #777;\n  cursor: not-allowed;\n  background-color: #eee;\n}\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #777;\n}\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #c7ddef;\n}\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d;\n}\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover,\nbutton.list-group-item-success:hover,\na.list-group-item-success:focus,\nbutton.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active,\nbutton.list-group-item-success.active,\na.list-group-item-success.active:hover,\nbutton.list-group-item-success.active:hover,\na.list-group-item-success.active:focus,\nbutton.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f;\n}\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover,\nbutton.list-group-item-info:hover,\na.list-group-item-info:focus,\nbutton.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active,\nbutton.list-group-item-info.active,\na.list-group-item-info.active:hover,\nbutton.list-group-item-info.active:hover,\na.list-group-item-info.active:focus,\nbutton.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b;\n}\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover,\nbutton.list-group-item-warning:hover,\na.list-group-item-warning:focus,\nbutton.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active,\nbutton.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\nbutton.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus,\nbutton.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442;\n}\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover,\nbutton.list-group-item-danger:hover,\na.list-group-item-danger:focus,\nbutton.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active,\nbutton.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\nbutton.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus,\nbutton.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n}\n.panel-body {\n  padding: 15px;\n}\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd;\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  margin-bottom: 0;\n  border: 0;\n}\n.panel-group {\n  margin-bottom: 20px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #ddd;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #ddd;\n}\n.panel-default {\n  border-color: #ddd;\n}\n.panel-default > .panel-heading {\n  color: #333;\n  background-color: #f5f5f5;\n  border-color: #ddd;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ddd;\n}\n.panel-default > .panel-heading .badge {\n  color: #f5f5f5;\n  background-color: #333;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ddd;\n}\n.panel-primary {\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #337ab7;\n}\n.panel-primary > .panel-heading .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #337ab7;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n.panel-warning {\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n.panel-danger {\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, .15);\n}\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n}\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\nbutton.close {\n  -webkit-appearance: none;\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transition: -webkit-transform .3s ease-out;\n       -o-transition:      -o-transform .3s ease-out;\n          transition:         transform .3s ease-out;\n  -webkit-transform: translate(0, -25%);\n      -ms-transform: translate(0, -25%);\n       -o-transform: translate(0, -25%);\n          transform: translate(0, -25%);\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n      -ms-transform: translate(0, 0);\n       -o-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, .2);\n  border-radius: 6px;\n  outline: 0;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n          box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  filter: alpha(opacity=0);\n  opacity: 0;\n}\n.modal-backdrop.in {\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.42857143;\n}\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer .btn + .btn {\n  margin-bottom: 0;\n  margin-left: 5px;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n  }\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  white-space: normal;\n  filter: alpha(opacity=0);\n  opacity: 0;\n\n  line-break: auto;\n}\n.tooltip.in {\n  filter: alpha(opacity=90);\n  opacity: .9;\n}\n.tooltip.top {\n  padding: 5px 0;\n  margin-top: -3px;\n}\n.tooltip.right {\n  padding: 0 5px;\n  margin-left: 3px;\n}\n.tooltip.bottom {\n  padding: 5px 0;\n  margin-top: 3px;\n}\n.tooltip.left {\n  padding: 0 5px;\n  margin-left: -3px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-left .tooltip-arrow {\n  right: 5px;\n  bottom: 0;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  white-space: normal;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, .2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n\n  line-break: auto;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover > .arrow {\n  border-width: 11px;\n}\n.popover > .arrow:after {\n  content: \"\";\n  border-width: 10px;\n}\n.popover.top > .arrow {\n  bottom: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-top-color: #999;\n  border-top-color: rgba(0, 0, 0, .25);\n  border-bottom-width: 0;\n}\n.popover.top > .arrow:after {\n  bottom: 1px;\n  margin-left: -10px;\n  content: \" \";\n  border-top-color: #fff;\n  border-bottom-width: 0;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-right-color: #999;\n  border-right-color: rgba(0, 0, 0, .25);\n  border-left-width: 0;\n}\n.popover.right > .arrow:after {\n  bottom: -10px;\n  left: 1px;\n  content: \" \";\n  border-right-color: #fff;\n  border-left-width: 0;\n}\n.popover.bottom > .arrow {\n  top: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999;\n  border-bottom-color: rgba(0, 0, 0, .25);\n}\n.popover.bottom > .arrow:after {\n  top: 1px;\n  margin-left: -10px;\n  content: \" \";\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999;\n  border-left-color: rgba(0, 0, 0, .25);\n}\n.popover.left > .arrow:after {\n  right: 1px;\n  bottom: -10px;\n  content: \" \";\n  border-right-width: 0;\n  border-left-color: #fff;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.carousel-inner > .item {\n  position: relative;\n  display: none;\n  -webkit-transition: .6s ease-in-out left;\n       -o-transition: .6s ease-in-out left;\n          transition: .6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  line-height: 1;\n}\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform .6s ease-in-out;\n         -o-transition:      -o-transform .6s ease-in-out;\n            transition:         transform .6s ease-in-out;\n\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n            perspective: 1000px;\n  }\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    left: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n  }\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    left: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0);\n  }\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    left: 0;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 15%;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\n  background-color: rgba(0, 0, 0, 0);\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, .0001)));\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n  background-repeat: repeat-x;\n}\n.carousel-control.right {\n  right: 0;\n  left: auto;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .0001)), to(rgba(0, 0, 0, .5)));\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n  background-repeat: repeat-x;\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  color: #fff;\n  text-decoration: none;\n  filter: alpha(opacity=90);\n  outline: 0;\n  opacity: .9;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  z-index: 5;\n  display: inline-block;\n  margin-top: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  font-family: serif;\n  line-height: 1;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203A';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  padding-left: 0;\n  margin-left: -30%;\n  text-align: center;\n  list-style: none;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid #fff;\n  border-radius: 10px;\n}\n.carousel-indicators .active {\n  width: 12px;\n  height: 12px;\n  margin: 0;\n  background-color: #fff;\n}\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px;\n  }\n  .carousel-caption {\n    right: 20%;\n    left: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-header:before,\n.modal-header:after,\n.modal-footer:before,\n.modal-footer:after {\n  display: table;\n  content: \" \";\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-header:after,\n.modal-footer:after {\n  clear: both;\n}\n.center-block {\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n}\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table !important;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table !important;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  table.visible-print {\n    display: table !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=bootstrap.css.map */\n", ""]);
	
	// exports


/***/ },

/***/ 291:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.eot";

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.woff2";

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.woff";

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.ttf";

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.svg";

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(299);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(297)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./font-awesome.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./font-awesome.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(291)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n *  Font Awesome 4.5.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + __webpack_require__(300) + ");\n  src: url(" + __webpack_require__(301) + "?#iefix&v=4.5.0) format('embedded-opentype'), url(" + __webpack_require__(302) + ") format('woff2'), url(" + __webpack_require__(303) + ") format('woff'), url(" + __webpack_require__(304) + ") format('truetype'), url(" + __webpack_require__(305) + "#fontawesomeregular) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #ffffff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\F000\";\n}\n.fa-music:before {\n  content: \"\\F001\";\n}\n.fa-search:before {\n  content: \"\\F002\";\n}\n.fa-envelope-o:before {\n  content: \"\\F003\";\n}\n.fa-heart:before {\n  content: \"\\F004\";\n}\n.fa-star:before {\n  content: \"\\F005\";\n}\n.fa-star-o:before {\n  content: \"\\F006\";\n}\n.fa-user:before {\n  content: \"\\F007\";\n}\n.fa-film:before {\n  content: \"\\F008\";\n}\n.fa-th-large:before {\n  content: \"\\F009\";\n}\n.fa-th:before {\n  content: \"\\F00A\";\n}\n.fa-th-list:before {\n  content: \"\\F00B\";\n}\n.fa-check:before {\n  content: \"\\F00C\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\F00D\";\n}\n.fa-search-plus:before {\n  content: \"\\F00E\";\n}\n.fa-search-minus:before {\n  content: \"\\F010\";\n}\n.fa-power-off:before {\n  content: \"\\F011\";\n}\n.fa-signal:before {\n  content: \"\\F012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\F013\";\n}\n.fa-trash-o:before {\n  content: \"\\F014\";\n}\n.fa-home:before {\n  content: \"\\F015\";\n}\n.fa-file-o:before {\n  content: \"\\F016\";\n}\n.fa-clock-o:before {\n  content: \"\\F017\";\n}\n.fa-road:before {\n  content: \"\\F018\";\n}\n.fa-download:before {\n  content: \"\\F019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\F01A\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\F01B\";\n}\n.fa-inbox:before {\n  content: \"\\F01C\";\n}\n.fa-play-circle-o:before {\n  content: \"\\F01D\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\F01E\";\n}\n.fa-refresh:before {\n  content: \"\\F021\";\n}\n.fa-list-alt:before {\n  content: \"\\F022\";\n}\n.fa-lock:before {\n  content: \"\\F023\";\n}\n.fa-flag:before {\n  content: \"\\F024\";\n}\n.fa-headphones:before {\n  content: \"\\F025\";\n}\n.fa-volume-off:before {\n  content: \"\\F026\";\n}\n.fa-volume-down:before {\n  content: \"\\F027\";\n}\n.fa-volume-up:before {\n  content: \"\\F028\";\n}\n.fa-qrcode:before {\n  content: \"\\F029\";\n}\n.fa-barcode:before {\n  content: \"\\F02A\";\n}\n.fa-tag:before {\n  content: \"\\F02B\";\n}\n.fa-tags:before {\n  content: \"\\F02C\";\n}\n.fa-book:before {\n  content: \"\\F02D\";\n}\n.fa-bookmark:before {\n  content: \"\\F02E\";\n}\n.fa-print:before {\n  content: \"\\F02F\";\n}\n.fa-camera:before {\n  content: \"\\F030\";\n}\n.fa-font:before {\n  content: \"\\F031\";\n}\n.fa-bold:before {\n  content: \"\\F032\";\n}\n.fa-italic:before {\n  content: \"\\F033\";\n}\n.fa-text-height:before {\n  content: \"\\F034\";\n}\n.fa-text-width:before {\n  content: \"\\F035\";\n}\n.fa-align-left:before {\n  content: \"\\F036\";\n}\n.fa-align-center:before {\n  content: \"\\F037\";\n}\n.fa-align-right:before {\n  content: \"\\F038\";\n}\n.fa-align-justify:before {\n  content: \"\\F039\";\n}\n.fa-list:before {\n  content: \"\\F03A\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\F03B\";\n}\n.fa-indent:before {\n  content: \"\\F03C\";\n}\n.fa-video-camera:before {\n  content: \"\\F03D\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\F03E\";\n}\n.fa-pencil:before {\n  content: \"\\F040\";\n}\n.fa-map-marker:before {\n  content: \"\\F041\";\n}\n.fa-adjust:before {\n  content: \"\\F042\";\n}\n.fa-tint:before {\n  content: \"\\F043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\F044\";\n}\n.fa-share-square-o:before {\n  content: \"\\F045\";\n}\n.fa-check-square-o:before {\n  content: \"\\F046\";\n}\n.fa-arrows:before {\n  content: \"\\F047\";\n}\n.fa-step-backward:before {\n  content: \"\\F048\";\n}\n.fa-fast-backward:before {\n  content: \"\\F049\";\n}\n.fa-backward:before {\n  content: \"\\F04A\";\n}\n.fa-play:before {\n  content: \"\\F04B\";\n}\n.fa-pause:before {\n  content: \"\\F04C\";\n}\n.fa-stop:before {\n  content: \"\\F04D\";\n}\n.fa-forward:before {\n  content: \"\\F04E\";\n}\n.fa-fast-forward:before {\n  content: \"\\F050\";\n}\n.fa-step-forward:before {\n  content: \"\\F051\";\n}\n.fa-eject:before {\n  content: \"\\F052\";\n}\n.fa-chevron-left:before {\n  content: \"\\F053\";\n}\n.fa-chevron-right:before {\n  content: \"\\F054\";\n}\n.fa-plus-circle:before {\n  content: \"\\F055\";\n}\n.fa-minus-circle:before {\n  content: \"\\F056\";\n}\n.fa-times-circle:before {\n  content: \"\\F057\";\n}\n.fa-check-circle:before {\n  content: \"\\F058\";\n}\n.fa-question-circle:before {\n  content: \"\\F059\";\n}\n.fa-info-circle:before {\n  content: \"\\F05A\";\n}\n.fa-crosshairs:before {\n  content: \"\\F05B\";\n}\n.fa-times-circle-o:before {\n  content: \"\\F05C\";\n}\n.fa-check-circle-o:before {\n  content: \"\\F05D\";\n}\n.fa-ban:before {\n  content: \"\\F05E\";\n}\n.fa-arrow-left:before {\n  content: \"\\F060\";\n}\n.fa-arrow-right:before {\n  content: \"\\F061\";\n}\n.fa-arrow-up:before {\n  content: \"\\F062\";\n}\n.fa-arrow-down:before {\n  content: \"\\F063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\F064\";\n}\n.fa-expand:before {\n  content: \"\\F065\";\n}\n.fa-compress:before {\n  content: \"\\F066\";\n}\n.fa-plus:before {\n  content: \"\\F067\";\n}\n.fa-minus:before {\n  content: \"\\F068\";\n}\n.fa-asterisk:before {\n  content: \"\\F069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\F06A\";\n}\n.fa-gift:before {\n  content: \"\\F06B\";\n}\n.fa-leaf:before {\n  content: \"\\F06C\";\n}\n.fa-fire:before {\n  content: \"\\F06D\";\n}\n.fa-eye:before {\n  content: \"\\F06E\";\n}\n.fa-eye-slash:before {\n  content: \"\\F070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\F071\";\n}\n.fa-plane:before {\n  content: \"\\F072\";\n}\n.fa-calendar:before {\n  content: \"\\F073\";\n}\n.fa-random:before {\n  content: \"\\F074\";\n}\n.fa-comment:before {\n  content: \"\\F075\";\n}\n.fa-magnet:before {\n  content: \"\\F076\";\n}\n.fa-chevron-up:before {\n  content: \"\\F077\";\n}\n.fa-chevron-down:before {\n  content: \"\\F078\";\n}\n.fa-retweet:before {\n  content: \"\\F079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\F07A\";\n}\n.fa-folder:before {\n  content: \"\\F07B\";\n}\n.fa-folder-open:before {\n  content: \"\\F07C\";\n}\n.fa-arrows-v:before {\n  content: \"\\F07D\";\n}\n.fa-arrows-h:before {\n  content: \"\\F07E\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\F080\";\n}\n.fa-twitter-square:before {\n  content: \"\\F081\";\n}\n.fa-facebook-square:before {\n  content: \"\\F082\";\n}\n.fa-camera-retro:before {\n  content: \"\\F083\";\n}\n.fa-key:before {\n  content: \"\\F084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\F085\";\n}\n.fa-comments:before {\n  content: \"\\F086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\F087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\F088\";\n}\n.fa-star-half:before {\n  content: \"\\F089\";\n}\n.fa-heart-o:before {\n  content: \"\\F08A\";\n}\n.fa-sign-out:before {\n  content: \"\\F08B\";\n}\n.fa-linkedin-square:before {\n  content: \"\\F08C\";\n}\n.fa-thumb-tack:before {\n  content: \"\\F08D\";\n}\n.fa-external-link:before {\n  content: \"\\F08E\";\n}\n.fa-sign-in:before {\n  content: \"\\F090\";\n}\n.fa-trophy:before {\n  content: \"\\F091\";\n}\n.fa-github-square:before {\n  content: \"\\F092\";\n}\n.fa-upload:before {\n  content: \"\\F093\";\n}\n.fa-lemon-o:before {\n  content: \"\\F094\";\n}\n.fa-phone:before {\n  content: \"\\F095\";\n}\n.fa-square-o:before {\n  content: \"\\F096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\F097\";\n}\n.fa-phone-square:before {\n  content: \"\\F098\";\n}\n.fa-twitter:before {\n  content: \"\\F099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\F09A\";\n}\n.fa-github:before {\n  content: \"\\F09B\";\n}\n.fa-unlock:before {\n  content: \"\\F09C\";\n}\n.fa-credit-card:before {\n  content: \"\\F09D\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\F09E\";\n}\n.fa-hdd-o:before {\n  content: \"\\F0A0\";\n}\n.fa-bullhorn:before {\n  content: \"\\F0A1\";\n}\n.fa-bell:before {\n  content: \"\\F0F3\";\n}\n.fa-certificate:before {\n  content: \"\\F0A3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\F0A4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\F0A5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\F0A6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\F0A7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\F0A8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\F0A9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\F0AA\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\F0AB\";\n}\n.fa-globe:before {\n  content: \"\\F0AC\";\n}\n.fa-wrench:before {\n  content: \"\\F0AD\";\n}\n.fa-tasks:before {\n  content: \"\\F0AE\";\n}\n.fa-filter:before {\n  content: \"\\F0B0\";\n}\n.fa-briefcase:before {\n  content: \"\\F0B1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\F0B2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\F0C0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\F0C1\";\n}\n.fa-cloud:before {\n  content: \"\\F0C2\";\n}\n.fa-flask:before {\n  content: \"\\F0C3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\F0C4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\F0C5\";\n}\n.fa-paperclip:before {\n  content: \"\\F0C6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\F0C7\";\n}\n.fa-square:before {\n  content: \"\\F0C8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\F0C9\";\n}\n.fa-list-ul:before {\n  content: \"\\F0CA\";\n}\n.fa-list-ol:before {\n  content: \"\\F0CB\";\n}\n.fa-strikethrough:before {\n  content: \"\\F0CC\";\n}\n.fa-underline:before {\n  content: \"\\F0CD\";\n}\n.fa-table:before {\n  content: \"\\F0CE\";\n}\n.fa-magic:before {\n  content: \"\\F0D0\";\n}\n.fa-truck:before {\n  content: \"\\F0D1\";\n}\n.fa-pinterest:before {\n  content: \"\\F0D2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\F0D3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\F0D4\";\n}\n.fa-google-plus:before {\n  content: \"\\F0D5\";\n}\n.fa-money:before {\n  content: \"\\F0D6\";\n}\n.fa-caret-down:before {\n  content: \"\\F0D7\";\n}\n.fa-caret-up:before {\n  content: \"\\F0D8\";\n}\n.fa-caret-left:before {\n  content: \"\\F0D9\";\n}\n.fa-caret-right:before {\n  content: \"\\F0DA\";\n}\n.fa-columns:before {\n  content: \"\\F0DB\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\F0DC\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\F0DD\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\F0DE\";\n}\n.fa-envelope:before {\n  content: \"\\F0E0\";\n}\n.fa-linkedin:before {\n  content: \"\\F0E1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\F0E2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\F0E3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\F0E4\";\n}\n.fa-comment-o:before {\n  content: \"\\F0E5\";\n}\n.fa-comments-o:before {\n  content: \"\\F0E6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\F0E7\";\n}\n.fa-sitemap:before {\n  content: \"\\F0E8\";\n}\n.fa-umbrella:before {\n  content: \"\\F0E9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\F0EA\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\F0EB\";\n}\n.fa-exchange:before {\n  content: \"\\F0EC\";\n}\n.fa-cloud-download:before {\n  content: \"\\F0ED\";\n}\n.fa-cloud-upload:before {\n  content: \"\\F0EE\";\n}\n.fa-user-md:before {\n  content: \"\\F0F0\";\n}\n.fa-stethoscope:before {\n  content: \"\\F0F1\";\n}\n.fa-suitcase:before {\n  content: \"\\F0F2\";\n}\n.fa-bell-o:before {\n  content: \"\\F0A2\";\n}\n.fa-coffee:before {\n  content: \"\\F0F4\";\n}\n.fa-cutlery:before {\n  content: \"\\F0F5\";\n}\n.fa-file-text-o:before {\n  content: \"\\F0F6\";\n}\n.fa-building-o:before {\n  content: \"\\F0F7\";\n}\n.fa-hospital-o:before {\n  content: \"\\F0F8\";\n}\n.fa-ambulance:before {\n  content: \"\\F0F9\";\n}\n.fa-medkit:before {\n  content: \"\\F0FA\";\n}\n.fa-fighter-jet:before {\n  content: \"\\F0FB\";\n}\n.fa-beer:before {\n  content: \"\\F0FC\";\n}\n.fa-h-square:before {\n  content: \"\\F0FD\";\n}\n.fa-plus-square:before {\n  content: \"\\F0FE\";\n}\n.fa-angle-double-left:before {\n  content: \"\\F100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\F101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\F102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\F103\";\n}\n.fa-angle-left:before {\n  content: \"\\F104\";\n}\n.fa-angle-right:before {\n  content: \"\\F105\";\n}\n.fa-angle-up:before {\n  content: \"\\F106\";\n}\n.fa-angle-down:before {\n  content: \"\\F107\";\n}\n.fa-desktop:before {\n  content: \"\\F108\";\n}\n.fa-laptop:before {\n  content: \"\\F109\";\n}\n.fa-tablet:before {\n  content: \"\\F10A\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\F10B\";\n}\n.fa-circle-o:before {\n  content: \"\\F10C\";\n}\n.fa-quote-left:before {\n  content: \"\\F10D\";\n}\n.fa-quote-right:before {\n  content: \"\\F10E\";\n}\n.fa-spinner:before {\n  content: \"\\F110\";\n}\n.fa-circle:before {\n  content: \"\\F111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\F112\";\n}\n.fa-github-alt:before {\n  content: \"\\F113\";\n}\n.fa-folder-o:before {\n  content: \"\\F114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\F115\";\n}\n.fa-smile-o:before {\n  content: \"\\F118\";\n}\n.fa-frown-o:before {\n  content: \"\\F119\";\n}\n.fa-meh-o:before {\n  content: \"\\F11A\";\n}\n.fa-gamepad:before {\n  content: \"\\F11B\";\n}\n.fa-keyboard-o:before {\n  content: \"\\F11C\";\n}\n.fa-flag-o:before {\n  content: \"\\F11D\";\n}\n.fa-flag-checkered:before {\n  content: \"\\F11E\";\n}\n.fa-terminal:before {\n  content: \"\\F120\";\n}\n.fa-code:before {\n  content: \"\\F121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\F122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\F123\";\n}\n.fa-location-arrow:before {\n  content: \"\\F124\";\n}\n.fa-crop:before {\n  content: \"\\F125\";\n}\n.fa-code-fork:before {\n  content: \"\\F126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\F127\";\n}\n.fa-question:before {\n  content: \"\\F128\";\n}\n.fa-info:before {\n  content: \"\\F129\";\n}\n.fa-exclamation:before {\n  content: \"\\F12A\";\n}\n.fa-superscript:before {\n  content: \"\\F12B\";\n}\n.fa-subscript:before {\n  content: \"\\F12C\";\n}\n.fa-eraser:before {\n  content: \"\\F12D\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\F12E\";\n}\n.fa-microphone:before {\n  content: \"\\F130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\F131\";\n}\n.fa-shield:before {\n  content: \"\\F132\";\n}\n.fa-calendar-o:before {\n  content: \"\\F133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\F134\";\n}\n.fa-rocket:before {\n  content: \"\\F135\";\n}\n.fa-maxcdn:before {\n  content: \"\\F136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\F137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\F138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\F139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\F13A\";\n}\n.fa-html5:before {\n  content: \"\\F13B\";\n}\n.fa-css3:before {\n  content: \"\\F13C\";\n}\n.fa-anchor:before {\n  content: \"\\F13D\";\n}\n.fa-unlock-alt:before {\n  content: \"\\F13E\";\n}\n.fa-bullseye:before {\n  content: \"\\F140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\F141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\F142\";\n}\n.fa-rss-square:before {\n  content: \"\\F143\";\n}\n.fa-play-circle:before {\n  content: \"\\F144\";\n}\n.fa-ticket:before {\n  content: \"\\F145\";\n}\n.fa-minus-square:before {\n  content: \"\\F146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\F147\";\n}\n.fa-level-up:before {\n  content: \"\\F148\";\n}\n.fa-level-down:before {\n  content: \"\\F149\";\n}\n.fa-check-square:before {\n  content: \"\\F14A\";\n}\n.fa-pencil-square:before {\n  content: \"\\F14B\";\n}\n.fa-external-link-square:before {\n  content: \"\\F14C\";\n}\n.fa-share-square:before {\n  content: \"\\F14D\";\n}\n.fa-compass:before {\n  content: \"\\F14E\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\F150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\F151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\F152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\F153\";\n}\n.fa-gbp:before {\n  content: \"\\F154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\F155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\F156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\F157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\F158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\F159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\F15A\";\n}\n.fa-file:before {\n  content: \"\\F15B\";\n}\n.fa-file-text:before {\n  content: \"\\F15C\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\F15D\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\F15E\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\F160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\F161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\F162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\F163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\F164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\F165\";\n}\n.fa-youtube-square:before {\n  content: \"\\F166\";\n}\n.fa-youtube:before {\n  content: \"\\F167\";\n}\n.fa-xing:before {\n  content: \"\\F168\";\n}\n.fa-xing-square:before {\n  content: \"\\F169\";\n}\n.fa-youtube-play:before {\n  content: \"\\F16A\";\n}\n.fa-dropbox:before {\n  content: \"\\F16B\";\n}\n.fa-stack-overflow:before {\n  content: \"\\F16C\";\n}\n.fa-instagram:before {\n  content: \"\\F16D\";\n}\n.fa-flickr:before {\n  content: \"\\F16E\";\n}\n.fa-adn:before {\n  content: \"\\F170\";\n}\n.fa-bitbucket:before {\n  content: \"\\F171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\F172\";\n}\n.fa-tumblr:before {\n  content: \"\\F173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\F174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\F175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\F176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\F177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\F178\";\n}\n.fa-apple:before {\n  content: \"\\F179\";\n}\n.fa-windows:before {\n  content: \"\\F17A\";\n}\n.fa-android:before {\n  content: \"\\F17B\";\n}\n.fa-linux:before {\n  content: \"\\F17C\";\n}\n.fa-dribbble:before {\n  content: \"\\F17D\";\n}\n.fa-skype:before {\n  content: \"\\F17E\";\n}\n.fa-foursquare:before {\n  content: \"\\F180\";\n}\n.fa-trello:before {\n  content: \"\\F181\";\n}\n.fa-female:before {\n  content: \"\\F182\";\n}\n.fa-male:before {\n  content: \"\\F183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\F184\";\n}\n.fa-sun-o:before {\n  content: \"\\F185\";\n}\n.fa-moon-o:before {\n  content: \"\\F186\";\n}\n.fa-archive:before {\n  content: \"\\F187\";\n}\n.fa-bug:before {\n  content: \"\\F188\";\n}\n.fa-vk:before {\n  content: \"\\F189\";\n}\n.fa-weibo:before {\n  content: \"\\F18A\";\n}\n.fa-renren:before {\n  content: \"\\F18B\";\n}\n.fa-pagelines:before {\n  content: \"\\F18C\";\n}\n.fa-stack-exchange:before {\n  content: \"\\F18D\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\F18E\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\F190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\F191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\F192\";\n}\n.fa-wheelchair:before {\n  content: \"\\F193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\F194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\F195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\F196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\F197\";\n}\n.fa-slack:before {\n  content: \"\\F198\";\n}\n.fa-envelope-square:before {\n  content: \"\\F199\";\n}\n.fa-wordpress:before {\n  content: \"\\F19A\";\n}\n.fa-openid:before {\n  content: \"\\F19B\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\F19C\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\F19D\";\n}\n.fa-yahoo:before {\n  content: \"\\F19E\";\n}\n.fa-google:before {\n  content: \"\\F1A0\";\n}\n.fa-reddit:before {\n  content: \"\\F1A1\";\n}\n.fa-reddit-square:before {\n  content: \"\\F1A2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\F1A3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\F1A4\";\n}\n.fa-delicious:before {\n  content: \"\\F1A5\";\n}\n.fa-digg:before {\n  content: \"\\F1A6\";\n}\n.fa-pied-piper:before {\n  content: \"\\F1A7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\F1A8\";\n}\n.fa-drupal:before {\n  content: \"\\F1A9\";\n}\n.fa-joomla:before {\n  content: \"\\F1AA\";\n}\n.fa-language:before {\n  content: \"\\F1AB\";\n}\n.fa-fax:before {\n  content: \"\\F1AC\";\n}\n.fa-building:before {\n  content: \"\\F1AD\";\n}\n.fa-child:before {\n  content: \"\\F1AE\";\n}\n.fa-paw:before {\n  content: \"\\F1B0\";\n}\n.fa-spoon:before {\n  content: \"\\F1B1\";\n}\n.fa-cube:before {\n  content: \"\\F1B2\";\n}\n.fa-cubes:before {\n  content: \"\\F1B3\";\n}\n.fa-behance:before {\n  content: \"\\F1B4\";\n}\n.fa-behance-square:before {\n  content: \"\\F1B5\";\n}\n.fa-steam:before {\n  content: \"\\F1B6\";\n}\n.fa-steam-square:before {\n  content: \"\\F1B7\";\n}\n.fa-recycle:before {\n  content: \"\\F1B8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\F1B9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\F1BA\";\n}\n.fa-tree:before {\n  content: \"\\F1BB\";\n}\n.fa-spotify:before {\n  content: \"\\F1BC\";\n}\n.fa-deviantart:before {\n  content: \"\\F1BD\";\n}\n.fa-soundcloud:before {\n  content: \"\\F1BE\";\n}\n.fa-database:before {\n  content: \"\\F1C0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\F1C1\";\n}\n.fa-file-word-o:before {\n  content: \"\\F1C2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\F1C3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\F1C4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\F1C5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\F1C6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\F1C7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\F1C8\";\n}\n.fa-file-code-o:before {\n  content: \"\\F1C9\";\n}\n.fa-vine:before {\n  content: \"\\F1CA\";\n}\n.fa-codepen:before {\n  content: \"\\F1CB\";\n}\n.fa-jsfiddle:before {\n  content: \"\\F1CC\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\F1CD\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\F1CE\";\n}\n.fa-ra:before,\n.fa-rebel:before {\n  content: \"\\F1D0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\F1D1\";\n}\n.fa-git-square:before {\n  content: \"\\F1D2\";\n}\n.fa-git:before {\n  content: \"\\F1D3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\F1D4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\F1D5\";\n}\n.fa-qq:before {\n  content: \"\\F1D6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\F1D7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\F1D8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\F1D9\";\n}\n.fa-history:before {\n  content: \"\\F1DA\";\n}\n.fa-circle-thin:before {\n  content: \"\\F1DB\";\n}\n.fa-header:before {\n  content: \"\\F1DC\";\n}\n.fa-paragraph:before {\n  content: \"\\F1DD\";\n}\n.fa-sliders:before {\n  content: \"\\F1DE\";\n}\n.fa-share-alt:before {\n  content: \"\\F1E0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\F1E1\";\n}\n.fa-bomb:before {\n  content: \"\\F1E2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\F1E3\";\n}\n.fa-tty:before {\n  content: \"\\F1E4\";\n}\n.fa-binoculars:before {\n  content: \"\\F1E5\";\n}\n.fa-plug:before {\n  content: \"\\F1E6\";\n}\n.fa-slideshare:before {\n  content: \"\\F1E7\";\n}\n.fa-twitch:before {\n  content: \"\\F1E8\";\n}\n.fa-yelp:before {\n  content: \"\\F1E9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\F1EA\";\n}\n.fa-wifi:before {\n  content: \"\\F1EB\";\n}\n.fa-calculator:before {\n  content: \"\\F1EC\";\n}\n.fa-paypal:before {\n  content: \"\\F1ED\";\n}\n.fa-google-wallet:before {\n  content: \"\\F1EE\";\n}\n.fa-cc-visa:before {\n  content: \"\\F1F0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\F1F1\";\n}\n.fa-cc-discover:before {\n  content: \"\\F1F2\";\n}\n.fa-cc-amex:before {\n  content: \"\\F1F3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\F1F4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\F1F5\";\n}\n.fa-bell-slash:before {\n  content: \"\\F1F6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\F1F7\";\n}\n.fa-trash:before {\n  content: \"\\F1F8\";\n}\n.fa-copyright:before {\n  content: \"\\F1F9\";\n}\n.fa-at:before {\n  content: \"\\F1FA\";\n}\n.fa-eyedropper:before {\n  content: \"\\F1FB\";\n}\n.fa-paint-brush:before {\n  content: \"\\F1FC\";\n}\n.fa-birthday-cake:before {\n  content: \"\\F1FD\";\n}\n.fa-area-chart:before {\n  content: \"\\F1FE\";\n}\n.fa-pie-chart:before {\n  content: \"\\F200\";\n}\n.fa-line-chart:before {\n  content: \"\\F201\";\n}\n.fa-lastfm:before {\n  content: \"\\F202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\F203\";\n}\n.fa-toggle-off:before {\n  content: \"\\F204\";\n}\n.fa-toggle-on:before {\n  content: \"\\F205\";\n}\n.fa-bicycle:before {\n  content: \"\\F206\";\n}\n.fa-bus:before {\n  content: \"\\F207\";\n}\n.fa-ioxhost:before {\n  content: \"\\F208\";\n}\n.fa-angellist:before {\n  content: \"\\F209\";\n}\n.fa-cc:before {\n  content: \"\\F20A\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\F20B\";\n}\n.fa-meanpath:before {\n  content: \"\\F20C\";\n}\n.fa-buysellads:before {\n  content: \"\\F20D\";\n}\n.fa-connectdevelop:before {\n  content: \"\\F20E\";\n}\n.fa-dashcube:before {\n  content: \"\\F210\";\n}\n.fa-forumbee:before {\n  content: \"\\F211\";\n}\n.fa-leanpub:before {\n  content: \"\\F212\";\n}\n.fa-sellsy:before {\n  content: \"\\F213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\F214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\F215\";\n}\n.fa-skyatlas:before {\n  content: \"\\F216\";\n}\n.fa-cart-plus:before {\n  content: \"\\F217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\F218\";\n}\n.fa-diamond:before {\n  content: \"\\F219\";\n}\n.fa-ship:before {\n  content: \"\\F21A\";\n}\n.fa-user-secret:before {\n  content: \"\\F21B\";\n}\n.fa-motorcycle:before {\n  content: \"\\F21C\";\n}\n.fa-street-view:before {\n  content: \"\\F21D\";\n}\n.fa-heartbeat:before {\n  content: \"\\F21E\";\n}\n.fa-venus:before {\n  content: \"\\F221\";\n}\n.fa-mars:before {\n  content: \"\\F222\";\n}\n.fa-mercury:before {\n  content: \"\\F223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\F224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\F225\";\n}\n.fa-venus-double:before {\n  content: \"\\F226\";\n}\n.fa-mars-double:before {\n  content: \"\\F227\";\n}\n.fa-venus-mars:before {\n  content: \"\\F228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\F229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\F22A\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\F22B\";\n}\n.fa-neuter:before {\n  content: \"\\F22C\";\n}\n.fa-genderless:before {\n  content: \"\\F22D\";\n}\n.fa-facebook-official:before {\n  content: \"\\F230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\F231\";\n}\n.fa-whatsapp:before {\n  content: \"\\F232\";\n}\n.fa-server:before {\n  content: \"\\F233\";\n}\n.fa-user-plus:before {\n  content: \"\\F234\";\n}\n.fa-user-times:before {\n  content: \"\\F235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\F236\";\n}\n.fa-viacoin:before {\n  content: \"\\F237\";\n}\n.fa-train:before {\n  content: \"\\F238\";\n}\n.fa-subway:before {\n  content: \"\\F239\";\n}\n.fa-medium:before {\n  content: \"\\F23A\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\F23B\";\n}\n.fa-optin-monster:before {\n  content: \"\\F23C\";\n}\n.fa-opencart:before {\n  content: \"\\F23D\";\n}\n.fa-expeditedssl:before {\n  content: \"\\F23E\";\n}\n.fa-battery-4:before,\n.fa-battery-full:before {\n  content: \"\\F240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\F241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\F242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\F243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\F244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\F245\";\n}\n.fa-i-cursor:before {\n  content: \"\\F246\";\n}\n.fa-object-group:before {\n  content: \"\\F247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\F248\";\n}\n.fa-sticky-note:before {\n  content: \"\\F249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\F24A\";\n}\n.fa-cc-jcb:before {\n  content: \"\\F24B\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\F24C\";\n}\n.fa-clone:before {\n  content: \"\\F24D\";\n}\n.fa-balance-scale:before {\n  content: \"\\F24E\";\n}\n.fa-hourglass-o:before {\n  content: \"\\F250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\F251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\F252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\F253\";\n}\n.fa-hourglass:before {\n  content: \"\\F254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\F255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\F256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\F257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\F258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\F259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\F25A\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\F25B\";\n}\n.fa-trademark:before {\n  content: \"\\F25C\";\n}\n.fa-registered:before {\n  content: \"\\F25D\";\n}\n.fa-creative-commons:before {\n  content: \"\\F25E\";\n}\n.fa-gg:before {\n  content: \"\\F260\";\n}\n.fa-gg-circle:before {\n  content: \"\\F261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\F262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\F263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\F264\";\n}\n.fa-get-pocket:before {\n  content: \"\\F265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\F266\";\n}\n.fa-safari:before {\n  content: \"\\F267\";\n}\n.fa-chrome:before {\n  content: \"\\F268\";\n}\n.fa-firefox:before {\n  content: \"\\F269\";\n}\n.fa-opera:before {\n  content: \"\\F26A\";\n}\n.fa-internet-explorer:before {\n  content: \"\\F26B\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\F26C\";\n}\n.fa-contao:before {\n  content: \"\\F26D\";\n}\n.fa-500px:before {\n  content: \"\\F26E\";\n}\n.fa-amazon:before {\n  content: \"\\F270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\F271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\F272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\F273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\F274\";\n}\n.fa-industry:before {\n  content: \"\\F275\";\n}\n.fa-map-pin:before {\n  content: \"\\F276\";\n}\n.fa-map-signs:before {\n  content: \"\\F277\";\n}\n.fa-map-o:before {\n  content: \"\\F278\";\n}\n.fa-map:before {\n  content: \"\\F279\";\n}\n.fa-commenting:before {\n  content: \"\\F27A\";\n}\n.fa-commenting-o:before {\n  content: \"\\F27B\";\n}\n.fa-houzz:before {\n  content: \"\\F27C\";\n}\n.fa-vimeo:before {\n  content: \"\\F27D\";\n}\n.fa-black-tie:before {\n  content: \"\\F27E\";\n}\n.fa-fonticons:before {\n  content: \"\\F280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\F281\";\n}\n.fa-edge:before {\n  content: \"\\F282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\F283\";\n}\n.fa-codiepie:before {\n  content: \"\\F284\";\n}\n.fa-modx:before {\n  content: \"\\F285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\F286\";\n}\n.fa-usb:before {\n  content: \"\\F287\";\n}\n.fa-product-hunt:before {\n  content: \"\\F288\";\n}\n.fa-mixcloud:before {\n  content: \"\\F289\";\n}\n.fa-scribd:before {\n  content: \"\\F28A\";\n}\n.fa-pause-circle:before {\n  content: \"\\F28B\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\F28C\";\n}\n.fa-stop-circle:before {\n  content: \"\\F28D\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\F28E\";\n}\n.fa-shopping-bag:before {\n  content: \"\\F290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\F291\";\n}\n.fa-hashtag:before {\n  content: \"\\F292\";\n}\n.fa-bluetooth:before {\n  content: \"\\F293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\F294\";\n}\n.fa-percent:before {\n  content: \"\\F295\";\n}\n", ""]);
	
	// exports


/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.eot";

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.eot";

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.woff2";

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.woff";

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.ttf";

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.svg";

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(307);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(297)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./leaflet.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./leaflet.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(291)();
	// imports
	
	
	// module
	exports.push([module.id, "/* required styles */\r\n\r\n.leaflet-map-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-pane,\r\n.leaflet-tile-container,\r\n.leaflet-overlay-pane,\r\n.leaflet-shadow-pane,\r\n.leaflet-marker-pane,\r\n.leaflet-popup-pane,\r\n.leaflet-overlay-pane svg,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t}\r\n.leaflet-container {\r\n\toverflow: hidden;\r\n\t-ms-touch-action: none;\r\n\ttouch-action: none;\r\n\t}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t        user-select: none;\r\n\t-webkit-user-drag: none;\r\n\t}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n\tdisplay: block;\r\n\t}\r\n/* map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container img {\r\n\tmax-width: none !important;\r\n\t}\r\n/* stupid Android 2 doesn't understand \"max-width: none\" properly */\r\n.leaflet-container img.leaflet-image-layer {\r\n\tmax-width: 15000px !important;\r\n\t}\r\n.leaflet-tile {\r\n\tfilter: inherit;\r\n\tvisibility: hidden;\r\n\t}\r\n.leaflet-tile-loaded {\r\n\tvisibility: inherit;\r\n\t}\r\n.leaflet-zoom-box {\r\n\twidth: 0;\r\n\theight: 0;\r\n\t}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n\t-moz-user-select: none;\r\n\t}\r\n\r\n.leaflet-tile-pane    { z-index: 2; }\r\n.leaflet-objects-pane { z-index: 3; }\r\n.leaflet-overlay-pane { z-index: 4; }\r\n.leaflet-shadow-pane  { z-index: 5; }\r\n.leaflet-marker-pane  { z-index: 6; }\r\n.leaflet-popup-pane   { z-index: 7; }\r\n\r\n.leaflet-vml-shape {\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\t}\r\n.lvml {\r\n\tbehavior: url(#default#VML);\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\t}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n\tposition: relative;\r\n\tz-index: 7;\r\n\tpointer-events: auto;\r\n\t}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\tpointer-events: none;\r\n\t}\r\n.leaflet-top {\r\n\ttop: 0;\r\n\t}\r\n.leaflet-right {\r\n\tright: 0;\r\n\t}\r\n.leaflet-bottom {\r\n\tbottom: 0;\r\n\t}\r\n.leaflet-left {\r\n\tleft: 0;\r\n\t}\r\n.leaflet-control {\r\n\tfloat: left;\r\n\tclear: both;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tfloat: right;\r\n\t}\r\n.leaflet-top .leaflet-control {\r\n\tmargin-top: 10px;\r\n\t}\r\n.leaflet-bottom .leaflet-control {\r\n\tmargin-bottom: 10px;\r\n\t}\r\n.leaflet-left .leaflet-control {\r\n\tmargin-left: 10px;\r\n\t}\r\n.leaflet-right .leaflet-control {\r\n\tmargin-right: 10px;\r\n\t}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile,\r\n.leaflet-fade-anim .leaflet-popup {\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.2s linear;\r\n\t   -moz-transition: opacity 0.2s linear;\r\n\t     -o-transition: opacity 0.2s linear;\r\n\t        transition: opacity 0.2s linear;\r\n\t}\r\n.leaflet-fade-anim .leaflet-tile-loaded,\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n\topacity: 1;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n\t}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile,\r\n.leaflet-touching .leaflet-zoom-animated {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n\t}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n\tvisibility: hidden;\r\n\t}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-clickable {\r\n\tcursor: pointer;\r\n\t}\r\n.leaflet-container {\r\n\tcursor: -webkit-grab;\r\n\tcursor:    -moz-grab;\r\n\t}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n\tcursor: auto;\r\n\t}\r\n.leaflet-dragging .leaflet-container,\r\n.leaflet-dragging .leaflet-clickable {\r\n\tcursor: move;\r\n\tcursor: -webkit-grabbing;\r\n\tcursor:    -moz-grabbing;\r\n\t}\r\n\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n\tbackground: #ddd;\r\n\toutline: 0;\r\n\t}\r\n.leaflet-container a {\r\n\tcolor: #0078A8;\r\n\t}\r\n.leaflet-container a.leaflet-active {\r\n\toutline: 2px solid orange;\r\n\t}\r\n.leaflet-zoom-box {\r\n\tborder: 2px dotted #38f;\r\n\tbackground: rgba(255,255,255,0.5);\r\n\t}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n\tfont: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\r\n\t}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n\tborder-radius: 4px;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tline-height: 26px;\r\n\tdisplay: block;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tcolor: black;\r\n\t}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-bar a:hover {\r\n\tbackground-color: #f4f4f4;\r\n\t}\r\n.leaflet-bar a:first-child {\r\n\tborder-top-left-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n\t}\r\n.leaflet-bar a:last-child {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-bottom: none;\r\n\t}\r\n.leaflet-bar a.leaflet-disabled {\r\n\tcursor: default;\r\n\tbackground-color: #f4f4f4;\r\n\tcolor: #bbb;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\t}\r\n\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\r\n\ttext-indent: 1px;\r\n\t}\r\n.leaflet-control-zoom-out {\r\n\tfont-size: 20px;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in {\r\n\tfont-size: 22px;\r\n\t}\r\n.leaflet-touch .leaflet-control-zoom-out {\r\n\tfont-size: 24px;\r\n\t}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\t}\r\n.leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(308) + ");\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\t}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n\tbackground-image: url(" + __webpack_require__(309) + ");\r\n\tbackground-size: 26px 26px;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n\twidth: 44px;\r\n\theight: 44px;\r\n\t}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n\tdisplay: none;\r\n\t}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\t}\r\n.leaflet-control-layers-expanded {\r\n\tpadding: 6px 10px 6px 6px;\r\n\tcolor: #333;\r\n\tbackground: #fff;\r\n\t}\r\n.leaflet-control-layers-selector {\r\n\tmargin-top: 2px;\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\t}\r\n.leaflet-control-layers label {\r\n\tdisplay: block;\r\n\t}\r\n.leaflet-control-layers-separator {\r\n\theight: 0;\r\n\tborder-top: 1px solid #ddd;\r\n\tmargin: 5px -10px 5px -6px;\r\n\t}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.7);\r\n\tmargin: 0;\r\n\t}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n\tpadding: 0 5px;\r\n\tcolor: #333;\r\n\t}\r\n.leaflet-control-attribution a {\r\n\ttext-decoration: none;\r\n\t}\r\n.leaflet-control-attribution a:hover {\r\n\ttext-decoration: underline;\r\n\t}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n\tfont-size: 11px;\r\n\t}\r\n.leaflet-left .leaflet-control-scale {\r\n\tmargin-left: 5px;\r\n\t}\r\n.leaflet-bottom .leaflet-control-scale {\r\n\tmargin-bottom: 5px;\r\n\t}\r\n.leaflet-control-scale-line {\r\n\tborder: 2px solid #777;\r\n\tborder-top: none;\r\n\tline-height: 1.1;\r\n\tpadding: 2px 5px 1px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\t-moz-box-sizing: content-box;\r\n\t     box-sizing: content-box;\r\n\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.5);\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n\tborder-top: 2px solid #777;\r\n\tborder-bottom: none;\r\n\tmargin-top: -2px;\r\n\t}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n\tborder-bottom: 2px solid #777;\r\n\t}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tbox-shadow: none;\r\n\t}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n\tborder: 2px solid rgba(0,0,0,0.2);\r\n\tbackground-clip: padding-box;\r\n\t}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\t}\r\n.leaflet-popup-content-wrapper {\r\n\tpadding: 1px;\r\n\ttext-align: left;\r\n\tborder-radius: 12px;\r\n\t}\r\n.leaflet-popup-content {\r\n\tmargin: 13px 19px;\r\n\tline-height: 1.4;\r\n\t}\r\n.leaflet-popup-content p {\r\n\tmargin: 18px 0;\r\n\t}\r\n.leaflet-popup-tip-container {\r\n\tmargin: 0 auto;\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\t}\r\n.leaflet-popup-tip {\r\n\twidth: 17px;\r\n\theight: 17px;\r\n\tpadding: 1px;\r\n\r\n\tmargin: -10px auto 0;\r\n\r\n\t-webkit-transform: rotate(45deg);\r\n\t   -moz-transform: rotate(45deg);\r\n\t    -ms-transform: rotate(45deg);\r\n\t     -o-transform: rotate(45deg);\r\n\t        transform: rotate(45deg);\r\n\t}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n\tbackground: white;\r\n\r\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tpadding: 4px 4px 0 0;\r\n\ttext-align: center;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n\tfont: 16px/14px Tahoma, Verdana, sans-serif;\r\n\tcolor: #c3c3c3;\r\n\ttext-decoration: none;\r\n\tfont-weight: bold;\r\n\tbackground: transparent;\r\n\t}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n\tcolor: #999;\r\n\t}\r\n.leaflet-popup-scrolled {\r\n\toverflow: auto;\r\n\tborder-bottom: 1px solid #ddd;\r\n\tborder-top: 1px solid #ddd;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n\tzoom: 1;\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\twidth: 24px;\r\n\tmargin: 0 auto;\r\n\r\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\r\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n\t}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n\tmargin-top: -1px;\r\n\t}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n\tborder: 1px solid #999;\r\n\t}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n\tbackground: #fff;\r\n\tborder: 1px solid #666;\r\n\t}\r\n", ""]);
	
	// exports


/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/layers.png";

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/layers-2x.png";

/***/ }

/******/ });
//# sourceMappingURL=libs.map