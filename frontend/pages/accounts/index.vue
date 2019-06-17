<template>
  <div>
    <fn1-tabs v-if="authLevel.admin">
      <fn1-tab v-if="authLevel.admin"
               :name="`Pending (` + [[ newCount ]] + `)`"
               :selected="true">
        <div class="title-row">
          <h4><strong>Pending</strong> user <strong>Account Requests</strong>.</h4>

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

        <table v-if="newAccounts.length" class="fixed-header">
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
              <th scope="col">Requested By</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in newAccounts"
                :class="[{'active': showingUserDetails && item.id == showDetailsFor.id }]"
                :key="index">
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
                <template v-for="u, i in usersWithAcctReqs">
                  <template v-if="u.id === item.requester">
                    <div>{{u.first_name}} {{u.last_name}}</div>
                    <div>{{u.username}}</div>
                  </template>
                </template>
              </th>
              <th>
                <fn1-button @click.native="showDetails(item)">view</fn1-button>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>

      <fn1-tab :name="`In-Progress (` + [[ pendingCount ]] + `)`">
        <div class="title-row">
          <h4><strong>In-Progress</strong> user <strong>Account Requests</strong>.</h4>

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

        <template v-if="!inProgressAccounts.length">
          <h1>Sorry, no results.</h1>
        </template>

        <table v-if="inProgressAccounts.length" class="fixed-header">
          <caption class="sr-only">All User Requests</caption>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Dept.</th>
              <th scope="col">Created</th>
              <th scope="col">Requested By</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in inProgressAccounts" :key="index">
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
                <template v-for="u, i in usersWithAcctReqs">
                  <template v-if="u.id === item.requester">
                    <div>{{u.first_name}} {{u.last_name}}</div>
                    <div>{{u.username}}</div>
                  </template>
                </template>
              </th>
              <th>
                <nuxt-link class="button" :to="'/accounts/'+item.id">
                  view
                </nuxt-link>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>
    </fn1-tabs>

    <template v-if="inProgressAccounts.length && !authLevel.admin">
      <div class="title-row">
        <h4>
          <strong>In-Progress </strong>
          user <strong> Account Requests ({{this.acctReqs.accountRequests.inProgress.length}})</strong>
        </h4>

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

      <template v-if="!inProgressAccounts.length">
        <h1>Sorry, no results.</h1>
      </template>

      <table class="fixed-header">
        <caption class="sr-only">All User Requests</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Name</th>
            <th scope="col">Dept.</th>
            <th scope="col">Created</th>
            <th scope="col">Requested By</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in inProgressAccounts" :key="index">
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
              <template v-for="u, i in usersWithAcctReqs">
                <template v-if="u.id === item.requester">
                  <div>{{u.first_name}} {{u.last_name}}</div>
                  <div>{{u.username}}</div>
                </template>
              </template>
            </th>
            <th>
              <nuxt-link class="button"
                         :to="'/accounts/'+item.id">
                view
              </nuxt-link>
            </th>
          </tr>
        </tbody>
      </table>
    </template>

    <transition name="slideover-slide">
      <div v-if="showingUserDetails"
           :class="['slideover']"
           ref="slideover">
        <button @click="hideDetails" class="close">close</button>
        <h4>New Request Overview</h4>
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
          <li v-if="showDetailsFor.cropped_image || showDetailsFor.request_status">
            <div class="profile-image" v-if="showDetailsFor.cropped_image">
              <img :src="showDetailsFor.cropped_image" alt="User Image">
            </div>

            <fn1-badge v-if="showDetailsFor.request_status"
                :class="showDetailsFor.request_status">
                {{ showDetailsFor.request_status }}
            </fn1-badge>
          </li>

          <li v-if="showDetailsFor.first_name">
            <span>Name: </span>
            {{showDetailsFor.first_name}}
            <template v-if="showDetailsFor.nickname">
              ({{showDetailsFor.nickname}})
            </template>
            {{showDetailsFor.middle_name}}
            {{showDetailsFor.last_name}}<template v-if="showDetailsFor.suffix">,
              {{showDetailsFor.suffix}}
            </template>
          </li>

          <li v-if="showDetailsFor.employee_phone">
            <span>Employee Phone: </span>
            {{showDetailsFor.employee_phone}}
          </li>

          <li v-if="showDetailsFor.supervisor">
            <span>Supervisor: </span>
            {{showDetailsFor.supervisor}}

            <template v-if="showDetailsFor.supervisor_phone">
              ({{showDetailsFor.supervisor_phone}})
            </template>
          </li>

          <li v-if="showDetailsFor.facility">
            <span>Facility: </span>
            {{showDetailsFor.facility}}
          </li>

          <li v-if="showDetailsFor.department">
            <span>Department: </span>
            {{showDetailsFor.department}}
          </li>

          <li v-if="showDetailsFor.group">
            <span>Group: </span>
            {{showDetailsFor.group}}
          </li>

          <li v-if="showDetailsFor.job">
            <span>Job: </span>
            {{showDetailsFor.job}}
          </li>

          <li v-if="showDetailsFor.clock_entry_only">
            <span>Clock-In Required: </span>
            {{showDetailsFor.clock_entry_only}}
          </li>

          <li v-if="showDetailsFor.employee_status">
            <span>Employee Status: </span>
            {{showDetailsFor.employee_status}}
          </li>

          <li v-if="showDetailsFor.start_date">
            <span>Start Date: </span>
            {{showDetailsFor.start_date}}
          </li>

          <li v-if="showDetailsFor.requested_services">
            <span>Requested Services: </span>
            <template v-if="showDetailsForServices">
              <ul>
                <li v-for="s, i in showDetailsForServices">
                  <template v-if="s.name">- {{s.name}}</template>
                </li>
              </ul>
            </template>
          </li>

          <li v-if="showDetailsFor.dynamic_options.length > 2">
            <span>Extra Questions: </span>
              <ul>
                <li v-for="ex, index in parseExtras(showDetailsFor.dynamic_options)">
                  - {{ex}}
                </li>
              </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  createHelpers }       from 'vuex-map-fields';

