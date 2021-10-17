<template>
  <div>
        <v-dialog v-model="$store.state.teams.dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{popUpTitle}}</span>
                  </v-card-title>                 
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.teams.editedItem.name"
                            label="New SubTeam"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                         v-model="$store.state.teams.editedItem.manager"
                            label="Manager First & Last Name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EF5350" @click="close()">
                      Cancel
                    </v-btn>
                    <v-btn color="#1DE9B6" @click="$store.state.teams.editedIndex > -1 ? edit() : save()">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  </div>
</template>

<script>
export default {
    computed: {
        popUpTitle() {
      return this.$store.getters.popUpTitle;
    },
    },
    methods: {
    save() {
      const enteredUser = {
        id: new Date().toISOString(),
        isExpanded: false,
        name: this.$store.state.teams.editedItem.name,
        manager: this.$store.state.teams.editedItem.manager,
      }
      this.$store.state.teams.teams.unshift(enteredUser);
      this.close();
    },
    edit() {
      Object.assign(this.$store.state.teams.teams[this.$store.state.teams.editedIndex], { // item == this.$store.state.teams.users[this.$store.state.teams.editedIndex]
        name: this.$store.state.teams.editedItem.name,
        manager: this.$store.state.teams.editedItem.manager
      }),
      this.$store.state.teams.editedIndex= -1;
      this.close();
    },
    close() {
      this.$store.state.teams.subDialog= false;
      this.$store.state.teams.dialog = false;
      this.$store.state.teams.editedItem = Object.assign({}, this.$store.state.teams.defaultItem);
      this.$store.state.teams.editedIndex = -1;
    },
    }
}
</script>

<style>

</style>