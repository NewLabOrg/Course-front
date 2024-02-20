import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainPage from './Pages/MainPage.vue'
import Post from './components/Post.vue'
import AllPost from './Pages/AllPost.vue'
import Author from './components/Author.vue'
import PostsByTag from './components/PostByTag.vue'
import AllPosts from './components/AllPosts.vue'
import Registration from './Pages/Registration.vue'
import TagPost from './Pages/TagPost.vue'
import OnePost from './Pages/OnePost.vue'
import About from './Pages/About.vue'
import AuthorPage from './Pages/AuthorPage.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './style.css'

const apolloClient = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql/',
    cache: new InMemoryCache(),
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', component: MainPage },
        {path:'/allpost', component: AllPost},
        { path: '/author/:username', component: AuthorPage },
        { path: '/post/:slug', component: OnePost },
        { path: '/tag/:tag', component: TagPost },
        { path: '/registration', component: Registration },
        { path: '/about', component: About },
    ]
})

createApp(App)
    .provide(DefaultApolloClient, apolloClient)
    .use(router)
    .mount('#app')
