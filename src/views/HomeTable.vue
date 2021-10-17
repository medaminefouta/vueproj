<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <div class="app-container">
                <table>
                  <tr>
                    <th>
                      <v-btn color="#578ebe" x-small>Expand All</v-btn>
                    </th>
                  </tr>
                  <tr>
                    <td height="20px"></td>
                  </tr>
                  <tr>
                    <v-btn
                      text
                      @click="() => expand(productivity)"
                      v-show="hasChildren(productivity.teams)"
                      >{{ productivity.isExpanded ? "[-]" : "[+]" }}</v-btn
                    >
                    <td>{{ productivity.name }}</td>
                  </tr>
                  <template v-for="(team, idx) in productivity.teams">
                    <tr v-show="productivity.isExpanded" :key="'team' + idx">
                      <v-btn
                        text
                        @click="() => expand(team)"
                        v-show="hasChildren(team.projects)"
                        >{{ team.isExpanded ? "[-]" : "[+]" }}</v-btn
                      >
                      <td>{{ team.name }}</td>
                    </tr>
                    <tr
                      v-for="(project, p) in team.projects"
                      :key="p"
                      v-show="team.isExpanded && productivity.isExpanded"
                    >
                      <v-btn text disabled>|-</v-btn>

                      <td>{{ project.name }}</td>
                    </tr>
                  </template>
                </table>

                <table
                  v-for="(caption, c) in captions"
                  :key="c"
                  :class="caption.classes"
                >
                  <tr>
                    <th :style="caption.header" :colspan="caption.span">
                      {{ caption.title }}
                    </th>
                  </tr>
                  <tr>
                    <td class="month" v-for="(s, i) in caption.span" :key="i">
                      {{ months[caption.offset + i] }}
                    </td>
                  </tr>
                  <tr>
                    productivity
                  </tr>
                  <template v-for="(team, idx) in productivity.teams">
                    <tr v-show="productivity.isExpanded" :key="'team' + idx">
                      <td>team</td>
                    </tr>
                    <tr
                      v-for="(project, p) in team.projects"
                      :key="p"
                      v-show="team.isExpanded && productivity.isExpanded"
                    >
                      <td
                        :style="
                          'background-color:' +
                          colors(
                            project.workload[months[caption.offset + m - 1]]
                          )
                        "
                        v-for="m in caption.span"
                        :key="m"
                      >
                        {{ project.workload[months[caption.offset + m - 1]] }} %
                      </td>
                    </tr>
                  </template>
                </table>
                <table class="trend">
                  <tr>
                    <th height="38px" class="header">TREND</th>
                  </tr>
                  <tr>
                    <td height="46px" class="month">
                      Trend ({{ months[0] }} - {{ months[months.length - 1] }})
                    </td>
                  </tr>
                  <tr>
                    productivity
                  </tr>
                  <template v-for="(team, idx) in productivity.teams">
                    <tr v-show="productivity.isExpanded" :key="'team' + idx">
                      <td>team</td>
                    </tr>
                    <tr
                      v-for="(project, p) in team.projects"
                      :key="p"
                      v-show="team.isExpanded && productivity.isExpanded"
                    >
                      <td
                        class="d-flex"
                        style="border-bottom: 2px solid #ddd !important"
                      >
                        <v-sheet
                          :color="colors(workload)"
                          width="10px"
                          height="10px"
                          class="mt-2"
                          :class="pw === 2 || pw === 3 ? 'mr-4' : 'mr-2'"
                          v-for="(workload, pw) in Object.values(
                            project.workload
                          )"
                          :key="pw"
                        >
                          <!-- <span :style="'color:' + colors(workload)">
                        {{ pw }}
                      </span>-->
                        </v-sheet>
                      </td>
                    </tr>
                  </template>
                </table>
                <table class="outlook">
                  <tr>
                    <th height="38px" class="header">OUTLOOK</th>
                  </tr>
                  <tr>
                    <td height="46px" class="month">Outlook</td>
                  </tr>
                  <tr>
                    productivity
                  </tr>
                  <template v-for="(team, idx) in productivity.teams">
                    <tr v-show="productivity.isExpanded" :key="'team' + idx">
                      <td>team</td>
                    </tr>
                    <tr
                      v-for="(project, p) in team.projects"
                      :key="p"
                      v-show="team.isExpanded && productivity.isExpanded"
                    >
                      <td class="d-flex">
                        <v-btn icon color="green" x-small>
                          <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn icon color="orange" x-small>
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                        <p
                          style="
                            width: 90%;
                            overflow: hidden;
                            white-space: nowrap;
                          "
                        >
                          Neque porro quisquam
                        </p>
                        <div style="display: flex">
                          <v-btn icon color="blue" x-small>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon color="red" x-small>
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      backgroundColor: "",
      captions: [
        {
          header: "background-color: green; color:white;",
          title: "Prev. 3 Months",
          classes: "three",
          offset: 0,
          span: 3,
        },
        {
          header: "background-color: purple; color:white;",

          title: "Act. Month",
          classes: "one",
          offset: 3,
          span: 1,
        },
        {
          header: "background-color: blue; color:white;",

          title: "Next 6 Months",
          classes: "six",
          offset: 4,
          span: 6,
        },
      ],
      months: [],
      productivity: {
        isExpanded: false,
        name: "software productivity services",
        teams: [
          {
            isExpanded: false,
            id: 1,
            name: "sps-west",
            projects: [],
          },
          {
            isExpanded: false,
            id: 2,
            name: "sps-nord",
            projects: [],
          },
          {
            isExpanded: false,
            id: 3,
            name: "sps-mitte-süd",
            projects: [],
          },
        ],
      },
      projects: [
        {
          teamId: 1,
          name: "Project 1",
          workload: {
            May: "61",
            Jun: "52",
            Jul: "43",
            Aug: "64",
            Sep: "55",
            Oct: "47",
            Nov: "50",
            Dec: "51",
            Jan: "59",
            Feb: "50",
          },
        },
        {
          teamId: 1,
          name: "Project 2",
          workload: {
            May: "61",
            Jun: "52",
            Jul: "43",
            Aug: "64",
            Sep: "55",
            Oct: "46",
            Nov: "50",
            Dec: "50",
            Jan: "59",
            Feb: "50",
          },
        },
        {
          teamId: 2,
          name: "Project 3",
          workload: {
            May: "61",
            Jun: "52",
            Jul: "43",
            Aug: "64",
            Sep: "55",
            Oct: "80",
            Nov: "50",
            Dec: "50",
            Jan: "59",
            Feb: "50",
          },
        },
      ],
    };
  },
  mounted() {
    this.teamProjects();
    for (let i = 3; i >= 1; i--) {
      const previousMonths = moment().subtract(i, "months").format("MMM");
      this.months.push(previousMonths);
    }
    for (let i = 0; i <= 6; i++) {
      const currentMonth = moment().add(i, "months").format("MMM");
      this.months.push(currentMonth);
    }
  },
  methods: {
    hasChildren(team) {
      return !!team.length;
    },
    // toggle expand on this.$store.state.teams node
    expand(team) {
      team.isExpanded = !team.isExpanded;
    },
    teamProjects() {
      this.projects.forEach((p) => {
        this.productivity.teams.find((t) => t.id === p.teamId).projects.push(p);
      });
    },
    colors(x) {
      if (x >= 0 && x < 49) {
        return "red";
      } else if (x >= 50 && x < 79) {
        return "orange";
      } else if (x >= 80) {
        return "green";
      }
    },
  },
};
</script>

<style  lang="css">
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
/* * {
  font-size: small;
} */
.app-container {
  display: flex;
}

.header {
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: #34c0eb;
}
.month {
  border-bottom: 2px solid #ddd !important;
  border-top: 2px solid #ddd !important;
}
.three {
  width: 20%;
  margin-left: 2%;
  margin-right: 1%;
}
.one {
  width: 10%;
  margin-right: 1%;
}
.six {
  width: 40%;
}
.trend {
  width: 20%;
  margin-left: 1%;
}
.outlook {
  flex-grow: 100;
  width: 40%;
  margin-left: 1%;
}
</style>