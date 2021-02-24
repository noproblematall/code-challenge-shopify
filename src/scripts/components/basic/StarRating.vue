<template lang="pug">
  .star-rating
    icon.star-rating__star(v-for="n in fullStars" :key="'full-' + n" name="star" size="14px")
    icon.star-rating__star.star-rating__star--half(v-for="n in halfStars" :key="'half-' + n" name="star-half" size="14px")
    icon.star-rating__star.star-rating__star--empty(v-for="n in emptyStars" :key="'empty-' + n" name="star-empty" size="14px")
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'StarRating',
    components: {
      Icon,
    },
    props: {
      rating: {
        type: Number,
      },
    },
    data() {
      return {
        maxStars: 5,
      };
    },
    computed: {
      fullStars() {
        return Math.floor(this.rating);
      },
      halfStars() {
        return this.rating > this.fullStars ? 1 : 0;
      },
      emptyStars() {
        return this.maxStars - (this.fullStars + this.halfStars);
      },
    },
  };
</script>

<style scoped lang="scss">
  .star-rating {
    &__star {
      fill: $color-yellow;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
