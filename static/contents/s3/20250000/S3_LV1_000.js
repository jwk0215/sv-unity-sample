(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"S3_LV1_000_atlas_1", frames: [[568,136,97,54],[583,67,81,67],[484,498,107,59],[398,498,84,83],[498,156,54,93],[568,276,55,83],[498,276,68,69],[554,192,60,82],[583,0,87,65],[498,347,62,66],[498,76,68,78],[498,0,83,74],[0,0,496,496],[142,498,126,126],[0,498,140,140],[270,498,126,126]]}
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



(lib._1_바지 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._1_모자 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._1_신발 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib._1_티셔츠 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._2_파인애플 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib._2_딸기 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib._2_키위 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib._2_포도 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib._3_돼지 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib._3_병아리 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib._3_원숭이 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib._3_토끼 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.left_item_box = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.left_item_selected = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.right_item_box = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.왼쪽박스_흰트 = function() {
	this.initialize(ss["S3_LV1_000_atlas_1"]);
	this.gotoAndStop(15);
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


(lib.mc_left_hint_box = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.왼쪽박스_흰트();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_left_hint_box, new cjs.Rectangle(0,0,126,126), null);


(lib.mc_right_item_box = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.right_item_box();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,140,140);


(lib.mc_left_item_selected_shape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.left_item_selected();
	this.instance.setTransform(0,0,0.9841,0.9841);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124,124);


(lib.mc_item = function(mode,startPosition,loop,reversed) {
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
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12));

	// 오브젝트
	this.instance = new lib._1_모자();
	this.instance.setTransform(15,29);

	this.instance_1 = new lib._1_티셔츠();
	this.instance_1.setTransform(14,21);

	this.instance_2 = new lib._1_바지();
	this.instance_2.setTransform(7,36);

	this.instance_3 = new lib._1_신발();
	this.instance_3.setTransform(2,33);

	this.instance_4 = new lib._2_딸기();
	this.instance_4.setTransform(28,21);

	this.instance_5 = new lib._2_키위();
	this.instance_5.setTransform(22,28);

	this.instance_6 = new lib._2_파인애플();
	this.instance_6.setTransform(29,16);

	this.instance_7 = new lib._2_포도();
	this.instance_7.setTransform(26,22);

	this.instance_8 = new lib._3_병아리();
	this.instance_8.setTransform(25,30);

	this.instance_9 = new lib._3_돼지();
	this.instance_9.setTransform(12,30);

	this.instance_10 = new lib._3_원숭이();
	this.instance_10.setTransform(22,24);

	this.instance_11 = new lib._3_토끼();
	this.instance_11.setTransform(14,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2,16,107,93);


(lib.mc_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EhoNA+gMAAAh8/MDQbAAAMAAAB8/g");
	this.shape.setTransform(667,400);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_background, new cjs.Rectangle(0,0,1334,800), null);


(lib.mc_right_item = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {main:0,click:1};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		playSound("click");
	}
	this.frame_4 = function() {
		this.gotoAndStop("main");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(3).call(this.frame_4).wait(1));

	// 아이템
	this.mc_item = new lib.mc_item();
	this.mc_item.name = "mc_item";
	this.mc_item.setTransform(71.55,67.45,1,1,0,0,0,56.8,59.6);

	this.timeline.addTween(cjs.Tween.get(this.mc_item).wait(5));

	// 박스
	this.instance = new lib.mc_right_item_box("synched",0);
	this.instance.setTransform(70,70,1,1,0,0,0,70,70);
	var instanceFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-2,-2,144,144);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},4).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).to(new cjs.ColorFilter(0,0,0,1,255,255,204,0), 4).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:4, x:-2, y:-2, w:144, h:144});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:-2, y:-2, w:144, h:144});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,140,140);


