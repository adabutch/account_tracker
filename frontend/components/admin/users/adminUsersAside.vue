<template>
  <aside>
    <h1>Admin User Aside</h1>

    <div class="field-group">
      <input v-model="searchUsers"
             id="search"
             type="search"
             name="search"
             placeholder="Search by Name or Dept.">
    </div>

    <exampleSelect v-model="selectFilter"
                   label="Type"
                   name="request-type"
                   id="request-type"
                   :options="requestTypes" />
  </aside>
</template>

<script>
import exampleSelect from '~/components/exampleSelect.vue'
import exampleSearch from '~/components/exampleSearch.vue'

import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }        from 'vuex'
import { mapFields }  from 'vuex-map-fields';



export default {
  props: ['searchUsersProp', 'selectFilterProp'],
  components: {
    exampleSearch,
    exampleSelect
  },
  data() {
    return {
      selectFilter: this.selectFilter,
      searchUsers: this.searchUsers,
      requestTypes: [
        { value: 'ready', text: 'Ready' },
        { value: 'deactivate', text: 'Deactivate' }
      ],
    }
  },
  computed: {
    ...mapFields([
      'getReadyUsers'
    ]),
  },
  watch: {
    searchUsers(val) {
      this.$emit('inputChange', this.searchUsers);
    },
    selectFilter(val) {
      this.$emit('selectChange', this.selectFilter);
    },
  },
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    color: $text-color;
    width: 300px;
    // background-color: lighten($color-grey, 5%);

    // h1 {
    //   color: $text-color;
    //   border-bottom: 1px solid lighten($text-color, 40%);
    //   margin: 0 0 10px 0;
    //   padding: 0 0 10px 0;
    // }

    h1 {
      color: $text-color;
      font-size: $size-l;
      // font-weight: $weight-semi-bold;
      line-height: $size-l;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    .field-group {
      display: flex !important;
    }
  }
</style>