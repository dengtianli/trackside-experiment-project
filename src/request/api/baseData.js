/**
 * 模块接口列表
 */

import axios from '../../util/http'; // 导入http中创建的axios实例

const baseData = {
   
    //菜单
     getMenu() {
        return axios.post(`/api/service/base/acMenu/selectAlls`)
    },
     //登录接口
    userLogin(params) {
        return axios.post(`/api/login/validate`, params)
    },
    //退出登录
    userLoginOut(params) {
        return axios.post(`/api/login/logout`, params)
    },
    
   
   
}

export default baseData;

