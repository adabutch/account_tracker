<template>
  <aside>
    <h1>Filter Service Requests</h1>
    <div class="form-group">
      <fieldset>
        <legend>Filter by Service:</legend>
        <small>ID: Name</small>
        <div class="checkbox-wrapper">
          <div v-for="p, i in sortActiveFullServices" :key="i">
            <input
              :id="p.id"
              type="checkbox"
              name="servicesFilter"
              v-model="serviceFilterIDs"
              :value="p.id">
            <label :for="p.id"><!-- <strong>{{p.id}}:</strong>  -->{{p.name}}</label>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="form-group">
      <fieldset>
        <legend>Filter by Acct. Req:</legend>
        <small>ID: Name</small>
        <div class="checkbox-wrapper">
          <div v-for="a, i in sortAcctReqsByServiceReq" :key="i">
            <input
              :id="a.id"
              type="checkbox"
              name="acctReqFilter"
              v-model="acctReqFilterIDs"
              :value="a.id">
            <label :for="a.id"><!-- <strong>{{a.id}}:</strong>  -->{{a.full_name}}</label>
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
      'serviceReqs.master',
      'serviceReqs.mgrFullProfiles',
      'serviceReqs.activeFullServices',
      'serviceReqs.activeServiceIDs',
      'serviceReqs.activeAcctReqIDs',
      'serviceReqs.filterByService',
      'serviceReqs.acctReqsByServiceReq'
    ]),
    sortActiveFullServices() {
      let copy = [...this.activeServiceIDs];

      return this.mgrFullProfiles.filter((item) => {
        return copy.indexOf(item.id) >= 0
      })
      .sort();
    },
    sortAcctReqsByServiceReq() {
      let copy = [...this.acctReqsByServiceReq];
      return copy.sort((a, b) => a.id - b.id);
    }
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
      position: relative;
      margin: 0 0 40px 0;
      height: 250px;
      overflow-y: hidden;
      padding: 0;

      &:after {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        left: 0;
        height: 30px;
        width: 100%;
        background: linear-gradient(
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 100%
        );
      }

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

        small {
          display: block;
          font-size: 14px;
          color: lighten($text-color, 25%);
          font-weight: 600;
          margin: 0 0 10px 0;
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
        position: absolute;
        display: block;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: scroll;
      }
    }
  }
</style>