<template>
    <div>   
        <div class="flex justify-between mx-4">
            <p>{{ username }}</p>
            <img src="../../assets/no-image.jpg" class="rounded-full w-12 h-12" alt="">
        </div>
        <div  class="block absolute bg-white ">
            <p>Перейти в профиль</p>
            <p>Создать новый проект</p>
            <p class="cursor-pointer" @click="logout">Выйти</p>
        </div>
    </div>
</template>

<script>
import { useStore } from '../../store/store'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'ProfileLink',
    setup() {
        const store = useStore() 
        const router = useRouter();
        const username = store.username;

        const logout = async() => {
            console.log('logout');
            await nextTick();
            store.setIsAuth(false);
            store.setUsername('');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            router.push('/');
        }

        return {
            username,
            logout
        }
    }
}
</script>