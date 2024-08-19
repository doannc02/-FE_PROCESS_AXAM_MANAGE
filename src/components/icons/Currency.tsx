import Image from 'next/image'
import { RED } from '@/helper/colors'

const useCurrency = ({
  height = 15,
  width = 15,
}: {
  height?: number
  width?: number
}) => {
  const currencyList = [
    {
      name: 'VND',
      id: 'VND',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/vnd_c.svg')}
          color={RED}
        />
      ),
    },
    {
      name: 'Bolivia',
      id: 'Bolivia',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/bolivia_c.svg')}
        />
      ),
    },
    {
      name: 'Uruguay Peso',
      id: 'UruguayPeso',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/uruguay_peso_c.svg')}
        />
      ),
    },
    {
      name: 'Zimbabwe Dollar',
      id: 'ZimbabweDollar',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/zimbabwe_dollar_c.svg')}
        />
      ),
    },
    {
      name: 'Won',
      id: 'Won',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/won_c.svg')}
        />
      ),
    },
    {
      name: 'Shilling Somalia',
      id: 'ShillingSomalia',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/shilling_somalia_c.svg')}
        />
      ),
    },
    {
      name: 'Lek',
      id: 'Lek',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/lek_c.svg')}
        />
      ),
    },
    {
      name: 'Belize Dollar',
      id: 'BelizeDollar',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/belize_dollar_c.svg')}
        />
      ),
    },
    {
      name: 'Kip',
      id: 'Kip',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/kip_c.svg')}
        />
      ),
    },
    {
      name: 'Kroon',
      id: 'Kroon',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/kroon_c.svg')}
        />
      ),
    },
    {
      name: 'PhilippinesPeso',
      id: 'PhilippinesPeso',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/philippines_peso_c.svg')}
        />
      ),
    },
    {
      name: 'Rupiah',
      id: 'Rupiah',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/rupiah_c.svg')}
        />
      ),
    },
    {
      name: 'Lev',
      id: 'Lev',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/lev_c.svg')}
        />
      ),
    },
    {
      name: 'Guarani',
      id: 'Guarani',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/guarani_c.svg')}
        />
      ),
    },
    {
      name: 'Dollar',
      id: 'Dollar',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/dollar_c.svg')}
        />
      ),
    },
    {
      name: 'Cedis',
      id: 'Cedis',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/cedis_c.svg')}
        />
      ),
    },
    {
      name: 'Lempira',
      id: 'Lempira',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/lempira_c.svg')}
        />
      ),
    },
    {
      name: 'Som',
      id: 'Som',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/som_c.svg')}
        />
      ),
    },
    {
      name: 'Sweden Krona',
      id: 'SwedenKrona',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/sweden_krona_c.svg')}
        />
      ),
    },
    {
      name: 'Baht',
      id: 'Baht',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/baht_c.svg')}
        />
      ),
    },
    {
      name: 'Ringgit',
      id: 'Ringgit',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/ringgit_c.svg')}
        />
      ),
    },
    {
      name: 'Euro',
      id: 'Euro',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/euro_c.svg')}
        />
      ),
    },
    {
      name: 'Leu',
      id: 'Leu',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/leu_c.svg')}
        />
      ),
    },
    {
      name: 'Cuba Peso',
      id: 'CubaPeso',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/cuba_peso_c.svg')}
        />
      ),
    },
    {
      name: 'Nepal Rupee',
      id: 'NepalRupee',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/nepal_rupee_c.svg')}
        />
      ),
    },
    {
      name: 'Azerbaijan',
      id: 'Azerbaijan',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/azerbaijan_c.svg')}
        />
      ),
    },
    {
      name: 'Yen',
      id: 'Yen',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/yen_c.svg')}
        />
      ),
    },
    {
      name: 'Rial',
      id: 'Rial',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/iran_rial_c.svg')}
        />
      ),
    },
    {
      name: 'SaudiArabia Riyal',
      id: 'SaudiArabiaRiyal',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/saudi_arabia_riyal_c.svg')}
        />
      ),
    },
    {
      name: 'Qatar Riyal',
      id: 'QatarRiyal',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/qatar_riyal_c.svg')}
        />
      ),
    },
    {
      name: 'Pakistan Rupee',
      id: 'PakistanRupee',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/pakistan_rupee_c.svg')}
        />
      ),
    },
    {
      name: 'Tenge',
      id: 'Tenge',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/tenge_c.svg')}
        />
      ),
    },
    {
      name: 'Hryvna',
      id: 'Hryvna',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/tenge_c.svg')}
        />
      ),
    },
    {
      name: 'Skekel',
      id: 'Skekel',
      // icon: <IsraelIcon style={{ width: 20, height: 20 }} />,
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/shekel_c.svg')}
        />
      ),
    },
    {
      name: 'Afghani',
      id: 'Afghani',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/afghani_c.svg')}
        />
      ),
    },
    {
      name: 'Yemen Rial',
      id: 'YemenRial',
      icon: (
        <Image
          width={width}
          height={height}
          alt=''
          src={require('@/assets/svg/currency/yemen_rial_c.svg')}
        />
      ),
    },
  ]
  return { currencyList }
}

export default useCurrency
