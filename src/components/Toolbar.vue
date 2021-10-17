<template>
 
      <v-toolbar flat>
  
        <v-toolbar-title>Software Productivity Services Team Forecast</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-menu bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="secondary"
                  class="align-self-center mr-4"
                  v-bind="attrs"
                  v-on="on"
                  >
                  Action
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
  
              <v-list class="grey lighten-3">
                <v-list-item>Remember To Forecast Email</v-list-item>
                <v-list-item> <router-link style="text-decoration: none; color: inherit;" to="/teams">Team Management</router-link> </v-list-item>
                <v-list-item>Import skills from Decidalo</v-list-item>
              </v-list>
            </v-menu>
      </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>