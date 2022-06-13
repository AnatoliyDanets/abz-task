import s from './Main.module.scss'
export default function Main({children}) {
    return(
        <main className={s.main}>{children}</main>
    )
}