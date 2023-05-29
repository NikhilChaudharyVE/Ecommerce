import React, { useState } from 'react';
import'./style.css'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // ...
  };

  return (


    
    
   
    <div id="wrapper" className="auth-main log_in_page">
  <div className="container">
    <div className="row clearfix">
      <div className="col-lg-8">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="javascript:void(0);">
            <img
              src="../../public/assets/images/logo-new.png"
              className="d-inline-block align-top mr-2"
              alt=""
            />
          </a>
        </nav>
        <div className="auth_detail_new">
          <h1>
            Empowering E-Commerce Merchants with
            <span className="auth_detail_text"> tools that just works.</span>
          </h1>
          {/* <ul class="our_facility_ul">
                          <li><img src="/assets/images/icon-1.png"> <p>Blogs Management</p></li>
                          <li><img src="/assets/images/icon-2.png"> <p>Guest Orders Auto Synchro</p></li>
                          <li><img src="/assets/images/icon-3.png"> <p>Scan To Print</p></li>
                          <li><img src="/assets/images/icon-4.png"> <p>Brands Portal</p></li>
                      </ul> */}
          <ul className="our_facility_ul_new">
            <li>
              <span className="icon_box">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 0C0.559644 0 0 0.559644 0 1.25L0 16.75C0 17.4404 0.559644 18 1.25 18H16.75C17.4404 18 18 17.4404 18 16.75V1.25C18 0.559644 17.4404 0 16.75 0L1.25 0ZM15 14.5C15 14.7761 14.7761 15 14.5 15H3.5C3.22386 15 3 14.7761 3 14.5V14.5C3 14.2239 3.22386 14 3.5 14H14.5C14.7761 14 15 14.2239 15 14.5V14.5ZM15 12.5C15 12.7761 14.7761 13 14.5 13H3.5C3.22386 13 3 12.7761 3 12.5V12.5C3 12.2239 3.22386 12 3.5 12H14.5C14.7761 12 15 12.2239 15 12.5V12.5ZM15 7.75C15 8.44036 14.4404 9 13.75 9H4.25C3.55964 9 3 8.44036 3 7.75V4.25C3 3.55964 3.55964 3 4.25 3L13.75 3C14.4404 3 15 3.55964 15 4.25V7.75Z"
                    fill="#90C846"
                  />
                </svg>
              </span>{" "}
              <p>Blogs Management</p>
            </li>
            <li>
              <span className="icon_box">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18C7.76667 18 6.604 17.7627 5.512 17.288C4.42067 16.8127 3.46667 16.1667 2.65 15.35C1.83333 14.5333 1.18733 13.5793 0.712 12.488C0.237333 11.396 0 10.2333 0 9C0 8.26667 0.0833333 7.554 0.25 6.862C0.416667 6.17067 0.658333 5.52067 0.975 4.912C1.29167 4.304 1.671 3.73767 2.113 3.213C2.55433 2.68767 3.05 2.21667 3.6 1.8L10.4 8.6L9 10L3.6 4.6C3.1 5.2 2.70833 5.871 2.425 6.613C2.14167 7.35433 2 8.15 2 9C2 10.9333 2.68333 12.5833 4.05 13.95C5.41667 15.3167 7.06667 16 9 16C10.9333 16 12.5833 15.3167 13.95 13.95C15.3167 12.5833 16 10.9333 16 9C16 7.21667 15.4293 5.679 14.288 4.387C13.146 3.09567 11.7167 2.33333 10 2.1V4H8V0H9C10.2333 0 11.396 0.237333 12.488 0.712C13.5793 1.18733 14.5333 1.83333 15.35 2.65C16.1667 3.46667 16.8127 4.42067 17.288 5.512C17.7627 6.604 18 7.76667 18 9C18 10.2333 17.7627 11.396 17.288 12.488C16.8127 13.5793 16.1667 14.5333 15.35 15.35C14.5333 16.1667 13.5793 16.8127 12.488 17.288C11.396 17.7627 10.2333 18 9 18ZM9 15C8.71667 15 8.47933 14.904 8.288 14.712C8.096 14.5207 8 14.2833 8 14C8 13.7167 8.096 13.4793 8.288 13.288C8.47933 13.096 8.71667 13 9 13C9.28333 13 9.521 13.096 9.713 13.288C9.90433 13.4793 10 13.7167 10 14C10 14.2833 9.90433 14.5207 9.713 14.712C9.521 14.904 9.28333 15 9 15ZM14 10C13.7167 10 13.4793 9.904 13.288 9.712C13.096 9.52067 13 9.28333 13 9C13 8.71667 13.096 8.479 13.288 8.287C13.4793 8.09567 13.7167 8 14 8C14.2833 8 14.5207 8.09567 14.712 8.287C14.904 8.479 15 8.71667 15 9C15 9.28333 14.904 9.52067 14.712 9.712C14.5207 9.904 14.2833 10 14 10ZM4 10C3.71667 10 3.479 9.904 3.287 9.712C3.09567 9.52067 3 9.28333 3 9C3 8.71667 3.09567 8.479 3.287 8.287C3.479 8.09567 3.71667 8 4 8C4.28333 8 4.521 8.09567 4.713 8.287C4.90433 8.479 5 8.71667 5 9C5 9.28333 4.90433 9.52067 4.713 9.712C4.521 9.904 4.28333 10 4 10Z"
                    fill="#90C846"
                  />
                </svg>
              </span>
              <p>Guest Orders Auto Synchro</p>
            </li>
            <li>
              <span className="icon_box">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 18V16.2H16.2V13.5H18V16.65C18 17.01 17.82 17.28 17.55 17.55C17.28 17.82 16.92 18 16.65 18H13.5ZM4.5 18H1.35C0.99 18 0.72 17.82 0.45 17.55C0.18 17.28 0 16.92 0 16.65V13.5H1.8V16.2H4.5V18ZM13.5 0H16.65C17.01 0 17.28 0.18 17.55 0.45C17.82 0.72 18 0.99 18 1.35V4.5H16.2V1.8H13.5V0ZM4.5 0V1.8H1.8V4.5H0V1.35C0 0.99 0.18 0.72 0.45 0.45C0.72 0.18 0.99 0 1.35 0H4.5ZM15.3 8.1H2.7V9.9H15.3V8.1Z"
                    fill="#90C846"
                  />
                </svg>
              </span>
              <p>Scan To Print</p>
            </li>
            <li>
              <span className="icon_box">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4545 13.9091C11.7955 13.9091 12.0851 13.7896 12.3235 13.5507C12.5624 13.3124 12.6818 13.0227 12.6818 12.6818C12.6818 12.3409 12.5624 12.0513 12.3235 11.8129C12.0851 11.574 11.7955 11.4545 11.4545 11.4545C11.1136 11.4545 10.824 11.574 10.5856 11.8129C10.3467 12.0513 10.2273 12.3409 10.2273 12.6818C10.2273 13.0227 10.3467 13.3124 10.5856 13.5507C10.824 13.7896 11.1136 13.9091 11.4545 13.9091ZM11.4545 16.3636C11.8773 16.3636 12.2626 16.2646 12.6106 16.0666C12.9581 15.8692 13.2477 15.6068 13.4795 15.2795C13.1795 15.1023 12.8591 14.9659 12.5182 14.8705C12.1773 14.775 11.8227 14.7273 11.4545 14.7273C11.0864 14.7273 10.7318 14.775 10.3909 14.8705C10.05 14.9659 9.72954 15.1023 9.42955 15.2795C9.66136 15.6068 9.95127 15.8692 10.2993 16.0666C10.6467 16.2646 11.0318 16.3636 11.4545 16.3636ZM4.09091 5.72727H9V4.09091C9 3.40909 8.76136 2.82955 8.28409 2.35227C7.80682 1.875 7.22727 1.63636 6.54545 1.63636C5.86364 1.63636 5.28409 1.875 4.80682 2.35227C4.32955 2.82955 4.09091 3.40909 4.09091 4.09091V5.72727ZM11.4545 18C10.3227 18 9.35809 17.6013 8.56064 16.8038C7.76264 16.0058 7.36364 15.0409 7.36364 13.9091C7.36364 12.7773 7.76264 11.8124 8.56064 11.0144C9.35809 10.2169 10.3227 9.81818 11.4545 9.81818C12.5864 9.81818 13.5513 10.2169 14.3493 11.0144C15.1467 11.8124 15.5455 12.7773 15.5455 13.9091C15.5455 15.0409 15.1467 16.0058 14.3493 16.8038C13.5513 17.6013 12.5864 18 11.4545 18ZM0 17.1818V5.72727H2.45455V4.09091C2.45455 2.95909 2.85355 1.99418 3.65155 1.19618C4.449 0.398727 5.41364 0 6.54545 0C7.67727 0 8.64218 0.398727 9.44018 1.19618C10.2376 1.99418 10.6364 2.95909 10.6364 4.09091V5.72727H13.0909V8.42727C12.8182 8.33182 12.5455 8.26691 12.2727 8.23255C12 8.19873 11.7273 8.18182 11.4545 8.18182C9.85909 8.18182 8.50582 8.73736 7.39473 9.84845C6.28309 10.9601 5.72727 12.3136 5.72727 13.9091C5.72727 14.4955 5.81945 15.0646 6.00382 15.6166C6.18764 16.1692 6.43636 16.6909 6.75 17.1818H0Z"
                    fill="#90C846"
                  />
                </svg>{" "}
              </span>
              <p>Brands Portal</p>
            </li>
            <li>
              <span className="icon_box">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.55556 12.4444H5.33333V6.22222H3.55556V12.4444ZM7.11111 12.4444H8.88889V3.55556H7.11111V12.4444ZM10.6667 12.4444H12.4444V8.88889H10.6667V12.4444ZM1.77778 16C1.28889 16 0.870222 15.8261 0.521778 15.4782C0.173926 15.1298 0 14.7111 0 14.2222V1.77778C0 1.28889 0.173926 0.870222 0.521778 0.521778C0.870222 0.173926 1.28889 0 1.77778 0H14.2222C14.7111 0 15.1298 0.173926 15.4782 0.521778C15.8261 0.870222 16 1.28889 16 1.77778V14.2222C16 14.7111 15.8261 15.1298 15.4782 15.4782C15.1298 15.8261 14.7111 16 14.2222 16H1.77778Z"
                    fill="#90C846"
                  />
                </svg>
              </span>
              <p>Profit &amp; Loss Decision Tool Flow</p>
            </li>
          </ul>
        </div>
        {/* <div class="auth_detail">
                      <h2 class="text-monospace">
                          Everything<br> you need for
                          <div id="carouselExampleControls" class="carousel vert slide" data-ride="carousel" data-interval="1500">
                              <div class="carousel-inner">
                                  <div class="carousel-item active">your Admin</div>
                                  <div class="carousel-item">your Project</div>
                                  <div class="carousel-item">your Dashboard</div>
                                  <div class="carousel-item">your Application</div>
                                  <div class="carousel-item">your Client</div>
                              </div>
                          </div>
                      </h2>
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                      
                  </div> */}
      </div>
      <div className="col-lg-4 login_form_sec">
        <div className="text-box-auth">
          The technology should do it’s job. Rather than becoming a job
          itself...
        </div>
        <div className="card">
          <div className="header">
            <p className="lead">
              <a href="#">Sign In</a>
            </p>
            <span>|</span>
            <p className="lead_muted">
              <a href="/users/signup">Sign Up</a>
            </p>
          </div>
          <div className="body">
            <form
              id="loginForm"
              className="form-auth-small"
              action="/users/login"
              method="post"
              noValidate="novalidate"
            >
              <div className="form-group new_form">
                <div className="input-group">
                  <div className="input-group-addon">
                    <svg
                      width={10}
                      height={8}
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0H1C0.45 0 0.005 0.45 0.005 1L0 7C0 7.55 0.45 8 1 8H9C9.55 8 10 7.55 10 7V1C10 0.45 9.55 0 9 0ZM9 2L5 4.5L1 2V1L5 3.5L9 1V2Z"
                        fill="#646A79"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue=""
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group new_form">
                <div className="input-group">
                  <div className="input-group-addon">
                    <svg
                      width={11}
                      height={12}
                      viewBox="0 0 9 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 9.14286C4.79837 9.14286 5.08452 9.02245 5.2955 8.80812C5.50647 8.59379 5.625 8.30311 5.625 8C5.625 7.6969 5.50647 7.40621 5.2955 7.19188C5.08452 6.97755 4.79837 6.85714 4.5 6.85714C4.20163 6.85714 3.91548 6.97755 3.7045 7.19188C3.49353 7.40621 3.375 7.6969 3.375 8C3.375 8.30311 3.49353 8.59379 3.7045 8.80812C3.91548 9.02245 4.20163 9.14286 4.5 9.14286ZM7.875 4C8.17337 4 8.45952 4.12041 8.6705 4.33474C8.88147 4.54906 9 4.83975 9 5.14286V10.8571C9 11.1602 8.88147 11.4509 8.6705 11.6653C8.45952 11.8796 8.17337 12 7.875 12H1.125C0.826631 12 0.540483 11.8796 0.329505 11.6653C0.118526 11.4509 0 11.1602 0 10.8571V5.14286C0 4.83975 0.118526 4.54906 0.329505 4.33474C0.540483 4.12041 0.826631 4 1.125 4H1.6875V2.85714C1.6875 2.09938 1.98382 1.37266 2.51126 0.836838C3.03871 0.30102 3.75408 0 4.5 0C4.86934 0 5.23507 0.0739022 5.5763 0.217487C5.91753 0.361072 6.22757 0.571528 6.48874 0.836838C6.7499 1.10215 6.95707 1.41712 7.09841 1.76376C7.23975 2.11041 7.3125 2.48194 7.3125 2.85714V4H7.875ZM4.5 1.14286C4.05245 1.14286 3.62322 1.32347 3.30676 1.64496C2.99029 1.96645 2.8125 2.40249 2.8125 2.85714V4H6.1875V2.85714C6.1875 2.40249 6.00971 1.96645 5.69324 1.64496C5.37678 1.32347 4.94755 1.14286 4.5 1.14286Z"
                        fill="#646A79"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    defaultValue=""
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                SIGN IN
              </button>
              <div className="form-group clearfix mt-3">
                <label className="fancy-checkbox element-left">
                  <input type="checkbox" id="ckb1" name="remember-me" />
                  <span>Remember me</span>
                </label>
                <a href="/users/forgot-password" className="forgot_password">
                  <span>Forgot Password?</span>
                </a>
              </div>
              {/*  <div class="bottom">
          <span class="helper-text m-b-10"><i class="fa fa-lock"></i><a class="p-1" href="/users/forgot-password">Forgot password?</a></span> */}
              {/* <span>Don't have an account? <a href="/users/signup">Register</a></span> 
          <p class="version_signup">Version 1.0.0</p>
      </div> */}
            </form>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    p.version_signup {\n    margin-bottom: 0;\n    margin-top: 7px;\n    font-size: 8px;\n}\n"
          }}
        />
      </div>
    </div>
  </div>
</div>

  );
}

export default LoginPage;