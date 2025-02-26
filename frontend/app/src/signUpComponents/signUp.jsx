import api from "../api";
import SignUpForm from "./signUpForm";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const signUpToWebsite = async (username, password, instrument, admin) => {
    console.log(admin);
    try {
      console.log("username:", username);
      const response = await api.post("/user/sign-up", {
        username: username,
        password: password,
        instrument: instrument,
        admin: admin,
      });
      console.log(response.status);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding fruit", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <SignUpForm signUpFunction={signUpToWebsite} />
    </div>
  );
};

export default SignUpComponent;
