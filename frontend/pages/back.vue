<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <h1>Account Track User Management</h1>
      <progressStepper :step-active="stepActive" />
      <h2>Create new user</h2>

      <div>
        <asideComponent />

        <form>
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

          <fn1-select v-model="suffix"
                      label="Suffix"
                      name="suffix"
                      id="suffix"
                      :options="suffixOptions" />

          <fn1-date v-model="startDate"
                    label="Start Date"
                    name="start-date"
                    id="start-date"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />

          <fn1-select v-model="department"
                      label="Department"
                      name="department"
                      id="department"
                      :options="departmentOptions" />

            <fn1-select v-model="status"
                        label="Employment Status"
                        name="employment-status"
                        id="employment-status"
                        :options="statusOptions" />

            <nuxt-link class="button"
                       :to="{ name: 'stepTwo'}"
                       @click.native="storeData()">Next</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent.vue'
import progressStepper  from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'

export default {
  components: {
    headerComponent,
    progressStepper,
    asideComponent
  },
  data() {
    return {
      stepActive: 1,
      suffixOptions: [
        { value: null,  text: 'none', selected: true},
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
      departmentOptions: [
        { value: null,
          text: 'none',
          selected: true
        },
        { value: 'Animal Shelter',
          text: 'Animal Shelter'
        },
        { value: 'Bloomington Transit',
          text: 'Bloomington Transit'
        },
        { value: 'City Clerk',
          text: 'City Clerk'
        },
        { value: 'City Directors',
          text: 'City Directors'
        },
        { value: 'Community and Family Resources',
          text: 'Community and Family Resources'
        },
        { value: 'Controller',
          text: 'Controller'
        },
        { value: 'Council Office',
          text: 'Council Office'
        },
        { value: 'Economic & Sustainable Development',
          text: 'Economic & Sustainable Development'
        },
        { value: 'Facilities',
          text: 'Facilities'
        },
        { value: 'Fire',
          text: 'Fire'
        },
        { value: 'Fleet Maintenance',
          text: 'Fleet Maintenance'
        },
        { value: 'HAND',
          text: 'HAND'
        },
        { value: 'Human Resources',
          text: 'Human Resources'
        },
        { value: 'ITS',
          text: 'ITS'
        },
        { value: 'Legal',
          text: 'Legal'
        },
        { value: 'Office of the Mayor',
          text: 'Office of the Mayor'
        },
        { value: 'Parks and Recreation',
          text: 'Parks and Recreation'
        },
        { value: 'Planning and Transportation',
          text: 'Planning and Transportation'
        },
        { value: 'Police',
          text: 'Police'
        },
        { value: 'Public Works',
          text: 'Public Works'
        },
        { value: 'Sanitation',
          text: 'Sanitation'
        },
        { value: 'Street and Traffic',
          text: 'Street and Traffic'
        },
        { value: 'Training',
          text: 'Training'
        },
        { value: 'Utilities',
          text: 'Utilities'
        }
      ],
      statusOptions: [
        { value: null,
          text: 'none',
          selected: true
        },
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
      ]
    }
  },
  methods: {},
  computed: {
    ...mapFields([
      'name.first',
      'name.middle',
      'name.last',
      'name.suffix',
      'startDate',
      'department',
      'status',
    ]),
  }
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