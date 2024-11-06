<template>
    <div v-if="currentPage === 'management'">
        <IndexCS />
    </div>

    <div v-if="currentPage === 'add'">
        <AddCourse />
    </div>

    <div v-if="currentPage === 'details'">
        <DetailsCourse />
    </div>

    <div v-if="currentPage === 'addVideo'">
        <AddVideo />
    </div>

    <div v-if="currentPage === 'addEssay'">
        <AddEssay />
    </div>

    <div v-if="currentPage === 'addAssessment'">
        <AddAssessment />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import IndexCS from './cs/IndexCS.vue';
import AddCourse from '@/pages/role/superadmin/cs/AddCourse.vue';
import DetailsCourse from '@/pages/role/superadmin/cs/DetailsCourse.vue';
import AddVideo from '../superadmin/cs/detailscourse/modulcourse/AddVideo.vue';
import AddEssay from '../superadmin/cs/detailscourse/modulcourse/AddEssay.vue';
import AddAssessment from '../superadmin/cs/detailscourse/modulcourse/AddAssessment.vue';

const currentPage = ref('management');

provide('currentPage', currentPage);
</script>
