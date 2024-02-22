<template>
    <div class="p-2 ">
        <div class=" lg:grid grid-cols-3 ">
            <div class="py-4 lg:px-4" v-for="post in allPosts" :key="post.title">
                <div
                    class="border-2  rounded-xl shadow-md h-full hover:border-red-500  transition delay-150 duration-300 ease-in-out">
                    <router-link class="" :to="`/post/${post.slug}`">
                        <div>
                            <div class="h-72 overflow-hidden">
                                <img class="w-full h-full object-cover rounded-t-xl" :src='post.imageUrl'>
                            </div>
                            <div class="p-4">
                                <div class="mt-4 ">
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
                                    <p class="pt-1" v-if="showAuthor">
                                        <span class="">Автор :</span>

                                        <AuthorLink
                                            class="border rounded-2xl px-2 py-1 mx-2 hover:bg-red-500 hover:text-white duration-200 ease-in"
                                            :author="post.author" />
                                    </p>
                                    <p class="text-xs font-semibold my-auto"> {{ displayableDate(post.publishDate) }}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthorLink from './AuthorLink.vue'

export default {
    name: 'PostList',
    components: {
        AuthorLink,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
        showAuthor: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        allPosts() {
            return this.posts;
        },
    },
    methods: {
        displayableDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    },
}
</script>