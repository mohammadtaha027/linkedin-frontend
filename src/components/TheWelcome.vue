<script setup>
import CreatePost from './Posts/CreatePost.vue'
import PostItem from './Posts/PostItem.vue'
import { getAllPosts } from '../composible/authApi'
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import UserItem from './UserItem.vue'
const posts = ref([])
const unfriends = ref([])
const friends = ref([])
const friends_2rd = ref([])
const create_post_ref = ref(null)
const createPostModalObject = ref({})
onMounted(async () => {
  createPostModalObject.value = new Modal(create_post_ref.value)
  const posts_data = await getAllPosts()
  posts.value = posts_data.data.posts
  unfriends.value = posts_data.data.users.unfriends
  friends.value = posts_data.data.users.friends
  friends_2rd.value = posts_data.data.users.friends_2rd
  // console.log(posts_data.data.users.unfriends)
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
const onRemoveFriend = async (data) => {
  console.log(data)
  if (data.status == 'success') {
    unfriends.value = data.users.unfriends
    friends.value = data.users.friends
    friends_2rd.value = data.users.friends_2rd
  } else {
    console.log(data.message)
  }
}
const onAddFriend = async (data) => {
  console.log(data)
  if (data.status == 'success') {
    unfriends.value = data.users.unfriends
    friends.value = data.users.friends
    friends_2rd.value = data.users.friends_2rd
  } else {
    console.log(data.message)
  }
}
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 col-sm-3">
        <div class="card mb-4">
          <div class="card-header"><h3>Connects</h3></div>
          <div class="card-body">
            <UserItem
              v-for="user in friends"
              :user="user"
              :key="user.id"
              :friend_status="'friend'"
              @removeFriend="onRemoveFriend"
              @addFriend="onAddFriend"
            />
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>2rd Connects</h3></div>
          <div class="card-body">
            <UserItem
              v-for="user in friends_2rd"
              :user="user"
              :key="user.id"
              :friend_status="'unfriends'"
              @removeFriend="onRemoveFriend"
              @addFriend="onAddFriend"
            />
          </div>
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
            <PostItem v-for="post in posts" :post="post" :key="post.id" />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-3">
        <div class="card">
          <div class="card-header"><h3>Users</h3></div>
          <div class="card-body">
            <UserItem
              v-for="user in unfriends"
              :user="user"
              :key="user.id"
              :friend_status="'unfriends'"
              @addFriend="onAddFriend"
              @removeFriend="onRemoveFriend"
            />
          </div>
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
