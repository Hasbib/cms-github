<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const isSidebarVisible = ref(true);
const isEditing = ref(false);
const quill = ref(null);

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});

watch(isEditing, async (newValue) => {
    if (newValue) {
        await nextTick();

        const fontSizeArr = [];
        for (let i = 8; i <= 72; i += 2) {
            fontSizeArr.push(`${i}px`);
        }

        const Size = Quill.import('attributors/style/size');
        Size.whitelist = fontSizeArr;
        Quill.register(Size, true);

        const toolbarOptions = [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image'],
            [{ font: [] }, { size: fontSizeArr }],
            [{ background: [] }, { color: [] }],
            [{ script: 'sub' }],
            [{ script: 'super' }],
            ['clean'],
        ];

        const editorElement = document.querySelector('#editor');
        if (editorElement) {
            quill.value = new Quill(editorElement, {
                modules: {
                    toolbar: toolbarOptions,
                },
                theme: 'snow',
            });
        }
    }
});

const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

const saveChanges = () => {
    isEditing.value = false;
};
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
                        <!-- View Mode -->
                        <div v-if="!isEditing">
                            <div class="card rounded-2 p-4 border-0">
                                <h5 class="fw-light fs-16">Digitefa/CMS/ About Us Content</h5>
                                <h4 class="fs-24">About Us Content</h4>
                                <div class="d-flex justify-content-end">
                                    <ButtonBiru @click="toggleEditMode" class="ms-3 mb-4 h-45 px-3 rounded-3 fs-16">
                                        <i class="bi bi-pencil-square me-1 fs-16"></i>
                                        Edit About Us
                                    </ButtonBiru>
                                </div>
                                <div class="card bordersa p-4">
                                    <h4 class="fs-40 mb-3">About Us</h4>
                                    <h4 class="fs-40">Digitefa: Solusi E-Learning untuk <br />Mengembangkan Karier dan
                                        Potensimu</h4>
                                    <p class="fs-16">Digitefa hadir sebagai platform e-learning yang berfokus untuk
                                        membantumu berkembang
                                        dengan keterampilan yang relevan di dunia industri dan teknologi. Kami percaya
                                        bahwa
                                        pendidikan berkualitas harus dapat diakses oleh semua orang, sehingga kamu bisa
                                        mencapai tujuan kariermu dengan lebih percaya d</p>
                                </div>
                            </div>
                        </div>

                        <!-- Edit Mode -->
                        <div v-else>
                            <div class="card rounded-2 p-4 border-0">
                                <h4 class="fs-24 mb-4">Edit About Us Content</h4>
                                <form>
                                    <div id="editor">
                                        <p>Hello World!</p>
                                        <p>Some initial <strong>bold</strong> text</p>
                                        <p><br /></p>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <ButtonBiru @click="saveChanges" class="ms-3 my-4 h-45 px-3 rounded-3 fs-16">
                                            Save
                                        </ButtonBiru>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
/* Customize toolbar labels for font sizes */
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='8px']::before {
    content: '8';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
    content: '10';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
    content: '12';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
    content: '14';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
    content: '16';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
    content: '18';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
    content: '20';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='22px']::before {
    content: '22';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
    content: '24';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='26px']::before {
    content: '26';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='28px']::before {
    content: '28';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='30px']::before {
    content: '30';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='32px']::before {
    content: '32';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='34px']::before {
    content: '34';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before {
    content: '36';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='38px']::before {
    content: '38';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='40px']::before {
    content: '40';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='42px']::before {
    content: '42';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='44px']::before {
    content: '44';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='46px']::before {
    content: '46';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='48px']::before {
    content: '48';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='50px']::before {
    content: '50';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='52px']::before {
    content: '52';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='54px']::before {
    content: '54';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='56px']::before {
    content: '56';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='58px']::before {
    content: '58';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='60px']::before {
    content: '60';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='62px']::before {
    content: '62';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='64px']::before {
    content: '64';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='66px']::before {
    content: '66';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='68px']::before {
    content: '68';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='70px']::before {
    content: '70';
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='72px']::before {
    content: '72';
}
</style>