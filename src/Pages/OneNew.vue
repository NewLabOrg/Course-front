<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <PostNew />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import Footer from '../components/beaty/Footer.vue'
import PostNew from '../components/news/PostNew.vue'
    export default {
        name: 'OneNew',
        
        components: {
            Header,
            Footer,
            PostNew
        }
    }
</script>