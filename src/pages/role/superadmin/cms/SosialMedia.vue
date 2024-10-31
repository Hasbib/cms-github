<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';

const isSidebarVisible = ref(true);
const sosmedData = ref([]);
const searchQuery = ref('');
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentSosMed = ref(null);
const isDeleteModalVisible = ref(false);
const sosmedToDelete = ref(null);
const isToastVisible = ref(false);
const selectedSort = ref('Sort');
const toastMessage = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

// const form = ref({

// });

const filteredData = computed(() => {
    let sortedData = [...sosmedData.value];
    if (selectedSort.value === 'newest') {
        sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort.value === 'oldest') {
        sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sortedData.filter(sosmed =>
        sosmed.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const fetchCategoryData = async () => {

};

const submitSkillForm = async () => {

};

const showAddSosmedModal = () => {
    isModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeAddSosMedModal = () => {
    isModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const saveUpdateSkills = async () => {

};

const showEditSosmedModal = (sosmed) => {
    currentSosMed.value = { ...sosmed };
    isEditModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeEditSosmedModal = () => {
    isEditModalVisible.value = false;
    currentSosMed.value = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const showDeleteSosmedModal = (sosmed) => {
    sosmedToDelete.value = sosmed;
    isDeleteModalVisible.value = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeDeleteSosMedModal = () => {
    isDeleteModalVisible.value = false;
    sosmedToDelete.value = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const deleteSkills = async () => {
};

onMounted(() => {
    fetchCategoryData();
});

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
        <NavbarAdmin />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="d-flex justify-content-start">
                            <div class="search-input w-50 me-md-1">
                                <input type="text" class="form-control c-border rounded-3 h-40" v-model="searchQuery"
                                    placeholder="Search" />
                                <i class="bi bi-search"></i>
                            </div>
                            <select class="form-select w-30 c-border h-40 ms-2" v-model="selectedSort">
                                <option selected>Sort</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                        <ButtonBiru class="fs-16 px-3 rounded-3 h-43" @click="showAddSosmedModal">Add Sosial Media
                        </ButtonBiru>
                    </div>

                    <!-- Add Modal -->
                    <div v-if="isModalVisible" class="modal-backdrop" @click="closeAddSosMedModal"></div>
                    <div v-if="isModalVisible" class="modal fade show d-block" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true" @click.self="closeAddSosMedModal">
                        <div class="modal-dialog custom-modal-sosmed modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header mb--3">
                                    <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                        <i class="bi bi-file-earmark-plus me-1"></i>Add Sosial Media
                                    </h5>
                                    <button type="button" class="btn-close fs-12 c-close"
                                        @click="closeAddSosMedModal"></button>
                                </div>
                                <hr class="mt-0">
                                <div class="ps-3 pe-4 mt-3 mb-2">
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">No Handphone</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="No Handphone" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">Link Tiktok</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="Link Tiktok" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">Link Instagram</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="Link Instagram" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">Link X</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="Link X" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">Link Youtube</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="Link Youtube" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="categoryName" class="fs-16 mb-0 mt-2">Link Linkedln</label>
                                        <input type="text" id="categoryName" class="form-control c-border w-75 h-43"
                                            placeholder="Link Linkdln" />
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center mb-5">
                                    <ButtonTransparanComponen
                                        class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                        @click="closeAddSosMedModal">Cancel</ButtonTransparanComponen>
                                    <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                        @click="submitSkillForm">Save</ButtonBiru>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="table-responsive">
                            <table class="table custom-table rounded-4">
                                <thead class="thead-custom">
                                    <tr class="ps-4">
                                        <th class="ps-3 fs-16 fw-light w-1">No</th>
                                        <th class="fs-16 fw-light w-200">No Handphone</th>
                                        <th class="fs-16 fw-light w-200">Link Tiktok</th>
                                        <th class="fs-16 fw-light w-200">Link X</th>
                                        <th class="fs-16 fw-light w-200">Link Youtube</th>
                                        <th class="fs-16 fw-light w-200">Link Linkedln</th>
                                        <th class="ps-4 fs-16 fw-light w-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-custom">
                                    <tr v-for="(item, index) in paginatedData" :key="item.id">
                                        <td class="ps-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                        <td>link</td>
                                        <td>link</td>
                                        <td>link</td>
                                        <td>link</td>
                                        <td>link</td>
                                        <td class="ps-4">
                                            <div class="dropdown ps-2">
                                                <button class="btn border-0 dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown">
                                                    <p class="bi bi-three-dots-vertical"
                                                        style="margin-bottom: -8px; margin-top: -5px;"></p>
                                                </button>
                                                <ul class="dropdown-menu border-0">
                                                    <h5 class="ms-3 fs-16 fw-normal">Action</h5>
                                                    <li>
                                                        <a class="dropdown-item fw-normal fs-16" href="#"
                                                            @click="showEditSosmedModal(item)">
                                                            <i class="bi bi-pencil-square me-1 fs-16"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item fw-normal" href="#"
                                                            @click="showDeleteSosmedModal(item)">
                                                            <i class="bi bi-trash me-1 fs-16"></i>
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="7" class="p-1">
                                            <nav>
                                                <div class="d-flex justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <label for="itemsPerPage" class="me-2">Items per page:</label>
                                                        <select id="itemsPerPage" class="form-select w-auto bg-none"
                                                            v-model="itemsPerPage">
                                                            <option value="10">10</option>
                                                            <option value="20">20</option>
                                                            <option value="50">50</option>
                                                        </select>
                                                        <span class="fs-16">{{ (currentPage - 1) * itemsPerPage + 1 }} -
                                                            {{
                                                                Math.min(currentPage * itemsPerPage, filteredData.length) }}
                                                            of
                                                            {{ filteredData.length }} items</span>
                                                    </div>
                                                    <ul class="pagination custom-pagination justify-content-end">
                                                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToPage(currentPage - 1)">
                                                                <i class="bi bi-chevron-left"></i>
                                                            </a>
                                                        </li>
                                                        <li v-for="page in pageNumbers" :key="page" class="page-item"
                                                            :class="{ active: page === currentPage }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToPage(page)" v-if="page !== '...'">{{
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

                            <!-- Edit Modal -->
                            <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditSosmedModal"></div>
                            <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="false"
                                @click.self="closeEditSosmedModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header mb--3">
                                            <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                                <i class="bi bi-pencil-square me-1"></i>Edit Skill
                                            </h5>
                                            <button type="button" class="btn-close fs-12 c-close"
                                                @click="closeEditSosmedModal"></button>
                                        </div>
                                        <hr class="mt-0">
                                        <div class="ps-3 pe-4 mt-3 mb-2">
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">No Handphone</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43"
                                                    placeholder="No Handphone" />
                                            </div>
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">Link Tiktok</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43" placeholder="Link Tiktok" />
                                            </div>
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">Link Instagram</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43"
                                                    placeholder="Link Instagram" />
                                            </div>
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">Link X</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43" placeholder="Link X" />
                                            </div>
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">Link Youtube</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43"
                                                    placeholder="Link Youtube" />
                                            </div>
                                            <div class="d-flex justify-content-between mt-3">
                                                <label for="categoryName" class="fs-16 mb-0 mt-2">Link Linkedln</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-75 h-43"
                                                    placeholder="Link Linkdln" />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                                @click="closeEditSosmedModal">Cancel</ButtonTransparanComponen>
                                            <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                                @click="saveUpdateSkills">Save</ButtonBiru>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Delete Modal -->
                            <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteSosMedModal">
                            </div>
                            <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="deleteModalLabel" aria-hidden="true"
                                @click.self="closeDeleteSosMedModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content pt-3">
                                        <div
                                            class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                                            <PhTrashSimple :size="50" color="#ff4c4c" />
                                            <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Sosial Media</h5>
                                            <h5 class="fs-16 fw-light opacity-50">
                                                Are you sure you want to delete this Sosial Media? Once deleted, this
                                                data
                                                cannot be restored.
                                            </h5>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                                @click="closeDeleteSosMedModal">No, Cancel</ButtonTransparanComponen>
                                            <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                                @click="deleteSkills">Yes, Delete</ButtonMerah>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>