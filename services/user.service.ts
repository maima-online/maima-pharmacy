import api from "./apis";
import {
  IregisterUser,
  IloginUser,
  IforgotPassword,
  IresetPassword,
} from "../features/types";

function signUp(user: IregisterUser) {
  return api.post(`accounts/signup`, user);
}

function login({ email, password }: IloginUser) {
  api.post(`accounts/login`, { email, password }).then((user) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    // userSubject.next(user);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  });
}
function forgotPassword(userEmail: IforgotPassword) {
  return api.post(`accounts/forgot-password`, userEmail);
}
function validateForgotpassword(token: string) {
  return api.post(`accounts/forgot-password`, token);
}
function resetUserPassword(userPassword: IresetPassword) {
  return api.post(`accounts/forgot-password`, userPassword);
}
// function login(username, password) {
//     return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
//         .then(user => {
//             // publish user to subscribers and store in local storage to stay logged in between page refreshes
//             userSubject.next(user);
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });
// }

// function logout() {
//     // remove user from local storage, publish null to user subscribers and redirect to login page
//     localStorage.removeItem('user');
//     userSubject.next(null);
//     Router.push('/login');
// }

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
export const userService = {
  signUp,
  login,
  forgotPassword,
  validateForgotpassword,
  resetUserPassword,
};
