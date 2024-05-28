import { Tooltip, Drawer } from 'antd'
import { observer } from 'mobx-react-lite'
import { CheckOutlined } from '@ant-design/icons'
import { useStore } from '@/store/index'
import { useTranslation } from 'react-i18next'
import dark from '@/assets/icons/dark.svg'
import light from '@/assets/icons/light.svg'

type Props = {
  onSetting: () => void
  isSetting: boolean
}

function NavbarSettingDrawer({ onSetting, isSetting }: Props) {
  const { configStore } = useStore()
  const { t } = useTranslation()

  const themeList: Array<any> = [
    { uz_UZB_name: 'Dark style', en_US_name: 'Dark style', style: 'dark', icon: dark },
    { uz_UZB_name: 'Light style', en_US_name: 'Light style', style: 'light', icon: light }
  ]

  return (
    <Drawer width={280} placement="right" open={isSetting} onClose={onSetting} closable={false}>
      <div>
        <h3 className="text-gray-700 mb-2.5 font-semibold">{t('header.page_style')}</h3>
        <div className="flex">
          {themeList.map((item) => (
            <span
              className="relative w-12 h-10 mr-4 rounded cursor-pointer"
              key={item.style}
              onClick={() => configStore.switchStyle(item.style)}
            >
              <Tooltip
                title={item[configStore.locale + '_name']}
                color={configStore.theme.primaryColor + 'B3'}
                key={configStore.theme.primaryColor}
              >
                <img className="w-full h-full" src={item.icon} alt="" />
              </Tooltip>
              {configStore.themeStyle === item.style ? (
                <CheckOutlined
                  className="absolute right-2.5 bottom-2.5"
                  style={{ color: configStore.theme.primaryColor }}
                />
              ) : (
                ''
              )}
            </span>
          ))}
        </div>
      </div>
    </Drawer>
  )
}

export default observer(NavbarSettingDrawer)
