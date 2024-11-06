<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import axios from 'axios';

const isSidebarVisible = ref(true);
const studentData = ref([]);
const searchQuery = ref('');
const isEditModalVisible = ref(false);
const currentStudent = ref(null);
const selectedSort = ref('Sort');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));
const dropdownVisible = ref(false);
const dropdownPosition = ref({ top: '0px', left: '0px' });

const form = ref({
    name: '',
});

const showDropdownMenu = (event, item) => {
    const buttonRect = event.target.getBoundingClientRect();
    dropdownPosition.value = {
        top: `${buttonRect.bottom}px`,
        left: `${buttonRect.left - 130}px`
    };
    dropdownVisible.value = true;
    currentStudent.value = item;
};

const hideDropdownMenu = () => {
    dropdownVisible.value = false;
};

const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
        hideDropdownMenu();
    }
};

const filteredData = computed(() => {
    let sortedData = [...studentData.value];
    if (selectedSort.value === 'newest') {
        sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort.value === 'oldest') {
        sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sortedData.filter(student =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.value.slice(startIndex, endIndex);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const pageNumbers = computed(() => {
    const pages = [];
    if (totalPages.value <= 5) {
        for (let i = 1; i <= totalPages.value; i++) pages.push(i);
    } else {
        if (currentPage.value <= 3) {
            pages.push(1, 2, 3, '...', totalPages.value);
        } else if (currentPage.value > 3 && currentPage.value < totalPages.value - 2) {
            pages.push(1, '...', currentPage.value, '...', totalPages.value);
        } else {
            pages.push(1, '...', totalPages.value - 2, totalPages.value - 1, totalPages.value);
        }
    }
    return pages;
});

const fetchStudentData = async () => {
    try {
        const response = await axios.get('/users');
        studentData.value = response.data.filter(user => user.role === 'student');
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
};

const saveStudent = async () => {

};

const showEditStudentModal = () => {
    form.value.name = currentStudent.value.name;
    isEditModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeEditStudentModal = () => {
    isEditModalVisible.value = false;
    currentStudent.value = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

// const showToast = (message) => {
//     toastMessage.value = message;
//     isToastVisible.value = true;
//     setTimeout(() => {
//         isToastVisible.value = false;
//     }, 3000);
// };


onMounted(() => {
    fetchStudentData();
});

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
    document.removeEventListener('click', handleClickOutside);
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
                    <div class="cbg-card rounded-2 p-4 border-0">
                        <h5 class="fw-light fs-16">Digitefa/Course Manajemen/Student</h5>
                        <h4 class="fs-24">Student</h4>
                        <div class="d-flex justify-content-end">
                            <div class="search-input w-25 me-md-1">
                                <input type="text" class="form-control rounded-3 h-40 c-border" v-model="searchQuery"
                                    placeholder="Search" />
                                <i class="bi bi-search mt--10"></i>
                            </div>
                            <select class="form-select w-13 c-border h-40 ms-2">
                                <option selected>Status</option>
                                <option value="verified">Verified</option>
                                <option value="unverified">Unverified</option>
                            </select>
                            <select class="form-select w-13 c-border h-40 ms-2" v-model="selectedSort">
                                <option selected>Sort</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <ButtonBiru class="ms-3 mb-4 h-40 px-3 rounded-3 fs-16" @click="showAddStudentModal">
                                Add Student
                            </ButtonBiru>
                        </div>
                        <div class="col-md-12 mt-4 mt-md-0">
                            <div class="table-responsive">
                                <table class="table custom-table rounded-4">
                                    <thead class="thead-custom">
                                        <tr class="ps-4">
                                            <th class="ps-3 fs-16 fw-light w-1">No</th>
                                            <th class="fs-16 fw-light w-400">Name Student</th>
                                            <th class="fs-16 fw-light w-400">Email</th>
                                            <th class="fs-16 fw-light w-200">Status verify</th>
                                            <th class="fs-16 fw-light w-150">Role</th>
                                            <th class="ps-4 fs-16 fw-light w-10">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-custom">
                                        <tr v-for="(item, index) in paginatedData" :key="item.id">
                                            <td class="ps-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.email }}</td>
                                            <td>{{ item.is_verified ? 'Verified' : 'Unverified' }}</td>
                                            <td>{{ item.role }}</td>
                                            <td class="ps-4">
                                                <div class="dropdown-container ps-2">
                                                    <button class="btn border-0 dropdown-toggle" type="button"
                                                        @click="showDropdownMenu($event, item)">
                                                        <p class="bi bi-three-dots-vertical"
                                                            style="margin-bottom: -8px; margin-top: -5px;"></p>
                                                    </button>
                                                    <ul v-if="dropdownVisible" class="fixed-dropdown dropdown-menu"
                                                        style="display: block"
                                                        :style="{ top: dropdownPosition.top, left: dropdownPosition.left }">
                                                        <h5 class="ms-3 fs-16 fw-normal">Action</h5>
                                                        <li>
                                                            <a class="dropdown-item fw-normal fs-16" href="#"
                                                                @click="showEditStudentModal">
                                                                <i class="bi bi-pencil-square me-1 fs-16"></i>
                                                                Edit
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="p-1">
                                                <nav>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="d-flex align-items-center">
                                                            <label for="itemsPerPage" class="me-2">Items per
                                                                page:</label>
                                                            <select id="itemsPerPage"
                                                                class="form-select w-auto bg-none border-0"
                                                                v-model="itemsPerPage">
                                                                <option value="10">10</option>
                                                                <option value="20">20</option>
                                                                <option value="50">50</option>
                                                            </select>
                                                            <span class="fs-16">{{ (currentPage - 1) * itemsPerPage + 1
                                                                }} -
                                                                {{
                                                                    Math.min(currentPage * itemsPerPage,
                                                                        filteredData.length) }}
                                                                of
                                                                {{ filteredData.length }} items</span>
                                                        </div>
                                                        <ul
                                                            class="pagination custom-pagination justify-content-end mt-1">
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

                <!-- Edit Modal -->
                <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditStudentModal">
                </div>
                <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="false" @click.self="closeEditStudentModal">
                    <div class="modal-dialog custom-modal modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header mb--3">
                                <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                    <i class="bi bi-pencil-square me-1"></i>Edit Student
                                </h5>
                                <button type="button" class="btn-close fs-12 c-close"
                                    @click="closeEditStudentModal"></button>
                            </div>
                            <hr class="mt-0">
                            <div class="px-3 mb-2">
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="studentName" class="me-3 fs-16 mb-0 mt-2">Name</label>
                                    <input type="text" id="studentName" class="form-control w-75 h-43"
                                        placeholder="Enter student name" v-model="form.name" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="studentEmail" class="me-3 fs-16 mb-0 mt-2">Email</label>
                                    <input type="email" id="studentEmail" class="form-control w-75 h-43"
                                        placeholder="Enter email name" v-model="form.email" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="studentPassword" class="me-3 fs-16 mb-0 mt-2">Password</label>
                                    <input type="password" id="studentPassword" class="form-control w-75 h-43"
                                        placeholder="Enter password name" v-model="form.password" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="statusStudent" class="me-3 fs-16 mb-0 mt-2">Status</label>
                                    <select class="form-select w-75 h-40 ms-2">
                                        <option selected>Verified</option>
                                        <option value="unverified">Unverified</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mb-5">
                                <ButtonTransparanComponen
                                    class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                    @click="closeEditStudentModal">Cancel</ButtonTransparanComponen>
                                <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16" @click="saveStudent">Save
                                </ButtonBiru>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
