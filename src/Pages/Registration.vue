<template> 
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <OneRegistration />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue';
import Footer from '../components/beaty/Footer.vue';
import OneRegistration from '../components/Auth/OneRegistration.vue';
export default {
    name: 'Registration',
    components: {
        Header,
        Footer,
        OneRegistration
    }
    
}

</script>