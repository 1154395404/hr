import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    setToken(token);
  },
  REMOVE_TOKEN(state) {
    state.token = null;
    removeToken();
  }
}

const actions = {
  // user login
  async login({commit}, userInfo) {

    // ! 结构出的data 就是token
    // try {
    // ! ! ! 这里接try catch 会导致 下一层调用它的 函数 try不到和 catch不到
    let data = await login(userInfo);
    commit('SET_TOKEN', data)
    /* } catch (e) {
       // return Promise.reject(e);
     }
 */
    // console.log(data);
    //

  },

  // get user info
  getInfo({commit, state}) {

  },

  // user logout
  logout({commit, state}) {


  },

  // remove token
  resetToken({commit}) {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

