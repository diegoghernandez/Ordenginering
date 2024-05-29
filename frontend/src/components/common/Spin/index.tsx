import Styles from './Spin.module.css'

export function Spin() {
   return (
      <div role='alert' aria-busy='true' className={Styles['spin-loader']}></div>
   )
}