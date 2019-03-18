<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <fn1-tabs>
        <fn1-tab name="Account" :selected="true">
          {{acctReq}}<br><br><br>- - - -<br>

          <div class="wrapper" style="background-color: blue; display: flex; flex-wrap: wrap;">
            <div class="profile-image" v-if="acctReq.cropped_image">
              <img :src="acctReq.cropped_image" :alt="acctReq.first_name + ' ' + acctReq.last_name">
            </div>

            <div class="account-fields">
              <h1>
                <template v-if="acctReq.first_name">
                  {{acctReq.first_name}}
                </template>

                <template v-if="acctReq.nickname">
                  {{acctReq.nickname}}
                </template>

                <template v-if="acctReq.middle_name">
                  {{acctReq.middle_name}}
                </template>

                <template v-if="acctReq.last_name">
                  {{acctReq.last_name}}
                </template>

                <template v-if="acctReq.suffix">
                  {{acctReq.suffix}}
                </template>
              </h1>

              <template v-if="acctReq.employee_phone">
                <fn1-input v-model="acctReq.employee_phone"
                           label="Employee Phone (desk)"
                           name="employee-phone"
                           id="employee-phone"
                           disabled />
              </template>

              <template v-if="acctReq.supervisor">
                <fn1-input v-model="acctReq.supervisor"
                           label="Supervisor"
                           name="supervisor"
                           id="supervisor"
                           disabled />
              </template>

              <template v-if="acctReq.supervisor_phone">
                <fn1-input v-model="acctReq.supervisor_phone"
                           label="Supervisor Phone"
                           name="supervisor-phone"
                           id="supervisor-phone"
                           disabled />
              </template>

              <template v-if="acctReq.department">
                <fn1-input v-model="acctReq.department"
                           label="Department"
                           name="department"
                           id="department"
                           disabled />
              </template>

              <template v-if="acctReq.group">
                <fn1-input v-model="acctReq.group"
                           label="Group"
                           name="group"
                           id="group"
                           disabled />
              </template>

              <template v-if="acctReq.division">
                <fn1-input v-model="acctReq.division"
                           label="Division"
                           name="division"
                           id="division"
                           disabled />
              </template>

              <template v-if="acctReq.facility">
                <fn1-input v-model="acctReq.facility"
                           label="Facility"
                           name="facility"
                           id="facility"
                           disabled />
                <!-- <exampleSelect v-model="acctReq.facility"
                               label="Facility"
                               name="facility"
                               id="facility"
                               :options="[{value: acctReq.facility, text: acctReq.facility }]"
                               disabled /> -->
              </template>

              <template v-if="acctReq.clock_entry_only">
                <fn1-input v-model="acctReq.clock_entry_only"
                           label="Clock Entry Only"
                           name="clock-entry-only"
                           id="clock-entry-only"
                           disabled />
              </template>

              <template v-if="acctReq.job">
                <fn1-input v-model="acctReq.job"
                           label="Job"
                           name="job"
                           id="job"
                           disabled />
              </template>

              <template v-if="acctReq.employee_status">
                <fn1-input v-model="acctReq.employee_status"
                           label="Employee Status"
                           name="employee-status"
                           id="employee-status"
                           disabled />
              </template>

              <template v-if="acctReq.start_date">
                <fn1-input v-model="acctReq.start_date"
                           label="Start Date"
                           name="start-date"
                           id="start-date"
                           disabled />
              </template>

              <template v-if="acctReq.end_date">
                <fn1-input v-model="acctReq.end_date"
                           label="End Date"
                           name="end-date"
                           id="end-date"
                           disabled />
              </template>

              <template v-if="acctReq.request_status">
                <fn1-input v-model="acctReq.request_status"
                           label="Request Status"
                           name="request-status"
                           id="request-status"
                           disabled />
              </template>

              <template v-if="acctReq.requested">
                <fn1-input v-model="acctReq.requested"
                           label="Requested"
                           name="requested"
                           id="requested"
                           disabled />
              </template>

              <template v-if="acctReq.updated">
                <fn1-input v-model="acctReq.updated"
                           label="Updated"
                           name="updated"
                           id="updated"
                           disabled />
              </template>

              <template v-if="acctReq.created">
                <fn1-input v-model="acctReq.created"
                           label="Created"
                           name="created"
                           id="created"
                           disabled />
              </template>
            </div>
          </div>
        </fn1-tab>

        <fn1-tab name="Services">
          {{acctReq.requested_services}}
        </fn1-tab>

        <fn1-tab name="Extras" v-if="acctReq.dynamic_options">
          {{acctReq.dynamic_options}}
        </fn1-tab>

        <fn1-tab name="History">
          history
        </fn1-tab>
      </fn1-tabs>
    </div>
  </div>
</template>

<script>
import moment           from 'moment'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import {
  createHelpers }       from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent'
import exampleSelect    from '~/components/exampleSelect'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  validate({ params }) {
    console.log('run valid', params)
    return !isNaN(+params.id)
  },
  mounted(context) {
    this.paramID = this.$route.params.id;

    this.$axios
    .get(`${process.env.api}${process.env.accountRequest}?id=${this.paramID}`)
    .then(response => {
      console.log(`/ID/ AR Req. :: `, response)
      this.acctReq = response.data.results[0];
    })
    .catch(e => {
      console.log(`/ID/ AR Req. error :: `, e)
    });
  },
  middleware:       'authenticated',
  components: {
    headerComponent,
    exampleSelect
  },
  data() {
    return {
      paramID:      "",
      acctReq:      "",
    }
  },
  computed: {
    ...mapFields([]),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.profile-image {
  margin: 0 20px 0 0;
  width: 50px;
  height: 50px;
}

.account-fields {
  background-color: red;
  column-count: 2;
}
</style>