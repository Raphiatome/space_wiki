<template>
        <div class="ship_vignette" v-for="ship in all_ship" v-bind:key="ship.id">
          <div v-if="ship.image_url !== null">
            <router-link :to="`/ship/${ship.id}`">{{ ship.name }}</router-link>
            <img :src="ship.configuration.image_url" style="width: 50px; height: 50px;" />    
            <span>{{ getAbbrevById(ship.configuration.agency.id) }}</span>     
          </div>
        </div>
        <div class="controllers">
          <button @click="go_to('prev')">Prev</button>
          <button @click="go_to('next')">Prev</button>
        </div>
        <router-view class="ship_detail"></router-view>
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  name: 'Ship',
  data() {
    return {
      all_ship: null,
      all_agencies: [],
      page_offset: 0
    }
  },
  methods: {
    go_to: async function(pos)
    {
      if(pos == "next") this.page_offset+=30;
      if(pos == "prev" && this.page_offset > 0) this.page_offset-=30;

      await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/?limit=${this.page_offset}`).then((response) => {
          this.all_ship = response.data.results
        });
    },
    getAbbrevById: function(id)
    {
      return this.all_agencies[id];
    }
  },
  created: async function (){
    this.go_to('start');

    await axios.get("https://spacelaunchnow.me/api/3.3.0/agencies/?limit=600&ordering=id")
               .then((response)=> {
                  let results = response.data.results;
                  results.forEach(agency => {
                    if(agency.abbrev != null) this.all_agencies[agency.id] = agency.abbrev;
                  });
                });
  } 
}
</script>
