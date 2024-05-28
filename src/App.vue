<template>

<nav class="py-10 px-8 border-b border-gray-200">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="menu-left">
                   
                    <img src="../src/assets/logo_pisti_green.png" width="100" >
                </div>

                <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated">
                    <RouterLink to="/Feed" class="text-purple-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </RouterLink>

                    

                    <RouterLink to="/Notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                        </svg>                              
                    </RouterLink>

                    <RouterLink to="/Search">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>                                                         
                    </RouterLink>
                </div>

                <div class="menu-right">
                    <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                        <RouterLink :to="{name: 'ProfileView', params:{id: userStore.user.id}}">
                            <img :src="userStore.user.avatar" class="w-12 rounded-full">
                        </RouterLink>
                    </template>

                    <template v-else>
                        <RouterLink to="/" class="mr-4 py-4 px-6  bg-green-700 text-white rounded-lg">Iniciar Sesión</RouterLink>
                        <RouterLink to="/SignUp" class="py-4 px-6  bg-teal-500 text-white rounded-lg ">Registrarse</RouterLink>
                    </template>
                </div>
            </div>
        </div>
    </nav>
<main>
  <router-view/>
</main>

  <Toast/>
</template>


<script>
import axios from 'axios';

import Toast from './components/Toast.vue'
import { useUserStore } from './store/user';



export default{

  setup(){
    const userStore =useUserStore()
    return{
      userStore
    }
  },
  name:'App',

  components:{
   
    Toast
    
  },
  beforeCreate(){
    this.userStore.initStore()
    const token= this.userStore.user.access
    if (token){
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }else{
    axios.defaults.headers.common["Authorization"] = "";
  }
 }
}
</script>