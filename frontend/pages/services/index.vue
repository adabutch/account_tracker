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

      <!-- {{mgrFullProfiles}}<br><br>- - - -<br><br>
      {{testNew}} -->

      <h2 v-if="!displayResults">Loading</h2>

     <table v-if="displayResults">
        <caption class="sr-only">All User Requests</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Service</th>
            <th scope="col">Acct. Req.</th>
            <!-- <th scope="col">Change Type</th> -->

            <th scope="col">Created</th>
            <th scope="col">Requested</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s, i in displayResults" :key="i">
            <th>
              <fn1-badge :class="s.request_status">
                {{s.request_status}}
              </fn1-badge>
            </th>
            <th>{{s.name}} -- {{s.service}}</th>
            <th>{{s.account_request}}</th>
            <th>
              <template v-if="s.created == null">
                <div></div>
                <div>&mdash;</div>
              </template>

              <template v-if="s.created != null">
                <div>{{MMDYYYYDateFormat(s.created)}}</div>
                <div>{{timeAgo(s.created)}}</div>
              </template>
            </th>
            <th>
              <div>{{MMDYYYYDateFormat(s.requested)}}</div>
              <div>{{timeAgo(s.requested)}}</div>
            </th>
            <th>
              <div>{{MMDYYYYDateFormat(s.updated)}}</div>
              <div>{{timeAgo(s.updated)}}</div>
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

      }, (reject) => {
        console.log(`getMgrProfiles() reject :: `, reject);
      });

      this.mgrServices();

      this.getServiceRequests()
      .then((resolve) => {
        this.$store.dispatch('services/setRequests', resolve);
        this.mgrARbySR();
        this.filterMgrServiceReqs();
        this.fullActiveServices();
        console.log(`getServiceRequests() resolve :: `, resolve);
      }, (reject) => {
        console.log(`getServiceRequests() reject :: `, reject);
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
      let results = this.services.filter((item) => {
        return this.mgrProfileIDs.indexOf(item.id) >= 0;
      });
      this.$store.dispatch('services/setMgrFullProfiles', results);
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

          this.getMgrProfiles()
          .then((resolve) => {
            this.mgrServices();
            console.log(`getMgrProfiles() resolve :: `, resolve);
          }, (reject) => {
            console.log(`getMgrProfiles() reject :: `, reject);
          });

          this.getServiceRequests()
          .then((resolve) => {
            this.$store.dispatch('services/setRequests', resolve);
            this.filterMgrServiceReqs();
            console.log(`getServiceRequests() resolve :: `, resolve);
          }, (reject) => {
            console.log(`getServiceRequests() reject :: `, reject);
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
      color: $text-color;

      thead tr th,
      tbody tr th {
        &:last-of-type {
          // background-color: green;
          text-align: right;
        }
      }

      thead {
        background-color: transparent;

        tr {
          th {
            // &:nth-of-type(1) {
            //   width: 1px;
            //   white-space: nowrap;
            // }
          }
        }
      }

      tbody {
        tr {
          th {
            p {
              font-size: 14px;
              color: lighten($text-color, 25%);
            }

            div {
              &:nth-child(2) {
                font-size: 14px;
                color: lighten($text-color, 25%);
              }
            }

            button {
              background-color: darken($color-silver, 10%);
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
</style>