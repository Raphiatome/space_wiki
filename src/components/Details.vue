<template>
    <div v-if="this.$route.name == 'ship_detail'">
        <img :src="img_url" />
        <span>{{title}}</span><br>
        <span>Nationalité : {{nationality}}</span><br>
        <span>Agence : {{agency}}</span><br>
        <span>Naissance : {{birth}}</span><br>
        <span v-if="death !== null">Décès : {{death}}</span><br>
        <span>Statut : {{statut}}</span><br>
        <span>Vols : {{flies}}</span><br>
        <span>Bio : {{bio}}</span>
    </div>
    <div v-if="this.$route.name == 'astro_detail'">

    </div>
    <div v-if="this.$route.name == 'event_detail'">

    </div>  
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  name: 'Details',
  data() {
    return {
      nationality: null,
      agency: null,
      birth: null,
      death: null,
      statut: null,
      flies: null,
      bio: null,
      desc: null,
      history: null,
      location: null,
      date: null,
      type: null,
      img_url: null,
      title: null,
      use: null,
      haut: null,
      larg: null
    }
  },
  methods: {
    next: async function()
    {
      
    }
  },
  mounted: async function()
  {
    let qry;
    if(this.$route.name == 'ship_detail') qry = `https://spacelaunchnow.me/api/3.3.0/spacecraft/${this.$route.params.id}`;
    if(this.$route.name == 'astro_detail') qry = `https://spacelaunchnow.me/api/3.3.0/astronaut/${this.$route.params.id}`;
    if(this.$route.name == 'event_detail') qry = `https://spacelaunchnow.me/api/3.3.0/event/${this.$route.params.id}`;
    
    await axios.get(qry).then((response) => {
        let resData = response.data;
        if(this.$route.name == 'ship_detail')
        {
            this.title = resData.name;
            this.image_url = resData.spacecraft_config.image_url;
            this.agency = resData.spacecraft_config.agency.name;
            //....
        }
    });
  }
}
</script>
