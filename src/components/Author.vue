<template>
    <section class="container mx-auto flex justify-between font-montserrat" v-if="author">
        <div class="">
            <h3 class="text-xl font-bold"><span class="text-2xl font-bold">Проекты автора:</span> {{ displayName }}</h3>
            <div class="lg:grid grid-cols-2">
                <article class="my-4 lg:mx-4" v-for="post in posts" :key="post.title">
                    <div
                        class="border-2  rounded-xl shadow-md h-full hover:border-red-500  transition delay-150 duration-300 ease-in-out">
                        <router-link :to="`/post/${post.slug}`">
                            <div>
                                <div class="h-72 w-96 overflow-hidden">
                                    <img class="w-full h-full object-cover rounded-t-xl" :src='post.imageUrl'>
                                </div>
                                <div class="p-4">
                                    <div class="mt-4 w-full">
                                        <div class=" flex justify-between border-b pb-2">
                                        <div class="w-3/5">
                                            <p class="text-xl font-semibold  ">{{ post.title }}</p>
                                        </div>
                                        <div class="my-auto">
                                            <p class="rounded-xl  bg-black px-2 text-white hover:px-4 duration-200 ease-in"
                                                v-for="tag in post.tags" :key="tag.name">
                                                <router-link :to="`/tag/${tag.name}`">
                                                    # {{ tag.name }}
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                        <div class="mt-2">
                                            <p class="font-medium text-base ">
                                                <span class="font-medium text-lg">Описание:</span> <br /> {{
                                                    post.metaDescription }}
                                            </p>
                                        </div>


                                    </div>
                                    <div class="flex justify-between pt-2">

                                        <p class="text-xs font-semibold my-auto"> {{ displayableDate(post.publishDate) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </article>
            </div>
        </div>
        <aside class="border-l-2  w-96 p-4">
            <div class="relative w-24 h-24 container mx-auto overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <!-- <img :src="post.profile_pic" :alt="displayName"> -->
            </div>
            <h2 class="text-center text-xl font-medium border-b-2 pb-2">{{ displayName }}</h2>
            <div>
                <a :href="author.website" target="_blank" rel="noopener noreferrer"
                    class="pt-4 text-center hover:border-b border-red-600 transition-colors  duration-500 ease-in-out overflow-auto">
                    Ссылка на сайт автора
                </a>
                <p class="text-lg pt-4 text-justify"><span class="text-xl underline ">Автор про себя :</span><br /> {{
                    author.bio }}</p>

            </div>

        </aside>
    </section>
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
                            imageUrl
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
            displayableDate
        }
    }
}
</script>