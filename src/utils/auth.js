// 提供操作本地户用信息的相关函数
// sessionStorage进行存储
// setItem('键名','具体数据，必须是字符串格式')
// getItem('键名')
// removeItem('键名')

const KEY = 'hm-toutiao-lianxi-user'
/**
 * 保存
 * @param {Object} user 是用户信息对象
 */
const setUser = user => {
    window.sessionStorage.setItem(KEY,JSON.stringify(user))
}

/**
 * 获取
 */
const getUser = () => {
    // localUser获取的可能是字符串，或者null,不能把null返回会报错，可以返回一个空对象
    const localUser =  window.sessionStorage.getItem(KEY)
    return JSON.parse(localUser || '{}')
    
}

/**
 * 删除
 * 不能用clear或删除其他数据
 */
const delUser = () => {
    window.sessionStorage.removeItem(KEY)
}

// 导出
export default {setUser,getUser,delUser}
