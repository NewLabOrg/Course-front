<template>
    <div class="container mx-auto my-6 font-montserrat flex justify-between border-b">
        <router-link to="/">
            <img class="my-2" src="../../assets/icon.svg" alt="">
        </router-link>
        <div class="hidden sm:flex my-4  justify-between">
            <router-link class="" to="/">
                <div class="p-2 hover:border-b border-red-600 transition-colors duration-500 ease-in-out overflow-auto">
                    <p class="">О нас</p>
                </div>
            </router-link>
            <router-link class="" to="/allpost">
                <div class="p-2 hover:border-b border-red-600 transition-colors duration-500 ease-in-out overflow-auto">
                    <p class="">Проекты</p>
                </div>
            </router-link>
            <router-link class="" to="/">
                <div class="p-2 hover:border-b border-red-600 transition-colors duration-500 ease-in-out overflow-auto">
                    <p class="">Новости</p>
                </div>
            </router-link>
            <router-link to="/registration">
                <div class="text-white mx-4 bg-red-600 rounded-sm">
                    <p class="p-2">Зарегистрироваться</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>
