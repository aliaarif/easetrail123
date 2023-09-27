<script setup>
// import { useAuthStore } from "@/stores/auth";
// import { useAuthDataStore } from "@/stores/auth-data";
// const authStore = useAuthStore();
// const authDataStore = useAuthDataStore();

// const router = useRouter();
// const firstParam = router.currentRoute.value.params.city;


</script>
<template>
  <section class="mx-1">
    <DefaultNav/>
    <div class="container-inner">
      <slot />
    </div>
  </section>
</template>
<style>
.page-entter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-entter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
