<template lang="pug">
  section.account-nav(v-if="!hideNav")
    h1.account-nav__name Hello {{ customerName }}
    p.account-nav__email {{ customerEmail }}
    .account-nav__select.input.input--select(v-if="['mobile', 'tablet'].includes($mq)")
      select(v-model="selected")
        option(v-for="option in options", :value="option.value", :key="option.value") {{ option.label }}
      icon(name="chevron-down", size="16px")
    ul.account-nav__list.u-list-simple(v-else)
      li.account-nav__list-item(v-for="option in options", :class="{ 'item-active': isActive(option.value) }") 
        a(:href="option.value") {{ option.label }}
</template>

<script>
  import SelectInput from 'scripts/components/forms/SelectInput.vue';
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'AccountNav',
    components: {
      SelectInput,
      Icon,
    },
    props: {
      options: Array,
      customerName: String,
      customerEmail: String,
    },
    data() {
      return {
        selected: window.location.pathname,
      };
    },
    computed: {
      hideNav() {
        // hide entire nav on mobile if on order details page
        return ['mobile', 'tablet'].includes(this.$mq) && this.selected.includes('orders');
      },
    },
    watch: {
      selected() {
        window.location.href = this.selected;
      },
    },
    methods: {
      isActive(val) {
        // make sure 'Order History' is highlighted if user is on order details page (desktop)
        return val === this.selected || (this.selected.includes('orders') && val === '/account');
      },
    },
  };
</script>

<style lang="scss" scoped>
  $desktop-width: 300px;
  $color-padding-left: 18px;

  .account-nav {
    @include desktop-up {
      flex-basis: $desktop-width;
      padding-right: 50px;
      border-right: 1px solid $border--light;
      margin-right: 70px;
    }
  }

  .account-nav__name {
    font-size: rem(23);
    font-weight: 700;
    line-height: rem(28);
    margin-top: 0;
    margin-bottom: 16px;

    @include desktop-up {
      margin-top: 27px;
      margin-bottom: 9px;
    }
  }

  .account-nav__email {
    font-size: rem(14);
    line-height: rem(18);
    margin: 0;
  }

  .account-nav__name,
  .account-nav__email {
    @include desktop-up {
      padding-left: $color-padding-left;
    }
  }

  .account-nav__select {
    margin-top: 15px;
    margin-bottom: 20px;
  }

  .account-nav__list {
    margin-top: 59px;
  }

  .account-nav__list-item {
    font-size: rem(18);
    font-weight: 700;
    padding-left: $color-padding-left;
    padding-top: 8px;
    padding-bottom: 8px;

    &.item-active {
      background-color: $color-orange;
      color: $color-white;
    }
  }
</style>
