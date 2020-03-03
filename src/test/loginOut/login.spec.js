import { mount,createLocalVue   } from 'vue-test-utils'
import login from '../../views/login/index.vue'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
describe('login.vue',()=>{
    before(function(){
        var mock = new MockAdapter(axios);
        mock.onPost('/login',{params:{ userName: 'zhang',
                password:'123456'}}).reply(200,{id:1,username:'zhang',admin: 0})
    })
    it('测试获取元素内容',()=>{
        const  wrapper = mount(login)
        const buttonOfLogin = wrapper.find('.logIN');
        wrapper.setData({
            userName: 'zhang',
            password:'123456'
        })
        console.log(wrapper.vm.userName);
        expect(wrapper.vm.userName).to.equal('zhang');
         expect(wrapper.vm.password).to.equal('123456');
        buttonOfLogin.trigger('click');
        console.log(wrapper.vm.$router)
    })


})