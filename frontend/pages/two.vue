<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Two:</strong> Facility specific information</h1>
          <!-- {{facilityDivisions()}} -->
          <exampleSelect v-model="facility"
                          label="Facility"
                          name="facility"
                          id="facility"
                          :options="deptFacilities" />

          <exampleSelect v-model="division"
                         v-if="showDivision"
                          label="Division"
                          name="division"
                          id="division"
                          :options="facilityDivisions()" />

          <exampleSelect v-model="job"
                         v-if="showJob"
                          label="Job"
                          name="job"
                          id="job"
                          :options="divisionJobs()" />

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
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import { createHelpers } from 'vuex-map-fields';

import headerComponent from '~/components/headerComponent.vue'
import progressStepper from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'
import exampleSelect   from '~/components/exampleSelect.vue'

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
    exampleSelect
  },
  data() {
    return {
      stepActive: 2,
      showDivision: false,
      showJob: false,
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
    }
  },
  mounted() {
    if(this.facility) {
      this.showDivision = true;
    }

    if(this.division) {
      this.showJob = true;
    }
  },
  watch: {
    facility: function(val, oldVal) {
      if(val === "Service Center") {
        this.addToTotalSteps(5);
      } else {
        this.addToTotalSteps(4);
      }
      this.facilityDivisions();
      this.showDivision = true;
      this.division = "";
    },
    division: function(val, oldVal) {
      this.divisionJobs();
      this.showJob = true;
      this.job = "";
    }
  },
  methods: {
    ...mapActions([
      'addToTotalSteps'
    ]),
    facilityDivisions() {
      let divisionsByFacility = [];

      let deptFacilities = this.data.filter(
        value => value.department === this.department
      );

      let facilities = deptFacilities.map(
        value => value.facilities
      );

      let facility = facilities[0].filter(
        value => value.name === this.facility
      );

      let divisions = facility.map(
        value => value.divisions
      );

      let divisionNames = divisions[0].map(
        value => value.name
      );

      divisionNames.forEach(function(facility) {
        divisionsByFacility.push({
          "text": facility,
          "value": facility
        });
      });
      return divisionsByFacility;
    },
    divisionJobs() {
      let jobsByDivision = [];

      let deptFacilities = this.data.filter(
        value => value.department === this.department
      );

      let facilities = deptFacilities.map(
        value => value.facilities
      );

      let facility = facilities[0].filter(
        value => value.name === this.facility
      );

      let divisions = facility.map(
        value => value.divisions
      );

      let division = divisions[0].filter(
        value => value.name === this.division
      );

      let jobNames = division.map(
        value => value.jobs
      );

      jobNames.forEach(function(job) {
        job.forEach(function(item) {
          jobsByDivision.push({
            "text": item,
            "value": item
          });
        });
      });
      return jobsByDivision;
    },
  },
  computed: {
    ...mapFields([
      'data',
      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.job',
    ]),
    deptFacilities() {
      let facilitiesByDept = [];

      let deptFacilities = this.data.filter(
        value => value.department === this.department
      );

      let facility = deptFacilities.map(
        value => value.facilities
      );

      facility.forEach(function(facility) {
        facility.forEach(function(item){
          facilitiesByDept.push({
            "text": item.name,
            "value": item.name
          });
        });
      });

      return facilitiesByDept;
    },
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