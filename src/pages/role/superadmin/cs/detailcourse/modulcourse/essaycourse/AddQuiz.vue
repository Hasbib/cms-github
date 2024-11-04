<script setup>
import ButtonBiru from '@/components/ButtonBiru.vue';
import { ref } from 'vue';

const fileInput = ref(null);

const openFileDialog = () => {
    fileInput.value.click();
};
</script>

<template>
    <div class="mb-3 row">
        <label for="Name" class="col-sm-3 col-form-label fs-16">Name</label>
        <div class="col-sm-9">
            <input type="text" class="form-control fs-16 h-43 rounded-3 bordersa" placeholder="Name Course" />
        </div>
    </div>
    <div class="mb-3 row">
        <label for="description" class="col-sm-3 col-form-label fs-16">Description</label>
        <div class="col-sm-9">
            <textarea class="form-control fs-16 c-border rounded-2" rows="4" placeholder="Write your review"
                required></textarea>
        </div>
    </div>
    <div class="mb-3 row">
        <label for="duadate" class="col-sm-3 col-form-label fs-16">Due date</label>
        <div class="col-sm-9">
            <input type="text" class="form-control fs-16 h-43 rounded-3 bordersa" placeholder="Dua date" />
        </div>
    </div>
    <div class="mb-1 row">
        <label for="timeremaining" class="col-sm-3 col-form-label fs-16">Time remaining</label>
        <div class="col-sm-9">
            <input type="text" class="form-control fs-16 h-43 rounded-3 bordersa" placeholder="Dua date" />
        </div>
    </div>
    <div class="mb-0 row">
        <label for="resource" class="col-sm-3 col-form-label fs-16">Resource</label>
        <div class="col-sm-9">
            <div class="file-upload mt-3 mb-3 c-border" @click="openFileDialog">
                <input type="file" ref="fileInput" class="fp" />
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                        <path
                            d="M 8.5 8 C 6.019 8 4 10.019 4 12.5 L 4 35.5 C 4 37.981 6.019 40 8.5 40 L 39.5 40 C 41.981 40 44 37.981 44 35.5 L 44 17.5 C 44 15.019 41.981 13 39.5 13 L 24.042969 13 L 19.572266 9.2734375 C 18.586266 8.4514375 17.335734 8 16.052734 8 L 8.5 8 z M 24 19 C 24.552 19 25 19.448 25 20 L 25 30.5 C 25 30.538 24.982516 30.570422 24.978516 30.607422 L 28.292969 27.292969 C 28.683969 26.901969 29.316031 26.901969 29.707031 27.292969 C 30.098031 27.683969 30.098031 28.316031 29.707031 28.707031 L 24.707031 33.707031 C 24.512031 33.902031 24.256 34 24 34 C 23.744 34 23.487969 33.902031 23.292969 33.707031 L 18.292969 28.707031 C 17.901969 28.316031 17.901969 27.683969 18.292969 27.292969 C 18.683969 26.901969 19.316031 26.901969 19.707031 27.292969 L 23.021484 30.607422 C 23.017484 30.570422 23 30.538 23 30.5 L 23 20 C 23 19.448 23.448 19 24 19 z M 23.892578 31.478516 L 24 31.585938 L 24.107422 31.478516 C 24.070422 31.482516 24.038 31.5 24 31.5 C 23.962 31.5 23.929578 31.482516 23.892578 31.478516 z">
                        </path>
                    </svg>
                </div>
                <p class="fw-semibold fs-16 opacity-50 mb-0">Drag and drop your
                    files
                    here
                </p>
                <p class="fs-12 opacity-50">or click to select files</p>
            </div>
            <div class="d-flex justify-content-end">
                <ButtonBiru class="ms-3 mb-4 h-43 px-4 rounded-3 fs-16">
                    Submit
                </ButtonBiru>
            </div>
        </div>
    </div>
</template>