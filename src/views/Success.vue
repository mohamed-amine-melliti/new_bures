<!-- src/views/Success.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 text-center p-6">
    <div class="relative mb-8">
      <img 
        src="https://media.tenor.com/0jymxge4fwwAAAAM/kerem-bursin.gif" 
        alt="Success Animation" 
        class="w-40 rounded-xl shadow-lg animate-bounce-slow" 
      />
      <div class="text-5xl mt-6 animate-pulse text-blue-500">👍</div>
    </div>

    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 drop-shadow">
      Reservation Successful
    </h1>
    <p class="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
      Your VTC has been reserved. We’re excited to drive you safely to your destination!
    </p>

    <router-link 
      to="/"
      class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
    >
      Back to Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SuccessPage',
};
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
</style>
