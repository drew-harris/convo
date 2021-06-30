import React, { useState } from "react";
import { useEffect } from "react";
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
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [user] = useAuth();
  const [value, setValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const signUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        value.email,
        value.password
      );

      await userCredential.user.updateProfile({
        displayName: value.username,
      });
      console.log(auth.currentUser);
      // Redirect to Feed
      history.push("/");
    } catch (e) {
      /* handle error */
      console.log(e.message);
    }
  };

  useEffect(() => {}, []);
  return (
    <Main>
      <Header>
        <Anchor href="/login" label="Log In" />
      </Header>

      <Box margin="large" className="form-container" border="all">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({})}
          onSubmit={signUp}
        >
          <FormField name="email" htmlFor="text-input-id" label="Email">
            <TextInput id="text-input-id" name="email" />
          </FormField>
          <FormField name="password" htmlFor="text-input-id" label="Password">
            <TextInput id="text-input-id" name="password" type="password" />
          </FormField>
          <FormField name="username" htmlFor="text-input-id" label="Username">
            <TextInput id="text-input-id" name="username" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="submit"
              onClick={() => console.log(value)}
              primary
              label="Sign Up"
            />
          </Box>
        </Form>
      </Box>
    </Main>
  );
};

export { Register };
