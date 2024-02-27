<template>
    <header>
        <Header />
    </header>
    <main class="min-h-screen">
        <AuthForm />
    </main>
    <footer>
        <Footer />
    </footer>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import AuthForm from '../components/Auth/AuthForm.vue'
import Footer from '../components/beaty/Footer.vue'
    export default {
        name: 'Auth',
        components: {
            Header,
            AuthForm,
            Footer
        },
        setup() {
            return {

            }
        }
    }
</script>