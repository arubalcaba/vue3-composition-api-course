<script setup lang="ts">
import { useModal } from '../composables/modal';
import SignupForm from './SignupForm.vue';

const modal = useModal();


</script>
<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">
                <button class="button" @click="modal.showModal()">Sign Up</button>
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
            </div>
        </div>
    </div>

    <teleport to='#modal'>
        <SignupForm/>
    </teleport>
</template>