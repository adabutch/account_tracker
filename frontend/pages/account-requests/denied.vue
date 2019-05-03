<template>
  <div class="table-wrapper">
    <h1>Denied Account Requests</h1>

    <div class="title-row">
      <h4>User Account Requests <strong>deined ({{deniedCount}})</strong> after review.</h4>

      <div class="field-group">
        <input v-model="searchUsers"
               id="search"
               type="search"
               name="search"
               placeholder="Search by Name or Dept.">
      </div>
    </div>

    <template v-if="!deniedAccounts.length">
      <h1>Sorry, no results.</h1>
    </template>

    <table v-if="deniedAccounts.length">
      <caption class="sr-only">All User Requests</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Reason</th>
          <th scope="col">Date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in deniedAccounts" :key="index">
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
            <fn1-badge :class="{'denied': (item.request_status === 'denied')}">
              {{ item.request_status }}
            </fn1-badge>
          </th>
          <th>
            <p>{{ item.comment }}</p>
          </th>
          <th>
            <div>{{ requestedDateFormat(item.updated) }}</div>
            <div>{{ requestedTimeAgo(item.updated) }}</div>
          </th>
        </tr>
      </tbody>
    </table>
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

import headerNav  from '~/components/headerNav'
import exampleSelect    from '~/components/exampleSelect'
import exampleDropdown  from '~/components/exampleDropdown'
import exampleModal     from '~/components/exampleModal'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  layout:           'account-reqs',
  components: {
    headerNav,
    exampleSelect,
    exampleDropdown,
    exampleModal
  },
  data() {
    return {
      selectFilter: '',
      searchUsers:  '',
    }
  },
  mounted() {
    this.getDeniedAccountRequests();
  },
  methods: {
    getDeniedAccountRequests() {
      this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=denied`)
      .then((res) => {
        console.log(res.data.results)
        this.$store.dispatch('accountRequestsDenied', res.data.results)
      })
      .catch((e) => {
        console.log(e);
      })
    },
    watchInput(payload) {
      console.log(`WI :: PAYLOAD ::: ${payload}`)
      this.searchUsers = payload;
    },
    watchSelect(payload) {
      console.log(`WS :: PAYLOAD ::: ${payload}`)
      this.selectFilter = payload;
    },
    userInitial(name) {
      return name.charAt(0);
    },
    requestedDateFormat(requestedDate) {
      return moment(requestedDate).format('MM/D/YYYY');
    },
    requestedTimeAgo(requestedDate) {
      return moment(requestedDate).fromNow();
    },
  },
  computed: {
    ...mapFields([
      'accountRequests.denied',
      'auth.authUser'
    ]),
    deniedCount() {
      return this.denied.length;
    },
    deniedAccounts() {
      return this.denied
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
      // .filter(status => {
      //   let requestType = status.request_status.toLowerCase();
      //   return requestType === "ready"
      // })
      .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    },
  }
}
</script>

<style lang="scss" scoped>

.page-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  // background-color: red;

  aside {
    padding: 20px;
    // background-color: green;
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
      margin: 30px 0 20px 0;
      min-height: 25px;

      h4 {
        color: $text-color;
        font-size: 18px;
        line-height: 18px;
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

  .badge {
    text-transform: uppercase;
    font-size: 14px;
    margin: 0;

    &.denied {
      background-color: $color-vermilion-darker;
    }
  }
}
</style>