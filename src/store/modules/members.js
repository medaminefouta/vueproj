const state = {
        headers: [
          { text: "First Name", value: "firstName"},
          { text: "Last Name", value: "lastName"},
          { text: "Working Time", value: "workingTime"},
          { value: "actions", sortable: false },
        ],
        dialog: false,
        dialogDelete: false,
        users: [
          {id: "1",  firstName: "moha",lastName: "fo",workingTime: 0.7,teamId: "6"},
          {id: "2",  firstName: "hhhh",lastName: "hhhh",workingTime: 0.7,teamId: "6"}
        ],
        editedIndex: -1,
        editedItem: {
          id: '',
          firstName: '',
          lastName: '',
          workingTime: 0,
        },
        defaultItem: {
          id: '',
          firstName: '',
          lastName: '',
          workingTime: 0,
        },
      
};

const getters = {
    formTitle: state => {
        return state.editedIndex === -1 ? "New Member" : "Edit Member";
      },
};

const mutations = {
    addMember: (state, payload)=> {
        state.users.unshift(payload)
       },
       setMembers: (state, payload)=> {
        state.users = payload
       },
       editMember: (state, payload) => {
        Object.assign(state.users[payload.editedIndex], 
          payload.data
        )},
        deleteMember: (state, payload) => {
          state.users.splice(payload, 1);
        }
};

export default {
  namespaced: true,

    state, getters, mutations
}