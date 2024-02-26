<template>
    <div class="container my-12 mx-auto font-montserrat">
        <div>
            <div class="container ">
                <ol
                    class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li
                        class="flex md:w-full items-center text-black dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span
                            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            Регистрация <span class="hidden sm:inline-flex sm:ms-2">аккаунта</span>
                        </span>
                    </li>
                    <li
                        class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span
                            class="flex items-center after:content-['/'] text-black sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <div v-show="step > 1">
                                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                            </div>

                            Заполнение <span class="hidden sm:inline-flex sm:ms-2">профиля</span>
                        </span>
                    </li>
                    <li class="flex items-center w-5/12">
                        <div>
                            <svg v-show="step == 3" class="w-3.5 h-3.5 text-black sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                        </div>
                        <p class="black text-black">Создание профиля </p>
                    </li>
                </ol>
            </div>
            <transition name="fade">
                <form v-show="step == 1" class="max-w-sm mx-auto mt-24 border-2 p-12 rounded-lg">
                    <p class="text-2xl ">Регистриция профиля</p>

                    <div class="mt-4">
                        <div class="mb-5">
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите ваш
                                nickname</label>
                            <input type="nickname" id="nickname" v-model="username"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:red-blue-500 dark:shadow-sm-light"
                                placeholder="leare" required />
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите
                                вашу
                                почту</label>
                            <input type="email" id="email" v-model="email"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:red-blue-500 dark:shadow-sm-light"
                                placeholder="test@mail.com" required />
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш
                                пароль</label>
                            <input type="password" v-model="password" id="password"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:red-blue-500 dark:shadow-sm-light"
                                required />
                        </div>
                        <div class="mb-5">
                            <label for="repeat-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите
                                пароль</label>
                            <input type="password" id="repeat-password"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:red-blue-500 dark:shadow-sm-light"
                                required />
                        </div>
                        <div class="flex items-start mb-5">
                        </div>
                    </div>
                    <button type="submit" @click="Nextstep"
                        class="text-white bg-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black">
                        Следующий Шаг</button>
                </form>
            </transition>
        </div>
        <SecondRegistration v-show="step == 2" v-if="step == 2" :step="step" @nex-step="Nextstep"
            @decrement-step="beforestep" />
        <ThirdRegistration v-show="step == 3" v-if="step == 3" :step="step" @decrement-step="beforestep" />
    </div>
</template>

<script>

import { ref } from 'vue';
import SecondRegistration from './SecondRegistration.vue';

import ThirdRegistration from './ThirdRegistration.vue';
import { useStore } from '../../store/store';

export default {
    name: 'OneRegistration',
    components: {
        SecondRegistration,
        ThirdRegistration
    },

    setup() {
        const store = useStore();
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const step = ref(1);

        const updateStore = () => {
            store.setUsername(username.value);
            store.setEmail(email.value);
            store.setPassword(password.value);
        }

        console.log(store.username);

        const Nextstep = () => {
            updateStore();
            step.value++;
        }
        const beforestep = () => {
            step.value--;
        }

        return {
            username,
            email,
            password,
            step,
            Nextstep,
            beforestep

        }
    },
}

</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>