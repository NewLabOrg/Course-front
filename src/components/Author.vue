<template>
    <div v-if="author">
        <h2>{{ displayName }}</h2>
        <a 
        :href="author.website" 
        target="_blank" 
        rel="noopener noreferrer"
        >Wrbsite</a>
        <p>{{ author.bio }}</p>

        <h3>Posts by {{ displayName }}</h3>
        <PostList v-if="posts" :posts="posts" />
    </div>
</template>



<script>
    import PostList from './PostList.vue'
    import { useQuery } from '@vue/apollo-composable'
    import { computed } from 'vue';
    import { gql } from 'graphql-tag'
    import { useRoute } from 'vue-router'

    export default {
        name: 'Author',
        components: {
            PostList,
        },
        setup() {
            const route = useRoute()
            const { result } = useQuery(gql`
                query ($username: String!) {
                    authorByUsername(username: $username) {
                        website
                        bio
                        user {
                            firstName
                            lastName
                            username
                        }
                        postSet {
                            title
                            subtitle
                            publishDate
                            published
                            metaDescription
                            slug
                            tags {
                                name
                            }
                        }
                    }
                }
            `, {
                username: route.params.username
            })

            const author = computed(() => result.value?.authorByUsername || {})
            const posts = computed(() => author.value.postSet || [])
            
            const displayName = computed(() => {
                const user = author.value.user
                return (
                    user?.firstName &&
                    user?.lastName &&
                    `${user.firstName} ${user.lastName}`
                ) || `${user?.username}`
            })
            console.log(author);
            console.log(posts);
            console.log(displayName);

            return {
                author,
                posts,
                displayName
            }
        }
    }


</script>

