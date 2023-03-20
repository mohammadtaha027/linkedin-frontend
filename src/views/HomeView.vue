<script setup>
import { ref, onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import Authenticate from '../components/Auth/AuthenticateComponent.vue'
import { checkUser } from '../composible/authApi'

const checkuser = ref([])
onMounted(async () => {
  const user = await checkUser()
  checkuser.value = user.data
  return { checkuser }
})
</script>

<template>
  <main>
    <Authenticate />
    <template v-if="checkuser.id">
      <TheWelcome />
    </template>
  </main>
</template>
