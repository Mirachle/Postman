import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import createPersistedState from 'vuex-persistedstate';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    list: [],
  },

  getters: {
    getList(state){
      return state.list;
    }
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
    onDelete(state, index){
      state.list.splice(index, 1)
    }
  },

  actions: {
    onDelete(context, index){
      context.commit('onDelete', index);
    },
    postPutPatchPush(context, [selected, url, textArea]){
      axios[selected](url, JSON.parse(textArea))
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

    getDeletePush(context, [selected, url]){
      axios[selected](url)
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

    originError(){
      axios.interceptors.response.use((response) => response, (error) => {
        if (typeof error.response === 'undefined') {
          var response = error;
          var statusCode = '400';
          context.commit('listPush', [selected, url, response, statusCode])
        }
        return Promise.reject(error)
      })
    }
  },

  plugins: [createPersistedState()],
})
