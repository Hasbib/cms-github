<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const isSidebarVisible = ref(true);
const usersData = ref([]);
const router = useRouter();
const searchQuery = ref('');
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentUsers = ref(null);
const isDeleteModalVisible = ref(false);
const usersToDelete = ref(null);
const isToastVisible = ref(false);
const toastMessage = ref('');
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
    currentUsers.value = item;
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
    let sortedData = [...usersData.value];
    if (selectedSort.value === 'newest') {
        sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort.value === 'oldest') {
        sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sortedData.filter(users =>
        users.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const fetchUsersData = async () => {
    try {
        const response = await axios.get('/users');
        usersData.value = response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const submitForm = async () => {
    try {
        const response = await axios.post('/', form.value);
        console.log(response.data.message);
        closeAddUsersModal();
        showToast('Add Users successfully!');

        form.value.name = '';
        await fetchUsersData();

        router.push('/user-manajemen/user');
    } catch (error) {
        console.error('Error deleting users:', error);
        showToast('Error Add Users.');
    }
};

const showAddUsersModal = () => {
    isModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeAddUsersModal = () => {
    isModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const saveUsers = async () => {

};

const showEditUsersModal = () => {
    form.value.name = currentUsers.value.name;
    isEditModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeEditUsersModal = () => {
    isEditModalVisible.value = false;
    currentUsers.value = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const showDeleteUsersModal = () => {
    isDeleteModalVisible.value = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeDeleteUsersModal = () => {
    isDeleteModalVisible.value = false;
    usersToDelete.value = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const deleteUsers = async () => {
    // try {
    //     if () {
    //         await axios.delete();
    //         fetchUsersData();
    //         closeModal();
    //         showToast('Users deleted successfully!');
    //     }
    // } catch (error) {
    //     console.error('Error deleting users:', error);
    // }
};

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
};

// const closeModal = () => {
//     isDeleteModalVisible.value = false;
//     document.documentElement.style.overflow = '';
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = '';
// };

onMounted(() => {
    fetchUsersData();
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
                        <h5 class="fw-light fs-16">Digitefa/Course Manajemen/User</h5>
                        <h4 class="fs-24">User</h4>
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
                            <ButtonBiru class="ms-3 mb-4 h-40 px-3 rounded-3 fs-16" @click="showAddUsersModal">
                                Add User
                            </ButtonBiru>
                        </div>
                        <div class="col-md-12 mt-4 mt-md-0">
                            <div class="table-responsive">
                                <table class="table custom-table rounded-4">
                                    <thead class="thead-custom">
                                        <tr class="ps-4">
                                            <th class="ps-3 fs-16 fw-light w-1">No</th>
                                            <th class="fs-16 fw-light w-400">Name Users</th>
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
                                                                @click="showEditUsersModal">
                                                                <i class="bi bi-pencil-square me-1 fs-16"></i>
                                                                Edit
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item fw-normal" href="#"
                                                                @click="showDeleteUsersModal">
                                                                <i class="bi bi-trash me-1 fs-16"></i>
                                                                Delete
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

                <!-- Add Modal -->
                <div v-if="isModalVisible" class="modal-backdrop" @click="closeAddUsersModal"></div>
                <div v-if="isModalVisible" class="modal fade show d-block" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true" @click.self="closeAddUsersModal">
                    <div class="modal-dialog custom-modal modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header mb--3">
                                <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                    <i class="bi bi-file-earmark-plus me-1"></i>Add User
                                </h5>
                                <button type="button" class="btn-close fs-12 c-close"
                                    @click="closeAddUsersModal"></button>
                            </div>
                            <hr class="mt-0">
                            <div class="px-3 mb-2">
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userName" class="me-3 fs-16 mb-0 mt-2">Name</label>
                                    <input type="text" id="userName" class="form-control w-75 h-43"
                                        placeholder="Enter user name" v-model="form.name" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="emailName" class="me-3 fs-16 mb-0 mt-2">Email</label>
                                    <input type="email" id="emailName" class="form-control w-75 h-43"
                                        placeholder="Enter email name" v-model="form.email" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="passwordName" class="me-3 fs-16 mb-0 mt-2">Password</label>
                                    <input type="password" id="passwordName" class="form-control w-75 h-43"
                                        placeholder="Enter password name" v-model="form.password" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="studentName" class="me-3 fs-16 mb-0 mt-2">Role</label>
                                    <select class="form-select w-75 h-40 ms-2">
                                        <option selected>Pilih Role</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="superadmin">Superadmin</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mb-5">
                                <ButtonTransparanComponen
                                    class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                    @click="closeAddUsersModal">Cancel</ButtonTransparanComponen>
                                <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16" @click="submitForm">
                                    Save</ButtonBiru>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Edit Modal -->
                <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditUsersModal">
                </div>
                <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="false" @click.self="closeEditUsersModal">
                    <div class="modal-dialog custom-modal modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header mb--3">
                                <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                    <i class="bi bi-pencil-square me-1"></i>Edit Users
                                </h5>
                                <button type="button" class="btn-close fs-12 c-close"
                                    @click="closeEditUsersModal"></button>
                            </div>
                            <hr class="mt-0">
                            <div class="ps-3 mt-3 mb-2">
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userName" class="me-3 fs-16 mb-0 mt-2">Name</label>
                                    <input type="text" id="userName" class="form-control w-75 h-43"
                                        placeholder="Enter user name" v-model="form.name" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userEmail" class="me-3 fs-16 mb-0 mt-2">Email</label>
                                    <input type="email" id="userEmail" class="form-control w-75 h-43"
                                        placeholder="Enter email name" v-model="form.email" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userPassword" class="me-3 fs-16 mb-0 mt-2">Password</label>
                                    <input type="password" id="userPassword" class="form-control w-75 h-43"
                                        placeholder="Enter password name" v-model="form.password" />
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userRole" class="me-3 fs-16 mb-0 mt-2">Role</label>
                                    <select class="form-select w-75 h-40 ms-2">
                                        <option selected>Pilih Role</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="superadmin">Superadmin</option>
                                    </select>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <label for="userStatus" class="me-3 fs-16 mb-0 mt-2">Status</label>
                                    <select class="form-select w-75 h-40 ms-2">
                                        <option selected>Verified</option>
                                        <option value="unverified">Unverified</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mb-5">
                                <ButtonTransparanComponen
                                    class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                    @click="closeEditUsersModal">Cancel</ButtonTransparanComponen>
                                <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16" @click="saveUsers">Save
                                </ButtonBiru>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Delete Modal -->
                <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteUsersModal">
                </div>
                <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
                    aria-labelledby="deleteModalLabel" aria-hidden="true" @click.self="closeDeleteUsersModal">
                    <div class="modal-dialog custom-modal modal-dialog-centered">
                        <div class="modal-content pt-3">
                            <div
                                class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                                <PhTrashSimple :size="50" color="#ff4c4c" />
                                <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Users</h5>
                                <h5 class="fs-16 fw-light opacity-50">
                                    Are you sure you want to delete this users? Once deleted, this
                                    data
                                    cannot be restored.
                                </h5>
                            </div>
                            <div class="d-flex justify-content-center mb-5">
                                <ButtonTransparanComponen class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                    @click="closeDeleteUsersModal">No, Cancel
                                </ButtonTransparanComponen>
                                <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16" @click="deleteUsers">Yes,
                                    Delete</ButtonMerah>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
                    <div v-if="isToastVisible"
                        class="toast align-items-center text-white bg-light-success border-0 show" role="alert">
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
        </div>
    </div>
</template>
