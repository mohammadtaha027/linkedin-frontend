<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <div class="card mt-5">
          <div class="card-header">
            <h3>{{ title }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  v-model="form.name"
                  id="name"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  v-model="form.email"
                  id="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="name">Password</label>
                <input
                  type="password"
                  v-model="form.password"
                  name="password"
                  id="password"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="name">Confirm Password</label>
                <input
                  v-model="form.password_confirmation"
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <input type="submit" class="btn btn-primary" required value="Register" />
              </div>
            </form>
            <div class="registration-error d-none alert alert-danger"></div>
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
import { getStorage } from '../../composible/useLocalStorage'

const router = useRouter()
const access_token = getStorage('linkedin_auth', 'access_token')
const user = ref()
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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const url = 'http://192.168.1.108:8000/api/register'
const handleRegister = async () => {
  const data = await axios.post(url, {
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
    password_confirmation: form.value.password_confirmation
  })
  if (data.data.status == 'success') {
    console.log(data)
    router.push('/login')
  } else {
    console.log(data.data)
  }
}
defineProps({
  title: {
    type: String
  }
})
</script>
