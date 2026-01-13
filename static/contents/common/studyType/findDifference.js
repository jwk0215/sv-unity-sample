// # 유형 1 -----------------------------------------------------------------------
class FindDifference extends Study {
    constructor(data) {
        super(data);
        this.objs = [];             // obj을 저장할 프레임
        this.frameList = [];        // obj의 프레임을 순서대로 저장할 배열
    }


    // --- init() ---
    init() {
        console.log("FindDifference init()");
        super.init();

        const mcRoot = this.mcRoot;
        const data = this.data;


        // 해당 차시로 이동
        exportRoot.gotoAndStop(window.controller.currentStep + 1);


        // 프로퍼티 초기화
        for (const child of mcRoot.children) {      // obj 배열에 담기
            if (!child.name) continue;

            if (child.name.includes("mc_obj_")) {
                this.objs[Number(child.name.split('_')[3]) - 1] = child;
            }
        }

        this.objs[Math.floor(Math.random() * (this.objs.length))].gotoAndStop(1);         // 랜덤으로 하나만 프레임 변경

        this.objs.forEach((v, i) => {               // frameList 초기화
            this.frameList[i] = v.currentFrame;
        });

        
        // 이벤트 할당
        this.clickEvt = this.clickEvt.bind(this);
        mcRoot.addEventListener("click", this.clickEvt);
    }


    // --- start() ---
    start() {
        console.log("FindDifference start()");
        this.userAction = true;
    }


    // --- 클릭 이벤트 ---
    clickEvt(e) {
        if (!this.userAction) return;

        for (const obj of this.objs) {
            const pt = obj.globalToLocal(e.stageX, e.stageY);

            if (obj.hitTest(pt.x, pt.y)) {
                if (obj.alpha < 1) return;
                this.userAction = false;

                const eff = new lib.mc_effect();
                this.mcRoot.addChild(eff);

                let calcX = (obj.getBounds().width - eff.getBounds().width) / 2;
                let calcY = (obj.getBounds().height - eff.getBounds().height) / 2;

                eff.x = studyData.chapterId === "S1_LV1_005" && window.controller.currentStep > 1 ? obj.x - 5 : obj.x + calcX;
                eff.y = obj.y + calcY;

                // 정답 시
                if (obj.currentFrame > 0) {
                    if (studyData.chapterId === "S1_LV2_005" && window.controller.currentStep > 1) {
                        eff.y += 15;
                    }

                    this.objs.forEach(v => {
                        if (v.currentFrame < 1) v.alpha = 0.4;
                    });

                    super.sendStudyEnd(true);
                    return;

                // 오답 시
                } else {
                    eff.gotoAndStop(1);
                    super.sendIncorrectStart();
                    AnimateUtil.aniShake(this.mcRoot);

                    const ins = AnimateUtil.playSound("incorrect");
                    ins.on("complete", () => {
                        super.sendIncorrectEnd();
                        this.mcRoot.removeChild(eff);
                        this.userAction = true;
                    });
                }
            }
        }
    }


    // --- showHint() ---
    showHint() {
        if (!this.userAction) return;

        let count = 0;
        this.objs.forEach(v => {
            if (v.currentFrame < 1 && v.alpha === 1) count++;
        });
        if (count === 0) return;

        let hintIdx;

        while (true) {
            const randomNum = Math.floor(Math.random() * (this.objs.length));

            if (this.objs[randomNum].currentFrame < 1 && this.objs[randomNum].alpha === 1) {
                hintIdx = randomNum;
                break;
            }
        }

        const hintObj = this.objs[hintIdx];
        const hintEff = new lib.mc_effect();

        hintObj.alpha = 0.4;
        this.mcRoot.addChild(hintEff);

        hintEff.x = hintObj.x + (hintObj.getBounds().width - hintEff.getBounds().width) / 2;
        hintEff.y = hintObj.y + (hintObj.getBounds().height - hintEff.getBounds().height) / 2;
        hintEff.gotoAndStop(1);

        super.sendHintUsed();
        return;
    }


    // --- release() ---
    release() {
        this.mcRoot.children.forEach(v => {
            if (v instanceof lib.mc_effect) this.mcRoot.removeChild(v);
        });
        this.mcRoot.removeAllEventListeners();
    }
}







// # 유형 2 -----------------------------------------------------------------------
class FindDifference2 extends Study {
    constructor(data) {
        super(data);
        this.illust = [];               // 좌우 일러스트
        this.leftClickArea = [];        // 좌측 일러스트의 정답들
        this.rightClickArea = [];       // 우측 일러스트의 정답들
        this.clickLimit = null;         // 클릭 영역
        this.starBox = null;            // 상단의 찾은 갯수 표시
        this.ground = null;             // 요소들을 추가, 제거를 위한 객체
    }


    // --- init() ---
    init() {
        console.log("FindDifference2 init()");
        super.init();

        const mcRoot = this.mcRoot;
        const data = this.data;

        // 프로퍼티 초기화
        this.illust[0] = mcRoot.mc_ill.mc_left;
        this.illust[1] = mcRoot.mc_ill.mc_right;
        this.clickLimit = mcRoot.mc_click_limit;
        this.starBox = mcRoot.mc_star_box;
        this.ground = mcRoot.mc_ground;

        for (const area of mcRoot.mc_click_area.children) {
            if (!area.name) continue;

            const name = area.name.split('_');
            const idx = Number(name[3]) - 1;

            if (name[1] === 'left') {
                this.leftClickArea[idx] = area;
            } else {
                this.rightClickArea[idx] = area;
            }
        }
        console.log(mcRoot);

        
        // 이벤트 할당
        this.clickEvt = this.clickEvt.bind(this);
        mcRoot.addEventListener("click", this.clickEvt);

        this.tickEvt = this.tickEvt.bind(this);
        mcRoot.addEventListener("tick", this.tickEvt);
    }


