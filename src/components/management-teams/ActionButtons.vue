<template>
       <tbody>
        <tr :key="team.id" v-for="team in teamsForTree">
          <td>
            <button
              @click="() => expand(team)"
              v-show="hasChildren(team)"
            >
              {{ team.isExpanded ? "[-]" : "[+]" }}
            </button>
            <div v-if="team.parentId != null">|-</div>
          </td>
          <td>{{ team.name }}</td>
          <td>{{ team.manager }}</td>
          <td><v-btn color="primary" small v-if="team.parentId" :to="'/teams/'+team.id">Show Memebers</v-btn></td>
          <td>
          <v-btn color="green" small class="mr-2" @click="openSubDialog(team)" v-if="team.parentId == null">Add SubTeam</v-btn>
          <v-btn small color="#80DEEA" class="mr-2" @click="editItem(team)">Edit</v-btn>
          <v-btn small color="#EF5350" @click="deleteItem(team)"> Delete </v-btn>
          </td>
        </tr>
      </tbody>
</template>

<script>
import Vue from "vue";
export default {
    created() {
    // add an isExpanded property to indicate if we should show its children
    this.$store.state.teams.teams.forEach((l) => {
      Vue.set(l, "isExpanded", false); // kola l is Expanded is false
    });
  },
    computed: {
        // get all visible locations for the tree view
    teamsForTree: function () {
      let teamsForTree = [];

      // get all root nodes, which have no parentId
      let teams = this.$store.state.teams.teams.filter((l) => l.parentId == null);

      // for every root location
      teams.forEach((l) => {
        // add it to the array
        teamsForTree.push(l);

        // check if it is set to expanded
        if (l.isExpanded) {

          // find children of it
          let children = this.$store.state.teams.teams.filter((l1) => l1.parentId === l.id);

          // add children below that parent tree row
          teamsForTree = teamsForTree.concat(children);
        }
      });

      return teamsForTree;
    },
    },
    methods: {
    // check if a node has any children
    hasChildren(team) {
      return (
        this.$store.state.teams.teams.filter((l) => l.parentId === team.id).length > 0
      );
    },
    // toggle expand on this.$store.state.teams node
    expand(team) {
      team.isExpanded = !team.isExpanded;
    },
    openSubDialog(parent){
      console.log(parent);
      this.$store.state.teams.editedIndex = this.$store.state.teams.teams.indexOf(parent);
      this.$store.state.teams.editedItem = Object.assign({}, parent);
      this.$store.state.teams.subDialog= true 
    },
     deleteItem(selectedTeam) {
       this.$store.state.teams.editedIndex = this.$store.state.teams.teams.findIndex(team => team === selectedTeam);
       this.$store.state.teams.editedItem = Object.assign({}, selectedTeam);
       this.$store.state.teams.dialogDelete = true;
    },   
    editItem(item) {
      this.$store.state.teams.editedIndex = this.$store.state.teams.teams.indexOf(item);
      this.$store.state.teams.editedItem = Object.assign({}, item); 
      this.$store.state.teams.dialog = true;
    }, 
    }
}
</script>