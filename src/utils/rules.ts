import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng',
    },
    minLength: {
      value: 5,
      message: 'Email tối thiểu 5 ký tự',
    },
    maxLength: {
      value: 160,
      message: 'Email tối đa 160 ký tự',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc',
    },
    minLength: {
      value: 6,
      message: 'Password tối thiểu 6 ký tự',
    },
    maxLength: {
      value: 160,
      message: 'Password tối đa 160 ký tự',
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc',
    },
    minLength: {
      value: 6,
      message: 'Nhập lại password tối thiểu 6 ký tự',
    },
    maxLength: {
      value: 160,
      message: 'Nhập lại password tối đa 160 ký tự',
    },
    validate:
      typeof getValues === 'function'
        ? value => value === getValues('password') || 'Nhập lại password không đúng'
        : undefined,
  },
})

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
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .oneOf([yup.ref('password')], 'Nhập lại password không đúng'),
})

export type Schema = yup.InferType<typeof schema>
