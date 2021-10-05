<template>
    <div class="page">
            <modalWindow ref="modal" :beer="changedBeer"></modalWindow>
            <div class="container">

                <div class="wrapper">
                    <div class="loader" v-show="loading"></div>
                    <div class="list_beers" v-show="!loading">
                        <div class="list_beers__card" v-for="(item, index) in listBeers" :key="index">
                            <p>{{item.beer.id}}</p>
                            <p class='list_beers__card__name'>{{item.beer.name}}</p>
                            <img v-if="item.beer.image_url != null" class="list_beers__card__img" :src="item.beer.image_url">
                            <img v-else class="list_beers__card__img" src="img/no_img.png">
                            <p class='list_beers__card__description'>{{item.beer.description}}</p>
                            <p class='list_beers__card__brewers_tips'>{{item.beer.brewers_tips}}</p>
                            <div class="buttons">
                                <button class='button' type='button' v-on:click="showModal(item)">edit</button>
                                <button  class='button' type='button' v-on:click="deleteBeer(item.beer.id, item.page)">delete</button>
                            </div>
                        </div>
                    </div>
                    <div class="paggination" v-show="showButtonNext">
                        <button  class="paggination__next" type="button" v-on:click="nextPage()">show next</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>


import {mapGetters} from "vuex";
import modalWindow from "../modal/modal.vue"
    export default {
        name: "app",
        data(){
          return{
              changedBeer: null
          }
        },
        components:{
          modalWindow,
        },
        computed:{
          ...mapGetters([
              'loading',
              'showButtonNext',
              'listBeers',
          ])
        },
        methods:{
            showModal(item) {
                this.changedBeer = item.beer
                this.$refs.modal.show = true
            },

            nextPage(){
                this.$store.dispatch("getBeers")
            },
            getPageNumber(id){
                return this.$store.getters.pageBeer(id)
            },
            deleteBeer(id, page){
                console.log(id,page, "deleteBeerVue")
                this.$store.dispatch("deleteBeer", {id: id, page:page})
            }
        },
        beforeMount() {
          this.$store.dispatch("getBeers")
        }
    }
</script>

<style lang="scss" src="./app.scss">

</style>