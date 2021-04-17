<template>
  <div class="subcategory">
      <div class="subcategory-item" v-for="(item, index) in subcategoryList" :key="index">
          <img :src="item.image" alt="">
          <p>{{item.title}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SubCategory',
    props: {
        subcategoryList: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
.subcategory {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
}

.subcategory-item {
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    width: 80px;
    height: 100px;
    margin-bottom: 10px;
}

.subcategory-item img {
    width: 65px;
    margin-bottom: 6px;
}

.subcategory-item p {
    font-size: 14px;
}
</style>