const useForm = <T extends {}>(initialValue: T) => {

  const [values, setValues] = useState<T>(initialValue)
  const onChange = 
  return {
    values
  }

}
