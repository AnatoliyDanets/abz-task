import React from "react";
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal";
import UserSuccess from "../UserSuccess";
import ButtonsAuth from "../ButtonsAuth";
import { addUsers, getToken, getPositions } from "../../services/fetch-api";
import { Error } from "../Errors";
import s from "./SignUpForm.module.scss";

export default function SignUpForm({ fetchApi }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState([]);
  const [posId, setPosId] = useState(1);
  const [token, setToken] = useState("");
  const [load, setLoad] = useState("Upload your photo");
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [textError, setTextError] = useState("Invalid");
  const [errorEmail, setErrorEmail] = useState(false);
  const [textErrorEmail, setTextErrorEmail] = useState("Invalid");
  const [errorPhone, setErrorPhone] = useState(false);
  const [textErrorPhone, setTextErrorPhone] = useState("Invalid");
  const [errorPhoto, setErrorPhoto] = useState(false);
  const [textErrorPhoto, setTextErrorPhoto] = useState("Invalid");

  const photo = useRef();

  const toggleModal = () => {
    setModal((state) => !state);
  };

  const handleBlur = (e) => {
    const { name, validity } = e.target;
    switch (name) {
      case "name":
        if (validity.patternMismatch || validity.tooShort || validity.tooLong) {
          setErrorName(true);
          setTextError(
            Error.errorName(
              validity.tooShort,
              validity.tooLong,
              validity.patternMismatch
            )
          );
        } else {
          setErrorName(false);
        }
        break;
      case "email":
        if (validity.patternMismatch || validity.tooShort || validity.tooLong) {
          setErrorEmail(true);
          setTextErrorEmail(
            Error.errorEmail(
              validity.tooShort,
              validity.tooLong,
              validity.patternMismatch
            )
          );
        } else {
          setErrorEmail(false);
        }
        break;
      case "tel":
        if (validity.patternMismatch) {
          setErrorPhone(true);
          setTextErrorPhone(Error.errorPhone(validity.patternMismatch));
        } else {
          setErrorPhone(false);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value.trim());
        break;
      case "email":
        setEmail(value.trim());
        break;
      case "tel":
        setPhone(value.trim());
        break;
      default:
        break;
    }
  };

  const handleFileChange = () => {
    const arrStr = photo.current.files[0]?.name.split(".");
    if (arrStr) {
      const correctStrVisible = [
        ...arrStr[0]?.slice(0, 6),
        ".",
        ...arrStr[1],
      ].join("");
      setLoad(correctStrVisible ?? "Upload your photo");
    }

    const size = 5242880;

    if (photo.current.files[0]?.size > size) {
      setErrorPhoto(true);
      setTextErrorPhoto("The photo size must not be greater than 5 Mb");
      return;
    } else {
      setErrorPhoto(false);
    }

    if (photo.current.files[0]?.type !== "image/jpeg") {
      setErrorPhoto(true);
      setTextErrorPhoto("Only format jpeg");
      return;
    } else {
      setErrorPhoto(false);
    }

    const reader = new FileReader();

    //Read the contents of Image File.
    reader.readAsDataURL(photo.current.files[0]);
    reader.onload = function (e) {
      //Initiate the JavaScript Image object.
      const image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        const height = this.height;
        const width = this.width;
        if (height < 70 || width < 70) {
          setErrorPhoto(true);
          setTextErrorPhoto("Minimum size 70x70");
          return;
        } else {
          setErrorPhoto(false);
        }
      };
    };
  };

  useEffect(() => {
    setDisabled(
      !name ||
        !phone ||
        !email ||
        !posId ||
        load === "Upload your photo" ||
        errorEmail ||
        errorName ||
        errorPhone ||
        errorPhoto
    );
  }, [
    name,
    email,
    phone,
    posId,
    load,
    errorName,
    errorEmail,
    errorPhone,
    errorPhoto,
  ]);

  useEffect(() => {
    getToken()
      .then(({ token }) => setToken(token))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    getPositions()
      .then(({ positions }) => setPosition(positions))
      .catch((error) => console.log(error.message));
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPosId(1);
    setLoad("Upload your photo");
  };

  const addEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("position_id", posId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append(
      "photo",
      photo.current.files[0],
      photo.current.files[0].name
    );

    addUsers(formData, token)
      .then((res) => {
        if (res.status === 201) {
          setModal(true);
          fetchApi();
        }
      })
      .catch((error) => console.log(error.message));

    resetForm();
  };

  return (
    <>
      <form onSubmit={addEmployee} className={s.form}>
        <div className={s.form__wrapper}>
          <div className={s.form__inputs_wrapper}>
            <div className={s.form__input_wrapper}>
              {errorName && <span className={s.form__error}>{textError}</span>}
              <input
                type="text"
                className={s.form__input}
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                pattern="[a-zA-Z'-'\s]*"
                minLength={2}
                maxLength={60}
                style={{ marginBottom: "50px" }}
                required
              />
            </div>
            <div className={s.form__input_wrapper}>
              {errorEmail && (
                <span className={s.form__error}>{textErrorEmail}</span>
              )}
              <input
                type="email"
                name="email"
                className={s.form__input}
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                minLength={2}
                maxLength={100}
                style={{ marginBottom: "50px" }}
                required
              />
            </div>
            <div className={s.form__input_wrapper}>
              <div className={s.form__input_tel}>
                {errorPhone ? (
                  <span className={s.form__error_tel}>{textErrorPhone}</span>
                ) : (
                  <label className={s.form__label} name="tel">
                    +38 (XXX) XXX - XX - XX{" "}
                  </label>
                )}
                <input
                  type="tel"
                  name="tel"
                  value={phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={s.form__input}
                  placeholder="Phone"
                  pattern="^[\+]{0,1}380([0-9]{9})$"
                  required
                />
              </div>
            </div>
          </div>
          <div className={s.form__inputs_files}>
            <b className={s.form__radio_title}>Select your position</b>
            <ul className={s.form__radio_list}>
              {position.map((item) => (
                <li className={s.form__radio_item} key={item.id}>
                  <input
                    className={s.form__radio_input}
                    type="radio"
                    id={item.id}
                    name="position_id"
                    value={item.id}
                    onChange={() => setPosId(item.id)}
                    defaultChecked={item.id === 1}
                    required
                  />
                  <label className={s.form__radio_label} htmlFor={item.id}>
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
            <div className={s.form__input_wrapper}>
              {errorPhoto && (
                <span className={s.form__error_file}>{textErrorPhoto}</span>
              )}
              <div className={s.file}>
                <>
                  {errorPhoto ? (
                    <label
                      htmlFor="file-upload"
                      data-title={load}
                      className={s.form__file_error}
                    >
                      Upload
                    </label>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      data-title={load}
                      className={s.form__file_label}
                    >
                      Upload
                    </label>
                  )}
                  <input
                    name="photo"
                    type="file"
                    id="file-upload"
                    accept=".jpeg, .jpg"
                    ref={photo}
                    title="Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb."
                    className={s.form__input_file}
                    required
                    onChange={handleFileChange}
                  />
                </>
              </div>
            </div>
          </div>
        </div>
        <ButtonsAuth type={"submit"} disabled={disabled} children={"Sign up"} />
      </form>
      {modal && (
        <Modal onClose={toggleModal}>
          <UserSuccess type={"button"} onClick={toggleModal} />
        </Modal>
      )}
    </>
  );
}
