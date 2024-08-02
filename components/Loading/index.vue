<template>
  <div class="flex justify-center items-center h-screen bg-red-800  ">
    <div
      class="text-center bg-white shadow-md border-dashed border-2 border-red-500 rounded-3xl p-8"
    >
      <img
        src="/static/expo-logo.jpg"
        alt="Logo"
        class="mx-auto w-56 mb-4 aos-init aos-animate"
        data-aos="fade-up"
      />
      <p
        class="text-2xl font-bold md:text-4xl leading-tight aos-init aos-animate text-red-600"
        data-aos="fade-up"
      >
        សូមស្វាគមន័មកកាន់ <br />
        Business Book Expo
      </p>
      <div class="loader container mx-auto flex items-center justify-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import AOS styles and initialize AOS here if needed
</script>

<style scoped>
/* Add any additional styles if needed */

.animated-background {
  background-size: 400%;

  -webkit-animation: animation 3s ease infinite;
  -moz-animation: animation 3s ease infinite;
  animation: animation 3s ease infinite;
}

@keyframes animation {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

h1 {
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-block: 2rem 8rem;
}

.loader {
  --size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* gap: 10px; */
  gap: calc(var(--size) / 2);

  /* height: 100px; */
  height: calc(var(--size) * 5);
}

.loader div {
  /* width: 20px; */
  width: var(--size);

  /* height: 20px; */
  height: var(--size);

  /* border-radius: 20px; */
  border-radius: var(--size);

  background-color: #ffd700;
  animation: wave 2s infinite ease-in-out;
}

@keyframes wave {
  /* 0%, 100% {
    height: 20px;
    background-color: #ffd700;
  } */

  25% {
    /* height: 100px; */
    height: calc(var(--size) * 5);
    background-color: #fc00ff;
  }

  50% {
    /* height: 20px; */
    height: var(--size);
    background-color: #9c73f8;
  }

  /* 100% {
    height: 20px;
    background-color: #ffd700;
  } */
}

/* .loader :nth-child(1) {
  animation-delay: 0s;
} */

.loader :nth-child(2) {
  animation-delay: 0.2s;
}

.loader :nth-child(3) {
  animation-delay: 0.4s;
}

.loader :nth-child(4) {
  animation-delay: 0.6s;
}

.loader :nth-child(5) {
  animation-delay: 0.8s;
}
</style>
