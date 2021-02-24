<template lang="pug">
  .collection-grid--wrapper(v-if="collection")
    .collection-grid__sort-wrapper
      select-input.collection-grid__sort(
        placeholder="Sort by ...",
        :options="sortingOptions", 
        v-model="currentSortMethod", 
        label="Sort By",
        :hide-label="true"
      )
    .collection-grid(v-if="sortedProducts")
      transition-group(name="grid-sort-animation" tag="div" class="row small-up-1 medium-up-3 large-up-4" v-if="collection")
        .column(
          v-for="item in sortedProducts", 
          :key="(item.type === 'product') ? item.id : 'cta'", 
          :class="{ 'column-2x': item.type === 'cta' }"
        )
          product-tile(v-if="item.type === 'product'", :product="item")
          cta-tile(v-else-if="item.type === 'cta' && item.backgroundImage"
            :title="item.title"
            :description="item.description"
            :btn-text="item.btnText"
            :btn-link="item.btnUrl"
            :background-image="item.backgroundImage"
            :overlay-opacity="item.overlayOpacity"
          )
    .collection-grid__pagination(v-if="numPages > 1")
      pagination(:total-pages="numPages", @change-page="setPage")
</template>

<script>
  import { sortProductsBy } from 'scripts/helpers/sort.js';
  import storeCollection from 'scripts/mixins/storeCollection.js';

  import Pagination from 'scripts/components/basic/Pagination.vue';
  import CtaTile from 'scripts/components/collection/CtaTile.vue';
  import ProductTile from 'scripts/components/product/ProductTile.vue';
  import SelectInput from 'scripts/components/forms/SelectInput.vue';

  export default {
    name: 'CollectionGrid',
    components: {
      Pagination,
      CtaTile,
      ProductTile,
      SelectInput,
    },
    mixins: [storeCollection],
    props: {
      cta: Object,
    },
    data() {
      return {
        productsPerPage: 24,
        currentPage: 1,
        currentSortMethod: '',
        sortingOptions: [
          { label: 'Alphabetically', value: 'alphabetically' },
          { label: 'Price - Descending', value: 'priceDesc' },
          { label: 'Price - Ascending', value: 'priceAsc' },
        ],
      };
    },
    computed: {
      sortedProducts() {
        const sortedArr = [...this.collection.products].sort(sortProductsBy(this.currentSortMethod)).map((product) => ({ ...product, type: 'product' }));

        if (this.cta) {
          if (sortedArr.length < this.cta.position) {
            sortedArr.push(this.cta);
          } else {
            sortedArr.splice(this.cta.position - 1, 0, this.cta);
          }
        }

        return sortedArr;
      },
      numPages() {
        return Math.ceil(this.sortedProducts.length / this.productsPerPage);
      },
      maxProductIndex() {
        return this.currentPage * this.productsPerPage;
      },
      minProductIndex() {
        return this.maxProductIndex - this.productsPerPage + 1;
      },
    },
    methods: {
      setPage(page) {
        this.currentPage = page;
      },
    },
  };
</script>

<style scoped lang="scss">
  .collection-grid {
    position: relative;

    &__sort-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;

      @include tablet-up {
        justify-content: flex-end;
        margin-bottom: 36px;
      }
    }

    &__loading {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &__pagination {
      margin-bottom: $grid-gutter * 2;

      @include tablet-up {
        margin-bottom: 50px;
      }
    }
  }
</style>
