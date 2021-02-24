<template lang="pug">
  form.navbar-search(action="/search")
    .input.input--text
      label.u-sr-only(for="q") Search
      input.navbar-search__field(
        aria-label="Search",
        type="text",
        ref="input",
        name="q",
        v-model="searchValue",
        :placeholder="searchPlaceholder",
        @keydown.tab="tab",
        @focus="$emit('open-results')",
        @blur="blur"
      )
    icon-submit-button.navbar-search__submit(icon="search", size="18px", label="Search")
</template>

<script>
  import IconSubmitButton from 'scripts/components/buttons/IconSubmitButton.vue';

  export default {
    name: 'NavbarSearch',
    components: { IconSubmitButton },
    props: {
      value: String,
      placeholder: {
        type: String,
        default: 'Search products',
      },
    },
    data() {
      return {
        searchValue: this.value,
        tabbingOut: false,
      };
    },
    computed: {
      searchPlaceholder() {
        return this.$mq === 'tablet' ? 'Search' : this.placeholder;
      },
    },
    watch: {
      searchValue() {
        this.$emit('input', this.searchValue);
      },
    },
    methods: {
      update(newVal) {
        this.searchValue = newVal;
        this.$refs.input.focus();
      },
      tab() {
        this.tabbingOut = true;
      },
      focus() {
        this.$refs.input.focus();
      },
      blur() {
        this.$nextTick(() => {
          if (this.tabbingOut) {
            this.tabbingOut = false;
          } else {
            this.$emit('close-results');
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .navbar-search {
    position: relative;

    .input {
      margin-bottom: 0;
    }

    &__submit {
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
    }

    &__field {
      padding: 10px 20px;
      font-size: rem(16);
      line-height: 1.2;
      background-color: $bg--main;
      border-radius: 20px;
      width: 100%;

      @include tablet-up {
        border-radius: 6px;
      }

      @include desktop-up {
        min-width: 470px;
      }
    }
  }
</style>
