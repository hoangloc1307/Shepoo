import { screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import path from './constants/path'
import { renderWithRouter } from './utils/test'

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()
    await waitFor(() => {
      expect(document.title).toBe('Trang chủ | Shepoo')
    })
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.getByText(/Bạn chưa có tài khoản?/i)).toBeInTheDocument()
    })
  })

  test('Về trang not found', async () => {
    const badRoute = '/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
  })

  test('Render trang register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
