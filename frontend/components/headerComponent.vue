<template>
  <span>
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
        {name: 'Account Requests', href: '/account-requests'},
        {name: 'Profiles',         href: '/profiles'}
      ]"

      :subNavItems="[
        {name: 'Denied Users',             href: '/account-requests/denied'}
      ]">

      <!-- <nav slot="dropdown"
           role="navigation dropdown"
           aria-label="navigation dropdown"
           class="navigation-dropdown">
        <details>
          <summary>User</summary>
          <ul class="right">
            <li @click="logout()">
              Logout
            </li>
          </ul>
        </details>
      </nav> -->

      <fn1-button slot="dropdown"
                  v-if="isAuthenticated"
                  @click.native="logout()">
        Logout
      </fn1-button>
    </fn1-header>
  </span>
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

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    exampleDropdown
  },
  created() {},
  computed: {
    ...mapFields([
      'auth',
      'authUser',
      'authUser.username',
      'isAuthenticated',
      'endpoints'
    ])
  },
  methods: {
    logout() {
      localStorage.clear('vuex');
      sessionStorage.clear('vuex');
      Cookie.remove('auth')
      this.$store.commit('SET_AUTH', null)
      this.$store.commit("SET_AUTH_USER", null)
      this.$store.commit("SET_IS_AUTHENTICATED", false)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

header {
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