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
        {name: 'Users',     href: '/admin/users'}
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
          <summary>{{authUser}}</summary>
          <!-- <summary>{{endpoints.obtainJWT}}</summary> -->
          <!-- <summary>Auth</summary> -->
          <ul class="right">
            <li @click="logout()">
              Logout
            </li>
          </ul>
        </details>
      </nav>
      <!-- <exampleDropdown :text="authUser.first_name" navAlign="right">
        <li>
          <a href="" @click="logout()" title="Logout">Logout</a>
        </li>
      </exampleDropdown> -->

    </fn1-header>
  </span>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import { createHelpers }   from 'vuex-map-fields'
import exampleDropdown from '~/components/exampleDropdown'

const Cookie = process.client ? require('js-cookie') : undefined


const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  components: {
    exampleDropdown
  },
  methods: {
    logout() {
      localStorage.clear('vuex');
      Cookie.remove('auth')
      this.$store.commit('SET_AUTH', null)
      this.$store.commit("SET_AUTH_USER", null)
      this.$store.commit("SET_IS_AUTHENTICATED", false)
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapFields([
      'authUser',
      'authUserTwo',
      'endpoints'
    ]),
    // fullName() {
    //   return this.$store.state.authUser.first_name
    // }
  }
}
</script>

<style lang="scss">
</style>