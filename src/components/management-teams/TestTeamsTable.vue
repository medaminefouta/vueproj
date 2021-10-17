<template>
 <v-container>
    <v-row>
      <v-col>
       <v-simple-table>

      <template v-slot:top>
          <v-toolbar flat>
              <v-toolbar-title class="text-uppercase">TEAMS MANAGEMENT</v-toolbar-title>
                <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" @click="$store.state.teams.dialog=!$store.state.teams.dialog">New Member</v-btn>

            <AddTeam />

            <AddSubTeam />

            <DeleteTeam />

          </v-toolbar>
     </template>

      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" class="text-left">
              {{header}}
            </th>
          </tr>
        </thead>
        <ActionButtons />
      </template>
    </v-simple-table>
            
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddTeam from './AddTeam'
import AddSubTeam from './AddSubTeam'
import DeleteTeam from './DeleteTeam'
import ActionButtons from './ActionButtons'
import {mapActions} from 'vuex'



export default {
  components: {AddTeam, AddSubTeam, DeleteTeam, ActionButtons},

  mounted () {
    this.getTeams()
  },
 
  computed: {
    headers() {
      return this.$store.state.teams.headers;
    },
  },

   methods: {
      ...mapActions('teams', ['getTeams'])
    }
}
</script>
