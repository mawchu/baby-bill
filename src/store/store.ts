// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'
import ApiClient from '../ApiClient'

// 为 store state 声明类型
export interface State {
  sheetsList: any,
  sheetsListDatas: any
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    sheetsList: [],
    sheetsListDatas: {}
  },
  getters: {
    getSheetList(state: any) {
      return state.sheetsList
    },
    getSheetId (state: any) {
      return state.sheetLastId
    },
    getSheetListDatas (state: any) {
      return state.sheetsListDatas
    },
  },
  mutations: {
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
    }
  },
  actions: {
    loadSheetList ({ commit }: any) {
      return new Promise((resolve, reject) => {
        ApiClient.getSheet()
          .then((res: any) => {
            commit('SET_SHEETLIST', res.data.sheets)
            commit('SET_SHEETID', res.data.sheets)
            console.log(res)
          })
      })
    },
    loadSheetValue ({ commit }: any, payload: any) {
      return new Promise((resolve, reject) => {
        ApiClient.getSheetValue(payload)
          .then((res: any) => {
            commit('SET_SHEETLIST', res.data.sheets)
            commit('SET_SHEETID', res.data.sheets)
            console.log(res)
          })
      })
    },
    doSheetAction ({ commit }: any, payload: any) {
      return new Promise((resolve, reject) => {
        ApiClient.doSheet(payload)
          .then((res: any) => {
            console.log(res)
            // commit('SET_SHEETLIST', res.data.sheets)
          })
          .catch((err: any) => {
            console.error(err)
          })
      })
    },
    initSheetValue ({ commit }: any, payload: any) {
      return new Promise((resolve, reject) => {
        ApiClient.createSheetValue(payload)
          .then((res: any) => {
            console.log(res)
            // commit('SET_SHEETLIST', res.data.sheets)
          })
          .catch((err: any) => {
            console.error(err)
          })
      })
    }
  },
})