import "../Chat/Chat.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { chatAiRoute } from "../../Utils/APIRoutes";

function Chat() {
  const [input, setInput] = useState();
  const [chats, setChats] = useState([
    { user: "gpt", chat: "Ask me anything about Health" },
  ]);
  const [selectModel, setSelectmodel] = useState(null);
  const [model, setModel] = useState([]);
  const count = useRef("");
  const textRef = useRef(null);
  const handelSumbit = async (e) => {
    e.preventDefault();
    const chatLog = [...chats, { user: "me", chat: input }];
    setChats(chatLog);
    setInput("");
    // setLoading(true);
    setChats((chats) => [
      ...chats,
      {
        user: "gpt",
        chat: (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ),
      },
    ]);

    const response = await axios.post(chatAiRoute, {
      prompt: input + " within 50 words.",
    });
    // setLoading(false);
    setChats((chats) => {
      const updatedChats = chats.slice(0, -1); // Remove the last element from chats array
      return [
        ...updatedChats,
        { user: "gpt", chat: response.data.choices[0].message.content },
      ];
    });
  };

  // Test UI with handel submit
  // const handelSumbit = async (e) => {
  //   e.preventDefault();
  //   const chatLog = [...chats, { user: "me", chat: input }];
  //   setChats(chatLog);
  //   setInput("");
  //   const gptAnswer = prompt("Enter the gpt answer");
  //   console.log(gptAnswer);
  //   setChats((chats) => [...chats, { user: "gpt", chat: gptAnswer }]);
  // };

  const clearChat = () => {
    setChats([{ user: "gpt", chat: "Ask me anything about Health" }]);
  };

  const onPressEnter = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handelSumbit(e);
    }
  };

  const adjustHeight = () => {
    const element = textRef.current;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  return (
    <div className="chat_container">
      <div className="chat_header_text">
        <h2>AI Health Assistant for all your health-related questions</h2>
        <p>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="fa-margin"
            style={{ color: "red" }}
          />
          Doctor.AI Health Assistant is for informational purposes only. Don’t
          take any actions without a doctor’s validation or consultation.
        </p>
      </div>
      <div className="chatApp">
        <aside className="left-panel">
          <button className="btnChat" onClick={clearChat}>
            {/* Plus svg */}
            <FontAwesomeIcon className="m-6 h-6" icon={faTrash} />
            Clear Chat
          </button>
          <Link
            className="btnChat"
            to="/appointment"
            state={{ about: "General queries regarding health " }}
          >
            {/* Plus svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Make Appointment
          </Link>
        </aside>
        <section className="main">
          <div className="main_chat">
            {chats &&
              chats.map((chat, index) =>
                chat.user === "me" ? (
                  <div className="me" key={index}>
                    <div className="chat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <div>{chat.chat}</div>
                    </div>
                  </div>
                ) : (
                  <div className="gpt" key={index}>
                    <div className="chat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                        />
                      </svg>
                      <div>{chat.chat}</div>
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="chatBox">
            <div className="chatInput">
              <textarea
                placeholder="Type your question here..."
                type="text"
                value={input}
                className="inField"
                onChange={(e) => setInput(e.target.value)}
                rows="1"
                ref={textRef}
                onInput={adjustHeight}
                onKeyDown={onPressEnter}
              />
              <button onClick={(e) => handelSumbit(e)}>
                <FontAwesomeIcon className="send_icon" icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
