import ReactTooltip from "react-tooltip";

import s from "./Employee.module.scss";

export default function Employee({ id, title, text, email, tel, photo }) {
  return (
    <li key={id} className={s.employee__card}>
      <img src={photo} className={s.employee__image} alt={title} />
      <h3 className={s.employee__title}>{title}</h3>
      <p className={s.employee__text}>{text}</p>
      <a data-tip={email} href={`mailto:${email}`} className={s.employee__link}>
        {email}
      </a>
      <a data-tip={tel} href={`tel:${tel}`} className={s.employee__link}>
        {tel}
      </a>
      <ReactTooltip
        className={s.employee__tooltip}
        place="bottom"
        effect="solid"
      />
    </li>
  );
}
