/**
 * 根据key值清除缓存
 * 不传参数清除所有storage
 */
const clearStorage = (key) => {
    if (key) {
        sessionStorage.removeItem(key);
    } else {
        sessionStorage.clear();
    }
}

/** 
 * 添加本地缓存信息
*/
const setStorage = (key, value) => {
    const type = typeof (value);
    if (type == "string") {
        sessionStorage.setItem(key, value);
    } else if (type == "object") {
        sessionStorage.setItem(key, JSON.stringify(value));
    };
}

/**
 * 获取缓存信息
 */
const getStorage = (key = '') => {
    if (!key) return;
    return JSON.parse(sessionStorage.getItem(key));
};

export {
    clearStorage,
    setStorage,
    getStorage
}