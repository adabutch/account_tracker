<template>
  <div class="header-wrapper" ref="headerWrapper">
    <exampleHeader
      :logo="{
        url:          'https://bloomington.in.gov/',
        image:        `city-of-bloomington-logo.svg`,
        imageAlt:     'City of Bloomington, IN'
      }"

      :logoHeadings="{
        topHeading:   'Bloomington.in.gov',
        subHeading:   'John Hamilton, Mayor',
      }"

      :application="navigation.application"
      :navItems="navItems()"
      :subNavItems="subNavItems()">

      <fn1-button slot="dropdown"
                  :title="`Logout`"
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

    this.$nextTick()
    .then(() => {
      this.checkAuthLevel
      .then((resolve) => {
        this.navItems();
        this.subNavItems();
      })
      .catch((reject) => {
        console.log(`%c checkAuthLevel 🛑 `,
                    this.consoleLog.error,
                    `\n\n ${reject} \n\n`);
      })
    });

    console.log(`%c Made with ❤️ via City of Bloomington, ITS `,
                this.consoleLog.info)
  },
  components: {
    exampleDropdown,
    exampleHeader
  },
  data() {
    return {
      routeParam:   '',
    }
  },
  computed: {
    ...mapFields([
      'consoleLog',
      'routes',
      'auth.authUser',
      'auth.authLevel',
      'auth.isAuthenticated',
      'navigation',
      'navigation.nav',
    ]),
    isAccountRequestRoute() {
      if(this.routes.accountReq.includes(this.routeParam))
        return true;
    },
    isServiceRequestRoute() {
      if(this.routes.serviceReq.includes(this.routeParam))
        return true;
    },
    isSearchRoute() {
      if(this.routes.search.includes(this.routeParam))
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
  },
  methods: {
    navItems() {
      switch (true) {
        case this.authLevel.admin:
          return this.nav.admin
          break;
        case this.authLevel.support:
          return this.nav.support
          break;
        case this.authLevel.regular:
          return this.nav.regular
          break;
        default:
          return this.nav.regular
          break;
      }
    },
    subNavItems() {
      return []
    },
    logout() {
      this.resetGlobalStore();
      this.clearAuth();
      this.clearStorage();
      window.location = process.env.api + process.env.logout
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

  ::v-deep nav {
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

  ::v-deep button {
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