<template>
  <div class="test-quiz">
    <h3>{{ question.question }}</h3>
    <RadioButtons
      :labels="shuffledAnswers"
      class="test-quiz__radio-buttons"
      @answer="choosenAnswerHandler($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TQuestion } from '../types'
import { shuffleArray } from '../utils'
import RadioButtons from './RadioButtons.vue'
import { useTestStore } from '../stores/testStore'

const testStore = useTestStore()

const props = defineProps<{
  question: TQuestion
}>()

const emit = defineEmits<{
  (e: 'answer:given'): void
}>()

const shuffledAnswers = computed<string[]>(() => {
  return shuffleArray<string>([...props.question.answers, props.question.correct_answer])
})

function choosenAnswerHandler(answer: string) {
  const answeredQuestion: TQuestion = {...props.question, answers: [answer]}
  testStore.answeredQuestions.push(answeredQuestion)
  emit('answer:given')
}
</script>

<style scoped lang="scss">
.test-quiz {
  width: 886px;
  min-height: 528px;
  border-radius: 20px;
  background: #F7F7F7;
  padding: 40px;
  box-sizing: border-box;

  &__radio-buttons {
    margin-top: 20px;
  }
}
</style>