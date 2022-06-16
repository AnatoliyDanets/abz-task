import { ReactComponent as Logo } from "../../images/icon/Group.svg";
import { ReactComponent as TextLogo } from "../../images/icon/TextLogo.svg";
import ButtonsAuth from "../ButtonsAuth";
import Container from "../Container";
import s from "./Header.module.scss";

export default function Header() {
  return (
    <header className={s.header}>
      <Container color={{ backgroundColor: "#ffffff" }}>
        <div className={s.header__wrapper}>
          <div className={s.header__logo}>
            <Logo className={s.header__logo_icon} />
            <TextLogo />
          </div>
          <ul className={s.header__btns}>
            <li className={s.header__btns_item}>
              <ButtonsAuth
                width={{ width: "100px" }}
                onClick={() =>
                  window.scrollTo(
                    0,
                    window.document.body.offsetHeight -
                      window.document.body.offsetHeight +
                      650
                  )
                }
                children={"Users"}
              />
            </li>
            <li className={s.header__btns_item}>
              <ButtonsAuth
                width={{ width: "100px" }}
                onClick={() =>
                  window.scrollTo(0, window.document.body.offsetHeight - 942)
                }
                children={"Sign up"}
              />
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
