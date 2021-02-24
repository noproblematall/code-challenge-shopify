<template lang="pug">
  section.container-fluid.hero__section(:style="{ 'background-image': `url(${sectiondata.image})` }")
    .section__desc(:class="sectiondata.align")
      h2 {{ sectiondata.title }}
      p {{ sectiondata.description }}

      a.section__button(:href="sectiondata.CTA_url", :style="buttonStyle")
        span {{ sectiondata.CTA_text }}
</template>

<script>
export default {
  name: "HeroComponent",
  components: {},
  props: {
    sectiondata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    buttonStyle() {
      return {};
    }
  },
  mounted() {
    console.log(this.sectiondata);
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: Roboto-Bold;
  src: url("https://cdn.shopify.com/s/files/1/0548/8010/8727/files/Roboto-Bold.ttf?v=1614209339")
    format("ttf");
}

@font-face {
  font-family: Roboto-Light;
  src: url("https://cdn.shopify.com/s/files/1/0548/8010/8727/files/Roboto-Light.ttf?v=1614209339")
    format("ttf");
}

.hero__section {
  padding: 50px;
  background-repeat: no-repeat;
  background-size: cover;

  .section__desc {
    text-align: center;

    @media (min-width: 450px) {
      &.left {
        text-align: left;
        width: 50%;
      }

      &.right {
        text-align: left;
        width: 50%;
        margin-left: auto;
      }
    }

    @media (max-width: 450px) {
      padding: 100px 40px;
    }

    h2 {
      font-size: 46px;
      color: #fff;
      font-family: Roboto-Bold;
      font-weight: 300;
      margin-bottom: 0;

      @media (max-width: 450px) {
        font-size: 36px;
      }
    }

    p {
      color: #fff;
      font-family: Roboto-Light;
      font-weight: 300;
      font-size: 24px;

      @media (max-width: 450px) {
        font-size: 18px;
      }
    }

    .section__button {
      display: inline-block;
      border-radius: 50px;
      padding: 10px 30px;
      font-family: Roboto-Light;
      font-weight: 300;
      background-color: #57ad68;
      color: #fff;
      text-decoration: none;
      font-size: 20px;

      &:hover {
        color: #57ad68;
        background-color: white;
      }
    }
  }
}
</style>
