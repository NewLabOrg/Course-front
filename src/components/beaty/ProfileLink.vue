<template>
    <div class="font-montserrat relative">   
        <button id="dropdownUserAvatarButton" @click="toggleDropdown" class="sm:flex text-sm sm:border px-2 py-1 sm:rounded-full md:me-0   " type="button">
            <p class="my-auto text-lg pr-4">{{ username }}</p>
            <img v-if="profileImageUrl" :src="profileImageUrl" alt="Profile Image" class="profile-image object-cover  w-9 h-9 rounded-full">
            <img v-else src="../../assets/no-image.jpg" alt="No profile image" class="w-8 h-8 rounded-full">
        </button>
    <div v-show="isDropdownVisible" class="z-40 right-0 ml-12 mt-4 absolute bg-white divide-y w-56 divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600">
        <div class="px-2 py-3 text-sm text-gray-900 dark:text-white">
            <div class="text-center font-medium truncate">{{ username }}</div>
            <div class="text-center font-medium truncate">{{ getEmail }}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <p @click="navigateToCreatePostWithId" class="block px-4 py-2 cursor-pointer logout-button dark:hover:text-white">Создать проект</p>
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
import { nextTick, ref  } from 'vue'
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
                    profileImageUrl  
                }
            }`, { username: store.username });

        const getEmail = computed(() => loading.value ? '' : result.value?.user?.email || '');  
        const profileImageUrl = computed(() => result.value?.user?.profileImageUrl || '../../assets/no-image.jpg');
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

        function generateDynamicId() {
              return `${Date.now()}`;
        }
        const navigateToCreatePostWithId = () => {
        const dynamicId = generateDynamicId();  
        router.push({ name: 'CreateNewPost', params: { id: dynamicId } });
        };
        return {
            username,
            logout,
            toggleDropdown,
            isDropdownVisible,
            getEmail,
            profileImageUrl,
            navigateToCreatePostWithId
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