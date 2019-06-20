<template>
  <div>
    <progressStepper
      :step-active="stepActive"
      :previous-button="previous"
      :next-button="next" />

    <div class="page-inner-wrapper">
      <asideComponent />

      <form>
        <h1><strong>Step Three:</strong>&nbsp;Supervisor information</h1>

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

        <div class="field-group" v-if="supervisor">
          <label for="supervisor-phone">Supervisor Phone</label>
          <select name="supervisor-phone"
                  id="supervisor-phone"
                  v-model="supervisorPhone">
            <option v-for="(item, index) in managersPhone"
                    :value="item.value">
              {{ item.text }}
            </option>
          </select>
        </div>

        <fn1-input v-model="employeePhone"
                   label="Employee Phone (desk)"
                   @keyup.native="phoneNumberFormat"
                   @blur.native="phoneNumberFormat"
                   type="tel"
                   placeholder="123-456-7890"
                   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                   maxlength="10"
                   name="employee-phone"
                   id="employee-phone" />
      </form>
    </div>
  </div>
</template>

<script>
import {
  mapFields }           from 'vuex-map-fields';

import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'

export default {
  layout:           'create',
  components: {
    progressStepper,
    asideComponent,
    exampleSelect
  },
  data() {
    return {
      stepActive:       3,
      previous:         { name: 'create-two'},
      next:             { name: 'create-four'},
      managers:         [],
      groupID:          null,
      phoneValue:       0,
      preventIteration: false,
      managersPhone:    null,
    }
  },
  mounted() {
    this.getGroupID;
  },
  watch: {
    groupID: function(val, oldVal) {
      if(val){
        this.getGroupManagers()
        .then((res) => {
          this.managers = res;
          console.log(`%c getGroupManagers 👌 `,
                      this.consoleLog.success);
        })
        .catch((e)  => {
          console.log(`%c getGroupManagers 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${e} \n\n`);
        });
      }
    },
    managers: function(val, oldVal) {
      if(val || val !== oldVal) {
        this.getManagerPhoneNumber(this.supervisor);
      }
    },
    supervisor: function(val, oldVal){
      if(val !== oldVal) {
        this.getManagerPhoneNumber(this.supervisor);
      }
    }
  },
  methods: {
    phoneNumberFormat(event) {
      if (['Arrow', 'Backspace', 'Shift']
         .includes(event.key)) {
          this.preventIteration = true;
        return;
      }
      if (this.preventIteration) {
          this.preventIteration = false;
        return;
      }
      this.phoneValue = this.employeePhone
                        .replace(/-/g, '')
                        .match(/(\d{1,10})/g)[0];

      this.employeePhone = this.phoneValue
      .replace(/(\d{1,3})(\d{1,3})(\d{1,4})/g, '$1-$2-$3');
    },
    getGroupManagers() {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.ttApi}${process.env.managerService}?group_id=${this.groupID}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((e) => {
          reject(e)
        })
      });
    },
    emailUsername(email) {
      return email.substring(0, email.indexOf("@"))
    },
    getManagerPhoneNumber(name) {
      if((this.supervisor !== "" ) && this.managers){

        let managerFilter = this.managers
        .filter((item) =>
          item.name === name
        );

        if(managerFilter.length) {
          var choosenManager = this.emailUsername(managerFilter[0].email);
        }

        this.getActiveDirectoryUserByAttribute('samaccountname', choosenManager)
        .then((res) => {
          this.managersPhone = [{"value": res.telephoneNumber,
                                 "text":  res.telephoneNumber}];

          console.log(`%c getActiveDirectoryUserByAttribute (supervisor phone) 👌 `,
                      this.consoleLog.success);
        })
        .catch((e)  => {
          console.log(`%c getActiveDirectoryUserByAttribute (supervisor phone) 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${e} \n\n`);
        });
      }
    }
  },
  computed: {
    ...mapFields([
      'consoleLog',
      'createUser',
      'createUser.department',
      'createUser.facility',
      'createUser.division',
      'createUser.group',
      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone'
    ]),
    getGroupID() {
      return this.groupID = this.group.id;
    },
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
  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>