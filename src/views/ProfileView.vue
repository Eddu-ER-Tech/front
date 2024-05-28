<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img :src="user.get_avatar" class="mb-6 rounded-full">
                
                <p><strong>{{ user.name }}</strong></p>

                <div class="mt-6 flex space-x-8 justify-around" v-if="user.id">
                    <RouterLink :to="{name: 'FriendsView', params: {id: user.id}}" class="text-xs text-gray-500">{{ user.friends_count }} Amigos</RouterLink>
                    <p >{{ user.posts_count }} posts</p>
                </div>

                <div class="mt-6">
                    

                   

                    <RouterLink 
                        class="inline-block mr-2 py-4 px-3 bg-green-700 text-white rounded-lg" 
                        to="/Profile/edit"
                        v-if="userStore.user.id === user.id"
                    >
                        Editar perfil
                    </RouterLink>
                    <button 
                        class="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg" 
                        @click="sendFriendshipRequest"
                        v-if="userStore.user.id !== user.id && can_send_friendship_request"
                    >
                        Send friendship request
                    </button>


                    <button 
                        class="inline-block py-4 px-3   bg-teal-500 text-white rounded-lg text-xs" 
                        @click="logout"
                        v-if="userStore.user.id === user.id"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>

        <div class="main-center col-span-2 ">
            <div 
                
                v-if="userStore.user.id === user.id"
            >
                <FeedForm 
                    v-bind:user="user" 
                    v-bind:posts="posts"
                />
            </div>

            <div 
                class="p-4"
                v-for="post in posts"
                v-bind:key="post.id"
            >
                <FeedItem v-bind:post="post" v-on:deletePost="deletePost"/>
            </div>
        </div>

       <!--<div class="main-right col-span-1 space-y-4">
            <PersonasQueQuizaConozcas />

            <TrendsContainer />
        </div>
        --> 
    </div>
</template>

<style>
input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>

<script>


//import PersonasQueQuizaConozcas from '../components/PersonasQueQuizaConozcas.vue'
//import TrendsContainer from '../components/TrendsContainer.vue'
import FeedItem from '../components/FeedItem.vue'
import FeedForm from '../components/FeedForm.vue'
import { useUserStore } from '@/store/user'
import { useToastStore } from '@/store/toast'

export default {
    name: 'ProfileView',
    props: ['id'],

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore
        }
    },

    components: {
        //PersonasQueQuizaConozcas,
        //TrendsContainer,
        FeedItem,
        FeedForm
    },

    data() {
        return {
            posts: [],
            user: {
                
            },
            can_send_friendship_request: null,
        }
    },

    mounted() {
        this.getFeed()
    },

    watch: { 
        '$route.params.id': {
            handler: function() {
                this.getFeed()
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        deletePost(id) {
            this.posts = this.posts.filter(post => post.id !== id)
        },

       

        sendFriendshipRequest() {
            this.$http
                .post(`/api/friends/${this.$route.params.id}/request/`)
                .then(response => {
                    console.log('data', response.data)

                    this.can_send_friendship_request = false

                    if (response.data.message == 'request already sent') {
                        this.toastStore.showToast(5000, 'The request has already been sent!', 'bg-red-300')
                    } else {
                        this.toastStore.showToast(5000, 'The request was sent!', 'bg-emerald-300')
                    }
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        getFeed() {
            this.$http
                .get(`/api/posts/profile/${this.$route.params.id}/`)
                .then(response => {
                    console.log('data', response.data)

                    this.posts = response.data.posts
                    this.user = response.data.user
                    this.can_send_friendship_request = response.data.can_send_friendship_request
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        logout() {
            console.log('Log out')

            this.userStore.removeToken()

            this.$router.push('/')
        }
    }
}
</script>