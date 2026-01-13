(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"S1_LV1_000_atlas_1", frames: [[0,0,177,175],[179,0,184,155],[365,175,137,140],[365,0,140,173],[179,157,184,155],[152,314,137,140],[291,317,122,115],[0,177,150,146]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.correct_1 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.correct_2 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.correct_3 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.incorrect_1 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.incorrect_2 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.incorrect_3 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.no_1 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.ok_1 = function() {
	this.initialize(ss["S1_LV1_000_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.mc_obj_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.incorrect_3();

	this.instance_1 = new lib.correct_3();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,137,140);


(lib.mc_obj_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.incorrect_2();

	this.instance_1 = new lib.correct_2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,184,155);


(lib.mc_obj_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.incorrect_1();

	this.instance_1 = new lib.correct_1();
	this.instance_1.setTransform(-17,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,0,177,175);


(lib.mc_effect_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.ok_1();

	this.instance_1 = new lib.no_1();
	this.instance_1.setTransform(14,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,150,146);


(lib.mc_effect_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.ok_1();

	this.instance_1 = new lib.no_1();
	this.instance_1.setTransform(14,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,150,146);


(lib.mc_effect = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 레이어_1
	this.instance = new lib.ok_1();

	this.instance_1 = new lib.no_1();
	this.instance_1.setTransform(14,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,150,146);


(lib.mc_root_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// effect
	this.instance = new lib.mc_effect_3();
	this.instance.setTransform(-225,73,1,1,0,0,0,75,73);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// objs
	this.mc_obj_3_10 = new lib.mc_obj_3();
	this.mc_obj_3_10.name = "mc_obj_3_10";
	this.mc_obj_3_10.setTransform(974,400);

	this.mc_obj_3_9 = new lib.mc_obj_3();
	this.mc_obj_3_9.name = "mc_obj_3_9";
	this.mc_obj_3_9.setTransform(786,400);

	this.mc_obj_3_8 = new lib.mc_obj_3();
	this.mc_obj_3_8.name = "mc_obj_3_8";
	this.mc_obj_3_8.setTransform(599,400);

	this.mc_obj_3_7 = new lib.mc_obj_3();
	this.mc_obj_3_7.name = "mc_obj_3_7";
	this.mc_obj_3_7.setTransform(412,400);

	this.mc_obj_3_6 = new lib.mc_obj_3();
	this.mc_obj_3_6.name = "mc_obj_3_6";
	this.mc_obj_3_6.setTransform(225,400);

	this.mc_obj_3_5 = new lib.mc_obj_3();
	this.mc_obj_3_5.name = "mc_obj_3_5";
	this.mc_obj_3_5.setTransform(974,156);

	this.mc_obj_3_4 = new lib.mc_obj_3();
	this.mc_obj_3_4.name = "mc_obj_3_4";
	this.mc_obj_3_4.setTransform(786,156);

	this.mc_obj_3_3 = new lib.mc_obj_3();
	this.mc_obj_3_3.name = "mc_obj_3_3";
	this.mc_obj_3_3.setTransform(599,156);

	this.mc_obj_3_2 = new lib.mc_obj_3();
	this.mc_obj_3_2.name = "mc_obj_3_2";
	this.mc_obj_3_2.setTransform(412,156);

	this.mc_obj_3_1 = new lib.mc_obj_3();
	this.mc_obj_3_1.name = "mc_obj_3_1";
	this.mc_obj_3_1.setTransform(225,156);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_obj_3_1},{t:this.mc_obj_3_2},{t:this.mc_obj_3_3},{t:this.mc_obj_3_4},{t:this.mc_obj_3_5},{t:this.mc_obj_3_6},{t:this.mc_obj_3_7},{t:this.mc_obj_3_8},{t:this.mc_obj_3_9},{t:this.mc_obj_3_10}]}).wait(1));

	// 배경
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0.6)").ss(1,1,1).p("EhM3gqkMCZvAAAQBnAABKBJQBJBKAABnMAAABNVQAABohJBJQhKBJhnAAMiZvAAAQhoAAhJhJQhJhJAAhoMAAAhNVQAAhnBJhKQBJhJBoAAg");
	this.shape.setTransform(667,349.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("EhM3AqlQhnAAhKhKQhJhIAAhoMAAAhNVQAAhnBJhKQBKhJBnAAMCZvAAAQBoAABIBJQBKBKAABnMAAABNVQAABohKBIQhIBKhoAAg");
	this.shape_1.setTransform(667,349.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_root_3, new cjs.Rectangle(-300,0,1485,623), null);


(lib.mc_root_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// effect
	this.instance = new lib.mc_effect_2();
	this.instance.setTransform(-317.5,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// objs
	this.mc_obj_2_8 = new lib.mc_obj_2();
	this.mc_obj_2_8.name = "mc_obj_2_8";
	this.mc_obj_2_8.setTransform(920,397);

	this.mc_obj_2_7 = new lib.mc_obj_2();
	this.mc_obj_2_7.name = "mc_obj_2_7";
	this.mc_obj_2_7.setTransform(691,397);

	this.mc_obj_2_6 = new lib.mc_obj_2();
	this.mc_obj_2_6.name = "mc_obj_2_6";
	this.mc_obj_2_6.setTransform(460,397);

	this.mc_obj_2_5 = new lib.mc_obj_2();
	this.mc_obj_2_5.name = "mc_obj_2_5";
	this.mc_obj_2_5.setTransform(230,397);

	this.mc_obj_2_4 = new lib.mc_obj_2();
	this.mc_obj_2_4.name = "mc_obj_2_4";
	this.mc_obj_2_4.setTransform(920,153);

	this.mc_obj_2_3 = new lib.mc_obj_2();
	this.mc_obj_2_3.name = "mc_obj_2_3";
	this.mc_obj_2_3.setTransform(691,153);

	this.mc_obj_2_2 = new lib.mc_obj_2();
	this.mc_obj_2_2.name = "mc_obj_2_2";
	this.mc_obj_2_2.setTransform(460,153);

	this.mc_obj_2_1 = new lib.mc_obj_2();
	this.mc_obj_2_1.name = "mc_obj_2_1";
	this.mc_obj_2_1.setTransform(230,153);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_obj_2_1},{t:this.mc_obj_2_2},{t:this.mc_obj_2_3},{t:this.mc_obj_2_4},{t:this.mc_obj_2_5},{t:this.mc_obj_2_6},{t:this.mc_obj_2_7},{t:this.mc_obj_2_8}]}).wait(1));

	// 배경_복사본
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0.6)").ss(1,1,1).p("EhM3gqkMCZvAAAQBnAABKBJQBJBKAABnMAAABNVQAABohJBJQhKBJhnAAMiZvAAAQhoAAhJhJQhJhJAAhoMAAAhNVQAAhnBJhKQBJhJBoAAg");
	this.shape.setTransform(667,349.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("EhM3AqlQhnAAhKhKQhJhIAAhoMAAAhNVQAAhnBJhKQBKhJBnAAMCZvAAAQBoAABIBJQBKBKAABnMAAABNVQAABohKBIQhIBKhoAAg");
	this.shape_1.setTransform(667,349.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// 배경
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,255,255,0.6)").ss(1,1,1).p("EhM3gqkMCZvAAAQBnAABKBJQBJBKAABnMAAABNVQAABohJBJQhKBJhnAAMiZvAAAQhoAAhJhJQhJhJAAhoMAAAhNVQAAhnBJhKQBJhJBoAAg");
	this.shape_2.setTransform(667,349.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.6)").s().p("EhM3AqlQhnAAhKhKQhJhIAAhoMAAAhNVQAAhnBJhKQBKhJBnAAMCZvAAAQBoAABIBJQBKBKAABnMAAABNVQAABohKBIQhIBKhoAAg");
	this.shape_3.setTransform(667,349.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_root_2, new cjs.Rectangle(-317.5,0,1502.5,623), null);


(lib.mc_root_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// effect
	this.instance = new lib.mc_effect();
	this.instance.setTransform(-273,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// objs
	this.mc_obj_1_6 = new lib.mc_obj_1();
	this.mc_obj_1_6.name = "mc_obj_1_6";
	this.mc_obj_1_6.setTransform(892,388);

	this.mc_obj_1_5 = new lib.mc_obj_1();
	this.mc_obj_1_5.name = "mc_obj_1_5";
	this.mc_obj_1_5.setTransform(597,388);

	this.mc_obj_1_4 = new lib.mc_obj_1();
	this.mc_obj_1_4.name = "mc_obj_1_4";
	this.mc_obj_1_4.setTransform(288,388);

	this.mc_obj_1_3 = new lib.mc_obj_1();
	this.mc_obj_1_3.name = "mc_obj_1_3";
	this.mc_obj_1_3.setTransform(892,144);

	this.mc_obj_1_2 = new lib.mc_obj_1();
	this.mc_obj_1_2.name = "mc_obj_1_2";
	this.mc_obj_1_2.setTransform(597,144);

	this.mc_obj_1_1 = new lib.mc_obj_1();
	this.mc_obj_1_1.name = "mc_obj_1_1";
	this.mc_obj_1_1.setTransform(288,144);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_obj_1_1},{t:this.mc_obj_1_2},{t:this.mc_obj_1_3},{t:this.mc_obj_1_4},{t:this.mc_obj_1_5},{t:this.mc_obj_1_6}]}).wait(1));

	// 배경
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0.6)").ss(1,1,1).p("EhM3gqkMCZvAAAQBnAABKBJQBJBKAABnMAAABNVQAABohJBJQhKBJhnAAMiZvAAAQhoAAhJhJQhJhJAAhoMAAAhNVQAAhnBJhKQBJhJBoAAg");
	this.shape.setTransform(667,349.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("EhM3AqlQhnAAhKhKQhJhIAAhoMAAAhNVQAAhnBJhKQBKhJBnAAMCZvAAAQBoAABIBJQBKBKAABnMAAABNVQAABohKBIQhIBKhoAAg");
	this.shape_1.setTransform(667,349.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_root_1, new cjs.Rectangle(-273,0,1458,623), null);


// stage content:
(lib.S1_LV1_000 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// 레이어_1
	this.instance = new lib.mc_root_1();

	this.instance_1 = new lib.mc_root_2();

	this.instance_2 = new lib.mc_root_3();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(349.5,400,835,222.5);
// library properties:
lib.properties = {
	id: '533514A80F303C40A5D3ED621A2AAD7B',
	width: 1334,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/S1_LV1_000_atlas_1.png?1698285447268", id:"S1_LV1_000_atlas_1"},
		{src:"sounds/click.mp3?1698285447282", id:"click"},
		{src:"sounds/correct.mp3?1698285447282", id:"correct"},
		{src:"sounds/failAndSuccess.mp3?1698285447282", id:"failAndSuccess"},
		{src:"sounds/incorrect.mp3?1698285447282", id:"incorrect"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['533514A80F303C40A5D3ED621A2AAD7B'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;