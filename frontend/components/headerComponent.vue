<template>
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

    <fn1-dropdown
      slot="dropdown"
      text="Adam Butcher"
      navAlign="right"
      :navItems="[
        {name: 'Settings', href: '/'},
        {name: 'Log Out',  href: '/'}]
    "/>
  </fn1-header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>