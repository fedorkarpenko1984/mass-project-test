<template>
  <div class="radio-buttons">
    <div
      v-for="btnLabel in labels"
      :key="btnLabel"
      class="radio-button"
    >
      <div
        class="radio-button__btn"
        :class="
          btnLabel !== choosenAnswer
          ? 'radio-button__btn_default'
          : 'radio-button__btn_choosen'"
        @click="chooseAnswer(btnLabel)"
      ></div>
      <div class="radio-button__label">{{ btnLabel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  labels: string[]
}>()

const choosenAnswer = ref<string>('')
  watch(props, () => {
  choosenAnswer.value = ''
})

const emit = defineEmits<{
  (e: 'answer', answer: string): void
}>()

function chooseAnswer(answer: string) {
  if (!!choosenAnswer.value) return
  choosenAnswer.value = answer;
  setTimeout(() => emit('answer', answer), 1000)
}
</script>

<style scoped lang="scss">

.radio-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.radio-button {
  display: flex;
  gap: 20px;
  &__btn {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    box-sizing: border-box;
    flex-shrink: 0;
    &_default {
      border: 1px solid black;
    }
    &_choosen {
      border: 1px solid #3300FF;
      background: #3300FF;
    }
  }
}
</style>