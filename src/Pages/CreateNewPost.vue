<template>
    <header>
        <Header />
    </header>
    <main class="min-h-screen">
        <NewPost />
    </main>
    <footer>
        <Footer />
    </footer>
</template>


<script>
import Header from '../components/beaty/Header.vue';
import Footer from '../components/beaty/Footer.vue'
import NewPost from '../components/NewPost/NewPost.vue'
    export default {
        name: 'CreateNewPost',
        components: {
            Header,
            Footer,
            NewPost
        }
    }
</script>