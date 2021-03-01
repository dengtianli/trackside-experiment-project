// import SHA from "sha.js";


export default {
  token: {
    set(token) {
      if (token)
        sessionStorage.setItem("token", token);
    },
    get() {
      const token = sessionStorage.getItem("token")
      return token ? token : undefined;
    },
    empty() {
      sessionStorage.removeItem("token");
    }
  },
  account: {
    set(account) {
      account && sessionStorage.setItem('account', account);
    },
    get() {
      return sessionStorage.getItem('account') || '';
    }
  },
  userName: {
    set(userName) {
      userName && sessionStorage.setItem('userName', userName);
    },
    get() {
      return sessionStorage.getItem('userName') || '';
    }
  },
  password: {
    set(password) {
      password && sessionStorage.setItem('password', password);
    },
    get() {
      return sessionStorage.getItem('password') || '';
    }
  }
  // sha(string) {
  //   return SHA("sha256").update(string, "utf8").digest("hex");
  // }
}