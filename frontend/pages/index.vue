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
          <!-- <h1>{{ testing() }}</h1> -->

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

          <button @click.prevent="resetForm">reset</button>
          <nuxt-link class="button"
                     :to="{ name: 'two'}">Next</nuxt-link>
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
  mapActions }        from 'vuex'
import { createHelpers }  from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'
import exampleSelect    from '~/components/exampleSelect.vue'

import axios from 'axios'


const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect
  },
  mounted() {
    axios.get(`https://tomcat2.bloomington.in.gov/timetrack/DepartmentService`)
    .then((res) => {
      console.log(res);
      this.$store.dispatch('depts/setDepartments', res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
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
      posts: [],
      errors: []
    }
  },
  watch: {
    department: function(val, oldVal) {
      let newVal      = JSON.stringify(val.id);
      let previousVal = JSON.stringify(oldVal.id);

      if(newVal != previousVal) {
        this.$store.dispatch('createUser/resetGroup');
        this.$store.dispatch('createUser/resetJob');
      }
    }
  },
  methods: {
    resetForm() {
      localStorage.clear('vuex');
      this.$store.dispatch('createUser/resetState');
      this.$router.push('/')
    }
  },
  computed: {
    ...mapFields([
      'data',
      'totalSteps',
      'endpoints',

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',

      'createUser.department',

      'depts.departments'
    ]),
    getDepts() {
      let deptSelectArray = [];

      let depts = this.departments.map(
        value => { return {id: value.id, name: value.name}}
      );

      depts.forEach(function(dept) {
        deptSelectArray.push({
          "value": dept.id,
          "text": dept.name
        });
      });

      return deptSelectArray;
    }
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