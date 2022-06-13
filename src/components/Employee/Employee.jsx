import defaultImage from '../../images/employees/defaultImage.jpg'
import s from "./Employee.module.scss";

export default function Employee({ id, title, text, email,tel, photo=defaultImage }) {

  return (
    <li key={id} className={s.employee__item}>
        <div  className={s.employee__card}>
        <img src={photo ?? defaultImage} className={s.employee__image} alt={title} />
        <h3 className={s.employee__title}>{title}</h3>
        <p className={s.employee__text}>{text}</p>
        <a data-title={email} href={`mailto:${email}`} className={s.employee__link}>{email}</a>
        <a data-title={tel} href={`tel:${tel}`} className={s.employee__link}>{tel}</a>
        </div>
    </li>
  );
}