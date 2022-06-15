import { useEffect, useState, useCallback } from "react";
import Section from "../Section";
import Container from "../Container";
import SectionTitle from "../SectionTitle";
import ButtonsAuth from "../ButtonsAuth";
import Loader from "../Loader";
import { getUsers } from "../../services/fetch-api";
import loadable from "@loadable/component";
import s from "./Employees.module.scss";

const Employee = loadable(() => import("../Employee"));
const SectionAddEmployees = loadable(() => import("../SectionAddEmployees"));

export default function Employees() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(2);
  const [hidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);

  const fetchApi = useCallback(() => {
    getUsers(1)
      .then((data) => {
        setShow(false);
        setUsers(data.users);
        setTotalPages(data.total_pages);
        setPage(2);
      })
      .catch((error) => console.log(error))
      .finally(setShow(true));
  }, []);

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  const getNextUsers = useCallback(() => {
    if (page === totalPages) {
      setHidden(false);
    }
    setPage((prev) => prev + 1);
    getUsers(page)
      .then((data) => {
        setShow(false);
        setUsers((prev) => [...prev, ...data.users]);
      })
      .catch((error) => console.log(error))
      .finally(setShow(true));
  }, [page, totalPages]);
  return (
    <>
      <Section className={s.employees}>
        <Container color={{ backgroundColor: "#f8f8f8" }}>
          <SectionTitle title={"Working with GET request"} />
          <ul className={s.employees__list}>
            {show && <Loader />}
            {users
              .sort(
                (a, b) => b.registration_timestamp - a.registration_timestamp
              )

              .map(({ id, name, position, email, phone, photo }) => (
                <Employee
                  key={id}
                  title={name}
                  text={position}
                  email={email}
                  tel={phone}
                  photo={photo}
                />
              ))}
          </ul>

          {hidden && (
            <ButtonsAuth
              width={{ width: "120px", margin: "0 auto" }}
              onClick={getNextUsers}
              children={"Show more"}
            />
          )}
        </Container>
      </Section>
      <SectionAddEmployees fetchApi={fetchApi} />
    </>
  );
}
