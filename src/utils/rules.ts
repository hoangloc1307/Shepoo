import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .oneOf([yup.ref(refString)], 'Nhập lại password không đúng')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Email tối thiểu 5 ký tự')
    .max(160, 'Email tối đa 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Password tối thiểu 6 ký tự')
    .max(160, 'Password tối đa 160 ký tự'),
  confirm_password: handleConfirmPassword('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax,
  }),
  name: yup.string().trim().required(),
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 10 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPassword('new_password'),
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>
