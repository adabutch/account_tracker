<template>
  <div>
    <progressStepper
      :step-active="stepActive"
      :previous-button="previous"
      :next-button="next" />

    <div class="page-inner-wrapper">
      <asideComponent />

      <form>
        <h1>
          <strong>Step Two:</strong>&nbsp;Facility specific information
        </h1>

        <exampleSelect v-model="facility"
                        label="Facility"
                        name="facility"
                        id="facility"
                        :options="deptFacilities" />

        <div class="field-group">
          <label for="department">Department</label>
          <select name="department"
                  id="department"
                  type="select"
                  v-model="department">
            <option v-for="(item, index) in departmentOptions"
                    :value="{id: item.value, name: item.text}">
              {{ item.text }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label for="group">Group</label>
          <select name="group"
                  id="group"
                  type="select"
                  v-model="group">
            <option v-for="(item, index) in departmentGroupOptions"
                    :value="{id: item.value, name: item.text}">
              {{ item.text }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label for="job">Job</label>
          <select name="job"
                  id="job"
                  type="select"
                  v-model="job">
            <option v-for="(item, index) in groupJobOptions"
                    :value="{id: item.value, name: item.text, salaryGroup: item.salaryGroup, clockInRequired: item.clockInRequired}">
              {{ item.text }} ({{item.salaryGroup}})
            </option>
          </select>
        </div>

        <div class="field-group">
          <label for="start-date">Start Date</label>
          <flat-pickr v-model="startDate"
                      ref="datepicker"
                      :config="config"
                      placeholder="Select date"
                      name="date"></flat-pickr>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  mapFields }           from 'vuex-map-fields'

import moment           from 'moment'

import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'

import flatPickr        from 'vue-flatpickr-component';
import                       'flatpickr/dist/flatpickr.css';

export default {
  layout:           'create',
  components: {
    progressStepper,
    asideComponent,
    exampleSelect,
    flatPickr
  },
  mounted() {
    this.mondays;
    this.thursdays;
    this.fullTimeStartDays;

    this.getDepts()
    .then((res) => {
      this.$store.dispatch('depts/setDepartments', res);
      console.log(`%c getDepts 👌 `,
                  this.consoleLog.success)
    })
    .catch((e)  => {
      console.log(`%c getDepts 🛑 `,
                  this.consoleLog.error,
                  `\n\n ${e} \n\n`);
    });

    this.$nextTick(() => {
      if(this.department.id) {
        this.callGetGroups();
      }

      if(this.group.id) {
        this.callGetJobs();
      }
    });
  },
  data() {
    return {
      stepActive:   2,
      previous:     { name: 'create'},
      next:         { name: 'create-three'},
      config: {
        enable:     [],
        altInput:   true,
        altFormat:  "F j, Y",
        dateFormat: "Y-m-d",
        onMonthChange: function(fp,currentYear,currentMonth){
          console.log(currentMonth.currentMonth);
          console.log(currentMonth.currentYear);
        }
      },
      showDivision: false,
      showJob:      false,
      groups:       [],
      jobs:         [],
    }
  },
  watch: {
    department: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id),
            previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          this.$store.dispatch('createUser/resetGroup');
          this.$store.dispatch('createUser/resetJob');
          this.$store.dispatch('createUser/resetRequestedServices');
          this.$store.dispatch('createUser/resetDeptExQuestions');
          this.$store.dispatch('createUser/resetGroupExQuestions');

          this.callGetGroups();

          this.getExtraDeptQuestions
          .then((res) => {
            let hasDeptQuestions = res.results[0].questions;
            this.extraDeptQuestions = hasDeptQuestions;
            this.$store.dispatch('createUser/addToTotalSteps', 5);

            console.log(`%c getExtraDeptQuestions 👌 `,
                      this.consoleLog.success);
          })
          .catch((e) => {
            this.$store.dispatch('createUser/addToTotalSteps', 4);
            console.log(`%c getExtraDeptQuestions 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${e} \n\n`);
          });
        }
      }
    },
    group: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id),
            previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          this.$store.dispatch('createUser/resetJob');
          this.$store.dispatch('createUser/resetSupervisor');
          this.$store.dispatch('createUser/resetSupervisorPhone');
          this.$store.dispatch('createUser/resetRequestedServices');
          this.$store.dispatch('createUser/resetGroupExQuestions');

          this.callGetJobs();

          this.getExtraGroupQuestions
          .then((res) => {
            let hasGroupQuestions = res.results[0].questions;
            this.extraGroupQuestions = hasGroupQuestions;

            console.log(`%c getExtraGroupQuestions 👌 `,
                      this.consoleLog.success);
          })
          .catch((e) => {
            console.log(`%c getExtraGroupQuestions 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${e} \n\n`);
          });
        }
      }
    },
    job: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id),
            previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          this.$store.dispatch('createUser/resetSupervisor');
          this.$store.dispatch('createUser/resetSupervisorPhone');
        }
      }
    }
  },
  computed: {
    ...mapFields([
      'startDateFormat',
      'depts.departments',
      'facilities.facilities',

      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.group',
      'createUser.job',
      'createUser.status',
      'createUser.startDate',

      'createUser.extraDeptQuestions',
      'createUser.extraGroupQuestions',
    ]),
    departmentOptions() {
      let deptSelectArray = [];

      let depts = this.departments.map(
        value => {
          return {
            id: value.id,
            name: value.name
          }
        }
      );

      depts.forEach(function(dept) {
        deptSelectArray.push({
          "value": dept.id,
          "text": dept.name
        });
      });

      return deptSelectArray;
    },
    deptFacilities() {
      let facilitiesByDept = [];

      let facilities = this.facilities.map(
        value => {
          return {
            id: value.text,
            name: value.value
          }
        }
      );

      facilities.forEach(function(facility) {
        facilitiesByDept.push({
          "text": facility.id,
          "value": facility.name
        });
      });

      return facilitiesByDept;
    },

    departmentGroupOptions () {
      let groupSelectArray = [];

      let groups = this.groups.map(
        value => {
          return {
            id: value.id,
            name: value.name
          }
        }
      );

      groups.forEach(function(group) {
        groupSelectArray.push({
          "text": group.name,
          "value": group.id
        });
      });
      return groupSelectArray;
    },
    groupJobOptions() {
      let jobSelectArray = [];

      let jobs = this.jobs.map(
        value => {
          return {
            id: value.id,
            name: value.name,
            salaryGroup: value.salaryGroup,
            clockInRequired: value.clockInRequired
          }
        }
      );

      jobs.forEach(function(job) {
        jobSelectArray.push({
          "value": job.id,
          "text": job.name,
          "salaryGroup": job.salaryGroup,
          "clockInRequired": job.clockInRequired
        });
      });

      var uniqueJobs = jobSelectArray.reduce((job, o) => {
          if(!job.some(obj => obj.name === o.name &&
                              obj.salaryGroup === o.salaryGroup)
          ){ job.push(o); }
          return job;
      },[]);

      return uniqueJobs;
    },
    getExtraDeptQuestions() {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.profile}?department_id=${this.department.id}`)
        .then((response) => {
          if(response.data.count >= 1) {
            resolve(response.data);
          } else {
            reject('No Department Questions')
          }
        })
        .catch((error) => {
          reject('No Department Questions')
        })
      });
    },
    getExtraGroupQuestions() {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.profile}?department_id=${this.department.id}&group_id=${this.group.id}`)
        .then((response) => {
          if(response.data.count >= 1) {
            resolve(response.data);
          } else {
            reject('No Department Group Questions')
          }
        })
        .catch((error) => {
          reject('No Department Group Questions')
        })
      });
    },
    mondays() {
      let currentDate = new Date(),
      year = currentDate.getFullYear(),
      mondays = [];

      // currentDate.setDate(1);

      while (currentDate.getDay() !== 1) {
        currentDate.setDate(currentDate.getDate() + 2);
      }

      while (currentDate.getFullYear() === year) {
        mondays.push(
          new Date(currentDate.getTime()).toISOString().split('T')[0]
        );
        currentDate.setDate(currentDate.getDate() + 14);
      }

      return mondays;
    },
    thursdays() {
      let currentDate = new Date(),
      year = currentDate.getFullYear(),
      thursdays = [];

      while (currentDate.getDay() !== 4) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      while (currentDate.getFullYear() === year) {
        thursdays.push(
          new Date(currentDate.getTime()).toISOString().split('T')[0]
        );
        currentDate.setDate(currentDate.getDate() + 14);
      }

      return thursdays;
    },
    fullTimeStartDays() {
      let mondaysAndThursdays = [...this.mondays, ...this.thursdays];
      return this.config.enable = mondaysAndThursdays;
    },
  },
  methods: {
    customFormatter(date) {
      return moment(date).format(this.startDateFormat);
    },
    callGetGroups() {
      this.getGroups(this.department.id)
      .then((res) => {
        this.groups = res;
        console.log(`%c getGroups 👌 `,
                  this.consoleLog.success)
      })
      .catch((e) => {
         console.log(`%c getGroups 🛑 `,
                  this.consoleLog.error,
                  `\n\n ${e} \n\n`);
      });
    },
    callGetJobs() {
      this.getJobs(this.group.id)
      .then((res) => {
        this.jobs = res;
        console.log(`%c getJobs 👌 `,
                  this.consoleLog.success)
      })
      .catch((e) => {
         console.log(`%c getJobs 🛑 `,
                  this.consoleLog.error,
                  `\n\n ${e} \n\n`);
      });
    },
  },
}
</script>

<style lang="scss" scoped>

  h1, h2, h3, h4 {
    color: $text-color;
  }

  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .field-group {
    margin: 0 0 $space-m 0;

    &:last-of-type {
      margin: 0 0 $space-s 0;
    }
  }
</style>

<style lang="scss">
.flatpickr-day {
  &.selected {
    background: $color-blue !important;
    border-color: $color-blue !important;
  }
}
</style>