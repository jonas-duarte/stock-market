import Http from "../http";

class Auth {
  static route = "/auth/";

  static login = (user, password) => {
    return Http.get(`${this.route}`, { user, password }).then(res => res.data);
  };
}

export default Auth;
