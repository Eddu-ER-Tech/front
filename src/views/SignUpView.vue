<template>
<div class="text-center mt-5 container">
  <div class="row container-inicio-sesion ">
    <div class="col form-registro mb-5 ms-3 me-3">

        <div class="card card-body mt-5 form-registro">

<form  v-on:submit.prevent="$event=> submitForm" >


<div class="row ">

  <div class="col-sm ">
    <div class="d-flex justify-center">
      <img src="../assets/cat.png" alt="" >
    </div>
    
   <strong><h1>Registrarse</h1></strong> 
    <br>
    <div class=" form-group  d-flex justify-center">
      <input v-model="form.name" type="text" class="form-control bg-stone-300" style="width: 60%;"  name="name" autocomplete="name" require placeholder="Nombre">

    </div>
  </div>
  


</div>
<br>


<div class="row">
  <div class="col-sm d-flex justify-center form-group">
    
    <input v-model="form.email" type="email" class="form-control  bg-stone-300" style="width: 60%;" autocomplete="email" name="email" require  placeholder="Correo Electrónico">
  </div>
 
</div>
<br>

<div class="row">
 
  <div class="col-sm d-flex justify-center form-group ">
   
    <input v-model="form.password1" type="password" class="form-control  bg-stone-300" style="width: 60%;" autocomplete="off" name="password1" require placeholder="Contraseña">
  </div>
 
</div>
<br>
      

<div class="row">
  <div class="col-sm d-flex justify-center form-group">
    
    <input v-model="form.password2" type="password" class="form-control  bg-stone-300" style="width: 60%;" autocomplete="off" name="password2" placeholder="Repite la contraseña" >
  </div>

  <template v-if="errors.length > 0">
    <div class="bg-danger">
      <p v-for="error in errors" v-bind:key="error">
        {{error}}

      </p>

    </div>

  </template>
  

</div>


<br>

<div class="row">

<div class="col  d-flex justify-center ">
  <button  class="btn btn-success">Registrarse</button>

</div>


</div>
</form>

</div>




    </div>
    <div class="col-6 fondo">
      

      <div class="row ">

        <div class="col">
          <br>
          <strong><h1>¡Hola!</h1></strong>
          
        </div>
        <br>

        <div class="row">
          <div class="col">
            <p>
              Registra tus datos personales para usar todas las funciones del sitio.

            </p>

          </div>
          

        </div>
        <br>
        <div class="row  d-flex d-flex justify-center">
          <div>
              <p>Ya tienes una cuenta </p> 
            </div>
              <div>
                
                <router-link :to ="{'name': 'Login'}" class="btn btn-success">Inicia Sesión</router-link>
              
              </div>
          

        </div>

      </div>
        
    </div>
   
  </div>
</div>

</template>

<style scoped>
h1{
  font-size: 25px;
}

.container-inicio-sesion{
  border: solid 1px lightgray;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
 -webkit-box-shadow: 10px 10px 16px 3px rgba(0,0,0,0.75);
 -moz-box-shadow: 10px 10px 16px 3px rgba(0,0,0,0.75);
 box-shadow: 10px 10px 16px 3px rgba(0,0,0,0.75);
 background-color: #87CEFA;

}

.fondo{
    background-image: url("../assets/siginUp2.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
   border-top-left-radius: 250px;
   border-bottom-left-radius: 250px;
   border-top-right-radius: 20px;
   border-bottom-right-radius: 20px;
   opacity: 0.9;
   display: flex;
   align-items:center;
   color: white;
   font-size: 20px;
 
   
}
.fondo h1{
  font-size: 60px;
}



</style>


<script>


import { useToastStore } from '@/store/toast';
export default{
  name:'SignUp',
  setup(){
    const toastStore = useToastStore()
    return{
      toastStore
    }
  },
  data(){
    return{
      form:{
        email: '',
        name:'',
        password1:'',
        password2:''
      },

      errors:[],
    }
  },
  methods: {
    submitForm(){
      this.errors = []
      if (this.form.email=== ''){
        this.errors.push(' Falta tu correo ')
      }

      if (this.form.name === ''){
        this.errors.push(' Falta tu nombre ')
      }
      if(this.form.password1 === ''){
        this.errors.push('Falta tu contraseña')
      }

      if (this.form.password1 !== this.form.password2){
        this.errors.push('La contraseña no es igual')
      }
      if (this.errors.length == 0){
        this.$http
        
          .post('/api/signup/' , this.form)
          .then (response =>{
            if  (response.data.message === 'success'){
              this.toastStore.showToast(5000, 'El usuario fue registrado. Por favor inicie sesión')

              this.form.email = ''
              this.form.name = ''
              this.form.password1 = ''
              this.form.password2 = ''

            }else{
              this.toastStore.showToast(5000, 'Algo salió mal. Por favor vuelve a intentarlo')
            }

          })
          .catch (error =>{
            console.log('error',error)
          })
      }
    }
  }

}


</script>