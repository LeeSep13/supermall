<template>
    <ul class="menu-list">
      <li class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </li>
      <li class="menu-list-item" v-for="i in 16"></li>
    </ul>
</template>

<script>


export default {
  name: "TabMenu",
  props: {
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>

.menu-list-item {
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 18px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
