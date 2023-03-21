<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue'
import { Comment, formatDate } from '../../composible/authApi'

const commentprops = defineProps(['comment', 'post_id', 'onUpdateComments'])
const edmit = defineEmits('updateComments')
const commentObject = ref({})
const create_reply_ref = ref({})
const commentReply = ref({
  post_id: '',
  comment: '',
  parent_id: ''
})

const collapseReply = () => {
  if (create_reply_ref.value.show) {
    create_reply_ref.value = { show: false }
  } else {
    create_reply_ref.value = { show: true }
  }
}

const replyComment = async () => {
  const replyData = {
    post_id: commentprops.post_id,
    comment: commentReply.value.comment,
    parent_id: commentprops.comment.id
  }
  const result = await Comment(replyData)
  if (result.data.status == 'success') {
    // commentObject.value = result.data.comments
    edmit('updateComments', result.data)
    create_reply_ref.value = { show: true }
  } else {
    alert(result.data.message)
  }
}

onMounted(() => {
  commentObject.value = commentprops.comment
  create_reply_ref.value = { show: true }
})
</script>
<template>
  <div
    :class="[
      'comment',
      'p-2',
      'bg-light',
      'rounded',
      'mb-2',
      'border-1',
      'border-dark',
      [commentObject.level > 0 ? 'child' : 'parent']
    ]"
    :style="{ marginLeft: commentObject.level + 'rem' }"
    :data-comment-id="commentObject.id"
    :data-comment-level="commentObject.level"
    :data-comment-parent="commentObject.parent_id"
  >
    <div class="comment-content">
      {{ commentObject.comment }}
    </div>
    <div class="comment-actions d-flex justify-content-end gap-2 small">
      <div class="comment-user"></div>
      <a
        href="#"
        @click.prevent="collapseReply"
        :class="[create_reply_ref.show ? 'collapsed' : null]"
        :aria-expanded="create_reply_ref.show ? 'false' : 'true'"
        data-bs-toggle="collapse"
        :data-bs-target="'#comment_reply' + commentObject.id"
        >Reply</a
      >
      {{ formatDate(commentObject.created_at) }}
    </div>
    <div
      :id="'comment_reply' + commentObject.id"
      :class="['comment-reply-form', 'collapse', [create_reply_ref.show ? null : 'show']]"
    >
      <form @submit.prevent="replyComment">
        <textarea
          name="comment_reply"
          id="comment"
          cols="30"
          rows="2"
          class="form-control mb-2"
          v-model="commentReply.comment"
          required
        ></textarea>
        <div class="form-group text-end">
          <button class="btn btn-success mb-2" type="submit">Reply</button>
        </div>
      </form>
    </div>
  </div>
  <CommentItem
    v-for="comment in commentObject.replies"
    :comment="comment"
    :post_id="commentObject.post_id"
    :key="comment.id"
    @updateComments="onUpdateComments"
  />
</template>
