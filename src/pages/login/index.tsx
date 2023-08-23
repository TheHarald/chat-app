import { Button, Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
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
import { useRouter } from "next/router";
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

  // useEffect(() => {
  //   if (isAuthorized) {
  //     router.push("/api/check-auth");
  //   }
  // }, [isAuthorized]);

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
      <Card>
        <CardBody className="p-4 flex flex-col gap-2 min-w-[320px]">
          <h1>Авторизация</h1>
          <StyledInputGroup>
            <Input
              label="Логин"
              value={name}
              placeholder="Введите логин"
              onChange={changeNameHandler}
            />
            <Input
              label="Пароль"
              value={password}
              type="password"
              placeholder="Введите пароль"
              onChange={changePasswordHandler}
            />
          </StyledInputGroup>
          <Button isLoading={isLoading} onClick={loginHandler} color="primary">
            Войти
          </Button>
          <Button
            isLoading={isLoading}
            onClick={registerHandler}
            color="primary"
          >
            Зергистрироваться
          </Button>
          <Button isLoading={isLoading} onClick={checkAuth} color="primary">
            Проверить авторизацию
          </Button>
        </CardBody>
      </Card>
    </StyledLoginPage>
  );
}
