<template>
    <div class="container mx-auto flex justify-between font-montserrat" v-if="author">  
            <div>
        <h3 class="text-xl font-bold"><span class="text-2xl font-bold">Проекты автора:</span>  {{ displayName }}</h3>
        <PostList  v-if="allPosts.length > 0" :posts="allPosts" :showAuthor="showAuthor" />
            <div class=" lg:grid grid-cols-3 ">
            <div class="my-4 lg:mx-4" v-for="post in posts" :key="post.title">
                <router-link class="" :to="`/post/${post.slug}`">
            <div class="border-2 rounded-xl shadow-md h-full hover:border-red-500  transition delay-150 duration-300 ease-in-out">
                <img class=" rounded-t-xl" src="../assets/no-image.jpg" alt=""> <!-- TODO: add image -->
               <div class="p-4">
                <div>
                    <div class=" flex justify-between border-b">
                <p class="text-xl font-semibold  ">{{ post.title }}</p>
                <div class="">
                    <p class="rounded-xl  bg-black px-2 text-white hover:px-4 duration-200 ease-in" v-for="tag in post.tags" :key="tag.name">
                        <router-link :to="`/tag/${tag.name}`">
                            # {{ tag.name }}
                        </router-link>
                    </p>
                </div>

                </div>
                <p class="font-medium text-base ">
                  <span class="font-medium text-lg">Описание:</span>   {{ post.metaDescription }}
                </p>
                   
                </div>
                <div class="flex justify-between pt-2">
                        <p class="text-xs font-semibold">  {{ displayableDate(post.publishDate) }}</p>
                </div>    
               </div>
               </div> 
            </router-link>
            </div>
        </div>
            </div>
        <div class="border-l-2 h-lvh  w-96 p-4">


            <div class="relative w-24 h-24 container mx-auto overflow-hidden bg-gray-100 rounded-full  dark:bg-gray-600">
                <!-- <img src="post.profile_pic" alt="../assets/NoProfile.svg"> -->
            </div>


        <h2 class="text-center text-xl font-medium border-b-2 pb-2">{{ displayName }}</h2>
        <a 
            :href="author.website" 
            target="_blank" 
            rel="noopener noreferrer"
            class="pt-4 hover:border-b border-red-600 transition-colors duration-500 ease-in-out overflow-auto"
            >Ссылка на сайт автора </a>
            <p class=" text-lg text-cneter"> Автор про себя: {{ author.bio }}</p>
        </div>
    </div>
</template>

<script>
    import PostList from './PostList.vue'
    import { useQuery } from '@vue/apollo-composable'
    import { computed, watch, ref, } from 'vue';
    import { gql } from 'graphql-tag'
    import { useRoute } from 'vue-router'

    export default {
        name: 'Author',
        components: {
            PostList,
        },
        setup() {
            const route = useRoute()
            const username = ref(route.params.username)
            const { result, refetch } = useQuery(gql`
                query ($username: String!) {
                    authorByUsername(username: $username) {
                        website
                        bio
                        user {
                            firstName
                            lastName
                            username
                        }
                        # profile_pic
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
                username: username.value
            })

            const author = computed(() => result.value?.authorByUsername || {})
            const posts = computed(() => author.value.postSet || [])
            const allPosts = computed(() => result.value?.postSet || [])

            const displayName = computed(() => {
                const user = author.value.user
                return (
                    user?.firstName &&
                    user?.lastName &&
                    `${user.firstName} ${user.lastName}`
                ) || `${user?.username}`
            })

            watch(() => route.params, (newParams) => {
                username.value = newParams.username;
                refetch({ username: username.value });
            });
            watch(result, (newValue) => {
                if (newValue?.authorByUsername?.postSet) {
                    posts.value = newValue.authorByUsername.postSet;
                }
            });

            
            const displayableDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString();
            }

            return {
                author,
                posts,
                displayName,
                result,
                allPosts,
                displayableDate // возвращаем функцию, чтобы она была доступна в шаблоне
            }
        }
    }
</script>