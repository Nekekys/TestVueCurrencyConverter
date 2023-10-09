<template>
    <div  class="container">
      <h1>Конвертер валют</h1>
      <div class="input-container">
        <my-input v-model.trim="sum" placeholder="Введите число" type="number" />
      </div>
      <preloader class="preloader" v-if="$store.state.isLoading" />
      <div v-else class="input-container">
        <my-select v-model="currency" :currencies="$store.getters.currenciesList" />
      </div>
      <div class="input-container">
        <my-input :value="getRubleSum" readonly placeholder="RUB" />
      </div>
      <div v-if="$store.state.isError" class="error">
        Ошибка, пожалуйста перезагрузите страницу
      </div>
    </div>
</template>

<script>
  import MyInput from "./components/UI/MyInput.vue";
  import MySelect from "./components/UI/MySelect.vue";
  import Preloader from "./components/UI/Preloader.vue";
  export default {
    components: {Preloader, MyInput, MySelect},
    data() {
      return {
        sum: '',
        currency: ''
      }
    },
    computed: {
      getRubleSum: function () {
        if(this.currency.length > 0) return `${this.sum * this.$store.state.currencies[this.currency]}₽`
        else return `${this.sum}₽`
      },
      getDefaultCurrency: function () {
        return this.$store.state.defaultCurrency
      },
    },
    watch: {
      currency: function (val) {
        localStorage.setItem('currency', val);
      },
      getDefaultCurrency: function (val) {
        this.currency = val
      },
    },
    mounted() {
      this.$store.dispatch('getCurrencies')
    }
  }
</script>

<style>
  .container{
    margin: 0 auto;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 40px 20px;
  }
  .input-container:first-child{
    margin-top: 120px;
  }
  .input-container {
    width: 100%;
    max-width: 626px;
    margin-bottom: 20px;
  }
  .preloader{
    height: 100px;
  }
  .error{
    color: red;
  }
</style>
