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
      'initAllUsers'
    ]),
    // filteredList() {
    //   return this.initAllUsers
    //   .filter(user => {
    //     let firstName  = user.first_name.toLowerCase();
    //     let middleName = user.middle_name.toLowerCase();
    //     let lastName   = user.last_name.toLowerCase();
    //     let userDept   = user.department.toLowerCase();
    //     let userDivi   = user.division.toLowerCase();

    //     return firstName.includes(this.searchUsers.toLowerCase()) ||
    //            middleName.includes(this.searchUsers.toLowerCase()) ||
    //            lastName.includes(this.searchUsers.toLowerCase()) ||
    //            userDept.includes(this.searchUsers.toLowerCase()) ||
    //            userDivi.includes(this.searchUsers.toLowerCase())
    //   })
    //   .filter(user => {
    //     let requestType = user.request_status.toLowerCase();
    //     return requestType.includes(this.requestTypeFilter.toLowerCase())
    //   })
    // }
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