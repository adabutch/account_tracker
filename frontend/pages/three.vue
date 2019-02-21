<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Three:</strong>&nbsp; Supervisor information</h1>

          <div class="field-group">
            <label for="supervisor">Supervisor</label>
            <select name="supervisor"
                    id="supervisor"
                    type="select"
                    v-model="supervisor">
              <option v-for="(item, index) in groupManagers"
                      :value="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>

          <div class="field-group">
            <label for="supervisor-phone">Supervisor Phone</label>
            <select name="supervisor-phone"
                    id="supervisor-phone"
                    type="select"
                    v-model="supervisorPhone">
              <option v-for="(item, index) in managersPhone"
                      :value="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>

          <fn1-input v-model="employeePhone"
                     label="Employee Phone"
                     type="tel"
                     placeholder="888-888-8888"
                     pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                     maxlength="10"
                     name="employee-phone"
                     id="employee-phone" />

          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset</button>

            <nuxt-link class="button previous"
                       :to="{ name: 'two'}">Previous</nuxt-link>

            <nuxt-link class="button"
                       :to="{ name: 'four'}">Next</nuxt-link>
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
  mapFields }           from 'vuex-map-fields';

import axios            from 'axios'

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'

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
      managers: [],
      managersPhone: [
        {"value": "123-456-7890", "text": "123-456-7890"},
        {"value": "098-765-4321", "text": "098-765-4321"}
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.group.id) {
        this.getGroupManagers();
      }
    });
  },
  watch: {
  },
  methods: {
    getGroupManagers() {
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/GroupManagerService?group_id=${this.group.id}`)
      .then((res) => {
        this.managers = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
  computed: {

    ...mapFields([
      'data',
      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.group',
      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone'
    ]),
    groupManagers() {
      let managersByGroup = [];

      let groupManagers = this.managers.map(
        value => value.name
      );

      groupManagers.forEach((supervisor) => {
        managersByGroup.push({
          "text": supervisor,
          "value": supervisor
        });
      });

      return managersByGroup;
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