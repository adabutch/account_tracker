<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Five:</strong> Extra information</h1>

          <div class="form-group">
            <fieldset>
              <legend>Choose a computer</legend>
              <div v-for="(item, index) in computerTypes">
                <input v-model="userComputer"
                       :key="index"
                       :id="item.value"
                       :value="item.value"
                       type="radio"
                       name="software">

                <label v-if="item.text"
                       :for="item.value"
                       v-html="item.text"></label>
              </div>
            </fieldset>
          </div>

          <nuxt-link class="button previous"
                     :to="{ name: 'four'}">Previous</nuxt-link>

          <nuxt-link v-if="stepActive < totalSteps"
                     class="button"
                     :to="{ name: 'six'}">Next</nuxt-link>

          <nuxt-link v-if="stepActive == totalSteps"
                     class="button"
                     :to="{ name: 'finish'}">Finish</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';

import headerComponent from '~/components/headerComponent.vue'
import progressStepper from '~/components/progressStepper.vue'
import asideComponent   from '~/components/asideComponent.vue'
import exampleCheckbox from '~/components/exampleCheckbox.vue'

export default {
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleCheckbox
  },
  data() {
    return {
      stepActive: 5,
      computerTypes: [
        { text: 'Apple iMac',          value: 'Apple iMac' },
        { text: 'Apple Macbook Pro',     value: 'Apple Macbook Pro' },
        { text: 'Windows Laptop',            value: 'Windows Laptop' },
        { text: 'Windows Desktop',        value: 'Windows Desktop' }
      ],
    }
  },
  mounted() {
  },
  methods: {},
  computed: {
    selectedSoftwareNames() {
      console.log(this.stepActive)
    },
    ...mapFields([
      'totalSteps',
      'createUser.userComputer'
    ]),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  div {
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
      // background-color: red;
    }
  }

  /deep/ fieldset {
    /deep/ legend {
      color: $text-color;
      font-size: 18px;
    }

    input {
      &[type="checkbox"],
      &[type="radio"] {
        color: $text-color;
        margin: 0 5px 0 0;
      }
    }

    label {
      width: auto;
      color: $text-color;
      font-size: $size-m;
      margin: 0 !important;
    }
  }
</style>