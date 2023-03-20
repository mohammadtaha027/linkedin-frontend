import { ref } from 'vue'
import { getStorage } from './useLocalStorage'
import axios from 'axios'
import { useRouter } from 'vue-router'
import moment from 'moment'

const router = ref([])
function formatDate(date) {
  const d = new Date(date)
  return moment(d).fromNow()
}
const checkUser = async () => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  // console.log(access_token)
  const url = 'http://192.168.1.108:8000/api/user'
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }
  const response = new Promise((resolve, reject) => {
    axios(config).then((response) => {
      if (response.status == 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    })
  })
  return response
}
const Logout = async () => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/logout'
  router.value = useRouter()
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }
  const logout = await axios(config)
  console.log(logout.data.data)
  if (logout.data.data == 'Unauthenticated') {
    window.open('/login', '_self')
  } else {
    alert(logout.data.message)
  }
}
const getAllPosts = async () => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/posts'
  const config = {
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }
  const posts = await axios(config)
  if (posts.data.status !== 'faild') {
    return posts
  } else {
    return 'Faild to get posts'
  }
}
const onCreatePost = async (form) => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/posts/create'
  const config = {
    method: 'post',
    url: url,
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    data: {
      title: form.value.title,
      content: form.value.content,
      friends_only: form.value.friends_only
    }
  }
  const post = await axios(config)
  if (post.data.status !== 'faild') {
    return post.data
  } else {
    console.log(post.data.message)
  }
}
const onlikeUnlike = async (post_id) => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/posts/like'
  const config = {
    method: 'post',
    url: url,
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    data: { post_id: post_id }
  }
  const like = await axios(config)
  return like
}
const Comment = async (data) => {
  const access_token = getStorage('linkedin_auth', 'access_token')
  const url = 'http://192.168.1.108:8000/api/comments/create'
  const config = {
    method: 'post',
    url: url,
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    data: data
  }
  const comment = await axios(config)
  return comment
}
export { checkUser, Logout, getAllPosts, onCreatePost, onlikeUnlike, Comment, formatDate }
