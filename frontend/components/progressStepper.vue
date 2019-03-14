<template>
  <div class="step-wrapper">
    <div class="progress-stepper">
      <!-- <span class="title">Progress:</span> -->
      <h3>User Creation Wizard</h3>

      <div v-for="(step, index) in totalSteps"
           @click="goToStep(index)"
           :key="index"
           :class="{
            'active': stepActive === step,
            'complete': finishedStep(step)
           }">

        <svg v-if="finishedStep(step)" version="1.1" id="check" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46px" height="37px" viewBox="0 0 46 37" enable-background="new 0 0 46 37" xml:space="preserve">
          <polygon id="check-icon" fill="" points="0.2230862,22.3627338 14.1432562,36.2812843 45,5.4261613 40.3345947,0.7607598 14.1432562,26.9504795 4.7655683,17.5744114 "/>
        </svg>

        <span v-if="stepActive <= step">{{step}}</span>
      </div>
    </div>

    <div class="button-wrapper">
      <button @click.prevent="resetForm"
              class="reset-form">
        reset form
      </button>

      <nuxt-link v-if="showPreviousBtn"
                 class="button previous"
                 :to="previousButton">
        Previous
      </nuxt-link>

      <nuxt-link class="button"
                 :to="nextButton">
        <template v-if="stepActive < totalSteps">
          Next
        </template>

        <template v-if="stepActive == totalSteps">
          Finish
        </template>
      </nuxt-link>
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
  mapFields }           from 'vuex-map-fields';

export default {
  props: ['stepActive','stepComplete','previousButton','nextButton'],
  computed: {
    ...mapFields([
      'createUser.totalSteps'
    ]),
    showPreviousBtn() {
      return this.stepActive != 1 && this.stepActive <= this.totalSteps
    }
  },
  methods: {
    goToStep(index) {
      if(index === 0) {
        this.$router.push('/');
      } else if(index === 1) {
        this.$router.push('two')
      } else if(index === 2) {
        this.$router.push('three')
      } else if(index === 3) {
        this.$router.push('four')
      } else if(index === 4) {
        this.$router.push('five')
      } else if(index === 5) {
        this.$router.push('six')
      } else {}
    },
    finishedStep(step) {
      return this.stepActive > step || this.stepActive == 'finished'
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/style.scss';

.step-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 40px 0;
  padding: 0 0 20px 0;
  border-bottom: 1px solid lighten($text-color, 50%);
}

.button-wrapper {
  margin-left: auto;
  padding: 0;

  a {
    &:last-of-type {
      margin-right: 0;
    }
  }
}

.progress-stepper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  line-height: 25px;

  h3 {
    width: auto;
    margin-right: 95px;
    font-style: italic;
    color: $text-color;
  }

  div {
    cursor: pointer;
    position: relative;
    background: $color-blue;
    color: white;
    margin: 0 0 0 $size-xl;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: $size-xl;
    line-height: 45px;
    text-align: center;

    &.active {
      background: $color-green;

      &:before {
        position: absolute;
        content: '';
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: 2px solid $color-green;
        left: -5px;
        top: -5px;
        z-index: 10;
      }
    }

    &.complete {
      color: white;
      background: $color-green;

      &:after {
        background: $color-green;
      }
    }

    &:first-of-type {
      margin: 0;
    }

    &:last-of-type {
      &:after {
        display: none;
      }
    }

    &:after {
      position: absolute;
      content: '';
      width: 30px;
      height: 4px;
      right: -30px;
      background: $color-blue;
      display: block;
      top: 50%;
      transform: translateY(-50%);
    }

    svg {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 25px;
      height: 25px;
      display: block;
      fill: white;
    }
  }
}
</style>