import { HttpStatusCode } from 'axios'
import { access_token_1s, refresh_token_1000days } from 'src/msw/auth.msw'
import { beforeEach, describe, expect, it } from 'vitest'
import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '../auth'
import { Http } from '../http'

describe('Http Axios', () => {
  let http = new Http().instance

  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  it('Gọi API', async () => {
    const res = await http.get('/products')
    expect(res.status).toBe(HttpStatusCode.Ok)
    expect(res.data.message).toBe('Lấy các sản phẩm thành công')
  })

  it('Auth request', async () => {
    await http.post('/login', {
      email: 'hoangloc1307@gmail.com',
      password: '123456',
    })
    const res = await http.get('/me')
    expect(res.status).toBe(HttpStatusCode.Ok)
    expect(res.data.message).toBe('Lấy người dùng thành công')
  })

  it('Refresh Token', async () => {
    setAccessTokenToLocalStorage(access_token_1s)
    setRefreshTokenToLocalStorage(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('/me')
    expect(res.status).toBe(HttpStatusCode.Ok)
    expect(res.data.message).toBe('Lấy người dùng thành công')
  })
})
