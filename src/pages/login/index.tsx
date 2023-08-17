import Button from "@/components/button/button";
import Input from "@/components/input/Input";
import Notification from "@/components/notification/notification";
import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  AUTORIZATION_NAME_CHANGE,
  AUTORIZATION_PASSWORD_CHANGE,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "@/modules/authorization/authorization-constants";
import {
  authorizationFormsSelector,
  authorizationisAuthorizedSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { SHOW_NOTIFICATION } from "@/modules/notifications/notification-constants";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
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
  const { name, password } = useSelector(authorizationFormsSelector);
  const isLoading = useSelector(authorizationisLoadingSelector);
  const isAuthorized = useSelector(authorizationisAuthorizedSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/api/check-auth");
    }
  }, [isAuthorized]);

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AUTORIZATION_NAME_CHANGE,
      name: e.target.value,
    });
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AUTORIZATION_PASSWORD_CHANGE,
      password: e.target.value,
    });
  };

  const resetPasswordHandler = () => {
    dispatch({
      type: AUTORIZATION_PASSWORD_CHANGE,
      password: "",
    });
  };
  const resetNameHandler = () => {
    dispatch({
      type: AUTORIZATION_NAME_CHANGE,
      name: "",
    });
  };

  const loginHandler = () => {
    dispatch({
      type: LOGIN_ACCOUNT_ACTION,
    });
  };

  const registerHandler = () => {
    dispatch({
      type: REGISTER_ACCOUNT_ACTION,
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
            label="Логин"
            value={name}
            placeholder="name"
            onChange={changeNameHandler}
            // onReset={resetNameHandler}
          />
          <Input
            label="Пароль"
            value={password}
            type="password"
            placeholder="password"
            onChange={changePasswordHandler}
            // onReset={resetPasswordHandler}
          />
        </StyledInputGroup>
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
