import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '@/store'
import { getLoginCallBack } from '@/http'
import Loading from '@/components/loading'

function Callback() {
  const { basicStore } = useStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    getLoginCallBack(searchParams.get('code'))
      .then((data) => {
        basicStore.login(data)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate('/login', { replace: true })
        }
      })
  }, [])

  return <Loading />
}
export default observer(Callback)
