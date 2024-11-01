<script setup>
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
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
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="card rounded-2 p-4 border-0">
                            <h5 class="fw-light fs-16">Digitefa/Course Manajemen</h5>
                            <h4 class="fs-24">Course Manajemen</h4>
                            <div class="d-flex justify-content-end">
                                <!-- <div class="search-input w-50 me-md-1">
                                    <input type="text" class="form-control rounded-3 h-45 c-border"
                                        v-model="searchQuery" placeholder="Search" />
                                    <i class="bi bi-search"></i>
                                </div> -->
                                <select class="form-select w-15 c-border ms-2 h-45 c-border">
                                    <option selected>Sort</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                                <ButtonBiru class="ms-3 mb-4 h-45 px-3 rounded-3 fs-16">
                                    Add Course
                                </ButtonBiru>
                            </div>

                            <div class="col-md-12 mt-4 mt-md-0">
                                <div class="table-responsive">
                                    <table class="table custom-table rounded-4">
                                        <thead class="thead-custom">
                                            <tr class="ps-4">
                                                <th class="ps-3 fs-16 fw-light w-1">No</th>
                                                <th class="fs-16 fw-light w-400">Name Course</th>
                                                <th class="fs-16 fw-light w-200">Teacher</th>
                                                <th class="ps-4 fs-16 fw-light w-10">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-custom">
                                            <tr>
                                                <td class="ps-4 pt-4">1</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img src="../../../assets/images/bg-7.png" class="rounded me-3"
                                                            alt="Course Image" width="88px" height="56px" />
                                                        <div class="ms-0">
                                                            <h6 class="mb-1 fs-16 fw-medium">Dasar Pemrograman Web</h6>
                                                            <p class="mb-0 text-muted fs-12">Materi pembelajaran
                                                                mengenai
                                                                pembuatan</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="pt-4"> Dika Prabowo</td>
                                                <td class="ps-4 pt-4">
                                                  <button class="border-0 rounded-2" style="background-color: #FF0000; height: 30px; width: 30px; color:white;">
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
                                                                    class="form-select w-auto bg-none">
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="50">50</option>
                                                                </select>
                                                            </div>
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
    </div>
</template>