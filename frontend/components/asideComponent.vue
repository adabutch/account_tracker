<template>
  <aside>
    <template v-if="asideHeader">
      <h1><strong>Finished :</strong> {{asideHeader}}</h1>
    </template>

    <template v-if="!asideHeader">
      <h1>Overview</h1>
    </template>

    <p v-if="!stepOneData">Details of the <strong>User Creation Wizard</strong> will appear here as they become available.</p>


    <!-- Save button for later, when we have
         batch creation in place. -->
    <!-- <div class="wrapper" v-if="!first">
      <fn1-button>Batch user creation</fn1-button>
    </div> -->

    <ul>
      <template v-if="stepOneData">
        <li class="step-title" v-if="stepOneData">Step One</li>
        <li v-if="stepOneData">
          <strong>Name:</strong>
          <span v-html="first"></span>
          <span v-if="nickname">({{nickname}})</span>
          <span v-html="middle"></span>
          <span v-html="last"></span><!--
          --><span v-if="(suffix)">, {{suffix}}</span>
        </li>
      </template>

      <template v-if="stepTwoData">
        <li class="step-title" v-if="stepTwoData">Step Two</li>
        <li v-if="facility">
          <strong>Facility: </strong>
          <span v-html="facility"></span>
        </li>

        <li v-if="department.name">
          <strong>Dept.: </strong>
          <span v-html="department.name"></span>
        </li>

        <li v-if="group.name">
          <strong>Group: </strong>
          <span v-html="group.name"></span>
        </li>

        <li v-if="job.name">
          <strong>Job: </strong>
          <span v-html="job.name"></span>
        </li>

        <li v-if="job.salaryGroup">
          <strong>Salary Group: </strong>
          <span v-html="job.salaryGroup"></span>
        </li>

        <li v-if="job.clockInRequired">
          <strong>Clock-In Required: </strong>
          <span v-html="job.clockInRequired"></span>
        </li>

        <li v-if="status">
          <strong>Status: </strong>
          <span v-html="status"></span>
        </li>

        <li v-if="startDate">
          <strong>Start Date: </strong>
          <span v-html="dateFormatted"></span>
        </li>
      </template>

      <template v-if="stepThreeData">
        <li class="step-title" v-if="stepThreeData">Step Three</li>
        <li v-if="supervisor">
          <strong>Supervisor: </strong>
          <span v-html="supervisor"></span>
        </li>

        <li v-if="supervisorPhone">
          <strong>Supervisor Phone: </strong>
          <span v-html="supervisorPhone"></span>
        </li>

        <li v-if="employeePhone">
          <strong>Employee Phone: </strong>
          <span v-html="employeePhone"></span>
        </li>
      </template>

      <template v-if="requestedServices">
        <li class="step-title" v-if="requestedServices">Step Four</li>
        <li v-if="requestedServices">
          <strong>Requested Services: </strong>
          <span v-html="requestedServices"></span>
        </li>
      </template>

      <li v-if="asideHeader">
        <strong>Requester: </strong>
        <span v-html="authUser.username"></span>
      </li>
    </ul>
  </aside>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }        from 'vuex'
import {
  mapFields }         from 'vuex-map-fields';

import moment         from 'moment'

export default {
  props: ['stepActive', 'asideHeader'],
  data() {
    return {}
  },
  computed: {
    stepOneData() {
      if(this.first    ||
         this.nickname ||
         this.middle   ||
         this.last     ||
         this.suffix)
        return true;
    },
    stepTwoData() {
      if(this.facility      ||
         this.department.id ||
         this.group.id      ||
         this.job.id        ||
         this.startDate)
        return true;
    },
    stepThreeData() {
      if(this.supervisor      ||
         this.supervisorPhone ||
         this.employeePhone)
        return true;
    },
    customHeader() {
      if (this.asideHeader.length) {
        return true
      } else {
        return false
      }
    },
    dateFormatted() {
      let formatted = moment(this.startDate)
                      .format(this.startDateFormat);
      return formatted;
    },
    ...mapFields([
      'data',
      'totalSteps',
      'startDateFormat',
      'authUser',

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.name.nickname',

      'createUser.facility',
      'createUser.department',
      'createUser.group',
      'createUser.job',
      'createUser.startDate',


      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone',

      'createUser.requestedServices'
    ])
  },
  methods: {
    isObjEmpty(obj) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    color: $text-color;
    width: 350px;

    h1 {
      color: $text-color;
      font-size: $size-l;
      line-height: $size-l;
      font-weight: $weight-semi-bold;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    p {
      color: $text-color;
      font-size: 18px;
      font-style: italic;
      line-height: $line-height-m;
      margin: 0;
    }

    button {
      background-color: lighten($text-color, 10%);
      margin: 0 0 10px 0;

      &:last-child {
        margin: 0;
      }
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 0 0 10px 17px;
        font-weight: $weight-semi-bold;
        color: lighten($text-color, 15%);

        &.divider {
          border-bottom: 1px solid lighten($text-color, 50%);
        }

        &.step-title {
          margin: 20px 0 10px 0;
          padding: 5px 10px;
          background-color: $color-blue;
          font-size: $size-m;
          color: white;
          border-radius: $radius-default;

          &:first-of-type() {
            margin: 0 0 10px 0;
          }
        }

        strong {
          color: darken($text-color, 5%);
          margin: 0 0 2px -5px;
        }
      }
    }

    .wrapper {
      border-top: 1px solid lighten($text-color, 50%);
      margin: 20px 0 0 0;
      padding: 20px 0 0 0;
    }
  }
</style>