<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="teamUsers"
          :search="searchText" 
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="text-uppercase">Team_Name</v-toolbar-title>

              <v-spacer></v-spacer>

               <v-btn
                    to="/teams"
                    color="#1DE9B6"
                    dark
                    class="mb-2 mr-2"
                  >
                  <v-icon>arrow_back_ios</v-icon>
                   Back to Teams
                  </v-btn>
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="$store.state.members.dialog=!$store.state.members.dialog"
                  >
                    New Member
                  </v-btn>

            <AddMember />

            <DeleteMember />

            </v-toolbar>
            <v-divider></v-divider>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="searchText"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn small dark color="#80DEEA" class="mr-2" @click="editItem(item)">Edit</v-btn>
            <v-btn small dark color="#EF5350" @click="deleteItem(item)"> Delete </v-btn>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddMember from './AddMember.vue';
import DeleteMember from './DeleteMember.vue';
import {mapMutations, mapState} from 'vuex'
export default {
  components: { AddMember, DeleteMember },
  data: () => ({
    searchText: '',
  }),
  computed: {
      headers() {
      return this.$store.state.members.headers;
    },
    ...mapState('members', ['users']),
    teamUsers() {
      const teamId = this.$route.params.id;
      const selectedTeams = this.users.filter(user => user.teamId === teamId); 	  return [...selectedTeams];
  },
  },
  methods: {
     editItem(item) {
      this.$store.state.members.editedIndex = this.$store.state.members.users.indexOf(item);
      this.$store.state.members.editedItem = Object.assign({}, item);
      this.$store.state.members.dialog = true;    
    },
    deleteItem(selectedMember) {
       this.$store.state.members.editedIndex = this.$store.state.members.users.findIndex(member => member === selectedMember);
       this.$store.state.members.editedItem = Object.assign({}, selectedMember);
       this.$store.state.members.dialogDelete = true;
    },
    ...mapMutations('members', ['setmembers']),
  }
}
</script>
