window.msgUtil.addMsgEvt("animateLoaded", async (evt) => {
    // 학습 유형 파일
    const studyTypeScriptArr = [
        "/contents/common/studyType/findDifference.js"
    ];

    try {
        await Promise.all(studyTypeScriptArr.map(window.controller.loadScript));
        
        window.controller.init([
            new FindDifference(),
            new FindDifference(),
            new FindDifference()
        ]);
        
    } catch (error) {
        console.error("학습 유형 스크립트 동적 로드 실패");
        console.log(error);
    }
});