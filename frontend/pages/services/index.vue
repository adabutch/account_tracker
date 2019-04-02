<template>
  <div>
    <fn1-tabs>
      <fn1-tab :name="`New (` + [[ newCount ]] + `)`"
               :selected="true">
        <div class="title-row">
          <h4><strong>New</strong> user <strong>Account Requests</strong>.</h4>

          <template v-if="batchApprovalCount > 1">
            <fn1-modal title="New Request Batch Confirmation"
                       launchButtonText="Batch Approve">
              <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
              <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
            </fn1-modal>
          </template>

          <div class="field-group">
            <input v-model="searchUsers"
                   id="search"
                   type="search"
                   name="search"
                   placeholder="Search by Name or Dept.">
          </div>
        </div>

        <template v-if="!newAccounts.length">
          <h1>Sorry, no results.</h1>
        </template>

        <table v-if="newAccounts.length">
          <caption class="sr-only">All User Requests</caption>
          <thead>
            <tr>
              <!-- <th scope="col">
                <input v-model="batchNewRequestApproval"
                       id="select-all-requests"
                       value="select-all-requests"
                       type="checkbox"
                       name="select-all-requests">
              </th> -->
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Dept.</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in newAccounts" :key="index">
              <!-- <th scope="row">
                <input v-model="selected"
                       :key="index"
                       id="select-all-requests"
                       :value="item.id"
                       type="checkbox"
                       name="select-all-requests">
              </th> -->
              <th class="status">
                <fn1-badge :class="item.request_status">
                  {{ item.request_status }}
                </fn1-badge>
              </th>
              <th class="icon">
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
                <div>{{ item.department }}</div>
                <div>{{ item.group }}</div>
              </th>
              <th>
                <div>{{ MMDYYYYDateFormat(item.requested) }}</div>
                <div>{{ timeAgo(item.requested) }}</div>
              </th>
              <th>
                <fn1-button @click.native="showDetails(item)">view</fn1-button>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>

      <fn1-tab :name="`Pending (` + [[ pendingCount ]] + `)`">
        <div class="title-row">
          <h4><strong>Pending</strong> user <strong>Account Requests</strong>.</h4>

          <template v-if="batchApprovalCount > 1">
            <fn1-modal title="Pending Request Batch Confirmation"
                       launchButtonText="Batch Approve">
              <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
              <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
            </fn1-modal>
          </template>

          <div class="field-group">
            <input v-model="searchUsers"
                   id="search"
                   type="search"
                   name="search"
                   placeholder="Search by Name or Dept.">
          </div>
        </div>

        <template v-if="!pendingAccounts.length">
          <h1>Sorry, no results.</h1>
        </template>

        <table v-if="pendingAccounts.length">
          <caption class="sr-only">All User Requests</caption>
          <thead>
            <tr>
              <!-- <th scope="col">
                <input v-model="batchPendingRequestApproval"
                       id="select-all-requests"
                       value="select-all-requests"
                       type="checkbox"
                       name="select-all-requests">
              </th> -->
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Dept.</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in pendingAccounts" :key="index">
              <!-- <th scope="row">
                <input v-model="selected"
                       :key="index"
                       id="select-all-requests"
                       :value="item.id"
                       type="checkbox"
                       name="select-all-requests">
              </th> -->
              <th class="status">
                <fn1-badge :class="item.request_status">
                  {{ item.request_status }}
                </fn1-badge>
              </th>
              <th class="icon">
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
                <div>{{ item.department }}</div>
                <div>{{ item.group }}</div>
              </th>
              <th>
                <div>{{ MMDYYYYDateFormat(item.updated) }}</div>
                <div>{{ timeAgo(item.updated) }}</div>
              </th>
              <th>
                <nuxt-link class="button" :to="'/account-requests/'+item.id">
                  view
                </nuxt-link>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>
    </fn1-tabs>
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

