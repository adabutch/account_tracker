<template>
  <div>
    <headerComponent />
    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />
      <div>
        <asideComponent />
        <form>
          <!-- <h1>{{ setMonth }} - {{ setYear }}</h1>
          <h1>{{ getDaysInMonth(setMonth, setYear) }}</h1>
          <h1>{{ getAllDays(setMonth, setYear) }}</h1> -->
          <!-- <h1>{{ testing() }}</h1> -->

          <h1>
            <strong>Step One:</strong>&nbsp; User information
          </h1>

          <div class="fields-wrapper">
            <fn1-input v-model="first"
                     label="First Name *"
                     placeholder="First name"
                     name="first-name"
                     id="first-name" />

            <fn1-input v-model="middle"
                       label="Middle Name"
                       placeholder="Middle name"
                       name="middle-name"
                       id="middle-name" />

            <fn1-input v-model="last"
                       label="Last Name *"
                       placeholder="Last name"
                       name="last-name"
                       id="last-name" />

            <fn1-input v-model="nickname"
                       label="Nickname"
                       placeholder="Nickname"
                       name="nickname"
                       id="nickname" />

            <exampleSelect v-model="suffix"
                          label="Suffix"
                          name="suffix"
                          id="suffix"
                          :options="suffixOptions" />
          </div>



          <!-- <fn1-modal title="Clear/Reset Form"
                     launchButtonText="reset form">
            <p slot="body">This will clear all form values. Are you sure?</p>
            <fn1-button slot="footerBtnConfirm"
                        @click.native="resetForm"
                        class="reset-form">I Understand</fn1-button>
          </fn1-modal> -->

          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset form</button>

            <nuxt-link class="button"
                       :to="{ name: 'two'}">Next</nuxt-link>
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
import {
  createHelpers }       from 'vuex-map-fields'

import axios            from 'axios'

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'


const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect
  },
  mounted() {},
  data() {
    return {
      stepActive: 1,
      suffixOptions: [
        { value: 'Jr.', text: 'Jr.' },
        { value: 'Sr.', text: 'Sr.' },
        { value: '2nd', text: '2nd' },
        { value: '3rd', text: '3rd' },
        { value: 'II',  text: 'II' },
        { value: 'III', text: 'III' },
        { value: 'IV',  text: 'IV' },
        { value: 'V',   text: 'V' },
        { value: 'VI',  text: 'VI' }
      ]
    }
  },
  watch: {},
  methods: {},
  computed: {
    ...mapFields([
      'totalSteps',
      'endpoints',

      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.name.nickname',

      'createUser.department',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .fields-wrapper {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    // background-color: red;

    &:first-of-type {
      .field-group {
        // flex-grow: 1;
        // width: calc(100% * (1/4) - 40px);
        // margin-right: 20px;
        // background-color: purple;

        &:last-of-type {
          // background-color: green;
          margin: 0;

          /deep/ label {
            margin-bottom: 0;
            // background-color: pink;
          }
        }
      }
    }

    &:nth-of-type(2) {
      // background-color: teal;
      width: 492px;
    }
  }
</style>