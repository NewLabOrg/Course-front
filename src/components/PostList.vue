<template>
    <div class="p-2 ">
        <div class=" lg:grid grid-cols-4 ">
            <div class="my-4 lg:mx-4" v-for="post in allPosts" :key="post.title">
                <router-link class="" :to="`/post/${post.slug}`">
            <div class="border-2 rounded-xl shadow-md h-full hover:border-red-500  transition delay-150 duration-300 ease-in-out">
                <img class=" rounded-t-xl" src='../assets/no-image.jpg' alt="Post image"> <!-- TODO: add image -->
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
                   
                <p class="pt-1"  v-if="showAuthor">
                    Автор :
                    
                    <AuthorLink class="border rounded-2xl px-2 py-1  hover:bg-red-500 hover:text-white duration-200 ease-in" :author="post.author" />
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
        allPosts () {
            return this.posts;
        },
    },
    methods: {
        displayableDate (dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    },
}
</script>