<template>
  <div>
    <servicesAside />

    <div class="table-wrapper">
      <div class="title-row">
        <h4>New <strong>Services Requests</strong> awaiting action.</h4>

        <div class="filters">
          <fn1-badge
            v-for="s, i in requestStatuses"
            :key="i"
            :class="s">
            {{s}}
          </fn1-badge>
        </div>
      </div>

      <h2 v-if="!mgrServiceReqs">Loading</h2>

      <table v-if="mgrServiceReqs">
        <caption class="sr-only">All User Requests</caption>
        <thead>
          <tr>
            <th scope="col">Acct. Req.</th>
            <th scope="col">Service</th>
            <th scope="col">Change Type</th>
            <th scope="col">Req. Status</th>
            <th scope="col">Created</th>
            <th scope="col">Requested</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s, i in mgrServiceReqs" :key="i">
            <th>{{s.account_request}} / {{s.id}}</th>
            <th>{{s.service}}</th>
            <th>{{s.type_of_change}}</th>
            <th>{{s.request_status}}</th>
            <th>{{s.created}}</th>
            <th>{{s.requested}}</th>
            <th>{{s.updated}}</th>
            <th>actions</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  createHelpers }       from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

import servicesAside from '~/components/services/servicesAside'

export default {
  layout:           'services',
  middleware:       'authenticated',
  components: {
    servicesAside,
  },
  mounted() {
    this.mgrID = this.authUser.id;
  },
  data() {
    return {
      mgrID:        null,
    }
  },
  methods: {},
  computed: {
    ...mapFields([
      'auth.authUser',
      'requestStatuses',
      'services.services',
      'services.mgrProfileIDs',
      'services.mgrFullProfiles',
      'services.mgrServiceReqs',
      'services.requests'
    ]),
    getServices() {
      this.$axios
      .get(`${process.env.api}${process.env.service}?limit=5000`)
      .then((res) => {
        this.$store.dispatch('services/setServices', res.data.results);
      })
      .catch((e) => {
        console.log(e);
      })
    },
    getMgrProfiles() {
      this.$axios
      .get(`${process.env.api}${process.env.serviceManager}?manager=${this.mgrID}&limit=5000`)
      .then((res) => {
        let data    = res.data.results,
        ids         = [];

        data.forEach((service) => {
          ids.push(service.service);
        });

        this.$store.dispatch('services/setMgrProfileIDs', ids);
      })
      .catch((e) => {
        console.log(e);
      })
    },
    getServiceRequests() {
      this.$axios
      .get(`${process.env.api}${process.env.serviceReq}?limit=5000`)
      .then((res) => {
        this.$store.dispatch('services/setRequests', res.data.results);
      })
      .catch((e) => {
        console.log(e);
      })
    },
    mgrServices() {
      let results = this.services.filter((item) => {
        return this.mgrProfileIDs.indexOf(item.id) >= 0;
      });
      return this.$store.dispatch('services/setMgrFullProfiles', results);
    },
    filterMgrServiceReqs() {
      let results = this.requests.filter((item) => {
        return this.mgrProfileIDs.indexOf(item.service) >= 0;
      });
      return this.$store.dispatch('services/setMgrServiceReqs', results);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-child(1) {
      display: flex;
      background-color: green;
    }
  }

  .table-wrapper {
    flex: 1;

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
            &:nth-of-type(1) {
              width: 1px;
              min-width: 350px;
              white-space: nowrap;
            }
          }
        }
      }

      tbody {
        tr {
          th {
            &:nth-of-type(1) {
              display: flex;
              flex-wrap: wrap;
              // background-color: pink;

              div {
                &.avatar {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: lighten($color-blue, 45%);
                  margin: 0 20px 0 0;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }

                &.profile-image {
                  margin: 0 20px 0 0;
                  width: 50px;
                  height: 50px;
                }

                &.name {
                  // background-color: red;
                  display: flex;
                  flex-direction: column;
                  align-self: center;

                  div {
                    width: 100%;

                    &:nth-child(2) {
                      font-size: 14px;
                      color: lighten($text-color, 25%);
                    }
                  }
                }
              }
            }

            p {
              font-size: 14px;
              color: lighten($text-color, 25%);
            }

            &:nth-child(3) {
              max-width: 500px;
            }

            &:nth-child(3),
            &:nth-child(4) {
              div {
                &:nth-child(2) {
                  font-size: 14px;
                  color: lighten($text-color, 25%);
                }
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