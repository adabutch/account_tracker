<template>
  <aside>
    <h1>Admin User Aside</h1>
    <fn1-search buttonValue="Go"
                placeholder="Search for it"
                name="search"
                id="search"/>

    <exampleSelect
                   label="Type"
                   name="request-type"
                   id="request-type"
                   :options="requestTypes" />
  </aside>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }        from 'vuex'
import { mapFields }  from 'vuex-map-fields';

import exampleSelect  from '~/components/exampleSelect.vue'

export default {
  components: {
    exampleSelect
  },
  data() {
    return {
      requestTypes: [
        { value: 'new', text: 'New' },
        { value: 'deactivate', text: 'Deactivate' }
      ],

    }
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