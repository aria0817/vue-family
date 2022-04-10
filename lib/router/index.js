// 因为是作为vue插件使用，所以一定要export一个install方法
// 需要实现一个 Vue.prototype.$router = router  let router = new VueRouter
let Vue;
//实现vueRouter类 ：处理路由选项 监控url变化，响应这个变化
class VueRouter {
    constructor(options) {
        this.$options = options;
        // 可以访问到route配置表
        //1. 保存路由选项
        console.log(Vue);
        // 当hashchangge的时候，组件没法跟更新，所以需要一个能出发render函数的响应式数据
        // Vue.util.defineReactive 可以d定义一个对象的响应属性
        // Vue.set 不行 因为第一个参数的必须是响应式数据
        Vue.util.defineReactive(this,'current', window.location.hash.slice(1) || '/')
        window.addEventListener('hashchange', function () {
            // 获取当前响应的url
            // current没有初始值，也可能是空的
            
            this.current = window.location.hash.slice(1);
        })
    }
}


// 实现install方法： $router的注册，以及两个全局组建的注册
// 参数1: vue构造函数，后续会使用到。如果直接引入vue，会把vue打包进项目中
VueRouter.install = function (_Vue) {
    // 传入构造函数，对Vue后续扩展，比如加上$router
    Vue = _Vue

    // 访问vue实例和组件实例的时候，可以用混入
    // 因为要延迟执行，延迟到vue实例和router实例都创建完毕
    Vue.mixin({
        beforeCreate() {
            // this 组件实例 
            // 在app.vue里面可以拿到router 只有根实例才能拿到
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    // 注册两个组件
    // 就是两个
    Vue.component('router-link', {
        props: {
            to: String
        },
        // 这里的h函数就生成虚拟DOM 
        render(h) {
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, [
                // this.$slots.default 匿名插槽的所有内容，就可以拿到
                this.$slots.default
            ])
        }
    })

    // 根据url渲染出不同的组件 
    // 监听hash时候current发生了变化，但是没法让组件重新渲染。
    // 解决方法：在vue中，如果render函数中有响应式数据，就会重新render函数。
    Vue.component('router-view', {

        // 1.拿到url的hash部分值
        // 2.根据hash部分从路由表中获取当前路由
        // this.current 
        render(h) {
            // 获取当前组件 
            let component = null;
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current);
            if (route) {
                component = route.component
            }
            console.log(component);

            return h(component)
        }
    })
}

export default VueRouter;