import React, { useContext, useState } from "react";
import { UserContext } from "../Layout";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  let { userAuth: accessToken } = useContext(UserContext);
  console.log(accessToken);
  return accessToken === null ? (
    <Navigate to={"/signin"} />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export default Editor;
