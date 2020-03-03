import {LOGIN,LOGOUT} from "./mutation-types";
export default {
    [LOGIN](state,{userId,userName,identity}){
        state.loginState = true
        state.userId = userId
        state.userName = userName
        state.identity = identity
    },
    [LOGOUT] (state) {
        state.loginState = false
        state.userId = null
        state.userName = null
        state.identity = null
    }
}