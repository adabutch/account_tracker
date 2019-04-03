<template>
  <aside>
    <h1>Services Aside</h1>
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
  props: [],
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapFields([]),
  },
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    background-color: red;
    color: $text-color;
    width: 300px;

    h1 {
      color: $text-color;
      font-size: $size-l;
      line-height: $size-l;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    .field-group {
      width: 100%;
      display: flex !important;
    }
  }
</style>