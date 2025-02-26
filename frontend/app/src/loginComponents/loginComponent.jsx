import api from "../api";
import LoginForm from "./loginForm";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const loginToWebsite = async (username, password) => {
    try {
      const response = await api.post("/user/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        const user = response.data;
        if (user.admin === true) {
          navigate("/main/admin", { state: { data: user } });
          console.log(user);
        } else {
          navigate("/main", { state: { data: user } });
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Wrong username or password, please try again");
      }
    }
  };
  const signUp = () => {
    navigate("/register");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <LoginForm loginFunction={loginToWebsite} signUp={signUp} />
    </div>
  );
};

export default LoginComponent;
