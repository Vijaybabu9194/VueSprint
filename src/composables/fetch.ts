import { type Ref, shallowRef, watchEffect } from 'vue'

type QueryResult<T> = {
  data: Ref<T | null>
  error: Ref<unknown>
  isLoading: Ref<boolean>
  refetch: () => Promise<void>
}

export function useQuery<T = unknown>(key: string, fetcher: () => Promise<T>): QueryResult<T> {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<unknown>(null)
  const isLoading = shallowRef<boolean>(false)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (err) {
      error.value = err
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchData().then()
  })

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  }
}
