<script setup>
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import { ref, onUnmounted, onMounted } from 'vue';
import Details from './detailscourse/Details.vue';
import Modul from './detailscourse/Modul.vue';
import Student from './detailscourse/Student.vue';

const isSidebarVisible = ref(true);
const activeTab = ref('details');

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});

const setActiveTab = (tab) => {
    activeTab.value = tab;
};

</script>

<template>
    <div class="navbg-sa">
        <!-- NAVBAR START -->
        <NavbarSA />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="card rounded-2 p-4 border-0">
                            <h5 class="fw-light fs-16">Digitefa/Course Management</h5>
                            <h4 class="fs-24">Course Management</h4>
                            <div class="card p-3 bordersa mt-2 min-height-68">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex justify-content-start mt-11 gap-4">
                                        <label class="fs-16 pointer" :class="{ 'active-tab': activeTab === 'details' }"
                                            @click="setActiveTab('details')">
                                            Details
                                        </label>
                                        <label class="fs-16 pointer" :class="{ 'active-tab': activeTab === 'modul' }"
                                            @click="setActiveTab('modul')">
                                            Modul
                                        </label>
                                        <label class="fs-16 pointer" :class="{ 'active-tab': activeTab === 'student' }"
                                            @click="setActiveTab('student')">
                                            Student
                                        </label>
                                    </div>
                                    <ButtonBiru class="h-40 px-5" v-if="activeTab === 'details'">Edit</ButtonBiru>
                                    
                                </div>
                                <hr />

                                <div v-show="activeTab === 'details'">
                                    <Details />
                                </div>
                                <div v-show="activeTab === 'modul'">
                                    <Modul />
                                </div>
                                <div v-show="activeTab === 'student'">
                                    <Student />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>