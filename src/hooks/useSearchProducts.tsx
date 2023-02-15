import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(nameSchema),
  })

  const onSubmitSearch = handleSubmit(data => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order'])
      : { ...queryConfig, name: data.name }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString(),
    })
  })

  return { register, onSubmitSearch }
}
