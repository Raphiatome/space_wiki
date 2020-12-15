<template>
    <div>
        <div v-for="event in all_events" v-bind:key="event.id">
          <div v-if="event.image_url !== null">
            <span>{{ event.name }}</span>
            <img :src="event.image_url" />         
          </div>
        </div>
    </div>
      
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  name: 'Event',
  data() {
    return {
      all_events: null,
    }
  },
  methods: {
    next: async function()
    {
      
    }
  },
  created: async function(){
    await axios.get("https://spacelaunchnow.me/api/3.3.0/astronaut/?limit=50").then((response) => {
        this.all_events = response.data.results;
      });
  }
}
</script>
