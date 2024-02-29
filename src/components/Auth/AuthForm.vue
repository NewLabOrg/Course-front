<template>
    <div class="container mx-auto font-montserrat">
      <h1 class="text-3xl font-semibold text-center">Вход</h1>
      <div class="mt-12">
        <form @submit.prevent="login" class="border px-14 py-12 rounded-xl max-w-md container mx-auto">
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="username" id="floating_username" v-model="username" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
            <label for="floating_username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваше имя</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="floating_password" v-model="password" class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
            <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Пароль</label>
          </div>
          <div class="text-center">
            <button type="submit" class="text-white bg-black hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Войти</button>
          </div>
        </form>
      </div>
    </div>
</template>


<script>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { useStore } from '../../store/store'
export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter();
    const store = useStore();

    const { mutate: loginMutation } = useMutation(
      gql`
        mutation Login($username: String!, $password: String!) {
          tokenAuth(username: $username, password: $password) {
            token
          }
        }
      `,
      () => ({
        variables: {
          username: username.value,
          password: password.value,
        },
      })
    )

  const login = async () => {
  try {
    const response = await loginMutation()
    if (response.data && response.data.tokenAuth) {
      // Сохраните токен в локальное хранилище или куда-то еще
      localStorage.setItem('authToken', response.data.tokenAuth.token)
      store.setUsername(username.value);
      store.setToken(response.data.tokenAuth.token);
      store.setIsAuth(true);
      localStorage.setItem('username', store.username);
      localStorage.setItem('token', response.data.tokenAuth.token);
      localStorage.setItem('isAuth', true);
      router.push(`/profile/${store.username}`); 
    } else {
      // Обработка ошибок
      console.error('Ошибка авторизации: неверные учетные данные') //TODO: Компонент для ошибки или удачной авторизации
   
    }
    console.log('Успешная авторизация:', response)
  } catch (error) {
    console.error('Ошибка авторизации:', error)
  }
}
    return {
      username,
      password,
      login,
    }
  },
}
</script>