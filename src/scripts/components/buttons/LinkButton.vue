<template lang="pug">
  a.button(:href="href", :class="buttonClass", :disabled="isDisabled")
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';
  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';

  export default {
    name: 'LinkButton',
    components: { Icon },
    extends: PrimaryButton,
    props: {
      href: {
        type: String,
        default: '#',
      },
    },
  };
</script>

<style scoped lang="scss"></style>
