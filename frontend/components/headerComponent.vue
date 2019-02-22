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
        {name: 'Users',            href: '/admin/users'},
        {name: 'Profiles',         href: '/profiles'}
      ]"

      :subNavItems="[
        {name: 'All Users',          href: '/admin/users/all' },
        {name: 'Recently Approved',  href: '/admin/users/recent'},
        {name: 'Approved',           href: '/admin/users/full-time'},
        {name: 'Deactivated',        href: '/admin/users/deactivated'},
        {name: 'Denied',             href: '/admin/users/denied'}
      ]">

      <nav slot="dropdown"
           role="navigation dropdown"
           aria-label="navigation dropdown"
           class="navigation-dropdown">
        <details>
          <summary>hi</summary>
          <!-- <summary>{{endpoints.obtainJWT}}</summary> -->
          <!-- <summary>User</summary> -->
          <ul class="right">
            <li @click="logout()">
              Logout
            </li>
          </ul>
        </details>
      </nav>

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
  computed: {
    ...mapFields([
      'auth',
      'authUser',
      'authUser.username',
      'endpoints'
    ]),
    // fullName() {
    //   return this.$store.state.authUser.first_name
    // }
  },

  data() {
    return {
      // user: this.username
    }
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

<style lang="scss">
</style>