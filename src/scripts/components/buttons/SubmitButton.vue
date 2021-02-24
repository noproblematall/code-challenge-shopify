<template lang="pug">
  button.button(
    type="submit", 
    :class="buttonClass", 
    :disabled="isDisabled", 
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';
  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';

  export default {
    name: 'SubmitButton',
    components: { Icon },
    extends: PrimaryButton,
  };
</script>

<style scoped lang="scss"></style>
