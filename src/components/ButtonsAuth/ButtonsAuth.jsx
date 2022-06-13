import s from "./ButtonsAuth.module.scss";

export default function ButtonsAuth({type, width, disabled, onClick,children}) {
  return (
    <>
      <button  type={type} disabled={disabled} style={width} onClick={onClick} className={s.btn}>{children}</button>
    </>
  );
}
