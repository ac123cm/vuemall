<template>
  <div class="leftbar">
    <scroll class="content">
      <div
        class="leftbar-item"
        v-for="(item, index) in categoryList"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

export default {
  name: 'CategoryLeftBar',
  components: {
    Scroll,
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    },
  },
}
</script>

<style scoped>
.leftbar {
  width: 25%;
  height: 100vh;
  font-size: 14px;
  background-color: #f3e1e16e;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

.leftbar-item {
  padding: 15px;
  text-align: center;
}

.active {
  font-weight: 600;
  background-color: #fff;
  border-left: 3px solid #ff5777;
}
</style>
