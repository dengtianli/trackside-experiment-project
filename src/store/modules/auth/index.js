import mockData from '../../../static/navlist.js'
// import api from '@/request/api'
const state = {
    navList: [],
}

const mutations = {
    setNavList: (state, data) => {
        state.navList = data
    },
}

const actions = {
    // 获取该用户的菜单列表
    getNavList({ commit }) {
        // return api.baseData.getMenu().then((res) => {
        //     let data = res.data.data || [];
        //     console.log(res.data)
        //     commit("setNavList", data);
        // });
        console.log(mockData)
       commit("setNavList", mockData); 
    },
    // 将菜单列表扁平化形成权限列表
    getPermissionList({ state }) {
        return new Promise((resolve) => {
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr) {
                for (let v of arr) {
                    if (v.children && v.children.length) {
                        flatNavList(v.children)
                    } else {
                        permissionList.push(v)
                    }
                }
            }
            flatNavList(state.navList)
            resolve(permissionList)
        })
    },
    // 清空缓存的菜单数据
    clearAllMenu: ({ commit }) => {
        commit("setNavList", []);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