    // --- start() ---
    start() {
        console.log("FindDifference start()");
        this.userAction = true;
    }


    // --- tickEvt ---
    tickEvt() {
        this.mcRoot.setChildIndex(this.starBox, 7);
    }


    // --- clickEvt ---
    clickEvt(e) {
        if (!this.userAction) return;

        if (
            e.stageX > (1334 / 2) - 60 &&
            e.stageX < (1334 / 2) + 60
        ) return;

        for (const ill of this.illust) {
            const illPt = ill.globalToLocal(e.stageX, e.stageY);
            if (!ill.hitTest(illPt.x, illPt.y)) continue;

            const limitPt = this.clickLimit.globalToLocal(e.stageX, e.stageY);
            if (!this.clickLimit.hitTest(limitPt.x, limitPt.y)) continue;
            this.userAction = false;

            const arr = ill.name === "mc_left" ? this.leftClickArea : this.rightClickArea;
            for (const area of arr) {
                console.log(area);
                const pt = area.globalToLocal(e.stageX, e.stageY);

                // 정답 시
                if (area.hitTest(pt.x, pt.y)) {
                    if (area.isCorrect) {
                        this.userAction = true;
                        return;
                    }

                    const idx = arr.indexOf(area);
                    const otherArr = ill.name === "mc_left" ? this.rightClickArea : this.leftClickArea;

                    const eff = new lib.mc_effect();
                    const eff2 = new lib.mc_effect();

                    eff.gotoAndStop(1);
                    eff2.gotoAndStop(1);

                    if (this.data.otherSize[idx] !== null) {
                        eff.x = area.x + this.data.otherSize[idx].width
                        eff.y = area.y + this.data.otherSize[idx].height
                        eff2.x = otherArr[idx].x + this.data.otherSize[idx].width
                        eff2.y = otherArr[idx].y + this.data.otherSize[idx].height
                    } else {
                        eff.x = area.x
                        eff.y = area.y
                        eff2.x = otherArr[idx].x
                        eff2.y = otherArr[idx].y
                    }

                    if (this.isHintMode) {
                        for (const hint of area.children) {
                            if (hint instanceof lib.mc_hint) {
                                area.removeChild(hint);

                                for (const hint2 of otherArr[idx].children) {
                                    if (hint2 instanceof lib.mc_hint) {
                                        otherArr[idx].removeChild(hint2);
                                        super.sendHintUsed(true);
                                        this.isHintMode = false;
                                    }
                                }
                            }
                        }
                    }

                    this.ground.addChild(eff);
                    this.ground.addChild(eff2);

                    this.leftClickArea[idx].isCorrect = true;
                    this.rightClickArea[idx].isCorrect = true;

                    const ins = AnimateUtil.playSound("correct");
                    this.starBox.gotoAndStop(this.starBox.currentFrame + 1);
                    ins.on("complete", () => {
                        if ((this.starBox.currentFrame + 1) === this.starBox.totalFrames) {
                            super.sendStudyEnd(true);
                            return;
                        } else {
                            this.userAction = true;
                            return;
                        }
                    });

                    return;
                }
            }

            // 오답 시
            const eff = new lib.mc_effect();
            const eff2 = new lib.mc_effect();

            eff.x = e.stageX - (eff.getBounds().width / 2);
            eff.y = e.stageY - (eff.getBounds().height / 2);

            if (ill.name === 'mc_left') {
                eff2.x = eff.x + ill.getBounds().width;
            } else {
                eff2.x = eff.x - ill.getBounds().width;
            }
            eff2.y = eff.y;

            this.ground.addChild(eff);
            this.ground.addChild(eff2);

            super.sendIncorrectStart();
            AnimateUtil.aniShake(this.mcRoot.mc_ill);

            const ins = AnimateUtil.playSound("incorrect");
            ins.on("complete", () => {
                super.sendIncorrectEnd();
                this.ground.removeChild(eff);
                this.ground.removeChild(eff2);
                this.userAction = true;
            });
        }
    }


    // --- release() ---
    release() {
        this.ground.removeAllChildren();
        this.mcRoot.removeAllEventListeners();
        this.starBox.gotoAndStop(0);
    }


    // --- showHint() ---
    showHint() {
        if (!this.userAction || this.isHintMode) return;

        let count = 0;
        this.leftClickArea.forEach(v => {
            if (!v.isCorrect) count++;
        });

        if (count === 0) return;
        this.isHintMode = true;

        let hintIdx;
        while (true) {
            const randomNum = Math.floor(Math.random() * (this.leftClickArea.length));

            if (!this.leftClickArea[randomNum].isCorrect) {
                hintIdx = randomNum;
                break;
            }
        }

        const hintObj = new lib.mc_hint();
        const hintObj2 = new lib.mc_hint();

        if (this.data.otherSize[hintIdx] !== null) {
            hintObj.x = this.data.otherSize[hintIdx].width;
            hintObj.y = this.data.otherSize[hintIdx].height;
            hintObj2.x = this.data.otherSize[hintIdx].width;
            hintObj2.y = this.data.otherSize[hintIdx].height;
        } 

        this.leftClickArea[hintIdx].addChild(hintObj);
        this.rightClickArea[hintIdx].addChild(hintObj2);

        createjs.Tween.get(hintObj, {loop: true})
            .to({alpha: 0.3}, 700)
            .to({alpha: 1}, 300);

        createjs.Tween.get(hintObj2, {loop: true})
            .to({alpha: 0.3}, 700)
            .to({alpha: 1}, 300);
    }
}