<template>
  <aside>
    <h1>Filter Service Requests</h1>
    <div class="form-group">
      <fieldset>
        <legend>Filter by Service:</legend>
        <div class="checkbox-wrapper">
          <div v-for="p, i in activeFullServices" :key="i">
            <input
              :id="p.id"
              type="checkbox"
              name="servicesFilter"
              v-model="serviceFilterIDs"
              :value="p.id">
            <label :for="p.id"><strong>{{p.id}}:</strong> {{p.name}}</label>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="form-group">
      <fieldset>
        <legend>Filter by Acct. Req:</legend>
        <div class="checkbox-wrapper">
          <div v-for="a, i in activeAcctReqIDs" :key="i">
            <input
              :id="a"
              type="checkbox"
              name="acctReqFilter"
              v-model="acctReqFilterIDs"
              :value="a">
            <label :for="a"><strong>{{a}}:</strong> name</label>
          </div>
        </div>
      </fieldset>
    </div>
  </aside>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }        from 'vuex'
import { mapFields }  from 'vuex-map-fields';

export default {
  props: ['filterServiceIDs','filterAcctReqIDs'],
  components: {},
  mounted() {},
  data() {
    return {
      serviceFilterIDs: [],
      acctReqFilterIDs: [],
    }
  },
  watch: {
    serviceFilterIDs(val) {
      this.$emit('filterServiceChange', this.serviceFilterIDs);
    },
    acctReqFilterIDs(val) {
      this.$emit('filterAcctReqChange', this.acctReqFilterIDs);
    }
  },
  methods: {},
  computed: {
    ...mapFields([
      'services.mgrFullProfiles',
      'services.activeFullServices',
      'services.activeServiceIDs',
      'services.activeAcctReqIDs',
      'services.filterByService'
    ]),
    // activeServicesCheck() {
    //   return this.mgrFullProfiles.filter((item) => {
    //     return this.activeServiceIDs.indexOf(item.id) >= 0;
    //   });
    // }
  },
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    position: fixed;
    color: $text-color;
    width: 300px;
    padding: 0 40px 0 0;

    h1 {
      color: $text-color;
      font-size: $size-l;
      line-height: $size-l;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    .form-group {
      margin: 0 0 40px 0;
      max-height: 300px;
      overflow-y: scroll;

      fieldset {
        padding: 0;

        legend {
          font-weight: $weight-semi-bold;
          border-bottom: 1px solid lighten($text-color, 50%);
          width: 100%;
          padding: 0 0 5px 0;
          margin: 0 0 10px 0;
        }

        div {
          padding: 0;
          align-items: center;
          margin: 0 0 8px 0;
        }
      }

      label {
        font-weight: $weight-normal;
        font-size: 16px;
        line-height: 18px;
        color: $text-color;
        margin: 0 0 0 8px !important;
      }

      .checkbox-wrapper {
        display: block;
      }
    }
  }
</style>