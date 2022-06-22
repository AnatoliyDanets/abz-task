import ReactTooltip from "react-tooltip";
import { CorrectString } from "../CorrectString";
import s from "./Employee.module.scss";

export default function Employee({ id, title, text, email, tel, photo }) {

  return (
    <li key={id} className={s.employee}>
      <article className={s.employee__card}>
      <img src={photo} className={s.employee__image} alt={title} />
      <h3 className={s.employee__title}>{CorrectString(title)}</h3>
      <p className={s.employee__text}>{CorrectString(text)}</p>
      <a data-tip={email} href={`mailto:${email}`} className={s.employee__link}>
        {CorrectString(email)}
      </a>
      <a data-tip={tel} href={`tel:${tel}`} className={s.employee__link}>
        {tel}
      </a>
      <ReactTooltip
        className={s.employee__tooltip}
        place="bottom"
        effect="solid"
      />
      </article>
    </li>
  );
}
