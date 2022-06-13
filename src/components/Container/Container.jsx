import s from './Container.module.scss'

export default function Container({ color,children}) {
    return(
        <div className={s.container} style={color}>{children}</div>
    )
}