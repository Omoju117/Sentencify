import axios from "axios";
import { useRef, useState, VFC } from "react";
import { useRouter } from "next/router";
import Header from "../../components/templates/Header";

// TODO: fix the problem change event is too slow
const ControlledInput = ({ onUpdate }) => {
  const [value, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
    onUpdate(e.target.value);
  };
  return (
    <input
      className="w-full border text-[18px] leading-5 p-3 rounded"
      value={value}
      onChange={handleChange}
    />
  );
};

const SignIn: VFC<void> = () => {
  const router = useRouter();
  const email = useRef();
  const password = useRef();
  const handleClickRegister = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("email", email.current);
    params.append("password", password.current);

    axios
      .post("http://localhost:3000/login", params)
      .then((res) => {
        console.log("login res: ", res.data);
        // TODO: manage JWT
        if (res.data) {
          router.push({
            pathname: `/documents`,
          });
        }
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <Header />
      <div className="text-[24px] mt-20">Sign In</div>
      <div className="w-[80%] flex flex-col items-center justify-center m-6">
        <div className="w-[50%]">
          <span className="text-[12px] leading-4">email</span>
          <ControlledInput
            onUpdate={(val) => {
              email.current = val;
            }}
          />
        </div>
        <div className="w-[50%] mt-6">
          <span className="text-[12px] leading-4">password</span>
          <ControlledInput
            onUpdate={(val) => {
              password.current = val;
            }}
          />
        </div>
        <button
          className="rounded text-[24px] leading-6 p-3 bg-green-500 text-white mt-10"
          onClick={handleClickRegister}
        >
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;