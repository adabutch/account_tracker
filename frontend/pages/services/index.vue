<template>
  <div class="inner-wrapper">
    <servicesAside
      :filterServiceIDs="serviceFilterIDs"
      @filterServiceChange="watchServiceFilters"
      :filterAcctReqIDs="acctReqFilterIDs"
      @filterAcctReqChange="watchAcctReqFilters" />

    <div class="table-wrapper">
      <div class="title-row">
        <h4><strong>Services Requests ({{displayResults.length}})</strong> you manage.</h4>

        <div class="filters">
          <fn1-badge
            v-for="s, i in requestStatuses"
            :key="i"
            :class="s">
            {{s}}
          </fn1-badge>
        </div>
      </div>

      <h2 v-if="!displayResults">Loading</h2>

      <table v-if="displayResults">
        <caption class="sr-only">All User Requests</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Acct. Req.</th>
            <th scope="col">Service</th>
            <th scope="col">Created</th>
            <th scope="col">Requested</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <!-- <tr v-for="s, i in displayResults"
              :key="i"
              :class="{'active': acctReqRow === i}"
              @click="toggleAcctReqRow(s,i)"> -->
          <template v-for="s, i in displayResults" >
            <tr :class="{'active': acctReqRow === i}"
                :key="i"
                @click.stop="toggleAcctReqRow(s,i,$event)">
              <td>
                <fn1-badge :class="s.request_status">
                  {{s.request_status}}
                </fn1-badge>
              </td>
              <td>{{s.account_request}}</td>
              <td>{{s.service}}: {{s.name}}</td>
              <td>
                <template v-if="s.created == null">
                  <div></div>
                  <div>&mdash;</div>
                </template>

                <template v-if="s.created != null">
                  <div>{{MMDYYYYDateFormat(s.created)}}</div>
                  <div>{{timeAgo(s.created)}}</div>
                </template>
              </td>
              <td>
                <div>{{MMDYYYYDateFormat(s.requested)}}</div>
                <div>{{timeAgo(s.requested)}}</div>
              </td>
              <td>
                <div>{{MMDYYYYDateFormat(s.updated)}}</div>
                <div>{{timeAgo(s.updated)}}</div>
              </td>
              <td>
                <exampleDropdown
                  text="status"
                  navAlign="right">
                  <li v-for="rs, i in requestStatuses"
                      :class="rs"
                      @click="serviceStatusChange(s.account_request, s.id, s.request_status, rs)">
                      <span>{{rs}}</span>
                  </li>
                </exampleDropdown>
              </td>
            </tr>
            <tr v-if="acctReqRow === i"
                :class="{'active': acctReqRow === i}">
              <td class="acct-req-row">
                <div class="wrapper">
                  <div class="profile-image" v-if="acctReqRowAcct.cropped_image">
                    <img :src="acctReqRowAcct.cropped_image" :alt="acctReqRowAcct.first_name + ' ' + acctReqRowAcct.last_name">
                  </div>
                  <div class="avatar" v-if="!acctReqRowAcct.cropped_image">
                    {{ userInitial(acctReqRowAcct.first_name) }}{{ userInitial(acctReqRowAcct.last_name) }}
                  </div>


                  <div class="account-fields">
                    <h4>
                      <template v-if="acctReqRowAcct.first_name">
                        {{acctReqRowAcct.first_name}}
                      </template>

                      <template v-if="acctReqRowAcct.nickname">
                        ({{acctReqRowAcct.nickname}})
                      </template>

                      <template v-if="acctReqRowAcct.middle_name">
                        {{acctReqRowAcct.middle_name}}
                      </template>

                      <template v-if="acctReqRowAcct.last_name">
                        {{acctReqRowAcct.last_name}}
                      </template>

                      <template v-if="acctReqRowAcct.suffix">
                        {{acctReqRowAcct.suffix}}
                      </template>

                      <fn1-badge :class="acctReqRowAcct.request_status">
                        {{acctReqRowAcct.request_status}}
                      </fn1-badge>
                    </h4>

                    <div class="first">
                      <div v-if="acctReqRowAcct.facility">
                        <h5>Facility</h5>
                        <p>{{acctReqRowAcct.facility}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.department">
                        <h5>Department</h5>
                        <p>{{acctReqRowAcct.department}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.group">
                        <h5>Group</h5>
                        <p>{{acctReqRowAcct.group}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.job">
                        <h5>Job</h5>
                        <p>{{acctReqRowAcct.job}}</p>
                      </div>
                    </div>

                    <div>
                      <div v-if="acctReqRowAcct.supervisor">
                        <h5>Supervisor</h5>
                        <p>{{acctReqRowAcct.supervisor}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.supervisor_phone">
                        <h5>Supervisor Phone</h5>
                        <p>{{acctReqRowAcct.supervisor_phone}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.employee_phone">
                        <h5>Employee Phone</h5>
                        <p>{{acctReqRowAcct.employee_phone}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.clock_entry_only">
                        <h5>Clock Entry Only</h5>
                        <p>{{acctReqRowAcct.clock_entry_only}}</p>
                      </div>

                      <div v-if="acctReqRowAcct.employee_status">
                        <h5>Employee Status</h5>
                        <p>{{acctReqRowAcct.employee_status}}</p>
                      </div>
                    </div>

                    <!-- <div class="three">
                      <template v-if="acctReqRowAcct.start_date">
                        <h5>Start Date: {{timeAgo(acctReqRowAcct.start_date)}}</h5>
                        <p>{{MMDYYYYDateFormat(acctReqRowAcct.start_date)}}</p>
                      </template>

                      <template v-if="acctReqRowAcct.end_date">
                        <h5>End Date: {{timeAgo(acctReqRowAcct.end_date)}}</h5>
                        <p>{{MMDYYYYDateFormat(acctReqRowAcct.end_date)}}</p>
                      </template>


                      <template v-if="acctReqRowAcct.requested">
                        <h5>Requested Date: {{timeAgo(acctReqRowAcct.requested)}}</h5>
                        <p>{{MMDYYYYDateFormat(acctReqRowAcct.requested)}}</p>
                      </template>

                      <template v-if="acctReqRowAcct.updated">
                        <h5>Updated Date: {{timeAgo(acctReqRowAcct.updated)}}</h5>
                        <p>{{MMDYYYYDateFormat(acctReqRowAcct.updated)}}</p>
                      </template>

                      <template v-if="acctReqRowAcct.created">
                         <h5>Updated Date: {{timeAgo(acctReqRowAcct.created)}}</h5>
                        <p>{{MMDYYYYDateFormat(acctReqRowAcct.created)}}</p>
                                   disabled />
                      </template>
                    </div> -->
                  </div>
                </div>
              </td>
            </tr>

          </template>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

import exampleDropdown  from '~/components/exampleDropdown'
import servicesAside    from '~/components/services/servicesAside'

export default {
  layout:           'services',
  middleware:       'authenticated',
  components: {
    exampleDropdown,
    servicesAside,
  },
  mounted() {
    this.mgrID = this.authUser.id;

    this.getServices()
    .then((resolve) => {
      this.$store.dispatch('services/setServices', resolve);

      this.getMgrProfiles()
      .then((resolve) => {
        let data    = resolve,
        ids         = [];
        data.forEach((service) => {
          ids.push(service.service);
        });
        this.$store.dispatch('services/setMgrProfileIDs', ids);

        this.mgrServices()
        .then((resolve) => {
          console.log('YOOOOOOOO', resolve);
          this.$store.dispatch('services/setMgrFullProfiles', resolve)


          this.getServiceRequests()
          .then((resolve) => {
            this.$store.dispatch('services/setRequests', resolve);

            this.filterMgrServiceReqs();
            this.fullActiveServices();
            this.mgrARbySR();
            console.log(`getServiceRequests() resolve :: `, resolve);
          }, (reject) => {
            console.log(`getServiceRequests() reject :: `, reject);
          });
        })
      }, (reject) => {
        console.log(`getMgrProfiles() reject :: `, reject);
      });
    }, (reject) => {
      console.log(`getServices() reject error :: `, e);
    });
  },
  data() {
    return {
      mgrID:            null,
      serviceFilterIDs: [],
      acctReqFilterIDs: [],
      acctReqRow:       null,
      acctReqRowAcct:   null,
      show:             false,
    }
  },
  methods: {
    watchServiceFilters(payload) {
      console.log(`watchServiceFilters :: PAYLOAD ::: ${payload}`)
      this.serviceFilterIDs = payload;
    },
    watchAcctReqFilters(payload) {
      console.log(`watchAcctReqFilters :: PAYLOAD ::: ${payload}`)
      this.acctReqFilterIDs = payload;
    },
    getServices() {
      // store as 'services'
      return new Promise((resolve,reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.service}?limit=5000`)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((e) => {
          reject(console.log(`getServices() promise error :: `, e));
        });
      });
    },
    getMgrProfiles() {
      // store as 'mgrProfileIDs'
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.serviceManager}?manager=${this.mgrID}&limit=5000`)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((e) => {
          reject(console.log(e));
        });
      });
    },
    getServiceRequests() {
      // store as 'requests'
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.serviceReq}?limit=5000`)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((e) => {
          reject(console.log(e));
        });
      });
    },
    mgrARbySR() {
      let results           = [],
      acctReqsXService      = this.activeAcctReqIDs,
      uAcctReqsXService     = [...new Set(acctReqsXService)];

      let requests = uAcctReqsXService.map((item) => {
        return new Promise((resolve, reject) => {
          this.$axios
          .get(`${process.env.api}${process.env.accountRequest}?id=${item}`)
          .then((res) => {
            resolve(results.push(res.data.results[0]));
          })
          .catch((e) => {
            reject(console.log(`mgrARbySR() :: `, e));
          });
        });
      });

      Promise.all(requests).then(() =>
       this.$store.dispatch('services/setAcctReqsByServiceReq', results)
      );
    },
    mgrServices() {
      // store as 'mgrFullProfiles'
      // getServices() && getMgrProfiles()
      return new Promise((resolve) => {
        resolve(this.services.filter((item) => {
            return this.mgrProfileIDs.indexOf(item.id) >= 0;
          })

        )
      });
    },
    filterMgrServiceReqs() {
      // store as 'mgrServiceReqs'
      // getServiceRequests()
      let results = this.requests.filter((item) => {
        return this.mgrProfileIDs.indexOf(item.service) >= 0;
      });
      this.$store.dispatch('services/setMgrServiceReqs', results);
      this.filterActives();
    },
    filterActives() {
      // alert('ran filterActives()');

      let activeServices = [],
      activeAcctReqs     = [];

      this.mgrServiceReqs.forEach((item) => {
        activeServices.push(item.service);
        activeAcctReqs.push(item.account_request);
      });

      let uniqActiveServices = [...new Set(activeServices)],
      uniqActiveAcctReqs     = [...new Set(activeAcctReqs)];

      this.$store.dispatch('services/setActiveServiceIDs', uniqActiveServices);
      this.$store.dispatch('services/setActiveAcctReqIDs', uniqActiveAcctReqs);
    },
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

          this.getServices()
          .then((resolve) => {
            this.$store.dispatch('services/setServices', resolve);

            this.getMgrProfiles()
            .then((resolve) => {
              let data    = resolve,
              ids         = [];
              data.forEach((service) => {
                ids.push(service.service);
              });
              this.$store.dispatch('services/setMgrProfileIDs', ids);

              this.mgrServices()
              .then((resolve) => {
                console.log('YOOOOOOOO', resolve);
                this.$store.dispatch('services/setMgrFullProfiles', resolve)


                this.getServiceRequests()
                .then((resolve) => {
                  this.$store.dispatch('services/setRequests', resolve);

                  this.filterMgrServiceReqs();
                  this.fullActiveServices();
                  this.mgrARbySR();
                  console.log(`getServiceRequests() resolve :: `, resolve);
                }, (reject) => {
                  console.log(`getServiceRequests() reject :: `, reject);
                });
              })
            }, (reject) => {
              console.log(`getMgrProfiles() reject :: `, reject);
            });
          }, (reject) => {
            console.log(`getServices() reject error :: `, e);
          });

        })
        .catch(e => {
          console.log(`ACTION SR serviceStatusChange error :: `, e)
        });

      })
      .catch((error) => {
        console.log(`serviceStatusChange() error:: `, error);
      })
    },
    fullActiveServices() {
      let fullActives = this.mgrFullProfiles.filter((item) => {
        return this.activeServiceIDs.indexOf(item.id) >= 0;
      });

      this.$store.dispatch('services/setFullActiveServices', fullActives);
    },
    toggleAcctReqRow(service, i, e) {
      let clicked = e.srcElement.nodeName;
      if(clicked === 'TD') {
        this.acctReqRowAcct = null;
        let serviceIdx      = service.account_request,
        sameRow             = (this.acctReqRow === i);
        sameRow ? this.acctReqRow = null : this.acctReqRow = i;

        let copy = [...this.acctReqsByServiceReq];
        let copyResults = copy.filter((acctReq) => {
          if(acctReq.id === serviceIdx)
            return acctReq
        })

        this.acctReqRowAcct = copyResults[0];
      }
    }
  },
  computed: {
    ...mapFields([
      'auth.authUser',
      'requestStatuses',
      'services.requests',
      'services.services',
      'services.mgrProfileIDs',
      'services.mgrFullProfiles',
      'services.mgrServiceReqs',
      'services.activeServiceIDs',
      'services.activeAcctReqIDs',
      'services.acctReqsByServiceReq'
    ]),
    testNew() {
      let masterServices = [];
      this.mgrFullProfiles.forEach((item, i) => {
        this.mgrServiceReqs.forEach((s, i) => {
          if(item.id === s.service) {
            // delete item.id
            // delete item.created
            // delete item.updated
            masterServices.push({...item,...s})
          }
        })
      });
      return masterServices
    },
    displayResults() {
      let hasServiceFilters = this.serviceFilterIDs.length != 0,
      hasAcctReqFilters     = this.acctReqFilterIDs.length != 0,
      hasBothFilters        = hasServiceFilters && hasAcctReqFilters;

      if(hasBothFilters){
        return this.testNew
        .filter((item) => {
          return this.serviceFilterIDs.indexOf(item.service) >= 0 &&
                 this.acctReqFilterIDs.indexOf(item.account_request) >= 0;
        })
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      } else if(hasServiceFilters) {
        return this.testNew
        .filter((item) => {
          return this.serviceFilterIDs.indexOf(item.service) >= 0;
        })
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      } else if(hasAcctReqFilters) {
        return this.testNew
        .filter((item) => {
          return this.acctReqFilterIDs.indexOf(item.account_request) >= 0;
        })
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      } else {
        return this.testNew
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  .inner-wrapper{
    display: flex;
    position: relative;
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

  .table-wrapper {
    display: table;
    position: relative;
    width: calc(100% - 300px);
    margin-left: auto;

    h1 {
      color: $text-color;
      font-size: $size-l;
      line-height: $size-l;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    .title-row {
      position: fixed;
      width: calc(100% - 340px);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 20px 0;
      min-height: 25px;

      h4 {
        color: $text-color;
        font-size: 18px;
        line-height: 18px;
      }

      .filters {
        margin-left: auto;
        display: flex;

        .badge {
          margin: 0 10px 0 0;

          &:last-of-type {
            margin: 0;
          }
        }
      }

      .field-group {
        display: flex;
        width: 350px;
        min-width: 350px;
        max-width: 350px;
        margin: 0 0 0 20px;

        &:hover {
          input {
            border-color: lighten($text-color, 30%);
          }
        }

        input {
          border-radius: $radius-default;

          &:focus {
            border-color: lighten($text-color, 30%);
          }
        }
      }
    }

    table {
      margin: 60px 0 0 0;
      color: $text-color;

      thead tr th,
      tbody tr td {
        min-width: 150px;
        width: 150px;

        &:nth-of-type(3) {
          min-width: 450px;
          width: 450px;
        }

        &:last-of-type {
          text-align: right;
        }
      }

      thead {
        background-color: transparent;
        border-bottom: 1px solid #ddd;
        width: 100%;
        display: block;
        position: relative;
      }

      tbody {
        display: block;
        height: calc(100vh - 300px);
        overflow-y: scroll;

        tr {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          cursor: pointer;

          &.active {
            background-color: lighten($color-grey, 7%);
          }

          td {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            &.acct-req-row {
              display: block;
              width: 100%;
              padding: 8px;
              border-top: none;

              .wrapper {
                display: flex;
                width: 100%;

                .avatar {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 0 60px 0 0;
                  background-color: lighten($color-blue, 45%);
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                }

                .profile-image {
                  margin: 0 60px 0 0;
                  width: 100px;
                  height: 100px;

                  img {
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }

                .account-fields {
                  background-color: lighten($color-grey, 15%);
                  border-radius: $radius-default;
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: left;
                  width: 100%;

                  h4 {
                    margin: 0 0 15px 0;
                    padding: 0 0 10px 0;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ddd;

                    span {
                      margin: 0 0 0 10px;
                    }
                  }

                  h5 {
                    color: $text-color;
                    font-size: 18px;
                    margin: 0 0 2px 0;
                    font-weight: 600;
                  }

                  .field-group {
                    width: 100%;
                  }

                  div {
                    display: flex;
                    flex-wrap: wrap;
                    flex-basis: 100%;

                    &.first {
                      margin: 0 0 10px 0;
                    }

                    > div {
                      flex-basis: 25%;
                    }
                  }
                }
              }
            }

            p {
              font-size: 14px;
              color: lighten($text-color, 25%);
            }

            div {
              display: block;
              width: 100%;

              &:nth-child(2) {
                font-size: 14px;
                color: lighten($text-color, 25%);
              }
            }

            .navigation-dropdown {
              margin-left: auto;

              button {
                background-color: darken($color-silver, 10%);
                padding: 0 10px;
              }
            }
          }
        }
      }
    }
  }
</style>