<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <Author />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import Footer from '../components/beaty/Footer.vue'
import Author from '../components/Author.vue'
export default {
    name: 'AuthorPage',
    components: {
        Header,
        Footer,
        Author
    }   
}
</script>