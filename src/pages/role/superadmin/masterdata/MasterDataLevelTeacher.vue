<script setup>
import axios from "axios";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const isSidebarVisible = ref(true);
const levelteacherData = ref([]);
const courseLevels = ref([]);
const searchQuery = ref('');
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentLevelTeacher = ref(null);
const isDeleteModalVisible = ref(false);
const levelteacherToDelete = ref(null);
const isToastVisible = ref(false);
const selectedSort = ref('Sort');
const toastMessage = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));
const dropdownVisible = ref(false);
const dropdownPosition = ref({ top: '0px', left: '0px' });
const selectedCourseLevels = ref([]);

const form = ref({
  name: "",
  description: "",
  max_course: "",
});

const showDropdownMenu = (event, item) => {
  const buttonRect = event.target.getBoundingClientRect();
  dropdownPosition.value = {
    top: `${buttonRect.bottom}px`,
    left: `${buttonRect.left - 130}px`
  };
  dropdownVisible.value = true;
  currentLevelTeacher.value = item;
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
  let sortedData = [...levelteacherData.value];
  if (selectedSort.value === 'newest') {
    sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (selectedSort.value === 'oldest') {
    sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }
  return sortedData.filter(levelteacher =>
    levelteacher.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const fetchCourseLevels = async () => {
  try {
    const response = await axios.get("/course-levels");
    courseLevels.value = response.data;
  } catch (error) {
    console.error("Error fetching Course Levels:", error);
  }
};

const fetchLevelTeacherData = async () => {
  try {
    const response = await axios.get("/teacher-levels");
    levelteacherData.value = response.data;
  } catch (error) {
    console.error("Error fetching Level Course data:", error);
  }
};

const submitLevelTeacherForm = async () => {
  if (
    !form.value.name ||
    !form.value.description ||
    form.value.max_course <= 0
  ) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  try {
    const response = await axios.post("/teacher-levels", {
      name: form.value.name,
      description: form.value.description,
      max_course: form.value.max_course,
      id_course_level: selectedCourseLevels.value, // Ensure this key matches your backend
    });
    console.log(response.data.message);
    closeAddLevelTeachereModal();

    // Reset form values
    form.value.name = "";
    form.value.description = "";
    form.value.max_course = "";
    selectedCourseLevels.value = []; // Clear selected levels

    await fetchLevelTeacherData();
    router.push("/master-data/level-teacher");
  } catch (error) {
    console.error("Error adding Level Teacher:", error);
  }
};

const showAddLevelTeacherModal = () => {
  isModalVisible.value = true;
  form.value.name = "";
  form.value.description = "";
  form.value.max_course = "";
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
};

const closeAddLevelTeachereModal = () => {
  isModalVisible.value = false;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

const saveUpdateLevelTeacher = async () => {
  try {
    if (levelteacherToDelete.value) {
      await axios.post(`/teacher-levels/${levelteacherToDelete.value.id_teacher_level}`, {
        name: levelteacherToDelete.value.name,
        description: levelteacherToDelete.value.description,
        max_course: levelteacherToDelete.value.max_course,
        id_course_level: levelteacherToDelete.value.id_course_level,
      });
      fetchLevelTeacherData();
      closeEditLevelTeacherModal();
    }
  } catch (error) {
    console.error('Error updating level teacher:', error);
  }
};

const showEditLevelTeacherModal = () => {
  form.value.name = currentLevelTeacher.value.name;
  form.value.description = currentLevelTeacher.value.description;
  form.value.max_course = currentLevelTeacher.value.max_course;
  form.value.id_course_level = currentLevelTeacher.value.id_course_level;
  isEditModalVisible.value = true;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
};

const closeEditLevelTeacherModal = () => {
  isEditModalVisible.value = false;
  currentLevelTeacher.value = null;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

const showDeleteLevelTeacherModal = () => {
  isDeleteModalVisible.value = true;

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
};

const closeDeleteLevelTeacherModal = () => {
  isDeleteModalVisible.value = false;
  levelteacherToDelete.value = null;

  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

const deleteLevelTeacher = async () => {
  try {
    if (currentLevelTeacher.value) {
      await axios.delete(`/teacher-levels/${currentLevelTeacher.value.id_teacher_level}`);
      fetchLevelTeacherData();
      closeModal();
    }
  } catch (error) {
    console.error('Error deleting level teacher:', error);
  }
};

// const showToast = (message) => {
//     toastMessage.value = message;
//     isToastVisible.value = true;
//     setTimeout(() => {
//         isToastVisible.value = false;
//     }, 3000);
// };

const closeModal = () => {
  isDeleteModalVisible.value = false;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

onMounted(() => {
  fetchLevelTeacherData();
  fetchCourseLevels();
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
          <div class="col-md-12 mt-4 mt-md-0">
            <div class="cbg-card rounded-3 p-4 border-0">
              <h5 class="fw-light fs-16">Digitefa/Master Data/Level Teacher</h5>
              <h4 class="fs-24">Level Teacher</h4>

              <div class="d-flex justify-content-between mb-3 mt-4">
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
                <ButtonBiru class="fs-16 px-3 rounded-3 h-40" @click="showAddLevelTeacherModal">Add Level
                  Teacher
                </ButtonBiru>
              </div>

              <div class="table-responsive">
                <table class="table custom-table rounded-4">
                  <thead class="thead-custom">
                    <tr class="ps-4">
                      <th class="ps-3 fs-16 fw-light w-1">No</th>
                      <th class="fs-16 fw-light w-200">Name Level</th>
                      <th class="fs-16 fw-light w-200">Description</th>
                      <th class="fs-16 fw-light w-200">Number of Courses</th>
                      <th class="ps-4 fs-16 fw-light w-10">Action</th>
                    </tr>
                  </thead>
                  <tbody class="table-custom">
                    <tr v-for="(item, index) in paginatedData" :key="item.id">
                      <td class="ps-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.max_course }}</td>
                      <td class="ps-4">
                        <div class="dropdown-container ps-2">
                          <button class="btn border-0 dropdown-toggle" type="button"
                            @click="showDropdownMenu($event, item)">
                            <p class="bi bi-three-dots-vertical" style="margin-bottom: -8px; margin-top: -5px;"></p>
                          </button>
                          <ul v-if="dropdownVisible" class="fixed-dropdown dropdown-menu" style="display: block"
                            :style="{ top: dropdownPosition.top, left: dropdownPosition.left }">
                            <h5 class="ms-3 fs-16 fw-normal">Action</h5>
                            <li>
                              <a class="dropdown-item fw-normal fs-16" href="#" @click="showEditLevelTeacherModal">
                                <i class="bi bi-pencil-square me-1 fs-16"></i>
                                Edit
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item fw-normal" href="#" @click="showDeleteLevelTeacherModal">
                                <i class="bi bi-trash me-1 fs-16"></i>
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" class="p-1">
                        <nav>
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                              <label for="itemsPerPage" class="me-2">Items per page:</label>
                              <select id="itemsPerPage" class="form-select w-auto bg-none border-0"
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
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">
                                  <i class="bi bi-chevron-left"></i>
                                </a>
                              </li>
                              <li v-for="page in pageNumbers" :key="page" class="page-item"
                                :class="{ active: page === currentPage }">
                                <a class="page-link" href="#" @click.prevent="goToPage(page)" v-if="page !== '...'">{{
                                  page }}</a>
                                <span class="page-link" v-else>...</span>
                              </li>
                              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">
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
        <div v-if="isModalVisible" class="modal-backdrop" @click="closeAddLevelTeachereModal"></div>
        <div v-if="isModalVisible" class="modal fade show d-block" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true" @click.self="closeAddLevelTeachereModal">
          <div class="modal-dialog custom-modal-sosmed modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header mb--3">
                <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                  <i class="bi bi-file-earmark-plus me-1"></i>Add Level Teacher
                </h5>
                <button type="button" class="btn-close fs-12 c-close" @click="closeAddLevelTeachereModal"></button>
              </div>
              <hr class="mt-0">
              <div class="ps-3 pe-4 mt-3 mb-2">
                <div class="d-flex justify-content-between mt-3">
                  <label for="categoryName" class="fs-16 mb-0 mt-2">Name Level Teacher</label>
                  <input type="text" id="categoryName" class="form-control c-border w-66 h-43"
                    placeholder="Name level teacher" v-model="form.name" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <label for="description" class="fs-16 mb-0 mt-1">Description</label>
                  <textarea class="form-control c-border w-66 rounded-2" id="description" rows="2"
                    placeholder="Description" required v-model="form.description"></textarea>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <label for="maxCourse" class="fs-16 mb-0 mt-2">Number of Courses</label>
                  <input type="text" id="maxCourse" class="form-control c-border w-66 h-43"
                    placeholder="Number of Course" v-model="form.max_course" />
                </div>
                <div class="d-flex justify-content-start align-items-center mt-3">
                  <label class="fs-16 mb-0 me-5">Level Course</label>
                  <div v-for="level in courseLevels" :key="level.id_course_level" class="d-flex align-items-center">
                    <div class="form-check ms-42">
                      <input class="form-check-input" type="checkbox" :id="'level' + level.id_course_level"
                        :value="level.id_course_level" v-model="selectedCourseLevels" />
                      <label class="form-check-label" :for="'level' + level.id_course_level"></label>
                    </div>
                    <span class="me-1">{{ level.name }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mb-5">
                <ButtonTransparanComponen class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                  @click="closeAddLevelTeachereModal">Cancel</ButtonTransparanComponen>
                <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16" @click="submitLevelTeacherForm">Save
                </ButtonBiru>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditLevelTeacherModal">
        </div>
        <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="false" @click.self="closeEditLevelTeacherModal">
          <div class="modal-dialog custom-modal-sosmed modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header mb--3">
                <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                  <i class="bi bi-pencil-square me-1"></i>Edit Level Teacher
                </h5>
                <button type="button" class="btn-close fs-12 c-close" @click="closeEditLevelTeacherModal"></button>
              </div>
              <hr class="mt-0">
              <div class="ps-3 pe-4 mt-3 mb-2">
                <div class="d-flex justify-content-between mt-3">
                  <label for="categoryName" class="fs-16 mb-0 mt-2">Nama Level
                    Teacher</label>
                  <input type="text" id="categoryName" class="form-control c-border w-66 h-43"
                    placeholder="Nama level Course" v-model="form.name" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <label for="categoryName" class="fs-16 mb-0 mt-1">Description</label>
                  <textarea class="form-control c-border w-66 rounded-2" id="exampleFormControlTextarea1" rows="2"
                    placeholder="Description" v-model="form.description" required></textarea>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <label for="maxCourse" class="fs-16 mb-0 mt-2">Number of Courses</label>
                  <input type="number" id="maxCourse" class="form-control c-border w-66 h-43"
                    placeholder="Number of Course" v-model="form.max_course" />
                </div>
                <div class="d-flex justify-content-start align-items-center mt-3">
                  <label class="fs-16 mb-0 me-5">Level Course</label>
                  <div v-for="level in courseLevels" :key="level.id_course_level" class="d-flex align-items-center">
                    <div class="form-check ms-42">
                      <input class="form-check-input" type="checkbox" :id="'level' + level.id_course_level"
                        :value="level.id_course_level" v-model="selectedCourseLevels" />
                      <label class="form-check-label" :for="'level' + level.id_course_level"></label>
                    </div>
                    <span class="me-1">{{ level.name }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mb-5">
                <ButtonTransparanComponen class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                  @click="closeEditLevelTeacherModal">Cancel
                </ButtonTransparanComponen>
                <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16" @click="saveUpdateLevelTeacher">Save
                </ButtonBiru>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteLevelTeacherModal">
        </div>
        <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
          aria-labelledby="deleteModalLabel" aria-hidden="true" @click.self="closeDeleteLevelTeacherModal">
          <div class="modal-dialog custom-modal modal-dialog-centered">
            <div class="modal-content pt-3">
              <div class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                <PhTrashSimple :size="50" color="#ff4c4c" />
                <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Level Teacher
                </h5>
                <h5 class="fs-16 fw-light opacity-50">
                  Are you sure you want to delete this Level Teacher? Once deleted,
                  this
                  data
                  cannot be restored.
                </h5>
              </div>
              <div class="d-flex justify-content-center mb-5">
                <ButtonTransparanComponen class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                  @click="closeDeleteLevelTeacherModal">No, Cancel
                </ButtonTransparanComponen>
                <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16" @click="deleteLevelTeacher">Yes, Delete
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
    </div>
  </div>
</template>