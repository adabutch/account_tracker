<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
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
              <option>---</option>
              <option v-for="(item, index) in getDepts"
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
              <option v-for="(item, index) in deptGroups"
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
              <option v-for="(item, index) in groupJobs"
                      :value="{id: item.value, name: item.text, salaryGroup: item.salaryGroup, clockInRequired: item.clockInRequired}">
                {{ item.text }}
              </option>
            </select>
          </div>

          <!-- Not sure we need to show these as
               they are automagically determined
               based on job selection. -->
          <!-- <fn1-input v-model="job.salaryGroup"
                     v-if="job.salaryGroup"
                     label="Job Status"
                     name="job-status"
                     id="job-status"
                     disabled />

          <fn1-input v-model="job.clockInRequired"
                     v-if="job.clockInRequired"
                     label="Clock-In Required"
                     name="clockin-required"
                     id="clockin-required"
                     disabled /> -->



          <!-- {{testing()}} -->

          <!-- <div class="field-group">
            <label for="start-date">Start Date</label>
            <datepicker v-model="startDate"
                        :format="customFormatter"
                        :disabledDates="startDates"
                        ref="datepicker"
                        name="start-date"
                        id="start-date" />
          </div> -->

          <div class="field-group">
            <label for="start-date">Start Date</label>
            <flat-pickr v-model="startDate"
                        ref="datepicker"
                        :config="config"
                        placeholder="Select date"
                        name="date"></flat-pickr>
          </div>



          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset</button>

            <nuxt-link class="button previous"
                       :to="{ name: 'index'}"
                       @click.native="">Previous</nuxt-link>

            <nuxt-link class="button"
                       :to="{ name: 'three'}">Next</nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import {
  mapFields }           from 'vuex-map-fields'

import axios            from 'axios'
import moment           from 'moment'

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'
// import Datepicker       from 'vuejs-datepicker'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect,
    flatPickr
  },
  mounted() {
    this.mondays();

    axios.get(`https://tomcat2.bloomington.in.gov/timetrack/DepartmentService`)
    .then((res) => {
      this.$store.dispatch('depts/setDepartments', res.data);
    })
    .catch((error) => {
      console.log(error);
    })

    this.$nextTick(() => {
      console.log(`NTICK :: ${this.department.name}`);
      if(this.department.id) {
        this.getGroups;
      }

      if(this.group.id) {
        this.getJobs();
      }
    });
  },
  data() {
    return {
      config: {
        enable: [],
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        onMonthChange: function(fp,currentYear,currentMonth){
          console.log(currentMonth.currentMonth);
          console.log(currentMonth.currentYear);
        }
      },
      stepActive: 2,
      showDivision: false,
      showJob: false,
      statusOptions: [
        {
          value: 'Full-Time',
          text: 'Full-Time'
        },
        {
          value: 'Part-Time',
          text: 'Part-Time'
        },
        {
          value: 'Intern',
          text: 'Intern'
        },
        {
          value: 'SPEA Intern',
          text: 'SPEA Intern'
        },
        {
          value: 'Volunteer',
          text: 'Volunteer'
        },
        {
          value: 'Seasonal',
          text: 'Seasonal'
        },
        {
          value: 'Temp. Full-Time',
          text: 'Temp. Full-Time'
        },
        {
          value: 'Temp. Part-Time',
          text: 'Temp. Part-Time'
        },
        {
          value: 'Part-Time',
          text: 'Part-Time'
        }
      ],
      jobsStatusOptions: [],
      groups: [],
      jobs: [],
    }
  },
  watch: {
    department: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id);
        let previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          alert('new');

          this.$store.dispatch('createUser/resetGroup');
          this.$store.dispatch('createUser/resetJob');
          this.$store.dispatch('createUser/resetRequestedServices');
          this.$store.dispatch('createUser/resetDeptExQuestions');
          this.$store.dispatch('createUser/resetGroupExQuestions');

          this.getGroups;

          this.getExtraDeptQuestions.then((resolve) => {
            console.log(`dept Q resolve`, resolve);
            this.extraDeptQuestions = resolve.results[0].questions;
          });
        }
      }
    },
    group: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id);
        let previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          // alert(`${newVal} != ${previousVal}`);

          this.$store.dispatch('createUser/resetJob');
          this.$store.dispatch('createUser/resetSupervisor');
          this.$store.dispatch('createUser/resetSupervisorPhone');
          this.$store.dispatch('createUser/resetRequestedServices');
          this.$store.dispatch('createUser/resetGroupExQuestions');

          this.getJobs();

          this.getExtraGroupQuestions.then((resolve) => {
            console.log(`group Q resolve`, resolve);
            this.extraGroupQuestions = resolve.results[0].questions;
          });
        }
      }
    },
    job: function(val, oldVal) {
      if(val) {
        let newVal      = JSON.stringify(val.id);
        let previousVal = JSON.stringify(oldVal.id);

        if(newVal != previousVal) {
          this.$store.dispatch('createUser/resetSupervisor');
          this.$store.dispatch('createUser/resetSupervisorPhone');
        }
      }
    }
  },
  computed: {
    ...mapFields([
      'endpoints',
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
    getDepts() {
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
    getGroups() {
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/GroupService?department_id=${this.department.id}`)
      .then((res) => {
        console.log(res.data);
        this.groups = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deptGroups() {
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
    groupJobs() {
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

      return jobSelectArray;
    },
    getExtraDeptQuestions() {
      return new Promise((resolve) => {
        this.$axios.get(`${this.endpoints.baseUrl}${this.endpoints.profile}?department_id=${this.department.id}`)
        .then((response) => {
          resolve(response.data);
          this.$store.dispatch('createUser/addToTotalSteps', 5);
        })
        .catch((error) => {
          console.log(error)
        })
      });
    },
    getExtraGroupQuestions() {
      return new Promise((resolve) => {
        this.$axios.get(`${this.endpoints.baseUrl}${this.endpoints.profile}?department_id=${this.department.id}&group_id=${this.group.id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
        })
      });
    }
  },
  methods: {
    ...mapActions([
      'createUser/addToTotalSteps'
    ]),
    customFormatter(date) {
      return moment(date).format(this.startDateFormat);
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

      return this.config.enable = mondays;;
    },
    getJobs() {
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/JobTitleService?group_id=${this.group.id}`)
      .then((res) => {
        console.log(res.data);
        this.jobs = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

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
@import '@/assets/style.scss';

.flatpickr-day {
  &.selected {
    background: $color-blue !important;
    border-color: $color-blue !important;
  }
}
</style>