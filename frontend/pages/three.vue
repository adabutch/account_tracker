<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Three:</strong> Supervisor information</h1>
          <exampleSelect v-model="supervisor"
                         label="Supervisor"
                         name="supervisor"
                         id="supervisor"
                         :options="divisionSupervisors" />

          <exampleSelect v-model="supervisorPhone"
                         v-if="showSupPhone"
                         label="Supervisor Phone"
                         name="supervisor-phone"
                         id="supervisor-phone"
                         :options="supPhones()" />

          <fn1-input v-model="employeePhone"
                     label="Employee Phone"
                     type="tel"
                     placeholder="888-888-8888"
                     pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                     maxlength="10"
                     name="employee-phone"
                     id="employee-phone" />

          <nuxt-link class="button previous"
                     :to="{ name: 'two'}">Previous</nuxt-link>

          <nuxt-link class="button"
                     :to="{ name: 'four'}">Next</nuxt-link>
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
import exampleSelect    from '~/components/exampleSelect.vue'

export default {
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect
  },
  data() {
    return {
      stepActive: 3,
      showSupPhone: false,
    }
  },
  mounted() {
    if(this.supervisor) {

      this.showSupPhone = true;
    }
    if(!this.supervisor) {
      this.divisionSupervisors;
    }
  },
  watch: {
    supervisor: function(val, oldVal) {
      this.showSupPhone = true;
      this.supervisorPhones = "";
    }
  },
  methods: {
    supPhones() {
      let supervisorsByDivision = [];

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

      let divisionSupervisors = division.map(
        value => value.supervisors
      );

      let supervisorz = divisionSupervisors[0].filter(
        value => value.name === this.supervisor
      );

      let coool = supervisorz.map(
        value => value.phone
      );

      coool.forEach(function(supervisors) {
        supervisors.forEach(function(supervisor) {
          supervisorsByDivision.push({
            "text": supervisor,
            "value": supervisor
          });
        });
      });
      return supervisorsByDivision;
    },
  },
  computed: {

    ...mapFields([
      'data',
      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone'
    ]),
    divisionSupervisors() {
      let supervisorsByDivision = [];

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

      let divisionSupervisors = division.map(
        value => value.supervisors
      );

      divisionSupervisors.forEach(function(supervisors) {
        supervisors.forEach(function(supervisor) {
          supervisorsByDivision.push({
            "text": supervisor.name,
            "value": supervisor.name
          });
        });
      });
      return supervisorsByDivision;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';
  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
      // background-color: red;
    }
  }
</style>