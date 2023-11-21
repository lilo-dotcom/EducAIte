import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../../../Auth/AccountContext";
import TextField from "../../../molecules/TextField";
import { REGISTER_DISABILITIES_URL } from "../../../../constants/urlConstants";

const SignUp = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ name: "", username: "", password: "" }}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch('/api/user', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vals),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              localStorage.setItem("token", data.token);
              navigate(REGISTER_DISABILITIES_URL);
            }
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="72.3vh"
        spacing="1rem"
      >
        <Heading>Register</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>
        <TextField
          name="name"
          placeholder="Enter name"
          autoComplete="off"
          label="Name"
        />
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
          type="password"
        />

        <ButtonGroup pt="1rem">
          <Button onClick={() => navigate("/disabilities")} leftIcon={<ArrowBackIcon />}>
            Login
          </Button>
          <Button colorScheme="purple" type="submit">
            Create Account
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default SignUp;