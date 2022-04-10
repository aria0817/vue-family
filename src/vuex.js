import Vue from 'vue';
import Vuex from '../lib/vuex/index'
//

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        counter: 0
    },
    mutations: {
        add(state) {
            state.counter++
        }
    },
    actions: {
        add(ctx){
            ctx.commit('add')
        }
    },
    mudules: {}
})