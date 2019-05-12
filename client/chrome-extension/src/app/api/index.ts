import { getHeaders } from '../helpers/getHeaders'
import axios from 'axios'

export const getApi = async <TResponse>(url: string) => {
  const headers = await getHeaders()
  return axios.get<TResponse>(url, headers)
}
export const postApi = async <TResponse>(url: string, input: any) => {
  const headers = await getHeaders()
  return axios.post<TResponse>(url, input, headers)
}

export const putApi = async <TResponse>(url: string, input: any) => {
  const headers = await getHeaders()
  return axios.put<TResponse>(url, input, headers)
}

export const deleteApi = async (url: string) => {
  const headers = await getHeaders()
  await axios.delete(url, headers)
}
