<template>
    <div class="p-2 ">
        <div class=" lg:grid grid-cols-4  ">
            <div class="my-4 lg:mx-4" v-for="post in allPosts" :key="post.title">
                <router-link :to="`/post/${post.slug}`">
               <div class="border rounded-xl ">
                <img class=" rounded-t-xl" src="../assets/no-image.jpg" alt="../assets/no-image.jpg"> <!-- TODO: add ima ge -->
               <div class="p-4">
                <div>
                    <div class="">
                <p class="text-xl font-semibold border-b ">{{ post.title }}</p>
                <p class="font-medium text-base">
                  <span class="font-medium text-lg">Описание:</span>   {{ post.metaDescription }}
                </p>
                    </div>
                <p v-if="showAuthor">
                    Написанно :
                    <AuthorLink :author="post.author" />
                </p>
                </div>
                <div class="flex justify-between pt-4">
                        <p class="text-xs font-semibold">  {{ displayableDate(post.publishDate) }}</p>
                <div class="w-1/2">
                    <p v-for="tag in post.tags" :key="tag.name">
                        <router-link :to="`/tag/${tag.name}`">
                            # {{ tag.name }}
                        </router-link>
                    </p>
                </div>
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
        displayableDate (date) {
            return new Intl.DateTimeFormat(
                'en-US',
                { dateStyle: 'full' },
            ).format(new Date(date))
        }
    },
}
</script>
