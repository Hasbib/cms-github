<script setup>
import { inject } from 'vue';
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import { ref, onUnmounted, onMounted, computed } from 'vue';
import { CourseManajemen } from '@/data/index.js';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';

const coursemanajemenData = ref(CourseManajemen)
const isSidebarVisible = ref(true);
const courseToDelete = ref(null);
const isDeleteModalVisible = ref(false);
const selectedSort = ref('Sort');
const courseData = ref([]);
const searchQuery = ref('');
const toastMessage = ref('');
const isToastVisible = ref(false);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const truncateSubTitle = (subTitle, wordLimit = 4) => {
    const words = subTitle.split(' ');
    return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : subTitle;
};

const currentPage = inject('currentPage');

const showAddPage = () => {
    currentPage.value = 'add';
};

const filteredData = computed(() => {
    let sortedData = [...courseData.value];
    if (selectedSort.value === 'newest') {
        sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort.value === 'oldest') {
        sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sortedData.filter(course =>
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});


const showDeleteLevelCourseModal = (course) => {
    courseToDelete.value = course;
    isDeleteModalVisible.value = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeDeleteCourseModal = () => {
    isDeleteModalVisible.value = false;
    courseToDelete.value = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const deleteCourse = async () => {
    try {
        closeModal();
        showToast('Course deleted successfully!');
    } catch (error) {
        console.error('Error deleting course:', error);
        showToast('Error deleting course.');
    }
};

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
};

const closeModal = () => {
    isDeleteModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

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
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="cbg-card rounded-2 p-4 border-0">
                            <h5 class="fw-light fs-16">Digitefa/Course Manajemen</h5>
                            <h4 class="fs-24">Course Manajemen</h4>
                            <div class="d-flex justify-content-end">
                                <div class="search-input w-25 me-md-1">
                                    <input type="text" class="form-control rounded-3 h-40 c-border"
                                        v-model="searchQuery" placeholder="Search" />
                                    <i class="bi bi-search mt--10"></i>
                                </div>
                                <select class="form-select w-13 c-border ms-2 h-40 c-border rounded-3">
                                    <option selected>Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                                <ButtonBiru class="ms-3 mb-4 h-40 px-3 rounded-3 fs-16" @click="showAddPage">
                                    Add Course
                                </ButtonBiru>
                            </div>
                            <div class="col-md-12 mt-4 mt-md-0">
                                <div class="table-responsive">
                                    <table class="table custom-table rounded-4">
                                        <thead class="thead-custom">
                                            <tr class="ps-4">
                                                <th class="ps-3 fs-16 fw-light w-1">No</th>
                                                <th class="fs-16 fw-light w-350">Name Course</th>
                                                <th class="fs-16 fw-light w-150">Teacher</th>
                                                <th class="fs-16 fw-light w-10 ps-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-custom">
                                            <tr v-for="(course, index) in coursemanajemenData" :key="course.id">
                                                <td class="ps-4 pt-4">{{ index + 1 }}</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img :src="course.image" class="rounded me-3" alt="Course Image"
                                                            width="88px" height="56px" />
                                                        <div class="ms-0">
                                                            <h6 class="mb-1 fs-16 fw-medium">{{ course.title }}</h6>
                                                            <p class="mb-0 text-muted fs-12">{{
                                                                truncateSubTitle(course.sub_title) }}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="pt-4 fs-16">
                                                    {{ course.teacher }}
                                                </td>
                                                <td class="pt-18">
                                                    <button class="border-0 rounded-2 mx-1 btn-history">
                                                        <i class="bi bi-stopwatch"></i>
                                                    </button>
                                                    <button class="border-0 rounded-2 btn-trash"
                                                        @click="showDeleteLevelCourseModal(item)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="p-1">
                                                    <nav>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex align-items-center">
                                                                <label for="itemsPerPage" class="me-2">Items per
                                                                    page:</label>
                                                                <select id="itemsPerPage"
                                                                    class="form-select w-auto bg-none border-0">
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="50">50</option>
                                                                </select>
                                                                <span class="fs-16">1 - 1

                                                                    of
                                                                    items</span>
                                                            </div>
                                                            <ul
                                                                class="pagination custom-pagination justify-content-end">
                                                                <li class="page-item"
                                                                    :class="{ disabled: currentPage === 1 }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(currentPage - 1)">
                                                                        <i class="bi bi-chevron-left"></i>
                                                                    </a>
                                                                </li>
                                                                <li v-for="page in pageNumbers" :key="page"
                                                                    class="page-item"
                                                                    :class="{ active: page === currentPage }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(page)"
                                                                        v-if="page !== '...'">{{
                                                                            page }}</a>
                                                                    <span class="page-link" v-else>...</span>
                                                                </li>
                                                                <li class="page-item"
                                                                    :class="{ disabled: currentPage === totalPages }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(currentPage + 1)">
                                                                        <i class="bi bi-chevron-right"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </nav>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteCourseModal">
        </div>
        <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
            aria-labelledby="deleteModalLabel" aria-hidden="true" @click.self="closeDeleteCourseModal">
            <div class="modal-dialog custom-modal modal-dialog-centered">
                <div class="modal-content pt-3">
                    <div
                        class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                        <PhTrashSimple :size="50" color="#ff4c4c" />
                        <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Course</h5>
                        <h5 class="fs-16 fw-light opacity-50">
                            Are you sure you want to delete this Course? Once deleted, this
                            data
                            cannot be restored.
                        </h5>
                    </div>
                    <div class="d-flex justify-content-center mb-5">
                        <ButtonTransparanComponen class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                            @click="closeDeleteCourseModal">No, Cancel
                        </ButtonTransparanComponen>
                        <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16" @click="deleteCourse">Yes, Delete
                        </ButtonMerah>
                    </div>
                </div>
            </div>
        </div>
        <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
            <div v-if="isToastVisible" class="toast align-items-center text-white bg-light-success border-0 show"
                role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        {{ toastMessage }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="closeToast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>