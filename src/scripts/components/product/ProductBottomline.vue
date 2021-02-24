<template lang="pug">
  .product-bottomline
    .product-bottomline__rating(v-if="loaded")
      star-rating.product-bottomline__stars(:rating="rating")
      a.product-bottomline__count(v-if="count > 0" href="#") {{ reviewMessage }}
      a.product-bottomline__no-ratings(v-else-if="loaded" href="#") No reviews yet!
</template>

<script>
  import axios from 'axios';
  import StarRating from 'scripts/components/basic/StarRating.vue';

  // add client APPKEY here (public facing)
  const YOTPO_APP_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  export default {
    name: 'ProductBottomline',
    components: { StarRating },
    props: {
      productId: Number,
    },
    data() {
      return {
        loaded: false,
        rating: 0,
        count: 0,
      };
    },
    computed: {
      reviewMessage() {
        return `(${this.count} Reviews)`;
      },
    },
    created() {
      axios
        .get(`https://api.yotpo.com/products/${YOTPO_APP_KEY}/${this.productId}/bottomline`)
        .then(({ data }) => {
          // endpoint returns => average_score and total_reviews
          const count = data.response.bottomline.total_reviews || 0;

          this.count = count;
          if (count > 0) this.rating = data.response.bottomline.average_score;
        })
        .catch((err) => {
          throw new Error(err.response.data.status.message);
        })
        .finally(() => {
          this.loaded = true;
        });
    },
  };
</script>

<style scoped lang="scss">
  .product-bottomline {
    &__rating {
      display: flex;
      align-items: center;
    }

    &__stars {
      margin-right: 8px;
    }

    &__count,
    &__no-ratings {
      margin: 0;
      font-size: rem(14);
      line-height: 1.28;
    }
  }
</style>
