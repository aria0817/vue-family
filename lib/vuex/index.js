// vuex  集中式状态管理应用的所有组件的状态  => 集中管理状态，
// 并以相应的规则保证可预测的方式发生变化。  => 只能通过commit 来提交这次改变
// vuex中的数据都是响应式的，当数据发生变化的时候，组件需要重新render。
/**
 * 实现一个store类：实现响应式state
 */
// $store
let Vue;
class Store {
    constructor(options) {
        // 保存选项 
        // 暴露state属性
        this.$options = options;
        this._mutations = options.mutations;
        this._actions = options.actions;
        // 只能用commit来改变状态

        //  用户可以随意改 Vue.util.defineReactive(this,'state',this.$options.state)
        // 拿到的是this.state = new Vue({
        //     date(){
        //         return options.state
        //     }
        // })

        //  _vm希望用户不要访问
        this._vm = new Vue({
            data() {
                return {
                    // $$ 避免vue对该属性做代码
                    $$state: options.state
                }
            }
        });
        // 绑定上下文
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm.data.$$state
    }

    set state(state) {
        this._vm.data.$$state = state
    }

    // $sotre.commit(type,payload)
    commit(type, payload) {
        // 拿到了用户定义的函数
        const entry = this._mutations[type];
        if (!entry) {
            console.error('')
            return
        }
        //执行修改
        entry(this.state, payload)
    }

    // 执行actions
    dispatch(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
            console.error('')
            return
        }
        //执行修改
        entry(this, payload)
    }



}

function install(_Vue) {
    Vue = _Vue
    //注册一下$store
    Vue.mixin({
        beforeCreate() {
            // this 组件实例 
            // 在app.vue里面可以拿到store 只有根实例才能拿到
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


export default {
    Store,
    install
}