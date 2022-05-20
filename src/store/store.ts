// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'
import ApiClient from '../ApiClient'
import Cookies from 'js-cookie'

// 为 store state 声明类型
export interface State {
  login: boolean,
  userName: string,
  userAvatar: string,
  userEmail: string,
  sheetsList: any,
  sheetsListDatas: any,
  sheetValue: any
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    login: false,
    userName: '',
    userAvatar: '',
    userEmail: '',
    sheetsList: [],
    sheetsListDatas: {},
    sheetValue: []
  },
  getters: {
    getLogin(state: any) {
      return state.login
    },
    getUserName(state: any) {
      return state.userName
    },
    getUserAvatar(state: any) {
      return state.userAvatar
    },
    getUserEmail(state: any) {
      return state.userEmail
    },
    getSheetList(state: any) {
      return state.sheetsList
    },
    getSheetId (state: any) {
      return state.sheetLastId
    },
    getSheetListDatas (state: any) {
      return state.sheetsListDatas
    },
    getSheetValue (state: any) {
      return state.sheetValue
    },
  },
  mutations: {
    SET_LOGIN(state: any, payload: any) {
      state.login = payload
    },
    SET_USERNAME(state: any, payload: any) {
      state.userName = payload
    },
    SET_USERAVATAR(state: any, payload: any) {
      state.userAvatar = payload
    },
    SET_USEREMAIL(state: any, payload: any) {
      state.userEmail = payload
    },
    SET_SHEETLIST(state: any, payload: any) {
      state.sheetsList = payload
    },
    SET_SHEETID(state: any, payload: any) {
      const IDList = payload.map((sheet: any) => {
        return { 
          title: sheet.properties.title,
          index: sheet.properties.index,
          sheetId: sheet.properties.sheetId,
        }
      })
      state.sheetsListDatas = IDList;
    },
    SET_SHEETVALUE(state: any, payload: any) {
      state.sheetValue = payload
    }
  },
  actions: {
    googleAuthGetCode ({ commit }: any) {
      ApiClient.googleAuthGetCode()
        .then((res: any) => { 
          // 跳轉驗證頁面
          location.href = res.data.url;
        })
        .catch((err: any) => console.log(err));
    },
    googleAuthGetUserInfo({ commit }: any, code: any) {
      ApiClient.googleAuthGetUserInfo(code)
        .then((res: any) => { 
          commit('SET_LOGIN', true);
          commit('SET_USERNAME', res.data.name);
          commit('SET_USERAVATAR', res.data.picture);
          commit('SET_USEREMAIL', res.data.email);
          Cookies.set('userName', escape(res.data.name) , { expires: 1/24 });
          Cookies.set('userEmail', res.data.email, { expires: 1/24 });
          Cookies.set('userAvatar', res.data.picture, { expires: 1/24 });
          window.history.replaceState(null, null, window.location.pathname);
        })
        .catch((err: any) => console.log(err));
    },
    googleAuthSetCookie({ commit }: any) {
      if(Cookies.get('userName') !== undefined) {
        commit('SET_LOGIN', true);
        commit('SET_USERNAME', unescape(Cookies.get('userName')));
        commit('SET_USERAVATAR', Cookies.get('userAvatar'));
        commit('SET_USEREMAIL', Cookies.get('userEmail'));
      }
    },
    googleAuthRemoveCookie({ commit }: any) {
      if(Cookies.get('userName') !== undefined) {
        commit('SET_LOGIN', false);
        commit('SET_USERNAME', Cookies.remove('userName'));
        commit('SET_USERAVATAR', Cookies.remove('userAvatar'));
        commit('SET_USEREMAIL', Cookies.remove('userEmail'));
      }
    },
    /**
     * 讀取表單列表
     */
    loadSheetList ({ commit }: any) {
      return new Promise((resolve, reject) => {
        ApiClient.getSheet()
          .then((res: any) => {
            commit('SET_SHEETLIST', res.data.sheets)
            commit('SET_SHEETID', res.data.sheets)
            resolve(res)
          })
          .catch((err: any) => {
            console.error(err)
            reject(err)
          })
      })
    },
    /**
     * 讀取表單內容 需要 sheetTitle 參數
     */
    loadSheetValue ({ commit }: any, payload: any) {
      return new Promise((resolve, reject) => {
        ApiClient.getSheetValue(payload)
        .then((res: any) => {
          console.log('讀取表單內容 成功!', res.data.values)
          commit('SET_SHEETVALUE', res.data.values.splice(0, 1))
          resolve(res.data.values);
        })
        .catch((err: any) => {
          console.error(err)
        })
      })
    },
    /**
     * 1.新增工作表(action = addSheet) 提供sheetid 月份title
     * 2.合併儲存格(action = mergeCells) 提供合併位置
     */
    async doSheetAction ({ commit, dispatch }: any, payload: any) {
      console.log('doSheetAction', payload)
      // 新增工作表
      await ApiClient.doSheet({
        datas: payload,
        action: 'addSheet'
      })
        .then((res: any)=>console.log(res))
        .catch((err: any) => {
          console.error(err)
        })
      // 制定字體
      await ApiClient.doSheet({
        datas: payload,
        action: 'repeatCell'
      })
        .then((res: any)=>console.log(res))
        .catch((err: any) => {
          console.error(err)
        })
      // // 重新取得目前列表
      // await dispatch('loadSheetList')
      // await dispatch('loadSheetValue', payload.updateMonth)
    },
    initSheetValue ({ commit, dispatch }: any, payload: any) {
      console.log('initSheetValue', payload)
      return new Promise((resolve, reject) => {
        ApiClient.createSheetValue(payload)
          .then((res: any) => {
            console.log('表單資料建立成功')
            // 重整表單列表
            dispatch('loadSheetList')
          })
          .catch((err: any) => {
            console.error(err)
            reject(err)
          })
      })
    },
    insertSheetValue ({ commit }: any, payload: any) {
      return new Promise((resolve, reject) => {
        ApiClient.appendSheetValue(payload)
          .then((res: any) => {
            resolve(res)
            // commit('SET_SHEETLIST', res.data.sheets)
          })
          .catch((err: any) => {
            console.error(err)
            reject(err)
          })
      })
    }
  },
})