<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
     <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from './components/header/TheHeader.vue';
import TheFooter from './components/footer/TheFooter.vue';

export default {
  name: 'App',
  components: {TheHeader, TheFooter}, 
  data: () => ({
    //
  }),
};
</script>
