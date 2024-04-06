<template>
    <div class="container mx-auto my-auto">
        <div v-if="news" class="flex justify-center">
            <div class="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
                <img class="w-full h-64 object-cover" :src="news.imageUrl" alt="">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2">{{ news.title }}</h2>
                    <p class="text-gray-600">{{ news.subtitle }}</p>
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
        const { result } = useQuery(
            gql`
                query ($slug: String!) {
                    newBySlug(slug: $slug) {
                        title
                        slug
                        subtitle
                        imageUrl
                    }
                }
            `,
            {
                slug: route.params.slug
            }
        )
        const news = computed(() => result.value?.newBySlug || {})

        return {
            news
        }
    }
}
</script>

<style>
.container {
    padding: 1rem;
}

.max-w-lg {
    max-width: 30rem;
}

.w-full {
    width: 100%;
}

.h-64 {
    height: 16rem;
}

.object-cover {
    object-fit: cover;
}

.p-6 {
    padding: 1.5rem;
}

.text-2xl {
    font-size: 1.5rem;
}

.font-bold {
    font-weight: bold;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.text-gray-600 {
    color: #718096;
}
</style>