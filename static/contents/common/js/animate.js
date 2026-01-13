var canvas,
    stage,
    lib,
    exportRoot,
    anim_container,
    dom_overlay_container,
    fnStartAnimation;

var studyData; //학습데이터

var canvasWidth = 1224;
var canvasHeight = 800;
var canvasResolution = 1.0;




/**
 * 학습 iframe onload 실행 함수
 */
function init() {
    window.msgUtil.addMsgEvt("resStudyData", (data) => {
        studyData = data;
        start();
    });

    window.msgUtil.sendMsg("reqStudyData");
}


function start() {
    const body = document.getElementsByTagName("body")[0];

    anim_container = document.createElement("div");
    anim_container.id = "animation_container";
    anim_container.style = "position: absolute; left: 50%; top: 0; transform: translateX(-50%); display: block; width: 100%; height: 100%";
    
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = canvasWidth * canvasResolution;
    canvas.height = canvasHeight * canvasResolution;
    canvas.style = "position: absolute; left: 0; top: 0; display: block; width: 100%; height: 100%;";

    dom_overlay_container = document.createElement("div");
    dom_overlay_container.id = "dom_overlay_container";
    dom_overlay_container.style = "pointer-events: none; overflow: hidden; position: absolute; left: 0; top: 0; display: block; width: 100%; height: 100%;";

    anim_container.appendChild(canvas);
    anim_container.appendChild(dom_overlay_container);
    body.appendChild(anim_container);
    
    // Composition ID Get
    var compositionID = Object.keys(AdobeAn.compositions)[0];

    // lib Get
	var comp=AdobeAn.getComposition(compositionID);

    // var comp = AdobeAn.getComposition(compositionID);
    lib = comp.getLibrary();

    // 리소스 경로 맵핑 (음원 공통 경로로 변경)
    for (var file of lib.properties.manifest) {
        if (file.src.indexOf("sounds/") > -1) { file.src = `/contents/common/${file.src}`; }
        file.crossOrigin = true;
    }

    var loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	loader.loadManifest(lib.properties.manifest);
}


function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}


function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	exportRoot = new lib[studyData.id]();
	stage = new lib.Stage(canvas);	
    
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);

        //터치 이벤트 사용
        createjs.Touch.enable(stage); 

        // 자체적으로 이벤트 핸들러 실행
        window.msgUtil.rcvMsg({ data: { type: "animateLoaded" }});
	}

	//Code to support hidpi screens and responsive scaling.
	AdobeAn.makeResponsive(false,'both',false,1,[canvas,anim_container,dom_overlay_container]);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}


function playSound(id, loop, offset) {
  return createjs.Sound.play(id, {
    interrupt: createjs.Sound.INTERRUPT_EARLY,
    loop: loop,
    offset: offset,
  });
}