import { useNavigate } from "react-router";
import { React, useState } from 'react';
import "../../Components.css";
import Header from "../../molecules/Header";
import { Formik } from "formik";
import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";
import { Form, Field } from "formik";
import TextField from "../../molecules/TextField";

const NewConversation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <div className="App">
        <Header className='header'/>
        <Formik
        initialValues={{other: "", title: "" }}
        onSubmit={(values, actions) => {
          const vals = { ...values };
          actions.resetForm();
          let contexts = "";
          vals.checked.forEach((cond, index) => {
            contexts += cond
            if (index !== vals.checked.length - 1) {
              contexts += ", "
            }
          });
          contexts += ", " + vals.other;
          const conversation = {
            context: contexts,
            user: localStorage.id,
            name: vals.title,
          };
          actions.resetForm();
          fetch('/api/conversation', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(conversation),
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
              if (data.status) {
                setError(data.status);
              } else if (data.success) {
                navigate("/home");
              }
            });
        }}
        >
        <VStack
          as={Form}
          w={{ base: "90%", md: "600px" }}
          m="auto"
          justify="center"
          spacing="1rem"
        >
        <div className="new-conversation-container">
        <h2 className="new-conversation-head">
          Start a new conversation:
        </h2>
        <Text as="p" color="red.500">
            {error}
        </Text>
        
        <TextField
            name="title"
            placeholder="Enter title"
            autoComplete="off"
            label="Title"
            color="#29274C"
          />

        <div className="conversation-form-instructions">
          Please provide some context for this conversation. Select all that apply.
        </div>
        <div id="checkbox-group" class="checkbox-group">

        <h2 className="new-conversation-head">Fields:</h2>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="primary school" class="field"/>
              Primary School
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="high school" class="field"/>
              High School
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="higher education" class="field"/>
              Higher Education
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="literature" class="field" />
              Literature
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="science" class="field"/>
              Science
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="computer" class="field"/>
              Computer Science
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="history" class="field"/>
              History
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="media" class="field"/>
              Media
          </label>
          <label class="form-control form-control-inline">
            <Field type="checkbox" name="checked" value="psychology" class="field"/>
              Psychology
          </label>

          <h2 className="new-conversation-head">Tasks:</h2>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="essays" class="field"/>
                Essay Writing
            </label>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="research" class="field"/>
                Research
            </label>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="presentations" class="field"/>
                Presentations
            </label>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="memorisation" class="field"/>
                Memorisation
            </label>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="referencing" class="field"/>
                Referencing
            </label>
            <label class="form-control form-control-inline">
              <Field type="checkbox" name="checked" value="summarisation" class="field"/>
                Summarisation
            </label>

          <TextField
            name="other"
            placeholder="Please enter any additional context"
            autoComplete="off"
          />

        </div>

        <ButtonGroup pt="1rem">
          <Button onClick={() => navigate("/home")}>Back</Button>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </ButtonGroup>
        </div>
        </VStack>
        </Formik>

      </div>
  )
}

export default NewConversation;