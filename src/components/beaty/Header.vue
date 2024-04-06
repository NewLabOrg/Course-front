<template>
    <div class="container mx-auto my-6 font-montserrat flex justify-between border-b">
        <router-link to="/">
                <div class="relative my-2">
                        <img class="my-2 animate-pulse" src="../../assets/icon.svg" alt="">
                </div>
        </router-link>
        <div class="hidden sm:flex my-4  justify-between">
            <router-link class="" to="/about">
                <div class="p-2 hover:border-b  border-red-600 transition ease-linear duration-300 overflow-auto">
                    <p class="">О нас</p>
                </div>
            </router-link>
            <router-link class="" to="/allpost">
                <div class="p-2 hover:border-b border-red-600 transition-colors duration-150 ease-in-out overflow-auto">
                    <p class="">Проекты</p>
                </div>
            </router-link>
            <router-link class="" to="/new">
                <div class="p-2 hover:border-b border-red-600 transition-colors duration-500 ease-in-out overflow-auto">
                    <p class="">Новости</p>
                </div>
            </router-link>
     
            <div class="cursor-pointer z-50" v-if="!isAuth" @click="toggleVisible">
           
                <div class="text-white mx-4 bg-red-600 rounded-sm">
                    <p class="p-2">Создать свой профиль</p>
                </div>
                <div v-if="visible" class="bg-white absolute p-4 mt-2 border-2 rounded-xl modal">
                    <router-link class="py-2 logout-button" to="/registration">
                        <p class="link my-2">Создать свой профиль</p>
                    </router-link>
                    <router-link class="py-2 logout-button" to="/Auth">
                        <p class="link my-2">Войти</p>
                    </router-link>
                </div>
            </div>

            <ProfileLink v-else class="my-auto mx-4" />
        </div>
        <button @click="visible = !visible" class="sticky my-auto mx-4 sm:hidden cursor-pointer">
    <svg v-if="!visible" class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
    <svg v-else class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
</button>

<transition name="fade" appear>
    <div v-if="visible"  class="absolute z-50 mt-20 w-full bg-white shadow-md rounded-lg p-4 transition-all duration-500 ease-in-out" >

        <div class="container w-1/2 mx-auto  ">
            <router-link class="" to="/about">
                <div class="p-2 mt-2 border-b  border-red-600 transition ease-linear duration-300 overflow-auto ">
                    <p class="">О нас</p>
                </div>
            </router-link>
            <router-link class="" to="/allpost">
                <div class="p-2 mt-2 border-b border-red-600  overflow-auto ">
                    <p class="">Проекты</p>
                </div>
            </router-link>
            <router-link class="" to="/new">
                <div class="p-2 mt-2 border-b border-red-600  overflow-auto ">
                    <p class="">Новости</p>
                </div>
            </router-link>
                <div v-if="!isAuth">
                    <router-link class="" to="/registration">
                        <div class="p-2 mt-2 border-b border-red-600  overflow-auto ">
                            <p class="">Создать свой профиль</p>
                        </div>
                            
                        </router-link>
                        <router-link class="" to="/Auth">
                            <div class="p-2 mt-2 border-b border-red-600  overflow-auto ">
                                <p class="">Войти</p>    
                            </div>
                        </router-link>
                </div>
            
                <div v-else>
                    <router-link :to="`/profile/${username}`">
                            <div class="p-2 pb-4 mt-2 border-b border-red-600  overflow-auto ">
                                <p>Профиль</p>
                            </div>    
                    </router-link>
                </div>
            
        </div>
        
    </div>
</transition>
</div>
</template>

<script>
import ProfileLink from './ProfileLink.vue'
import { useStore }  from '../../store/store'
import { computed } from 'vue'
import { ref } from 'vue'
export default {
    name: 'Header',
    components: {
        ProfileLink
    },
    setup() {
        const store = useStore();
        const isAuth = computed(() => store.isAuth);
        const visible = ref(false);
        const profile = computed (() => localStorage.getItem('username'));


        return {
            isAuth,
            visible,
            profile
        }
    }
}
</script>


<style scoped>
.logout-button {
    position: relative;
    overflow: hidden;
}

.logout-button::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: red;
    transition: width .3s;
}

.logout-button:hover::after {
    width: 100%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>