import React from "react";
import { Input } from "..";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, setName, setUserName, setIsValidate } from "../../store/formSlice";

const  FormValidation=React.forwardRef(({ className='', type = "login"},formRef)=> {

  const [passErr, setPassErr] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [nameErr, setNameErr] = type=="signup"?React.useState(""):[];
  const [userNameErr, setUserNameErr] = type=="signup"?React.useState(""):[];
  const {name,password,email,userName} = useSelector((state)=>state.formData)

  const minChars = 8;
  const maxChars = 64;
  // const genErr = "Please fill all the fields properly !";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const userNameRegex = /^[a-zA-Z0-9_.-]+$/;
  

  const refs = [
    React.useRef(null),
    React.useRef(null),
    type == "signup" ? React.useRef(null) : null,
    type == "signup" ? React.useRef(null) : null,
  ];


  const dispatchChange = useDispatch()

  function onPassChange({ target }) {
    dispatchChange(setPassword(target.value));
    setPassErr("");
    // setFormErr("");
  }

  function onEmailChange({ target }) {
    dispatchChange(setEmail(target.value));
    setEmailErr("");
    // setFormErr("");
  }

  function onNameChange({ target }) {
    dispatchChange(setName(target.value));
    setNameErr("");
    // setFormErr("");
  }

  function onUserNameChange({ target }) {
    dispatchChange(setUserName(target.value));
    setUserNameErr("");
    // setForm
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let isFormValid = true;

    for (let ref of refs) {
      if (ref && ref.current && ref.current.value === "") {
        ref.current.focus();
        dispatchChange(setIsValidate(false))
        isFormValid = false;

        break;
      }
    }

    const nameValid = type === "signup" ? nameValidation() : true;
    const emailValid = emailValidation();
    const passValid = passValidation();
    const userNameValid = type === "signup" ? userNameValidation() : true;

    if (isFormValid && nameValid && emailValid && passValid && userNameValid) {
      ;
      dispatchChange(setIsValidate(true))
    }

    else{
      dispatchChange(setIsValidate(false))
    }
  };

  function passValidation() {
    if (password.length >= minChars && password.length <= maxChars) {
      return true;
    } else {
      setPassErr(`Password must be between ${minChars} and ${maxChars} characters.`);
      return false;
    }
  }

  function emailValidation() {
    const res = emailRegex.test(email);
    if (res) {
      return true;
    } else {
      setEmailErr("Please enter a valid email address!");
      return false;
    }
  }

  function nameValidation() {
    if (type === "signup") {
      if (name.trim() === "") {
        setNameErr("Please enter a valid name!");
        return false;
      }
      return true;
    }
    return true;
  }

  function userNameValidation() {
    if (type === "signup") {
      if (userNameRegex.test(userName)) {
        return true;
      } 
      if(userName.includes("@")){
        setUserNameErr("Username can not contain @");
        return false;
      }
      else {
        setUserNameErr("Username can only contain letters, numbers,and ( _ . -)");  
        return false;
      }
    }
    return true;
  }

  React.useEffect(()=>refs[0].current.focus(),[])

  return (
    <div className={` ${className}`}>
      <form onSubmit={handleSubmit} ref={formRef}>
        {type === "signup" ? (
          <Input
            type={"name"}
            value={name}
            ref={refs[0]}
            errMsg={nameErr}
            onChange={onNameChange}
            className_icon="text-1.2vw"
          />
        ) : null}

        {type === "signup" ? (
          <Input
            type={"userName"}
            value={userName}
            ref={refs[1]}
            errMsg={userNameErr}
            onChange={onUserNameChange}
            className_icon="text-1.2vw"
          />
        ) : null}

        <Input
          type={"email"}
          value={email}
          ref={type == "signup" ? refs[2] : refs[0]}
          errMsg={emailErr}
          onChange={onEmailChange}
          className_icon="text-1.2vw"
        />

        <Input
          type={"password"}
          value={password}
          ref={type === "signup" ? refs[3] : refs[1]}
          errMsg={passErr}
          onChange={onPassChange}
          className_icon="text-1.2vw"
        />
        <button  type="submit" className="btn-submit absolute top-0 left-0 h-0 w-0"></button>
      </form>

      
    </div>
  );
})

export default FormValidation;

