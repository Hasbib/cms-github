<script setup>
import ButtonBiru from '@/components/ButtonBiru.vue';
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const isSidebarVisible = ref(true);
const isEditing = ref(false);
const content = ref(`
    <ol>
        <li>
            Acceptance of Terms<br>
            By creating an account, you agree to comply with and be bound by the following terms and conditions. These terms apply to all users of the platform.
        </li>
        <br>
        <li>
            Account Registration<br>
            You must provide accurate and complete information during the registration process. You are responsible for keeping your login credentials secure and confidential. Any activity under your account is your responsibility.
        </li>
        <br>
        <li>
            Privacy Policy<br>
            We are committed to protecting your privacy. All personal information collected during the registration process will be handled in accordance with our Privacy Policy.
        </li>
        <br>
        <li>
            Use of Platform<br>
            You agree to use the platform for lawful purposes only. You may not use it for fraudulent or illegal activities, or to distribute harmful content.
        </li>
        <br>
        <li>
            Intellectual Property<br>
            All content provided on the platform is the intellectual property of the company and its licensors. Unauthorized use, distribution, or reproduction is strictly prohibited.
        </li>
        <br>
        <li>
            Account Termination<br>
            We reserve the right to suspend or terminate your account at our discretion if any violation of these terms occurs.
        </li>
        <br>
        <li>
            Changes to Terms<br>
            We may update these terms from time to time, and it is your responsibility to review them periodically. Continued use of the platform constitutes acceptance of the updated terms.
        </li>
    </ol>
`);

const quill = ref(null);

const updateSidebarVisibility = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

const initializeQuillEditor = async () => {
    await nextTick();
    const editor = document.querySelector('#editor');
    if (editor) {
        quill.value = new Quill(editor, {
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            },
            placeholder: 'Edit content here...',
            theme: 'snow',
        });

        quill.value.root.innerHTML = content.value;
    } else {
        console.error("Editor element not found for Quill initialization.");
    }
};

const saveContent = () => {
    content.value = quill.value.root.innerHTML;
    isEditing.value = false;
};

const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

onMounted(() => {
    updateSidebarVisibility();
    window.addEventListener('resize', updateSidebarVisibility);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSidebarVisibility);
});

watch(isEditing, (newValue) => {
    if (newValue) {
        initializeQuillEditor();
    }
});
</script>

<template>
    <div class="navbg-sa">
        <NavbarSA />
        <SidebarSA v-if="isSidebarVisible" class="sidebar" />
        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div v-if="!isEditing">
                            <div class="card rounded-3 p-4 border-0">
                                <h5 class="fw-light fs-16">Digitefa/Master Data/Terms & Conditions</h5>
                                <h4 class="fs-24">Terms & Conditions</h4>
                                <div class="d-flex justify-content-end">
                                    <ButtonBiru @click="toggleEditMode" class="fs-16 px-3 rounded-3 h-43 mb-3">
                                        <i class="bi bi-pencil-square me-1"></i> Edit Terms & Conditions
                                    </ButtonBiru>
                                </div>
                                <div class="card bordersa p-4" v-html="content"></div>
                            </div>
                        </div>
                        <div v-else class="card rounded-3 p-4 border-0">
                            <h3 class="fs-24 mb-4">Edit Terms & Conditions</h3>
                            <div id="editor" ref="editor"></div>
                            <div class="d-flex justify-content-end">
                                <ButtonBiru @click="saveContent" class="ms-3 my-3 h-45 px-4 rounded-3 fs-16">
                                    Save
                                </ButtonBiru>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
