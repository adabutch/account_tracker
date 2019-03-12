<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />

      <div>
        <asideComponent />

        <form>
          <h1><strong>Step Five:&nbsp;</strong>Extra information</h1>

          <div class="dept-questions" v-if="!hasDeptExQuestions">
            <h1>Dept. Questions</h1>
            <template v-for="(question, index) in exDeptQuestions">
              <template v-if="question.type == 'select'">
                <div class="field-group">
                  <label :for="question">{{question.text}}</label>
                  <select v-model="exDeptQsSelects[question.text]"
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
                <fn1-input v-model="exDeptQsTexts[question.text]"
                           :key="index"
                           :label="question.text"
                           :placeholder="question.text"
                           :name="question.text"
                           :id="question.text" />
              </template>

              <template v-if="question.type == 'number'">
                <fn1-input type="number"
                           v-model="exDeptQsNumbers[question.text]"
                           :label="question.text"
                           :placeholder="question.text"
                           :name="question.text"
                           :id="question.text" />
              </template>

              <template v-if="question.type == 'textarea'">
                <div class="field-group">
                  <label :for="question.text">{{question.text}}</label>
                  <textarea type="textarea"
                            v-model="exDeptQsTextareas[question.text]"
                            :id="question.text"
                            :name="question.text"
                            :placeholder="question.text"></textarea>
                </div>
              </template>
            </template>
          </div>

          <div class="group-questions" v-if="!hasGroupExQuestions">
            <h1>Group Questions</h1>
            <template v-for="(question, index) in exGroupQuestions">
              <template v-if="question.type == 'select'">
                <div class="field-group">
                  <label :for="question">{{question.text}}</label>
                  <select v-model="exGroupQsSelects[question.text]"
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
                <fn1-input v-model="exGroupQsTexts[question.text]"
                           :key="index"
                           :label="question.text"
                           :placeholder="question.text"
                           :name="question.text"
                           :id="question.text" />
              </template>

              <template v-if="question.type == 'number'">
                <fn1-input type="number"
                           v-model="exGroupQsNumbers[question.text]"
                           :label="question.text"
                           :placeholder="question.text"
                           :name="question.text"
                           :id="question.text" />
              </template>

              <template v-if="question.type == 'textarea'">
                <div class="field-group">
                  <label :for="question.text">{{question.text}}</label>
                  <textarea type="textarea"
                            v-model="exGroupQsTextareas[question.text]"
                            :id="question.text"
                            :name="question.text"
                            :placeholder="question.text"></textarea>
                </div>
              </template>
            </template>
          </div>

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

      exDeptQsSelects:       {},
      exDeptQsTexts:         {},
      exDeptQsTextareas:     {},
      exDeptQsNumbers:       {},

      exGroupQsSelects:       {},
      exGroupQsTexts:         {},
      exGroupQsTextareas:     {},
      exGroupQsNumbers:       {},
    }
  },
  mounted() {
    this.hasDeptExQuestions;
    this.hasGroupExQuestions;
  },
  watch: {
    'extraAnswers': {
      handler: function (val, oldVal) {}
    }
  },
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
    },
  },
  computed: {
    ...mapFields([
      'createUser.totalSteps',
      'createUser.extraQuestionAnswers',

      'createUser.extraDeptQuestions',
      'createUser.extraDeptQuestionAnswers',
      // 'createUser.extraDeptQuestionAnswers.exDeptQsSelects',
      // 'createUser.extraDeptQuestionAnswers.exDeptQsTexts',
      // 'createUser.extraDeptQuestionAnswers.exDeptQsTextareas',
      // 'createUser.extraDeptQuestionAnswers.exDeptQsNumbers',

      'createUser.extraGroupQuestions',
      'createUser.extraGroupQuestionAnswers',
      // 'createUser.extraGroupQuestionAnswers.exGroupQsSelects',
      // 'createUser.extraGroupQuestionAnswers.exGroupQsTexts',
      // 'createUser.extraGroupQuestionAnswers.exGroupQsTextareas',
      // 'createUser.extraGroupQuestionAnswers.exGroupQsNumbers',
    ]),
    hasDeptExQuestions() {
      return this.isEmpty(this.extraDeptQuestions);
    },
    hasGroupExQuestions() {
      return this.isEmpty(this.extraGroupQuestions);
    },
    exDeptQuestions() {
      return JSON.parse(this.extraDeptQuestions);
    },
    exGroupQuestions() {
      return JSON.parse(this.extraGroupQuestions);
    },
    extraAnswers() {
      let joinedAnswers = {
              ...this.exDeptQsSelects,
              ...this.exDeptQsTexts,
              ...this.exDeptQsTextareas,
              ...this.exDeptQsNumbers,
              ...this.exGroupQsSelects,
              ...this.exGroupQsTexts,
              ...this.exGroupQsTextareas,
              ...this.exGroupQsNumbers
             }

      var res = Object.keys(joinedAnswers)
        .map(function(key) {
          return `${key}: ${JSON.stringify(joinedAnswers[key])}`;
        });

      return this.extraQuestionAnswers = res;
    }
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

  form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .dept-questions,
    .group-questions {
      flex: 1;
      max-width: 50%;
    }

    .dept-questions {
      margin: 0 0 0 0;
      padding: 0 40px 0 0;
    }

    .group-questions {
      padding: 0 0 0 40px;
      border-left: 1px solid lighten($text-color, 50%);
    }

    .button-wrapper {
      width: 100%;
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