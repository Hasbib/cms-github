
<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import ButtonBiru from '@/components/ButtonBiru.vue';

const dropdownVisible = ref(false);
const dropdownPosition = ref({ top: '0px', left: '0px' });
const showButtons = ref(false);
const currentPage = inject('currentPage');

const showDropdownMenu = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    dropdownPosition.value = {
        top: `${buttonRect.bottom}px`,
        left: `${buttonRect.left - 130}px`
    };
    dropdownVisible.value = true;
};

const hideDropdownMenu = () => {
    dropdownVisible.value = false;
};

const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
        hideDropdownMenu();
    }
};

const showAddVideoPage = () => {
    currentPage.value = 'addVideo';
};
const showAddEssayPage = () => {
    currentPage.value = 'addEssay';
};
const showAddAssementPage = () => {
    currentPage.value = 'addAssement';
};

const toggleButtons = () => {
    showButtons.value = !showButtons.value;
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="rounded-3 w-100 c-border h-43 d-flex align-items-center justify-content-between ps-2 fs-14">
        <span>Content goes here</span>
        <div class="dropdown-container ps-2">
            <button class="btn border-0 dropdown-toggle" type="button" @click="showDropdownMenu">
                <p class="bi bi-three-dots-vertical" style="margin-bottom: -8px; margin-top: -5px;"></p>
            </button>
            <ul v-if="dropdownVisible" class="fixed-dropdown dropdown-menu" style="display: block"
                :style="{ top: dropdownPosition.top, left: dropdownPosition.left }">
                <h5 class="ms-3 fs-16 fw-normal">Action</h5>
                <li>
                    <a class="dropdown-item fw-normal fs-16" href="#">
                        <i class="bi bi-file-earmark-plus me-1 fs-16"></i>
                        Edit
                    </a>
                </li>
                <li>
                    <a class="dropdown-item fw-normal" href="#">
                        <i class="bi bi-trash me-1 fs-16"></i>
                        Delete
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div v-if="showButtons" class="d-flex justify-content-center gap-2 h-43 mt-3">
        <ButtonBiru @click="showAddVideoPage">+ Tambah Video</ButtonBiru>
        <ButtonBiru @click="showAddEssayPage">+ Tambah Essay</ButtonBiru>
        <ButtonBiru @click="showAddAssementPage">+ Tambah Assement</ButtonBiru>
    </div>

    <button class="bg-none rounded-3 w-100 h-43 d-flex align-items-center ps-2 fs-14 border-spasi mt-3 gap-2"
        @click="toggleButtons">
        <i class="bi bi-file-earmark-plus-fill"></i>
        <span>Add Modul</span>
    </button>
</template>
