<template>
 <div class="">
    <div v-if="post" class="">
        <h2>{{ post.title }}: {{ post.subtitle }}</h2>
        <!-- By <AuthorLink :author="post.author" /> -->
        <div> {{ displayableDate(post.published) }} </div>
        <p>{{ post.metaDescription }}</p>
        <article>
            {{ post.body }}
        </article>
        <ul>
            <li v-for="tag in post.tags" :key="tag.name">
                <router-link :to="`/tag/${tag.name}`">
                    # {{ tag.name }}
                </router-link>
            </li>
        </ul>
    </div>
 </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { useRoute } from 'vue-router' 
import AuthorLink from './AuthorLink.vue'
import { computed } from 'vue'

export default {
    name: 'Post',
    components: {
        AuthorLink 
    },
    setup() {
        const route = useRoute()
        const { result } = useQuery(gql`
         query ($slug: String!) {
            postBySlug(slug: $slug){
            title
            subtitle
            publishDate
            metaDescription
            slug
            body
            author {
              user {
                username
                firstName
                lastName
              }
            }
            tags {
              name
            }
          }
        }`, {
            slug: route.params.slug
        })
        const post =computed(() => result.value?.postBySlug || {} ); 
        function displayableDate(date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return '';
        }
        return new Intl.DateTimeFormat(
            'en-US',
            { dateStyle: 'full' }
        ).format(parsedDate);
}
        return {
            post,
            displayableDate
        };
    }
}
</script>
