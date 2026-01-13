class Sudoku extends Study {
  constructor(data) {
    super(data);
    this.focusedItem = null; //좌측 선택된 아이템
    this.mcLeftInputItem = []; //좌측 아이템
    this.incorrectCnt = 0; //오답 횟수
    //this.isHintMode = false; //힌트모드 유무
    this.history = []; //히스토리 정보
  }

  //overriding
  init(isReset) {
    super.init();
    console.log('Sudoku init()');
    
    const mcRoot = this.mcRoot;
    const data = this.data;

    //배경클릭설정
    mcRoot.mc_background.alpha = 0.01;
    mcRoot.addEventListener('click', this.clickEvent);

    //우측 아이템 설정
    for(let i=0; i < data.itemSize; i++) {
      const mcItem = mcRoot.mc_right_box[`mc_item${i + 1}`];
      mcItem.index = i;
      mcItem.mc_item.gotoAndStop(data.itemStartPos + i);
      mcItem.addEventListener('click', this.clickEvent);
    }

    //좌측 아이템 설정
    for(let i=0; i < data.leftMap.length; i++) {
      const mcItem = mcRoot.mc_left_box[`mc_item${i + 1}`];
      mcItem.index = i;

      const itemData = data.leftMap[i];

      //데이터 초기화
      mcItem.mc_selected.visible = false;
      if(itemData.disabled) {
        mcItem.isCorrect = true;
        mcItem.gotoAndStop("disable");
        mcItem.mc_item.visible = true;
        mcItem.mc_item.gotoAndStop(itemData.correctPos);
      } else {

        if (!isReset) {
          mcItem.isCorrect = false;
        }

        if (!mcItem.isCorrect) {
          mcItem.addEventListener('click', this.clickEvent);
          mcItem.mc_item.visible = false;
        }
        
        mcItem.gotoAndStop("able");
      }

      this.mcLeftInputItem.push(mcItem);
    }

    this.history = []; //히스토리 정보

    this.focusedItem = null;

    if (!isReset) {
      //입력대상 설정
      this.setNextInputBox();
    }
  }

  //다음 입력칸 선택
  setNextInputBox() {
    /*
    //입력대상 목록
    const inputList = this.mcLeftInputItem.filter(mc => !mc.mc_item.visible);

    if (inputList.length > 0) {
      //AnimateUtil.shuffleArray(inputList);
      inputList[0].mc_selected.visible = true;
      this.focusedItem = inputList[0];
    }
    */
    const initMc = this.mcLeftInputItem[this.data.selectedPos];
    initMc.mc_selected.visible = true;
    this.focusedItem = initMc;
  }

  //클릭이벤트
  clickEvent = (evt) => {
    if (!this.userAction) return;
    
    const mc = evt.currentTarget;
    
    //좌측 클릭
    if (mc.parent?.name === 'mc_left_box') {
      const ins = playSound('click');

      //힌트 모드시 선택
      if (this.isHintMode) {
        this.clearFocus();

        const dataIndex = mc.index;
        const data = this.data.leftMap[dataIndex];

        //정답노출, 비활성화 처리
        mc.isCorrect = true;
        mc.mc_item.gotoAndStop(data.correctPos);
        mc.mc_item.filters = [];
        mc.mc_item.uncache();
        mc.mc_item.visible = true;
        mc.removeEventListener('click', this.clickEvent);
        this.isHintMode = false;

        this.checkCorrect();

        //힌트사용 이벤트 전송
        super.sendHintUsed();
        return;
      }

      this.clearFocus();

      this.focusedItem = mc;
      this.focusedItem.mc_selected.visible = true;

      //선택된 칸 클리어, 이력 기록
      if (this.focusedItem.mc_item.visible) {
        this.addHistory();
        this.focusedItem.mc_item.visible = false;
        this.checkCorrect();
      }
      evt.stopPropagation();
      return;
    }

    //우측 클릭
    if (mc.parent?.name === 'mc_right_box') {

      //좌측 선택 아이템이 존재할때
      if (this.focusedItem) {

        //히스토리 기록
        this.addHistory();

        mc.gotoAndPlay('click');
        this.focusedItem.mc_item.gotoAndStop(mc.mc_item.currentFrame);

        if (this.data.level !== 1) {
          const itemColorFilter = new createjs.ColorFilter(0,0,0,1,51,102,255,0);
          this.focusedItem.mc_item.filters = [itemColorFilter];
          this.focusedItem.mc_item.cache(31,23,46,80);
        }

        this.focusedItem.mc_item.visible = true;
        this.clearFocus();
        this.checkCorrect();
      }
      evt.stopPropagation();
      return;
    }

    if (!this.isHintMode) {
      this.clearFocus();
    }
  }

  //포커스 클리어
  clearFocus() {
    this.mcLeftInputItem.forEach(item => {
      item.mc_selected.gotoAndStop('main');
      item.mc_selected.visible = false;
    })
    this.focusedItem = null;
  }

  //정답버튼 활성, 비활성 유무
  checkCorrect() {
    let useButton = true;

    this.mcLeftInputItem.forEach(item => {
      if (!item.mc_item.visible) {
        useButton = false;
      }
    })

    super.sendCorrectCondition(useButton);
  }

  addHistory() {
    if (!this.focusedItem) return;

    //마지막 히스토리와 비교하여 다를경우 기록
    const lastInfo = this.history.length > 0 ? this.history[this.history.length - 1] : null;

    const curItemPos = this.focusedItem.mc_item.visible ? this.focusedItem.mc_item.currentFrame: -1;
    const curItemIndex = this.focusedItem.index;
    
    if (lastInfo != null && lastInfo.itemIndex === curItemIndex && lastInfo.itemPos == curItemPos) {
      return;
    }
    this.history.push({itemIndex: curItemIndex, itemPos: curItemPos});

    console.log(this.history);
  }

  popHistory() {
    if (this.history.length <= 0) 
      return;

    const lastInfo = this.history.pop();

    //히스토리가 disabled 상태라면 또는 현재와 같으면 다음 항목 호출
    //console.log(this.focusedItem, this.focusedItem.index === lastInfo.itemIndex);

    console.log(lastInfo, this.mcRoot.mc_left_box[`mc_item${lastInfo.itemIndex + 1}`])
    
    if (this.mcRoot.mc_left_box[`mc_item${lastInfo.itemIndex + 1}`].isCorrect) {
      this.popHistory();
      return;
    }

    //상태 되돌리기
    this.clearFocus();
    const mcItem = this.mcLeftInputItem[lastInfo.itemIndex];
    mcItem.mc_selected.visible = true;
    mcItem.mc_item.visible = lastInfo.itemPos > -1;
    mcItem.mc_item.gotoAndStop(lastInfo.itemPos);
    this.focusedItem = mcItem;

    if (this.data.level !== 1) {
      const itemColorFilter = new createjs.ColorFilter(0,0,0,1,51,102,255,0);
      mcItem.mc_item.filters = [itemColorFilter];
      mcItem.mc_item.cache(31,23,46,80);
    }

    console.log(this.history);
  }

  //overriding
  start() {
    console.log('Sudoku start()');
    this.userAction = true;
  }

  //overriding
  restart() {
    console.log('Sudoku restart()');
    if (!this.userAction || this.isHintMode) return;
    this.clearFocus();
    this.init(true);
    this.checkCorrect();
  }

  //overriding
  rollback() {
    console.log('Sudoku rollback()');
    if (!this.userAction || this.isHintMode) return;

    this.popHistory();
    this.checkCorrect();
  }

  //overriding
  correct() {
    console.log('Sudoku correct()');
    if (!this.userAction || this.isHintMode) return;
    
    this.userAction = false;
    this.clearFocus();

    //정답확인
    let isCorrect = true;
    this.data.leftMap.forEach((data, index) => {
      const mcItem = this.mcLeftInputItem[index];

      if (!data.disabled && mcItem.mc_item.currentFrame !== data.correctPos) {
        //오답
        isCorrect = false;
        mcItem.mc_item.visible = false;
      }
    });

    if (isCorrect) {
      //모두 정답
      this.mcLeftInputItem.forEach(leftItem => {
        leftItem.mc_item.filters = [];
        leftItem.mc_item.uncache();
      })
      
      //학습완료 호출
      super.sendStudyEnd(true);
      return;
    }

    //오답
    this.incorrectCnt++;
    this.checkCorrect();

    AnimateUtil.aniShake(this.mcRoot);

    super.sendIncorrectStart();
    const ins = AnimateUtil.playSound('incorrect');
    ins.on('complete', () => {
      super.sendIncorrectEnd();
      //다시풀기
      this.userAction = true;
      this.history = [];
      return;  
    });

    //정답부분 애니메이션
    this.data.leftMap.forEach((data, index) => {
      const mcItem = this.mcLeftInputItem[index];

      if (!data.disabled && mcItem.mc_item.currentFrame == data.correctPos) {
        mcItem.isCorrect = true;
        mcItem.removeEventListener('click', this.clickEvent);
        AnimateUtil.aniZoomAndFade(mcItem.mc_item, null, () => {
          mcItem.mc_item.filters = [];
          mcItem.mc_item.uncache();
        });
      }
    });
  }

  //overriding
  sendCheckHint() {
    if (!this.userAction || this.isHintMode
      || this.mcLeftInputItem.findIndex(item => !item.isCorrect) === -1) {
     return;
    }
    
    window.msgUtil.sendMsg('checkHint');
  }

  //overriding
  showHint() {
    console.log('Sudoku showHint()');

    //힌트사용이 가능한 상태인지, 힌트사용할 곳이 있는지 체크
    if (!this.userAction || this.isHintMode
        || this.mcLeftInputItem.findIndex(item => !item.isCorrect) === -1) {
      return;
    }

    //힌트사용
    this.isHintMode = true;

    //포커스 아이템 삭제
    this.clearFocus();

    //힌트사용할 곳 포커스
    for (let i=0; i < this.data.leftMap.length; i++) {
      const mcItem = this.mcLeftInputItem[i];

      if (!mcItem.isCorrect) {
        mcItem.mc_selected.gotoAndPlay('loop');
        mcItem.mc_selected.visible = true;
      }
    }

    //정답 비활성
    super.sendCorrectCondition(false);
  }

  //overriding
  timeout() {
    console.log('Sudoku timeout()');
  }

  //overriding
  release() {
    console.log('Sudoku release()');
    this.history = [];

    const data = this.data;
    const mcRoot = this.mcRoot;

    mcRoot.removeEventListener('click', this.clickEvent);

    for(let i=0; i < data.itemSize; i++) {
      const mcItem = mcRoot.mc_right_box[`mc_item${i + 1}`];
      mcItem.removeEventListener('click', this.clickEvent);
    }

    for(let i=0; i < data.leftMap.length; i++) {
      const mcItem = mcRoot.mc_left_box[`mc_item${i + 1}`];
      mcItem.removeEventListener('click', this.clickEvent);
    }
  }
}