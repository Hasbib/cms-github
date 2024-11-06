<script setup>
import { inject, ref, onMounted, onUnmounted } from 'vue';
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import MultipleSelect from '@/components/MultiselectComponent.vue';
import 'daterangepicker/daterangepicker.css';
import $ from 'jquery';
import 'daterangepicker';

const toolOptions = [
  { label: 'Figma', value: 'figma' },
  { label: 'VS Code', value: 'vscode' },
  { label: 'Photoshop', value: 'photoshop' },
  { label: 'Illustrator', value: 'illustrator' },
];

const isSidebarVisible = ref(true);
const currentPage = inject('currentPage');
const imagePreview = ref(null);

const form = ref({
    image: null,
});

const handleFileUploadEdit = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
    } else {
        form.value.image = null;
        imagePreview.value = null;
    }
};

const goToDetail = () => {
    currentPage.value = 'detail';
};

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    $('#dateRange').daterangepicker({
        opens: 'left',
        locale: {
            format: 'DD MMMM YYYY'
        },
        startDate: '11 November 2024',
        endDate: '20 November 2024'
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});
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
                    <div class="col-md-12">
                        <div class="card rounded-2 p-4 border-0">
                            <h5 class="fw-light fs-16">Digitefa / Course Manajemen / Add Course</h5>
                            <h4 class="fs-24">Course Manajemen</h4>
                            <div class="card p-3 bordersa mt-4">
                                <h5 class="fs-20">Add Course</h5>
                                <hr />
                                <div class="mb-3 row">
                                    <label for="nameCourse" class="col-sm-3 col-form-label fs-16">Name Course</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control fs-16 h-43 rounded-3 bordersa"
                                            placeholder="Name Course" />
                                    </div>
                                </div>
                                <div class="mb-3 row align-items-center">
                                    <label for="categoryName" class="col-sm-3 col-form-label fs-16">Logo</label>
                                    <div class="col-sm-9 d-flex flex-column align-items-start">
                                        <img v-if="imagePreview" :src="imagePreview" alt="Image Preview"
                                            class="img-fluid mb-2 rounded-2"
                                            style="max-height: 100px; max-width: 105px;">
                                        <input type="file" id="fileInput" class="d-none" accept="image/*"
                                            @change="handleFileUploadEdit" />
                                        <button type="button" class="btn c-border px-4 py-2 opacity-75"
                                            onclick="document.getElementById('fileInput').click();">
                                            Upload
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="thumbnailLink" class="col-sm-3 col-form-label fs-16">Thumbnail
                                        Link</label>
                                    <div class="col-sm-9">
                                        <input type="url" class="form-control fs-16 h-43 rounded-3 bordersa"
                                            placeholder="Thumbnail Link" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="description" class="col-sm-3 col-form-label fs-16">Description</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control fs-16 c-border rounded-2" rows="2"
                                            placeholder="Description" required></textarea>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="dateRange" class="col-sm-3 col-form-label fs-16">Date</label>
                                    <div class="col-sm-9 date-range-input-container">
                                        <input type="text" id="dateRange" class="form-control bordersa fs-16 h-43 opacity-75"
                                            placeholder="Select date range">
                                        <i class="bi bi-calendar3 date-range-icon"></i>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="category" class="col-sm-3 col-form-label fs-16">Category</label>
                                    <div class="col-sm-9">
                                        <select class="form-select fs-16 h-43 opacity-75 rounded-3 bordersa">
                                            <option selected>Category</option>
                                            <option value="web">Web</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="category" class="col-sm-3 col-form-label fs-16">Category</label>
                                    <div class="col-sm-9">
                                        <MultipleSelect
                                        :options="toolOptions"
                                        placeholder="Select skill"
                                        />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="rulesAndConditions" class="col-sm-3 col-form-label fs-16">Rules &
                                        Conditions</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control fs-16 c-border rounded-2" rows="2"
                                            placeholder="Rules & Conditions" required></textarea>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <ButtonBiru class="h-40 px-3 rounded-3 fs-16" @click="goToDetail">
                                        Submit
                                    </ButtonBiru>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>