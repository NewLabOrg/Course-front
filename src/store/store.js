import { defineStore } from "pinia"; 


export const useStore = defineStore({
    id: 'main',
    state: () => ({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        website: '',
        bio: '',
        token: '',
        isAuth: false
    }),
    actions: {
        setUsername(username) {
            this.username = username
        },
        setEmail(email) {
            this.email = email
        },
        setPassword(password) {
            this.password = password
        },
        setFirstname(firstname) {
            this.firstname = firstname
        },
        setLastname(lastname) {
            this.lastname = lastname
        },
        setWebsite(website) {
            this.website = website
        },
        setBio(bio) {
            this.bio = bio
        },
        setToken(token) {
            this.token = token
        },
        setIsAuth(isAuth) {
            this.isAuth = isAuth
        }
    }
})