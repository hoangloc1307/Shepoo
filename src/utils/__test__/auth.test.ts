import { User } from 'src/types/user.type'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRhZDE5NmQ3YzYyMDM0MDg1MTBmOSIsImVtYWlsIjoiaG9hbmdsb2MxMzA3QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDItMjJUMDE6MzU6MTkuMTUyWiIsImlhdCI6MTY3NzAyOTcxOSwiZXhwIjoxNjc3MDI5NzI5fQ.uzgA8tgmzCZvW1PGkvfXwQyKUzAzUZkpucURp10X93Q'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRhZDE5NmQ3YzYyMDM0MDg1MTBmOSIsImVtYWlsIjoiaG9hbmdsb2MxMzA3QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDItMjJUMDE6MzU6MTkuMTUyWiIsImlhdCI6MTY3NzAyOTcxOSwiZXhwIjoxNjc3MDMzMzE5fQ.g7T74PTh77WUQDNIH5czqwYLwRnW9jhiNi0RP208b_8'

const user: User = {
  _id: '63e4ad196d7c6203408510f9',
  roles: ['User'],
  email: 'hoangloc1307@gmail.com',
  createdAt: '2023-02-09T08:21:45.971Z',
  updatedAt: '2023-02-20T08:45:34.562Z',
  address: 'Đồng Nai',
  date_of_birth: '1999-07-12T17:00:00.000Z',
  name: 'Lộc Đẹp Trai',
  phone: '0375367605',
  avatar: '9c028dba-8dd5-4292-95fc-b9023625cd22.png',
}

beforeEach(() => {
  localStorage.clear()
})

describe('AccessToken', () => {
  it('access_token phải được lưu vào localStorage', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenFromLocalStorage()).toBe(access_token)
  })
})

describe('RefreshToken', () => {
  it('refresh_token phải được lưu vào localStorage', () => {
    setRefreshTokenToLocalStorage(refresh_token)
    expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token)
  })
})

describe('clearLocalStorage', () => {
  it('refresh_token, access_token, profile phải được xóa khỏi localStorage', () => {
    setAccessTokenToLocalStorage(access_token)
    setRefreshTokenToLocalStorage(refresh_token)
    setProfileToLocalStorage(user)
    clearLocalStorage()
    expect(localStorage.getItem('refresh_token')).toBe(null)
    expect(localStorage.getItem('access_token')).toBe(null)
    expect(localStorage.getItem('profile')).toBe(null)
  })
})
