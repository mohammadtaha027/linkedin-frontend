<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import FilePost from './FilePost.vue'
import { getStorage } from '../../composible/useLocalStorage'
import axios from 'axios'
const form = ref({
  title: '',
  content: '',
  friends_only: '',
  slug: '',
  image: '',
  type: 'text',
  status: ''
})
const emit = defineEmits('addNewPost')
defineProps(['onAddNewPost', 'onHideModal'])
const posts = ref({})
const hideModal = ref({})
const postImage = ref({})
const onCreatePost = async () => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/posts/create'
  const slug = form.value.title
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(' ', '-')
    .toLowerCase()
  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('content', form.value.content)
  formData.append('slug', slug)
  formData.append('type', 'text')
  formData.append('status', 'Published')
  formData.append('image', postImage.value)
  const post = await axios.post(url, formData, {
    headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'multipart/form-data' }
  })
  if (post.data.status !== 'faild') {
    posts.value = post.data.post
    //this.$refs.list.addItem([new_post])
    hideModal.value = true
    emit('addNewPost', posts.value)
    emit('hideModal', hideModal.value)
  } else {
    console.log(post.data.message)
  }
}
onMounted(() => {
  // console.log(FilePost.image)
})
</script>
<template>
  <div class="create_post">
    <form @submit.prevent="onCreatePost">
      <div class="form-group mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          v-model="form.title"
          name="title"
          id="title"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea
          name="content"
          id="content"
          v-model="form.content"
          class="form-control"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="image" class="form-label">Post Image</label>
        <FilePost v-model:post-image="postImage" />
      </div>
      <div class="form-group mb-3 d-none">
        <label for="type">Post Type</label>
        <select name="type" id="type" class="form-select">
          <option value="text">Text</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div class="form-group mb-3 d-none">
        <label for="status">Post Status</label>
        <select name="status" id="status" class="form-select">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="friends_only">Friends Only</label>
        <input
          type="checkbox"
          class="form-check-input form-control"
          role="switch"
          name="friends_only"
          id="friends_only"
          v-model="form.friends_only"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary w-100">Post</button>
      </div>
    </form>
  </div>
</template>
