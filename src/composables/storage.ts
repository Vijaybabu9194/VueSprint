import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : initialValue) as Ref<T>


  watch(
    data,
    (val) => {
      console.log('callback function executed');
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: false },
  )

  return data
}
