<script setup>
import CreatePost from './Posts/CreatePost.vue'
import PostItem from './Posts/PostItem.vue'
import { getAllPosts } from '../composible/authApi'
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
const posts = ref([])
const create_post_ref = ref(null)
const createPostModalObject = ref({})
onMounted(async () => {
  createPostModalObject.value = new Modal(create_post_ref.value)
  const posts_data = await getAllPosts()
  posts.value = posts_data.data.posts
  console.log(posts_data.data.users)
  // console.log(posts.value)
  // return { posts }
})
const onhideModal = () => {
  createPostModalObject.value.hide()
}
const onAddNewPost = async (data) => {
  posts.value = data
  // console.log(data)
}
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 col-sm-3">
        <div class="card">
          <div class="card-header"><h3>Friends</h3></div>
          <div class="card-body"></div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="d-flex gap-3">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#create_post"
              >
                Create Post
              </button>
            </div>
          </div>
          <div class="card-body" id="post_feed">
            <!-- <PostItem v-if="new_post.id" :post="new_post" :key="new_post.id" /> -->
            <!-- <GetPosts /> -->
            <PostItem v-for="post in posts" :post="post" :key="post.id" />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-3">
        <div class="card">
          <div class="card-header"><h3>My Info</h3></div>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- create post modal -->
  <div
    ref="create_post_ref"
    class="modal fade"
    data-bs-keyboard="true"
    tabindex="-1"
    aria-labelledby="createPostTitle"
    id="create_post"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createPostTitle">Create Post</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <CreatePost @addNewPost="onAddNewPost" @hideModal="onhideModal" />
        </div>
      </div>
    </div>
  </div>
</template>
