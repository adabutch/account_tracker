<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive"
                       :previous-button="previous"
                       :next-button="nextStep" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Four:</strong>&nbsp;Software information</h1>

          <template v-if="isEmpty(deptServiceProfile)">
            <p>No associated <strong>Service Profiles</strong>.</p>
          </template>

          <div class="wrapper">
            <div class="form-group" v-if="!hasDeptServices">
              <fieldset>
                <legend>Department Services</legend>
                <div v-for="(item, index) in deptServiceProfile">
                  <input v-model="selectedDeptServices"
                         :key="index"
                         :id="item.id"
                         :value="{id: item.id, name: item.name}"
                         type="checkbox"
                         name="software">

                  <label v-if="item"
                         :for="item.id"
                         v-html="item.name"></label>
                </div>
              </fieldset>
            </div>

            <div class="form-group" v-if="!hasGroupServices">
              <fieldset>
                <legend>Group Services</legend>
                <div v-for="(item, index) in groupServiceProfile">
                  <input v-model="selectedGroupServices"
                         :key="index"
                         :id="item.id"
                         :value="{id: item.id, name: item.name}"
                         type="checkbox"
                         name="software">

                  <label v-if="item"
                         :for="item.id"
                         v-html="item.name"></label>
                </div>
              </fieldset>
            </div>
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
import { mapFields }    from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleCheckbox  from '~/components/exampleCheckbox'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleCheckbox
  },
  data() {
    return {
      stepActive:   4,
      previous:     { name: 'three'},
      deptServiceProfile: {},
      groupServiceProfile: {},
    }
  },
  mounted() {
    this.getServiceProfiles();
  },
  watch: {
    selectedDeptServices: function(val) {
      this.userServices;
      this.selectedServiceIDs;
      this.selectedServiceNames;
    },
    selectedGroupServices: function(val) {
      this.userServices;
      this.selectedServiceIDs;
      this.selectedServiceNames;
    }
  },
  computed: {
    ...mapFields([
      'createUser.totalSteps',
      'createUser.requestedServices',
      'createUser.selectedDeptServices',
      'createUser.selectedGroupServices',
      'createUser.selectedServiceRequestIds',
      'createUser.selectedServiceRequestNames',
      'createUser.department',
      'createUser.group'
    ]),
    nextStep() {
      if(this.stepActive < this.totalSteps) {
        return { name: 'five'}
      } else if (this.stepActive == this.totalSteps) {
        return { name: 'finish'}
      }
    },
    hasDeptServices() {
      return this.isEmpty(this.deptServiceProfile);
    },
    hasGroupServices() {
      return this.isEmpty(this.groupServiceProfile);
    },
    userServices() {
      return this.requestedServices = [...this.selectedDeptServices, ...this.selectedGroupServices];
    },
    selectedServiceIDs() {
      let selectedServiceIDsArray = [];

      this.requestedServices.forEach(function (service) {
        selectedServiceIDsArray.push(service.id);
      });

      // let selectedServiceIDsString = selectedServiceIDsArray.join(', ');

      return this.selectedServiceRequestIds = selectedServiceIDsArray;
    },
    selectedServiceNames() {
      let selectedServiceNamesArray = [];

      this.requestedServices.forEach(function (service) {
        selectedServiceNamesArray.push(service.name);
      });

      let selectedServiceNamesString = selectedServiceNamesArray.join(', ');

      return this.selectedServiceRequestNames = selectedServiceNamesString;
    }
  },
  methods: {
    getServiceProfiles() {
      if(this.department.id) {
        this.$axios.get(`${process.env.api}${process.env.profile}?department_id=${this.department.id}`)
        .then((res) => {
          console.log(`DEPT SERVICES :::: `,res.data.results[0].services);
          this.deptServiceProfile = res.data.results[0].services;
        })
        .catch((error) => {
          console.log(error);
        })
      }

      if(this.group.id) {
        this.$axios.get(`${process.env.api}${process.env.profile}?department_id=${this.department.id}&group_id=${this.group.id}`)
        .then((res) => {
          this.groupServiceProfile = res.data.results[0].services;
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-of-type(2):not(.form-group) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .wrapper {
    div {
      &:last-of-type {
        border-right: none;
      }
    }
  }

  .form-group {
    display: inline-flex;
    border-right: 1px solid lighten($text-color, 50%);
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;

    &:nth-of-type(2) {
      border-right: none;
    }
  }

  fieldset {
    legend {
      font-weight: $weight-semi-bold;
      color: $text-color;
      font-size: 18px;
    }

    input {
      &[type="checkbox"] {
        color: $text-color;
        margin: 0 5px 0 0;
      }
    }

    label {
      width: auto;
      font-weight: $weight-normal;
      color: $text-color;
      font-size: $size-m;
      margin: 0 !important;
    }
  }
</style>