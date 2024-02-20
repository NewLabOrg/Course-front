<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen container mx-auto">
            <PostByTag />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue';    
import Footer from '../components/beaty/Footer.vue';
import PostByTag from '../components/PostByTag.vue';
    export default {
        name: 'TagPost',
        components: {
            Header,
            Footer,
            PostByTag
        }
    }
</script>