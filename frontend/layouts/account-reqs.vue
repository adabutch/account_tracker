<template>
  <div class="account-reqs-wrapper">
    <headerNav />

    <div class="page-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import headerNav    from '~/components/headerNav'

export default {
  middleware: ['authenticated'],
  components: { headerNav },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.account-reqs-wrapper {
  background: $color-grey-lighter;

  /deep/ .page-wrapper {
    background: white;
    position: fixed;
    top: 115px;
    padding: 20px;
    height: calc(100vh - 135px);
    width: 100%;
    overflow: hidden;
  }
}
</style>