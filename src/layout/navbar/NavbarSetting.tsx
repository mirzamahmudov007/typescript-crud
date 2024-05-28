import { SettingOutlined } from '@ant-design/icons'
type Props = {
  onSetting: () => void
}

function NavbarSetting({ onSetting }: Props) {
  return (
    <div className="w-10 text-center cursor-pointer hover:bg-gray-100" onClick={onSetting}>
      <SettingOutlined className="text-base" />
    </div>
  )
}

export default NavbarSetting
