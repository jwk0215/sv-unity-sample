export class Util {
    /**
     * 파라미터 값 가져오기
     * @param name 파라미터 이름
     * @param url URL
     * @returns 파라미터 값
     */
    static getParameter(name: string, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');

        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}