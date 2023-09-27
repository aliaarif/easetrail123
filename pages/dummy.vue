<script setup>

const { title, module, auth, setAuth, dynamicTitle} = useCommon()

import {
  GoogleSignInButton
} from "vue3-google-signin"


let user;

// handle success event
const handleLoginSuccess = async (response) => {
  const { credential } = response
  if (credential) {
    user = await $fetch('/api/google-login', {
        method: "POST",
        body: {
            token: credential
        }
    })
  }

setAuth(user)
// auth.value.role = 'Admin'
// auth.value.picture = user.picture
localStorage.auth = JSON.stringify(auth.value)
    navigateTo('/dashboard')
}

// handle an error event
const handleLoginError = async () => {
//   console.error("Login failed")
}

useHead({
    title: `Obelcon | Login Panel`,
    meta: [
        { name: 'description', content: 'Obelcon Login Page' }
    ]
})

onMounted(() => {
    if (localStorage.auth) {
        navigateTo('/dashboard')
    }
})

</script>

<template>
    <section class="hero ">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-5-widescreen">
                        <h1 class="is-size-3">Login Panel</h1>
                        <GoogleSignInButton
                            @success="handleLoginSuccess"
                            @error="handleLoginError"
                        ></GoogleSignInButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
    