<template>
<div id="blur"></div>
<div id="detail-box">
    <div v-for="info in render_details" v-bind:key="render_details.indexOf(info)">
          <img id="detail_img" v-if="info.name == 'Image'" :src="info.value" style="width:100px;height:100px" />
          <span id="detail_title" v-else-if="info.name == 'Titre'" class="detail_title">{{info.value}}</span>
          <span class="detail_info" v-else-if="info.value !== null">{{info.name}} : {{info.value}}</span>
          <span class="detail_null" v-else>{{info.name}} : Inconnu/e</span>
    </div>
    <button class="back_btn" @click="goBack">Back</button>
</div>
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from '../router';

export default {
  inheritAttrs: false,
  name: 'Details',
  data() {
    return {
      render_details:[],
    }
  },
  methods: {
    goBack()
    {
      router.go(-1);
    }
  },
  created: async function()
  {
    let qry;
    if(this.$route.name == 'ship_details') qry = `https://spacelaunchnow.me/api/3.3.0/spacecraft/${this.$route.params.id}`;
    if(this.$route.name == 'astro_details') qry = `https://spacelaunchnow.me/api/3.3.0/astronaut/${this.$route.params.id}`;
    if(this.$route.name == 'event_details') qry = `https://spacelaunchnow.me/api/3.3.0/event/?search=${this.$route.params.id.split(' ').join('%20')}`;
    console.log(qry);
    await axios.get(qry).then((response) => {
        let resData = response.data;
        let cpt = 0;
        if(this.$route.name == 'ship_details')
        {
            this.render_details.push({name: "Image", value: resData.spacecraft_config.image_url});
            
            this.render_details.push({name: "Agence", value: resData.spacecraft_config.agency.name});
            this.render_details.push({name: "Hauteur", value: resData.spacecraft_config.height});
            this.render_details.push({name: "Diamètre", value: resData.spacecraft_config.diameter});
            this.render_details.push({name: "Utilisation", value: resData.spacecraft_config.capability});
            this.render_details.push({name: "Statut", value: resData.status.name});
            this.render_details.push({name: "Vols", value: resData.flights.lenght});
            this.render_details.push({name: "Description", value: resData.description});
            this.render_details.push({name: "Historique", value: resData.spacecraft_config.history});
        } else if(this.$route.name == 'astro_details')
        {
            this.render_details.push({name: "Image", value: resData.profile_image_thumbnail});
            this.render_details.push({name: "Titre", value: resData.name});
            this.render_details.push({name: "Nationalité", value: resData.nationality});
            this.render_details.push({name: "Agence", value: resData.agency.name});
            this.render_details.push({name: "Naissance", value: resData.date_of_birth});
            this.render_details.push({name: "Décès", value: resData.date_of_death});
            this.render_details.push({name: "Statut", value: resData.status.name});
            this.render_details.push({name: "Vols", value: resData.flights.lenght});
            this.render_details.push({name: "Biographie", value: resData.bio});
        } else 
        {
          this.render_details.push({name: "Image", value: resData.results[0].feature_image});
          this.render_details.push({name: "Titre", value: resData.results[0].name});
          this.render_details.push({name: "Date", value: resData.results[0].date});
          this.render_details.push({name: "Type", value: resData.results[0].type.name});
          this.render_details.push({name: "Lieu", value: resData.results[0].location});
          this.render_details.push({name: "Description", value: resData.results[0].description});
        }
    });
  }
}
</script>