(lib.mc_right_box = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 박스
	this.mc_item4 = new lib.mc_right_item();
	this.mc_item4.name = "mc_item4";
	this.mc_item4.setTransform(256,251.95,1,1,0,0,0,70,70);

	this.mc_item3 = new lib.mc_right_item();
	this.mc_item3.name = "mc_item3";
	this.mc_item3.setTransform(109,251,1,1,0,0,0,70,70);

	this.mc_item2 = new lib.mc_right_item();
	this.mc_item2.name = "mc_item2";
	this.mc_item2.setTransform(256,101,1,1,0,0,0,70,70);

	this.mc_item1 = new lib.mc_right_item();
	this.mc_item1.name = "mc_item1";
	this.mc_item1.setTransform(109,101,1,1,0,0,0,70,70);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_item1},{t:this.mc_item2},{t:this.mc_item3},{t:this.mc_item4}]}).wait(1));
	this.mc_item4.addEventListener("tick", AdobeAn.handleFilterCache);
	this.mc_item3.addEventListener("tick", AdobeAn.handleFilterCache);
	this.mc_item2.addEventListener("tick", AdobeAn.handleFilterCache);
	this.mc_item1.addEventListener("tick", AdobeAn.handleFilterCache);

	// 배경
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.2)").s().p("A0dbWQjPAAiTiTQiSiSAAjPMAAAgnDQAAjPCSiSQCTiTDPAAMAo7AAAQDPAACSCTQCTCSAADPMAAAAnDQAADPiTCSQiSCTjPAAg");
	this.shape.setTransform(181,175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_right_box, new cjs.Rectangle(0,0,362,350), null);


(lib.mc_left_item_selected = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"main":0,loop:1};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_25 = function() {
		this.gotoAndPlay('loop');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(25).call(this.frame_25).wait(1));

	// 배경
	this.instance = new lib.mc_left_item_selected_shape("synched",0);
	this.instance.setTransform(62,62,1,1,0,0,0,62,62);

	this.instance_1 = new lib.mc_left_hint_box();
	this.instance_1.setTransform(62,62,0.9841,0.9841,0,0,0,63,63);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,regX:63,regY:63,scaleX:0.9841,scaleY:0.9841,mode:"independent"},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},1).to({alpha:0.25},16).to({alpha:1},8).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124,124);


(lib.mc_left_item = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {disable:0,able:3};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6));

	// 선택효과
	this.mc_selected = new lib.mc_left_item_selected();
	this.mc_selected.name = "mc_selected";
	this.mc_selected.setTransform(62,62,1,1,0,0,0,62,62);

	this.timeline.addTween(cjs.Tween.get(this.mc_selected).wait(6));

	// 아이템
	this.mc_item = new lib.mc_item();
	this.mc_item.name = "mc_item";
	this.mc_item.setTransform(60,62.5,1,1,0,0,0,54.2,61.1);

	this.timeline.addTween(cjs.Tween.get(this.mc_item).wait(6));

	// 배경
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AprJsIAAzXITXAAIAATXg");
	this.shape.setTransform(62,62);

	this.instance = new lib.left_item_box();
	this.instance.setTransform(0,0,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,124,124);


