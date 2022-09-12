import { Card, Spin } from "antd";
import { SiSpacemacs } from "react-icons/si";

import { useUserAuth } from "../context/UserAuthContext";
import Survey from "../components/Survey";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
  const { loading, mode }: any = useUserAuth();
  return (
    <Card
      style={{
        width: 300,
      }}
    >
      <div className="login-container">
        <SiSpacemacs size={50} />
        {mode === "forgot" && (
          <>
            <h3>Reset Password</h3>
            <p>Provide your email address to get a password reset link</p>
          </>
        )}
        {mode === "register" && (
          <>
            <h3>Sing Up</h3>
            <p>Hey, enter your details to get sign in to your new account</p>
          </>
        )}
        {mode === "login" && (
          <>
            <h3>Sing In</h3>
            <p>Hey, enter your details to get sign in to your account</p>
          </>
        )}
        {loading ? (
          <Spin />
        ) : mode === "forgot" ? (
          <ForgotPassword />
        ) : (
          <Survey />
        )}
      </div>
    </Card>
  );
}
