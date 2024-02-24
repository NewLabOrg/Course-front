<template>
    <div class="container mx-auto my-auto">
        <div v-if="news">
            <div class="container mx-auto p-4 rounded-xl border-2 mt-12 ">
                <div class="h-72 overflow-hidden">
                    <img class="w-96" :src="news.imageUrl" alt="">
                </div>
                <div class="">
                    <h2 class="font-extrabold text-2xl">{{ news.title }}</h2>
                        <p>{{ news.subtitle }}</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { useRoute } from 'vue-router' 
    export default {
        name: 'PostNew',

        setup() {
            const route = useRoute()
            const { result } = useQuery(gql`
                query ($slug: String!) {
                    newBySlug(slug: $slug){
                        title
                        slug
                        subtitle
                        imageUrl
                    }
                }`, {
                    slug: route.params.slug
                })
            const news =computed(() => result.value?.newBySlug || {} );
                console.log(news.value);
            return {
                news
            }
        }
    }

</script>