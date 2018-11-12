/**
 * wh
 * 2018-08-07
 */
let origin;
const href = location.href;
const isDev = (process.env.NODE_ENV == 'development') || (href.indexOf('http://127.0.0.1') !== -1);
const isPrd = (href.indexOf('lurenhong.top') !== -1); // 生产

if (isDev) { // 开发环境
    origin = 'http://localhost:3000'
} else if(isPrd){ // 生产环境
    origin = 'http://lurenhong.top:80'
}else {
    origin = ''
}

export default origin;