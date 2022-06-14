import { ReactComponent as UserResolve } from "../../images/icon/successImage.svg";
import { Section } from "../Section/Section";
import SectionTitle from "../SectionTitle/SectionTitle";
import s from "./UserSuccess.module.scss";

export default function UserSuccess({ type, onClick }) {
  return (
    <Section className={s.success}>
      <SectionTitle title={"User successfully registered"} />
      <UserResolve />
      <button type={type} onClick={onClick} className={s.success__btn}>
        {"OK"}
      </button>
    </Section>
  );
}
