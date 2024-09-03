import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  CallParticipantsList,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./index.css";
import { CgProfile } from "react-icons/cg";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGFkbV9fQW1pZGFsYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvUGFkbV9fQW1pZGFsYSIsImlhdCI6MTcyNDY5NjMwMCwiZXhwIjoxNzI1MzAxMTA1fQ.VDAnDYVOzliW4lYAeqGi0N488rmK2SnrB6kW_ecluWU";
const userId = "Padm__Amidala";
const callId = "AFC40Tgx96lg";
const Room = () => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [user, setUser] = useState({
    id: "",
    name: "",
    image: "",
  });
  const [usertoken, setToken] = useState("");

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  useEffect(() => {
    if (usertoken) {
      try {
        const decoded = jwtDecode(usertoken);
        if (decoded.username) {
          const newUser = {
            id: userId,
            name: decoded.username,
            image: `https://getstream.io/random_svg/?id=${decoded.username}&name=${decoded.username}`,
          };
          setUser(newUser);

          const newClient = new StreamVideoClient({
            apiKey,
            user: newUser,
            token,
          });
          setClient(newClient);

          const newCall = newClient.call("default", callId);
          setCall(newCall);
          newCall.join({ create: true });
        }
        window.location.hash = callId;
      } catch (error) {
        console.error("Failed to decode JWT token:", error);
      }
    }
  }, [token]);

  if (!client || !call) {
    // Show a loading indicator while the client or call is being initialized
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export default Room;

const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [showParticipants, setShowParticipants] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(callingState);
    // Uncomment and adjust this logic if you need to navigate based on call state
    if (callingState === "left") {
      navigate("/"); // Navigate to the home page if the call is not joined
    }
  }, [callingState, navigate]);

  const toggleParticipantsList = () => {
    setShowParticipants((prevState) => !prevState);
  };

  return (
    <StreamTheme>
      <div className="layout">
        <div className="video-stream">
          <SpeakerLayout participantsBarPosition="bottom" />
        </div>
        {showParticipants && (
          <div className="call-participants-list">
            <CallParticipantsList />
          </div>
        )}
      </div>
      <div className="controls-container">
        <CallControls />
        <button onClick={toggleParticipantsList} className="participants-btn">
          {/* Add participant icon or text here */}
          <CgProfile />
        </button>
      </div>
    </StreamTheme>
  );
};
