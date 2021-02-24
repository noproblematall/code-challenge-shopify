<template lang="pug">
  section.container.container--login
    h1.login__header Sign Up
    .login__main
      .row
        .small-12.medium-5.column
          .login__column
            slot
        .small-12.medium-2.column.login__divider
          .login__divider__line
        .small-12.medium-5.column.login__alt-container
          .login__column
            .login__button.login__button--register
              p Already Have an Account?
              a.u-link(href="/account/login") Log In
</template>

<script>
  import AccountLogin from 'scripts/components/account/AccountLogin.vue';
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'AccountRegister',
    components: { Icon },
    extends: AccountLogin,
  };
</script>

<style lang="scss" scoped></style>
