import Section from "../Section";
import Container from "../Container";
import SectionTitle from "../SectionTitle";
import SignUpForm from "../SignUpForm";
import s from "./SectionAddEmployees.module.scss";

export default function SectionAddEmployees({ fetchApi }) {
  return (
    <Section className={s.addEmployee}>
      <Container color={{ backgroundColor: "#f8f8f8" }}>
        <SectionTitle title={"Working with POST request"} />
        <SignUpForm fetchApi={fetchApi} />
      </Container>
    </Section>
  );
}
