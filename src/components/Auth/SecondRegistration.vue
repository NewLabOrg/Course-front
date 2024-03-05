<template>
    <div class="container mx-auto " v-if="showComponent">
        <transition name="fade">
            <form class="border-2 rounded-xl p-4 mt-12 mx-4">
                <div class="grid sm:grid-cols-2 gap-6 mb-6 ">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите
                            ваше имя</label>
                        <input type="text" id="first_name" v-model="firsname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                            placeholder="Иван" required />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите
                            ссылку на ваш сайт</label>
                        <input type="url" id="website" v-model="website"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                            placeholder="example.com" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите
                            вашу фамилию</label>
                        <input type="text" id="last_name" v-model="lastname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-72 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                            placeholder="Иванов" required />
                    </div>
                    <div>
                        <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фотография профиля</p>
                        <div class="flex  justify-center w-96">
                            <label for="profile-photo"
                                class="flex flex-col items-center px-4 py-6 tracking-wide uppercase cursor-pointer text-blue border-2 border-blue rounded-lg shadow-lg">

                                <span class="mt-1 text-sm leading-normal">Выберите Изображение</span>
                                <input @change="handleFileChange" type='file' class="hidden" id="profile-photo"
                                    accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Расскажите
                            про себя </label>
                        <textarea id="message" rows="4" v-model="bio"
                            class="block p-2.5 w-72 sm:w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                            placeholder="Информация про вас..."></textarea>
                    </div>
                </div>
                <div class="sm:flex justify-between container  sm:w-96 mx-auto my-6">
                    <p @click="beforestep"
                        class="focus:ring-4 bg-gray-300 text-gray-10 cursor-pointer focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center">
                        Вернуться назад</p>
                    <button @click="Nextstep" type="submit"
                        class="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto my-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Следующий
                        шаг</button>
                </div>
            </form>
        </transition>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import ThirdRegistration from './ThirdRegistration.vue';
import { useStore } from '../../store/store';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const UPLOAD_PROFILE_PIC = gql`
  mutation UploadProfilePic($file: Upload!) {
    uploadProfilePic(file: $file) {
      success
      url
    }
  }
`;

export default {
  name: 'SecondRegistration',
  props: ['step'],
  components: { ThirdRegistration },
  setup(props, { emit }) {
    const store = useStore();
    const firstname = ref('');
    const lastname = ref('');
    const website = ref('');
    const bio = ref('');
    const profilePicUrl = ref('');
    const selectedFile = ref(null); 

    
    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const { mutate: uploadProfilePicMutation } = useMutation(UPLOAD_PROFILE_PIC);

    
    const uploadProfilePic = async () => {
      if (!selectedFile.value) return;
      try {
        const response = await uploadProfilePicMutation({
          file: selectedFile.value,
        });
        if (response.data.uploadProfilePic.success) {
          profilePicUrl.value = response.data.uploadProfilePic.url;
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    const updateStore = () => {
      store.setFirstname(firstname.value);
      store.setLastname(lastname.value);
      store.setWebsite(website.value);
      store.setBio(bio.value);
    };

    const Nextstep = async () => {
      updateStore();
      await uploadProfilePic(); 
      emit('nex-step');
    };

    const showComponent = ref(false);
    const beforestep = () => {
      emit('decrement-step');
    };

    onMounted(() => {
      setTimeout(() => {
        showComponent.value = true;
      }, 1700);
    });

    return {
      firstname,
      lastname,
      website,
      bio,
      beforestep,
      showComponent,
      Nextstep,
      handleFileChange,
      profilePicUrl,
    };
  },
};
</script>


<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s, transform .10s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;

}
</style>