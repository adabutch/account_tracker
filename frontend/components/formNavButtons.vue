<template>
  <nav class="button-group">
    {{ stepActive }}
    {{ totalSteps }}

    <nuxt-link class="button previous"
                     :to="{ name: 'stepThree'}">Previous</nuxt-link>

    <nuxt-link v-if="stepActive < totalSteps"
               class="button"
               :to="{ name: 'stepSix'}">Next</nuxt-link>

    <nuxt-link v-if="stepActive == totalSteps"
               class="button"
               :to="{ name: 'finish'}">Finish</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['stepActive','stepComplete'],
  computed: {
    ...mapGetters([
      'totalSteps'
    ]),
  }
}
</script>