window.msgUtil.addMsgEvt("animateLoaded", async (evt) => {
    // 학습 유형 파일
    const studyTypeScriptArr = [
        "/contents/common/studyType/findRoute.js"
    ];

    try {
        await Promise.all(studyTypeScriptArr.map(window.controller.loadScript));
        
        window.controller.init([
            new FindRoute({
				level: 1,
				answerNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
				answerRoute: [
					'u', 'u', 'r', 'r', 'u', 
					'r', 'r'
				],
				outputNumbers: [
					2, 3, 6, 7, 8,
					3, 4, 5, 4, 7,
					2, 7, 8, 5, 6,
					1, 9, 3, 6, 7
				]
			}),
			new FindRoute({
				level: 1,
				answerNumbers: [2, 4, 6, 8, 10, 12, 14, 16],
				answerRoute: [
					'u', 'u', 'r', 'r', 'r',
					'r', 'u'
				],
				outputNumbers: [
					7, 10, 11, 10, 16,
					6, 8, 10, 12, 14,
					4, 5, 9, 14, 15,
					2, 3, 10, 13, 14
				]
			}),
			new FindRoute({
				level: 1,
				answerNumbers: [1, 3, 5, 7, 9, 11, 13, 15],
				answerRoute: [
					'r', 'r', 'r', 'u', 'r',
					'u', 'u'
				],
				outputNumbers: [
					5, 7, 9, 11, 15,
					4, 6, 7, 10, 13,
					3, 8, 6, 9, 11,
					1, 3, 5, 7, 8
				]
			}),
        ]);
        
    } catch (error) {
        console.error("학습 유형 스크립트 동적 로드 실패");
        console.log(error);
    }
});