import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";

import { useUserAuth } from "../context/UserAuthContext";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { error, sucessMessage,changeMode,clearMessages,forgotPassword }: any =
    useUserAuth();

    const onChangeMode = (mode: string) => {
        changeMode(mode);
        clearMessages();
      };
      const onSubmit = async () => {
        if (email) {
          forgotPassword(email);
        }
      };
  return (
    <>
    {sucessMessage && <Alert message={`${sucessMessage}`} type="success" />}
      {error && <Alert message={`${error}`} type="error" />}
      <br />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
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


          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onSubmit}
            >
              Submit
            </Button>
            <br/>
            <br/>
            Or{" "}
            <a onClick={()=>onChangeMode('login')}>
              Login
            </a>
          </Form.Item>
      </Form>
    </>
  )
}
