<template>
    <div>
        <Header />
        <div class="min-h-screen">
            <MainProfile />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import Footer from '../components/beaty/Footer.vue'
import MainProfile from '../components/Profile/MainProfile.vue'
    export default {
        name: 'Profile',
        components: {
            Header,
            Footer,
            MainProfile
        },
 
        setup() {



            return {
                
            }
        }
    }
</script>