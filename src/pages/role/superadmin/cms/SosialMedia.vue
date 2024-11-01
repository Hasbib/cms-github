<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';


const router = useRouter()
const isToastVisible = ref(false);
const toastMessage = ref('');
const isSidebarVisible = ref(true);

const form = ref({
    phone_number: '',
    tiktok: '',
    instagram: '',
    x: '',
    youtube: '',
    linkedin: '',
});

const fetchSocialMediaData = async () => {
    try {
        const response = await axios.get('/social-media');
        Object.assign(form.value, response.data);
    } catch (error) {
        console.error('Error fetching Social Media data:', error);
    }
};

const saveSosmed = async () => {
    try {
        const response = await axios.post('/social-media/update', form.value);
        console.log(response.data.message);
        showToast('Social media updated successfully!');
        router.push('/cms/sosial-media');
    } catch (error) {
        console.error('Error add Sosial Media:', error);
        showToast('Error updated Sosial Media.');
    }
}

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
};

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    fetchSocialMediaData();
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
        <NavbarAdmin />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <form @submit.prevent="saveSosmed">
                            <div class="card rounded-3 p-4 border-0">
                                <h5 class="fw-light fs-16">Digitefa/CMS/ Social Media</h5>
                                <h4 class="fs-24">Social Media</h4>
                                <div class="d-flex justify-content-end">
                                    <ButtonBiru class="ms-3 mb-4 h-45 px-3 rounded-3 fs-16" type="submit">
                                        Save
                                    </ButtonBiru>
                                </div>
                                <div class="card bordersa rounded-3 pb-4">
                                    <div class="ps-3 pe-4 mt-3 mb-2">
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">No Handphone</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="No Handphone" v-model="form.phone_number" />
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">Link Tiktok</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="Link Tiktok" v-model="form.tiktok" />
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">Link Instagram</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="Link Instagram" v-model="form.instagram" />
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">Link X</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="Link X" v-model="form.x" />
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">Link Youtube</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="Link Youtube" v-model="form.youtube" />
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                            <label for="categoryName" class="fs-16 mb-0 mt-2">Link Linkedln</label>
                                            <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                                placeholder="Link Linkdln" v-model="form.linkedin" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
                                <div v-if="isToastVisible"
                                    class="toast align-items-center text-white bg-light-success border-0 show"
                                    role="alert">
                                    <div class="d-flex">
                                        <div class="toast-body">
                                            {{ toastMessage }}
                                        </div>
                                        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                            @click="closeToast" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
                            <div v-if="isToastVisible"
                                class="toast align-items-center text-white bg-light-success border-0 show" role="alert">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        {{ toastMessage }}
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                        @click="closeToast" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>