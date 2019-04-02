<template>
  <div class="header-wrapper" ref="headerWrapper">
    <fn1-header
      :logo="{
        url:          'https://bloomington.in.gov/',
        image:        '/city-of-bloomington-logo.svg',
        imageAlt:     'City of Bloomington, IN'
      }"

      :logoHeadings="{
        topHeading:   'Bloomington.in.gov',
        subHeading:   'John Hamilton, Mayor',
      }"

      :application="{
        name:         'Account Track',
        url:          'https://dhcp-cityhall-101-164.bloomington.in.gov:8080'
      }"

      :navItems="[
        {name: 'Accounts',  href: '/account-requests'},
        {name: 'Services',  href: '/services'},
        {name: 'Profiles',  href: '/profiles'}
      ]"

      :subNavItems="subNavItems">

      <fn1-button slot="dropdown"
                  v-if="isAuthenticated"
                  :title="`Logout: ${authUser.username}`"
                  @click.native="logout()">
        Logout
      </fn1-button>
    </fn1-header>
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

export default {
  mounted(context) {
    this.routeParam = this.$route.name;
  },
  components: {
    exampleDropdown
  },
  data() {
    return {
      routeParam:   '',
    }
  },
  created() {},
  computed: {
    ...mapFields([
      'groupLevels',
      'endpoints',
      'auth.auth',
      'auth.authUser',
      'auth.authLevel',
      'auth.isAuthenticated',
      'subNav.acctReq',
    ]),
    subNavItems() {
      if(this.routeParam.includes('account-requests') ||
         this.routeParam.includes('create')) {
        if(this.authLevel.admin) {
          return this.acctReq.admin;
        } else if(this.authLevel.regular) {
          return this.acctReq.regular;
        }
      } else {
        return [{}]
      }
    }
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
@import '@/assets/style.scss';

header {
  padding: 15px 20px;
  position: fixed;
  top: 0;
  z-index: 10;

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