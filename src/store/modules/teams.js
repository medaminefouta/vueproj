import HTTP from '../../config/http'

const state = {
    teams: {
        headers: [null, "Name", "Managers", "Members", null],
        teams: [
        
        ],
        editedIndex: -1,
        dialog: false,
        dialogDelete: false,
        subDialog: false,
        editedItem: {
        id: "",
        name: "",
        manager: "",
      },
      editedSubTeam: {
        id: "",
        subName: "",
        subManager: ""
      },
      defaultItem: {
        id: "",
        name: "",
        manager: "",
      },
}
  
};

const getters = {

    popUpTitle: state => {
        return state.teams.editedIndex > -1 ? "edit Team" : "Add Team"
      },
};

const mutations = {
    setTeams (state, payload) {
        state.teams = payload;
    }
};

const actions = {
    getTeams({commit}) {
        HTTP().get('teams')
        .then(({data})=>{
        commit('setTeams', data.teams)
        console.log(data);
        })
    }
}

export default {
namespaced: true,

state, getters, mutations, actions
}