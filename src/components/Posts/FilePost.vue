<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
import axios from 'axios'
defineProps(['postImage'])
const emit = defineEmits(['update:postImage'])
const image = ref([])
const imageUrl = ref('')
const error = ref('')
const success = ref('')
const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    // emit('update:image', e.target.files[0])
    image.value = e.target.files[0]
    // console.log(e.target.files[0])
    // const data = new FormData()
    // data.append('image', e.target.files[0])
    // axios.post('http://192.168.1.108:8000/api/uploads', data).then((res) => {
    //   if (res.data.status == 'success') {
    //     success.value = res.data.message
    //     imageUrl.value = res.data.url
    //   } else {
    //     error.value = res.data.message
    //   }
    // })
  }
  emit('update:postImage', image.value)
}
watch(image, (image) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(image)
  fileReader.addEventListener('load', () => {
    imageUrl.value = fileReader.result
    // console.log(imageUrl.value)
  })
})
</script>
<template>
  <input
    type="file"
    class="form-control"
    name="image"
    accept="image/*"
    id="image"
    @change="handleFileChange($event)"
  />
  <img v-show="imageUrl" :src="imageUrl" :alt="image" class="img-fluid" />
  <div class="alert alert-success" v-show="success">{{ success }}</div>
  <div class="alert alert-danger" v-show="error">{{ error }}</div>
</template>
