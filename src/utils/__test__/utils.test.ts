import { AxiosError, HttpStatusCode } from 'axios'
import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatNumberToSocialStyle,
  isAxiosError,
  isAxiosUnauthorizedError,
  isAxiosUnprocessableEntityError,
} from '../utils'

describe('isAxiosError', () => {
  it('Kiểm tra một error có phải là axios error', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('Kiểm tra một error có phải axios error và status là 422', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      ),
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      ),
    ).toBe(true)
  })
})

describe('isAxiosUnauthorizedError', () => {
  it('Kiểm tra một error có phải axios error và status là 401', () => {
    expect(isAxiosUnauthorizedError(new Error())).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      ),
    ).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
      ),
    ).toBe(true)
  })
})

describe('formatCurrency', () => {
  it('Format một số thành định dạng kiểu 2.590.000', () => {
    expect(formatCurrency(12)).toBe('12')
    expect(formatCurrency(123)).toBe('123')
    expect(formatCurrency(1234)).toBe('1.234')
    expect(formatCurrency(1234567)).toBe('1.234.567')
  })
})

describe('formatNumberToSocialStyle', () => {
  it('Format một số thành định dạng kiểu 6,7k', () => {
    expect(formatNumberToSocialStyle(12)).toBe('12')
    expect(formatNumberToSocialStyle(123)).toBe('123')
    expect(formatNumberToSocialStyle(1234)).toBe('1,2k')
    expect(formatNumberToSocialStyle(1255)).toBe('1,3k')
    expect(formatNumberToSocialStyle(1000000)).toBe('1m')
    expect(formatNumberToSocialStyle(1255000)).toBe('1,3m')
    expect(formatNumberToSocialStyle(1255000000)).toBe('1,3b')
  })
})
