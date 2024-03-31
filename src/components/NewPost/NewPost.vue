<template>
    <div class="container mx-auto font-montserrat ">
        <h1 class="font-semibold text-2xl w-9/12">Здесь вы можете создать новый проект, описав главную суть вашего научного проекта  </h1>
        <form action="" @submit.prevent="handleSubmit">
            <div class="flex justify-between mt-6 ">
            <div class="">
          <div class="flex justify-between">
            <div class="flex flex-col mt-6 "> 
                    <label for="title"  class="text-lg font-semibold">Название проекта</label>
                    <input type="text" v-model="title" id="title" class="border-2 border-gray-300 outline-none rounded-lg p-2.5 mt-2" placeholder="Название проекта">
                </div>
                <div class="flex flex-col mt-6 ml-12">
                    <label for="tags" class="text-lg font-semibold">Тег</label>
                    <input type="text" id="tags" v-model="tag" class="border-2 border-gray-300 rounded-lg p-2.5 mt-2" placeholder="Тег">
                </div>
               
          </div>
          <div class="flex flex-col mt-6 ">
                    <label for="subtitle" class="text-lg font-semibold">Тема проекта</label>
                    <input type="text" id="subtitle" v-model="subtitle" class="border-2 border-gray-300 outline-none rounded-lg p-2.5 mt-2" placeholder="Тема проекта">
                </div>
            </div>
     
        <img :src="imagePreview" v-if="imagePreview" class="mt-2 h-64 " />
                <div class="flex flex-col mt-6 w-96 ">
                <label for="image" class="text-lg font-semibold">Добавьте изображение</label>
                <label class="custom-file-upload border-2 border-gray-300 rounded-lg p-2.5 mt-2 cursor-pointer">
                    <input type="file" id="image" @change="handleFileUpload($event)" style="display: none;">
                    <span v-if="!imageFile">{{ imagePlaceholder }}</span>
                    <span v-else>{{ imageFile.name }}</span>
                </label>
   
                
            </div>
            </div>
       
          
            <div class="flex flex-col mt-6">
                <label for="description" class="text-lg font-semibold">Описание проекта</label>
                <textarea id="text" v-model="text" class="border-2 border-gray-300 rounded-lg p-2.5 mt-2" rows="10" placeholder="Введите текст"></textarea>
            </div>
        <button type="submit"   class="bg-black text-white rounded-lg  p-2.5 mt-6 cursor-pointer w-96 justify-right  text-center">Создать проект </button>
          
        </form>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';


const UPDATE_POST = gql`
mutation UpdatePost($id: ID!, $title: String, $subtitle: String, $body: String, $metaDescription: String, $publishDate: DateTime, $published: Boolean, $image: Upload, $author: ID, $tags: [ID]) {
  updatePost(id: $id, title: $title, subtitle: $subtitle, body: $body, metaDescription: $metaDescription, publishDate: $publishDate, published: $published, image: $image, author: $author, tags: $tags) {
    post {
      id
      title
      subtitle
      body
      metaDescription
      publishDate
      published
      image
      author {
        id
      }
      tags {
        id
      }
    }
  }
}
`;

export default {
    name: 'NewPost',
    setup() {
        const imageFile = ref(null);
        const imagePlaceholder = 'Добавьте изображение';
        const imagePreview = ref(null);
        const tag = ref('');
        const body = ref('');
        const title = ref('');
        const subtitle = ref('');
        const route = useRoute();

        const postId = computed(() => route.params.id);       
        const author = localStorage.getItem('username');
        const today = new Date().toISOString().split('T')[0];
        const { mutate: updatePost } = useMutation(UPDATE_POST);

        const handleFileUpload = event => {
            imageFile.value = event.target.files[0];
            imagePreview.value = URL.createObjectURL(imageFile.value);
        };

        if(postId.value) {
                variables.id = postId.value;
            }

            let variables = {
    title: title.value,
    subtitle: subtitle.value,
    body: body.value,
    tag: tag.value,
    image: imageFile.value,
    metaDescription: '', 
    publishDate: today,
    published: true, 
    author: author,
    tags: [tag.value], 
  };

        const handleSubmit = async () => {
            await updatePost({
                variables
            });
        };

        return {
            imageFile,
            imagePlaceholder,
            handleFileUpload,
            imagePreview,
            tag,
            body,
            title,
            subtitle,
            handleSubmit
        };
    }
}
</script>
