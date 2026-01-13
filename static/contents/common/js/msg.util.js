window.msgUtil = {
    // 메시지 수신 이벤트를 저장할 Map
    msgEvt: new Map(),
    
    /**
     * 메시지 보내기
     * @param {string} msg 메시지
     */
    sendMsg(type, msg = {}) {
        msg.type = type;
        window.parent.postMessage(msg, '*');
    },
    
    /**
     * 메시지 수신 시 실행할 함수 추가
     * @param {string} type 메시지 타입
     * @param {any} evt 이벤트 함수
     */
    addMsgEvt(type, evt) {
        this.msgEvt.set(type, evt);
    },

    
    rcvMsg({data}) {
        this.msgEvt.forEach((evt, type) => {
            if (data.type === type) evt(data);
        });
    },

    setRcvMsgEvt() {
        window.addEventListener("message", this.rcvMsg.bind(this));
    }
}
window.msgUtil.setRcvMsgEvt();