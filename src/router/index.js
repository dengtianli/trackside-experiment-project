





import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'
import staticRoute from './staticRoute'

import { Message} from 'element-ui'

var permissionList = [];
function initRoute(router) {
    return new Promise((resolve) => {
        // 首次进入加载菜单信息，以后读取store中数据
        if(store.state.auth.navList.length == 0){
            store.dispatch('auth/getNavList').then(() => {
                // 数据扁平化处理
                store.dispatch('auth/getPermissionList').then((res) =>{
                  permissionList = res
                  res.forEach(function (v) {
                        // 设置已点击菜单返回数据
                      let routeItem = router.match(v.path)
                        if (routeItem) {
                            routeItem.meta.permission = v.permission ? v.permission : []
                            routeItem.meta.name = v.name
                        }
                    })
                    resolve()
                })
            });
        } else {
            // 数据扁平化处理
          store.dispatch('auth/getPermissionList').then((res) => {
             
                permissionList = res
                res.forEach(function (v) {
                    // 设置已点击菜单返回数据
                    let routeItem = router.match(v.path)
                    if (routeItem) {
                        routeItem.meta.permission = v.permission ? v.permission : []
                        routeItem.meta.name = v.name
                    }
                })
                resolve()
            })
        }
    })
}

NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  //  mode: 'history',
  // base: process.env.BASE_URL,
    routes: staticRoute
})
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    if (to.path.indexOf("/error") >= 0) {
        // 防止因重定向到error页面造成beforeEach死循环
        next()
    } else {
        initRoute(router).then(() => {
          let isPermission = false
            permissionList.forEach((v) => {
            //   console.log(v.path, to.path)
                // 判断跳转的页面是否在权限列表中
                if (v.path == to.path) {
                    isPermission = true
                }
            })
            // 没有权限时跳转到401页面
            if (!isPermission) {
                if (whiteList.indexOf(to.path) >= 0) {
                    next()
                } else {
                    Message.error('请求错误，请确认访问地址是否正确！')
                    next({ path: "/error/404", replace: true })
                }
            } else {
                next()
            }
        })
    }
})

// 结束Progress
router.afterEach(() => {
    NProgress.done(); 
})
//全局混入组件内路由守卫
// Vue.mixin({
//     //在当前路由改变，但是该组件被复用时调用
//     beforeRouteUpdate:function(to, from, next){
//         //读取已打开标签数据列表
//         let openedPageList = store.state.tagNav.openedPageList;
//         //判断已打开标签数据列表中是否存在当前访问路由
//         if(openedPageList.some(v => v.path === to.path)){
//             //过滤标签数据列表中当前访问的路由标签缓存数据
//             let toPageNav = openedPageList.filter(v => { if(v.path === to.path) return true });
//             //判断标签存储数据全路径是否发生变化
//             if(toPageNav.length >0 && toPageNav[0].fullpath !== to.fullPath){
//                 //循环缓存的keepAlive页面数据
//                 this.$children.forEach(v=>{
//                     if(v.$vnode.tag){
//                         let tagList = v.$vnode.tag.split('-');
//                         let tag     = tagList[tagList.length-1];
//                         //判断缓存的keepAlive列表中等于当前访问标签页面的
//                         if(toPageNav[0].name === tag){
//                             //判断此页面是否为keepAlive保持状态
//                             if (v.$vnode && v.$vnode.data.keepAlive){
//                                 //判断缓存数据值存在的有效性
//                                 if (v.$vnode.parent && v.$vnode.parent.componentInstance && v.$vnode.parent.componentInstance.cache) {
//                                     if (v.$vnode.componentOptions) {
//                                         //删除的keepAlive缓存的Key值
//                                         var key   = v.$vnode.key == null
//                                                     ? v.$vnode.componentOptions.Ctor.cid + (v.$vnode.componentOptions.tag ? `::${v.$vnode.componentOptions.tag}` : '')
//                                                     : v.$vnode.key;
//                                         //keepAlive的缓存列表
//                                         var cache = v.$vnode.parent.componentInstance.cache;
//                                         //keepAlive的键值列表
//                                         var keys  = v.$vnode.parent.componentInstance.keys;
//                                         //强制从keepAlive缓存中删除
//                                         if (cache[key]) {
//                                             if (keys.length) {
//                                                 var index = keys.indexOf(key);
//                                                 if (index > -1) {
//                                                     keys.splice(index, 1);
//                                                 }
//                                             }
//                                             delete cache[key];
//                                         }
//                                     }
//                                 }
//                             }
//                             return;
//                         }
//                     }
//                 });
//             }
//         }
//         next();
//     },
// });
export default router
