<template>
    <div class="container mx-auto font-montserrat">
        <h1 class="font-mono text-2xl">Здравствуйте, {{ username }}</h1>
        <form @submit.prevent="updateProfile" class="mt-12">
            <div class="sm:flex justify-between">
                <div class="flex">
                    <img v-if="data.profileImageUrl" :src="data.profileImageUrl" alt="Profile Image" class="profile-image object-cover  w-32 h-32 rounded-full">
                    <img v-else src="../../assets/no-image.jpg" alt="No profile image" class="w-32 h-32 rounded-full">
                    <div class="px-4 ml-12">
                        <p class="text-lg  p-1">Nickname:</p>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-at"></i>
                            </InputGroupAddon>
                            <InputText placeholder="Username" :class="{'input-focused': isInputFocused}" @focus="handleFocus(true)" @blur="handleFocus(false)" v-model="data.username" />
                        </InputGroup>
                    </div>
                </div>
                <div class="my-6 cursor-pointer" >
                    <div @click="navigateToCreatePostWithId">
                    <p class="text-white bg-black focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-lg w-full sm:w-auto my-2 px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Создать проект</p>
                    </div>
                </div>
            </div>
            <div class="sm:flex justify-between mt-12">
                <div>
                    <p class="text-lg p-2">Ваше имя:</p>
                    <InputGroup class="">
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText placeholder="firstname" v-model="data.firstName" />
                    </InputGroup>
                </div>
                <div>
                    <p class="text-lg p-2">Ваша фамилия:</p>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText placeholder="lastName" v-model="data.lastName" />
                    </InputGroup>
                </div>
                <div>
                    <p class="text-lg p-2">Ваш сайт:</p>
                    <InputGroup>
                        <InputGroupAddon>www</InputGroupAddon>
                        <InputText placeholder="website" v-model="data.website" />
                    </InputGroup>
                </div>
            </div>
            <div>
                <p class="text-lg pt-12 pb-2">Информация о вас</p>
                <div class="py">
                    <Editor v-model="data.bio" editorStyle="height: 320px" />
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    import { useStore } from '../../store/store';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import InputText from 'primevue/inputtext'; 
    import { ref  } from 'vue';
    import gql from 'graphql-tag'
    import { useQuery } from '@vue/apollo-composable';
    import { computed } from 'vue';
    import Editor from 'primevue/editor';
    import { useRouter } from 'vue-router';

    export default {
    name: 'MainProfile',
    components: {
        InputGroup,
        InputGroupAddon,
        InputText,
        Editor
    },
    setup() {
        const store = useStore();
        const username = ref(localStorage.username);
        const isInputFocused = ref(false);
        const profilePicUrl = ref('');
        const router = useRouter();

        const generateDynamicId = () => `${Date.now()}`;

        const navigateToCreatePostWithId = () => {
        const dynamicId = generateDynamicId();
        router.push({ path: `/createpost/${dynamicId}` });
        };
        
        const { result, loading, error } = useQuery(gql`
            query($username: String!) {
                user(username: $username) {
                    username
                    email
                    firstName
                    lastName
                    website
                    bio
                    profileImageUrl      
                }
            }
        `, {
            username: username.value
        });

        const data = computed(() => result.value?.user || {});
        console.log(data);
        const handleFocus = (focused) => {
            isInputFocused.value = focused;
        };

        return { 
            username,
            data,
            isInputFocused,
            handleFocus,
            navigateToCreatePostWithId 
        };
    }
}
</script>

<style scoped>
:deep(.p-inputtext.input-focused) {
    border-color: black !important;
}
</style>