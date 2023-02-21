import axios, { AxiosError } from 'axios'
import userImage from 'src/assets/images/user.svg'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { ErrorResponse } from 'src/types/utils.type'

export function isAxiosError(error: unknown): error is AxiosError {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

export function removeSpecialCharacter(str: string) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export function generateNameId(name: string, id: string) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

export function getIdFromNameId(nameId: string) {
  const arr = nameId.split('-i.')
  return arr[arr.length - 1]
}

export function getAvatarUrl(avatarName?: string) {
  return avatarName ? `${config.baseURL}/images/${avatarName}` : userImage
}
