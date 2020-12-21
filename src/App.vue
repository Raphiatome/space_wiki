<template>
  <div id="header">
    <router-link class="head_link" :to="{name: 'astro'}">Astronautes</router-link>
    <router-link class="head_link" :to="{name: 'ship'}">Vaisseaux</router-link>
    <router-link class="head_link" :to="{name: 'event'}">Evenements</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
