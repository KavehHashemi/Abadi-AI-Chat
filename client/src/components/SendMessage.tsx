import { useApolloClient, useMutation } from "@apollo/client";
import { ADD_MESSAGE, MESSAGES_QUERY, ADD_FILE_MUTATION } from "../graphql";
import { ChangeEvent, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SendMessage = () => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const apolloClient = useApolloClient();
  const { user } = useAuth0();

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: MESSAGES_QUERY }],
  });

  const [addFileMutation] = useMutation(ADD_FILE_MUTATION, {
    onError: (e) => {
      console.log(e.networkError?.message);
    },
    onCompleted: (c) => {
      console.log(`completed`);
      console.table(c);
    },
  });

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.validity.valid && e.target.files && e.target.files[0]) {
      // setMedia(e.target.files[0].stream());
      const kaveh = e.target.files[0];
      // console.log(kaveh);
      setFile(kaveh);
    }

    // addMessageMutation({
    //   variables: {
    //     owner: user?.nickname,
    //     text: text,
    //     media: { file: e.target.files[0] },
    //   },
    // }).then(() => {
    //   apolloClient.resetStore();
    // });
  };

  const sendFile = async () => {
    console.log(file);
    const a = await addFileMutation({ variables: { file: file } });
    console.table(a.data);
  };

  const sendMessage = () => {
    addMessageMutation({
      variables: {
        owner: user?.nickname || "unknown user",
        text: text,
      },
    });
    // .then(() => apolloClient.resetStore());
    setText("");
  };

  return (
    <div>
      <form encType="multipart/form-data"></form>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      {/* <input type="file" onChange={(e) => handleFileChange(e)}></input> */}
      <button onClick={() => sendMessage()}>send</button>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        formEncType="multipart/form-data"
      />
      <button onClick={() => handleUploadClick()}>choose file</button>
      <button onClick={() => sendFile()}>upload</button>
    </div>
  );
};

export default SendMessage;
