import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import createPersistedState from 'vuex-persistedstate';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    list: [],
    sendList: [],
    environmentList: [],
  },

  getters: {
    getList(state){
      return state.list;
    },
    getSendList(state){
      return state.sendList;
    },
    getEnvironmentList(state){
      return state.environmentList;
    },
  },

  mutations: {
    listPush(state, [selected, url, response, statusCode]){
      state.list.push({
        type: selected,
        urlText: url,
        result: response,
        value: statusCode,
      })
    },
    sendListPush(state, [name,selected, url, headerList, body]){
      state.sendList.push({
        name: name,
        type: selected,
        urlText: url,
        bodyValue: body,
        headerList: headerList
      })
    },
    environmentListPush(state, [key, value]){
      state.environmentList.push({
        key: key,
        value: value
      })
    },
    onDelete(state, index){
      state.list.splice(index, 1)
    },
    sendListDelete(state, index){
      state.sendList.splice(index, 1)
    },
    sendListSaveAs(state, [name,selected, url, index, headerList, body]){
      state.sendList[index].name = name,
      state.sendList[index].type = selected,
      state.sendList[index].urlText = url,
      state.sendList[index].bodyValue = body,
      state.sendList[index].headerList = headerList
    },

    environmentListSave(state, list) {
      state.environmentList = list;
    },
    environmentListDelete(state, index){
      state.environmentList.splice(index, 1)
    },
    clearList(state){
      state.list = []
    }
  },

  actions: {
    environmentListPush(context, [key, value]){
      context.commit('environmentListPush',[key, value])
    },
    environmentListDelete(context, index){
      context.commit('environmentListDelete', index);
    },
    onDelete(context, index){
      context.commit('onDelete', index);
    },
    sendListDelete(context, index){
      context.commit('sendListDelete', index);
    },
    postPutPatchSave(context, [name,selected,url, headerList, textArea]){
      context.commit('sendListPush', [name,selected,url, headerList, textArea])
    },
    getDeleteSave(context,[name,selected,url, headerList]){
      context.commit('sendListPush',[name,selected,url, headerList])
    },
    postPutPatchSaveAs(context, [name,selected,url,index, headerList, textArea]){
      context.commit('sendListSaveAs', [name,selected,url,index, headerList, textArea])
    },
    clearList(context){
      context.commit('clearList');
    },



    withTextAreaPush(context, [selected, url, textArea, list]){
      var o = new Object();
      list.forEach(item => {o[item.key] = item.value})

      if ((list[0].key != "") && (list[0].key != " ") && (list[0].key != undefined)){
        return axios[selected](url, JSON.parse(textArea), {headers: o})
      }
      return axios[selected](url, JSON.parse(textArea))
    },
    postPutPatchPush(context, [selected, url, textArea, list]){
      context.dispatch('withTextAreaPush',[selected, url, textArea, list])
      .then(r => {
        if (r.data.result){
          var response = JSON.stringify(r.data.result).replace(/"/g, " ");
        }
        else {
          var response = JSON.stringify(r.data).replace(/"/g, " ");
        }
        var statusCode = JSON.stringify(r.status);
        context.commit('listPush', [selected, url, response, statusCode])
      })
      .catch(e => {
        context.dispatch('handleError',[e, selected, url])
      });
    },


    withoutTextAreaPush(context, [selected, url, list]){
      var o = new Object();
      list.forEach(item => {o[item.key] = item.value})

      if ((list[0].key != "") && (list[0].key != " ") && (list[0].key != undefined)){
        return axios[selected](url, {headers: o})
      }
      return axios[selected](url)
    },
    getDeletePush(context, [selected, url, list]){
      context.dispatch('withoutTextAreaPush',[selected, url, list])
        .then(r => {
          var response = JSON.stringify(r.data).replace(/"/g, " ");
          var statusCode = JSON.stringify(r.status);
          context.commit('listPush', [selected, url, response, statusCode])
        })
        .catch(e => context.dispatch('handleError',[e, selected, url]));
    },


    handleError(context, [e, selected, url]){
      try{
        var response = JSON.stringify(e.response).replace(/"/g, " ");
        var statusCode = JSON.stringify(e.response.status);
        context.commit('listPush', [selected, url, response, statusCode])
      }
      catch(e){
        if (e.response) {
          var response = JSON.stringify(e.response).replace(/"/g, " ");
          var statusCode = JSON.stringify(e.response.status);
          context.commit('listPush', [selected, url, response, statusCode])
        } else {
        context.commit('listPush', [selected, url, e.message, '0'])
        }
      }
    },

    originError(context){
      axios.interceptors.response.use((response) => response, (error) => {
        if (typeof error.response === 'undefined') {
          var response = error;
          var statusCode = '400';
          context.commit('listPush', [selected, url, response, statusCode])
        }
        return Promise.reject(error)
      })
    },

  },

  plugins: [createPersistedState()],
})
