<template>
  <aside>


    <template v-if="asideHeader">
      <h1><strong>Finished :</strong> {{asideHeader}}</h1>
    </template>

    <template v-if="!asideHeader">
      <h1>Overview</h1>
    </template>

    <p v-if="!first">Details of the <strong>User Creation Wizard</strong> will appear here as they become available.</p>


    <div class="wrapper" v-if="!first">
      <fn1-button>Batch user creation</fn1-button>
    </div>


    <ul>
      <li class="step-title" v-if="first">Step One</li>
      <li v-if="first">
        <strong>Name:</strong>
        <span v-html="first"></span>
        <span v-html="middle"></span>
        <span v-html="last"></span><!--
        --><span v-if="(suffix)">, {{suffix}}</span>
      </li>

      <li v-if="startDate">
        <strong>Start Date: </strong>
        <span v-html="dateFormatted"></span>
      </li>

      <li v-if="department">
        <strong>Dept.: </strong>
        <span v-html="department"></span>
      </li>

      <li v-if="status">
        <strong>Status: </strong>
        <span v-html="status"></span>
      </li>

      <li class="step-title" v-if="facility">Step Two</li>

      <li v-if="facility">
        <strong>Facility: </strong>
        <span v-html="facility"></span>
      </li>

      <li v-if="division">
        <strong>Division: </strong>
        <span v-html="division"></span>
      </li>

      <li v-if="job">
        <strong>Job: </strong>
        <span v-html="job"></span>
      </li>

      <li class="step-title" v-if="supervisor">Step Three</li>
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

      <li class="step-title" v-if="userSoftware.length">Step Four</li>
      <li v-if="userSoftware.length">
        <strong>Software: </strong>
        <span v-for="(item, index) in userSoftware">
          <span><template v-if="index >= 1">, </template>{{item}}</span>
        </span>
      </li>

      <li class="step-title" v-if="userComputer">Step Five</li>
      <li v-if="userComputer">
        <strong>Computer: </strong>
        <span v-html="userComputer"></span>
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
import { mapFields }  from 'vuex-map-fields';

import moment         from 'moment'

export default {
  props: ['stepActive','asideHeader'],
  data() {
    return {
      startDateFormatted: this.dateFormatted,
    }
  },
  computed: {
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

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.startDate',
      'createUser.department',
      'createUser.status',

      'createUser.facility',
      'createUser.division',
      'createUser.job',

      'createUser.supervisor',
      'createUser.supervisorPhone',
      'createUser.employeePhone',

      'createUser.userSoftware',

      'createUser.userComputer'
    ])
  }
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    color: $text-color;
    width: 275px;
    // background-color: lighten($color-grey, 5%);

    // h1 {
    //   color: $text-color;
    //   border-bottom: 1px solid lighten($text-color, 40%);
    //   margin: 0 0 10px 0;
    //   padding: 0 0 10px 0;
    // }

    h1 {
      color: $text-color;
      font-size: $size-l;
      // font-weight: $weight-semi-bold;
      line-height: $size-l;
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