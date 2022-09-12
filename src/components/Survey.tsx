import { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import GoogleButton from "react-google-button";

import { useUserAuth } from "../context/UserAuthContext";

export default function SurveyRegister() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn, error, signUp,changeMode,mode,clearMessages }: any =
    useUserAuth();

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    googleSignIn();
  };
  
  const onChangeMode = (mode: string) => {
    changeMode(mode);
    clearMessages();
  };
  const onSignUp = (e: any) => {
    e.preventDefault();
    signUp(username, email, password);
  };
  const onLogin = (e: any) => {
    e.preventDefault();
    logIn(email, password);
  };
  return (
    <>
      {error && <Alert message={`${error}`} type="error" />}
      <br />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        {mode === "register" && (
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {mode === "register" && (
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
        )}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {mode === "login" && (
            <a
              onClick={()=>onChangeMode('forgot')}
              className="login-form-forgot"
            >
              Forgot password
            </a>
          )}
        </Form.Item>

        {mode === "register" && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onSignUp}
            >
              Sign Up
            </Button>
            <br/>
            <br/>
            Already have an account?{" "}
            <a onClick={()=>onChangeMode('login')}>Login!</a>
          </Form.Item>
        )}

        {mode === "login" && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onLogin}
            >
              Log in
            </Button>
            <br/>
            <br/>
            Or{" "}
            <a onClick={()=>onChangeMode('register')}>
              register now!
            </a>
          </Form.Item>
        )}
      </Form>
      {mode === "login" && (
        <>
          <hr />
          <div>
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
        </>
      )}
    </>
  );
}
