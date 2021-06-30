import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  Box,
  Main,
  Header,
  Anchor,
  Form,
  FormField,
  TextInput,
  Button,
} from "grommet";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const logIn = async () => {
    try {
      const credential = await auth.signInWithEmailAndPassword(
        value.email,
        value.password
      );
      console.log(credential.user.displayName);
    } catch (e) {
      console.log(e.message);
      /* handle error */
    }
  };
  return (
    <Main>
      <Header>
        <Anchor href="/register" label="Sign Up" />
      </Header>

      <Box margin="large" className="form-container" border="all">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({})}
          onSubmit={logIn}
        >
          <FormField name="email" htmlFor="text-input-id" label="Email">
            <TextInput id="text-input-id" name="email" />
          </FormField>
          <FormField name="password" htmlFor="text-input-id" label="Password">
            <TextInput id="text-input-id" name="password" type="password" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="submit"
              onClick={() => console.log(value)}
              primary
              label="Log In"
            />
          </Box>
        </Form>
      </Box>
    </Main>
  );
};

export { Login };
