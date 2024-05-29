import Styles from './Loader.module.css'

export function Loader() {
   return (
      <div className={Styles['loader-pizza']}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   )
}