<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <NewList />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import Footer from '../components/beaty/Footer.vue' 
import NewList from '../components/news/NewList.vue'   
    export default {
        name: 'News',
        components: {
            Header,
            Footer,
            NewList
        }   
    }
</script>