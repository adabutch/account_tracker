<template>
  <div>
    <div class="search">
      <div class="wrapper">
        <fn1-input v-if="resultType === 'requests'"
                   v-model="acctReqSearch"
                   label="Account Request Search"
                   :placeholder="searchPlaceholder"
                   name="acct-req-search"
                   id="acct-req-search" />

        <fn1-input v-if="resultType === 'directory'"
                   v-model="adDataSearch"
                   label="Active Directory Search"
                   :placeholder="searchPlaceholder"
                   name="ad-data-search"
                   id="ad-data-search" />

        <!-- <p v-if="filteredAcctReqs.length && acctReqSearch !== ''">
          {{filteredAcctReqs.length}} results
        </p> -->

        <div class="form-group inline">
          <fieldset>
            <legend>Results:</legend>
            <div v-for="r, i in resultTypeOptions">
              <input v-model="resultType"
                     type="radio"
                     name="search-result-type"
                     :id="r.value"
                     :value="r.value">
              <label :for="r.value">{{r.text}}</label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="results-wrapper">
      <div class="status-legend">
        <template v-if="resultType === 'requests'">
          <fn1-badge v-for="s, i in requestStatuses"
                     :key="s"
                     :class="s">{{s}}
          </fn1-badge>
        </template>

        <template v-if="resultType === 'directory'">
          <fn1-badge v-for="s, i in directoryStatuses"
                     :key="s"
                     :class="s">{{s}}
          </fn1-badge>
        </template>
      </div>

      <div class="results">
        <template v-if="resultType === 'requests'">
          <div class="no-results" v-if="!filteredAcctReqs.length">
            <h4>No results for, <strong>"{{acctReqSearch}}"</strong>.</h4>
            <fn1-button @click.native="goCreateAccountRequest">New Account Request</fn1-button>
          </div>

          <div v-for="a, i in filteredAcctReqs"
               class="result requests"
               :class="a.request_status">
            <div class="profile-image" v-if="a.cropped_image">
              <img :src="a.cropped_image">
            </div>

            <div class="avatar" v-if="!a.cropped_image">
              {{ userInitial(a.first_name) }}{{ userInitial(a.last_name) }}
            </div>

            <div>
              <p class="label">
                <span v-if="a.first_name">{{a.first_name}}</span>
                <span v-if="a.nickname">{{a.nickname}}</span>
                <span v-if="a.middle_name">{{a.middle_name}}</span>
                <span v-if="a.last_name">{{a.last_name}}</span>
              </p>
              <p v-if="a.department">{{a.department}}</p>
              <p v-if="a.job">{{a.job}}</p>
            </div>

            <div>
              <p class="label">Last Update</p>
              <p v-if="a.updated">{{MMDYYYYDateFormat(a.updated)}}</p>
              <p v-if="a.updated">{{timeAgo(a.updated)}}</p>
            </div>

            <div>
              <fn1-button @click.native="viewAccountRequest(a)">view</fn1-button>
            </div>
          </div>
        </template>

        <template v-if="resultType === 'directory'">
          <!-- <RecycleScroller class="scroller"
                           :items="mockADData"
                           :item-size="64"
                           key-field="sAMAccountName"
                           :prerender="10"
                           v-slot="{ item, index, active }">

            <div :class="['result directory', {'enabled': item.enabled === true, 'disabled': item.enabled === false}]">

              <div>
                <p>{{item.givenName}} {{item.sn}}</p>
                <p>{{item.userPrincipalName}}</p>
              </div>

              <div>
                <p>{{item.title}}</p>
                <p>{{item.department}}</p>
              </div>

              <div>
              </div>
            </div>
          </RecycleScroller> -->

          <DynamicScroller
            :items="filteredADResults"
            :min-item-size="64"
            key-field="sAMAccountName"
            :prerender="10"
            class="scroller">

            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[item.givenName, item.sn, item.userPrincipalName, item.title, item.department]"
                :data-index="index">

                <div :class="['result directory', {'enabled': item.enabled === true, 'disabled': item.enabled === false}]">

                  <div>
                    <p>{{item.givenName}} {{item.sn}}</p>
                    <p>{{item.userPrincipalName}}</p>
                  </div>

                  <div>
                    <p>{{item.title}}</p>
                    <p>{{item.department}}</p>
                  </div>

                  <div>
                  </div>
                </div>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>

          <!-- <div v-for="a, i in mockADData"
               class="result directory"
               :class="{'enabled': a.enabled === true, 'disabled': a.enabled === false}">

            <div>
              <p v-if="a.givenName || a.sn">{{a.givenName}} {{a.sn}}</p>
              <p v-if="a.userPrincipalName">{{a.userPrincipalName}}</p>
            </div>

            <div>
              <p v-if="a.title">{{a.title}}</p>
              <p v-if="a.department">{{a.department}}</p>
            </div>

            <div>
              <exampleModal ref="viewADUserModal"
                            class="viewADUserModal"
                            :title="`Active Directory: ${a.givenName} ${a.sn}`"
                            launchButtonText="view">

                <template slot="body" slot-scope="props">
                  <div>
                    <fn1-input label="enabled"
                             :name="a.enabled"
                             :value="a.enabled"
                             disabled />

                    <fn1-input label="sAMAccount Name"
                               :name="a.sAMAccountName"
                               :value="a.sAMAccountName"
                               disabled />

                    <fn1-input label="Distinguished Name"
                               :name="a.distinguishedName"
                               :value="a.distinguishedName"
                               disabled />

                    <fn1-input label="Given Name / SN"
                               :name="a.givenName"
                               :value="`${a.givenName} ${a.sn}`"
                               disabled />

                    <fn1-input label="User Principal Name"
                               :name="a.userPrincipalName"
                               :value="a.userPrincipalName"
                               disabled />

                    <fn1-input label="Country Code"
                               :name="a.countryCode"
                               :value="a.countryCode"
                               disabled />

                    <fn1-input label="Mail"
                               :name="a.mail"
                               :value="a.mail"
                               disabled />

                    <fn1-input label="Display Name"
                               :name="a.displayName"
                               :value="a.displayName"
                               disabled />

                    <fn1-input label="Description"
                               :name="a.description"
                               :value="a.description"
                               disabled />

                    <fn1-input label="Telephone Number"
                               :name="a.telephoneNumber"
                               :value="a.telephoneNumber"
                               disabled />

                    <fn1-input label="Pager"
                               :name="a.pager"
                               :value="a.pager"
                               disabled />

                    <fn1-input label="facsimile TelephoneNumber"
                               :name="a.facsimileTelephoneNumber"
                               :value="a.facsimileTelephoneNumber"
                               disabled />

                    <fn1-input label="Info"
                               :name="a.info"
                               :value="a.info"
                               disabled />

                    <fn1-input label="Physical Delivery Office Name"
                               :name="a.physicalDeliveryOfficeName"
                               :value="a.physicalDeliveryOfficeName"
                               disabled />

                    <fn1-input label="Title"
                               :name="a.title"
                               :value="a.title"
                               disabled />

                    <fn1-input label="Department"
                               :name="a.department"
                               :value="a.department"
                               disabled />

                    <fn1-input label="UID"
                               :name="a.uid"
                               :value="a.uid"
                               disabled />

                    <fn1-input label="Employee ID"
                               :name="a.employeeID"
                               :value="a.employeeID"
                               disabled />

                    <fn1-input label="Employee Number"
                               :name="a.employeeNumber"
                               :value="a.employeeNumber"
                               disabled />
                  </div>
                </template>

                <fn1-button slot="footer"
                            class="close"
                            title="Close"
                            @click.native="closeModal(i)">
                  Close
                </fn1-button>
              </exampleModal>
            </div>
          </div> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields }   from 'vuex-map-fields'
