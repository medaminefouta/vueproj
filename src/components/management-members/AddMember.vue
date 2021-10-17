<template>
  <div>
               <v-dialog v-model="$store.state.members.dialog" max-width="500px">
                  <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>                 
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.members.editedItem.firstName"
                            label="First Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.members.editedItem.lastName"
                            label="Last Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="$store.state.members.editedItem.workingTime"
                            type="number" min="0" max="1" step="0.1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EF5350" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="#1DE9B6" text @click="$store.state.members.editedIndex > -1 ? edit() : save()">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
               </v-dialog>
   
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapGetters('members',['formTitle'])
  },
  methods: {
    ...mapMutations('members',['addMember', 'editMember']),
      save() {
        const enteredUser = {
          id: new Date().toISOString(),
          firstName: this.$store.state.members.editedItem.firstName,
          lastName: this.$store.state.members.editedItem.lastName,
          workingTime: this.$store.state.members.editedItem.workingTime,
          teamId: this.$route.params.id
        }
        this.addMember(enteredUser);
        this.close();
      },
      edit() {
      const editedData = {
        firstName: this.$store.state.members.editedItem.firstName,
        lastName: this.$store.state.members.editedItem.lastName,
        workingTime: this.$store.state.members.editedItem.workingTime,
        teamId: this.$route.params.id
      }
      this.editMember({editedIndex: this.$store.state.members.editedIndex, data: editedData});
      this.$store.state.members.editedIndex = -1;
      this.close();
     
    },
    close() {
      this.$store.state.members.dialog = false;
      this.$store.state.members.editedItem = Object.assign({}, this.$store.state.members.defaultItem);
      this.$store.state.members.editedIndex = -1;
    },
    }
}
</script>

<style>

</style>