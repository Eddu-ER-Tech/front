<template>




    <div class="mt-4 ms-4 grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div 
                class="p-4"
                v-if="post.id"
            >
                <FeedItem v-bind:post="post" />
            </div>

            <div
                class="p-4 ms-6"
                v-for="comment in post.comments"
                v-bind:key="comment.id"
            >
                <CommentItem v-bind:comment="comment" />
            </div>

            <div>
                <form v-on:submit.prevent="submitForm" method="post">
                    <div class="p-4">  
                        <textarea v-model="body" class="form-control  ms-4 me-4" placeholder="Que estás pensando ?"></textarea>
                    </div>

                    <div class="p-4 border-t border-gray-100">
                        <button class="inline-block py-4 px-6  btn btn-success">Enviar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="main-right col-span-1 space-y-4">
            <PersonasQueQuizaConozcas />

            <TrendsContainer />
        </div>
    </div>
</template>

<script>

import FeedItem from '../components/FeedItem.vue'
import CommentItem from '../components/CommentItem.vue'
//import PersonasQueQuizaConozcas from '@/components/PersonasQueQuizaConozcas.vue'
//import TrendsContainer from '@/components/TrendsContainer.vue'

export default {
    name: 'PostView',

    components: {
        //PersonasQueQuizaConozcas,
        //TrendsContainer,
        FeedItem,
        CommentItem
    },

    data() {
        return {
            post: {
                id: null,
                comments: []
            },
            body: ''
        }
    },

    mounted() {
        this.getPost()
    },

    methods: {
        getPost() {
            this.$http
                .get(`/api/posts/${this.$route.params.id}/`)
                .then(response => {
                    console.log('data', response.data)

                    this.post = response.data.post
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        submitForm() {
            console.log('submitForm', this.body)

           this.$http
                .post(`/api/posts/${this.$route.params.id}/comment/`, {
                    'body': this.body
                })
                .then(response => {
                    console.log('data', response.data)

                    this.post.comments.push(response.data)
                    this.post.comments_count += 1
                    this.body = ''
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
    }
}
</script>