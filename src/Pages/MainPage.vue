<template>
    <div class="font-montserra">
        <Header />
        <div class="backphoto ">
            <div class="container mx-auto text-left pt-40  pb-44">
                <div class="md:w-2/5 bg-black bg-opacity-50 text-white p-8">
                    <p class="text-white pb-12 font-extrabold text-4xl">Разработай свой научный проект и преобрази мир своими исследованиями !</p>
                </div>
            </div>
        </div>
        <main class="min-h-screen">
            <FirstBody />
        </main>
        <footer class="mt-4">
            <Footer />
        </footer>
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue'
import FirstBody from '../components/beaty/FirstBody.vue'
import Footer from '../components/beaty/Footer.vue'
export default {
    name: 'MainPage',
    components: {
    Header,
    FirstBody,
    Footer,
    }
}

</script>