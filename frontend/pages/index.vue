<template>
  <div>
    <headerComponent />
    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />
      <div>
        <asideComponent />
        <form>
          <!-- <h1>{{ setMonth }} - {{ setYear }}</h1>
          <h1>{{ getDaysInMonth(setMonth, setYear) }}</h1>
          <h1>{{ getAllDays(setMonth, setYear) }}</h1> -->

          <!-- <h1>{{ yocool() }}</h1> -->


          <h1><strong>Step One:</strong> User information</h1>
          <div class="fields-wrapper">
            <fn1-input v-model="first"
                     label="First Name"
                     placeholder="First name"
                     name="first-name"
                     id="first-name" />

            <fn1-input v-model="middle"
                       label="Middle Name"
                       placeholder="Middle name"
                       name="middle-name"
                       id="middle-name" />

            <fn1-input v-model="last"
                       label="Last Name"
                       placeholder="Last name"
                       name="last-name"
                       id="last-name" />

            <exampleSelect v-model="suffix"
                          label="Suffix"
                          name="suffix"
                          id="suffix"
                          :options="suffixOptions" />
          </div>

          <div class="fields-wrapper">

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


            <!-- <fn1-date v-model="startDate"
                      label="Start Date"
                      name="start-date"
                      id="start-date"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" /> -->

            <exampleSelect v-model="department"
                           label="Department"
                           name="department"
                           id="department"
                           :options="getDepts" />

            <exampleSelect v-model="status"
                           label="Status"
                           name="status"
                           id="status"
                           :options="statusOptions" />
          </div>
          <nuxt-link class="button"
                     :to="{ name: 'two'}">Next</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {api}            from '~/api/api';

import moment           from 'moment'

import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import { createHelpers }    from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'
import Datepicker       from 'vuejs-datepicker';
import exampleSelect    from '~/components/exampleSelect.vue'


const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect,
    Datepicker
  },
  data() {
    return {
      setMonth: 1,
      setYear: 2019,
      // yocool: this.testing(),
      dateTest: new Date(),
      stepActive: 1,
      suffixOptions: [
        { value: 'Jr.', text: 'Jr.' },
        { value: 'Sr.', text: 'Sr.' },
        { value: '2nd', text: '2nd' },
        { value: '3rd', text: '3rd' },
        { value: 'II',  text: 'II' },
        { value: 'III', text: 'III' },
        { value: 'IV',  text: 'IV' },
        { value: 'V',   text: 'V' },
        { value: 'VI',  text: 'VI' }
      ],
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
      startDatesDisabled: {
        // days: [0, 2, 3, 4, 5, 6, 7],
        // dates: [2019-02-04T05:00:00.000Z, 2019-02-18T05:00:00.000Z],
        // customPredictor: function(date) {
        //   if(date.getDate() % 5 == 0){
        //     return true
        //   }
        // },
      },
      posts: [],
      errors: []
    }
  },
  // created() {
  //   http.get(`request/?format=json`)
  //   .then(response => {
  //     this.posts = response.data
  //   })
  //   .catch(e => {
  //     this.errors.push(e)
  //   })
  // },
  methods: {
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
    // testing() {
    //   this.pluckDates(this.getAllDays(this.setMonth, this.setYear), this.getDaysInMonth(this.setMonth, this.setYear));
    // },
  },
  computed: {
    ...mapFields([
      'data',
      'totalSteps',
      'startDateFormat',
      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.startDate',
      'createUser.department',
      'createUser.status',
    ]),
    getDepts() {
      let deptSelectArray = [];

      let depts = this.data.map(
        value => value.department
      );

      depts.forEach(function(dept) {
        deptSelectArray.push({
          "text": dept,
          "value": dept
        });
      });
      return deptSelectArray;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .fields-wrapper {
    display: flex;
    flex-wrap: wrap;
    // background-color: red;

    &:first-of-type {
      .field-group {
        flex-grow: 1;
        width: calc(100% * (1/4) - 40px);
        margin-right: 20px;
        // background-color: purple;

        &:last-of-type {
          // background-color: green;
          margin: 0;

          /deep/ label {
            margin-bottom: 0;
            // background-color: pink;
          }
        }
      }
    }

    &:nth-of-type(2) {
      // background-color: teal;
      width: 492px;
    }
  }
</style>