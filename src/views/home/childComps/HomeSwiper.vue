<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" v-bind:key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
      banners: {
          type: Array,
          default() {
              return []
          }
      }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      // 只需要发出一次事件
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
};
</script>

<style>
</style>