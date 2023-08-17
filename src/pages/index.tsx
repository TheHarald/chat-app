import Button from "@/components/button/button";
import Notification from "@/components/notification/notification";
import Wrapper from "@/components/wrapper/wrapper";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { AUTHORIZATION_CHECK_AUTH } from "@/modules/authorization/authorization-constants";
import { authorizationisAuthorizedSelector } from "@/modules/authorization/authorization-selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  const isAuthorized = useSelector(authorizationisAuthorizedSelector);
  const isLoading = useSelector(authorizationisAuthorizedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: AUTHORIZATION_CHECK_AUTH,
    });

    // if (!isLoading && !isAuthorized) {
    //   push("/login");
    // }
  }, []);

  return (
    <div>
      <Wrapper>
        <Button isLoading text="some" onClick={() => {}} />
        <span>asd</span>
      </Wrapper>
    </div>
  );
}
