<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <h1>Search for ex </h1>
      <fn1-input v-model="acctReqSearch"
                 label="Account Request Search"
                 placeholder="Search ..."
                 name="acct-req-search"
                 id="acct-req-search" />
    </div>
  </div>
</template>

<script>
  import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import { mapFields }   from 'vuex-map-fields'
import axios           from 'axios'

import headerComponent from '~/components/headerComponent'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent
  },
  data() {
    return {
      acctReqSearch: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  h1 {

  }

  .page-wrapper {
    background: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>