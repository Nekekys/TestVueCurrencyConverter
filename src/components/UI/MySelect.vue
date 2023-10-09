<template>
    <select :value="modelValue" @input="updateInput" name="language" class="input">
        <option disabled value="">Выберите валюту</option>
        <option v-for="currency in $props.currencies" :key="currency" :value="currency" selected="selected">{{currency}}</option>
    </select>
</template>

<script>
    export default {
        name: "my-input",
        props: {
            modelValue: [String, Number],
            currencies: Array,
            placeholder: String
        },
        methods: {
            updateInput(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .input {
        background-color: transparent;

        padding: 3% 6%;
        width: 100%;
        border: none;

        font-family: 'Fira Sans', sans-serif;
        font-weight: 700;
        font-size: 20px;
        box-shadow: 0px 7px 12px 0px #64646F33;
        color: #656EC2;

        outline: none;
        margin-bottom: 20px;
    }
    .input::placeholder  {
        color: #656EC2;
    }
</style>
