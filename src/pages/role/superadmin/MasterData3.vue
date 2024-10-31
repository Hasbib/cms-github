<script setup>
import { ref, computed } from 'vue';
import NavbarTeacher from '@/layout/NavbarTeacher.vue';
import SidebarTeacher from '@/layout/SidebarTeacher.vue';
import ButtonSuccess from '@/components/ButtonSuccess.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';
import { categoryName } from '@/data/index.js';

const Category = ref(categoryName);
const searchQuery = ref('');
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentCategory = ref(null);
const isDeleteModalVisible = ref(false);
const categoryToDelete = ref(null);
const isToastVisible = ref(false);

const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const filteredData = computed(() => {
    return Category.value.filter(categoryName =>
        categoryName.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const showAddCategoryModal = () => {
    isModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeAddCategoryModal = () => {
    isModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const showEditCategoryModal = (categoryName) => {
    currentCategory.value = { ...categoryName };
    isEditModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeEditCategoryModal = () => {
    isEditModalVisible.value = false;
    currentCategory.value = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const saveCategory = () => {

};

const showDeleteCategoryModal = (categoryName) => {
    categoryToDelete.value = categoryName;
    isDeleteModalVisible.value = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeDeleteCategoryModal = () => {
    isDeleteModalVisible.value = false;
    categoryToDelete.value = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const deleteCategory = () => {
    if (categoryToDelete.value) {
        Category.value = Category.value.filter(cat => cat.id !== categoryToDelete.value.id);
        closeDeleteCategoryModal();
        showToast();
    }
};

const showToast = () => {
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000); // Hide toast after 3 seconds
};

const closeToast = () => {
    isToastVisible.value = false;
};
</script>

<template>
    <div class="navbg-sa">
        <!-- NAVBAR START -->
        <NavbarTeacher />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarTeacher />
        <!-- SIDEBAR END -->

        <div id="content" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="search-input w-25 me-md-1">
                            <input type="text" class="form-control rounded-3 h-40" v-model="searchQuery"
                                placeholder="Search" />
                            <i class="bi bi-search"></i>
                        </div>
                        <ButtonSuccess class="fs-16 px-4 rounded-3 h-37" @click="showAddCategoryModal">Add Skill
                        </ButtonSuccess>

                        <!-- Add Modal -->
                        <div v-if="isModalVisible" class="modal-backdrop" @click="closeAddCategoryModal"></div>
                        <div v-if="isModalVisible" class="modal fade show d-block" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true" @click.self="closeAddCategoryModal">
                            <div class="modal-dialog custom-modal modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header mb--3">
                                        <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                            <i class="bi bi-file-earmark-plus me-1"></i>Add Category
                                        </h5>
                                        <button type="button" class="btn-close fs-12 c-close"
                                            @click="closeAddCategoryModal"></button>
                                    </div>
                                    <hr class="mt-0">
                                    <div class="ps-3 mt-3 mb-2">
                                        <div class="d-flex align-items-center">
                                            <label for="categoryName" class="me-3 fs-16 mb-0">Name Category</label>
                                            <input type="text" id="categoryName" class="form-control w-66 h-43"
                                                placeholder="Enter category name" />
                                        </div>
                                        <div class="d-flex align-items-center mt-3">
                                            <label for="categoryName" class="me-5 fs-16 mb-0">Name Skill</label>
                                            <input type="text" id="categoryName" class="form-control w-66 h-43 ms-3"
                                                placeholder="Enter skill name" />
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center mb-5">
                                        <ButtonTransparanComponen
                                            class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                            @click="closeAddCategoryModal">Cancel</ButtonTransparanComponen>
                                        <ButtonSuccess class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                            @click="saveCategory">Save</ButtonSuccess>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="table-responsive">
                            <table class="table custom-table rounded-4">
                                <thead class="thead-custom">
                                    <tr class="ps-4">
                                        <th class="ps-3 fs-16 fw-medium" style="width: 1px;">No</th>
                                        <th class="fs-16 fw-medium" style="width: 300px;">Category Name</th>
                                        <th class="fs-16 fw-medium" style="width: 200px;">Skill Name</th>
                                        <th class="ps-4 fs-16 fw-medium" style="width: 10px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-custom">
                                    <tr v-for="(categoryName, index) in paginatedData" :key="categoryName.id">
                                        <td class="ps-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                        <td>{{ categoryName.name }}</td>
                                        <td>{{ categoryName.skill }}</td>
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
                                                            @click="showEditCategoryModal(categoryName)">
                                                            <i class="bi bi-pencil-square me-1 fs-16"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item fw-normal" href="#"
                                                            @click="showDeleteCategoryModal(categoryName)">
                                                            <i class="bi bi-trash me-1 fs-16"></i>
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="p-1">
                                            <nav>
                                                <ul class="pagination custom-pagination justify-content-center">
                                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                        <a class="page-link" href="#"
                                                            @click.prevent="goToPage(currentPage - 1)">
                                                            <i class="bi bi-chevron-left"></i>
                                                        </a>
                                                    </li>
                                                    <li v-for="page in pageNumbers" :key="page" class="page-item"
                                                        :class="{ active: page === currentPage }">
                                                        <a class="page-link" href="#" @click.prevent="goToPage(page)"
                                                            v-if="page !== '...'">{{ page }}</a>
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
                                            </nav>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Edit Modal -->
                            <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditCategoryModal"></div>
                            <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true"
                                @click.self="closeEditCategoryModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header mb--3">
                                            <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                                <i class="bi bi-pencil-square me-1"></i>Edit Skill
                                            </h5>
                                            <button type="button" class="btn-close fs-12 c-close"
                                                @click="closeEditCategoryModal"></button>
                                        </div>
                                        <hr class="mt-0">
                                        <div class="ps-3 mt-3 mb-2">
                                            <div class="d-flex align-items-center">
                                                <label for="editCategoryName" class="me-3 fs-16 mb-0">Name
                                                    Category</label>
                                                <input type="text" id="editCategoryName" v-model="currentCategory.name"
                                                    class="form-control w-66 h-43" placeholder="Enter category name" />
                                            </div>
                                            <div class="d-flex align-items-center mt-3">
                                                <label for="categoryName" class="me-5 fs-16 mb-0">Name Skill</label>
                                                <input type="text" id="categoryName" class="form-control w-66 h-43 ms-3"
                                                    placeholder="Enter skill name" />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                                @click="closeEditCategoryModal">Cancel</ButtonTransparanComponen>
                                            <ButtonSuccess class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                                @click="saveCategory">Save</ButtonSuccess>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Delete Modal -->
                            <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteCategoryModal">
                            </div>
                            <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="deleteModalLabel" aria-hidden="true"
                                @click.self="closeDeleteCategoryModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content pt-3">
                                        <div
                                            class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                                            <PhTrashSimple :size="50" color="#ff4c4c" />
                                            <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Skill</h5>
                                            <h5 class="fs-16 fw-light opacity-50">
                                                Are you sure you want to delete this Skill? Once deleted, this data
                                                cannot be restored.
                                            </h5>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
                                                @click="closeDeleteCategoryModal">No, Cancel</ButtonTransparanComponen>
                                            <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
                                                @click="deleteCategory">Yes, Delete</ButtonMerah>
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
                                            Category deleted succesfully!
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
<!-- 

<style scoped>
.bg-light-success {
    background-color: #28a745 !important;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
    background-color: white;
}

.custom-table {
    border-radius: 16px;
    overflow: hidden;
}

.table-custom .dropdown-menu {
    position: absolute !important;
    margin-top: -22px !important;
    margin-right: 30px !important;
    background: #E9E9E9;
}

.thead-custom {
    background-color: rgba(216, 216, 216, 1) !important;
}

.thead-custom tr,
.thead-custom th {
    background-color: rgba(216, 216, 216, 1) !important;
    border-bottom: #A8A8A8;
}

/* .table-custom {
    background-color: #28a745 !important;
}
.table-custom td,
.table-custom th {
    background-color: #28a745 !important;
} */

.table-custom tr:last-of-type td {
    background-color: rgba(216, 216, 216, 1) !important;
    padding: 5px !important;
}

.table-custom thead {
    background-color: rgba(216, 216, 216, 1) !important;
    color: white;
}

.custom-modal {
    max-width: 500px;
    width: 100%;
}

.custom-pagination .page-link {
    height: 30px;
    width: 30px;
    line-height: 15px;
    font-size: 15px;
}

.table-custom {
    border-radius: 16px;
    overflow: hidden;
}

.table-custom thead {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
}

.table-custom th {
    border: none;
}

.table-custom td {
    border-top: 1px solid #A8A8A8;
}

.table-custom tbody tr td:first-child,
.table-custom tbody tr td:nth-child(2),
.table-custom tbody tr td:last-child {
    border-right: none;
}

.pagination {
    margin: 0;
}
</style> -->
