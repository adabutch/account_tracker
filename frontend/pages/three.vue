<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Three:</strong> Supervisor information</h1>

          {{ supervisors }}<br><br> - - - - <br><br>

          {{ supPhones() }}<br><br> - - - - <br><br>

          {{ divisionSupervisors }}

          <exampleSelect v-model="supervisor"
                         label="Supervisor"
                         name="supervisor"
                         id="supervisor"
                         :options="divisionSupervisors" />

          <exampleSelect v-model="supervisorPhone"
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
  middleware: 'authenticated',
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

      supervisors: [
        {
          "name":  "Charles Brandt",
          "phone": "123-888-8888",
          "email": "brand tc @ gov"
        },
        {
          "name":  "Adam Butcher",
          "phone": "456-222-8888",
          "email": "butcher ad @ gov"
        }
      ],
    }
  },
  mounted() {
    // if(this.supervisor) {

    //   this.showSupPhone = true;
    // }
    // if(!this.supervisor) {
    //   this.divisionSupervisors;
    // }
  },
  watch: {
    // supervisor: function(val, oldVal) {
    //   this.showSupPhone = true;
    //   this.supervisorPhones = "";
    // }
  },
  methods: {
    supPhones() {
      let supervisorPhones = [];

      let supPhoneMatch = this.supervisors.filter(
        value => value.name == this.supervisor
      );

      let supPhone = supPhoneMatch.map(
        value => value.phone
      );

      supPhone.forEach(function(phone) {
        supervisorPhones.push({
          "text": phone,
          "value": phone
        });
      });

      return supervisorPhones;
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

      let deptFacilities = this.supervisors.map(
        value => value.name
      );

      deptFacilities.forEach((supervisor) => {
        supervisorsByDivision.push({
          "text": supervisor,
          "value": supervisor
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
    }
  }
</style>