// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'
import ApiClient from '../ApiClient'

// 为 store state 声明类型
export interface State {
  sheetsList: any,
  sheetsListDatas: any,
  sheetValue: any
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    sheetsList: [],
    sheetsListDatas: {},
    sheetValue: []
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
    getSheetValue (state: any) {
      return state.sheetValue
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
    },
    SET_SHEETVALUE(state: any, payload: any) {
      state.sheetValue = payload
    }
  },
  actions: {
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
      ApiClient.getSheetValue(payload)
        .then((res: any) => {
          console.log('讀取表單內容 成功!', res.data)
          // commit('SET_SHEETVALUE', res.data)
        })
        .catch((err: any) => {
          console.error(err)
        })
    },
    /**
     * 1.新增工作表(action = addSheet) 提供sheetid 月份title
     * 2.合併儲存格(action = mergeCells) 提供合併位置
     */
    async doSheetAction ({ commit, dispatch }: any, payload: any) {
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
      // 重新取得目前列表
      await dispatch('loadSheetList')
      await dispatch('loadSheetValue', payload.updateMonth)
    },
    initSheetValue ({ commit, dispatch }: any, payload: any) {
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