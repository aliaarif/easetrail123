<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();
const { title, module, auth, setAuth, dynamicTitle } = useCommon();
import { GoogleSignInButton } from "vue3-google-signin";

let user;
// handle success event
const handleLoginSuccess = async (response) => {
  const { credential } = response;
  if (credential) {
    user = await $fetch("/api/google-login", {
      method: "POST",
      body: {
        token: credential,
      },
    });
  }
  // console.log(user)
  //   setAuth(user);
  //   localStorage.auth = JSON.stringify(user);

  authStore.setAuthenticated(true);
  authDataStore.setAuthData(user);
  navigateTo("/dashboard");
};

// handle an error event
const handleLoginError = async () => {
  console.error("Login failed");
};

useHead({
  title: `Obelcon | Login Panel`,
  meta: [{ name: "description", content: "Obelcon Login Page" }],
});

onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo("/dashboard");
  }
});
</script>

<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container mt-6">
        <div class="columns is-centered mt-6">
          <div
            class="column is-3-tablet is-3-desktop is-3-widescreen box has-text-centered mt-6 mb-4"
          >
            <h1 class="is-size-5 mb-4">Login Panel</h1>
            <GoogleSignInButton
              class="mt-1 mb-4"
              @success="handleLoginSuccess"
              @error="handleLoginError"
            ></GoogleSignInButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
