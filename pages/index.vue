<template>
  <div class="h-dvh bg-white flex items-center justify-center p-4 overflow-hidden">
    <!-- Loading Animation -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="relative">
        <!-- 3D Rotating Logo Container -->
        <div class="logo-container">
          <img 
           src="~/assets/hc.png"
            class="h-40 w-40 object-contain "
            alt="Logo" 
          />
        </div>
        
        <!-- Loading Text -->
        <div class="mt-8 text-center">
          <h2 class="text-2xl font-bold text-green-500 tracking-wider loading-text">
            សូមស្វាគមន៍
          </h2>
          <div class="flex justify-center mt-4">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Form (Hidden during loading) -->
    <div 
      v-else
      class="w-full max-w-2xl rounded-2xl backdrop-blur-lg  bg-green-900  shadow-2xl overflow-hidden transform transition-all duration-700"
      :class="{'opacity-0 scale-95': isLoading, 'opacity-100 scale-100': !isLoading}"
    >
      <!-- Logo Section -->
      <div class="flex justify-center pt-2 pb-3 relative">
        <img src="~/assets/hc.png" class="h-24 md:h-32 drop-shadow-xl" alt="Logo" />
        <div class="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
      </div>

      <!-- Form Content -->
      <div class="px-6 pb-8">
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Name Input -->
          <div class="group">
            <label class="block text-white text-sm font-medium mb-2">ឈ្មោះ-Name</label>
            <div class="relative">
              <input 
                type="text" 
                v-model="form.name" 
                class="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-200/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="បញ្ជូលឈ្មោះរបស់អ្នក"
              />
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
            </div>
          </div>

          <!-- Phone Input -->
          <div class="group">
            <label class="block text-white text-sm font-medium mb-2">លេខទូរស័ព្ទ-Phone</label>
            <div class="relative">
              <input 
                type="text" 
                v-model="form.phone" 
                class="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-200/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="បញ្ជូលលេខទូរស័ព្ទរបស់អ្នក"
              />
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
            </div>
          </div>

          <!-- Role Select -->
          <div class="group">
            <label class="block text-white text-sm font-medium mb-2">តួនាទី-Role</label>
            <div class="relative">
              <select
                v-model="form.role"
                class="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="" disabled class="bg-indigo-900 text-white">Select a role...</option>
                <option
                  v-for="role in roles"
                  :key="role.name"
                  :value="role.name"
                  class="bg-indigo-900 text-white"
                >
                  {{ role.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-5 w-5 text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
            </div>
          </div>

          <!-- Address Select -->
          <div class="group">
            <label class="block text-white text-sm font-medium mb-2">អាស័យដ្ឋាន-Address</label>
            <div class="relative">
              <select
                v-model="form.address"
                class="w-full px-4 py-3 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
              >
                <option
                  v-for="province in provinces"
                  :key="province.name"
                  :value="province.name"
                  class="bg-indigo-900 text-white"
                >
                  {{ province.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-5 w-5 text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="group">
            <label class="block text-white text-sm font-medium mb-2">ភេទ-Gender</label>
            <div class="flex space-x-6">
              <label class="relative flex items-center p-3 rounded-lg border border-purple-300/30 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                  v-model="form.gender"
                  value="man"
                />
                <span class="ml-2 text-white">ប្រុស</span>
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
              </label>
              <label class="relative flex items-center p-3 rounded-lg border border-purple-300/30 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                  v-model="form.gender"
                  value="woman"
                />
                <span class="ml-2 text-white">ស្រី</span>
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
              </label>
              <label class="relative flex items-center p-3 rounded-lg border border-purple-300/30 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                  v-model="form.gender"
                  value="other"
                />
                <span class="ml-2 text-white">ផ្សេងៗ</span>
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none"></div>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              type="submit" 
              class="w-full py-3 px-4 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center"
            >
              <span>Submit</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
const { $swal }: any = useNuxtApp();

const isLoading = ref(true);
const flipCard = ref(false);
const roles = ref<Array<{ name: string }>>([
  { name: 'អ្នករកស៊ី' },
  { name: 'បុគ្គលិក' },
  { name: 'សិស្ស' },
]);
const provinces = ref<Array<{ name: string }>>([
  { name: 'ភ្នំពេញ-Phnom Penh' },
  { name: 'កំពត-Kampot' },
  { name: 'កំពង់ចាម-Kampong Cham' },
  { name: 'កំពង់ឆ្នាំង-Kampong Chhnang' },
  { name: 'កំពង់ធំ-Kampong Thom' },
  { name: 'កំពង់ស្ពឺ-Kampong Speu' },
  { name: 'កណ្ដាល-Kandal' },
  { name: 'កែប-Kep' },
  { name: 'កោះកុង-Koh Kong' },
  { name: 'ក្រចេះ-Kratié' },
  { name: 'តាកែវ-Takéo' },
  { name: 'ត្បូងឃ្មុំ-Tboung Khmum' },
  { name: 'បន្ទាយមានជ័យ-Banteay Meanchey' },
  { name: 'បាត់ដំបង-Battambang' },
  { name: 'ប៉ៃលិន-Pailin' },
  { name: 'ពោធិ៍សាត់-Pursat' },
  { name: 'ព្រៃវែង-Prey Veng' },
  { name: 'ព្រះសីហនុ-Preah Sihanouk' },
  { name: 'ព្រះវិហារ-Preah Vihear' },
  { name: 'មណ្ឌលគីរី-Mondulkiri' },
  { name: 'រតនគីរី-Ratanakiri' },
  { name: 'សៀមរាប-Siem Reap' },
  { name: 'ស្ទឹងត្រែង-Stueng Treng' },
  { name: 'ស្វាយរៀង-Svay Rieng' },
  { name: 'ឧត្ដរមានជ័យ-Oddar Meanchey' },
]);

const form = ref({
  name: '',
  phone: '',
  address: 'ភ្នំពេញ-Phnom Penh',
  gender: '',
  role: 'អ្នករកស៊ី',
});

const toggle = () => {
  flipCard.value = !flipCard.value;
};

const submitForm = async () => {
  // Validate the form fields
  if (
    !form.value.name ||
    !form.value.phone ||
    !form.value.role ||
    !form.value.address ||
    !form.value.gender
  ) {
    let missingField = '';
    if (!form.value.name) missingField = 'ឈ្មោះ-Name';
    else if (!form.value.phone) missingField = 'លេខទូរស័ព្ទ Phone number';
    else if (!form.value.role) missingField = 'តួនាទី-Role';
    else if (!form.value.address) missingField = 'អាស័យដ្ឋាន-Address';
    else if (!form.value.gender) missingField = 'ភេទ-gender';

    $swal.fire({
      title: 'ការដាក់ស្នើបរាជ័យ',
      text: `សូមបំពេញ ${missingField}`,
      icon: 'warning',
    });
    return;
  }

  try {
    try {
      const response = await useApi('/items/users', {
        method: 'POST',
        data: form.value, // Use 'data' instead of 'body' for axios
        headers: {
          'Content-Type': 'application/json',
        },
      });
      $swal
        .fire({
          title: 'បានដាក់ស្នើជោគជ័យ',
          html: `ទម្រង់បែបបទរបស់អ្នកត្រូវបានដាក់ជូនជាមួយនឹងព័ត៌មានលម្អិតដូចខាងក្រោម:<br><br>
               <strong>ឈ្មោះ-Name:</strong> ${form.value.name}<br>
               <strong>លេខទូរសព្ទ-Phone:</strong> ${form.value.phone}<br>
               <strong>អាស័យដ្ឋាន-Address:</strong> ${form.value.address}<br>
               <strong>ភេទ-gender:</strong> ${form.value.gender}<br>
               <strong>តួនាទី-Role:</strong> ${form.value.role} <br><br>
               <strong style="color: red;"> សូមបង្ហាញលទ្ធផលទៅកាន់ក្រុមការងារនិងបោះត្រា ដើម្បីទទួលបានសៀវភៅ.</strong>`,
          icon: 'success',
          allowOutsideClick: false,
        })
        .then(() => {
          location.reload(); // Refresh the page after the user clicks "OK"
        });
    } catch (error: any) {
      console.error('Failed to submit form:', error);
      $swal.fire({
        title: 'ការដាក់ស្នើបរាជ័យ',
        text: 'មានបញ្ហាកើតឡើងនៅពេលដាក់ស្នើទម្រង់នេះ' + error.message,
        icon: 'error',
      });
    }

    toggle(); // Trigger animation on submit
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

onMounted(() => {
  // set time out
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped>
/* 3D Logo Animation */
.logo-container {
  perspective: 800px;
  transform-style: preserve-3d;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-3d {
  animation: floating 3s ease-in-out infinite, rotateY 6s linear infinite;
  filter: drop-shadow(0 0 15px rgba(156, 39, 176, 0.7));
}

@keyframes floating {
  0% {
    transform: translateY(0) rotateX(0);
  }
  50% {
    transform: translateY(-20px) rotateX(10deg);
  }
  100% {
    transform: translateY(0) rotateX(0);
  }
}

@keyframes rotateY {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

/* Welcome Text Animation */
.loading-text {
  animation: pulse 2s infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  letter-spacing: 0.3em;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Loading Dots Animation */
.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loading-dots span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgb(1, 221, 60);
  opacity: 0.7;
}

.loading-dots span:nth-child(1) {
  animation: blink 1.4s infinite 0.2s;
}

.loading-dots span:nth-child(2) {
  animation: blink 1.4s infinite 0.4s;
}

.loading-dots span:nth-child(3) {
  animation: blink 1.4s infinite 0.6s;
}

@keyframes blink {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
