<template>
  <div>
    <h2 v-if="shuffledQuestions.length === 0">Загрузка...</h2>
    <div v-else class="test">
      <h1>Тестирование</h1>
      <div class="test__quiz">
        <TestQuiz
          v-if="currentQuestion"
          :question="currentQuestion"
          @answer:given="testProcessingHelper"
        />
      </div>
      <ProgressBar
        :all-count="testStore.questions.length"
        :colored-count="progressBarColoredCount"
        class="test__progress-bar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/testStore'
import { shuffleArray } from '../utils'
import { TQuestion } from '../types'
import TestQuiz from '../components/TestQuiz.vue'
import ProgressBar from "../components/ProgressBar.vue"

const testStore = useTestStore()
const router = useRouter()

const shuffledQuestions = ref<TQuestion[]>([])
const currentQuestion = ref<TQuestion | null>({
  question: '',
  answers: [],
  correct_answer: ''
})
let currentQuestionIndex: number = 0;

onMounted(() => {
  getQuestions()
})

async function getQuestions() {
  await testStore.getQuestions()
  shuffledQuestions.value = shuffleArray<TQuestion>(testStore.questions)
  currentQuestion.value = shuffledQuestions.value[currentQuestionIndex]
}

function testProcessingHelper() {
  currentQuestionIndex++
  currentQuestion.value = shuffledQuestions.value[currentQuestionIndex]
  if (testStore.questions.length === testStore.answeredQuestions.length) {
    router.push('/test-results')
  }
}

const progressBarColoredCount = computed<number>(() => {
  return testStore.answeredQuestions.length
})

</script>

<style scoped lang="scss">
.test {
  padding-top: 82px;
  width: fit-content;
  margin: 0 auto;

  &__quiz {
    margin-top: 20px;
  }
  &__progress-bar {
    margin-top: 17px;
  }
}
</style>