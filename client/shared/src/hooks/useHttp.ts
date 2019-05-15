import { useState } from 'react'

const initialState = {
  fetching: false,
  error: null,
  result: null
}

interface State<TResult> {
  fetching: boolean
  error: string | null
  result: TResult | null
}

type UnPromise<T> = T extends Promise<infer U> ? U : T

export const useHttp = <TFunc extends (...args: any[]) => any>(
  action: TFunc
) => {
  type TArgs = Parameters<TFunc>
  type TResult = UnPromise<ReturnType<TFunc>>

  const [state, setState] = useState<State<TResult>>(initialState)

  const fn = async (...args: TArgs) => {
    setState({ fetching: true, error: null, result: null })
    try {
      const result: TResult = await action(...args)
      setState({ fetching: false, error: null, result })
      return result
    } catch (e) {
      setState({ fetching: false, error: e.message, result: null })
      return
    }
  }

  return {
    ...state,
    fn
  }
}
