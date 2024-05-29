import { useStore } from '@/store/index'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import logoMini from '@/assets/svg/logo.svg'

function SidebarProfile() {
  const { configStore } = useStore()
  const navigate = useNavigate()

  const backHome = () => navigate('/')

  return (
    <div className="px-2 pl-6 py-4 cursor-pointer overflow-hidden" onClick={backHome}>
      {configStore.collapsed ? (
        <img src={logoMini} width={40} />
      ) : (
        <div className="flex items-center gap-2">
          <img src={logoMini} width={40} />
          <span
            style={{ color: configStore.themeStyle === 'dark' ? 'white' : 'black' }}
            className="text-2xl font-bold text-nowrap uppercase	"
          >
            <span style={{ color: '#1A8BEE' }}>Geo</span> Smart
          </span>
        </div>
      )}
    </div>
  )
}

export default observer(SidebarProfile)
