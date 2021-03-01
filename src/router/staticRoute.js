const Layout = () => import('../views/layout')

const staticRoute = [
    {
            path: '/',
            redirect: '/login'
    },
    {
        path: '/error',
        component: () => import('../components/error'),
        children: [{
            path: '401',
            component:() => import('../components/error/401'),
        },{
            path: '403',
            component:() => import('../components/error/403'),
        },{
            path: '404',
            component:() => import('../components/error/404'),
        },{
            path: '500',
            component:() => import('../components/error/500'),
        }]
    },
     {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/login/index.vue'],resolve)
    }, {
        path: "/home",
        component: Layout,
        children: [{
            path: '',
             component:() => import('../views/Home'),
        }]
    }, {
         path: "/test",
        component: Layout,
        children: [{
            path: 'list',
            component: () => import('../views/test/list'),
            meta: {
                auth: true,
                permission:true,
                name: 'list'
            }
        },{
            path: 'list2',
             component:() => import('../views/test/list2'),
        },{
            path: 'list3',
             component:() => import('../views/test/list3'),
        },{
            path: 'list4',
             component:() => import('../views/test/list4'),
        }]
    }
]
export default staticRoute