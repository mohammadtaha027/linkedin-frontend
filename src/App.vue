<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { checkUser } from './composible/authApi'

const checkuser = ref([])
onMounted(async () => {
  const user = await checkUser()
  checkuser.value = user.data
  return { checkuser }
})

// const checkuserFunc: () => Promise<any>
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand" href="/"> Linkedin </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="{{ __('Toggle navigation') }}"
          ></button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav me-auto"></ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ms-auto">
              <template v-if="checkuser == 'Unauthenticated'">
                <li class="nav-item">
                  <RouterLink to="/login" class="nav-link">Login</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/register" class="nav-link">Register</RouterLink>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <RouterLink to="/" class="nav-link">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/about" class="nav-link">About</RouterLink>
                </li>

                <li class="nav-item">
                  <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav></nav>
    </div>
  </header>
  <RouterView />
</template>
