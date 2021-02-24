<template lang="pug">
  nav.navbar
    component(
      :is="$mq === 'mobile' || $mq === 'tablet' ? 'navbar-mobile' : 'navbar-desktop'"
      :links="links",
      :logged-in="loggedIn",
      :suggested-searches="suggestedSearches"
    )
      template(v-slot:logo)
        navbar-logo(:image="logo", :large-image="logoLarge", :alt="shopName", :h1="h1")
</template>

<script>
  import NavbarDesktop from 'scripts/components/navigation/NavbarDesktop.vue';
  import NavbarMobile from 'scripts/components/navigation/NavbarMobile.vue';
  import NavbarLogo from 'scripts/components/navigation/NavbarLogo.vue';

  export default {
    name: 'Navbar',
    components: { NavbarDesktop, NavbarMobile, NavbarLogo },
    props: {
      logo: String,
      logoLarge: String,
      shopName: String,
      h1: {
        type: Boolean,
        default: false,
      },
      links: {
        type: Array,
        default: () => [],
      },
      learnLinks: {
        type: Array,
        default: () => [],
      },
      loggedIn: {
        type: Boolean,
        default: false,
      },
      suggestedSearches: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style scoped lang="scss"></style>
