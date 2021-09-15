import "../../App.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
const LoginRegister = () => {
  const { loginUser, registerUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const onChangeLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };
  const { username, password } = loginForm;
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
    } catch (error) {
      console.log(error);
    }
  };
  //register
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    dayOfBirth: "",
    sex: "",
  });
  const { firstName, lastName, dayOfBirth, sex } = registerForm;
  const userReg = registerForm.username;
  const passwordReg = registerForm.password;
  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const register = async (event) => {
    event.preventDefault();
    try {
      const registerData = await registerUser(registerForm);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="logo">
        <img
          className="logo-image"
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt="facebook-logo"
        />
        <div className="logo-title">
          <p>
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </p>
        </div>
      </div>
      <div className="login-box">
        <form onSubmit={login}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Email hoặc số điện thoại"
              className="input-area"
              value={username}
              onChange={onChangeLoginForm}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="input-area"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={onChangeLoginForm}
            />
          </div>
          <button className="submit-btn" type="submit">
            Đăng nhập
          </button>
        </form>
        <div className="forgot-password">
          <a href="#">Quên mật khẩu</a>
        </div>
        <hr />
        <div className="register-box">
          <div
            className="btn-create"
            data-toggle="modal"
            data-target="#register-box"
          >
            Tạo tài khoản mới
          </div>
          <div className="modal fade" id="register-box">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">
                    <h2>Đăng kí</h2>
                    <p>Nhanh chóng và dễ dàng</p>
                  </div>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={register}>
                    <div className="form-group">
                      <input
                        className="name input-area"
                        type="text"
                        name="firstName"
                        placeholder="Họ"
                        value={firstName}
                        onChange={onChangeRegisterForm}
                      />
                      <input
                        className="name input-area"
                        type="text"
                        name="lastName"
                        placeholder="Tên"
                        value={lastName}
                        onChange={onChangeRegisterForm}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="input-area"
                        name="username"
                        placeholder="Số di động hoặc email"
                        value={userReg}
                        onChange={onChangeRegisterForm}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="input-area"
                        name="password"
                        placeholder="Mật khẩu mới"
                        value={passwordReg}
                        onChange={onChangeRegisterForm}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dayOfBirth">Ngày sinh</label>
                      <input
                        type="date"
                        className="input-area"
                        name="dayOfBirth"
                        onChange={onChangeRegisterForm}
                        value={dayOfBirth}
                      />
                    </div>
                    <div className="form-group sex-input">
                      <label htmlFor="sex">Giới tính</label>
                      <br />
                      <input
                        type="radio"
                        name="sex"
                        value="nu"
                        onChange={onChangeRegisterForm}
                      />{" "}
                      Nữ
                      <input
                        type="radio"
                        name="sex"
                        value="nam"
                        onChange={onChangeRegisterForm}
                      />{" "}
                      Nam
                    </div>
                    <span className="privacy-title">
                      Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,
                      Chính sách dữ liệu và Chính sách cookie của chúng tôi. Bạn
                      có thể nhận được thông báo của chúng tôi qua SMS và hủy
                      nhận bất kỳ lúc nào.
                    </span>
                    <br />
                    <button type="submit" className="submit-btn">
                      Đăng kí
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
