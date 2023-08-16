import Button from "@/components/button/button";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/loader";
import Notification from "@/components/notification/notification";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { SHOW_NOTIFICATION } from "@/modules/notifications/notification-constants";
import {
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "@/types/action-constants";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledAuthWrapper = styled.div`
  background: white;
  border: 1px solid #d7dbec;
  padding: 16px;
  border-radius: 8px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLoginPage = styled.div`
  display: flex;
  padding-top: 128px;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((s) => s.authorization.isLoading);

  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    if (name.length === 0 || password.length === 0) {
      dispatch({
        type: SHOW_NOTIFICATION,
        title: "Поля не должны быть пустыми",
      });
      return true;
    }
    return false;
  };

  const loginHandler = () => {
    if (validate()) {
      return;
    }
    dispatch({
      type: LOGIN_ACCOUNT_ACTION,
      password,
      name,
    });
  };

  const registerHandler = () => {
    if (validate()) {
      return;
    }
    dispatch({
      type: REGISTER_ACCOUNT_ACTION,
      password,
      name,
    });
  };

  const checkAuth = () => {
    router.push("/api/check-auth");
  };

  return (
    <StyledLoginPage>
      <StyledAuthWrapper>
        <h1>Авторизация</h1>
        <StyledInputGroup>
          <Input
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledInputGroup>
        {/* <Loader isLoading={isLoading} /> */}
        <Button isLoading={isLoading} onClick={loginHandler} text="Войти" />
        <Button
          isLoading={isLoading}
          onClick={registerHandler}
          text="Зергистрироваться"
        />
        <Button
          isLoading={isLoading}
          onClick={checkAuth}
          text="Проверить авторизацию"
        />
      </StyledAuthWrapper>
      <Notification />
    </StyledLoginPage>
  );
}
