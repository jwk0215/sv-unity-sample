class Study {
    constructor(data) {
        this.data = data;
        this.mcRoot;
        this.userAction = false; //사용자 입력 유무
        this.isHintMode = false; //힌트모드 유무
    }

    init() {
        //1.설정
        console.log('Study init()');
        this.mcRoot = window.AnimateUtil.getFirstMC(exportRoot);
    }

    start() {
        //2.시작  userAction = true
        console.log('Study start()');
    }

    restart() {
        //리셋
        console.log('Study restart()');
    }

    rollback() {
        //뒤로가기
        console.log('Study rollback()');
    }

    correct() {
        //정답 버튼 클릭시
        console.log('Study correct()');
    }

    checkHint() {
        //힌트사용 체크 버튼 클릭시
        console.log('Study checkHint()');
        this.sendCheckHint();
    }

    showHint() {
        //힌트버튼 클릭시
        console.log('Study showHint()');
    }

    timeout() {
        //타임아웃시
        console.log('Study timeout()');
    }

    release() {
        //리소스 반환
        console.log('Study release()');
    }

    //오답효과 시작
    sendIncorrectStart() {
        window.msgUtil.sendMsg('incorrectStart');
    }

    //오답효과 끝
    sendIncorrectEnd() {
        window.msgUtil.sendMsg('incorrectEnd');
    }
    
    //정답버튼 활성, 비활성
    sendCorrectCondition(isAvailable) {
        window.msgUtil.sendMsg('useCorrectBtn', {isAvailable});
    }

    //힌트사용 가능 체크
    sendCheckHint() {
        if (this.userAction && !this.isHintMode) {
            window.msgUtil.sendMsg('checkHint');
        }
    }
    //힌트사용
    sendHintUsed() {
        window.msgUtil.sendMsg('hintUsed');
    }

    //학습완료 호출
    sendStudyEnd(hasGem) {
        window.msgUtil.sendMsg('studyEnd', { hasGem });
    }
}