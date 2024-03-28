<template>
  <div class="container font-montserrat">
    <div class="border mx-auto mt-12 rounded-xl w-1/2">
      <div class="border-b">
        <h1 class="text-xl font-bold p-4">Завершение создвания профиля</h1>
      </div>
      <div class="p-4 border-b">
        <p class="font-semibold text-xl">Пользовтельские соглашения</p>
        <ol class="my-4">
          <ul class="font-bold text-xl">
            Политика конфиденциальности:
          </ul>
          <li>
            Мы ценим вашу конфиденциальность. Используя наш сайт, вы
            соглашаетесь с положениями нашей Политики конфиденциальности. Мы
            стремимся обеспечить безопасность и защиту ваших личных данных.
          </li>
          <ul class="font-bold text-xl">
            Права интеллектуальной собственности
          </ul>
          <li>
            Весь контент на нашем сайте, включая текст, графику, логотипы,
            изображения и другие материалы, защищены законом об авторских правах
            и другими применимыми законами об интеллектуальной собственности.
            Использование контента без нашего разрешения запрещено.
          </li>
          <ul class="font-bold text-xl">
            Ограничения ответственности
          </ul>
          <li>
            Мы не несем ответственности за любой ущерб, прямой или косвенный,
            возникший в результате использования нашего сайта. Мы не гарантируем
            точность, полноту или актуальность информации на нашем сайте.
          </li>
        </ol>
      </div>
      <div class="sm:flex justify-between container mx-auto sm:w-96 my-6">
        <p
          @click="beforestep"
          class="focus:ring-4 bg-gray-300 text-gray-10 cursor-pointer focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center"
        >
          Вернуться назад
        </p>
        <button
          @click="registerAndAuthenticate"
          type="submit"
          class="text-white bg-black focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
        >
          Создать профиль
        </button>
      </div>
    </div>
  </div>
</template>




<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/store';
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $firstname: String!, $lastname: String!, $website: String, $bio: String) {
    createUser(username: $username, password: $password, email: $email, firstname: $firstname, lastname: $lastname, website: $website, bio: $bio) {
      user {
        id
        username
      }
    }
  }
`;

const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const CHECK_USER_EXISTS = gql`
  query User($username: String!) {
    user(username: $username) {
      id
    }
  }
`;

export default {
  name: 'ThirdRegistration',
  props: ['step'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const errorMessage = ref('');
    const beforestep = () => emit('decrement-step');
    const { mutate: createUser } = useMutation(CREATE_USER);
    const { mutate: tokenAuth } = useMutation(TOKEN_AUTH);
    const { mutate: checkUserExists } = useMutation(CHECK_USER_EXISTS);

    const registerAndAuthenticate = async () => {
  try {
    const { data: userExistsData } = await checkUserExists({ username: store.username });
    if (userExistsData.user) {
      throw new Error('Пользователь уже существует');
    }

    const { data: createUserData } = await createUser({
      username: store.username,
      password: store.password,
      email: store.email,
      firstname: store.firstname,
      lastname: store.lastname,
      website: store.website,
      bio: store.bio,
    });

    const { data: tokenAuthData } = await tokenAuth({ username: store.username, password: store.password });

    if (store.profileImageFile && createUserData.createUser.user.id) {
      let formData = new FormData();
      formData.append('file', store.profileImageFile, store.profileImageFile.name);
      formData.append('userId', createUserData.createUser.user.id);
      const uploadResponse = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `JWT ${tokenAuthData.tokenAuth.token}`, 
        },
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadResult.errors ? uploadResult.errors[0].message : 'Ошибка при загрузке файла');
      }
    }

    if (tokenAuthData.tokenAuth.token) {
      store.setUsername(store.username);
      store.setToken(tokenAuthData.tokenAuth.token);
      store.setIsAuth(true);
      localStorage.setItem('username', store.username);
      localStorage.setItem('token', tokenAuthData.tokenAuth.token);
      localStorage.setItem('isAuth', 'true');
      router.push(`/profile/${store.username}`);
    }
  } catch (error) {
    errorMessage.value = error.message;
  }
};
    return {
      registerAndAuthenticate,
      errorMessage,
      beforestep
    };
  },
};
</script>
