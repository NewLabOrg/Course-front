import { defineStore } from "pinia"; 
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const UPLOAD_PROFILE_PIC = gql`
mutation UploadProfilePic($file: Upload!) {
  uploadProfilePic(file: $file) {
    success
    url
  }
}
`;


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
    profileImageFile: null,
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
    setProfileImageFile(file) {
      this.profileImageFile = file;
      console.log(this.profileImageFile);
    },

    }
});