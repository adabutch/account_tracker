<template>
  <div class="step-wrapper">
    <div class="progress-stepper">
      <h3>User Creation Wizard</h3>

      <div v-for="(step, index) in totalSteps"
           ref="progressSteps"
           :title="`Go to Step ` + [[ step ]]"
           :key="index"
           :class="['step-outside',{
            'active':   stepActive === step,
            'complete': finishedStep(step),
            'error':    (index+1) == errorIndex
           }]">

        <div class="step-inside" @click="goToStep(index)">
          <svg v-if="finishedStep(step)" version="1.1" id="check" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46px" height="37px" viewBox="0 0 46 37" enable-background="new 0 0 46 37" xml:space="preserve">
            <polygon id="check-icon" fill="" points="0.2230862,22.3627338 14.1432562,36.2812843 45,5.4261613 40.3345947,0.7607598 14.1432562,26.9504795 4.7655683,17.5744114 "/>
          </svg>

          <span v-if="stepActive <= step">{{step}}</span>
        </div>
      </div>
    </div>

    <div class="button-wrapper">
      <exampleModal ref="formResetModal"
                    title="Reset - Account Request Form"
                    launchButtonText="reset form">

        <p slot="body">
          <strong>Are you sure</strong> you want to clear all current data entered for this Account Request?
        </p>

        <fn1-button slot="footer"
                    title="Confirm - Account Request Reset"
                    @click.native.prevent="resetForm">Confirm
        </fn1-button>

        <fn1-button slot="footer"
                    title="Cancel - Account Request Reset"
                    @click.native="cancelModal('formResetModal')">Cancel
        </fn1-button>
      </exampleModal>

      <nuxt-link v-if="showPreviousBtn"
                 class="button previous"
                 title="Previous Step"
                 :to="previousButton">
        Previous
      </nuxt-link>

      <nuxt-link v-if="stepActive < totalSteps"
                 :event="''"
                 @click.native.prevent="goToStep(stepActive)"
                 class="button"
                 title="Next Step"
                 :to="nextButton">
        Next
      </nuxt-link>

      <nuxt-link v-if="stepActive == totalSteps"
                 class="button"
                 title="Next Step"
                 :to="nextButton">
        Finish
      </nuxt-link>
    </div>

    <exampleModal ref="existingUserModal"
                  class="existingUserModal"
                  :title="`Existing User Check: ${first} ${last}`">

      <div slot="body">
        <fn1-alert variant="warning">
          <p>
            <strong>Warning: ({{existingADMatches.length + existingARMatches.length}}) </strong>
            Potential existing matches.
          </p>
        </fn1-alert>

        <!-- {{arTabActive}} -- AR<br><br>
        {{adTabActive}} -- AD -->

        <fn1-tabs>
          <fn1-tab v-if="existingARMatches.length >= 1"
                   :name="`Account Requests (${existingARMatches.length})`"
                   :selected="arTabActive">
            <template v-for="r, i in existingARMatches">
              <div class="acct-req-row">
                <div class="wrapper">
                  <div class="profile-image" v-if="r.cropped_image">
                    <img :src="r.cropped_image" :alt="r.first_name + ' ' + r.last_name">
                  </div>

                  <div class="avatar" v-if="!r.cropped_image">
                    {{ userInitial(r.first_name) }}{{ userInitial(r.last_name) }}
                  </div>


                  <div class="account-fields">
                    <h4>
                      <template v-if="r.first_name">
                        {{r.first_name}}
                      </template>

                      <template v-if="r.nickname">
                        ({{r.nickname}})
                      </template>

                      <template v-if="r.middle_name">
                        {{r.middle_name}}
                      </template>

                      <template v-if="r.last_name">
                        {{r.last_name}}
                      </template>

                      <template v-if="r.suffix">
                        {{r.suffix}}
                      </template>

                      <fn1-badge :class="r.request_status">
                        {{r.request_status}}
                      </fn1-badge>

                      <fn1-button v-if="r.request_status != 'pending'"
                                  @click.native="goToProfile(r.id)">
                        view
                      </fn1-button>
                    </h4>

                    <div class="first">
                      <div v-if="r.facility">
                        <h5>Facility</h5>
                        <p>{{r.facility}}</p>
                      </div>

                      <div v-if="r.department">
                        <h5>Department</h5>
                        <p>{{r.department}}</p>
                      </div>

                      <div v-if="r.group">
                        <h5>Group</h5>
                        <p>{{r.group}}</p>
                      </div>

                      <div v-if="r.job">
                        <h5>Job</h5>
                        <p>{{r.job}}</p>
                      </div>
                    </div>

                    <div>
                      <div v-if="r.supervisor">
                        <h5>Supervisor</h5>
                        <p>{{r.supervisor}}</p>
                      </div>

                      <div v-if="r.supervisor_phone">
                        <h5>Supervisor Phone</h5>
                        <p>{{r.supervisor_phone}}</p>
                      </div>

                      <div v-if="r.employee_phone">
                        <h5>Employee Phone</h5>
                        <p>{{r.employee_phone}}</p>
                      </div>

                      <div v-if="r.clock_entry_only">
                        <h5>Clock Entry Only</h5>
                        <p>{{r.clock_entry_only}}</p>
                      </div>

                      <div v-if="r.employee_status">
                        <h5>Employee Status</h5>
                        <p>{{r.employee_status}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </fn1-tab>

          <fn1-tab v-if="existingADMatches.length >= 1"
                   :name="`Active Directory (${existingADMatches.length})`"
                   :selected="adTabActive">
            <template v-for="r, i in existingADMatches">
              <div class="acct-req-row">
                <div class="wrapper">

                  <div class="avatar">
                    {{ userInitial(r.givenName) }}{{ userInitial(r.sn) }}
                  </div>


                  <div class="account-fields">
                    <h4>
                      <template v-if="r.givenName">
                        {{r.givenName}}
                      </template>

                      <template v-if="r.sn">
                        {{r.sn}}
                      </template>

                      <fn1-badge :class="[{
                          'enabled': r.enabled === true,
                          'disabled': r.enabled === false}]">
                        <template v-if="r.enabled">enabled</template>
                        <template v-if="!r.enabled">disabled</template>
                      </fn1-badge>

                      <fn1-button @click.native="goToProfile(r.id)">
                        view
                      </fn1-button>
                    </h4>

                    <div class="first">
                      <div v-if="r.physicalDeliveryOfficeName">
                        <h5>Facility</h5>
                        <p>{{r.physicalDeliveryOfficeName}}</p>
                      </div>

                      <div v-if="r.department">
                        <h5>Department</h5>
                        <p>{{r.department}}</p>
                      </div>

                      <div v-if="r.title">
                        <h5>Job</h5>
                        <p>{{r.title}}</p>
                      </div>

                      <div v-if="r.telephoneNumber">
                        <h5>Telephone</h5>
                        <p>{{r.telephoneNumber}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </fn1-tab>
        </fn1-tabs>
      </div>

      <fn1-button slot="footer"
                  title="Close"
                  @click.native="continueAR()">
        Continue (none of these match)
      </fn1-button>

      <fn1-button slot="footer"
                  title="Close"
                  @click.native="cancelModal('existingUserModal')">
        Close
      </fn1-button>
    </exampleModal>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import {
  mapFields }          from 'vuex-map-fields'

import exampleModal    from '~/components/exampleModal'
import mockAD          from 'static/json/mock-AD.json'

export default {
  props: ['stepActive','stepComplete','previousButton','nextButton'],
  components: {
    exampleModal
  },
  data() {
    return {
      errorIndex: null,
      disabled: true,
      mockADData:   mockAD,
      existingADMatches: [],
      existingARMatches: [],
      stepErrorsMessages:   {
        one: {
          firstName: 'First Name is required.',
          lastName:  'Last Name is required.'
        },
        two: {
          facility:   'Facility is required.',
          department: 'Department is required.',
          group:      'Group is required.',
          job:        'Job is required.',
          startDate:  'Start Date is required.'
        },
        three: {
          supervisor:      'Supervisor is required.',
          supervisorPhone: 'Supervisor Phone is required.',
          employeePhone:   'Employee Phone is required.'
        }
      }
    }
  },
  updated() {
  },
  computed: {
    ...mapFields([
      'paths',
      'createUser',
      'createUser.stepErrors',
      'createUser.stepErrors.one.firstName',
      'createUser.totalSteps',
      'createUser.name.first',
      'createUser.name.last',
      'createUser.facility',
      'createUser.department',
      'acctReqs.accountRequests'
    ]),
    showPreviousBtn() {
      return (this.stepActive != 1 &&
              this.stepActive <= this.totalSteps) ||
              this.stepActive == `/create/finished`
    },
    showNextBtn() {
      return this.stepActive <= this.totalSteps &&
             this.stepActive != `/create/finished`
    },
    adTabActive() {
      if(this.existingARMatches.length == 0) {
        return true
      } else {
        return false
      }
    },
    arTabActive() {
      if(this.existingARMatches.length >= 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    checkMatchingEntries() {
      if(this.stepActive === 1){
        let userCreationFirstName = this.first,
            userCreationLastName  = this.last,
            masterAR = [...this.accountRequests.approved,...this.accountRequests.active,...this.accountRequests.denied,...this.accountRequests.inProgress,...this.accountRequests.inactive,...this.accountRequests.pending];

        this.existingARMatches = masterAR.filter((entry) => {
          return entry.first_name.toLowerCase() === userCreationFirstName.toLowerCase() &&
          entry.last_name.toLowerCase() === userCreationLastName.toLowerCase();
        })
        .sort((a, b) => new Date(b.requested) - new Date(a.requested));

        this.existingADMatches = this.mockADData.filter((entry) => {
          return entry.givenName.toLowerCase() === userCreationFirstName.toLowerCase() &&
          entry.sn.toLowerCase() === userCreationLastName.toLowerCase();
        })
        // .sort((a, b) => new Date(b.requested) - new Date(a.requested));

        if(this.existingARMatches != 0 ||
           this.existingADMatches != 0){
          this.arTabActive;
          this.adTabActive;
          this.$refs.existingUserModal.showModal = true;
        } else {
          this.$router.push(`/create/two`)
        }
      }
    },
    validateStepOne(index) {
      let stepOneFields = {
        firstName:  this.createUser.name.first,
        lastName:   this.createUser.name.last
      }

      const errors = [];
      for (var [key, value] of Object.entries(stepOneFields)) {
        if(!value) {

          errors.push({
            [key]: `${key} is required`
          })
        }
      }

      if(errors.length) {
        this.errorIndex = index;
        this.$store
        .dispatch('createUser/stepOneErrors',
                 { showErrorAlert: true,
                   stepComplete:   false,
                   errors});
      } else {
        this.errorIndex = null;
        this.$store
        .dispatch('createUser/stepOneErrors',
                 { showErrorAlert: false,
                   stepComplete:   true,
                   errors});
        return true
      }
    },
    validateStepTwo(index) {
      let stepTwoFields = {
        facility:   this.createUser.facility,
        department: this.createUser.department.id,
        group:      this.createUser.group.id,
        job:        this.createUser.job.id,
        startDate:  this.createUser.startDate
      }

      const errors = [];
      for (var [key, value] of Object.entries(stepTwoFields)) {
        if(!value) {

          errors.push({
            [key]: `${key} is required`
          })
        }
      }

      if(errors.length) {
        this.errorIndex = index;
        this.$store
        .dispatch('createUser/stepTwoErrors',
                 { showErrorAlert: true,
                   stepComplete:   false,
                   errors});
      } else {
        this.errorIndex = null;
        this.$store
        .dispatch('createUser/stepTwoErrors',
                 { showErrorAlert: false,
                   stepComplete:   true,
                   errors});
        return true
      }
    },
    validateStepThree(index) {
      let stepThreeFields = {
        supervisor:      this.createUser.supervisor,
        supervisorPhone: this.createUser.supervisorPhone,
        employeePhone:   this.createUser.employeePhone
      }

      const errors = [];
      for (var [key, value] of Object.entries(stepThreeFields)) {
        if(!value) {

          errors.push({
            [key]: `${key} is required`
          })
        }
      }

      if(errors.length) {
        this.errorIndex = index;
        this.$store
        .dispatch('createUser/stepThreeErrors',
                 { showErrorAlert: true,
                   stepComplete:   false,
                   errors});
      } else {
        this.errorIndex = null;
        this.$store
        .dispatch('createUser/stepThreeErrors',
                 { showErrorAlert: false,
                   stepComplete:   true,
                   errors});
        return true
      }
    },
    goToStep(index) {
      switch (index) {
        case 0:
          this.$router.push(`./`);
          break;
        case 1:
          if(!this.validateStepOne(index)) {
            break
          } else {
            if(this.stepActive == 1){
              this.checkMatchingEntries();
            } else {
              this.$router.push(`/create/two`);
            }
            break;
          }
        case 2:
          if(!this.validateStepTwo(index)) {
            break;
          } else {
            this.$router.push(`/create/three`);
            break;
          }
        case 3:
          if(!this.validateStepThree(index)) {
            break;
          } else {
            this.$router.push(`/create/four`);
            break;
          }
        case 4:
          this.$router.push(`/create/five`)
          break;
        case 5:
          this.$router.push(`/create/six`)
          break;
        default:
          break;
      }
    },
    finishedStep(step) {
      switch(step) {
        case 1:
          if(this.stepErrors.one.stepComplete)
            return true
        case 2:
          if(this.stepErrors.two.stepComplete)
            return true;
        case 3:
          if(this.stepErrors.three.stepComplete)
            return true;
        case 4:
          if(this.stepActive > step ||
             this.stepActive == 'finished') {
            return true;
          }
        case 5:
          if(this.stepActive > step ||
             this.stepActive == 'finished') {
            return true;
          }
        case 6:
          if(this.stepActive > step ||
             this.stepActive == 'finished') {
            return true;
          }
        default:
          break;
      }
    },
    goToProfile(id) {
      this.$router.push(this.paths.accounts + id);
    },
    continueAR() {
      this.$router.push(`/create/two`)
    },
    cancelModal(modalRef) {
      if(modalRef === 'formResetModal')
        this.$refs.formResetModal.showModal = false;
      if(modalRef === 'existingUserModal')
        this.$refs.existingUserModal.showModal = false;
        // this.$router.push(`./`)
    },
  },
}
</script>

<style lang="scss">
  .step-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 0 40px 0;
    padding: 0 0 20px 0;
    border-bottom: 1px solid lighten($text-color, 50%);
  }

  .button-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    padding: 0;

    div {
      .button,
      button {
        padding: 0;
        margin-right: 20px !important;
        background-color: transparent;
        color: lighten($text-color, 20%);

        &:hover {
          background-color: transparent !important;
          color: $text-color !important;
        }
      }
    }

    .button,
    button {
      padding: 10px 20px;
      background-color: $color-green;

      &:last-of-type {
        margin-right: 0;

        &:hover {
          background-color: darken($color-green, 5%);
        }
      }

      &.previous {
        background-color: lighten($text-color, 20%);

        &:hover {
          background-color: lighten($text-color, 10%);
        }
      }

      &.reset-form {
        padding: 0;
        margin: 0 20px 0 0;
        background-color: transparent;
        color: lighten($text-color, 20%);

        &:hover {
          background-color: transparent;
          color: $text-color;
        }
      }
    }
  }

  .tabs-group {
    flex: 1;

    .tabs {
      ul {
        li {
          position: relative;
          color: $text-color;
          font-size: 18px;
          line-height: 18px;
          border-bottom: 1px solid transparent;
        }
      }
    }

    .tab-content {
      margin: 20px 0 0 0;
      padding: 0;
    }
  }

  .existingUserModal {
    .modal-wrapper {
      .modal-container {
        position: absolute;
        top: 100px;
        width: 975px;
        max-width: 975px;

        hr {
          border-bottom: 1px solid lighten($text-color, 50%);
          margin: 0 0 20px 0;
        }

        .modal-body {
          position: relative;
          max-height: 650px;
          height: 650px;
          background-color: lighten($text-color, 68%);

          .tabs-group {
            width: 945px;
            position: fixed;

            .tab-content {
              height: 500px;
              overflow-y: scroll;
            }
          }

          .acct-req-row {
            display: block;
            width: 100%;
            padding: 30px 0;
            border-top: none;
            border-bottom: 1px solid lighten($text-color, 60%);
            // margin: 15px 0;

            &:first-of-type {
              padding: 15px 0 30px 0;
            }

            &:last-of-type {
              border-bottom: none;
              margin: 0;
              padding: 0;
            }

            &:hover {
              background-color: lighten($text-color, 67%);
              // .wrapper {
              //   .account-fields {
              //     background-color: lighten($text-color, 67%);
              //   }
              // }
            }

            .wrapper {
              display: flex;
              flex-wrap: wrap;
              width: 100%;

              .avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                background-color: lighten($color-blue, 45%);
                width: 75px;
                height: 75px;
                border-radius: 50%;
              }

              .profile-image {
                margin: 0;
                width: 75px;
                height: 75px;

                img {
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }

              .account-fields {
                background-color: lighten($color-grey, 15%);
                border-radius: $radius-default;
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
                width: calc(100% - 105px);
                margin-left: auto;

                h4 {
                  margin: 0 0 15px 0;
                  padding: 0 0 10px 0;
                  display: flex;
                  align-items: center;
                  border-bottom: 1px solid #ddd;

                  span {
                    margin: 0 0 0 10px;
                  }

                  button {
                    margin-left: auto;
                    background-color: $color-green;

                    &:hover {
                      background-color: darken($color-green, 5%);
                    }
                  }
                }

                h5 {
                  color: $text-color;
                  font-size: 18px;
                  margin: 0 0 2px 0;
                  font-weight: 600;
                }

                .field-group {
                  width: 100%;
                }

                div {
                  display: flex;
                  flex-wrap: wrap;
                  flex-basis: 100%;

                  &.first {
                    margin: 0 0 10px 0;
                  }

                  > div {
                    flex-basis: 25%;
                  }
                }
              }
            }
          }
        }

        .modal-footer {
        .button,
          button {
            &:first-child {
              background-color: $color-green;
              margin-right: 10px !important;

              &:hover {
                color: white !important;
                background-color: darken($color-green, 5%) !important;
              }
            }

            &:last-child {
              background-color: $color-orange-darker !important;

              &:hover {
                color: white !important;
                background-color: darken($color-orange-darker, 5%) !important;
              }
            }
          }
        }
      }
    }
  }

  .progress-stepper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    line-height: 25px;

    h3 {
      width: auto;
      margin-right: 95px;
      font-style: italic;
      color: $text-color;
    }

    .step-outside {
      cursor: pointer;
      position: relative;
      background: $color-blue;
      color: white;
      margin: 0 0 0 $size-xl;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      font-size: $size-xl;
      line-height: 45px;
      text-align: center;

      .step-inside {
        width: 45px;
        height: 45px;
      }

      &.active {
        background: $color-green;

        &:before {
          position: absolute;
          content: '';
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 2px solid $color-green;
          left: -5px;
          top: -5px;
          z-index: 10;
        }
      }

      &.error {
        background: $color-vermilion-light;

        &:before {
          border-color: $color-vermilion-light;
        }
      }

      &.complete {
        color: white;
        background: $color-green;

        span {
          display: none;
        }

        &:after {
          background: $color-green;
        }
      }

      &:first-of-type {
        margin: 0;
      }

      &:last-of-type {
        &:after {
          display: none;
        }
      }

      &.disabled {
        cursor: not-allowed;

        .step-inside {
          pointer-events: none;
        }
      }

      &:after {
        position: absolute;
        content: '';
        width: 30px;
        height: 4px;
        right: -30px;
        background: $color-blue;
        display: block;
        top: 50%;
        transform: translateY(-50%);
      }

      svg {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 25px;
        height: 25px;
        display: block;
        fill: white;
      }
    }
  }
</style>