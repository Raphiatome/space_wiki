<template>
      <router-link to="/">Astronautes</router-link>
      <router-link to="/ship">Vaisseaux</router-link>
      <router-link to="/events">Evenements</router-link>
      <router-link to="/details/{type}/{id}"></router-link>
      <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
}
</script>
