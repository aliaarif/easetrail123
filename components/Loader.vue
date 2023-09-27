<template>
    <div v-if="loading" class="loader">
      <!-- Your loading indicator (e.g., spinner, loading animation, etc.) -->
      Loading...
    </div>
  </template>
  
  <script setup>


      const loading = () => {
        return $nuxt.loading.isActive;
      }

  </script>
  
  <style scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
  </style>
  