import exampleSelect    from '~/components/exampleSelect'
import exampleDropdown  from '~/components/exampleDropdown'
import exampleModal     from '~/components/exampleModal'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  layout:           'accounts',
  components: {
    exampleSelect,
    exampleDropdown,
    exampleModal
  },
  data() {
    return {
      denyRequestReason:   "",
      denyModalButtonText: "Deny Request",
      acctReqActionDenied: "Account Request: Denied",
      acctReqActionApprove:"Account Request: In-Progress",
      acctReqActionApproveMsg: "Account Request advanced from 'pending' to 'in-progress'.",
      showModal:           false,
      showDetailsFor:      null,
      showDetailsForServices: [],
      showingUserDetails:  false,
      searchUsers:         "",
      batchRequestIDs:     [],
      selected:            [],
      usersWithAcctReqs:   [],
    }
  },
  created(){
    this.authLevel;
  },
  mounted() {
    this.getAccountRequests()
    .then(() => {
      this.idsToNames();

      if(this.$route.params.pending) {
        let view = this.pending.filter(acctReq => {
          return acctReq.id === this.$route.params.pending
        });
        this.showDetails(view[0]);
      }
    });
  },
  methods: {
    outside(e) {
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
        this.showDetailsForServices = [];
        this.denyRequestReason = "";
        this.showingUserDetails = false;
        this.getAccountRequests();
      })
      .catch(e => {
        console.log(e)
      });
    },
    showDetails(item) {
      let servicesArray = JSON.parse(item.requested_services);

      let namedServices = servicesArray.map((s) => {

        // note: validateStatus: false
        //
        // incase we get a service that is
        // no longer a valid service in our system
        return new Promise((resolve, reject) => {
          this.$axios
          .get(`${process.env.api}${process.env.service}${s}/`,
            { validateStatus: false })
          .then(res => {
            resolve(this.showDetailsForServices.push(res.data))
          })
          .catch(e  => reject(e));
        });
      });

      Promise.all(namedServices)
      .then((resolve) =>
        console.log(`%c namedServices 👌 `,
                    this.consoleLog.success)
      )
      .catch((reject) => {
        console.log(`%c namedServices 🛑 `,
                  this.consoleLog.error,
                  `\n\n ${reject} \n\n`);
      });

      this.showDetailsFor = item;
      this.showingUserDetails = true;
    },
    hideDetails() {
      this.showDetailsFor = null;
      this.showDetailsForServices = [];
      this.showingUserDetails = false;
    },
    watchInput(payload) {
      this.searchUsers = payload;
    },
    approveUserAccountRequest(payload) {
      let data = {
        "request_status": "in-progress"
      }

      this.$axios
      .patch(`${process.env.api}${process.env.accountRequest}${payload.id}/`, data)
      .then(response => {
        // note: `/inprogress/` below triggers the Service Req.
        this.$axios
        .get(`${process.env.api}${process.env.accountRequest}${payload.id}/inprogress/`)
        .then(response => {
          console.log(`%c /inprogress/ Service Req. Kickoff 👌 `, this.consoleLog.success)
        })
        .catch(e => {
          console.log(`%c /inprogress/ Service Req. Kickoff 🛑 `,
                    this.consoleLog.error,
                    `\n\n ${e} \n\n`);
        });

        let actionData = {
          "user":    this.authUser.id,
          "account": payload.id,
          "action":  this.acctReqActionApprove,
          "comment": this.acctReqActionApproveMsg
        }

        this.$axios
        .post(`${process.env.api}${process.env.action}`, actionData)
        .then(response => {
          console.log(`ACTION AR approve :: `, response)
        })
        .catch(e => {
          console.log(`ACTION AR approve error :: `, e)
        });

        this.showDetailsFor = null;
        this.showDetailsForServices = [];
        this.showingUserDetails = false;
        this.getAccountRequests();
      })
      .catch(e => {
        console.log(`approveUserAccountRequest req. error :: `, e)
      })
    },
    idsToNames() {
      this.usersWithAcctReqs = [];

      let allAcctReqs = new Set(),
      users           = new Set();

      allAcctReqs = [...this.pending,...this.inProgress];

      allAcctReqs.map((u) => {
        return users.add(u.requester);
      });

      users = [...users];

      let filteredUsers = users.filter(n => n);

      let userRequests = filteredUsers.map((user) => {
        return new Promise((resolve, reject) => {
          this.$axios
          .get(`${process.env.api}${process.env.employee}${user}/`)
          .then((res) => {
            resolve(this.usersWithAcctReqs.push(res.data));
          })
          .catch((e) => {
            reject(e);
          });
        })
      });

      Promise.all(userRequests).then(() =>
        console.log(`%c AR x userRequests 👌 `, this.consoleLog.success)
      );
    },
  },
  computed: {
    ...mapFields([
      'consoleLog',
      'acctReqs',
      'acctReqs.accountRequests',
      'acctReqs.accountRequests.pending',
      'acctReqs.accountRequests.inProgress',
      'acctReqs.accountRequests.approved',
      'acctReqs.accountRequests.active',
      'acctReqs.accountRequests.inactive',
      'acctReqs.accountRequests.denied',
      'auth.authUser',
      'auth.authLevel'
    ]),
    batchApprovalCount() {
      return this.selected.length;
    },
    newCount() {
      return this.pending.length;
    },
    pendingCount() {
      return this.inProgress.length;
    },
    // batchPendingRequestApproval: {
    //   get: function () {
    //     return this.pending ? this.selected.length == this.pending.length : false;
    //   },
    //   set: function (value) {
    //     var selected = [];

    //     if (value) {
    //       this.pending.forEach(function (item) {
    //         selected.push(item.id);
    //       });
    //     }
    //     this.selected = selected;
    //   }
    // },
    // batchNewRequestApproval: {
    //   get: function () {
    //     return this.new ? this.selected.length == this.new.length : false;
    //   },
    //   set: function (value) {
    //     var selected = [];

    //     if (value) {
    //       this.new.forEach(function (item) {
    //         selected.push(item.id);
    //       });
    //     }
    //     this.selected = selected;
    //   }
    // },
    fullName() {
      return `${user.first_name}`
    },
    newAccounts() {
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
    },
    inProgressAccounts() {
      return this.inProgress
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
  .page-wrapper {
    background-color: blue;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    table {
      color: $text-color;

      thead tr th,
      tbody tr th {

        &:last-of-type {
          text-align: right;
        }
      }

      thead {
        tr {
          th {
            &:nth-child(1) {
              width: 140px;
            }
          }
        }
      }

      tbody {
        height: calc(100vh - 350px);

        tr {
          th {

            &.status {
              width: 140px;
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

    ::v-deep .navigation-dropdown {
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

    .title-row {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 20px 0;
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

    .tabs-group {
      flex: 1;

      ::v-deep .tabs {
        ul {
          li {
            position: relative;
            color: $text-color;
            font-size: 18px;
            line-height: 18px;
            border-bottom: 1px solid transparent;

            &:before {
              position: absolute;
              content: '';
              top: -1px;
              left: -1px;
              right: -1px;
              height: 4px;
              border-top-left-radius: 2px;
              border-top-right-radius: 2px;
            }

            &:first-child {
              &.active,
              &:hover {
                &:before {
                  background-color: $color-ucla-gold-dark;
                }
              }
            }

            &:last-child {
              &.active,
              &:hover {
                &:before {
                  background-color: $color-blue;
                }
              }
            }
          }
        }
      }

      ::v-deep .tab-content {
        padding: 20px 0 0 0;
      }
    }
  }

  .slideover-slide-enter-active {
    transition: all .2s ease-in-out;
  }

  .slideover-slide-leave-active {
    transition: all .2s ease-in-out;
  }

  .slideover-slide-enter {
    transform: translate(100%, 0);
  }

  .slideover-slide-leave-to {
    transform: translate(100%, 0);
  }

  .slideover {
    position: fixed;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px 20px 0 20px;
    width: 400px;
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
      width: 100%;
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
      ::v-deep div > button,
      ::v-deep div > .button {
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

    .profile-image {
      margin: 0 10px 0 0;
      width: 50px;
      height: 50px;
    }

    h4 {
      padding: 20px 0 0 0;
      // border-bottom: 1px solid lighten($text-color, 50%);
      font-weight: $weight-semi-bold;
    }

    ul {
      overflow-y: scroll;
      margin: 15px 0 0 0;
      padding: 0 0 40px 0;
      list-style: none;
      height: calc(100% - 181px);
      width: 100%;

      li {
        margin: 0 0 15px 10px;
        font-weight: $weight-semi-bold;
        color: lighten($text-color, 15%);
        // font-size: 14px;

        &:first-child {
          // background-color: red;
          margin: 0 0 10px 0;
          display: inline-flex;
          align-items: center;
        }

        span:not(.badge) {
          // display: block;
          margin: 0 0 5px -10px;
          color: $text-color;
          font-size: $size-m;
        }

        ul {
          margin: 10px 0 0 0;
          padding: 0;

          li {
            margin: 0 0 10px 0;
            padding: 0;

            &:last-of-type {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>