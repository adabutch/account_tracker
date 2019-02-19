<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">

      <adminUsersAside :searchUsersProp="searchUsers"
                       :selectFilterProp="selectFilter"
                       @inputChange="watchInput"
                       @selectChange="watchSelect" />

      <fn1-tabs>
        <fn1-tab name="Ready" :selected="true">

          <div class="title-row">
            <h4>User account requests <strong>ready</strong> for review.</h4>

            <template v-if="batchApprovalCount > 1">
              <fn1-modal title="Ready Request Batch Confirmation"
                         :launchButtonText="launchButtonText">
                <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
                <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
              </fn1-modal>
            </template>
          </div>

          <template v-if="!filteredList.length">
            <h1>Sorry, no results.</h1>
          </template>

          <table v-if="filteredList.length">
            <caption class="sr-only">All User Requests</caption>
            <thead>
              <tr>
                <th scope="col">
                  <input v-model="batchRequestApproval"
                         id="select-all-requests"
                         value="select-all-requests"
                         type="checkbox"
                         name="select-all-requests">
                </th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Dept.</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in filteredList" :key="index">
                <th scope="row">
                  <input v-model="selected"
                         :key="index"
                         id="select-all-requests"
                         :value="item.id"
                         type="checkbox"
                         name="select-all-requests">
                </th>
                <th>
                  <div class="avatar">
                    {{ userInitial(item.first_name) }}{{ userInitial(item.last_name) }}
                  </div>
                  <div class="name">
                    <div>
                      {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}<template v-if="item.suffix">, {{ item.suffix }}</template>
                    </div>
                    <div>{{ item.job }}</div>
                  </div>
                </th>
                <th>
                  <fn1-badge :class="{'ready': (item.request_status === 'ready')}">
                    {{ item.request_status }}
                  </fn1-badge>
                </th>
                <th>
                  <div>{{ item.department }}</div>
                  <div>{{ item.group }}</div>
                </th>
                <th>
                  <div>{{ requestedDateFormat(item.requested) }}</div>
                  <div>{{ requestedTimeAgo(item.requested) }}</div>
                </th>
                <th>
                  <fn1-button @click.native="showDetails(item)">view</fn1-button>
                  <!-- <exampleDropdown text=". . ." navAlign="right">
                    <li>
                      <a href="#" @click="showDetails(item)" title="Details">Details</a>
                    </li>

                    <li>
                      <a href="#" title="Approve">Approve</a>
                    </li>

                    <li>
                      <a href="#" title="Deny">Deny</a>
                    </li>
                  </exampleDropdown> -->
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>

        <fn1-tab name="Pending">
          <h1>Requests Pending</h1>
        </fn1-tab>

        <fn1-tab name="Created">
          <h1>Requests Created</h1>
        </fn1-tab>
      </fn1-tabs>
    </div>

    <div class="slideover" v-if="showingUserDetails">
      <button @click="hideDetails" class="close">close</button>
      <h4>Detailed Information</h4>
      <ul>
        <li>
          <span>Request Status</span>
            <fn1-badge
              :class="{'ready': (showDetailsFor.request_status === 'ready')}">
              {{ showDetailsFor.request_status }}
            </fn1-badge>
        </li>

        <li>
          <span>Name</span>
          - {{showDetailsFor.first_name}}
          {{showDetailsFor.middle_name}}
          {{showDetailsFor.last_name}}
          {{showDetailsFor.suffix}}
        </li>

        <li>
          <span>Supervisor</span>
          - {{showDetailsFor.supervisor}} ({{showDetailsFor.supervisor_phone}})
        </li>

        <li>
          <span>Facility</span>
          - {{showDetailsFor.facility}}
        </li>

        <li>
          <span>Department</span>
          - {{showDetailsFor.department}}
        </li>

        <li>
          <span>Group</span>
          - {{showDetailsFor.group}}
        </li>

        <li>
          <span>Job</span>
          - {{showDetailsFor.job}}
        </li>

        <li>
          <span>Employee Status</span>
          - {{showDetailsFor.employee_status}}
        </li>

        <li>
          <span>Start Date</span>
          - {{showDetailsFor.start_date}}
        </li>
      </ul>

      <fn1-button-group>
        <fn1-button @click.native="approveUserAccountRequest">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
          </svg>
          Approve
        </fn1-button>
        <fn1-button @click.native="denyUserAccountRequest">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path>
          </svg>
          Deny
        </fn1-button>
      </fn1-button-group>

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

