<script setup lang="ts">
import { computed, ref } from 'vue';
import FormInput from './FormInput.vue';
import { NewUser } from '../users'
import {validate, required, length} from '../validate';

const userName = ref<string>('');

const usernameStatus = computed(() => {
  return validate(userName.value, [required, length({min: 5, max: 10})]);
});

const password = ref<string>('');

const passwordStatus = computed(() => {
  return validate(password.value, [required, length({min: 10, max: 40})]);
});

const isValid = computed(() => {
  return (usernameStatus.value.valid && passwordStatus.value.valid)
});

function handleSubmit() {
  console.log('Form submitted')
  if (usernameStatus.value.valid && passwordStatus.value.valid) {
    const newUser: NewUser = {
      username: userName.value,
      password: password.value
    }
    console.log(newUser)
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
      <FormInput name="Username" v-model="userName" :status="usernameStatus"/>
      <FormInput name="Password" v-model="password" :status="passwordStatus"/>

      <button class="button" :disabled="!isValid">Submit</button>
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
