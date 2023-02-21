import { HttpStatusCode } from 'axios'
import { rest } from 'msw'
import config from 'src/constants/config'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '636f935e5fdc5f037e6f68d3',
    roles: ['User'],
    email: 'd3@gmail.com',
    createdAt: '2022-11-12T12:36:46.282Z',
    updatedAt: '2022-12-02T07:57:45.069Z',
    avatar: 'a59b50bf-511c-4603-ae90-3ccc63d373a9.png',
    name: 'Trần Nguyễn Hoàng Lộc',
  },
}

const unauthorizedRes = {
  message: 'Lỗi',
  data: {
    message: 'Token hết hạn',
    name: 'EXPIRED_TOKEN',
  },
}

const profileRequest = rest.get(`${config.baseURL}/me`, (req, res, ctx) => {
  const access_token = req.headers.get('Authorization')
  if (access_token === access_token_1s) {
    return res(ctx.status(HttpStatusCode.Unauthorized), ctx.json(unauthorizedRes))
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [profileRequest]

export default userRequests
