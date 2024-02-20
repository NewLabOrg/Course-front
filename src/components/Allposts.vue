<template>
    <div class="container mx-auto font-montserrat">
        <h2 class="font-semibold text-4xl">Проекты : </h2>
        <PostList class="mt-8 " v-if="allPosts && allPosts.length > 0" :posts="allPosts" :showAuthor="showAuthor" />
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import PostList from './PostList.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
    name: 'AllPosts',
    components: {
        PostList
    },
    setup() {
        const { result } = useQuery(gql`
            query {
                allPosts {
                    title
                    subtitle
                    publishDate
                    published
                    metaDescription
                    image
                    slug
                    author {
                        user {
                            username
                        }
                    }
                    tags {
                        name
                    }
                }
            }
        `)

        const allPosts = computed(() => result.value?.allPosts || [])
        const publishedPosts = computed(() => allPosts.value.filter(post => post.published))
        const showAuthor = ref(true)

        return {
            allPosts,
            publishedPosts,
            showAuthor
        }
    }
}
</script>
