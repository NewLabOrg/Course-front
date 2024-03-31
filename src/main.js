import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainPage from './Pages/MainPage.vue'
import AllPost from './Pages/AllPost.vue'
import Registration from './Pages/Registration.vue'
import TagPost from './Pages/TagPost.vue'
import OnePost from './Pages/OnePost.vue'
import About from './Pages/About.vue'
import AuthorPage from './Pages/AuthorPage.vue'
import News from './Pages/News.vue'
import OneNew from './Pages/OneNew.vue'
import Profile from './Pages/Profile.vue'
import Auth from './Pages/Auth.vue'
import CreateNewPost from './Pages/CreateNewPost.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { useStore } from './store/store'
import './style.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import {  createHttpLink } from '@apollo/client/core'


const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` || "",
  },
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', component: MainPage },
        { path:'/allpost', component: AllPost},
        { path: '/author/:username', component: AuthorPage },
        { path: '/post/:slug', component: OnePost },
        { path: '/tag/:tag', component: TagPost },
        { path: '/registration', component: Registration },
        { path: '/about', component: About },
        { path: '/new', component: News },
        { path: '/new/:slug', component: OneNew },
        { path: '/auth', component: Auth},
        { path: '/profile/:id', component: Profile, meta: { requiresAuth: true }  },
        { path: '/createpost/:id', name: 'CreateNewPost', component: CreateNewPost, meta: { requiresAuth: true }},
    ]
})
router.beforeEach((to, from, next) => {
    const store = useStore()
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.token) {
        next({
          path: '/registration',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
});
const pinia = createPinia()

const app = createApp(App)
  .use(autoAnimatePlugin)
  .use(pinia)
  .use(router)
  .use(PrimeVue)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')