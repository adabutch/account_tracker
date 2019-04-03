<template>
  <aside>
    <h1>Services Aside</h1>
    <ul>
      <li v-for="p, i in activeCheck" :key="i">
        {{p.id}} - {{p.name}}
      </li>
    </ul>
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
  mounted() {
    this.activeCheck;
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapFields([
      'auth.authUser',
      'services.mgrProfileIDs',
      'services.mgrFullProfiles',
      'services.activeServiceIDs'
    ]),
    activeCheck() {
      let ids = this.mgrFullProfiles.filter((item) => {
        return this.activeServiceIDs.indexOf(item.id) >= 0;
      });
      return ids;
    },
  },
}
</script>

<style lang="scss">
  @import '@/assets/style.scss';
  aside {
    background-color: red;
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

    .field-group {
      width: 100%;
      display: flex !important;
    }
  }
</style>