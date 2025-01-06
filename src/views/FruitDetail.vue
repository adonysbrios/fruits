<template>
        <section v-if="showModal" class="modal">
        <div class="modal-card">
            <h1>Delete fruit </h1>
            <p> Are you sure to delete this fruit? </p><br>
            <button @click="deleteFruit()" type="submit">Delete</button>
            <button @click="showModal=!showModal" class="secondary-btn">Cancel</button>
        </div>
    </section>
    
    <div class="fruits">
        <div class="buttons">
            <button @click="goBack()">Go back</button> 
            <button class="secondary-btn" @click="showModal=!showModal">Delete</button>
        </div>
        <div class="fruitDetail">
            <img :src="fruitDetail.image" alt="Fruit image">
            <section class="flex">
                    <h1>{{ fruitDetail.name }} </h1>
                    <p>$ {{ fruitDetail.price }}</p>
            </section>
            <h2>Description</h2>  
            <p>{{ fruitDetail.description }}</p>  
            <h2>Taste</h2>
            <p>{{ fruitDetail.taste }}</p>  
        </div>
    </div>
</template>

<style scoped>

.buttons{margin-bottom: 50px;}

.modal-card button{
    display:block;
    width: 100%;
    margin-top: 10px;
}

.fruits {
    display: block;
    max-width: 500px;
}

h1{
    font-size: 50px;
}

h2{
    margin-top: 10px;
}

button:nth-child(2){
    margin-left: 10px;
}

.fruitDetail {
    display: block;
}
.fruitDetail img{
    width: 100%;
}</style>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  name: "FruitDetail",
  data(){
    return {
        id: '',
        fruitDetail: {},
        goBack: () => {},
        showModal: false
    }
  },
  methods:{
    deleteFruit(){
        const url ='http://localhost:3000/fruit/'+this.id
        axios.delete(url).then(e=>{
            router.push({path: '/'})
        }).catch(e=>console.log(e))
    }
  },
  mounted(){
    if(router.currentRoute.value.query.id){
        this.id=router.currentRoute.value.query.id
        this.goBack = router.back
        const url ='http://localhost:3000/fruit/'+this.id
        axios.get(url).then((d)=>{
            this.fruitDetail = d.data
            }).catch(e=>console.log(e))
        }
    }
};
</script>
