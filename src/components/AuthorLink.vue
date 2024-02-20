<template>
    <router-link :to="`/author/${author.user.username}`" >
      {{ displayName  }}
    </router-link>
    
  </template>
  
  <script>
  import { computed, ref } from 'vue'
  export default {
    name: 'AuthorLink',
    props: {
      author: {
        type: Object,
        required: true
      }
    },

    setup(props) {
      const author = ref(props.author)

      const displayName = computed(() => {
    if (author.value) {
        const user = author.value.user
        return (
            user?.firstName &&
            user?.lastName &&
            `${user.firstName} ${user.lastName}`
        ) || `${user?.username}`
    }
    return '';
})
      return {
        displayName
      }
    }
    
    }
  </script>
  