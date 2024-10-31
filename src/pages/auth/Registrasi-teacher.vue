<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmpassword = ref('');
const role = ref('teacher');
const router = useRouter();

const submitForm = async () => {
    try {
        await axios.post('/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmpassword.value,
            role: role.value,
        });
        router.push('/verification-email');
    } catch (error) {
        console.error('Error during registration:', error.response.data);
    }
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="my-2">
            <label>Name</label>
            <input type="text" v-model="name">
        </div>
        <div class="my-2">
            <label>Email</label>
            <input type="email" v-model="email">
        </div>
        <div class="my-2">
            <label for="">Password</label>
            <input type="password" v-model="password">
        </div>
        <div class="my-2">
            <label for="">Confirm Password</label>
            <input type="password" v-model="confirmpassword">
        </div>
        <button class="btn btn-success">Save</button>
    </form>
</template>