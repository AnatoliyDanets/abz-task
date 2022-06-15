import Section from "../Section";
import Container from "../Container";
import SectionTitle from "../SectionTitle";
import CreateForm from "../CreateForm";
import s from "./SectionAddEmployees.module.scss";

export default function SectionAddEmployees({ fetchApi }) {
  return (
    <Section className={s.addEmployee}>
      <Container color={{ backgroundColor: "#f8f8f8" }}>
        <SectionTitle title={"Working with POST request"} />
        <CreateForm fetchApi={fetchApi} />
      </Container>
    </Section>
  );
}
