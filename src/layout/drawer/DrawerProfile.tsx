import logoMini from '@/assets/svg/logo-mini.svg'

function DrawerProfile() {
  return (
    <div className="h-16 mt-2 text-4xl font-bold text-center cursor-pointer overflow-hidden px-12 py-2 sm:px-6">
      <div className="flex items-center">
        <img src={logoMini} width={70} height={58} />
        <span className="text-2xl font-bold text-nowrap uppercase	">
          <span style={{ color: '#1677ff' }}>Geo</span> smart
        </span>
      </div>
    </div>
  )
}

export default DrawerProfile
