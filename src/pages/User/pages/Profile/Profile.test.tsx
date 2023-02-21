import { waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { access_token } from 'src/msw/auth.msw'
import { setAccessTokenToLocalStorage } from 'src/utils/auth'
import { renderWithRouter } from 'src/utils/test'
import { describe, expect, test } from 'vitest'

describe('Profile', () => {
  test('Hiển thi trang profile', async () => {
    setAccessTokenToLocalStorage(access_token)
    const { container } = renderWithRouter({ route: path.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe(
        'Trần Nguyễn Hoàng Lộc',
      )
    })
  })
})
