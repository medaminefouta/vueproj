<template>
  <nav>
    <v-app-bar dense flat app color="blue">
     <v-btn small plain><router-link style="text-decoration: none; color: inherit;" to="/">Logo</router-link></v-btn>
       <v-spacer></v-spacer>
            <v-menu bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
             v-bind="attrs"
            v-on="on"
            small plain>
              <v-icon large dark>
               account_circle
              </v-icon>
              Account-Name
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
              </template>
  
              <v-list class="grey lighten-3">
                <v-list-item @click="logout()">Logout</v-list-item>
                <v-list-item> <router-link style="text-decoration: none; color: inherit;" to="/teams">Team Management</router-link> </v-list-item>
              </v-list>
            </v-menu>
   </v-app-bar>
  </nav>
</template>



<script>
import { mapActions} from "vuex";

export default {
  data() {
    return{
    }
  },
  methods: {
     ...mapActions("authentication", ["logout"])
  }
}
</script>