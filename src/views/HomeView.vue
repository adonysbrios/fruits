<template>
    <section v-if="showModal" class="modal">
        <div class="modal-card">
            <h1>Add a new fruit </h1>
            <p> Fill the inputs to add a new fruit </p><br>
            <form class="form">
                <input @change="e=>newFruit.name=e.target.value" type="text" placeholder="Name" required>
                <input @change="e=>newFruit.image=e.target.value" type="url" placeholder="Image URL" required>
                <input @change="e=>newFruit.price=e.target.value" type="text" placeholder="Price" required>
                <textarea @change="e=>newFruit.description=e.target.value" required placeholder="Description"/>
                <input @change="e=>newFruit.taste=e.target.value" type="text" placeholder="Taste" required>

                <label for="date">Expiration </label>
                <input @change="e=>newFruit.expires=e.target.value" type="date" id="date" placeholder="Expire date" required>

                <label for="color">Color: </label>
                <input @change="e=>newFruit.color=e.target.value" :value="newFruit.color" id="color" type="color" placeholder="Color" required>
                <button @click="submit(this)" type="submit">Add new fruit</button>
                <button @click="showModal=!showModal" class="secondary-btn">Cancel</button>
            </form>
        </div>
    </section>
    <div class="add-div"><button @click="showModal=!showModal" class="add">Add a new fruit</button></div>
    <section class="fruits">
        <RouterLink :to="{name: 'details', query: {id:item.id}}" :id="item.id" :key="item.id" class="fruit-card" v-for="item in data_">
            <img loading="lazy" :src="item.image" :alt="item.name">
            <section class="content">
                <section class="flex">
                    <h1>{{ item.name }} </h1>
                    <p>$ {{ item.price }}</p>
                </section>
                <h2 class="mt-1">Description</h2>
                <p>{{ item.description }}</p>
                <p>{{ item.taste }}</p>
                <p class="btn">Click to see more</p>
            </section>
        </RouterLink>
    </section>
</template>

<style>
    .form input[type='text'], .form input[type='date'], .form input[type='url'], textarea{
        display:block;
        padding: 10px 20px;
        width: 250px;
        margin: 5px 0;
        border-radius: 8px;
        border: solid 1px #ebebeb;
        box-sizing: border-box;
    }

    .form input[type='color']{
        display: block;
        width: 50px;
        height: 50px;
        border: solid 1px #ebebeb
    }

    .form label{
        margin-top: 10px;
        display: block;
    }

    #color{
        width: 100%;
    }

    textarea{
        min-height: 60px;
        resize:vertical
    }

    .modal{
        position:fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #00000073;
        backdrop-filter: blur(5px);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-card{
        padding: 20px 40px;
        border-radius: 8px;
        background-color: #fff;
    }

    .content .btn{
        display:block;
        padding: 10px;
        color: #fff;
        background-color: #000;
        text-decoration: none;
        text-align: center;
        margin-top: 10px;
        border-radius: 4px;
        font-weight: 500;
        border: solid 1px #fff;
        transition: .3s;
    }

    .fruit-card:hover > .content .btn, button:hover{
        color: #000;
        background-color: #fff;
        border: solid 1px #000;
    }

    *{
        font-family: 'Segoe UI';
        margin: 0;
        padding: 0;
        color: #2e2e2e
    }

    h1{
        color: #131313
    }

    .mt-1{
        margin-top: 15px;
    }

    .flex{
        display:flex;
        gap: 10px;
        align-items: center;
    }

    .flex p{
        color: rgb(22, 167, 22);
        font-weight: 600;
    }

    .fruits{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 1000px;
        margin: 20px auto;
        gap: 5px;
    }

    .add-div{
        display: flex;
        max-width: 1000px;
        margin: 0 auto;
        margin-top: 50px;
        justify-content: end;
    }

    button{
        padding: 10px 30px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border: solid 1px #000;
        border-radius: 4px;
        font-size: 20px;
        transition: .3s;
    }
    
    .secondary-btn{
        color: #000;
        background: #fff;
    }

    .secondary-btn:hover{
        background: #000;
        color: #fff
    }

    .form button{
        font-size: 13px;
        width: 100%;
        border-radius: 8px;
        margin-top: 5px;
    }

    .fruit-card .content{
        padding: 30px 20px;
    }

    .fruit-card img{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .fruit-card{
        border-radius: 8px;
        transition: .5s;
        position:relative;
        border-style: solid;
        border: solid 1px #e6e6e6
    }

    .fruit-card:hover{
        transform: translateY(-5px);
    }

    .fruit-card h1{
        font-size: 40px;
    }

    
    @media screen and (max-width: 1000px) {
        .fruits{
            width: 90%;
        }

        .add-div{
            width: 90%
        }
    }

    @media screen and (max-width: 940px){
        .fruits{
            grid-template-columns: 1fr 1fr;
        }
    }

    @media screen and (max-width: 600px){
        .fruits {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 450px){
        .modal-card{
            width: 100%;;
        }
   
        .form *{
            width: 100%;
            display: block;
            max-width: 250px;
        }
    }
</style>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default{
    name: 'HomeView',
    data(){
        return{
            data_: {},
            showModal: false,
            newFruit: {
                name: '',
                color: '#FFA200',
                description: '',
                taste: '',
                expires: '',
                price: '',
                image: ''
            }
        }
    },
    methods:{
        submit(e){
            axios.post('http://localhost:3000/fruit', this.newFruit).then((e)=>{
                window.location.reload()
            }).catch(e=>console.log(e))
        },
        searchFruit(el, keys){
            for(let key in keys){
                let keyStr = keys[key]
                if(el['id'] && typeof el['id']=='number'){
                    const data = {
                        name: el.name,
                        image: el.image,
                        price: el.price,
                        color: el.color,
                        description: el.description,
                        taste: el.taste,
                        expires: el.expires,
                        id: el.id
                    }
                    this.data_[data.id]=data
                }
                let elmnt = el[keyStr]
                if(typeof elmnt == 'object'){
                    this.searchFruit(elmnt, Object.keys(elmnt))
                }
            }
        }
    },
    mounted(){
        axios.get('http://localhost:3000/fruit').then((d)=>{
            const values = d.data.data;
            const fruitCount = values.fruitCount
            this.searchFruit(values, Object.keys(values))
        }).catch(e=>console.log(e))
    }
}</script>