import axios           from 'axios'
import mockAD          from 'static/json/mock-AD.json'

import exampleModal   from '~/components/exampleModal'

export default {
  layout:           'search',
  components: {
    exampleModal
  },
  // async asyncData () {

  //   let { res } = await axios.get(`https://dhcp-vm-218.bloomington.in.gov:5004/api/NovellDirectory/*`)
  //   console.dir(res);
  //   return { adData: res }
  // },
  data() {
    return {
      mockADData:   mockAD,
      acctReqSearch: '',
      adDataSearch:  '',
      searchPlaceholder: 'Search by Name, Job, Department or Group',
      resultType:    'requests',
      resultTypeOptions: [
        { text: 'Account Requests', value: 'requests' },
        { text: 'Active Directory', value: 'directory' }
      ],
    }
  },
  mounted() {
    this.getAccountRequests();

    // this.$axios
    // .get(`https://dhcp-vm-218.bloomington.in.gov:5004/api/NovellDirectory/*`)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  },
  updated() {
    this.authLevel;
    this.allAccountRequests();
  },
  methods: {
    goCreateAccountRequest() {
      this.$router.push(this.paths.createAccountRequest);
    },
    viewAccountRequest(id) {
      if(this.authLevel.admin && id.request_status == "pending") {
        this.$router.push(
          { name: `account-requests`, params: { 'pending': id.id }}
        );
      } else {
        this.$router.push(this.paths.accountRequests + id.id);
      }
    },
    allAccountRequests() {
      console.dir(this.authLevel);
      if(this.authLevel.regular || this.authLevel.support) {
        var master = [...this.accountRequests.approved,...this.accountRequests.denied,...this.accountRequests.inProgress];
      } else {
        var master = [...this.accountRequests.approved,...this.accountRequests.denied,...this.accountRequests.inProgress,...this.accountRequests.pending];
      }
      return master
    },
    closeModal(i) {
      this.$refs.viewADUserModal[i].showModal = false;
    },
  },
  computed: {
    ...mapFields([
      'auth.authLevel',
      'paths',
      'requestStatuses',
      'directoryStatuses',
      'consoleLog',
      'acctReqs.accountRequests'
    ]),
    filteredAcctReqs() {
      if(this.acctReqSearch.length) {
        return this.allAccountRequests()
        .filter(user => {
          let fullName   = user.full_name.toLowerCase(),
          firstName      = user.first_name.toLowerCase(),
          middleName     = user.middle_name.toLowerCase(),
          lastName       = user.last_name.toLowerCase(),
          job            = user.job.toLowerCase(),
          userDept       = user.department.toLowerCase(),
          userGroup      = user.group.toLowerCase();

          return fullName.includes(this.acctReqSearch.toLowerCase()) ||
                 firstName.includes(this.acctReqSearch.toLowerCase()) ||
                 middleName.includes(this.acctReqSearch.toLowerCase()) ||
                 lastName.includes(this.acctReqSearch.toLowerCase()) ||
                 job.includes(this.acctReqSearch.toLowerCase()) ||
                 userDept.includes(this.acctReqSearch.toLowerCase()) ||
                 userGroup.includes(this.acctReqSearch.toLowerCase()) ||
                 fullName.includes(this.acctReqSearch.toLowerCase())
        })
        .sort((a, b) => new Date(b.requested) - new Date(a.requested))
      } else {
        return this.allAccountRequests()
        .sort((a, b) => new Date(b.requested) - new Date(a.requested))
      }
    },
    removeADNulls() {
      this.mockADData.forEach(item => {
        for(var key in item){
          if(item[key] == null)
            item[key] = ""
            // delete item[key]
        }
      });
      return this.mockADData;
    },
    filteredADResults() {
      if(this.adDataSearch.length) {
        return this.removeADNulls
        .filter(user => {
          let sAMAccountName = user.sAMAccountName.toLowerCase(),
              firstName      = user.givenName.toLowerCase(),
              lastName       = user.sn.toLowerCase(),
              fullName       = user.displayName.toLowerCase(),
              jobTitle       = user.title.toLowerCase(),
              department     = user.department.toLowerCase(),
              uid            = user.uid.toLowerCase(),
              employeeID     = user.employeeID.toLowerCase();


          return sAMAccountName.includes(this.adDataSearch.toLowerCase()) ||
                 firstName.includes(this.adDataSearch.toLowerCase()) ||
                 lastName.includes(this.adDataSearch.toLowerCase()) ||
                 fullName.includes(this.adDataSearch.toLowerCase()) ||
                 jobTitle.includes(this.adDataSearch.toLowerCase()) ||
                 department.includes(this.adDataSearch.toLowerCase()) ||
                 uid.includes(this.adDataSearch.toLowerCase()) ||
                 employeeID.includes(this.adDataSearch.toLowerCase())
        })
        // .sort((a, b) => new Date(b.requested) - new Date(a.requested))
      } else {
        return this.removeADNulls
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .search {
    // position: absolute;
    top: 0;
    width: 100%;
    background-color: $color-blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 50px 0 0 0;
    z-index: 1;

    .wrapper {
      position: relative;
      border-top-left-radius: ($radius-default * 2);
      border-top-right-radius: ($radius-default * 2);
      background: rgba(255, 255, 255, 0.08%);
      padding: 25px 100px 35px 100px;
      width: 750px;
      margin: 0;

      p {
        position: absolute;
        bottom: 15px;
        color: white;
        font-style: italic;
      }

      .form-group {
        &.inline {
          margin: 20px 0 0 0;

          fieldset {
            padding: 0;

            legend {
              @include visuallyHidden;
            }

            div {
              align-items: baseline;
              margin: 0 16px 0 0;

              input {
                margin: 0 8px 0 0;

                &:checked + label,
                &:hover + label {
                  color: white;
                }
              }

              label {
                margin: 0 !important;
                color: rgba(255,255,255,0.65);
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    ::v-deep .field-group {
      width: 100%;
      margin: 0;

      label {
        color: rgba(255, 255, 255, 0.9%);
      }
    }
  }

  .scroller {
    height: 100%;
  }

  .viewADUserModal {
    ::v-deep .modal-wrapper {
      .modal-container {
        width: 675px;

        .modal-body {
          max-height: 650px;

          div {
            &:first-of-type {
              background-color: red;
            }
          }
        }
      }
    }
  }

  .results-wrapper {
    width: 100%;
    height: calc(100vh - 320px);
    position: fixed;
    overflow-y: scroll;
    top: 324px;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .status-legend {
      position: fixed;
      transform: translate(-430%);
      left: 50%;
      top: 343px;
      width: 120px;

      span {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin: 0 0 10px auto;

        &:last-of-type {
          margin: 0 0 0 auto;
        }
      }
    }

    .results {
      width: 750px;
      overflow-y: scroll;
      position: absolute;
      top: 0;
      // bottom: 0;
      background-color: rgba(255, 255, 255, 0.5%);
      border-bottom-left-radius: ($radius-default * 2);
      border-bottom-right-radius: ($radius-default * 2);

      h4 {
        // background-color: green;
        color: lighten($text-color, 25%);
        width: 100%;
        padding: 20px;
        text-align: center;
        font-size: 20px;
        line-height: 24px;
      }

      .no-results {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;

        h4 {
          // background-color: red;
          display: inline-block;
          width: fit-content;
        }

        button {
          height: fit-content;
          display: flex;
          align-items: center;
          align-self: center;
          background-color: $color-green;
          margin: 0 20px 0 auto;
          padding: 10px 15px;

          &:hover {
            background-color: darken($color-green, 5%);
          }
        }
      }
    }
  }

  .result {
    // background-color: pink;
    margin: 0;
    padding: 15px 20px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid darken($color-grey-lighter, 7%);
    border-left: 10px solid;

    &.pending {
      border-left-color: $color-ucla-gold-dark;
    }

    &.in-progress {
      border-left-color: $color-blue;
    }

    &.approved {
      border-left-color: $color-green-light;
    }

    &.completed,
    &.enabled {
      border-left-color: $color-green;
    }

    &.denied {
      border-left-color: $color-vermilion-darker;
    }

    &.inactive,
    &.disabled {
      border-left-color: $text-color;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 15%);
    }

    // &:last-of-type {
    //   border-bottom: none;
    // }

    &.requests {
      div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;

        &:nth-of-type(2) {
          // background-color: red;
          width: 300px;
          margin-right: 20px;
          padding-right: 20px;
          border-right: 1px solid darken($color-grey-lighter, 7%);
        }

        &:last-of-type {
          justify-content: center;
          margin-left: auto;

          button {
            background-color: $color-green;

            &:hover {
              background-color: darken($color-green, 5%);
            }
          }
        }
      }
    }

    &.directory {
      div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;

        &:nth-of-type(1) {
          width: 300px;
          margin-right: 20px;
          padding-right: 20px;
          border-right: 1px solid darken($color-grey-lighter, 7%);
        }

        &:last-of-type {
          justify-content: center;
          margin-left: auto;

          div {
            margin: 0;
            padding: 0;
            border: none;
            width: auto;

            ::v-deep button {
              background-color: $color-green;
              margin: 0;

              &:hover {
                background-color: darken($color-green, 5%);
              }
            }
          }
        }
      }
    }

    p {
      color: $text-color;
      font-weight: $weight-semi-bold;

      &:not(:first-of-type) {
        font-size: 14px;
        color: lighten($text-color, 25%);
      }
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: lighten($color-blue, 45%);
      margin: 0 20px 0 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .profile-image {
      margin: 0 20px 0 0;
      width: 50px;
      height: 50px;
    }
  }
</style>