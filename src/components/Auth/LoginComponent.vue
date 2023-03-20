<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <div class="card mt-5">
          <div class="card-header">
            <h3>{{ title }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  name="email"
                  id="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="name">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <input type="submit" class="btn btn-primary" value="Login" required />
              </div>
            </form>
            <div v-if="failedLogin" class="alert alert-danger">{{ failedLogin }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const getStorage = function (key, item) {
  if (localStorage.getItem(key) && item) {
    const data = JSON.parse(localStorage.getItem(key))
    return data[item]
  } else if (localStorage.getItem(key)) {
    return localStorage.getItem(key)
  }
}
const access_token = getStorage('linkedin_auth', 'access_token')
const user = ref()
const failedLogin = ref('')
const check = 'http://192.168.1.108:8000/api/user'
const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: check,
  headers: {
    Authorization: `Bearer ${access_token}`
  }
}
onMounted(async () => {
  // console.log(access_token)
  const data = await axios(config)
  user.value = data

  if (data.data.data !== 'Unauthenticated') {
    router.push('/')
  }
  // console.log(data)
})
const form = ref({
  email: '',
  password: ''
})
const handleLogin = async () => {
  const url = 'http://192.168.1.108:8000/api/login'
  const data = await axios.post(url, {
    email: form.value.email,
    password: form.value.password
  })
  if (data.data.status == 'success') {
    console.log(data)
    saveStorage('linkedin_auth', data.data)
    router.push('/')
  } else {
    failedLogin.value = data.data.message
    console.log(data.data.message)
  }
}
const saveStorage = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
defineProps({
  title: {
    type: String
  }
})
</script>
