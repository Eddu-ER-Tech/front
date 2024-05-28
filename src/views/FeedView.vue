
<template>
    <div class="ms-4 mt-4 grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div class="">
                <FeedForm  v-bind:user="null"   v-bind:posts="posts"/>
            </div>

            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg   "
                v-for="post in posts" 
                v-bind:key="post.id"> <!--Se llama el arreglo de posts por medio de su id-->
                <FeedItem v-bind:post="post" v-on:deletePost="deletePost" /><!--Se llama el componente FeedItem que permite mostrar  el body de cada post-->
            </div>
        </div>

        <!--<div class="main-right col-span-1 space-y-4">
            <PersonasQueQuizaConozcas />

            <TrendsContainer />
        </div>
        --> 
    </div>
</template>    

<script>
import FeedItem from '../components/FeedItem.vue'
import FeedForm from '../components/FeedForm.vue'
//import PersonasQueQuizaConozcas from '../components/PersonasQueQuizaConozcas.vue'
//import TrendsContainer from '@/components/TrendsContainer.vue'

export default {
    name: 'FeedView',

    components: {
        //PersonasQueQuizaConozcas,
        //TrendsContainer,
        FeedItem,
        FeedForm
    },

    data() {
        return {
            posts: [],  // Lista de publicaciones
            body: '',        // Cuerpo del formulario de publicación
        }
    },

    mounted() {
        this.getFeed() // Obtener las publicaciones al cargar el componente
    },

    methods: {
        // Obtener las publicaciones desde la API
        getFeed() {
            this.$http  // Se realiza una solicitud POST al servidor
                .get('/api/posts/')//URL de la cual se obtiene la información del servidor

                .then(response => {      // Función de devolución de llamada que manejará la respuesta del servidor después de que la solicitud se haya completado correctamente

                    console.log('data', response.data) // Se imprime en la consola del navegador el mensaje 'data' seguido de los datos recibidos en la respuesta HTTP



                    this.posts = response.data  //Se asigna los datos recibidos en la respuesta HTTP (response.data) a la propiedad posts del componente Vue. Esto significa que los datos recibidos se almacenan en this.posts, lo que permite que estos datos se utilicen en el template HTML del componente para mostrar la información recibida, como en la iteración de elementos en una lista.
                })

             //función de devolución de llamada que manejará cualquier error que ocurra durante la solicitud.
                .catch(error => {
                    console.log('error', error)
                })
        },
        
        // Eliminar una publicación según su ID
        deletePost(id) {
            this.posts = this.posts.filter(post => post.id !== id) //Función de filtro que se pasa como argumento al método filter(). 
        },
    }
}
</script>