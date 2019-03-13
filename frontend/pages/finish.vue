<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <div class="success-wrapper">
          <h1 v-if="showSuccessMsg" v-html="successMsg"></h1>
        </div>

        <fn1-alert variant="danger" v-if="errorMsg.length">
          <template v-for="e, i in errorMsg">
            <p>{{e}}</p>
          </template>
        </fn1-alert>

        <asideComponent v-if="!showSuccessMsg"
                        :step-active="stepActive"
                        :aside-header="asideHeader" />

          <nav>
            <nuxt-link v-if="showSuccessMsg"
                       class="button"
                       :to="{ name: 'index'}">Return Home</nuxt-link>

            <div v-if="!showSuccessMsg">
              <button class="button"
                      @click="accountRequestSubmit">Create User</button>

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

import headerComponent from '~/components/headerComponent'
import progressStepper from '~/components/progressStepper'
import asideComponent  from '~/components/asideComponent'
import exampleCheckbox from '~/components/exampleCheckbox'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent
  },
  data() {
    return {
      testImg:     'butcherad.jpg',
      responseMsg: "",
      showSuccessMsg: false,
      successMsg: "<strong>Thanks</strong>, we've got your request!",
      errorMsg: [],
      stepActive: 6,
      asideHeader: "Review & Create",
      imageID:      "",
    }
  },
  mounted() {
    // this.base64Strip();
  },
  computed: {
    dateFormatted() {
      let formatted = moment(this.startDate)
                      .format('YYYY-MM-DD');
      return formatted;
    },
    ...mapFields([
      'data',
      'totalSteps',
      'startDateFormat',
      'authUser',

      'createUser.image.full',
      'createUser.image.cropped',

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.name.nickname',
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

      'createUser.selectedServiceRequestIds',

      'createUser.extraQuestionAnswers',
    ])
  },
  methods: {
    ...mapActions([
      'createUser.clearUser'
    ]),
    base64Strip() {
      this.full = this.full.replace(/^data:image\/[a-z]+;base64,/, "");
      this.cropped = this.cropped.replace(/^data:image\/[a-z]+;base64,/, "");
    },
    dataURItoBlob(dataURI) {
      if(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
        else
          byteString = unescape(dataURI.split(',')[1]);

        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
      }
    },
    accountRequestSubmit() {
      let blobFull = this.dataURItoBlob(this.full);
      let blobCropped = this.dataURItoBlob(this.cropped);
      let firstLast = `${this.first}-${this.last}`;
      let flToLower = firstLast.toLowerCase();

      let fD = new FormData();
      fD.append(`full_image`, blobFull, `${flToLower}-full`);
      fD.append(`cropped_image`, blobCropped, `${flToLower}-cropped`);
      fD.append(`first_name`, this.first);
      fD.append(`middle_name`, this.middle);
      fD.append(`last_name`, this.last);
      fD.append(`suffix`, this.suffix);
      fD.append(`nickname`, this.nickname);
      fD.append(`employee_phone`, this.employeePhone);
      fD.append(`supervisor`, this.supervisor);
      fD.append(`supervisor_phone`, this.supervisorPhone);
      fD.append(`department`, this.department.name);
      fD.append(`division`, this.division);
      fD.append(`group`, this.group.name);
      fD.append(`facility`, this.facility);
      fD.append(`job`, this.job.name);
      fD.append(`employee_status`, this.job.salaryGroup);
      fD.append(`clock_entry_only`, this.job.clockInRequired);
      fD.append(`start_date`, this.dateFormatted);
      fD.append(`request_status`, `new`);
      fD.append(`requester`, this.authUser.id);
      fD.append(`requested_services`, this.selectedServiceRequestIds);
      fD.append(`dynamic_options`, JSON.stringify(this.extraQuestionAnswers));

      this.$axios
      .post(`${process.env.api}${process.env.accountRequest}`,fD)
      .then((response) => {
        console.log(response.data);
        this.showSuccessMsg = true;
        this.$store.dispatch('createUser/resetState');
      })
      .catch((e) => {
        this.errorMsg.push(e.response.data.errors)
        console.log(e.response.data.errors)
      });
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