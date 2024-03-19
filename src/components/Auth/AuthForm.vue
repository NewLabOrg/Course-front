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
            <input type="password" name="password" id="floating_password" v-model="password"  class="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
            <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Пароль</label>
          </div>
          <div class="text-center">
            <button type="submit" class="text-white bg-black hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">Войти</button>
          </div>
        </form>
      </div>

      <div v-if="isAuthSuccessful">
        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Успешная аутентификация!</span> 
      </div>
      </div>

      <div v-if="errorMessage" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Ошибка авторизации
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ errorMessage }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="errorMessage = ''">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    </div>

    <transition name="fade">
      <div v-if="isAuthSuccessful" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Успешная аутентификация!</span>
      </div>
    </transition>

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
    const errorMessage = ref(null);
    const isAuthSuccessful = ref(false);

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
      localStorage.setItem('authToken', response.data.tokenAuth.token)
      store.setUsername(username.value);
      store.setToken(response.data.tokenAuth.token);
      store.setIsAuth(true);
      localStorage.setItem('username', store.username);
      localStorage.setItem('token', response.data.tokenAuth.token);
      localStorage.setItem('isAuth', true);
      isAuthSuccessful.value = true;
      router.push(`/profile/${store.username}`);
    } else {
      errorMessage.value = 'Ошибка авторизации: неверные учетные данные' //TODO: Компонент для ошибки или удачной авторизации
    }
    console.log('Успешная авторизация:', response)
  } catch (error) {
    errorMessage.value = 'Ошибка авторизации: ' + 'введите правильные данные'
  }
}
    return {
      username,
      password,
      login,
      errorMessage
    }
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>