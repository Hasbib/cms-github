<template>
    <div class="body-login-profile">
        <div class="col-md-8 offset-md-2">
            <div class="card border-0 p-5 my-5 shadow">
                <div class="d-flex justify-content-start">
                    <div class="position-relative me-3" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                        <img v-if="!imagePreview" src="../../assets/images/profil-bg.png" alt="Profile"
                            class="rounded-circle profil-teacher" />
                        <img v-if="imagePreview" :src="imagePreview" alt="Image Preview"
                            class="rounded-circle profil-teacher" />
                        <input type="file" id="fileInput" class="hidden" accept="image/*" @change="handleFile" />
                        <button type="button" class="btn position-absolute top-50 start-50 translate-middle"
                            @click="triggerFileInput" v-show="isHovered">
                            <i v-if="!imagePreview" class="bi bi-pencil-square"></i>
                        </button>
                    </div>
                    <div class="mt-4 fs-12 opacity-75">
                        <label>Max file size : 2Mb</label> <br>
                        <label>Format : .jpg, .png , .jpeg</label>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="name" class="form-label mb-0 fs-16">Full Name</label>
                            <input type="text" id="name" class="form-control h-45 fs-14"
                                placeholder="Enter your name here">
                        </div>
                        <div class="mb-3">
                            <label for="nohp" class="form-label mb-0 fs-16">No.Telp</label>
                            <input type="text" id="nohp" class="form-control h-45 fs-14"
                                placeholder="Enter your no telepon here">
                        </div>
                        <div class="mb-3">
                            <label for="name5" class="form-label mb-0 fs-16">Teaching experience</label>
                            <div class="custom-select" id="multiSelect2">
                                <div class="form-control d-flex justify-content-between h-45 rounded-3"
                                    id="displayContainer2">
                                    <div class="selected-items-container">
                                        <div id="selectedItemsLeft2" class="selected-items-left"></div>
                                        <div id="moreItemsRight2"></div>
                                    </div>
                                    <span id="placeholder2" class="placeholder-text fs-14">Teaching experience</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-chevron-down mt-2 opacity-50"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="dropdown-options" id="optionsContainer2">
                                    <div class="option-item"><input type="checkbox" value="Vue" /> Vue</div>
                                    <div class="option-item"><input type="checkbox" value="Laravel" /> Laravel</div>
                                    <div class="option-item"><input type="checkbox" value="MySQL" /> MySQL</div>
                                    <div class="option-item"><input type="checkbox" value="PHP" /> PHP</div>
                                    <div class="option-item"><input type="checkbox" value="JavaScript" /> JavaScript
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3" style="margin-top: 60px;">
                            <label for="name6" class="form-label mb-0 fs-16">Afiliator</label>
                            <div class="custom-select" id="multiSelect3">
                                <div class="form-control d-flex justify-content-between h-45 rounded-3"
                                    id="displayContainer3">
                                    <div class="selected-items-container">
                                        <div id="selectedItemsLeft3" class="selected-items-left"></div>
                                        <div id="moreItemsRight3"></div>
                                    </div>
                                    <span id="placeholder3" class="placeholder-text fs-14">Afiliator</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-chevron-down mt-2 opacity-50"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="dropdown-options" id="optionsContainer3">
                                    <div class="option-item"><input type="checkbox" value="Vue" /> Vue</div>
                                    <div class="option-item"><input type="checkbox" value="Laravel" /> Laravel</div>
                                    <div class="option-item"><input type="checkbox" value="MySQL" /> MySQL</div>
                                    <div class="option-item"><input type="checkbox" value="PHP" /> PHP</div>
                                    <div class="option-item"><input type="checkbox" value="JavaScript" /> JavaScript
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="notelepon" class="form-label mb-0 fs-16">Address</label>
                            <input type="text" id="address" class="form-control h-45 fs-14"
                                placeholder="Enter your address here">
                        </div>
                        <div>
                            <label for="name4" class="form-label mb-0 fs-16">Education Level</label>
                            <div class="custom-select" id="multiSelect1">
                                <div class="form-control d-flex justify-content-between h-45 rounded-3"
                                    id="displayContainer1">
                                    <div class="selected-items-container">
                                        <div id="selectedItemsLeft1" class="selected-items-left"></div>
                                        <div id="moreItemsRight1"></div>
                                    </div>
                                    <span id="placeholder1" class="placeholder-text fs-14">Education level</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-chevron-down mt-2 opacity-50"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="dropdown-options" id="optionsContainer1">
                                    <div class="option-item"><input type="checkbox" value="Vue" /> Vue</div>
                                    <div class="option-item"><input type="checkbox" value="Laravel" /> Laravel</div>
                                    <div class="option-item"><input type="checkbox" value="MySQL" /> MySQL</div>
                                    <div class="option-item"><input type="checkbox" value="PHP" /> PHP</div>
                                    <div class="option-item"><input type="checkbox" value="JavaScript" /> JavaScript
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3" style="margin-top: 60px;">
                            <label for="name6" class="form-label mb-0 fs-16">Areas of expertise</label>
                            <div class="custom-select" id="multiSelect4">
                                <div class="form-control d-flex justify-content-between h-45 rounded-3"
                                    id="displayContainer4">
                                    <div class="selected-items-container">
                                        <div id="selectedItemsLeft4" class="selected-items-left"></div>
                                        <div id="moreItemsRight4"></div>
                                    </div>
                                    <span id="placeholder4" class="placeholder-text fs-14">Areas of expertise</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-chevron-down mt-2 opacity-50"
                                            viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="dropdown-options" id="optionsContainer4">
                                    <div class="option-item"><input type="checkbox" value="Vue" /> Vue</div>
                                    <div class="option-item"><input type="checkbox" value="Laravel" /> Laravel</div>
                                    <div class="option-item"><input type="checkbox" value="MySQL" /> MySQL</div>
                                    <div class="option-item"><input type="checkbox" value="PHP" /> PHP</div>
                                    <div class="option-item"><input type="checkbox" value="JavaScript" /> JavaScript
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-5">
                    <div class="mt-3">
                        <label for="categoryName" class="fs-16 mb-0 me-60 mt--85">Portofolio</label>
                        <div>
                            <div class="d-flex justify-content-center">
                                <img v-if="imagePreview1" :src="imagePreview1" alt="Image Preview"
                                    class="img-fluid mb-2 rounded-2"
                                    style="max-height: 100px; max-width: 150px; display: block;">
                            </div>
                            <input type="file" id="fileInput1" class="hidden" accept="image/*"
                                @change="handleFileUpload1" />
                            <button type="button" class="btn btn-border opacity-75 px-5 py-2 mt-0 mb-1"
                                onclick="document.getElementById('fileInput1').click();">
                                Upload
                            </button>
                            <div class="opacity-75 fs-12">
                                <p class="mb-0">Max file size : 15Mb</p>
                                <p>Format : .pdf, .jpg, .png, <br> .jpeg</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="categoryName" class="fs-16 mb-0 me-60 mt--85">Verifikasi Identitas</label>
                        <div>
                            <div class="d-flex justify-content-center me-5">
                                <img v-if="imagePreview2" :src="imagePreview2" alt="Image Preview"
                                    class="img-fluid mb-2 rounded-2 me-2"
                                    style="max-height: 100px; max-width: 105px; display: block;">
                            </div>
                            <input type="file" id="fileInput2" class="hidden" accept="image/*"
                                @change="handleFileUpload2" />
                            <button type="button" class="btn btn-border opacity-75 px-5 py-2 mt-0 mb-1"
                                onclick="document.getElementById('fileInput2').click();">
                                Upload
                            </button>
                            <div class="opacity-75 fs-12">
                                <p class="mb-0">Max file size : 15Mb</p>
                                <p>Format : .pdf, .jpg, .png, <br> .jpeg</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="categoryName" class="fs-16 mb-0 me-60 mt--85">Sertifikat</label>
                        <div>
                            <div class="d-flex justify-content-center">
                                <img v-if="imagePreview3" :src="imagePreview3" alt="Image Preview"
                                    class="img-fluid mb-2 rounded-2"
                                    style="max-height: 100px; max-width: 150px; display: block;">
                            </div>
                            <input type="file" id="fileInput3" class="hidden" accept="image/*"
                                @change="handleFileUpload3" />
                            <button type="button" class="btn btn-border opacity-75 px-5 py-2 mt-0 mb-1"
                                onclick="document.getElementById('fileInput3').click();">
                                Upload
                            </button>
                            <div class="opacity-75 fs-12">
                                <p class="mb-0">Max file size : 15Mb</p>
                                <p>Format : .pdf, .jpg, .png, <br> .jpeg</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonBiru class="fs-16 h-43 mt-4">Submit</ButtonBiru>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import { ref } from 'vue';

