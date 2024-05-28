<template>
    <div class="container-publicacion bg-light mb-3">
        <div class="text-center mt-5">
            <h1><strong>Personas que quizás conoces</strong></h1>
        </div>

        <div class="row" v-for="user in users" :key="user.id">
            <div class="col">
                <img :src="user.get_avatar" class="ms-3 mt-3 rounded-full">
            </div>
            <div class="col mt-5">
                <strong>{{ user.name }}</strong>
            </div>
            <div class="col mt-5 mb-5 me-3">
                <RouterLink :to="{ name: 'ProfileView', params: { id: user.id } }" class="btn btn-outline-success">Mostrar</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PersonasQueQuizaConozcas',
    data() {
        return {
            users: []
        };
    },
    mounted() {
        this.getFriendSuggestions();
    },
    methods: {
        async getFriendSuggestions() {
            try {
                const response = await axios.get('/api/friends/suggested/');
                console.log(response.data);
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching friend suggestions:', error);
            }
        }
    }
};
</script>