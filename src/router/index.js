import Vue from 'vue'
import Router from 'vue-router'
import  Index from '../views/index/index.vue'
import Login from '../views/login/index.vue'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path: "/",
            redirect: '/login'
        },
        {
            path: "/login",
            name: 'login',
            component: Login
        },
        {
            path: "/index/",
            name: "index",
            component: Index,
            meta:{title:'meetHere'},
            children:[
                {
                    path: 'homePage/',
                    name:'homePage',
                    component: () => import( '../views/homePage'),
                    // children:[
                    //     {
                    //         path: 'stadiumDetail/:id',
                    //         name:'stadiumDetail',
                    //         component: () => import( '../components/stadiumDetail.vue'),
                    //     }
                    // ]
                },
                {
                    path: 'stadiumDetail/:id',
                    name:'stadiumDetail',
                    component: () => import( '../components/siteDetail.vue'),
                },
                {
                    path: 'siteDetail/:id',
                    name:'siteDetail',
                    component: () => import( '../components/stadiumDetail.vue'),
                },
                {
                    path: 'newsDetail/:id',
                    name:'newsDetail',
                    component: () => import( '../components/newsDetail.vue'),
                },
                {
                    path: 'appointment',
                    name:'appointment',
                    component: () => import( '../views/appointment')
                },
                {
                    path:'seeNews',
                    name:'seeNews',
                    component: ()=> import('../views/seeNews')
                },

                {
                    path: 'info',
                    name:'info',
                    component: () => import('../views/info/index')
                },

            ]
        },
        {
            path: "/AdminIndex/",
            name: "AdminIndex",
            meta:{title:'meetHere'},
            component: () => import( '../views/Aindex'),
            children:[
                {
                    path: "userManagement",
                    name: "userManagement",
                    component: () => import( '../views/userManagement'),
                },

                {
                    path: "stadiumManagement",
                    name: "stadiumManagement",
                    component: () => import( '../views/stadiumManagement'),
                },
                {
                    path: "checkOrder",
                    name: "checkOrder",
                    component: () => import( '../views/checkOrder'),
                },
                {
                    path: "ordersCount",
                    name: "ordersCount",
                    component: () => import( '../views/ordersCount'),
                },
                {
                    path: "checkNews",
                    name: "checkNews",
                    component: () => import( '../views/checkNews'),
                },
                {
                    path: "checkReply",
                    name: "checkReply",
                    component: () => import( '../views/checkReply'),
                }


            ]
        },
        {
            path: '*',
            name: 'not found',
            // for the unknown page
            redirect: '/'
        }

    ]


})