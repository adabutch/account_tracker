<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">

      <!-- <fn1-breadcrumbs active="Settings"
        :navItems="[
          {name: 'Dashboard', component: 'Dashboard', href: '/example/'},
          {name: 'Posts',     component: 'Posts',     href: '/example/'},
          {name: 'Users',     component: 'Users',     href: '/example/'},
          {name: 'Settings',  component: 'Settings',  href: '/example/'}]"
        /> -->

      <fn1-tabs>
        <fn1-tab name="Account" :selected="true">
          <div class="left" v-if="acctReq.cropped_image">
            <div class="profile-image">
              <img :src="acctReq.cropped_image" :alt="acctReq.first_name + ' ' + acctReq.last_name">
            </div>

            <fn1-button
              class="image-download"
              @click.native="downloadARImages(acctReq.cropped_image, acctReq.first_name + '-' + acctReq.last_name)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
              </svg>
              Save Image
            </fn1-button>
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

              <fn1-badge :class="acctReq.request_status">
                {{acctReq.request_status}}
              </fn1-badge>
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
              <fn1-badge
                v-for="s, i in requestStatuses"
                :class="s">
                {{s}}
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
                  <fn1-badge v-if="s.request_status == null"
                             class="new">
                    new
                  </fn1-badge>

                  <fn1-badge v-if="s.request_status != null"
                             :class="s.request_status">
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
                    <div></div>
                    <div>&mdash;</div>
                  </template>
                  {{s.created}}
                </th>
                <th>
                  <exampleDropdown
                    text="status"
                    navAlign="right">
                    <li v-for="rs, i in requestStatuses"
                        :class="rs"
                        @click="serviceStatusChange(s.account_request, s.id, s.request_status, rs)">
                        <span>{{rs}}</span>
                    </li>
                  </exampleDropdown>
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>

        <fn1-tab name="Extras" v-if="acctReq.dynamic_options">
          <div class="title-row">
            <h4><strong>Extra Q&amp;A</strong> associated with this <strong>Account Request</strong>.</h4>
          </div>

          <p v-for="ex, index in JSON.parse(acctReq.dynamic_options)" class="extras">
            {{ex}}
          </p><br>
        </fn1-tab>

        <fn1-tab name="History">
          <div class="title-row">
            <h4><strong>Action History</strong> associated with this <strong>Account Request</strong>.</h4>
          </div>

          <table>
            <caption class="sr-only">User Action History</caption>
            <thead>
              <tr>
                <th scope="col">Details</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="a, i in historyByUpdated" :key="i">
                <th>
                  <div>{{a.action}}</div>
                  <div>{{a.comment}}</div>
                </th>
                <th>
                  <div>{{MMDYYYYDateFormat(a.created)}}</div>
                  <div>{{timeAgo(a.created)}}</div>
                </th>
                <th>
                  <div>{{MMDYYYYDateFormat(a.updated)}}</div>
                  <div>{{timeAgo(a.updated)}}</div>
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>
      </fn1-tabs>
    </div>
  </div>
</template>

<script>
import FileSaver, { saveAs } from 'file-saver'

import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'

import {
  createHelpers }       from 'vuex-map-fields'

import headerComponent  from '~/components/headerComponent'
import exampleSelect    from '~/components/exampleSelect'
import exampleDropdown  from '~/components/exampleDropdown'

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
    this.getAcctReqActions();
  },
  middleware:       'authenticated',
  components: {
    headerComponent,
    exampleSelect,
    exampleDropdown,
  },
  data() {
    return {
      paramID:        "",
      acctReq:        "",
      serviceDetails: [],
      servicesStatus: [],
      userServices:   [],
      acctReqActions: [],
    }
  },
  computed: {
    ...mapFields([
      'authUser',
      'services.services',
      'requestStatuses'
    ]),
    historyByUpdated() {
      return this.acctReqActions.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
        );
    }
  },
  methods: {
    serviceStatusChange(acctReqID, servReqID, oldStatus, newStatus) {
      let payload = {
        "request_status": newStatus,
      }

      this.$axios
      .patch(`${process.env.api}${process.env.serviceReq}${servReqID}/`,payload)
      .then((res) => {
        console.log(`serviceStatusChange() :: `, res.data.results);

        this.$axios
        .post(`${process.env.api}${process.env.action}`,{
          "user":    this.authUser.id,
          "account": acctReqID,
          "action":  `Service Request: ${newStatus}.`,
          "comment": `Service Request for ${servReqID} changed from '${oldStatus}' to '${newStatus}'.`
        })
        .then(response => {
          console.log(`ACTION SR serviceStatusChange :: `, response);
          this.getServices();
          this.getUserServices();
          this.getAcctReqActions();
        })
        .catch(e => {
          console.log(`ACTION SR serviceStatusChange error :: `, e)
        });

      })
      .catch((error) => {
        console.log(`serviceStatusChange() error:: `, error);
      })
    },
    downloadARImages(image, name) {
      let nameToLower = name.toLowerCase();
      FileSaver.saveAs(image, `${nameToLower}.jpg`);
    },
    getAcctReqActions() {
      this.$axios
      .get(`${process.env.api}${process.env.action}?account=${this.paramID}&limit=1000`)
      .then((res) => {
        console.log(`getAcctReqActions() :: `, res.data.results);
        this.acctReqActions = res.data.results;
      })
      .catch((error) => {
        console.log(`getAcctReqActions() error:: `, error);
      })
    },
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

      this.serviceDetails = results;

      this.usersServices();
    },
    usersServices() {
      let masterServices = [];

      this.serviceDetails.forEach((item, i) => {
        masterServices.push({...item, ...this.servicesStatus[i]})
      });

      this.userServices = masterServices;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  $image-left-margin: 40px;
  $image-width-height: 130px;

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

  .navigation-dropdown {
    /deep/ ul {
      width: auto !important;

      li {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 5px 10px;
        color: $text-color;
        font-weight: $weight-semi-bold;
        text-align: left;
        border: none;
        border-bottom: 1px solid lighten($text-color, 60%);

        span {
          margin: 0 0 0 25px;
        }

        &:hover {
          border-radius: 0;
          border-top: none;
          border-right: none;
          border-left: none;
        }

        &:before {
          position: absolute;
          content: '';
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }

        &.new {
          &:before {
            background-color: $color-ucla-gold-dark;
          }
        }

        &.pending {
          &:before {
            background-color: $color-blue;
          }
        }

        &.approved {
          &:before {
            background-color: $color-green-light;
          }
        }

        &.active {
          border-radius: 0;

          &:before {
            background-color: $color-green;
          }
        }

        &.denied {
          &:before {
            background-color: $color-vermilion-darker;
          }
        }

        &.inactive {
          &:before {
            background-color: $text-color;
          }
        }
      }
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
    margin: 0 0 ($image-left-margin / 2) 0;
    width: $image-width-height;
    height: $image-width-height;
  }

  .image-download {
    background-color: $text-color;
    color: white;
    margin: 0 0 10px 0;

    svg {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: 0 10px 0 0;
    }
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
</style>