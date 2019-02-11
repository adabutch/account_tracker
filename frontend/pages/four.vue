<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Four:</strong> Software information</h1>

          <div class="form-group">
            <fieldset>
              <legend>Choose software</legend>
              <div v-for="(item, index) in softwareData">
                <input v-model="userSoftware"
                       :key="index"
                       :id="item.value"
                       :value="item.value"
                       type="checkbox"
                       name="software">

                <label v-if="item.text"
                       :for="item.value"
                       v-html="item.text"></label>
              </div>
            </fieldset>
          </div>

          <!-- <exampleCheckbox v-model="userSoftware"
                        legend="Software selection"
                        name="software"
                        :options="[
                          { text: 'Gmail',          value: 'Gmail' },
                          { text: 'Time Track',     value: 'Time Track' },
                          { text: 'GIS',            value: 'GIS' },
                          { text: 'uReport',        value: 'uReport' }
                        ]" /> -->

          <nuxt-link class="button previous"
                     :to="{ name: 'three'}">Previous</nuxt-link>

          <nuxt-link v-if="stepActive < totalSteps"
                     class="button"
                     :to="{ name: 'five'}">Next</nuxt-link>

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
      softwareData: [
        { text: 'Gmail',          value: 'Gmail' },
        { text: 'Time Track',     value: 'Time Track' },
        { text: 'GIS',            value: 'GIS' },
        { text: 'uReport',        value: 'uReport' }
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
      'createUser.userSoftware'
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
      &[type="checkbox"] {
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