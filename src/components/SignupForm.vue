<script setup lang="ts">
import { computed, ref } from 'vue';
import FormInput from './FormInput.vue';
import {validate, required, length} from '../validate';

const userName = ref<string>('');

const usernameStatus = computed(() => {
  return validate(userName.value, [required, length({min: 5, max: 10})]);
});

const password = ref<string>('');

const passwordStatus = computed(() => {
  return validate(password.value, [required, length({min: 10, max: 40})]);
});
</script>

<template>
  <form class="form">
      <FormInput name="Username" v-model="userName" :status="usernameStatus"/>
      <FormInput name="Password" v-model="password" :status="passwordStatus"/>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  background: blue;
  margin: 30px;
  padding-top: 50px;
}

</style>
