import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { renderWithRouter } from 'src/utils/test'
import { beforeAll, describe, expect, test } from 'vitest'

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[name=email]') as HTMLInputElement
    passwordInput = document.querySelector('form input[name=password]') as HTMLInputElement
    submitButton = document.querySelector('form button[type=submit]') as HTMLButtonElement
  })

  test('Hiển thị lỗi required khi không nhập gì', async () => {
    fireEvent.submit(submitButton)
    await waitFor(async () => {
      expect(screen.getByText(/Email là bắt buộc/i)).toBeInTheDocument()
      expect(screen.getByText(/Password là bắt buộc/i)).toBeInTheDocument()
    })
  })

  test('Hiển thị lỗi khi nhập không đúng định dạng', async () => {
    fireEvent.input(emailInput, {
      target: {
        value: 'hoangloc1307',
      },
    })
    fireEvent.input(passwordInput, {
      target: {
        value: '123',
      },
    })
    fireEvent.submit(submitButton)
    await waitFor(async () => {
      expect(screen.getByText(/Email không đúng định dạng/i)).toBeInTheDocument()
      expect(screen.getByText(/Password tối thiểu 6 ký tự/i)).toBeInTheDocument()
    })
  })

  test('Không hiển thị lỗi khi nhập đúng định dạng', async () => {
    fireEvent.input(emailInput, {
      target: {
        value: 'hoangloc1307@gmail.com',
      },
    })
    fireEvent.input(passwordInput, {
      target: {
        value: '123456',
      },
    })
    await waitFor(async () => {
      expect(screen.queryByText(/Email không đúng định dạng/i)).toBeNull()
      expect(screen.queryByText(/Password tối thiểu 6 ký tự/i)).toBeNull()
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.title).toBe('Trang chủ | Shepoo')
    })
  })
})
