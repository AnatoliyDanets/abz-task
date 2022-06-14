import s from "./SectionTitle.module.scss";

export default function SectionTitle({ title }) {
  return <h2 className={s.title}>{title}</h2>;
}
