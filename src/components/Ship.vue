<template>
  <div id="content">
    <div class="vignette ship" v-for="ship in all_ship" v-bind:key="ship.id">
        <img class="vignette_img" :src="ship.configuration.image_url" style="width: 150px; height: 150px;" />
        <div class="vignette_text">
          <router-link class="link_to_details" :to="{name: 'ship_details', params: {id: ship.id}}">{{ ship.name }}</router-link>
          <span>{{ getAbbrevById(ship.configuration.agency.id) }}</span>
        </div>
    </div>
    <router-view></router-view>
  </div>
  <div id="controllers">
      <button @click="goto('p')">Prev</button>
      <button @click="goto('n')">Next</button>
  </div>
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
      pos: 0
    }
  },
  methods: {
    getAbbrevById: function(id)
    {
      return this.all_agencies[id];
    },
    goto: async function(dir)
    {
      if(dir == "n") this.pos+=30;
      if(dir == "p" && this.pos > 0) this.pos-=30;
      if(this.pos > 0)
      {
        await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/?limit=30&offset=${this.pos}`).then((response) => {
          this.all_ship = response.data.results
        });
        router.push("/ship");
      }
    }
  },
  created: async function (){
    await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/?offset=30&limit=30`).then((response) => {
          this.all_ship = response.data.results
    });

    this.all_ship.forEach(ship => {
      if(ship.image_url == null) this.all_ship.splice(this.all_ship.indexOf(ship), 1);
    });

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
