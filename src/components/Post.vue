<template>
 <div class="container mx-auto font-montserrat">
    <div  v-if="post" class="">
        <img class="container mx-auto my-8 md:h-2/5 md:w-2/5" :src='post.imageUrl'  alt="../assets/no-image.jpg">
        <div class="flex justify-between border-b-2 py-2">
            <h2 class=" font-extrabold text-2xl md:text-5xl  text-[#333333]">{{ post.title }}:</h2>
                <p class="my-auto rounded-xl border px-2 py-1 text-white bg-red-500"> {{ post.subtitle }} </p>
        </div>
        <p class="mx-4 text-xl">{{ post.metaDescription }}:</p>
        <article class="container w-full">
          <p class="mx-16 text-justify ">{{ post.body }}</p>  
        </article>
        <!-- By <AuthorLink :author="post.author" /> -->
      <div class="md:flex justify-between mt-12 border-t-2">
        <div class="mt-2" v-for="tag in post.tags" :key="tag.name">
          <router-link :to="`/tag/${tag.name}`">
             <div class="rounded-xl  bg-black py-2 px-4 text-white hover:px-6 duration-200 ease-in" >
                     # {{ tag.name }}
                </div>
              </router-link>
         </div>

        <div class="my-auto"> <span class="font-normal">Опубликованно: </span>  {{ displayableDate(post.publishDate) }} </div>
 

      </div>
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
            imageUrl
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

        const displayableDate = computed(() => (date) => {
          if (date && typeof date === 'string') {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate)) {
              return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(parsedDate);
            }
          }
          return '';
        });

        
        return {
            post,
            displayableDate 
        };
    }
}
</script>
