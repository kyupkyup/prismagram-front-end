import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => { 
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: username.value,
      firstName: firstname.value,
      lastName: lastname.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email : email.value,
      secret : secret.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You don't have account, create one.");
            setTimeout(() => setAction("signUp"), 2000);
          }
          else{
            console.log(requestSecret);
            toast.success("Check your inbox for your login secret");
            setAction("confirm");
          }
        } catch {
          toast.error("Could not complete this action. try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstname.value !== "" &&
        lastname.value !== ""
      ) {
        try {
          const createAccount = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정을 생성할 수 없습니다. 다시 시도해주세요. ");
          } else {
            toast.success("계정이 생성되었습니다! 로그인 해주세요.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch {
          toast.error("계정을 생성할 수 없습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("All fields are required");
      }
    }else if(action === "confirm"){
       if(secret.value !== ""){
         try{
             const {data : {confirmSecret}} = await confirmSecretMutation();
         }
         catch{
          toast.error("Can't confirm secret");
         }
       }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      secret = {secret}
      onSubmit={onSubmit}
    />
  );
};
