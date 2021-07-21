import { Button } from "antd";
import { useAuthContext } from "../../contexts/authorize";

export const DebugLogin = () => {
  const { __debug_login__ } = useAuthContext();

  return (
    <Button type={"default"} onClick={() => __debug_login__()}>
      DEBUG: login without authorization
    </Button>
  );
};
