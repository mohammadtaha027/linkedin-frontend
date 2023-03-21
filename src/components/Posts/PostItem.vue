<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
// import moment from 'moment'
import { onlikeUnlike, Comment, formatDate } from '../../composible/authApi'
import CommentItem from './CommentItem.vue'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  post: Object
})
const like = ref('false')
const post = ref({})
const comments = ref()
const commentsCount = ref()
const create_comment_ref = ref({})

const likeUnlike = async (post_id) => {
  const result = await onlikeUnlike(post_id)
  if (result.data.status == 'success') {
    if (result.data.status == 'success') {
      if (result.data.message == 'liked') {
        like.value = true
        post.value.likes++
      } else if (result.data.message == 'unliked') {
        like.value = false
        post.value.likes--
      }
    }
    console.log(result.data.message)
  }
}

const commentForm = ref({
  post_id: '',
  level: '',
  comment: '',
  parent_id: ''
})

const comment = async () => {
  const commentData = {
    post_id: props.post.id,
    level: 0,
    comment: commentForm.value.comment,
    parent_id: 0
  }
  const result = await Comment(commentData)
  if (result.data.status == 'success') {
    console.log(result.data.comments)
    comments.value = result.data.comments
    commentsCount.value = result.data.comment_count
    create_comment_ref.value = { show: true }
  } else {
    alert(result.data.message)
  }
}
const collapseEvent = () => {
  if (create_comment_ref.value.show) {
    create_comment_ref.value = { show: false }
  } else {
    create_comment_ref.value = { show: true }
  }
}
const onUpdateComment = async (data) => {
  comments.value = cloneDeep(data.comments)
  commentsCount.value = data.comment_count
  console.log('|||||||', data.comments)
}

onMounted(async () => {
  post.value = props.post
  like.value = props.post.checklike
  comments.value = props.post.comments
  commentsCount.value = props.post.comment_count
  create_comment_ref.value = { show: true }
})
</script>
<template>
  <div
    class="post-item mb-5"
    :data-post-id="post.id"
    :data-post-status="post.status"
    :data-post-friends_only="post.friends_only"
    :data-post-type="post.type"
  >
    <div class="post-item-content border rounded p-2">
      <h4 class="post-title">{{ post.title }}</h4>
      <div class="post-image"><img :src="post.image" class="img-fluid rounded" /></div>
      <div class="post-content" v-html="post.content"></div>
    </div>
    <div class="post-item-actions d-flex justify-content-end align-items-center gap-3">
      <button class="btn" @click.prevent="likeUnlike(post.id)">
        <font-awesome-icon v-if="like" icon="fa-regular fa-thumbs-down" /><font-awesome-icon
          icon="fa-regular fa-thumbs-up"
          v-else
        />
        {{ post.likes }}
      </button>
      <div class="post-date">
        <font-awesome-icon icon="fa-regular fa-calendar-days" /> {{ formatDate(post.created_at) }}
      </div>
      <div class="post-comment">
        <button
          :class="['btn', [create_comment_ref.show ? 'collapsed' : null]]"
          :aria-expanded="create_comment_ref.show ? 'false' : 'true'"
          data-bs-toggle="collapse"
          :data-bs-target="'#comment_form' + post.id"
          @click="collapseEvent"
        >
          <font-awesome-icon icon="fa-regular fa-comment" /> {{ commentsCount }}
        </button>
      </div>
    </div>
    <div class="comments">
      <div
        :id="'comment_form' + post.id"
        :class="['comment-form', 'collapse', [create_comment_ref.show ? null : 'show']]"
      >
        <form @submit.prevent="comment">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="2"
            class="form-control mb-2"
            v-model="commentForm.comment"
            required
          ></textarea>
          <div class="form-group text-end">
            <button class="btn btn-success mb-2" type="submit">Comment</button>
          </div>
        </form>
      </div>
      <CommentItem
        v-for="comment in comments"
        :comment="comment"
        :post_id="post.id"
        :key="comment.id"
        @updateComments="onUpdateComment"
      />
    </div>
  </div>
</template>
