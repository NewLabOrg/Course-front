<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="min-h-screen">
            <Aboutmain />  
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue' 
import Footer from '../components/beaty/Footer.vue' 
import Aboutmain from '../components/AboutBeaty/Aboutmain.vue'
    export default {
        name: 'About',
        components: {
            Header,
            Footer,
            Aboutmain
        }   
    }
</script>