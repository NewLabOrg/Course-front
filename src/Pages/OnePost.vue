<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <Post />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue';
import Footer from '../components/beaty/Footer.vue';
import Post from '../components/Post.vue';
export default {
    name: 'OnePost',
    components: {
        Header,
        Footer,
        Post
    }
}
</script>