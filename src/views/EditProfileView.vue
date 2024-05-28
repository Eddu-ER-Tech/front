<template>
    <div class=" mt-4 ms-4 grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12">
                <h1 class="mb-6">Editar perfil</h1>

                <p class="mb-6 text-gray-500">
                    Llena los campos con los datos correspondientes
                </p>

                
            </div>
        </div>

        <div class="main-right">
            <div class="p-12">
               <form  v-on:submit.prevent="submitForm">   <!-- evento de submit que llama a submitForm-->
                    <div>
                        <label>Nombre</label><br>
                        <input type="text" v-model="form.name"   class="form-control bg-stone-300  mt-2 py-4 px-6 "><!--Se vincula el campo al modelo "form.name"-->
                    </div>

                    <div>
                        <label>E-mail</label><br>
                        <input type="email" v-model="form.email" class="form-control bg-stone-300  mt-2 py-4 px-6"><!--Se vincula el campo al modelo "form.email"-->
                    </div>

                   

                    <template v-if="errors.length > 0"> <!--condicional que muestra los errores si existen-->
                        <div class="bg-red-300 p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p><!--bucle que itera sobre los errores y los muestra-->
                        </div>
                    </template>

                    <div>
                        <button class="py-4 px-6 btn btn-success">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { useToastStore } from '@/store/toast' //importación del store toast
import { useUserStore } from '@/store/user'//importación del store user

export default {
    name:'EditProfileView',
    setup() { //Función de configuración del componente en el Composition API de Vue 3
        const toastStore = useToastStore()// Se inicializa toastStore
        const userStore = useUserStore()//Se inicializa usertStore

        return {
            toastStore, //Devuelve las stores para usarlas en el template
            userStore
        }
    },

    data() {
        return {
            form: { // Se Define el objeto  `form` para almacenar los datos del formulario
                email: this.userStore.user.email, //Se inicializa el campo email con los valores del usuario almacenados en userStore
                name: this.userStore.user.name //Se inicializa el campo name con los valores del usuario almacenados en userStore
            },
            errors: [], //Se define un array vacio donde se almacenarán mensajes de error  relacionados con la validación del formulario
        }
    },

    methods: {
        submitForm() { // Se define el método submitForm
            this.errors = [] //se inicializa el array errors antes definido

            //Se verifica si el campo está vacio
            //Si el campo se encuentra vacio se agrega un mensaje de error al array errors
            if (this.form.email === '') {

                this.errors.push('Falta tu correo')
            }

            if (this.form.name === '') {
                this.errors.push('Falta tu nombre')
            }

            // Se verifica que no haya errores en el array errors
            if (this.errors.length === 0) {
                let formData = new FormData() // Si no hay errores, se crea un objeto para enviar los datos del formulario.
                formData.append('avatar', this.$refs.file.files[0]) // Agrega el archivo seleccionado en el input file al objeto FormData
                formData.append('name', this.form.name)  // Agrega el nombre del usuario al objeto FormData.
                formData.append('email', this.form.email) // Agrega el correo electrónico del usuario al objeto FormData.


                  // Se realiza una solicitud POST al servidor para editar el perfil del usuario.
                  this.$http
                    .post('/api/editprofile/', formData, {  // URL a la que se enviará la solicitud y Los datos del formulario que se enviarán al servidor
                        headers: { //configuracion de los encabezados de la solicitud HTTP
                            "Content-Type": "multipart/form-data", //Se indica el tipo de contenido del cuerpo de la solicitud
                        }
                    })

                // Función de devolución de llamada que manejará la respuesta del servidor después de que la solicitud se haya completado correctamente
                    .then(response => { 
                        if (response.data.message === 'information updated') { //Se verifica si el mensaje de la respuesta del servidor es "information updated". Si es así, significa que la información se actualizó correctamente en el servidor.
                            this.toastStore.showToast(5000, 'Los datos fueron cambiados con éxito', 'bg-emerald-500')// Se muestra un mensaje de notificación, indicando que los datos se han cambiado con éxito.

                            //Se actualiza la información del usuario en el almacenamiento local de la aplicación
                            this.userStore.setUserInfo({ //llamada al método setUserInfo() del objeto userStore
                                //Se asignan los valores ingresados por el usuario
                                id: this.userStore.user.id,
                                name: this.form.name,
                                email: this.form.email,
                                avatar: response.data.user.get_avatar
                            })

                            this.$router.back() //navega de regreso a la página anterior en la aplicación
                        } else {
                            this.toastStore.showToast(5000, `${response.data.message}. Por favor intenta otra vez`, 'bg-red-300') //mensaje de notificación de error 
                        }
                    })

                    //función de devolución de llamada que manejará cualquier error que ocurra durante la solicitud.
                    .catch(error => { 
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>