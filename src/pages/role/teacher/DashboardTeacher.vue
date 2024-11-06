<script setup>
import { ref, computed,onUnmounted, onMounted  } from 'vue';
import NavbarTeacher from '@/layout/NavbarTeacher.vue';
import SidebarTeacher from '@/layout/SidebarTeacher.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import ButtonSuccess from '@/components/ButtonSuccess.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { course } from '@/data/index.js';

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 4;
const isSidebarVisible = ref(true);

const filteredData = computed(() => {
    return course.filter(c =>
        c.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.deskripsi.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.value.slice(start, end);
});

const changePage = (pageNumber) => {
    currentPage.value = pageNumber;
};

const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage);
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
    <div class="navbg-teacher" style="background-color: #5527ff;">
        <!-- NAVBAR START -->
        <NavbarTeacher />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarTeacher v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentte">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-4 mt-4 mt-md-0">
                        <div class="card rounded-4 p-25 border-0 bg-pie">
                            <div>
                                <h5 class="fw-semibold mb-3">Overview</h5>
                                <div class="ul">
                                    <ul class="card-text fs-16 fw-light">
                                        <li class="mb-1">
                                            <span class="platform">Student</span>
                                            <span class="separator">:</span>
                                            <a class="garis- text-dark" href="#">1.928</a>
                                        </li>
                                        <li class="mb-1">
                                            <span class="platform">Course</span>
                                            <span class="separator">:</span>
                                            <a class="garis- text-dark" href="#">10</a>
                                        </li>
                                        <li class="mb-1">
                                            <span class="platform">Rating</span>
                                            <span class="separator">:</span>
                                            <a class="garis- text-dark" href="#">
                                                <i class="bi bi-star-fill color-start"></i>
                                                4.8</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card rounded-4 p-25 border-0">
                            <div class="d-flex justify-content-between mb-5">
                                <div>
                                    <h5 class="fw-semibold fs-24 mb-1">Statistik</h5>
                                    <p class="opacity-50 fs-12 mb-0">course</p>
                                    <div class="d-flex align-items-center mt-0">
                                        <div class="d-flex align-items-center me-3">
                                            <div class="reminder-student">
                                            </div>
                                            <span class="fs-12">Student</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="reminder-rating">
                                            </div>
                                            <span class="fs-12">Rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="colors-example-2">
                                <table class="charts-css column hide-data data-spacing-3">
                                    <tbody>
                                        <tr>
                                            <td style="--size: 0.5; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 1; --color: #fdc04e; margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #fdc04e; margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.9; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.3; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.3; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 1; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.5; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 1; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.9; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td style="--size: 0.3; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.3; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 1; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.6; --color: #5527ff; margin-right: -2px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="--size: 0.8; --color: #fdc04e;  margin-left: -4px !important; margin-right: 6px !important;"
                                                class="rounded-5">
                                                <div class="tooltip">75 student</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="month-labels">
                                    <span>1 Jan</span>
                                    <span>2 Jan</span>
                                    <span>3 Jan</span>
                                    <span>4 Jan</span>
                                    <span>5 Jan</span>
                                    <span>6 Jan</span>
                                    <span>7 Jan</span>
                                    <span>8 Jan</span>
                                    <span>9 Jan</span>
                                    <span>10 Jan</span>
                                    <span>11 Jan</span>
                                    <span>12 Jan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 dashboard">
                        <div class="card rounded-4 p-25 border-0">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h5 class="fw-semibold fs-24 mb-1 ms-2">Course</h5>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <div class="search-input w-50 me-md-4 me-2 h-43">
                                        <SearchComponent placeholder="Search" :customClass="'h-40'" />
                                    </div>
                                    <div class="dropdown me-md-2">
                                        <button
                                            class="btn dropdown-toggle dropdown-toggle-custom2 border-0 opacity-75 fs-12 h-40 w-130 d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Kategori
                                            <i class="bi bi-chevron-down"></i>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><a class="dropdown-item fs-12" href="#">Kategori 1</a></li>
                                            <li><a class="dropdown-item fs-12" href="#">Kategori 2</a></li>
                                            <li><a class="dropdown-item fs-12" href="#">Kategori 3</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table align-middle mb-0 bg-white rounded">
                                    <thead class="bg-light">
                                        <tr>
                                            <th class="fs-16 fw-medium">Courses Name</th>
                                            <th class="fs-16 fw-medium">Active Student</th>
                                            <th class="fs-16 fw-medium">Recent Activities</th>
                                            <th class="fs-16 fw-medium text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(course, index) in paginatedData" :key="index">
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img :src="course.image" class="rounded me-3" alt="Course Image"
                                                        width="88px" height="56px" />
                                                    <div class="ms-0">
                                                        <h6 class="mb-1 fs-16 fw-medium">{{ course.title }}</h6>
                                                        <p class="mb-0 text-muted fs-12">{{ course.deskripsi }}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <span class="fs-16 fw-light">{{ course.active }}</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="fs-16 fw-light">{{ course.recent }}</span>
                                            </td>
                                            <td class="text-center">
                                                <ButtonSuccess class="fs-12 rounded-3 h-37 w-110">View
                                                </ButtonSuccess>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col text-center mt-4 mb--6">
                                    <PaginationComponent :currentPage="currentPage" :totalPages="totalPages"
                                        @page-change="changePage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>