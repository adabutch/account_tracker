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
        url:          'http://localhost:3000/'
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

      <!-- <fn1-dropdown
        slot="dropdown"
        text="Adam Bbbbutcher"
        navAlign="right"
        :navItems="[
          {name: 'Logout', href: '/login'}
        ]
      "/> -->

      <!-- to-do: wire up click methods inside json v-for
      so we can use things like the above component -->
      <nav slot="dropdown"
           role="navigation dropdown"
           aria-label="navigation dropdown"
           class="navigation-dropdown">
        <details>
          <summary>Adam Butcher</summary>
          <ul class="right">
            <li>
              <a href="" @click="logout()" title="Logout">Logout</a>
            </li>
          </ul>
        </details>
      </nav>

    </fn1-header>

  </span>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  methods: {
    logout() {
      Cookie.remove('auth')
      this.$store.commit('SET_AUTH', null)
      this.$store.commit("SET_AUTH_USER", null)
      this.$store.commit("SET_IS_AUTHENTICATED", false)
      this.$router.push('/login')
    },
  }
}
</script>

<style lang="scss">
</style>