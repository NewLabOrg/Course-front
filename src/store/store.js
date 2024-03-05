import { defineStore } from "pinia"; 


export const useStore = defineStore({
    id: 'main',
    state: () => ({
        username: localStorage.getItem('username') || '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        website: '',
        bio: '',
        token: localStorage.getItem('token') || '',
        isAuth: localStorage.getItem('token') ? true : false,
        profilePicUrl: '',
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
            localStorage.setItem('token', token)
            this.isAuth = true
        },
        setIsAuth(isAuth) {
            this.isAuth = isAuth
            if(!isAuth) {
                localStorage.removeItem('token')
            }
        },
        updateProfilePicUrl(url) {
            this.profilePicUrl = url;
          },
    }
})