import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: ()=>({
    currencies: {},
    isLoading: false,
    isError: false,
    defaultCurrency: ''
  }),
  getters: {
    currenciesList(state){
      return Object.keys(state.currencies)
    }
  },
  mutations: {
    setCurrencies(state, currencies){
      state.currencies = currencies
    },
    startLoading(state){
      state.isLoading = true
    },
    endLoading(state){
      state.isLoading = false
    },
    setError(state){
      state.isError = false
    },
    setDefaultCurrency(state, payload){
      state.defaultCurrency = payload
    },
  },
  actions: {
    getCurrencies (context) {
      context.commit('startLoading')
      axios({
        method: 'get',
        url: `https://www.cbr-xml-daily.ru/latest.js`,
      }).then(res => {
        context.commit('setCurrencies', res.data.rates)
      }).catch(e => {
        console.log(e)
        context.commit('setError')
      }).finally(()=>{
        if(localStorage.getItem('currency')){
          context.commit('setDefaultCurrency', localStorage.getItem('currency'))
        }
        context.commit('endLoading')
      })
    }
  }
})
