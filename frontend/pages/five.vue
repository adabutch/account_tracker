<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Five:&nbsp;</strong>Extra information</h1>

          <h4>Dept.</h4>
          Joined Answers<br>
          {{joinedDeptAnswers}}<br><br>

          Joined here<br><br>
          <template v-for="ex, index in joinedDeptAnswers">
            {{index}} :: {{ex}}<br>--<br>
          </template>

          Testing here<br><br>
          <template v-for="ex, index in testing">
            {{index}} :: {{ex}}<br>--<br>
          </template>

          <template v-for="(question, index) in exDeptQuestions">
            <template v-if="question.type == 'select'">
              <h1>Select Types</h1>
              <div class="field-group">
                <label :for="question">{{question.text}}</label>
                <select v-model="exQsSelects[question.text]"
                        :name="question"
                        :id="question"
                        type="select">
                  <option>---</option>
                  <option v-for="(value, index) in question.value"
                          :value="value">
                    {{ value }}
                  </option>
                </select>
              </div>
            </template>

            <template v-if="question.type == 'text'">
              <h1>Text Types</h1>
              <fn1-input v-model="exQsTexts[question.text]"
                         :key="index"
                         :label="question.text"
                         :placeholder="question.text"
                         :name="question.text"
                         :id="question.text" />
            </template>

            <template v-if="question.type == 'number'">
              <h1>Number Types</h1>
              <fn1-input type="number"
                         v-model="exQsNumbers[question.text]"
                         :label="question.text"
                         :placeholder="question.text"
                         :name="question.text"
                         :id="question.text" />
            </template>

            <template v-if="question.type == 'textarea'">
              <h1>Textarea Types</h1>
              <div class="field-group">
                <label :for="question.text">{{question.text}}</label>
                <textarea type="textarea"
                          v-model="exQsTextareas[question.text]"
                          :id="question.text"
                          :name="question.text"
                          :placeholder="question.text"></textarea>
              </div>
            </template>
          </template>

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

import headerComponent from '~/components/headerComponent'
import progressStepper from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'

export default {
  middleware: 'authenticated',
  // props: ['question'],
  components: {
    headerComponent,
    progressStepper,
    asideComponent
  },
  data() {
    return {
      stepActive: 5,

      exQsSelects:    {},
      exQsTexts:      {},
      exQsTextareas:  {},
      exQsNumbers:    {},

      extraQuestionAnswers: this.joinedDeptAnswers,

      testing: [ 'What is your eye color?: "brown"',
  'What is color is your favorite?: "brown"',
  'What is your waist size?: "34"',
  'What is your favorite restaurant?: "Chipotle"',
  'Tell us about yourself:: "ABout me ..."',
  'What is your weight?: "170"',
  'Your lucky number?: "7"' ]
    }
  },
  mounted() {},
  methods: {},
  computed: {
    exDeptQuestions() {
      return JSON.parse(this.extraDeptQuestions.questions);
    },
    joinedDeptAnswers() {
      // return this.extraDeptQuestionAnswers = {
      //         ...this.exQsSelects,
      //         ...this.exQsTexts,
      //         ...this.exQsTextareas,
      //         ...this.exQsNumbers
      //        }
      let joinedDeptAnswers = {
              ...this.exQsSelects,
              ...this.exQsTexts,
              ...this.exQsTextareas,
              ...this.exQsNumbers
             }

      var res = Object.keys(joinedDeptAnswers)
        .map(function(key) {
          return `${key}: ${JSON.stringify(joinedDeptAnswers[key])}`;
        });

      return this.extraDeptQuestionAnswers = res;
    },
    ...mapFields([
      'createUser.totalSteps',
      'createUser.extraDeptQuestions',
      'createUser.extraDeptQuestionAnswers',
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