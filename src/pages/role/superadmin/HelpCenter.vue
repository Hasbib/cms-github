<script setup>
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';

import { ref, onUnmounted, onMounted } from 'vue';

const isSidebarVisible = ref(true);

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
})

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
                    <h1> Hlaman Help Center</h1>
                </div>
            </div>
        </div>
    </div>
</template>