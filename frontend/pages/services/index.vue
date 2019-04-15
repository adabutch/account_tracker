<template>
  <div class="inner-wrapper">
    services
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

// import exampleDropdown  from '~/components/exampleDropdown'

export default {
  layout:           'services',
  middleware:       'authenticated',
  components: {},
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {

  },
  computed: {
    ...mapFields([
      'auth.authUser',
      'consoleLog',
    ]),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

</style>