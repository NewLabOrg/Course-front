<template> 
    <div >
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <Allposts />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue';
import Allposts from '../components/Allposts.vue';
import Footer from '../components/beaty/Footer.vue';
export default {
    name: 'AllPost',
    components: {
        Header,
        Allposts,
        Footer
    }
}
</script>