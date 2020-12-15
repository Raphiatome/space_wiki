<template>
    <div>
        <div v-for="astro in all_astro" v-bind:key="astro.id">
          <div v-if="astro.agency !== null && astro.progile_image_thumbnail !== null">
            <span>{{ astro.name }}</span>
            <span>{{ astro.agency.abbrev }}</span>
            <img :src="astro.profile_image_thumbnail" />         
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  name: 'Astronauts',
  data() {
    return {
      all_astro: null,
    }
  },
  methods: {
    next: async function(num)
    {

    }
  },
  created: async function(){
     await axios.get("https://spacelaunchnow.me/api/3.3.0/astronaut/?limit=30").then((response) => {
        this.all_astro = response.data.results;
      });
  },
}
</script>
