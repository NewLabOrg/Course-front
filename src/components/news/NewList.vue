<template>
    <div class="container mx-auto font-montserrat">   
        <p class="mx-auto font-extrabold text-5xl text-center text-[#333333]">Новости</p>
        <div class="lg:grid grid-cols-4">
            <div class=" m-4 " v-for="news in getNews" :key="news.title">
                <div class="container mx-auto  p-4 rounded-xl border-2 mt-12 ">
                    <div class="h-72 overflow-hidden">
                        <img class="w-96" :src="news.imageUrl" alt="">
                    </div>
                    <div class="">
                        <h2 class="font-extrabold text-2xl">{{ news.title }}</h2>
                        <p class="text-xl my-4">{{ news.subtitle }}</p>
                        <router-link :to="`/new/${news.slug}`">
                            <div class="text-white mt-8
                            bg-red-600 rounded-sm p-2 mt-4">
                                <p class="text-center hover:underline">Читать</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery'
import { useQuery } from '@vue/apollo-composable'
    import  gql  from 'graphql-tag'
    import { ref, computed } from 'vue'

    export default {
        name: 'NewList',

        setup() {
            const { result } = useQuery(gql`
                query {
                    getNews {
                        title
                        slug
                        subtitle
                        imageUrl
                    }
                }
            `)
            const getNews = computed(() => result.value?.getNews || [])
                console.log(getNews.value);
            return {
                getNews
            }   
        }
    }
</script>