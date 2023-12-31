import axios from "axios";
import { API_URL } from "../../../constants";
import { toast } from "react-toastify";
import appState from "../../../data/AppState";
import bcrypt from "bcryptjs"

// http://localhost:3000/api/auth/login

export default async function login(email, password) {
  //var hashedPassword = await bcrypt.hash(password,10);
  var res = await axios.post(API_URL + "/auth/login", {
    email: email,
    password: password,
  });

  console.log(res);
  if (res.data.statusCode == 200) {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }
  appState.saveUserData(res.data.data, true);
  console.log(appState.UserData);
  return res.data;
}
