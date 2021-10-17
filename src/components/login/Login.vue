<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <v-form ref="form" lazy-validation onsubmit="return false;">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field @keyup="setErrorData({})" v-model="username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field @keyup="setErrorData({})" v-model="password" type="password" id="password" label="Password" prepend-icon="lock" name="password"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-alert prominent type="error" v-if="errorData.message">{{errorData.message}}</v-alert>
                      </v-col>
                      <v-col cols="12">
                        <v-btn dark block large @click="login()">login</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                     </v-card-text>
                  </v-card>
               </v-col>
            </v-row>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
   name: 'Login',

   computed: {
       ...mapState("authentication", ["credentials", "errorData"]),
       username:{set(value) {
           this.setUsername(value)
       },
       get() {
           return this.credentials.username;
       }},
       password:{set(value) {
           this.setPassword(value)
       },
       get() {
           return this.credentials.password;
       }}
   },

   methods: {
       ...mapMutations("authentication", ["setUsername", "setPassword", "setErrorData"]),
       ...mapActions("authentication", ["login"])
   }
};
</script>

<style></style>
