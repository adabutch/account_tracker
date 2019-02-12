<template>
  <aside>
    <h1>Admin User Aside</h1>

    <div class="field-group">
      <input v-model="searchUsers"
             id="search"
             type="search"
             name="search"
             placeholder="Search for it">
      <!-- <button for="search" type="submit">Go</button> -->
    </div>

    <!-- <exampleSearch v-model="searchUsers"
                   buttonValue="Go"
                   placeholder="Search for it"
                   name="searchUsers"
                   id="searchUsers"/> -->

    <exampleSelect
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
  components: {
    exampleSearch,
    exampleSelect
  },
  data() {
    return {
      searchUsers:  '',
      requestTypes: [
        { value: 'new', text: 'New' },
        { value: 'deactivate', text: 'Deactivate' }
      ],
    }
  },
  computed: {
    ...mapFields([
      'initAllUsers'
    ]),
    filteredList() {
      return this.initAllUsers.filter(user => {
        return user.toLowerCase().includes(this.searchUsers.toLowerCase())
      })
    }
  },
  watch: {
    'searchUsers': function(val, oldVal){
      if(val.length >= 1) {
        // alert('we got data')
        // this.focused = true
        // this.showClearBtn = true
      } else {
        // alert('we got nothin')
        // this.focused = false
        // this.showClearBtn = false
      }
    }
  },
  updated() {
    // alert('input updated')
    this.$emit('input', this.searchUsers)
  }
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    color: $text-color;
    width: 275px;
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