export type CallbackResponse = {
  userInfo: {
    id: string
    full_name: string
    role: string
  }
  access_token: string
  refresh_token: string
}
