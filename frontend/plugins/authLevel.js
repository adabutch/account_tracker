import Vue          from 'vue'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }      from 'vuex'
import {
  mapFields }       from 'vuex-map-fields'

Vue.mixin({
  data() {
    return {
      levels: {
        admin: {
          admin:    true,
          regular:  false,
        },
        regular: {
          admin:    false,
          regular:  true,
        },
      },
    }
  },
  computed: {
    ...mapFields([
      'groupLevels',
      'auth.authUser',
      'auth.authLevel',
    ]),
    checkAuthLevel() {
      let adminLevel  = this.groupLevels.admin,
      regularLevel    = this.groupLevels.regular,
      userLevels      = this.authUser.groups,
      isAdminLevel    = userLevels.includes(adminLevel),
      isRegularLevel  = userLevels.includes(regularLevel);

      if(isAdminLevel) {
        this.$store.dispatch('auth/authLevel', this.levels.admin)
      } else if(isRegularLevel) {
        this.$store.dispatch('auth/authLevel', this.levels.regular)
      }

      return this.authUser.groups
    }
  },
})