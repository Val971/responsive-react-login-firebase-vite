import { Card, Button } from "antd";

import { useUserAuth } from "../context/UserAuthContext";

export default function Home() {
  const { logOut,user }: any = useUserAuth();

  const onLogOut = async () => {
    try {
      await logOut(user);
    } catch (err: any) {
      console.log("onLogOut error:", err);
    }
  };

  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
      >
        {user && `welcome ${user.displayName}`}
        <br/>
        <br/>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={onLogOut}
        >
          Log out
        </Button>
      </Card>
    </div>
  );
}
