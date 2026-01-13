var canvas = canvas || {};
var stage = stage || {};
var lib = lib || {};
var exportRoot = exportRoot || {};

var studyData = studyData || {};




window.controller = {
    currentStep: -1,
    studyList: [],

    
    /**
     * 스크립트 파일 로드
     * @param {string} src 파일 위치
     * @returns Promise
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },


    init(studyList) {
        this.setMsgEvt();

        exportRoot.visible = false;
        this.studyList = studyList;

        this.moveStep(studyData.step || 0);

        exportRoot.visible = true;
        window.msgUtil.sendMsg("loadingEnd");
    },


    moveStep(step) {
        if (this.currentStep > 0) this.studyList[this.currentStep].release();

        exportRoot.gotoAndStop(step);
        this.studyList[step].init();
        this.currentStep = step;
    },


    setMsgEvt() {
        window.addEventListener("message", ({ data }) => {
            const currentStudy = this.studyList[this.currentStep];

            switch (data.type) {
                case "nextStep":
                    this.moveStep(data.step);
                    break;
            
                default:
                    console.log(data.type);
                    currentStudy[data.type]();
                    break;
            }
        });
    }
}