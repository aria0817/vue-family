import Vue from 'vue'
import VueRouter from '../lib/router/index'

import testA from '../src/components/a.vue'
import testB from '../src/components/b.vue'


// 插件的方式使用 
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/',
            component: testA
        },
        {
            path: '/b',
            component: testB
        }
    ]
})

export default router