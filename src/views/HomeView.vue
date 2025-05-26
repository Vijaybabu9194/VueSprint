<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useQuery } from '@/composables/fetch.ts'
import { useLocalStorage } from '@/composables/storage.ts'

const getTodosData = () =>
  axios.get('https://dummyjson.com/todos').then((res: any) => res.data.todos)

const { data, error, isLoading, refetch } = useQuery('users', getTodosData)
const counter = useLocalStorage<number>('my-counter', 0)

// const counter = ref(0)
function increment() {
  counter.value++
}

//
// const loading = ref(false)
// const data = ref<any[]>([])
// const error = ref<string | null>(null)
//
// const getTodos = async () => {
//   loading.value = true
//   // error.value = null
//   return axios
//     .get('https://dummyjson.com/todos')
//     .then((res: any) => res.data.todos)
//     .catch((error) => {
//       throw new Error('Failed to fetch todos');
//     })
//     .finally(() => {
//       loading.value = false
//     })
// }

onMounted(async () => {
  // data.value = await getTodos().catch((err) => error.value = err.message)
})
</script>

<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <button @click="increment">Increment</button>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <ul v-else>
    <li v-for="d in data">
      <div v-if="d.completed">
        <strong>{{ d.todo }}</strong>
      </div>
      <div v-else>
        {{ d.todo }}
      </div>
    </li>
  </ul>
</template>
