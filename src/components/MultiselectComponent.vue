<template>
    <div class="multiselect-component">
      <div
        class="multiselect-container form-control h-43 opacity-75 rounded-3 c-border"
        @click="toggleDropdown"
        :class="{ 'focused': isOpen }"
        tabindex="0"
      >
        <div class="selected-items">
          <span v-for="(item, index) in visibleSelectedItems" :key="index" class="selected-item">
            {{ item.label }}
            <span class="remove-item" @click.stop="removeItem(item)">×</span>
          </span>
          <span v-if="remainingItemCount > 0" class="more-items">
            +{{ remainingItemCount }} More
          </span>
        </div>
        <div v-if="!selectedItems.length && placeholderText" class="placeholder-and-arrow">
            <!-- Placeholder -->
            <span class="placeholder">
            {{ placeholderText }}
            </span>

            <!-- Arrow -->
            <span class="arrow">    
            <i class="bi-chevron-down"></i>
            </span>
        </div>
        <!-- Arrow -->
        <span v-if="selectedItems.length && placeholderText" class="arrow">    
            <i class="bi-chevron-down"></i>
            </span>
      </div>
      <div v-if="isOpen" class="dropdown">
        <input type="text" v-model="searchTerm" placeholder="Search..." class="search-input" />
        <ul>
          <li
            v-for="item in filteredOptions"
            :key="item.value"
            :class="{ 'is-selected': isSelected(item) }"
            @click="toggleSelection(item)"
          >
            <input type="checkbox" class="form-check-input mt--3 me-3" :checked="isSelected(item)" />
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  
  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  });
  
  const isOpen = ref(false);
  const selectedItems = ref([]);
  const searchTerm = ref('');
  
  const placeholderText = computed(() => props.placeholder);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const isSelected = (item) => selectedItems.value.some((selected) => selected.value === item.value);
  
  const toggleSelection = (item) => {
    if (isSelected(item)) {
      selectedItems.value = selectedItems.value.filter((selected) => selected.value !== item.value);
    } else {
      selectedItems.value.push(item);
    }
  };
  
  const removeItem = (item) => {
    selectedItems.value = selectedItems.value.filter((selected) => selected.value !== item.value);
  };
  
  const filteredOptions = computed(() => {
    return props.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const visibleSelectedItems = computed(() => {
    return selectedItems.value.slice(0, 2);
  });
  
  const remainingItemCount = computed(() => {
    return selectedItems.value.length > 2 ? selectedItems.value.length - 2 : 0;
  });

  const handleClickOutside = (event) => {
  const multiselectElement = document.querySelector('.multiselect-component');
    if (multiselectElement && !multiselectElement.contains(event.target)) {
        isOpen.value = false;
    }
    };

    onMounted(() => {
    window.addEventListener('click', handleClickOutside);
    });

    // Hapus event listener ketika komponen dihancurkan
    onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
    });
  </script>
  
  <style scoped>
  .multiselect-component {
    width: 100%;
    position: relative;
    }

  .multiselect-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    width: 50%;
    height: 43px;
    position: relative;
  }
  
  .selected-items {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    flex: 1;
  }
  
  .selected-item {
    background-color: rgba(231, 244, 254, 0.8);
    color: #0f2239;
    padding: 4px 8px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  
  .remove-item {
    margin-left: 4px;
    cursor: pointer;
    color: #007bff;
  }

  .placeholder-and-arrow {
    display: flex;
    justify-content: space-between;
    width: 100%;
    }
  
  .placeholder {
    color: #0f2239;
    font-size: 16px;
    margin-right: auto; /* Memastikan placeholder tetap berada di sebelah kiri */
    display: flex;
    min-height: auto;
    vertical-align: baseline;
    cursor: default !important; /* Menghilangkan tanda tunggu */
    background-color: transparent !important;
    opacity: 1 !important;
    }
  
  .arrow {
    display: flex;
    align-items: center;
  }
  
  .more-items {
    background-color: rgba(231, 244, 254, 0.8);
    color: #0f2239;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 16px;
    margin-left: auto;
    margin-right: 8px;
  }
  
  .dropdown {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
    margin-top: 4px;
    padding: 8px;
  }
  
  .dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .dropdown li {
    padding: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .dropdown li.is-selected {
    background-color: rgba(231, 244, 254, 0.8);
  }
  
  .dropdown li input[type='checkbox'] {
    margin-right: 8px;
    transform: scale(1.5);
  }
  
  .search-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  