<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 ">
                <img :src="user.get_avatar" class="mb-6 rounded-full"> 
                
                <p><strong>{{ user.name }}</strong></p>

                <div class="mt-6 flex space-x-8 justify-around">
                    <p >{{ user.friends_count }} Amigos</p> <!--Contador de amigos-->
                    <p >{{ user.posts_count }} Posts</p><!---Contador de posts-->
                </div>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg"
                v-if="friendshipRequests.length"> <!--Condicional Si hay solicitudes de amistad-->
                <h2 class="mb-6">Solicitudes de Amistad</h2>

                <div 
                    class="p-4 text-center bg-gray-100 rounded-lg"
                    v-for="friendshipRequest in friendshipRequests"
                    v-bind:key="friendshipRequest.id"
                >
                    <img :src="friendshipRequest.created_by.get_avatar" class="mb-6 mx-auto rounded-full">
                
                    <p>
                        <strong>
                            <RouterLink :to="{name: 'ProfileView', params:{id: friendshipRequest.created_by.id}}">{{ friendshipRequest.created_by.name }}</RouterLink>
                        </strong>
                    </p>

                    <div class="mt-6 flex space-x-8 justify-around">
                        <p>{{ user.friends_count }} Amigos</p>
                        <p>{{ user.posts_count }} Posts</p>
                    </div>

                    <div class="mt-6 space-x-4">
                        <button class="inline-block py-4 px-6 btn btn-outline-success" @click="handleRequest('accepted', friendshipRequest.created_by.id)">Acceptar</button>
                        <button class="inline-block py-4 px-6 btn btn-outline-danger" @click="handleRequest('rejected', friendshipRequest.created_by.id)">Cancelar</button>
                    </div>
                </div>

                <hr>
            </div>

            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4"
                v-if="friends.length"
            >
                <div 
                    class="p-4 text-center bg-gray-100 rounded-lg"
                    v-for="user in friends"
                    v-bind:key="user.id"
                >
                    <img :src="user.get_avatar" class="mb-6 rounded-full">
                
                    <p>
                        <strong>
                            <RouterLink :to="{name: 'ProfileView', params:{id: user.id}}">{{ user.name }}</RouterLink>
                        </strong>
                    </p>

                    <div class="p-2 d-flex justify-content-evenly">
                   <p>
                    {{ user.friends_count }} Amigos
                   </p>
                   <p>
                    {{ user.posts_count }} posts
                   </p> 
                </div>
                </div>
            </div>
        </div>

        <!--<div class="main-right col-span-1 space-y-4">
            <PersonasQueQuizaConozcas />

            <TrendsContainer />
        </div>-->
    </div>
</template>

<script>

import { useUserStore } from '@/store/user'
//import PersonasQueQuizaConozcas from '../components/PersonasQueQuizaConozcas.vue'
//import TrendsContainer from '@/components/TrendsContainer.vue'

export default {
    name: 'FriendsView',

    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

   // components: {
      //  PersonasQueQuizaConozcas,
       // TrendsContainer,
    //},

    data() {
        return {
            user: {},
            friendshipRequests: [],
            friends: []
        }
    },

    mounted() {
        this.getFriends()
    },

    methods: {
        getFriends() {
            this.$http
                .get(`/api/friends/${this.$route.params.id}/`)
                .then(response => {
                    console.log('data', response.data)

                    this.friendshipRequests = response.data.requests
                    this.friends = response.data.friends
                    this.user = response.data.user
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        handleRequest(status, pk) {
            console.log('handleRequest', status)

            this.$http
                .post(`/api/friends/${pk}/${status}/`)
                .then(response => {
                    console.log('data', response.data)
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
    }
}
</script>