import headerComponent  from '~/components/headerComponent.vue'
import adminUsersAside  from '~/components/admin/users/adminUsersAside.vue'
import exampleSelect    from '~/components/exampleSelect.vue'
import exampleDropdown  from '~/components/exampleDropdown.vue'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    adminUsersAside,
    exampleSelect,
    exampleDropdown
  },
  data() {
    return {
      showDetailsFor: null,
      showingUserDetails: false,
      selectFilter: '',
      searchUsers:  '',
      requestTypes: [
        { value: 'ready', text: 'Ready' },
        { value: 'deactivate', text: 'Deactivate' }
      ],
      rows: [],
      // batchRequestApproval: [],
      batchRequestIDs: [],
      selected: [],
      launchButtonText: "Batch Approve"
    }
  },
  mounted() {
    this.$axios.get(`${this.endpoints.baseUrl}account-request/?format=json&limit=1000`)
    .then((res) => {
      this.$store.commit('GET_READY_USERS', res.data.results)
    })
  },
  watch: {},
  methods: {
    batchRequestButtonAction(e) {
      alert('we got here');
    },
    cancelModal() {
      alert('clicked cancel')
    },
    confirmModal() {
      // this.showModal = false
    },
    showDetails(item) {
      this.showDetailsFor = item;
      this.showingUserDetails = true;
    },
    hideDetails() {
      this.showDetailsFor = null;
      this.showingUserDetails = false;
    },
    userInitial(name) {
      return name.charAt(0);
    },
    watchInput(payload) {
      console.log(`WI :: PAYLOAD ::: ${payload}`)
      this.searchUsers = payload;
    },
    watchSelect(payload) {
      console.log(`WS :: PAYLOAD ::: ${payload}`)
      this.selectFilter = payload;
    },
    requestedDateFormat(requestedDate) {
      return moment(requestedDate).format('MM/D/YYYY');
    },
    requestedTimeAgo(requestedDate) {
      return moment(requestedDate).fromNow();
    },
    approveUserAccountRequest() {
      alert('approve Account Request')
    },
    denyUserAccountRequest() {
      alert('deny Account Request')
    }
  },
  computed: {
    ...mapFields([
      'getReadyUsers',
      'endpoints'
    ]),
    batchApprovalCount() {
      return this.selected.length;
    },
    batchRequestApproval: {
      get: function () {
        return this.getReadyUsers ? this.selected.length == this.getReadyUsers.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.getReadyUsers.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
    },
    fullNames() {
      return this.getReadyUsers;
    },
    filteredList() {
      return this.getReadyUsers
      .filter(user => {
        let firstName  = user.first_name.toLowerCase();
        let middleName = user.middle_name.toLowerCase();
        let lastName   = user.last_name.toLowerCase();
        let userDept   = user.department.toLowerCase();
        let userGroup  = user.group.toLowerCase();

        return firstName.includes(this.searchUsers.toLowerCase()) ||
               middleName.includes(this.searchUsers.toLowerCase()) ||
               lastName.includes(this.searchUsers.toLowerCase()) ||
               userDept.includes(this.searchUsers.toLowerCase()) ||
               userGroup.includes(this.searchUsers.toLowerCase())
      })
      .filter(user => {
        let requestType = user.request_status.toLowerCase();
        return requestType.includes(this.selectFilter.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.page-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  // background-color: red;

  aside {
    padding: 20px;
    // background-color: green;
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
          &:nth-of-type(2) {
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
          &:nth-of-type(2) {
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

          &:nth-child(4),
          &:nth-child(5) {
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

  /deep/ .navigation-dropdown {
    summary {
      background-color: darken($color-silver, 10%);
    }

    ul {
      li {
        width: 100%;
        border: none;
        margin: 0;
        padding: 0 10px;
        text-align: left;
        border-radius: 0;

        &:hover {
          border: none;
          background-color: lighten($color-silver, 40%);
        }
      }
    }
  }

  .tabs-group {
    flex: 1;
    padding: 20px;

    /deep/ .tabs {
      ul {
        li {
          color: $text-color;
          font-size: 18px;
          line-height: 18px;
        }
      }
    }

    /deep/ .tab-content {
      padding: 0;

      .tab-pane {
        .title-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30px 0 20px 0;
          min-height: 25px;
          // background-color: red;

          h4 {
            color: $text-color;
            font-size: 18px;
            line-height: 18px;
          }

          button {
            margin: 0;
            padding: 0 20px;
            background-color: $color-green;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.badge {
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;

  &.ready {
    background-color: $color-green;
  }
}

.slideover {
  position: fixed;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  top: 0;
  right: 0;
  margin-left: auto;
  padding: 20px;
  width: 400px;
  height: 100vh;
  background-color: lighten($text-color, 60%);
  border-left: 1px solid lighten($text-color, 50%);
  color: $text-color;

  button {
    padding: 5px 10px;

    &.close {
      background-color: darken($color-silver, 10%);
      width: 100px;
      margin-left: auto;

      &:hover {
        background-color: darken($color-silver, 15%);
      }
    }
  }

  .button-group {
    display: block;
    margin: 15px 0 0 0;
    padding: 15px 0;
    border-top: 1px solid lighten($text-color, 50%);
    border-bottom: 1px solid lighten($text-color, 50%);

    button,
    .button {
      margin: 0;
      border-radius: $radius-default;
      background-color: $color-orange-darker;
      border: none;

      &:hover {
        background-color: darken($color-orange-darker, 5%);
      }

      &:first-child {
        background-color: $color-green;

        &:hover {
          background-color: darken($color-green, 5%);
        }
      }

      svg {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 10px 0 0;
      }
    }
  }

  h4 {
    padding: 20px 0 5px 0;
    border-bottom: 1px solid lighten($text-color, 50%);
    font-weight: $weight-semi-bold;
  }

  ul {
    margin: 15px 0 0 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0 0 10px 10px;
      font-weight: $weight-semi-bold;
      color: lighten($text-color, 15%);
      font-size: 14px;

      span:not(.badge) {
        display: block;
        margin: 0 0 5px -10px;
        color: $text-color;
        font-size: $size-m;
      }
    }
  }
}
</style>