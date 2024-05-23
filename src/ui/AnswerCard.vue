<template>
  <div
    class="answer-card"
    :class="isCorrect ? 'answer-card_right' : 'answer-card_wrong'"
  >
    <h4>{{ question }}</h4>
    <div class="answer-card__text">
      {{ answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: string;
  answer: string;
  isCorrect: boolean;
}>()
</script>

<style scoped lang="scss">
.answer-card {
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  width: 100%;
  &_right {
    background: #E5F5E1;
  }
  &_wrong {
    background: #FFE0E0;
  }
  &__text {
    margin-top: 16px;
  }
}
</style>