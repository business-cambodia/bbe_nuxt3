<template>
  <div class="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
    <div class="contact-wrapper">
      <div class="flex justify-center pl-3 mb-5">
        <img src="/static/Logo.png" class="h-[25vh]" alt="" />
      </div>

      <div class="content">
        <div class="form-wrapper">
          <form @submit.prevent="submitForm">
            <div class="top-wrapper">
              <div class="input">
                <label>ឈ្មោះ-Name</label>
                <input id="input" type="text" v-model="form.name" />
              </div>
              <div class="input">
                <label>លេខទូរស័ព្ទ-Phone</label>
                <input id="input" type="text" v-model="form.phone" />
              </div>
              <div class="input">
                <label>តួនាទី-Role</label>
                <div class="flex flex-col space-y-2">
                  <select
                    v-model="form.role"
                    class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled>Select a role...</option>
                    <option
                      v-for="role in roles"
                      :key="role.name"
                      :value="role.name"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input">
                <label>អាស័យដ្ឋាន-Address</label>
                <select
                  v-model="form.address"
                  class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    v-for="(province, index) in provinces"
                    :key="province.name"
                    :value="province.name"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <div class="input">
                <label>ភេទ-Gender</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      v-model="form.gender"
                      value="man"
                    />
                    <span class="ml-2">ប្រុស</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      v-model="form.gender"
                      value="woman"
                    />
                    <span class="ml-2">ស្រី</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      v-model="form.gender"
                      value="other"
                    />
                    <span class="ml-2">ផ្សេងៗ</span>
                  </label>
                </div>
              </div>
              <submitbtn />
            </div>
          </form>
        </div>
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
.bg-img {
  background-image: url('/static/bg.svg');
  background-size: cover;
  background-position: center;
}

.contact-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.flip-card {
  border-radius: 0.5em;
  position: fixed;
  top: 1em;
  left: 1em;
  width: 5em;
  padding: 0.5em;
  border: 0.1em solid #fff;
  color: #fff;
  text-align: center;
  cursor: pointer;
  z-index: 9;
}

.envelope {
  position: relative;
  width: 85%;
  margin: 0 auto;
  perspective: 1000px;
}

.envelope.active .content {
  padding: 15em 2em 2em;
}

.envelope.active .paper.front,
.envelope.active .paper.back {
  animation-duration: 1.5s;
  animation-direction: normal;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.envelope.active .paper.front {
  animation-name: envelope-front;
}

.envelope.active .paper.back {
  animation-name: envelope-back;
}

.envelope.active .paper.back:before {
  animation-duration: 0.5s;
  animation-direction: normal;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 1.25s;
  animation-name: envelope-back-before;
}

.envelope.active .bottom-wrapper {
  transform: rotateX(180deg);
}

.envelope.active .bottom-wrapper:after {
  z-index: 0;
  opacity: 1;
}

.content {
  padding: 0.5em;
  box-sizing: border-box;
  position: relative;
  z-index: 9;
  transition: all 0.5s ease-in-out;
  transition-delay: 1s;
}

.top-wrapper,
.bottom-wrapper {
  box-sizing: border-box;
  background: #cc0112;
  color: #fff;
}

.top-wrapper {
  padding: 2em 2em 0;
  border-radius: 0.5em;
}

.bottom-wrapper {
  padding: 0 2em 2em;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  transition: all 0.5s ease-in-out;
  transform-origin: top;
  transform-style: preserve-3d;
  position: relative;
  margin-top: -1px;
}

.bottom-wrapper:after {
  position: absolute;
  content: '';
  display: block;
  opacity: 0;
  background: #cc0112;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

form label {
  display: block;
  padding-bottom: 0.5em;
}

form,
form textarea {
  box-shadow: 0;
  outline: none;
  background: transparent;
  color: #fff;
}

#input {
  background: transparent;
  color: #fff;
  border: 0.1em solid #fff;
  border-radius: 0.25em;
  padding: 0.5em;
  box-sizing: border-box;
  width: 100%;
}
form input {
  border-width: 0 0 0.1em;
  border-color: #fff;
  border-style: solid;
}

form textarea {
  border: 0.1em solid #fff;
  border-radius: 0.25em;
}

form .submit-card {
  background: #fff;
  color: #222;
  text-align: center;
  padding: 0.5em;
  box-sizing: border-box;
  width: 100%;
  border: 0;
  box-shadow: none;
  border-radius: 0.25em;
  cursor: pointer;
}

form .input {
  padding-bottom: 1em;
}

.paper {
  position: absolute;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

@keyframes envelope-front {
  0% {
    top: 10em;
    z-index: 0;
  }
  50% {
    top: 15em;
    z-index: 9;
  }
  100% {
    top: 10em;
    z-index: 9;
  }
}

@keyframes envelope-back {
  0% {
    top: 0;
  }
  50% {
    top: 5em;
  }
  100% {
    top: 0;
  }
}

@keyframes envelope-back-before {
  0% {
    border-color: transparent transparent #d3d3d3 transparent;
    transform: rotateX(0deg);
    z-index: 0;
  }
  100% {
    border-color: transparent transparent #fff transparent;
    transform: rotateX(180deg);
    z-index: 99;
    position: relative;
  }
}

/* Additional Media Query for Mobile Devices */
@media (max-width: 600px) {
  .contact-wrapper {
    padding: 10px;
  }

  .envelope {
    width: 100%;
    padding: 0;
  }

  .envelope.active .content {
    padding: 10em 1em 1em;
  }

  .top-wrapper,
  .bottom-wrapper {
    padding: 1em;
  }

  .paper svg {
    width: 100%;
    height: auto;
  }
}
</style>
