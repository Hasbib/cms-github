<template>
    <div>
        <div v-for="(card, index) in cards" :key="index" class="card p-3 card-abu-muda mb-3">
            <div class="d-flex justify-content-center gap-3">
                <input type="text" class="form-control fs-16 h-43 rounded-3 bordersa" placeholder="Name Course" />
                <i class="bi bi-image fs-25 mt-1"></i>
                <select class="form-select w-66 c-border h-43 ms-2" v-model="card.selectedType">
                    <option value="multipleChoice" selected>Pilihan Ganda</option>
                    <option value="essay">Essay</option>
                </select>
            </div>
            <div>
                <div v-if="card.selectedType === 'multipleChoice'">
                    <div v-for="(option, idx) in card.options" :key="idx" class="form-check mt-2">
                        <input class="form-check-input" type="radio" :name="'exampleRadios' + index"
                            :id="'exampleRadios' + idx" :value="option">
                        <label class="form-check-label" :for="'exampleRadios' + idx">
                            {{ option }}
                        </label>
                    </div>
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="radio" :name="'exampleRadios' + index" id="addOption"
                            value="addOption" @click="addOption(index)">
                        <label class="form-check-label" for="addOption">
                            Tambah Opsi
                        </label>
                    </div>
                </div>
                <div v-else-if="card.selectedType === 'essay'" class="mt-3">
                    <textarea class="form-control fs-16 c-border rounded-2" rows="4" placeholder="Write your review"
                        required></textarea>
                </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between fs-16">
                <div class="d-flex justify-content-start gap-3">
                    <i class="bi bi-clipboard2-check"></i>
                    <label for="kuncijawaban">Kunci Jawaban</label>
                </div>
                <div class="d-flex justify-content-end gap-3">
                    <i class="bi bi-copy"></i>
                    <i class="bi bi-trash"></i>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <button class="rounded-3 border-0 card-abu-muda btn-plus" @click="addCard">
                <i class="bi bi-plus fs-30"></i>
            </button>
        </div>
        <div class="d-flex justify-content-end mt-2">
            <ButtonBiru class="fs-16 py-2 px-4">Submit</ButtonBiru>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonBiru from '@/components/ButtonBiru.vue';

const cards = ref([
    {
        options: ['Opsi 1'],
        selectedType: 'multipleChoice'
    }
]);

const addOption = (index) => {
    const newOption = `Opsi ${cards.value[index].options.length + 1}`;
    cards.value[index].options.push(newOption); 
};

const addCard = () => {
    cards.value.push({
        options: ['Opsi 1'],
        selectedType: 'multipleChoice'
    });
};
</script>
