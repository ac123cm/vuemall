<template>
  <div>
    <nav-bar>
      <!-- 返回 -->
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
      <!-- 标题 -->
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ acrive: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.acrive {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>