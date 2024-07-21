import React from "react";
import { Error, Input } from "../../Components";

function Form({ type = "login" }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passErr, setPassErr] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [formErr, setFormErr] = React.useState("");

  const [name, setName] = React.useState("");
  const [nameErr, setNameErr] = React.useState("");

  const minChars = 8;
  const maxChars = 64;
  const genErr = "Please fill all the fields!";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const refs = [
    React.useRef(null),
    React.useRef(null),
    type === "signup" ? React.useRef(null) : null,
  ];

  function onPassChange({ target }) {
    setPassword(target.value);
    setPassErr("");
    setFormErr("");
  }

  function onEmailChange({ target }) {
    setEmail(target.value);
    setEmailErr("");
    setFormErr("");
  }

  function onNameChange({ target }) {
    setName(target.value);
    setNameErr("");
    setFormErr("");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let isFormValid = true;

    for (let ref of refs) {
      if (ref && ref.current && ref.current.value === "") {
        ref.current.focus();
        setFormErr(genErr);
        isFormValid = false;
        break;
      }
    }
      const nameValid = type === "signup" ? nameValidation() : true;
      const emailValid = emailValidation();
      const passValid = passValidation();

      if (nameValid && emailValid && passValid) {
        console.log("Submitting started");
        // Add form submission logic here
    }
  };

  function passValidation() {
    if (password.length >= minChars && password.length <= maxChars) {
      return true;
    } else {
      setPassErr(`Password must be between ${minChars} and ${maxChars} characters.`);
      setFormErr(genErr);
      return false;
    }
  }

  function emailValidation() {
    const res = emailRegex.test(email);
    if (res) {
      return true;
    } else {
      setEmailErr("Please enter a valid email address!");
      setFormErr(genErr);
      return false;
    }
  }

  function nameValidation() {
    if (type === "signup") {
      if (name.trim() === "") {
        setNameErr("Please enter a valid name!");
        setFormErr(genErr);
        return false;
      }
      return true;
    }
    return true;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === "signup" ? (
          <Input
            type={"name"}
            value={name}
            ref={refs[2]}
            errMsg={nameErr}
            onChange={onNameChange}
            className_icon="text-1.2vw"
          />
        ) : null}

        <Input
          type={"email"}
          value={email}
          ref={type === "signup" ? refs[1] : refs[0]}
          errMsg={emailErr}
          onChange={onEmailChange}
          className_icon="text-1.2vw"
        />

        <Input
          type={"password"}
          value={password}
          ref={type === "signup" ? refs[2] : refs[1]}
          errMsg={passErr}
          onChange={onPassChange}
          className_icon="text-1.2vw"
        />
        <button type="submit">submit</button>
      </form>

      <Error errMsg={formErr} className="transition-all justify-center" />
    </div>
  );
}

export default Form;
