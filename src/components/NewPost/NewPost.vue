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
                <div class="flex flex-col mt-6 ml-12">
                    <label for="tags" class="text-lg font-semibold">Тег</label>
                    <input type="text" id="tags" v-model="metaDescription" class="border-2 border-gray-300 rounded-lg p-2.5 mt-2" placeholder="Тег">
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
                <textarea id="text" v-model="body" class="border-2 border-gray-300 rounded-lg p-2.5 mt-2" rows="10" placeholder="Введите текст"></textarea>
            </div>
  
<button type="submit" @click="handleSubmit" class="bg-black text-white rounded-lg p-2.5 mt-6 cursor-pointer w-96 justify-right text-center">Создать проект</button>

          
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

export default {
  name: 'NewPost',
  setup() {
    const title = ref('');
    const subtitle = ref('');
    const body = ref('');
    const metaDescription = ref(''); 
    const publishDate = ref('');
    const published = ref(false);
    const imageFile = ref(null);
    const tag = ref('');
    const imagePlaceholder = 'Добавьте изображение';
    const imagePreview = ref('');
    const router = useRouter();
    

    const handleFileUpload = event => {
        imageFile.value = event.target.files[0];
        imagePreview.value = URL.createObjectURL(imageFile.value);
    };

    const handleSubmit = async () => {
    const formData = new FormData();

    const authorUsername = localStorage.getItem('username');
    const slug = title.value.toLowerCase().replace(/[\s]+/g, '-').replace(/[^a-z0-9\-]/g, '');
    const variables = {
        title: title.value,
        subtitle: subtitle.value,
        body: body.value,
        slug: slug,
        image: null,
        tags: tag.value ? tag.value.split(',').map(t => t.trim()) : [],
        authorUsername: localStorage.getItem('username'),
    };

    formData.append('operations', JSON.stringify({
      query: `mutation CreatePost($title: String!, $subtitle: String!, $body: String!,  $authorUsername: String!, $image: Upload, $tags: [String]) {
        createPost(
          title: $title,
          subtitle: $subtitle,
          body: $body,
          authorUsername: $authorUsername,
          image: $image,
          tags: $tags
        ) {
          post {
            id
            title
            subtitle
            body
            slug
            image
            author {
              id
            }
            tags {
              id
            }
          }
        }
      }`,
      variables: {...variables, image: null} 
    }));

    formData.append('map', JSON.stringify({
      "0": ["variables.image"]
    }));

    formData.append('0', imageFile.value);

    try {
    
      const response = await fetch('http://127.0.0.1:8000/graphql/', {
        method: 'POST',
        body: formData,

      });

    
      const result = await response.json();
      if(result) {
        router.push(`/post/${result.data.createPost.post.slug}`);
      } else {
        
      }
      console.log('Mutation response:', result);
    } catch (error) {
      console.error('Mutation error:', error);
    }
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
        metaDescription,
        publishDate,
        published,
        handleSubmit
    };
  }
}
</script>