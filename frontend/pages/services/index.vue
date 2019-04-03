<template>
  <div class="inner-wrapper">
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
            <th scope="col">Service</th>
            <th scope="col">Acct. Req.</th>
            <!-- <th scope="col">Change Type</th> -->
            <th scope="col">Req. Status</th>
            <th scope="col">Created</th>
            <th scope="col">Requested</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s, i in mgrServiceReqs" :key="i">
            <th>{{s.service}}</th>
            <th>{{s.account_request}} <!-- / {{s.id}} --></th>
            <!-- <th>{{s.type_of_change}}</th> -->
            <th>{{s.request_status}}</th>
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
                    :class="rs">
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
import {
  createHelpers }       from 'vuex-map-fields';

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
      this.filterActiveServiceIDs;
    },
    filterActiveServiceIDs() {
      let actives = [];

      this.mgrServiceReqs.forEach((item) => {
        actives.push(item.service);
      })

      let uniq = [...new Set(actives)];

      return this.$store.dispatch('services/setActiveServiceIDs', uniq);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  .inner-wrapper{
    display: flex;
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