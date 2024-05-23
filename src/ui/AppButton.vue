<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped>
.btn {
  background: #3300FF;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: white;
  padding: 16px 32px;
  cursor: pointer;
}
</style>