<template>
  <div class="progress-bar">
    <div class="progress-bar__upperscale">
      <div>0</div>
      <div>{{ allCount }}</div>
    </div>
    <div ref="bar" class="progress-bar__bar">
      <div
        v-for="x in allCount"
        :key="x"
        class="progress-bar__bar__inner"
        :class="`${x <= coloredCount ? 'progress-bar__bar__inner_colored' : ''} ${x === coloredCount ? 'progress-bar__bar__inner_rounded' : ''}`"
      ></div>
    </div>
    <div
      class="progress-bar__underscale"
      :style="`width: ${rightCoord}px`"
    >
      <div class="progress-bar__underscale__number">
        {{ coloredCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  allCount: number;
  coloredCount: number;
}>()

const bar = ref<HTMLElement | null>(null) 
const rightCoord = ref<number>(10)

watch(props, () => {
  const barWidth = bar.value?.clientWidth
  const coloredPartWidth = Math.floor(barWidth! / props.allCount) * props.coloredCount
  rightCoord.value = coloredPartWidth
})
</script>

<style scoped lang="scss">
.progress-bar {
  &__upperscale {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    line-height: 20px;
  }
  &__underscale {
    font-weight: 700;
    line-height: 20px;
    position: relative;
    &__number {
      position: absolute;
      right: 0;
    }
  }
  &__bar {
    position: relative;
    margin-top: 3px;
    height: 12px;
    background: #F7F7F7;
    border-radius: 12px;
    display: flex;
    overflow: hidden;
    &__inner {
      width: 100%;
      &_colored {
        background: #3300FF;
      }
      &_rounded {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
    
  }
}
</style>