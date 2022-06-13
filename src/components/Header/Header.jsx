import s from "./Header.module.scss";
import { ReactComponent as Logo } from "../../images/icon/Group.svg";
import { ReactComponent as TextLogo } from "../../images/icon/TextLogo.svg";
import ButtonsAuth from "../ButtonsAuth/ButtonsAuth";
import Container from "../Container/Container";
export default function Header() {
  // const componentRef = useRef()
  // const { width, height } = useContainerDimensions(componentRef)

  return (
    <header className={s.header}>
      <Container color={{ backgroundColor: "#ffffff" }}>
        <div className={s.header__wrapper} >
      <div className={s.header__logo}>
        <Logo className={s.header__logo_icon} />
        <TextLogo /> 
      </div>
      <ul className={s.header__btns}>
        <li className={s.header__btns_item}>
          <ButtonsAuth width={{width:'100px'}} onClick={() => window.scrollTo(0, 1500)} children={"Users"} />
        </li>
        <li className={s.header__btns_item}>
          <ButtonsAuth width={{width:'100px'}}  onClick={() => window.scrollTo(0, 3000)} children={"Sign up"} />
        </li>
      </ul>
      </div>
      </Container>
    </header>
  );
}