import headerNav        from '~/components/headerNav'
import exampleSelect    from '~/components/exampleSelect'
import exampleDropdown  from '~/components/exampleDropdown'
import exampleModal     from '~/components/exampleModal'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  middleware:       'authenticated',
  components: {
    headerNav,
    exampleSelect,
    exampleDropdown,
    exampleModal
  },
  data() {
    return {
      denyRequestReason:   "",
      denyModalButtonText: "Deny Request",
      acctReqActionDenied: "Account Request: Denied",
      acctReqActionApprove:"Account Request: Pending",
      acctReqActionApproveMsg: "Account Request advanced from 'new' to 'pending'.",
      showModal:           false,
      showDetailsFor:      null,
      showingUserDetails:  false,
      selectFilter:        "",
      searchUsers:         "",
      batchRequestIDs:     [],
      selected:            [],
    }
  },
  mounted() {
    this.getAccountRequests();
  },
  watch: {},
  methods: {
    outside(e) {
      alert('clicked');
      console.log(e);
      this.showingUserDetails = false;
    },
    parseExtras(extras){
      return JSON.parse(extras);
    },
    cancelModal() {
      this.$refs.modal.showModal = false;
    },
    confirmModal(payload) {
      this.$axios
      .patch(`${process.env.api}${process.env.accountRequest}${payload.id}/`,{
        "request_status": "denied",
        "comment": this.denyRequestReason
      })
      .then(response => {
        console.log(`confirmModal Denied :: `, response)

        this.$axios
        .post(`${process.env.api}${process.env.action}`,{
          "user":    this.authUser.id,
          "account": payload.id,
          "action":  this.acctReqActionDenied,
          "comment": this.denyRequestReason
        })
        .then(response => {
          console.log(`ACTION AR denied :: `, response)
        })
        .catch(e => {
          console.log(`ACTION AR denied error :: `, e)
        });

        this.$refs.modal.showModal = false;
        this.showDetailsFor = null;
        this.denyRequestReason = "";
        this.showingUserDetails = false;
        this.getAccountRequests();
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
    watchInput(payload) {
      console.log(`WI :: PAYLOAD ::: ${payload}`)
      this.searchUsers = payload;
    },
    watchSelect(payload) {
      console.log(`WS :: PAYLOAD ::: ${payload}`)
      this.selectFilter = payload;
    },
    approveUserAccountRequest(payload) {
      this.$axios
      .patch(`${process.env.api}${process.env.accountRequest}${payload.id}/`,{
        "request_status": "pending"
      })
      .then(response => {
        // console.log(`approveUserAccountRequest req. :: `, response);

        // note: `/pending/` below triggers the Service Req.
        this.$axios
        .get(`${process.env.api}${process.env.accountRequest}${payload.id}/pending/`)
        .then(response => {
          // console.log(`/pending/ Service Req. :: `, response)
        })
        .catch(e => {
          console.log(`/pending/ Service Req. error :: `, e)
        });

        this.$axios
        .post(`${process.env.api}${process.env.action}`,{
          "user":    this.authUser.id,
          "account": payload.id,
          "action":  this.acctReqActionApprove,
          "comment": this.acctReqActionApproveMsg
        })
        .then(response => {
          console.log(`ACTION AR approve :: `, response)
        })
        .catch(e => {
          console.log(`ACTION AR approve error :: `, e)
        });

        this.showDetailsFor = null;
        this.showingUserDetails = false;
        this.getAccountRequests();
      })
      .catch(e => {
        console.log(`approveUserAccountRequest req. error :: `, e)
      })
    },
    getAccountRequests() {
      this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=pending`)
      .then((res) => {
        this.$store.dispatch('accountRequestsPending', res.data.results)
      })
      .catch((e) => {
        console.log(e);
      })

      this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=new`)
      .then((res) => {
        // let newResults = res.data;
        let newResults = res.data.results;
        this.$store.dispatch('accountRequestsNew', newResults);
      })
      .catch((e) => {
        console.log(e);
      })
    },
  },
  computed: {
    ...mapFields([
      'accountRequests.new',
      'accountRequests.pending',
      'accountRequests.approved',
      'accountRequests.denied',
      'auth.authUser'
    ]),

    batchApprovalCount() {
      return this.selected.length;
    },
    newCount() {
      return this.new.length;
    },
    pendingCount() {
      return this.pending.length;
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
    batchNewRequestApproval: {
      get: function () {
        return this.new ? this.selected.length == this.new.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.new.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
    },
    fullName() {
      return `${user.first_name}`
    },
    newAccounts() {
      return this.new
      .filter(user => {
        let fullName   = user.full_name.toLowerCase(),
        firstName      = user.first_name.toLowerCase(),
        middleName     = user.middle_name.toLowerCase(),
        lastName       = user.last_name.toLowerCase(),
        userDept       = user.department.toLowerCase(),
        userGroup      = user.group.toLowerCase();

        return fullName.includes(this.searchUsers.toLowerCase()) ||
               firstName.includes(this.searchUsers.toLowerCase()) ||
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
        let fullName   = user.full_name.toLowerCase(),
        firstName      = user.first_name.toLowerCase(),
        middleName     = user.middle_name.toLowerCase(),
        lastName       = user.last_name.toLowerCase(),
        userDept       = user.department.toLowerCase(),
        userGroup      = user.group.toLowerCase();

        return fullName.includes(this.searchUsers.toLowerCase()) ||
               firstName.includes(this.searchUsers.toLowerCase()) ||
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
        tr {
          th {
            &.status,
            &.icon  {
              width: 1px;
              white-space: nowrap;
            }
          }
        }
      }

      tbody {
        tr {
          th {
            padding: 8px 0;

            &.status {
              width: 1px;
              white-space: nowrap;
              padding: 5px 20px 5px 8px;
            }

            &.icon {
              display: flex;
              flex-wrap: wrap;
              margin: 0;

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

            &:nth-child(n+3) {
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
        }
      }
    }
  }
</style>