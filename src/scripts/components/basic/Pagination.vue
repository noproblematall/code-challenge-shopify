<template lang="pug">
  ul.pagination.u-list-inline
    li.pagination__item.pagination__item--prev
      icon-button(
        label="Previous Page" 
        icon="chevron-left"
        size="16px"
        :disabled="currentPage === 1"
        @click="previousPage"
      )
    li.pagination__item
      a.pagination__link(
        v-for="page in totalPages"
        :key="page"
        href="#"
        :class="{ 'pagination__link--active': currentPage === page }"
        @click.prevent="setPage(page)"
        @keypress.enter.prevent="setPage(page)"
      )
        span.u-sr-only page
        | {{ page }}
    li.pagination__item.pagination__item--next
      icon-button( 
        label="Next Page"
        icon="chevron-right"
        size="16px"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      )
</template>

<script>
  import IconButton from 'scripts/components/buttons/IconButton.vue';

  export default {
    name: 'Pagination',
    components: { IconButton },
    props: {
      totalPages: Number,
      startingPage: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        currentPage: this.startingPage,
      };
    },
    watch: {
      currentPage() {
        this.$emit('change-page', this.currentPage);
      },
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage += 1;
        }
      },
      previousPage() {
        if (this.currentPage > 0) {
          this.currentPage -= 1;
        }
      },
      setPage(page) {
        this.currentPage = page;
      },
    },
  };
</script>

<style scoped lang="scss">
  // styles/ui/pagination.scss
</style>
