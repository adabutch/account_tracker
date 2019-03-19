<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">

      <fn1-tabs>
        <fn1-tab name="Account" :selected="true">
          <div class="left" v-if="acctReq.cropped_image">
            <div class="profile-image">
              <img :src="acctReq.cropped_image" :alt="acctReq.first_name + ' ' + acctReq.last_name">
            </div>
          </div>

          <div class="right" :class="[{'has-image': acctReq.cropped_image }]">
            <h2>
              <template v-if="acctReq.first_name">
                {{acctReq.first_name}}
              </template>

              <template v-if="acctReq.nickname">
                ({{acctReq.nickname}})
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
              <fn1-badge>{{acctReq.request_status}}</fn1-badge>
            </h2>

            <div class="account-fields">
              <div>
                <template v-if="acctReq.facility">
                  <fn1-input v-model="acctReq.facility"
                             label="Facility"
                             name="facility"
                             id="facility"
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

                <template v-if="acctReq.job">
                  <fn1-input v-model="acctReq.job"
                             label="Job"
                             name="job"
                             id="job"
                             disabled />
                </template>
              </div>

              <div>
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

                <template v-if="acctReq.employee_phone">
                  <fn1-input v-model="acctReq.employee_phone"
                             label="Employee Phone (desk)"
                             name="employee-phone"
                             id="employee-phone"
                             disabled />
                </template>

                <template v-if="acctReq.clock_entry_only">
                  <fn1-input v-model="acctReq.clock_entry_only"
                             label="Clock Entry Only"
                             name="clock-entry-only"
                             id="clock-entry-only"
                             disabled />
                </template>

                <template v-if="acctReq.employee_status">
                  <fn1-input v-model="acctReq.employee_status"
                             label="Employee Status"
                             name="employee-status"
                             id="employee-status"
                             disabled />
                </template>
              </div>

              <div>
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
          </div>
        </fn1-tab>

        <fn1-tab name="Services">
          <div class="title-row">
            <h4><strong>Service Profiles</strong> associated with this <strong>Account Request</strong>.</h4>

            <div class="filters">
              <fn1-badge class="new">
                new
              </fn1-badge>

              <fn1-badge class="pending">
                pending
              </fn1-badge>

              <fn1-badge class="approved">
                approved
              </fn1-badge>

              <fn1-badge class="active">
                active
              </fn1-badge>

              <fn1-badge class="inactive">
                inactive
              </fn1-badge>

              <fn1-badge class="denied">
                denied
              </fn1-badge>
            </div>
          </div>

          <table>
            <caption class="sr-only">All User Requests</caption>
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Name</th>
                <th scope="col">Primary Contact</th>
                <th scope="col">Secondary Contact</th>
                <th scope="col">Requested</th>
                <th scope="col">Updated</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="s, i in userServices" :key="i">
                <th class="status">
                  <fn1-badge :class="s.request_status">
                    {{ s.request_status }}
                  </fn1-badge>
                </th>
                <th><!-- {{s.id}} -->{{s.name}}<!--  {{s.service}} --></th>
                <th>{{s.primary_poc}}</th>
                <th>{{s.secondary_poc}}</th>
                <th>
                  <div>{{MMDYYYYDateFormat(s.requested)}}</div>
                  <div>{{timeAgo(s.requested)}}</div>
                </th>
                <th>
                  <div>{{MMDYYYYDateFormat(s.updated)}}</div>
                  <div>{{timeAgo(s.updated)}}</div>
                </th>
                <th>
                  <template v-if="s.created == null">
                    not yet created
                  </template>
                  {{s.created}}
                </th>
                <th>
                  <fn1-button>yo</fn1-button>
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>

        <fn1-tab name="Extras" v-if="acctReq.dynamic_options">
          <p v-for="ex, index in JSON.parse(acctReq.dynamic_options)" class="extras">
            {{ex}}
          </p><br>
        </fn1-tab>

        <fn1-tab name="History">
          history
        </fn1-tab>
      </fn1-tabs>
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

    this.getServices();
    this.getUserServices();
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
      serviceDetails: [],
      servicesStatus: [],
      userServices: [],
    }
  },
  methods: {
    getServices() {
      this.$axios
      .get(`${process.env.api}${process.env.service}?limit=1000`)
      .then((res) => {
        this.$store.dispatch('services/setServices', res.data.results);
        this.namedServices();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserServices() {
      this.$axios
      .get(`${process.env.api}${process.env.serviceReq}?account_request=${this.paramID}&limit=1000`)
      .then((res) => {
        console.log(`getUserServices() :: `,res.data.results);
        this.servicesStatus = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    namedServices() {
      let attachedServices = JSON.parse(this.acctReq.requested_services);

      var results = this.services.filter((s) => {
        return attachedServices.includes(s.id);
      });

      console.log(results);

      this.serviceDetails = results;

      this.usersServices();
    },
    usersServices() {
      let masterServices = [];

      this.serviceDetails.forEach((item, i) => {
        // masterServices.push(item)
        // masterServices.push(Object.assign({}, item, this.servicesStatus[i]));
        masterServices.push({...item, ...this.servicesStatus[i]})
      });

      this.userServices = masterServices;
    },
  },
  computed: {
    ...mapFields([
      'services.services'
    ])
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  $image-left-margin: 40px;
  $image-width-height: 100px;

  h2 {
    display: inline-flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid lighten($text-color, 50%);
    margin: 0 0 20px 0;
    padding: 0 0 10px 0;

    span {
      margin: 0 0 0 20px;
    }
  }

  p {
    &.extras {
      display: block;
      margin: 0 0 20px 0;
    }
  }

  /deep/ .tabs-group {
    .tab-content {
      margin: 20px 0 0 0;
      padding: 0;

      .tab-pane {
        // background-color: blue !important;
        display: flex;
        flex-wrap: wrap;

        .title-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0 40px 0;
          min-height: 25px;
          width: 100%;
          // background-color: red;

          h4 {
            color: $text-color;
            font-size: 18px;
            line-height: 18px;
          }

          .filters {
            display: flex;

            .badge {
              margin: 0 10px 0 0;

              &:last-of-type {
                margin: 0;
              }
            }
          }
        }

        .left {
          margin: 0 $image-left-margin 0 0;
          justify-content: center;
        }

        .right {
          // background-color: orange;
          width: 100%;

          &.has-image {
            width: calc(100% - #{$image-width-height} - #{$image-left-margin});
          }
        }
      }
    }
  }

  .profile-image {
    margin: 0 0 $image-left-margin 0;
    width: $image-width-height;
    height: $image-width-height;
  }

  .account-fields {
    // display: none;
    width: 100;
    // background-color: red;
    column-count: 3;
    column-gap: 40px;
  }



  table {
    color: $text-color;

    thead tr th,
    tbody tr th {
      &:last-of-type {
        // background-color: green;
        text-align: right;
        padding: 8px 8px 8px 0;
      }
    }

    thead {
      tr {
        th {
          &.status {
            width: 1px;
            white-space: nowrap;
          }
        }
      }
    }

    tbody {
      tr {
        th {
          padding: 20px 0;

          &.status {
            width: 1px;
            white-space: nowrap;
            padding: 5px 20px 5px 8px;
          }

          &:nth-child(n+3) {
            div {
              &:nth-child(2) {
                font-size: 14px;
                color: lighten($text-color, 25%);
              }
            }
          }
        }
      }
    }
  }
</style>