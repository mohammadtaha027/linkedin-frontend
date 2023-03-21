<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { AddFriend, RemoveFriend } from '../composible/authApi'
const props = defineProps(['user', 'friend_status', 'onAddFriend', 'onRemoveFriend'])
const emit = defineEmits('addFriend', 'removeFriend')
const user = ref({})
const friend_status = ref()
const removeFriend = async (id) => {
  const data = await RemoveFriend(id)
  emit('addFriend', data.data)
}
const addFriend = async (id) => {
  const data = await AddFriend(id)
  emit('removeFriend', data.data)
}
onMounted(() => {
  user.value = props.user
  friend_status.value = props.friend_status
})
</script>
<template>
  <div
    class="user d-flex align-items-center justify-content-between p-2 mb-2 rounded border"
    :data-user-id="user.id"
  >
    <div class="username text-capitalize">{{ user.name }}</div>
    <button v-if="friend_status == 'friend'" class="btn btn-danger" @click="removeFriend(user.id)">
      Remove Friend
    </button>
    <button v-else class="btn btn-success" @click="addFriend(user.id)">Add Friend</button>
  </div>
</template>
