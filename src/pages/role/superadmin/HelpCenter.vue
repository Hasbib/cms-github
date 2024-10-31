<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const categoryData = ref([]); // Menyimpan data kategori
const form = ref({
    name: '',         // Nama skill
    id_category: ''   // ID kategori yang dipilih
});

// Fungsi untuk mengambil data kategori dari API
const fetchCategoryData = async () => {
    try {
        const response = await axios.get('/categories');
        categoryData.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Fungsi untuk menambahkan skill
const submitSkillForm = async () => {
    try {
        const response = await axios.post('/skills', form.value);
        console.log(response.data.message);
        
        // Reset form setelah sukses menambahkan skill
        form.value.name = '';
        form.value.id_category = '';
        
        router.push('/master-data/skill');
    } catch (error) {
        console.error('Error adding skill:', error);
    }
};

// Ambil data kategori saat komponen di-mount
fetchCategoryData();
</script>

<template>
    <div class="ps-3 mt-3 mb-2">
        <div class="d-flex align-items-center">
            <label for="categorySelect" class="me-3 fs-16 mb-0">Select Category</label>
            <select id="categorySelect" class="form-select w-25 c-border ms-2" v-model="form.id_category">
                <option disabled value="">Select Category</option>
                <option v-for="category in categoryData" :key="category.id_category" :value="category.id_category">
                    {{ category.name }}
                </option>
            </select>
        </div>
        
        <div class="d-flex align-items-center mt-3">
            <label for="skillName" class="me-5 fs-16 mb-0">Skill Name</label>
            <input type="text" id="skillName" class="form-control w-66 h-43 ms-3"
                   placeholder="Enter skill name" v-model="form.name" />
        </div>
    </div>

    <div class="d-flex justify-content-center mb-5">
        <ButtonTransparanComponen
            class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16 fw-medium"
            @click="closeAddCategoryModal">Cancel</ButtonTransparanComponen>
        <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16 fw-medium"
            @click="submitSkillForm">Save</ButtonBiru>
    </div>
</template>
