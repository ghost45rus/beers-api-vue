<template>
    <transition name="modal">
        <div v-if="show" class="modal-shadow" @click.self="closeModal">
            <div class="modal">
                <slot name="body">
                    <div class="modal-content">
                        <label for="beer_name">bear name</label>
                        <input type="text" id="beer_name" v-model="beerName">
                        <label for="beer_description">beer description</label>
                        <textarea cols="40" rows="10" id="beer_description" v-model="beerDescription"></textarea>
                    </div>
                </slot>
                <slot name="footer">
                    <div class="modal-footer">
                        <button class="modal-footer__button" @click="applyModal">apply</button>
                    </div>
                </slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        data: function () {
            return {
                beerName: "",
                beerDescription: "",
                show: false
            }
        },
        methods: {
            applyModal(){
                this.beer.name = this.beerName
                this.beer.description = this.beerDescription
                this.show = false
            },
            closeModal: function () {
                this.show = false
            }
        },
        props:{
          beer: Object,
        },
        watch:{
            "beer":function (value) {
                this.beerName = value.name
                this.beerDescription = value.description
            }
        }

    }
</script>

<style lang="scss" src="./modal.scss">

</style>