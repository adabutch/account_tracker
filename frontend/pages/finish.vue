<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <div class="success-wrapper">
          <h1 v-if="showSuccessMsg" v-html="successMsg"></h1>
        </div>

        <asideComponent v-if="!showSuccessMsg"
                        :step-active="stepActive"
                        :aside-header="asideHeader" />

          <nav>
            <nuxt-link v-if="showSuccessMsg"
                       class="button"
                       :to="{ name: 'index'}">Return Home</nuxt-link>

            <div v-if="!showSuccessMsg">
              <button class="button"
                      @click="createUserSubmit">Create User</button>

              <nuxt-link class="button cancel"
                         :to="{ name: 'index'}">back to last step, </nuxt-link>

              <nuxt-link class="button cancel"
                         :to="{ name: 'index'}">or cancel</nuxt-link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import { mapFields }   from 'vuex-map-fields'
import moment          from 'moment'

import headerComponent from '~/components/headerComponent.vue'
import progressStepper from '~/components/progressStepper.vue'
import asideComponent  from '~/components/asideComponent.vue'
import exampleCheckbox from '~/components/exampleCheckbox.vue'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent
  },
  data() {
    return {
      responseMsg: "",
      showSuccessMsg: false,
      successMsg: "<strong>Thanks</strong>, we've got your request!",
      errorMsg: [],
      stepActive: 6,
      asideHeader: "Review & Create"
    }
  },
  mounted() {},
  computed: {
    dateFormatted() {
      let formatted = moment(this.startDate)
                      .format('YYYY-MM-DD');
      return formatted;
    },
    ...mapFields([
      'endpoints',
      'data',
      'totalSteps',
      'startDateFormat',

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.startDate',
      'createUser.department',
      'createUser.status',

      'createUser.facility',
      'createUser.division',
      'createUser.group',
      'createUser.job',

      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone',

      'createUser.userSoftware',

      'createUser.userComputer'
    ])
  },
  methods: {
    ...mapActions([
      'createUser.clearUser'
    ]),
    createUserSubmit() {
      this.$axios.post(`${this.endpoints.baseUrl}account-request/`,{
        "first_name":        this.first,
        "middle_name":       this.middle,
        "last_name":         this.last,
        "suffix":            this.suffix,
        "employee_phone":    this.employeePhone,
        "supervisor":        this.supervisor,
        "supervisor_phone":  this.supervisorPhone,
        "department":        this.department.name,
        "division":          this.division,
        "group":             this.group.name,
        "facility":          this.facility,
        "job":               this.job.name,
        "employee_status":   this.status,
        "start_date":        this.dateFormatted,
        "request_status":    "ready"
      })
      .then(response => {
        this.responseMsg = response.data
        this.showSuccessMsg = true;
        this.$store.dispatch('createUser/resetState');
      })
      .catch(e => {
        this.errorMsg.push(e)
        console.log(e)
      })
    },
    clearStore() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  h1 {
    color: $text-color;
    font-size: $size-l;
    line-height: $size-l;
    margin: 0 0 $space-m 0;
    padding: 0 0 $space-s 0;
    border-bottom: 1px solid lighten($text-color, 50%);
  }

  aside {
    width: 500px;
    margin: 0 auto;
    display: block;

    /deep/ .step-title {
      display: none;
    }

    ul {
      li {
        font-size: 18px;
        margin: 0 0 20px 0;

        strong {
          margin: 0;
        }
      }
    }
  }

  nav {
    width: 500px;
    margin: 0 auto;
    display: block;
    text-align: center;

    .button {
      display: block;
      margin: 40px auto 0 auto;
      width: 350px;
      text-align: center;
      font-size: 18px;
      text-transform: uppercase;

      &:hover {
        background-color: darken($color-green, 5%);
      }

      &.cancel {
        display: inline-block;
        width: auto;
        background-color: transparent;
        text-transform: none;
        font-size: $size-s;
        color: $text-color;
        margin: 10px auto 0 auto;
        padding: 0;

        &:nth-of-type(3) {
          color: lighten($text-color, 15%);
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .success-wrapper {
    width: 500px;
    margin: 0 auto;
    display: block;

    h1 {
      line-height: $size-xl;
    }
  }

</style>