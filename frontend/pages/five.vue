<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Five:&nbsp;</strong>Extra information</h1>

          {{extraDeptQuestions.questions}}

          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset</button>

            <nuxt-link class="button previous"
                       :to="{ name: 'four'}">Previous</nuxt-link>

            <nuxt-link v-if="stepActive < totalSteps"
                       class="button"
                       :to="{ name: 'six'}">Next</nuxt-link>

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
      stepActive: 5,
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
      'createUser.extraDeptQuestions',
      'createUser.extraGroupOptions'
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