import { defineStore } from "pinia"
import { ref } from "vue"
import type { TQuestion } from "../types"

export const useTestStore = defineStore('test', () => {
  const test_endpoint = 'https://662d45cea7dda1fa378a41f8.mockapi.io/api/v1/test'

  const questions = ref<TQuestion[]>([])
  const answeredQuestions = ref<TQuestion[]>([])

  async function getQuestions() {
    try {
      const response = await fetch(test_endpoint)
      if (response.status === 200) {
        questions.value = await response.json() as TQuestion[]
      } else {
        console.error('Ошибка загрузки данных. Код: ', response.status)
      }
    } catch (error) {
      console.error('Ошибка: ', error)
    }
  }

  return {
    questions,
    answeredQuestions,
    getQuestions
  }
})