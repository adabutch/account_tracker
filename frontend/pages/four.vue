<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Four:</strong>&nbsp; Software information</h1>

          {{serviceProfile}}<br>- - - -<br>

          <div class="form-group"
               v-if="deptServiceProfile != undefined">
            <fieldset>
              <legend>Department Services</legend>
              <div v-for="(item, index) in deptServiceProfile.services">
                <input v-model="deptServices"
                       :key="index"
                       :id="item"
                       :value="item"
                       type="checkbox"
                       name="software">

                <label v-if="item"
                       :for="item"
                       v-html="item"></label>
              </div>
            </fieldset>
          </div>

          <div class="form-group"
               v-if="groupServiceProfile != undefined">
            <fieldset>
              <legend>Group Services</legend>
              <div v-for="(item, index) in groupServiceProfile.services">
                <input v-model="groupServices"
                       :key="index"
                       :id="item"
                       :value="item"
                       type="checkbox"
                       name="software">

                <label v-if="item"
                       :for="item"
                       v-html="item"></label>
              </div>
            </fieldset>
          </div>

          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset</button>

            <nuxt-link class="button previous"
                       :to="{ name: 'three'}">Previous</nuxt-link>

            <nuxt-link v-if="stepActive < totalSteps"
                       class="button"
                       :to="{ name: 'five'}">Next</nuxt-link>

            <nuxt-link v-if="stepActive == totalSteps"
                       class="button"
                       :to="{ name: 'finish'}">Finish</nuxt-link>
          </div>
        </form>
      </div>
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

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleCheckbox  from '~/components/exampleCheckbox'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleCheckbox
  },
  data() {
    return {
      stepActive: 4,
      deptServices: [],
      groupServices: [],
      deptServiceProfile: {},
      groupServiceProfile: {}
    }
  },
  mounted() {
    this.getServiceProfiles();
  },
  computed: {
    ...mapFields([
      'totalSteps',
      'endpoints',
      'createUser.requestedServices',
      'createUser.department',
      'createUser.group'
    ]),
    serviceProfile() {
      this.requestedServices = [...this.deptServices, ...this.groupServices]
      return this.requestedServices
    }
  },
  methods: {
    getServiceProfiles() {
      if(this.department.id) {
        this.$axios.get(`${this.endpoints.baseUrl}profile/?department_id=${this.department.id}`)
        .then((res) => {
          this.deptServiceProfile = res.data.results[0];
        })
        .catch((error) => {
          console.log(error);
        })
      }

      if(this.group.id) {
        this.$axios.get(`${this.endpoints.baseUrl}profile/?department_id=${this.department.id}&group_id=${this.group.id}`)
        .then((res) => {
          this.groupServiceProfile = res.data.results[0];
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-of-type(2):not(.form-group) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .form-group {
    display: inline-flex;
    border-right: 1px solid lighten($text-color, 50%);
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;

    &:nth-of-type(2) {
      border-right: none;
    }
  }

  fieldset {
    legend {
      font-weight: $weight-semi-bold;
      color: $text-color;
      font-size: 18px;
    }

    input {
      &[type="checkbox"] {
        color: $text-color;
        margin: 0 5px 0 0;
      }
    }

    label {
      width: auto;
      font-weight: $weight-normal;
      color: $text-color;
      font-size: $size-m;
      margin: 0 !important;
    }
  }
</style>