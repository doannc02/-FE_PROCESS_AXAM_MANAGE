import Image from 'next/image'
import styles from './styles.module.css'

const CoreLoading = () => {
  return (
    <div className='flex flex-col w-full items-center gap-4'>
      <div className={styles.loader}>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__ball}></div>
      </div>

      <Image
        alt=''
        src={require('@/assets/svg/layout1/logo-apus.svg')}
        height={40}
        width={112}
      />
    </div>
  )
}

export default CoreLoading
