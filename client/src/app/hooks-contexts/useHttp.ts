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

export const useHttp = <TFunc extends (...args: any[]) => any>(
  action: TFunc
) => {
  type TArgs = Parameters<TFunc>
  type TResult = ReturnType<TFunc>
  const [state, setState] = useState<State<TResult>>(initialState)

  const fn = async (...args: TArgs) => {
    setState({ fetching: true, error: null, result: null })
    try {
      const result = await action(...args)
      setState({ fetching: false, error: null, result })
      return
    } catch (e) {
      setState({ fetching: false, error: e.message, result: null })
    }
  }

  return {
    ...state,
    fn
  }
}
// export const useHttp = <TResult>(action: (...args: any[]) => TResult) => {
//   const [state, setState] = useState<State<TResult>>(initialState)

//   const fn = async (args: Parameters<typeof action>) => {
//     setState({ fetching: true, error: null, result: null })
//     try {
//       const result = await action(...args)
//       setState({ fetching: false, error: null, result })
//       return
//     } catch (e) {
//       setState({ fetching: false, error: e.message, result: null })
//     }
//   }

//   return {
//     ...state,
//     fn
//   }
// }
