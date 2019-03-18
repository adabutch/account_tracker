<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">

      <fn1-tabs>
        <fn1-tab name="Account" :selected="true">
          {{acctReq}}<br><br><br>- - - -<br>

          <h1>
            <template v-if="acctReq.first_name">
              {{acctReq.first_name}}
            </template>

            <template v-if="acctReq.nickname">
              {{acctReq.nickname}}
            </template>

            <template v-if="acctReq.middle_name">
              {{acctReq.middle_name}}
            </template>

            <template v-if="acctReq.last_name">
              {{acctReq.last_name}}
            </template>

            <template v-if="acctReq.suffix">
              {{acctReq.suffix}}
            </template>
          </h1>

        </fn1-tab>

        <fn1-tab name="Services">
          service profiles
        </fn1-tab>

        <fn1-tab name="History">
          history
        </fn1-tab>
      </fn1-tabs>
    </div>
  </div>
</template>

<script>
import moment           from 'moment'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import {
  createHelpers }       from 'vuex-map-fields';

import headerComponent  from '~/components/headerComponent'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  validate({ params }) {
    console.log('run valid', params)
    return !isNaN(+params.id)
  },
  mounted(context) {
    this.paramID = this.$route.params.id;

    this.$axios
    .get(`${process.env.api}${process.env.accountRequest}?id=${this.paramID}`)
    .then(response => {
      console.log(`/ID/ AR Req. :: `, response)
      this.acctReq = response.data.results[0];
    })
    .catch(e => {
      console.log(`/ID/ AR Req. error :: `, e)
    });
  },
  middleware:       'authenticated',
  components: {
    headerComponent
  },
  data() {
    return {
      paramID:      "",
      acctReq:      "",
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

</style>