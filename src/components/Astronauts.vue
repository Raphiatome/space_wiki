<template>
  <div id="content">
    <div class="vignette astro" v-for="astro in all_astro" v-bind:key="astro.id">
      <img class="vignette_img" :src="astro.profile_image_thumbnail" />  
      <div class="vignette_text">
        <router-link class="link_to_details" :to="{name: 'astro_details', params: {id: astro.id}}">{{astro.name}}</router-link>
        <span>{{ astro.agency.abbrev }}</span>
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
import router from "../router";

export default {
  name: 'Astronauts',
  data() {
    return {
      all_astro: null,
      pos: 0
    }
  },
  methods: {
    goto: async function(dir)
    {
      if(dir == "n") this.pos+=30;
      if(dir == "p" && this.pos > 0) this.pos-=30;
      if(this.pos > 0)
      {
        await axios.get(`https://spacelaunchnow.me/api/3.3.0/astronaut/?limit=30&offset=${this.pos}`).then((response) => {
          this.all_astro = response.data.results
        });
        router.push("/");
      }
    }
  },
  created: async function(){
     await axios.get("https://spacelaunchnow.me/api/3.3.0/astronaut/?limit=30").then((response) => {
        this.all_astro = response.data.results;
        console.log(this.all_astro);
      });

    this.all_astro.forEach(astro => {
      if(astro.profile_image_thumbnail == null) this.all_astro.splice(this.all_astro.indexOf(astro), 1);
    });
    
  },
}
</script>
