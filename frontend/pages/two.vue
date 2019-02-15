<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Two:</strong> Facility specific information</h1>

          <exampleSelect v-model="facility"
                          label="Facility"
                          name="facility"
                          id="facility"
                          :options="deptFacilities" />

          <exampleSelect v-model="group"
                          label="Group"
                          name="group"
                          id="group"
                          :options="deptGroups" />

          <exampleSelect v-model="job"
                         label="Job"
                         name="job"
                         id="job"
                         :options="groupJobs" />

          <exampleSelect v-model="status"
                         label="Status"
                         name="status"
                         id="status"
                         :options="statusOptions" />

          <div class="field-group">
            <label for="start-date">Start Date</label>
            <datepicker v-model="startDate"
                        :format="customFormatter"
                        :disabledDates="startDatesDisabled"
                        ref="datepicker"
                        @focus="showDatepicker"
                        name="start-date"
                        id="start-date" />
          </div>

          <nuxt-link class="button previous"
                     :to="{ name: 'index'}"
                     @click.native="">Previous</nuxt-link>

          <nuxt-link class="button"
                     :to="{ name: 'three'}">Next</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios            from 'axios'
import moment           from 'moment'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import { createHelpers }from 'vuex-map-fields'

import headerComponent  from '~/components/headerComponent.vue'
import progressStepper  from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'
import exampleSelect    from '~/components/exampleSelect.vue'
import Datepicker       from 'vuejs-datepicker'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`
});

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect,
    Datepicker
  },
  data() {
    return {
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
      jobOptions: [
        { value: null,
          text: 'none',
          selected: true
        },
        { value: 'GIS',
          text: 'GIS'
        },
        { value: 'Systems & App Manager',
          text: 'Systems & App Manager'
        },
        {
          value: 'Front-End Developer',
          text: 'Front-End Developer'
        }
      ],
      setMonth: 1,
      setYear: 2019,
      startDatesDisabled: {
        // days: [0, 2, 3, 4, 5, 6, 7],
        dates: [],
        // customPredictor: function(date) {
        //   if(date.getDate() % 14 == 0){
        //     return true
        //   }
        // },
      },
      groups: [],
      jobs: [],
    }
  },
  mounted() {
    if(this.department) {
      this.getGroups;
    }
  },
  watch: {
    group: function(val) {
      if(val) {
        this.getJobs();
      }
    }
  },
  methods: {
    ...mapActions([
      'addToTotalSteps'
    ]),
    customFormatter(date) {
      return moment(date).format(this.startDateFormat);
    },
    showDatepicker() {
      return this.$refs.datepicker.$children[0].$emit('showCalendar');
    },
    getDaysInMonth(month, year) {
      let date = new Date(year, month, 1);
      let allDays = [];
      let wantedDays = [];

      // Get the first Monday in the month
      while (date.getDay() != 1) {
        date.setDate(date.getDate() + 1);
      }

      while (date.getMonth() === month) {
        allDays.push(
          new Date(date)
          .toISOString().split('T')[0]
        );
        date.setDate(date.getDate() + 14);
      }

      return allDays;
    },
    getAllDays(month, year) {
      let date = new Date(year, month);
      let days = [];

      while (date.getMonth() === month) {
        days.push(
          new Date(date)
          .toISOString().split('T')[0]
        );
        date.setDate(date.getDate() + 1);
      }

      return days;
    },
    pluckDates(array1, array2) {
      array1 = array1.filter(val => !array2.includes(val));
      return array1;
    },
    testing() {
      let dates = this.pluckDates(this.getAllDays(this.setMonth, this.setYear), this.getDaysInMonth(this.setMonth, this.setYear));

      let formatedDates = [];

      dates.forEach((item, index) => {
        formatedDates.push(
          new Date(item)
        );
      });

      return formatedDates;
    },
    getJobs() {
      console.log('actual getJobs');
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/JobTitleService?group_id=${this.group}`)
      .then((res) => {
        console.log(res.data);
        this.jobs = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
  computed: {
    ...mapFields([
      'data',
      'facilities.facilities',
      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.group',
      'createUser.job',
      'createUser.status',
      'startDateFormat',
      'createUser.startDate',
    ]),
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
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/GroupService?department_id=${this.department}`)
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
        value => { return {id: value.id, name: value.name}}
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
        value => { return {id: value.id, name: value.name}}
      );

      jobs.forEach(function(job) {
        jobSelectArray.push({
          "text": job.name,
          "value": job.id
        });
      });
      return jobSelectArray;
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
      // background-color: red;
    }
  }


  form {
    // background: purple;
    width: calc(100% - 300px);
    margin-left: auto;
    padding: 0 0 0 40px;

    .button {
      padding: 10px 20px;
      background-color: $color-green;
    }
  }

  /deep/ label {
    // background-color: teal;
    color: $text-color;
    font-size: $size-l;
    margin-bottom: $space-xs !important;
    // font-weight: $weight-semi-bold;
    width: 100%;
  }

  .field-group {
    margin: 0 0 $space-m 0;

    &:last-of-type {
      margin: 0 0 $space-s 0;
    }
  }
</style>