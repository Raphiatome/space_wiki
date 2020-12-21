<template>
  <div id="content">
    <div class="vignette event" v-for="event in all_events" v-bind:key="event.id">
      <img class="vignette_img" v-if="event.feature_image !== null" style="width:200px;height:200px" :src="event.feature_image" />
      <div class="vignette_text">
        <router-link class="link_to_details" :to="{name: 'event_details', params: {id: event.name}}">{{event.name}}</router-link>  
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
import router from '../router';

export default {
  name: 'Event',
  data() {
    return {
      all_events: null,
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
        await axios.get(`https://spacelaunchnow.me/api/3.3.0/event/?limit=30&offset=${this.pos}`).then((response) => {
          this.all_events = response.data.results
        });
        router.push("/events");
      }
    }
  },
  created: async function(){
    await axios.get("https://spacelaunchnow.me/api/3.3.0/event/?limit=30&offset=30").then((response) => {
        this.all_events = response.data.results;
      });

    this.all_events.forEach(event => {
      if(event.image_url == null) this.all_events.splice(this.all_events.indexOf(event), 1);
    });
  }
}
</script>
