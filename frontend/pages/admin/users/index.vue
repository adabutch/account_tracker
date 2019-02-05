<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">

      <adminUsersAside />

      <fn1-tabs>
        <fn1-tab name="Ready" :selected="true">

          <div class="title-row">
            <h4>User account requests <strong>ready</strong> for review.</h4>

            <template v-if="batchApprovalCount >= 1">
              <fn1-modal title="Ready Request Batch Confirmation"
                         :launchButtonText="launchButtonText">
                <p slot="body">Approve all <strong>({{ batchApprovalCount }})</strong> requests?</p>
                <fn1-button slot="footerBtnConfirm">I Understand</fn1-button>
              </fn1-modal>
            </template>
          </div>

          <table>
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
              <tr v-for="(item, index) in initAllUsers" :key="index">
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
                  <div>{{ item.division }}</div>
                </th>
                <th>
                  <div>02/01/2019</div>
                  <div>4 days ago</div>
                </th>
                <th>
                  <fn1-dropdown text=". . ."
                                navAlign="right"
                                :navItems="[
                                  {name: 'Details',       href: '#'},
                                  {name: 'Approve',       href: '#'},
                                  {name: 'Deny',          href: '#'}
                                ]" />
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
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import { mapFields }    from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent.vue'
import adminUsersAside  from '~/components/admin/users/adminUsersAside.vue'

export default {
  components: {
    headerComponent,
    adminUsersAside
  },
  data() {
    return {
      rows: [],
      // batchRequestApproval: [],
      batchRequestIDs: [],
      selected: [],
      launchButtonText: "Batch Approve"
    }
  },
  mounted() { },
  watch: { },
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
    userInitial(name) {
      return name.charAt(0);
    },
  },
  computed: {
    ...mapFields([
      'initAllUsers'
    ]),
    batchApprovalCount() {
      return this.selected.length;
    },
    batchRequestApproval: {
      get: function () {
        return this.initAllUsers ? this.selected.length == this.initAllUsers.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.initAllUsers.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
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
</style>