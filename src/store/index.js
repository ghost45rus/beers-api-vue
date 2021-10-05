import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

const state = () => ({
    url: "https://api.punkapi.com/v2/beers?",
    params: {page: 1, limit: 25},
    loading: false,
    showButtonNext: true,
    beers: [],
});


const getters = {


    loading: (state) => state.loading,
    showButtonNext: (state) => state.showButtonNext,
    listBeers: (state) => state.beers

}


const actions = {


    deleteBeer({state}, beer){

        state.beers = state.beers.filter((item) => item.beer.id !== beer.id)
        console.log(state.beers)
    },
    //Экшен получения пива и добавления в стор
    async getBeers({state}){
        state.loading = true
        state.showButtonNext = false
        let response = await axios.get(state.url, {params: state.params})

        if (response.data.length != 0){
            response.data.forEach(item => {
                state.beers.push({beer: item, page: state.params.page})
            })
        }
        else {
            state.showButtonNext = false
        }
        state.params.page++
        setTimeout(() => {
            state.loading  = false
            if(response.data.length != 0)
            {state.showButtonNext = true}
            }, 1000)

    }
}


const mutations = {
}

const config = {
    modules: {},
    state,
    getters,
    mutations,
    actions,
};

export default new Vuex.Store(config);