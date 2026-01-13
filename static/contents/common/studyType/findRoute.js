class FindRoute extends Study {

  constructor(data) {
    super(data);
    this.selectObj = {selectNumbers: [], selectTiles: [], arrows: [], userRoute: []};    // 히스토리관리를 위한 객체

    // --- init에서 초기화되는 프로프터 ---
    this.mcUnder = null;      // 하단 타일 외부 박스
    this.tiles = [];          // 타일들을 저장할 배열
    this.tileSize = null;     // 타일의 칸 수
    this.characterPos = {}    // 캐릭터가 원래 있어야 할 위치
    this.step = 0;            // 현재 문제 차시(exportRoot의 현재 프레임)
    this.tileFrame = 0;       // 타일의 프레임

    this.hintBox = null;      // 힌트객체 (힌트 효과)
    this.mcNo = null;         // 힌트 시 나오는 X표시
    this.incorrectStartNum = null;      // 힌트 사용 시 틀린 부분의 idx 번호
    this.incorrectTiles = [];           // 힌트 사용 후 클릭 시 틀린 부분을 지우기 위한 배열
  }


  // --- init() ---
  async init(isReset) {
    console.log("FindRoute init()");
    // if (!studyData.chapterId.includes("_007")) {
    //   exportRoot.gotoAndStop(this.data.level - 1);    // 레벨에 따른 exportRoot의 프레임 이동
    // }

    // 다시하기인 경우 ===============
    if (isReset) {
      this.selectObj.selectTiles.forEach((v, i) => {
        if (i > 0) v.gotoAndStop(this.tileFrame);
      });

      this.selectObj.arrows.forEach(v => this.mcUnder.removeChild(v));

      this.clearSelect(true);
      this.checkCorrect();
      return;
    }
    // ==============================

    super.init();
    const mcRoot = this.mcRoot;
    const data = this.data;

    // 프로퍼티 초기화
    this.mcUnder = mcRoot.mc_under;
    this.tileSize = data.level < 3 ? {column: 5, row: 4} : data.level < 5 ? {column: 7, row: 5} : {column: 9, row: 5};
    this.characterPos = {x: mcRoot.mc_character.x, y: mcRoot.mc_character.y};
    this.step = window.controller.currentStep + 1;
    
    // if (!studyData.chapterId.includes("_007")) {
    //   this.tileFrame = this.step === 0 ? 0 : this.step === 1 ? 2 : 4;
    // } else {
    //   this.tileFrame = 0;
    // }
    this.tileFrame = 0;

    // if (!studyData.chapterId.includes("_007")) {
    //   // 해당하는 문제 차시로 무비클립 프레임 이동
    //   mcRoot.mc_over.gotoAndStop(this.step);
    //   mcRoot.mc_character.gotoAndStop(this.step);
    //   mcRoot.mc_house.gotoAndStop(this.step);
    //   this.mcUnder.gotoAndStop(this.step);
    // }

    // 캐릭터와 집의 bound 설정
    const characterSize = data.level < 3 ? {width: 112, height: 108} : data.level < 5 ? {width: 104, height: 108} : {width: 88, height: 108};
    const houseSize = data.level < 3 ? {width: 178, height: 129} : {width: 154, height: 129};
    mcRoot.mc_character.setBounds(this.characterPos.x, this.characterPos.y, characterSize.width, characterSize.height);


    mcRoot.mc_house.setBounds(mcRoot.mc_house.x, mcRoot.mc_house.y, houseSize.width, houseSize.height);

    // mcUnder 안에 타일 넣기
    const {column, row} = this.tileSize;
    for (let i = 0, c = 0, r = 0; i < column * row; i++, c++) {
      const tile = this.createTile(i);
      tile.x = (c * tile.getBounds().width) + 4;
      tile.y = (r * tile.getBounds().height) + 4;

      tile.gotoAndStop(this.tileFrame);
      this.mcUnder.addChild(tile);
      this.tiles.push(tile);

      if ((i + 1) % column === 0) {
        c = -1;
        r++;
      }
    }

    const tileFont = data.level < 3 ? 38 : data.level < 5 ? 34 : 30;
    data.outputNumbers.forEach((v, i) => {
      const tile = this.tiles[i];
      const output = new createjs.Text(v, tileFont + "px Pretendard", "#000000");

      output.x = (tile.getBounds().width - output.getBounds().width) / 2;
      output.y = ((tile.getBounds().height - output.getBounds().height) / 2) + ((output.getBounds().height - tileFont) / 2);
      tile.addChild(output);
    });

    // 첫번째 타일 선택 상태로 만들기
    const firstTile = this.tiles[this.tiles.length - column];
    firstTile.gotoAndStop(this.tileFrame + 1);
    this.selectObj.selectNumbers.push(data.answerNumbers[0]);
    this.selectObj.selectTiles.push(firstTile);

    // 클릭 이벤트 할당
    this.clickEvt = this.clickEvt.bind(this);
    mcRoot.addEventListener("click", this.clickEvt);
  }


  // --- start() ---
  start() {
    console.log("FindRoute start()");
    this.userAction = true;
  }


  // --- 타일 생성 메서드 ---
  createTile(i) {
    switch(this.data.level) {
      case 1:
      case 2:
        if (this.step === 0) return i % 2 === 0 ? new lib.mc_tile_12_b : new lib.mc_tile_12_a;

        return i % 3 === 0 ? new lib.mc_tile_12_c : i % 2 === 0 ? new lib.mc_tile_12_b : new lib.mc_tile_12_a;
      case 3:
      case 4:
        return i % 3 === 0 ? new lib.mc_tile_34_c : i % 2 === 0 ? new lib.mc_tile_34_b : new lib.mc_tile_34_a;
      default:
        return i % 3 === 0 ? new lib.mc_tile_56_c : i % 2 === 0 ? new lib.mc_tile_56_b : new lib.mc_tile_56_a;
    }
  }


  // --- 클릭 이벤트 ---
  clickEvt(e) {
    if (!this.userAction) return;

    this.tiles.forEach((v, i) => {
      const pt = v.globalToLocal(e.stageX, e.stageY);
      if (!v.hitTest(pt.x, pt.y)) return;

      const {selectNumbers, selectTiles, arrows, userRoute} = this.selectObj;
      const {column} = this.tileSize;
      const lastTileIdx = this.tiles.indexOf(selectTiles[selectTiles.length - 1]);

      // 힌트모드인 경우 타일 판별
      if (this.isHintMode) {    
        let flag = false;
        for (const hint of v.children) {
          if (hint instanceof createjs.Shape) flag = true;
        }

        if (!flag) return;

        // 힌트에 관련된 요소 지우기
        v.removeChild(this.hintBox);
        this.hintBox = null;

        if (this.mcNo && this.incorrectStartNum && this.incorrectTiles.length > 0) {
          this.incorrectTiles.forEach(v => v.gotoAndStop(this.tileFrame));
          arrows.forEach((v, i) => {
            if (i >= this.incorrectStartNum - 1) this.mcUnder.removeChild(v);
          });
          this.mcUnder.removeChild(this.mcNo);
  
          selectNumbers.splice(this.incorrectStartNum, selectNumbers.length);
          arrows.splice(this.incorrectStartNum - 1, arrows.length);
          userRoute.splice(this.incorrectStartNum - 1, userRoute.length);
  
          this.mcNo = null;
          this.incorrectStartNum = null;
          this.incorrectTiles = [];
        }

        this.isHintMode = false;
        super.sendHintUsed();

      // 힌트모드가 아닌 경우 판별
      } else {                  
        if (!this.checkTile(i, lastTileIdx)) return;
        if (v.currentFrame !== this.tileFrame) return;
      }

      // 이벤트 로직 ---
      this.userAction = false;

      const arr = new lib.mc_in_arrow();
      const lastTileSize = this.tiles[lastTileIdx].getBounds();
      const arrSize = arr.getBounds();

      if (i < lastTileIdx) {
        if ((i + 1) === lastTileIdx) {      // 왼쪽
          arr.setTransform(arrSize.width, arrSize.height, 1, 1, 180);
          arr.x += this.tiles[lastTileIdx].x - (arrSize.width / 2);
          arr.y += this.tiles[lastTileIdx].y + (lastTileSize.height - arrSize.height) / 2;
          userRoute.push('l')
        } else {                            // 위쪽
          arr.setTransform(0, arrSize.width, 1, 1, -90);
          arr.x += this.tiles[lastTileIdx].x + ((lastTileSize.height - arrSize.height) / 2);
          arr.y += this.tiles[lastTileIdx].y - (arrSize.width / 2);
          userRoute.push('u');
        }
      } else {
        if ((i - 1) === lastTileIdx) {      // 오른쪽
          arr.x += this.tiles[lastTileIdx].x + lastTileSize.width - (arrSize.width / 2);
          arr.y += this.tiles[lastTileIdx].y + (lastTileSize.height - arrSize.height) / 2;
          userRoute.push('r');
        } else {                            // 아래쪽
          arr.setTransform(arrSize.height, 0, 1, 1, 90);
          arr.x += this.tiles[lastTileIdx].x + ((lastTileSize.width - arrSize.height) / 2);
          arr.y += this.tiles[lastTileIdx].y + lastTileSize.height - (arrSize.width / 2);
          userRoute.push('d');
        }
      }

      this.mcUnder.addChild(arr);
      arrows.push(arr);

      v.children.forEach(v => {
        if (v instanceof createjs.Text) selectNumbers.push(Number(v.text));
      });
      
      selectTiles.push(v);
      v.gotoAndStop(this.tileFrame + 1);

      AnimateUtil.playSound("click");
      this.checkCorrect();
      setTimeout(() => this.userAction = true, 200);
      return;
    });
  }
  

  // --- 타일 체크를 위한 메서드 ---
  checkTile(i, lastTileIdx) {
    const {column} = this.tileSize;

    if (
      (i === lastTileIdx + column) ||
      (i === lastTileIdx - column) ||
      (i === lastTileIdx + 1 && (i + 1 % column !== 0) && (i % column !== 0)) ||
      (i === lastTileIdx - 1 && (lastTileIdx % column !== 0))
    ) {
      return true;
    } else {
      return false;
    }
  }


  // --- 정답 버튼 활성화 판별 ---
  checkCorrect() {
    const {selectTiles} = this.selectObj;
    if (
      selectTiles[selectTiles.length - 1] === this.tiles[this.tileSize.column - 1] &&
      selectTiles[selectTiles.length - 1].currentFrame !== this.tileFrame
    ) {
      super.sendCorrectCondition(true);
    } else {
      super.sendCorrectCondition(false);
    }
  }


  // --- restart() ---
  restart() {
    console.log("FindRoute restart()");

    if (
      !this.userAction ||
      this.isHintMode ||
      this.selectObj.selectNumbers.length <= 1
    ) return;

    this.init(true);
  }


  // --- 히스토리 삭제(선택 요소들 삭제) ---
  clearSelect(isReset) {
    if (isReset) {
      this.selectObj.selectNumbers.splice(1, this.selectObj.selectNumbers.length);
      this.selectObj.selectTiles.splice(1, this.selectObj.selectTiles.length);
    } else {
      this.selectObj.selectNumbers = [];
      this.selectObj.selectTiles = [];
    }

    this.selectObj.arrows = [];
    this.selectObj.userRoute = [];
  }


  // --- rollback() ---
  rollback() {
    console.log("FindRoute rollback()");
    if (!this.userAction || this.isHintMode || this.selectObj.selectNumbers.length <= 1) return;

    const {selectNumbers, selectTiles, arrows, userRoute} = this.selectObj;

    selectTiles[selectTiles.length - 1].gotoAndStop(this.tileFrame);
    this.mcUnder.removeChild(arrows[arrows.length - 1]);

    selectNumbers.pop();
    selectTiles.pop();
    arrows.pop();
    userRoute.pop();

    this.checkCorrect();
  }


  // --- correct() ---
  async correct() {
    console.log("FindRoute correct()");
    if (!this.userAction || this.isHintMode) return;

    this.userAction = false;

    const data = this.data;
    const {selectNumbers, selectTiles, arrows, userRoute} = this.selectObj;

    // 정답 판별
    let isCorrect = true;
    if (data.answerNumbers.length !== selectNumbers.length || data.answerRoute.length !== userRoute.length) {
      isCorrect = false;
    } else {
      data.answerNumbers.forEach((v, i) => {
        if (v !== selectNumbers[i]) isCorrect = false;
      });

      data.answerRoute.forEach((v, i) => {
        if (v !== userRoute[i]) isCorrect = false;
      });
    }

    // 정답인 경우
    if (isCorrect) {
      try {
        await this.playAnswerAni();
        super.sendStudyEnd(true);
        return;
      } catch (error) {
        console.log("correct ani error " + error);
        return;
      }

    // 오답인 경우
    } else {
      AnimateUtil.aniShake(this.mcRoot);
      super.sendIncorrectStart();

      const ins = AnimateUtil.playSound("incorrect");
      ins.on("complete", () => {
        super.sendIncorrectEnd();

        selectTiles.forEach((v, i) => {
          if (i > 0) v.gotoAndStop(this.tileFrame);
        });

        arrows.forEach(v => this.mcUnder.removeChild(v));

        this.clearSelect(true);
        super.sendCorrectCondition(false);
        this.userAction = true;
        return;
      });
    }
  }


  // --- release() ---
  release() {
    console.log("FindRoute release()");

    this.mcUnder.removeAllChildren();

    this.mcRoot.mc_character.setTransform(
      this.characterPos.x,
      this.characterPos.y,
      1,
      1
    );

    this.mcRoot.removeAllEventListeners();
  }


  // --- 정답 시 애니메이션 구동을 위한 메서드 ---
  playAnswerAni() {
    return new Promise((resolve, reject) => {
      let count = 0;
      const mcCharacter = this.mcRoot.mc_character;
      const {selectTiles} = this.selectObj;
      const idxArr = [];
      const points = [];

      this.tiles.forEach(v => {
        if (v.currentFrame === this.tileFrame) {
          for (const txt of v.children) {
            if (txt instanceof createjs.Text) txt.alpha = 0.3;
          }
        }
      });

      // 방향 전환이 있는 idx 구하기
      idxArr.push(0);
      this.data.answerRoute.forEach((v, i, arr) => {
        if (
          (i !== arr.length - 1 && v !== arr[i + 1]) ||
          (i === arr.length - 1 && v === arr[i - 1]) ||
          (i === arr.length - 1 && v !== arr[i - 1])
        ) idxArr.push(i + 1);
      });

      // 이동 좌표 구하기
      for (let i = 0; i < idxArr.length; i++) {
        points.push(this.mcUnder.localToGlobal(
          selectTiles[idxArr[i]].x + ((selectTiles[idxArr[i]].getBounds().width - mcCharacter.getBounds().width) / 2),
          selectTiles[idxArr[i]].y + ((selectTiles[idxArr[i]].getBounds().height - mcCharacter.getBounds().height) / 2)
        ));
      }

      this.moveCharacter(mcCharacter, count, points);
      setTimeout(() => resolve(), (1000 * (points.length + 1)) + 300);
    });
  }


  // --- 캐릭터 이동을 위한 메서드 ---
  moveCharacter(character, count, points) {
    const tw = new createjs.Tween(character);

    if (count < points.length) {
      tw.to({x: points[count].x, y: points[count].y}, 1000, createjs.Ease.getPowInOut(6));

      tw.on("complete", () => {
        count++;
        this.moveCharacter(character, count, points);
      });
    } else {
      const mcHouse = this.mcRoot.mc_house;

      if (character.currentFrame === character.totalFrames - 1) {
        tw.to({
          x: mcHouse.x,
          y: mcHouse.y + ((mcHouse.getBounds().height - (character.getBounds().height * 0.6)) / 2) + 10,
          scaleX: 0.6,
          scaleY: 0.6
        }, 1000, createjs.Ease.getPowInOut(6));
      } else {
        tw.to({
          x: mcHouse.x + ((mcHouse.getBounds().width - (character.getBounds().width * 0.6)) / 2),
          y: mcHouse.y + ((mcHouse.getBounds().height - (character.getBounds().height * 0.6)) / 2),
          scaleX: 0.6,
          scaleY: 0.6
        }, 1000, createjs.Ease.getPowInOut(6));
      }
    }
  }


  // --- checkHint() ---
  checkHint() {
    console.log("FindRoute checkHint()");

    if (
      !this.userAction ||
      this.isHintMode
    ) return;

    let flag = this.checkSelect();
    if (flag) return;

    super.checkHint();
  }


  // --- showHint() ---
  showHint() {
    console.log("FindRoute showHint()");
    if (!this.userAction || this.isHintMode) return;

    this.isHintMode = true;

    const {selectNumbers, selectTiles, arrows, userRoute} = this.selectObj;
    const data = this.data;

    for (let i = 0; i < selectNumbers.length; i++) {
      // 틀린 경우
      if (data.answerNumbers[i] !== selectNumbers[i] || data.answerRoute[i - 1] !== userRoute[i - 1]) {
        let flag = true;

        data.answerNumbers.forEach((v, i) => {
          if (v !== selectNumbers[i]) flag = false;
        });
  
        data.answerRoute.forEach((v, i) => {
          if (v !== userRoute[i]) flag = false;
        });

        // 전체 정답 후 지나친 경우
        if (flag && selectTiles[selectTiles.length - 1] !== this.tiles[this.tileSize.column - 1]) {
          console.log("asd");
          const n = selectTiles.indexOf(this.tiles[this.tileSize.column - 1]);
          this.createHint(selectTiles[n], "#2b63ff");

          for (let inc = n; inc < selectTiles.length; inc++) {
            this.incorrectTiles.push(selectTiles[inc]);
          }

          selectTiles.splice(n, selectTiles.length);
          this.incorrectStartNum = n;

        // 도중에 틀린 길이 있는 경우
        } else {
          const lastTileIdx = this.tiles.indexOf(selectTiles[i - 1]);
          this.selectHintTile(false, i, lastTileIdx);

          for (let inc = i; inc < selectTiles.length; inc++) {
            this.incorrectTiles.push(selectTiles[inc]);
          }
  
          selectTiles.splice(i, selectTiles.length);
          this.incorrectStartNum = i;
        }

        const mcNo = new lib.mc_no();

        if (userRoute[i - 1] === 'r') {
          mcNo.x = arrows[i - 1].x + ((arrows[i - 1].getBounds().width - mcNo.getBounds().width) / 2);
          mcNo.y = arrows[i - 1].y + ((arrows[i - 1].getBounds().height - mcNo.getBounds().height) / 2);
        } else if (userRoute[i - 1] === 'l') {
          mcNo.x = arrows[i - 1].x - arrows[i - 1].getBounds().width + ((arrows[i - 1].getBounds().width - mcNo.getBounds().width) / 2);
          mcNo.y = arrows[i - 1].y - arrows[i - 1].getBounds().height + ((arrows[i - 1].getBounds().height - mcNo.getBounds().height) / 2);
        } else if (userRoute[i - 1] === 'u') {
          mcNo.x = arrows[i - 1].x + ((arrows[i - 1].getBounds().height - mcNo.getBounds().width) / 2);
          mcNo.y = arrows[i - 1].y - arrows[i - 1].getBounds().width + ((arrows[i - 1].getBounds().width - mcNo.getBounds().height) / 2);
        } else {
          mcNo.x = arrows[i - 1].x - arrows[i - 1].getBounds().height + ((arrows[i - 1].getBounds().height - mcNo.getBounds().width) / 2);
          mcNo.y = arrows[i - 1].y + ((arrows[i - 1].getBounds().width - mcNo.getBounds().height) / 2);
        }

        this.mcUnder.addChild(mcNo);
        this.mcNo = mcNo;

        break;

      // 선택한 길이 전부 맞는 경우
      } else if ((i === selectNumbers.length - 1) && data.answerNumbers[i] === selectNumbers[i]) {
        const lastTileIdx = this.tiles.indexOf(selectTiles[selectTiles.length - 1]);
        this.selectHintTile(true, i, lastTileIdx);
        break;
      }
    }

    super.sendCorrectCondition(false);
  }


  // --- 선택한 요소들이 전부 정답을 포함하는지 확인하는 메서드 ---
  checkSelect() {
    const {selectNumbers, selectTiles, arrows, userRoute} = this.selectObj;
    const data = this.data;
    let flag = true;

    if (selectNumbers.length !== data.answerNumbers.length || userRoute.length !== data.answerRoute.length) {
      flag = false;
    } else {
      data.answerNumbers.forEach((v, i) => {
        if (v !== selectNumbers[i]) flag = false;
      });

      data.answerRoute.forEach((v, i) => {
        if (v !== userRoute[i]) flag = false;
      });
    }

    return flag;
  }


  // --- 힌트 클릭 시 다음 타일을 표시하기 위한 메서드 ---
  selectHintTile(flag, i, lastTileIdx) {
    const data = this.data;
    const {column} = this.tileSize;

    const nextRoute = flag ? data.answerRoute[i] : data.answerRoute[i - 1];
    const nextNumber = flag ? data.answerNumbers[i + 1] : data.answerNumbers[i];

    this.tiles.forEach((v, n) => {
      if (this.checkTile(n, lastTileIdx)) {
        let route;

        if (n === lastTileIdx + column) route = 'd';
        else if (n === lastTileIdx + 1) route = 'r';
        else if (n === lastTileIdx - column) route = 'u';
        else if (n === lastTileIdx - 1) route = 'l';

        if (route === nextRoute) {
          for (const txt of v.children) {
            if (txt instanceof createjs.Text && Number(txt.text) === nextNumber) {
              this.createHint(this.tiles[n], "#2b63ff");
              return;
            }
          }
        }
      }
    });
  }


  // --- 힌트 객체 생성 및 추가 ---
  createHint(tile, color) {
    const hint = new createjs.Shape();
    hint.graphics.beginStroke(color).setStrokeStyle(5)
      .drawRect(0, 0, (tile.getBounds().width - 8), (tile.getBounds().height - 8));

    hint.x = 4;
    hint.y = 4;
    tile.addChild(hint);
    this.hintBox = hint;

    createjs.Tween.get(hint, {loop: true})
      .to({alpha: 0.3}, 700)
      .to({alpha: 1}, 300);
  }

}