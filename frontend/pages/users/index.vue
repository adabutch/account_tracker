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
                         launchButtonText="Batch Approve">
                <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
                <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
              </fn1-modal>
            </template>
          </div>

          <template v-if="!readyAccounts.length">
            <h1>Sorry, no results.</h1>
          </template>

          <table v-if="readyAccounts.length">
            <caption class="sr-only">All User Requests</caption>
            <thead>
              <tr>
                <th scope="col">
                  <input v-model="batchReadyRequestApproval"
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
              <tr v-for="(item, index) in readyAccounts" :key="index">
                <th scope="row">
                  <input v-model="selected"
                         :key="index"
                         id="select-all-requests"
                         :value="item.id"
                         type="checkbox"
                         name="select-all-requests">
                </th>
                <th>
                  <div class="profile-image" v-if="item.cropped_image">
                    <img :src="item.cropped_image">
                  </div>
                  <div class="avatar" v-if="!item.cropped_image">
                    {{ userInitial(item.first_name) }}{{ userInitial(item.last_name) }}
                  </div>
                  <div class="name">
                    <div>
                      {{ item.first_name }} <template v-if="item.nickname">({{ item.nickname }})</template> {{ item.middle_name }} {{ item.last_name }}<template v-if="item.suffix">, {{ item.suffix }}</template>
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
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>

        <fn1-tab name="Pending">
          <div class="title-row">
            <h4>User account requests <strong>pending</strong> creation.</h4>

            <template v-if="batchApprovalCount > 1">
              <fn1-modal title="Ready Request Batch Confirmation"
                         launchButtonText="Batch Approve">
                <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
                <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
              </fn1-modal>
            </template>
          </div>

          <template v-if="!pendingAccounts.length">
            <h1>Sorry, no results.</h1>
          </template>

          <table v-if="pendingAccounts.length">
            <caption class="sr-only">All User Requests</caption>
            <thead>
              <tr>
                <th scope="col">
                  <input v-model="batchPendingRequestApproval"
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
              <tr v-for="(item, index) in pendingAccounts" :key="index">
                <th scope="row">
                  <input v-model="selected"
                         :key="index"
                         id="select-all-requests"
                         :value="item.id"
                         type="checkbox"
                         name="select-all-requests">
                </th>
                <th>
                  <div class="profile-image" v-if="item.cropped_image">
                    <img :src="item.cropped_image">
                  </div>
                  <div class="avatar" v-if="!item.cropped_image">
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
                </th>
              </tr>
            </tbody>
          </table>
        </fn1-tab>

        <fn1-tab name="Created">
          <h1>Requests Created</h1>
        </fn1-tab>
      </fn1-tabs>
    </div>

    <div class="slideover" v-if="showingUserDetails">
      <button @click="hideDetails" class="close">close</button>
      <h4>Detailed Information</h4>
      <fn1-button-group>
        <fn1-button @click.native="approveUserAccountRequest(showDetailsFor)">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
          </svg>
          Approve Request
        </fn1-button>

        <exampleModal ref="modal" title="Deny Account Request Confirmation"
                      :launchButtonText="denyModalButtonText">
          <p slot="body"><strong>Deny this Account Request?</strong></p>
          <ul slot="body">
            <li>
              <span>Name:</span>-
              {{showDetailsFor.first_name}}
              {{showDetailsFor.middle_name}}
              {{showDetailsFor.last_name}}
              {{showDetailsFor.suffix}}
              ({{showDetailsFor.department}})
            </li>
          </ul>

          <div class="field-group" slot="body">
            <label>Leave a comment or reason.</label>
            <textarea type="textarea"
                      v-model="denyRequestReason"
                      id="denial-comment"
                      placeholder="Text here ..."></textarea>
          </div>

          <fn1-button slot="footer"
                      @click.native="confirmModal(showDetailsFor)">Confirm
          </fn1-button>

          <fn1-button slot="footer"
                      @click.native="cancelModal">Cancel
          </fn1-button>
        </exampleModal>

      </fn1-button-group>
      <ul>
        <li v-if="showDetailsFor.request_status">
          <span>Request Status</span>
            <fn1-badge
              :class="{'ready': (showDetailsFor.request_status === 'ready')}">
              {{ showDetailsFor.request_status }}
            </fn1-badge>
        </li>

        <li v-if="showDetailsFor.first_name">
          <span>Name</span>
          - {{showDetailsFor.first_name}}
          <template v-if="showDetailsFor.nickname">
            ({{showDetailsFor.nickname}})
          </template>
          {{showDetailsFor.middle_name}}
          {{showDetailsFor.last_name}}
          {{showDetailsFor.suffix}}
        </li>

        <li v-if="showDetailsFor.employee_phone">
          <span>Employee Phone</span>
          - {{showDetailsFor.employee_phone}}
        </li>

        <li v-if="showDetailsFor.supervisor">
          <span>Supervisor</span>
          - {{showDetailsFor.supervisor}} ({{showDetailsFor.supervisor_phone}})
        </li>

        <li v-if="showDetailsFor.facility">
          <span>Facility</span>
          - {{showDetailsFor.facility}}
        </li>

        <li v-if="showDetailsFor.department">
          <span>Department</span>
          - {{showDetailsFor.department}}
        </li>

        <li v-if="showDetailsFor.group">
          <span>Group</span>
          - {{showDetailsFor.group}}
        </li>

        <li v-if="showDetailsFor.job">
          <span>Job</span>
          - {{showDetailsFor.job}}
        </li>

        <li v-if="showDetailsFor.clock_entry_only">
          <span>Clock-In Required</span>
          - {{showDetailsFor.clock_entry_only}}
        </li>

        <li v-if="showDetailsFor.employee_status">
          <span>Employee Status</span>
          - {{showDetailsFor.employee_status}}
        </li>

        <li v-if="showDetailsFor.start_date">
          <span>Start Date</span>
          - {{showDetailsFor.start_date}}
        </li>

        <li v-if="showDetailsFor.requested_services">
          <span>Requested Services</span>
          - {{showDetailsFor.requested_services}}
        </li>

        <li v-if="showDetailsFor.dynamic_options">
          <span>Extra Questions</span>
            <ul>
              <li v-for="ex, index in parseExtras(showDetailsFor.dynamic_options)">
                - {{ex}}
              </li>
            </ul>
        </li>
      </ul>
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
import adminUsersAside  from '~/components/users/adminUsersAside'
import exampleSelect    from '~/components/exampleSelect'
import exampleDropdown  from '~/components/exampleDropdown'
import exampleModal     from '~/components/exampleModal'

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
    exampleDropdown,
    exampleModal
  },
  data() {
    return {
      denyRequestReason: "",
      denyModalButtonText: "Deny Request",
      showModal: false,
      showDetailsFor: null,
      showingUserDetails: false,
      selectFilter: '',
      searchUsers:  '',
      batchRequestIDs: [],
      selected: [],
    }
  },
  mounted() {
    this.getAccountRequests;
  },
  watch: {
    // showModal(val) {
    //   this.$emit('modalChange', this.showModal);
    // }
  },
  methods: {
    parseExtras(extras){
      return JSON.parse(extras);
    },

    batchRequestButtonAction(e) {
      alert('we got here');
    },
    cancelModal() {
      this.$refs.modal.showModal = false;
    },
    confirmModal(payload) {
      this.$axios
      .patch(`${this.endpoints.baseUrl}account-request/${payload.id}/`,{
        "request_status": "denied",
        "comment": this.denyRequestReason
      })
      .then(response => {
        console.log(`confirmModal Denied :: `, response)
        this.$refs.modal.showModal = false;
        this.showDetailsFor = null;
        this.denyRequestReason = "";
        this.showingUserDetails = false;
        this.getAccountRequests;
      })
      .catch(e => {
        console.log(e)
      });
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
    approveUserAccountRequest(account) {
      this.$axios
      .patch(`${this.endpoints.baseUrl}account-request/${account.id}/`,{
        "request_status": "pending"
      })
      .then(response => {
        console.log(response)
        this.showDetailsFor = null;
        this.showingUserDetails = false;
        this.getAccountRequests;
      })
      .catch(e => {
        console.log(e)
      })
    },
    denyUserAccountRequest(account) {
      // alert('deny Account Request')
    }
  },
  computed: {
    ...mapFields([
      'accountRequests.pending',
      'accountRequests.ready',
      'accountRequests.approved',
      'accountRequests.denied',
      'endpoints',
      'authUser'
    ]),
    getAccountRequests() {
      this.$axios.get(`${this.endpoints.baseUrl}account-request/?limit=1000&request_status=pending`)
      .then((res) => {
        this.$store.dispatch('accountRequestsPending', res.data.results)
      })
      .catch((e) => {
        console.log(e);
      })

      this.$axios.get(`${this.endpoints.baseUrl}account-request/?limit=1000&request_status=ready`)
      .then((res) => {
        let readyResults = res.data.results;
        this.$store.dispatch('accountRequestsReady', readyResults);
      })
      .catch((e) => {
        console.log(e);
      })
    },
    watchShowModal() {
      return this.showModal;
    },
    batchApprovalCount() {
      return this.selected.length;
    },
    batchPendingRequestApproval: {
      get: function () {
        return this.pending ? this.selected.length == this.pending.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.pending.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
    },
    batchReadyRequestApproval: {
      get: function () {
        return this.ready ? this.selected.length == this.ready.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.ready.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
    },
    readyAccounts() {
      return this.ready
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
      .sort((a, b) => new Date(b.requested) - new Date(a.requested))
    },
    pendingAccounts() {
      return this.pending
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
      .sort((a, b) => new Date(b.requested) - new Date(a.requested))
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
  bottom: 0;
  margin-left: auto;
  padding: 20px 20px 0 20px;
  width: 400px;
  // height: 100vh;
  background-color: lighten($text-color, 60%);
  border-left: 1px solid lighten($text-color, 50%);
  filter: drop-shadow(10px 0 8px $text-color);
  color: $text-color;

  &:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    left: 0;
    background-color: red;
    height: 30px;
    width: 100%;
    background: linear-gradient(
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
    );
  }

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
    display: flex;
    margin: 15px 0 0 0;
    padding: 15px 0;
    border-top: 1px solid lighten($text-color, 50%);
    border-bottom: 1px solid lighten($text-color, 50%);

    div {
      margin: 0;
      padding: 0;
      display: inline-block;
    }

    button,
    .button,
    /deep/ div > button,
    /deep/ div > .button {
      margin: 0 10px 0 0;
      padding: 5px 10px;
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

      &:last-child {

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
    padding: 20px 0 0 0;
    // border-bottom: 1px solid lighten($text-color, 50%);
    font-weight: $weight-semi-bold;
  }

  ul {
    overflow-y: scroll;
    margin: 15px 0 0 0;
    padding: 0;
    list-style: none;
    height: calc(100% - 181px);

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

      ul {
        margin: 0;
        padding: 0;

        li {
          margin: 0 0 10px 0;
          padding: 0;
        }
      }
    }
  }
}
</style>