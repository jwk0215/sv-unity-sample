/**
 * animate 리소스 로딩 완료후 호출
 */
window.msgUtil.addMsgEvt('animateLoaded', async (evt) => {
	// 학습 유형 파일
    const studyTypeScriptArr = [
        "/contents/common/studyType/sudoku.js"
    ];

	try {
        await Promise.all(studyTypeScriptArr.map(window.controller.loadScript));

		window.controller.init([
			new Sudoku({level:1, itemStartPos:0, itemSize:4, selectedPos:5, leftMap:[
				{itemIndex:0, disabled:true, correctPos:2}, {itemIndex:1, disabled:true, correctPos:3},{itemIndex:1, disabled:false, correctPos:1},{itemIndex:3, disabled:false, correctPos:0},
				{itemIndex:4, disabled:true, correctPos:0}, {itemIndex:5, disabled:false, correctPos:1},{itemIndex:6, disabled:true, correctPos:3},{itemIndex:7, disabled:true, correctPos:2},
				{itemIndex:8, disabled:false, correctPos:3}, {itemIndex:9, disabled:false, correctPos:2},{itemIndex:10, disabled:true, correctPos:0},{itemIndex:11, disabled:true, correctPos:1},
				{itemIndex:12, disabled:true, correctPos:1}, {itemIndex:13, disabled:true, correctPos:0},{itemIndex:14, disabled:false, correctPos:2},{itemIndex:15, disabled:true, correctPos:3},
			]}),
			new Sudoku({level:1, itemStartPos:4, itemSize:4, selectedPos:0, leftMap:[
				{itemIndex:0, disabled:false, correctPos:4}, {itemIndex:1, disabled:true, correctPos:5},{itemIndex:1, disabled:false, correctPos:6},{itemIndex:3, disabled:true, correctPos:7},
				{itemIndex:4, disabled:true, correctPos:6}, {itemIndex:5, disabled:true, correctPos:7},{itemIndex:6, disabled:true, correctPos:4},{itemIndex:7, disabled:false, correctPos:5},
				{itemIndex:8, disabled:false, correctPos:5}, {itemIndex:9, disabled:true, correctPos:6},{itemIndex:10, disabled:false, correctPos:7},{itemIndex:11, disabled:true, correctPos:4},
				{itemIndex:12, disabled:true, correctPos:7}, {itemIndex:13, disabled:false, correctPos:4},{itemIndex:14, disabled:true, correctPos:5},{itemIndex:15, disabled:false, correctPos:6},
			]}),
			new Sudoku({level:1, itemStartPos:8, itemSize:4, selectedPos:1, leftMap:[
				{itemIndex:0, disabled:true, correctPos:8}, {itemIndex:1, disabled:false, correctPos:10},{itemIndex:1, disabled:true, correctPos:11},{itemIndex:3, disabled:true, correctPos:9},
				{itemIndex:4, disabled:false, correctPos:9}, {itemIndex:5, disabled:true, correctPos:11},{itemIndex:6, disabled:false, correctPos:8},{itemIndex:7, disabled:false, correctPos:10},
				{itemIndex:8, disabled:false, correctPos:11}, {itemIndex:9, disabled:true, correctPos:9},{itemIndex:10, disabled:false, correctPos:10},{itemIndex:11, disabled:true, correctPos:8},
				{itemIndex:12, disabled:true, correctPos:10}, {itemIndex:13, disabled:false, correctPos:8},{itemIndex:14, disabled:true, correctPos:9},{itemIndex:15, disabled:false, correctPos:11},
			]}),
		]);
	} catch (e) {
		console.error("학습 유형 스크립트 동적 로드 실패");
        console.log(error);
	}
});
