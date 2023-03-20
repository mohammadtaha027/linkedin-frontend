<script setup>
import { ref, onMounted } from 'vue'
import { getStorage, clearStorage } from '../../composible/useLocalStorage'
import axios from 'axios'
import { useRouter } from 'vue-router'

const access_token = getStorage('linkedin_auth', 'access_token')
// console.log(access_token)
const user = ref()
const router = useRouter()
const usergeturl = 'http://192.168.1.108:8000/api/user'
const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: usergeturl,
  headers: {
    Authorization: `Bearer ${access_token}`
  }
}
onMounted(async () => {
  axios(config).then(function (response) {
    //console.log(JSON.stringify(response.data))
    user.value = response
    if (response.data.data == 'Unauthenticated') {
      clearStorage('linkedin_auth')
      router.push('/login')
    }
  })
})
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="uer"></div>
    </div>
  </div>
</template>