const isHovered = ref(false);
const imagePreview1 = ref(null);
const imagePreview2 = ref(null);
const imagePreview3 = ref(null);
const imagePreview = ref(null);

const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const triggerFileInput = () => {
    document.getElementById('fileInput').click();
};
const handleFileUpload1 = (event) => {
    const file = event.target.files[0];
    if (file) {
        imagePreview1.value = URL.createObjectURL(file);
    } else {
        imagePreview1.value = null;
    }
};
const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    if (file) {
        imagePreview2.value = URL.createObjectURL(file);
    } else {
        imagePreview2.value = null;
    }
};
const handleFileUpload3 = (event) => {
    const file = event.target.files[0];
    if (file) {
        imagePreview3.value = URL.createObjectURL(file);
    } else {
        imagePreview3.value = null;
    }
};

onMounted(() => {
    // Array of multi-select elements for each education level
    const educationLevels = [1, 2, 3, 4];

    educationLevels.forEach((level) => {
        const displayContainer = document.getElementById(`displayContainer${level}`);
        const optionsContainer = document.getElementById(`optionsContainer${level}`);
        const checkboxes = document.querySelectorAll(`#optionsContainer${level} input[type="checkbox"]`);
        const placeholder = document.getElementById(`placeholder${level}`);

        displayContainer.addEventListener('click', () => toggleDropdown(level));
        checkboxes.forEach((checkbox) => checkbox.addEventListener('change', () => updateSelection(level)));

        function toggleDropdown() {
            optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
        }

        function updateSelection(level) {
            const selectedValues = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

            const selectedItemsLeft = document.getElementById(`selectedItemsLeft${level}`);
            const moreItemsRight = document.getElementById(`moreItemsRight${level}`);

            selectedItemsLeft.innerHTML = '';
            moreItemsRight.innerHTML = '';

            if (selectedValues.length > 2) {
                const firstTwo = selectedValues.slice(0, 2);
                const moreCount = selectedValues.length - 2;

                firstTwo.forEach((value) => {
                    const span = document.createElement('span');
                    span.className = 'highlighted-text';
                    span.textContent = value;
                    selectedItemsLeft.appendChild(span);
                });

                const moreText = document.createElement('span');
                moreText.className = 'highlighted-text';
                moreText.textContent = `${moreCount} More`;
                moreItemsRight.appendChild(moreText);
            } else {
                selectedValues.forEach((value) => {
                    const span = document.createElement('span');
                    span.className = 'highlighted-text';
                    span.textContent = value;
                    selectedItemsLeft.appendChild(span);
                });
            }

            if (selectedValues.length > 0) {
                displayContainer.classList.add('selected');
                placeholder.style.display = 'none';
            } else {
                displayContainer.classList.remove('selected');
                placeholder.style.display = 'inline';
            }
        }

        document.addEventListener('click', function (event) {
            if (!document.getElementById(`multiSelect${level}`).contains(event.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    });
});
</script>

<style>
.hidden {
    display: none;
}

.custom-select {
    position: absolute;
    width: 43%;
    cursor: pointer;
}

.dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) !important;
    display: none;
    z-index: 1;
}

.option-item {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.option-item:hover {
    background-color: #f0f0f0;
}

.option-item input[type='checkbox'] {
    margin-right: 10px;
    accent-color: #0D92F4;
}

.selected {
    color: rgb(0, 0, 0);
}

.highlighted-text {
    color: #303030;
    background-color: #F4F7FE;
    padding: 2px 5px;
    border-radius: 3px;
    margin-right: 3px;
}

/* Container for selected items and "More" text */
.selected-items-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.selected-items-left {
    display: flex;
    gap: 5px;
}

.placeholder-text {
    position: absolute;
    left: 10px;
    color: #a9a9a9;
    font-size: 14px;
    margin-top: 5px;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
</style>