(lib.mc_left_box = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 아이템
	this.mc_item16 = new lib.mc_left_item();
	this.mc_item16.name = "mc_item16";
	this.mc_item16.setTransform(448,448,1,1,0,0,0,62,62);

	this.mc_item15 = new lib.mc_left_item();
	this.mc_item15.name = "mc_item15";
	this.mc_item15.setTransform(322,448,1,1,0,0,0,62,62);

	this.mc_item14 = new lib.mc_left_item();
	this.mc_item14.name = "mc_item14";
	this.mc_item14.setTransform(193,448,1,1,0,0,0,62,62);

	this.mc_item13 = new lib.mc_left_item();
	this.mc_item13.name = "mc_item13";
	this.mc_item13.setTransform(67,448,1,1,0,0,0,62,62);

	this.mc_item12 = new lib.mc_left_item();
	this.mc_item12.name = "mc_item12";
	this.mc_item12.setTransform(448,322,1,1,0,0,0,62,62);

	this.mc_item11 = new lib.mc_left_item();
	this.mc_item11.name = "mc_item11";
	this.mc_item11.setTransform(322,322,1,1,0,0,0,62,62);

	this.mc_item10 = new lib.mc_left_item();
	this.mc_item10.name = "mc_item10";
	this.mc_item10.setTransform(193,322,1,1,0,0,0,62,62);

	this.mc_item9 = new lib.mc_left_item();
	this.mc_item9.name = "mc_item9";
	this.mc_item9.setTransform(67,322,1,1,0,0,0,62,62);

	this.mc_item8 = new lib.mc_left_item();
	this.mc_item8.name = "mc_item8";
	this.mc_item8.setTransform(448,193,1,1,0,0,0,62,62);

	this.mc_item7 = new lib.mc_left_item();
	this.mc_item7.name = "mc_item7";
	this.mc_item7.setTransform(322,193,1,1,0,0,0,62,62);

	this.mc_item6 = new lib.mc_left_item();
	this.mc_item6.name = "mc_item6";
	this.mc_item6.setTransform(193,193,1,1,0,0,0,62,62);

	this.mc_item5 = new lib.mc_left_item();
	this.mc_item5.name = "mc_item5";
	this.mc_item5.setTransform(67,193,1,1,0,0,0,62,62);

	this.mc_item4 = new lib.mc_left_item();
	this.mc_item4.name = "mc_item4";
	this.mc_item4.setTransform(448,67,1,1,0,0,0,62,62);

	this.mc_item3 = new lib.mc_left_item();
	this.mc_item3.name = "mc_item3";
	this.mc_item3.setTransform(322,67,1,1,0,0,0,62,62);

	this.mc_item2 = new lib.mc_left_item();
	this.mc_item2.name = "mc_item2";
	this.mc_item2.setTransform(193,67,1,1,0,0,0,62,62);

	this.mc_item1 = new lib.mc_left_item();
	this.mc_item1.name = "mc_item1";
	this.mc_item1.setTransform(67,67,1,1,0,0,0,62,62);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_item1},{t:this.mc_item2},{t:this.mc_item3},{t:this.mc_item4},{t:this.mc_item5},{t:this.mc_item6},{t:this.mc_item7},{t:this.mc_item8},{t:this.mc_item9},{t:this.mc_item10},{t:this.mc_item11},{t:this.mc_item12},{t:this.mc_item13},{t:this.mc_item14},{t:this.mc_item15},{t:this.mc_item16}]}).wait(1));

	// 배경
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgoOAoPMAAAhQdMBQdAAAMAAABQdg");
	this.shape.setTransform(257.5,257.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_left_box, new cjs.Rectangle(0,0,515,515), null);


(lib.mc_sudoku12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 오른쪽박스
	this.mc_right_box = new lib.mc_right_box();
	this.mc_right_box.name = "mc_right_box";
	this.mc_right_box.setTransform(960,341,1,1,0,0,0,181,175);

	this.timeline.addTween(cjs.Tween.get(this.mc_right_box).wait(1));

	// 왼쪽박스
	this.mc_left_box = new lib.mc_left_box();
	this.mc_left_box.name = "mc_left_box";
	this.mc_left_box.setTransform(455.5,351.5,1,1,0,0,0,257.5,257.5);

	this.timeline.addTween(cjs.Tween.get(this.mc_left_box).wait(1));

	// 배경클릭영역
	this.mc_background = new lib.mc_background();
	this.mc_background.name = "mc_background";
	this.mc_background.setTransform(667,400,1,1,0,0,0,667,400);

	this.timeline.addTween(cjs.Tween.get(this.mc_background).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_sudoku12, new cjs.Rectangle(0,0,1334,800), null);


// stage content:
(lib.S3_LV1_000 = function(mode,startPosition,loop,reversed) {
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

	// 게임
	this.instance = new lib.mc_sudoku12();
	this.instance.setTransform(512.4,257.5,1,1,0,0,0,512.4,257.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(667,400,667,400);
// library properties:
lib.properties = {
	id: '6AF29878056944FF830A6DEC3D9B4D92',
	width: 1334,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/S3_LV1_000_atlas_1.png?1693461360517", id:"S3_LV1_000_atlas_1"},
		{src:"sounds/click.mp3?1693461360771", id:"click"},
		{src:"sounds/correct.mp3?1693461360771", id:"correct"},
		{src:"sounds/failAndSuccess.mp3?1693461360771", id:"failAndSuccess"},
		{src:"sounds/incorrect.mp3?1693461360771", id:"incorrect"}
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
an.compositions['6AF29878056944FF830A6DEC3D9B4D92'] = {
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