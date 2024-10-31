<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const role = ref('teacher');

const router = useRouter();

const loginTeacher = async () => {
    try {
        const response = await axios.post('/login', {
            email: email.value,
            password: password.value,
            role: role.value
        });

        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            router.push('/dashboard-teacher');
        }
    } catch (error) {
        console.error('Error during login:', error.response.data);
    }
};

</script>

<template>
    <form @submit.prevent="loginTeacher">
        <div class="my-2">
            <label for="">email</label>
            <input type="email" v-model="email">
        </div>
        <div class="my-2">
            <label for="">Password</label>
            <input type="password" v-model="password">
        </div>
        <button class="btn btn-primary">Login</button>
    </form>
</template>