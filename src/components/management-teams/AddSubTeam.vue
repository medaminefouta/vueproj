<template>
  <div>
         <v-dialog v-model="$store.state.teams.subDialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">New SubTeam</span>
                  </v-card-title>                 
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.teams.editedSubTeam.subName"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.teams.editedSubTeam.subManager"
                            label="Managers"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EF5350" text @click="closeSubDialog">
                      Cancel
                    </v-btn>
                    <v-btn color="#1DE9B6" text @click="saveSubTeams">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    methods: {
      ...mapMutations('teams', ['setTeams']),
        saveSubTeams() {
            const enteredSubTeam = {
            id: new Date().toISOString(),
            name: this.$store.state.teams.editedSubTeam.subName,
            manager: this.$store.state.teams.editedSubTeam.subManager,
            parentId: this.$store.state.teams.editedItem.id
            }
            //this.$store.state.teams.teams.unshift(enteredSubTeam);
            this.setTeams(enteredSubTeam);
        
            this.$store.state.teams.editedSubTeam = Object.assign({}, this.$store.state.teams.defaultItem);
            this.$store.state.teams.editedItem = Object.assign({}, this.$store.state.teams.defaultItem);
            this.$store.state.teams.editedIndex= -1;
            this.$store.state.teams.subDialog = false;
        }, 
      closeSubDialog(){
      this.$store.state.teams.subDialog= false;
      this.$store.state.teams.editedItem = Object.assign({}, this.$store.state.teams.defaultItem);
      this.$store.state.teams.editedIndex = -1;
    },
    }
}
</script>

<style>

</style>