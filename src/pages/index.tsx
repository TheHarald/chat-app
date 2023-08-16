import Notification from "@/components/notification/notification";
import Wrapper from "@/components/wrapper/wrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    push("/login");
  }, []);

  return (
    <div>
      <Wrapper>
        <span>asd</span>
      </Wrapper>
    </div>
  );
}
