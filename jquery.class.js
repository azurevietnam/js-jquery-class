/*!
 * jQuery.class.js
 * Copyirght (c) 2010, matsukaze.
 * Lisenced under the MIT license.
 * 
 * @version 1.2
 * @author mach3
 * @requires jQuery 1.7 or later
 */
var Class = (Class) ? Class : {};
$.extend( Class, {
	/**
	 * Function to attach class feature to function, 
	 * just like prototype.js's "Class.create()" method.
	 * 
	 * @param {Object} superClass Super class object. (optional)
	 * @return {Object} Function which has class feature.
	 * @example
	 *   var MyClass = Class.create(); 
	 *   MyClass.prototype = { ... };
	 */
	create: function( superClass ){
		var s = superClass || {};
		return function(){
			var pt = {
				superclass:s.prototype,
				bind:function( e, f ){ $(this).bind(e,f); },
				trigger:function( e ){ $(this).trigger(e); },
				log:function( m ){
					if( typeof(console)!=="undefined" && typeof(console.log)!=="undefined" ){
						console.log( m );
					}
				}
			};
			if($.isFunction($.fn.on)){
				pt.on = function(){ $.fn.on.apply($(this), arguments); };
				pt.off = function(){ $.fn.off.apply($(this), arguments); };
			}
			$.extend( true, pt, s.prototype, this );
			$.extend( true, this, pt );
			try{ this.initialize.apply(this, arguments); }
			catch(e){}
		};
	},
	/**
	 * Function to get class defenition directly, wrapper of create().
	 *
	 * @param {Object} def Definition of the class. (required)
	 * @param {Object} superClass Super class object. (optional)
	 * @return {Object} Class defenition
	 * @example 
	 *   var MyClass = Class.get( { ... }, MySuperClass );
	 */
	get: function( def, superClass ){
		var cls = this.create( superClass );
		cls.prototype = def;
		return cls;
	}
});
