<template>
  <div class="header-wrapper" ref="headerWrapper">
    <exampleHeader
      :active.sync="$route.name"
      :logo="{
        url:          'https://bloomington.in.gov/',
        image:        '/city-of-bloomington-logo.svg',
        imageAlt:     'City of Bloomington, IN'
      }"

      :logoHeadings="{
        topHeading:   'Bloomington.in.gov',
        subHeading:   'John Hamilton, Mayor',
      }"

      :application="navigation.application"
      :navItems="navItems"
      :subNavItems="subNavItems">

      <fn1-button slot="dropdown"
                  v-if="isAuthenticated"
                  :title="`Logout: ${authUser.username}`"
                  @click.native="logout()">
        Logout
      </fn1-button>
    </exampleHeader>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import {
  mapFields }          from 'vuex-map-fields'

import exampleDropdown from '~/components/exampleDropdown'
import exampleHeader   from '~/components/exampleHeader'

export default {
  mounted(context) {
    this.routeParam = this.$route.name;
    this.checkAuthLevel;
    this.navItems;
    this.subNavItems;
  },
  components: {
    exampleDropdown,
    exampleHeader
  },
  data() {
    return {
      routeParam:   '',
      routes: {
        accountReq: ['account-requests','create'],
        serviceReq: ['service-requests'],
        services:   ['services'],
        profiles:   ['profiles'],
      }
    }
  },
  computed: {
    ...mapFields([
      'auth.auth',
      'auth.authUser',
      'auth.authLevel',
      'auth.isAuthenticated',
      'navigation',
    ]),
    navItems() {
      return this.navigation.nav.admin
    },
    isAccountRequestRoute() {
      if(this.routes.accountReq.includes(this.routeParam))
        return true;
    },
    isServiceRequestRoute() {
      if(this.routes.serviceReq.includes(this.routeParam))
        return true;
    },
    isServicesRoute() {
      if(this.routes.services.includes(this.routeParam))
        return true;
    },
    isProfilesRoute() {
      if(this.routes.profiles.includes(this.routeParam))
        return true;
    },
    subNavItems() {
      if(this.isAccountRequestRoute) {
        if(this.authLevel.admin) {
          return this.navigation.subNav.accountRequest.admin;
        } else if(this.authLevel.regular) {
          return this.navigation.subNav.accountRequest.regular;
        }
      } else {
        return [{}]
      }
    },
  },
  methods: {
    logout() {
      this.resetGlobalStore();
      this.clearAuth();
      this.clearStorage();
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  padding: 15px 20px;
  position: fixed;
  top: 0;
  z-index: 0 !important;

  /deep/ nav {
    &[role="navigation"] {
      ul {
        li {
          a {
            &.active,
            &:hover {
              color: $color-blue;
            }
          }
        }
      }
    }
  }

  /deep/ button {
    font-size: $size-s;
    line-height: $size-s;
    padding: 10px 15px;
    margin: 0 0 0 15px;
    background-color: $text-color;
    height: fit-content;
    display: flex;
    align-items: center;
    align-self: center;
  }
}
</style>