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
     
            <div class="cursor-pointer" v-if="!isAuth" @click="toggleVisible">
           
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
        const toggleVisible = () => {
            visible.value = !visible.value;
        }
        return {
            isAuth,
            visible,
            toggleVisible
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
</style>