<template>
    <div>
        <ol class="">
            <li v-for="post in allPosts" :key="post.title">
                <span>
                    <router-link :to="`/post/${post.slug}`">
                        {{ post.title }}
                    </router-link>
                </span>
                <span v-if="showAuthor">
                    by
                    <AuthorLink :author="post.author" />
                </span>
                <div>
                    {{ displayableDate(post.publishDate) }}
                </div>    
                <p>
                    {{ post.metaDescription }}
                </p>
                <ul>
                    <li v-for="tag in post.tags" :key="tag.name">
                        <router-link :to="`/tag/${tag.name}`">
                            # {{ tag.name }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ol>
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
