<template>
  <div class="test-result">
    <h1>{{ title }}</h1>
    <div
      class="test-result__text"
      v-html="text"
    ></div>
    <div class="test-result__answers">
      <AnswerCard
        v-for="answeredQuestion in testStore.answeredQuestions"
        :key="answeredQuestion.question"
        :question="answeredQuestion.question"
        :answer="answeredQuestion.answers[0]"
        :is-correct="answeredQuestion.answers[0] === answeredQuestion.correct_answer"
      />
    </div>
    <div class="test-result__repeat-test-btn-wrapper">
      <AppButton
        v-if="rightAnswers !== testStore.questions.length"
        @click="goToTestPage"
      >
        Пройти еще раз
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/testStore'
import { getQuestionWordWithCorrectSuffix } from '../utils'
import AnswerCard from '../ui/AnswerCard.vue'
import AppButton from '../ui/AppButton.vue'

const testStore = useTestStore()
const router = useRouter()

const title = ref<string>('Поздравляем!')
const text = ref<string>('Вы правильно ответили на все вопросы.<br>Вы действительно отлично разбираетесь в IT.')
const rightAnswers = ref<number>(0)

onMounted(() => {
  rightAnswers.value = testStore.answeredQuestions.reduce(
    (acc, current) => {
      return acc + Number(current.correct_answer === current.answers[0])
    }, 0)
  
  if (rightAnswers.value === 0) {
    title.value = 'Упс :('
    text.value = 'Вы неправильно ответили на все вопросы.<br>Нужно подучить теорию.'
  } else if (rightAnswers.value < testStore.answeredQuestions.length) {
    title.value = 'Хороший результат!'
    text.value = `Вы ответили правильно на ${rightAnswers.value} ${getQuestionWordWithCorrectSuffix(rightAnswers.value)}.<br>Так держать!`
  }
})

function goToTestPage() {
  testStore.answeredQuestions = []
  router.push('/test')
}
</script>

<style scoped lang="scss">
.test-result {
  padding: 80px 0 100px;
  width: 886px;
  margin: 0 auto;
  &__text {
    font-size: 24px;
    line-height: 34px;
    margin-top: 20px;
  }
  &__answers {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }
  &__repeat-test-btn-wrapper {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>