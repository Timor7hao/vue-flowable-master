<template>
<div>1111111</div>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {

    };
  },
  components: {

  },
  computed: {

  },
  methods: {

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
