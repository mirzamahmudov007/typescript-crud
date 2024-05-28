export type CallbackResponse = {
  userInfo: {
    id: string,
    full_name: string
    role: string
  }
  accessToken: string
  refreshToken: string
}
