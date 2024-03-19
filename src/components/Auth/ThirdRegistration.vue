<template>
    <div class="container font-montserrat">
        <div class="border  mx-auto mt-12  rounded-xl w-1/2">
            <div class="border-b">
                <h1 class="text-xl font-bold p-4">Завершение создвания профиля</h1>
            </div>
            <div class="p-4 border-b">
                <p class="font-semibold text-xl">
                    Пользовтельские соглашения
                </p>
                <ol class="my-4">
                    <ul class="font-bold text-xl">Политика конфиденциальности:</ul>
                    <li>Мы ценим вашу конфиденциальность. Используя наш сайт, вы соглашаетесь с положениями нашей Политики
                        конфиденциальности. Мы стремимся обеспечить безопасность и защиту ваших личных данных.</li>
                    <ul class="font-bold text-xl">
                        Права интеллектуальной собственности
                    </ul>
                    <li>Весь контент на нашем сайте, включая текст, графику, логотипы, изображения и другие материалы,
                        защищены законом об авторских правах и другими применимыми законами об интеллектуальной
                        собственности. Использование контента без нашего разрешения запрещено.</li>
                    <ul class="font-bold text-xl">Ограничения ответственности</ul>
                    <li>Мы не несем ответственности за любой ущерб, прямой или косвенный, возникший в результате
                        использования нашего сайта. Мы не гарантируем точность, полноту или актуальность информации на нашем
                        сайте.</li>
                </ol>
            </div>
            <div class="sm:flex justify-between container  mx-auto sm:w-96  my-6">
                <p @click="beforestep"
                    class="focus:ring-4 bg-gray-300 text-gray-10 cursor-pointer focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center">
                    Вернуться назад</p>
                <button @click="registerAndAuthenticate" type="submit"
                    class="text-white bg-black focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Создать
                    профиль</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useStore } from '../../store/store';
import { useRouter } from 'vue-router';
import { UPLOAD_PROFILE_PIC } from '../helpers/UploadFile';
import { setMapStoreSuffix } from 'pinia';


export default {
    name: 'ThirdRegistration',
    props: ['step'],
    setup(props, { emit }) {
        const store = useStore(); 
        const router = useRouter();
        const setProfileImageFile = (file) => store.setProfileImageFile(file);
        const beforestep = () => emit('decrement-step');
        
        const { mutate: uploadProfilePicMutation} = useMutation(UPLOAD_PROFILE_PIC)

        const { mutate: createUser } = useMutation(
            gql`
                mutation ($username: String!, $password: String!, $email: String!, $firstname: String!, $lastname: String!, $website: String, $bio: String) {
                createUser(username: $username, password: $password, email: $email, firstname: $firstname, lastname: $lastname, website: $website, bio: $bio) {
                    user {
                        username
                        email
                        firstName
                        lastName
                        website
                        bio
                    }
                }
            }
            `, () => ({
            variables: {
                username: store.username,
                email: store.email,
                password: store.password,
                firstname: store.firstname,
                lastname: store.lastname,
                website: store.website,
                bio: store.bio
            }
        }));
        console.log(store.username);
        console.log(store.email);
        console.log(store.password);
        console.log(store.firstname);


        const { mutate: tokenAuth } = useMutation(gql`
            mutation ($username: String!, $password: String!) {
                tokenAuth(username: $username, password: $password) {
                    token
                }
            }
        `, () => ({
            variables: {
                username: store.username,
                password: store.password
            }
        }));

        const { mutate: checkUserExists } = useMutation(gql`
            query ($username: String!) {
                user(username: $username) {
                    id
                }
            }
        `, () => ({
            variables: {
                username: store.username
            }
        }));
        console.log(setProfileImageFile())

        const registerAndAuthenticate = async () => {
        try {
            const store = useStore();
            const userExists = await checkUserExists();
            if (userExists.data && userExists.data.user) {
                throw new Error('User already exists');
            }
            await createUser();

            const response = await tokenAuth();
            if(response.data && response.data.tokenAuth.token){
                store.setUsername(store.username);
                store.setToken(response.data.tokenAuth.token);
                store.setIsAuth(true);
                localStorage.setItem('username', store.username);
                localStorage.setItem('token', response.data.tokenAuth.token);
                localStorage.setItem('isAuth', true);
                // await store.uploadProfilePic();
                // await handleUpload(file)
                router.push(`/profile/${store.username}`);
       
              
                    await store.uploadProfilePic();
            }
  
            
        } catch (error) {
            console.log(error);
        }
    };

        return {
            beforestep,
            registerAndAuthenticate,
            setProfileImageFile
        }
    }
}
</script>