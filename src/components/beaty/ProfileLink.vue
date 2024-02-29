<template>
    <div class="font-montserrat relative">   
        <button id="dropdownUserAvatarButton" @click="toggleDropdown" class="flex text-sm  rounded-full md:me-0   " type="button">
            <p class="my-auto text- pr-4">{{ username }}</p>
            <img class="w-8 h-8 rounded-full" src="../../assets/no-image.jpg" alt="user photo">
        </button>
    <div v-show="isDropdownVisible" class="z-40 right-0 ml-12 mt-4 absolute bg-white divide-y w-56 divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600">
        <div class="px-2 py-3 text-sm text-gray-900 dark:text-white">
            <div class="text-center font-medium truncate">{{ username }}</div>
            <div class=" text-center font-medium truncate">{{ getEmail }}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <router-link to="/" class="block px-4 py-2 logout-button dark:hover:text-white">Создать проект</router-link>
            </li>
            <li>
                <router-link :to="`/profile/${username}`" class="block px-4 py-2 logout-button dark:hover:text-white">Профиль</router-link>
            </li>
    
        </ul>
        <div class="py-2 " @click="logout">
            <p href="#" class="block px-4 py-2 text-sm text-gray-700 logout-button cursor-pointer">Выйти</p>
        </div>
    </div>
</div>
</template>

<script>
import { useStore } from '../../store/store'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { computed } from 'vue'
export default {
    name: 'ProfileLink',
    setup() {
        const store = useStore() 
        const router = useRouter();
        const username = store.username;
        const isDropdownVisible = ref(false);

        const toggleDropdown = () => {
            isDropdownVisible.value = !isDropdownVisible.value;
            console.log(isDropdownVisible.value);
        }

        const { result, loading } = useQuery(gql`
            query ($username: String!) {
                user(username: $username) {
                    email
                }
            }`, { username: store.username });

        const getEmail = computed(() => loading.value ? '' : result.value?.user?.email || '');  
        console.log(result.value)
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
            logout,
            toggleDropdown,
            isDropdownVisible,
            getEmail
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