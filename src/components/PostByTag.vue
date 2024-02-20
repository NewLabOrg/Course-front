<template>
  <div>
    <h2> <span class="text-3xl font-semibold">Проекты по тегу:</span> <span class="text-xl rounded-2xl border-2 border-black py-1 px-4"> # {{ route.params.tag }}</span></h2>
    <PostList v-if="posts && posts.length" :posts="posts" />
<div v-if="postsByTag && postsByTag.length">
  
</div>

  </div>
</template>
<script>
import PostList from './PostList.vue'
import { useQuery } from '@vue/apollo-composable'
import { defineComponent, reactive, onMounted, computed, toRefs, watchEffect } from 'vue'
import { gql } from 'graphql-tag'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PostByTag',
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    const data = reactive({ posts: [], postsByTag: [] })
    const { result, loading, error } = useQuery(
      gql`
        query ($tag: String!) {
          postsByTag(tag: $tag) {
            title
            subtitle
            publishDate
            published
            metaDescription
            slug
            author {
              user {
                username
                firstName
                lastName
              }
            }
            tags {
              name
            }
          }
        }
      `,
      {
        tag: route.params.tag
      }
    )
    const postsByTag = computed(() => result.value?.postsByTag || [])
  console.log(postsByTag.value);


  watchEffect(() => {
    if (loading.value) {
      // Handle loading state
      return
    }

    if (error.value) {
      // Handle error state
      console.error(error.value)
      return
    }

    // Update the posts with the query result
    data.posts = postsByTag.value
    data.postsByTag = postsByTag.value
  })

    return {
      ...toRefs(data),
      route,
      postsByTag
    }
  }
})
</script>