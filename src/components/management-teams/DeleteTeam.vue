<template>
  <div>
            <v-dialog v-model="$store.state.teams.dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6">
                    Are you sure you want to delete this Team ?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="#EF5350" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
            </v-dialog>
  </div>
</template>

<script>
export default {
    methods: {
    deleteItemConfirm() {
      this.$store.state.teams.teams.splice(this.$store.state.teams.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.$store.state.teams.dialogDelete = false;
      this.$store.state.teams.editedItem = Object.assign({}, this.$store.state.teams.defaultItem);
      this.$store.state.teams.editedIndex = -1;  
    },
    }
}
</script>

<style>

</style>