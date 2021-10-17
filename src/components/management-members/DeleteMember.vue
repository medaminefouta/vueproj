<template>
  <div>
            <v-dialog v-model="$store.state.members.dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6">
                    Are you sure you want to delete {{$store.state.members.editedItem.firstName}} {{$store.state.members.editedItem.lastName}} ?
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
import {mapMutations} from 'vuex';
export default {
    methods: {
       ...mapMutations('members',['deleteMember']),
        deleteItemConfirm() {
       this.deleteMember( this.$store.state.members.editedIndex);
      this.closeDelete();
    },
    closeDelete() {
      this.$store.state.members.dialogDelete = false;
        this.$store.state.members.editedItem = Object.assign({}, this.$store.state.members.defaultItem);
        this.$store.state.members.editedIndex = -1;  
    },
    }

}
</script>

<style>

</style>