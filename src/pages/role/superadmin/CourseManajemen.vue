<template>
    <div v-if="currentPage === 'manajemen'">
        <IndexCS />
    </div>

    <div v-if="currentPage === 'add'">
        <AddCourse />
    </div>

    <div v-if="currentPage === 'detail'">
        <DetailCourse />
    </div>

    <div v-if="currentPage === 'addVideo'">
        <AddVideo />
    </div>

    <div v-if="currentPage === 'addEssay'">
        <AddEssay />
    </div>

    <div v-if="currentPage === 'addAssement'">
        <AddAssement />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import IndexCS from './cs/IndexCS.vue';
import AddCourse from '@/pages/role/superadmin/cs/AddCourse.vue';
import DetailCourse from '@/pages/role/superadmin/cs/DetailCourse.vue';
import AddVideo from '../superadmin/cs/detailcourse/modulcourse/AddVideo.vue';
import AddEssay from '../superadmin/cs/detailcourse/modulcourse/AddEssay.vue';
import AddAssement from '../superadmin/cs/detailcourse/modulcourse/AddAssement.vue';

const currentPage = ref('manajemen');

provide('currentPage', currentPage);
</script>
