import { useContext } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import "./Signin.css";

const Signin = ({ handleSignup }) => {
  const { loginUser, loginGoogleUser } = useContext(AuthContext);
  // var csrf_token = document.cookie.split("=")[1];
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const myPromise = new Promise((resolve, reject) => {
      loginUser(email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });


    toast.promise(myPromise, {
      loading: "Logging you in...",
      success: "Logged in successfully!",
      error: (err) => `${err.toString() == "Unauthorized" ? "Invalid Credentials!" : "Something went wrong!"}`,
    });
  };

  function onGoogleLoginSuccess(res) {
    const userObject = jwt_decode(res.credential);

    const email = userObject.email;
    const given_name = userObject.given_name;

    const myPromise = new Promise((resolve, reject) => {
      loginGoogleUser(email, given_name)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(myPromise, {
      pending: "Logging you in...",
      success: "Logged in successfully!",
      error: {
        render: ({ data }) => {
          if (data == "Unauthorized") {
            return "Invalid Credentials!";
          }
          return "Something went wrong!";
        },
      },
    });
  }

  function onGoogleLoginFailure(res) {
    console.log("Failure:", res);
  }

  return (
    <div className="login-container-right">
      <div className="login-container-right-title">LOGIN</div>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <input type="text" placeholder="Full Name" name="full_name" required /> */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          required
        />
        <input type="submit" value="Submit" id="login-form-submit" />
        <br />
        <div className="w-8 h-5 svg-container">
          <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.285645 12.08C0.285645 9.74664 0.413978 7.83331 0.670645 6.33998C0.950645 4.84664 1.41731 3.67998 2.07064 2.83998C2.74731 1.99998 3.68064 1.41664 4.87064 1.08998C6.08398 0.763309 7.63564 0.599976 9.52564 0.599976C11.369 0.599976 12.8973 0.763309 14.1106 1.08998C15.324 1.41664 16.2573 2.01164 16.9106 2.87498C17.5873 3.71498 18.0656 4.88164 18.3456 6.37498C18.6256 7.84498 18.7656 9.74664 18.7656 12.08C18.7656 14.4133 18.6256 16.3266 18.3456 17.82C18.0656 19.29 17.5873 20.445 16.9106 21.285C16.2573 22.125 15.324 22.7083 14.1106 23.035C12.8973 23.3616 11.369 23.525 9.52564 23.525C7.63564 23.525 6.08398 23.3616 4.87064 23.035C3.68064 22.7083 2.74731 22.125 2.07064 21.285C1.41731 20.445 0.950645 19.29 0.670645 17.82C0.413978 16.3266 0.285645 14.4133 0.285645 12.08ZM4.90564 19.85H11.1706C12.2906 19.85 13.0606 19.675 13.4806 19.325C13.924 18.975 14.1456 18.3566 14.1456 17.47V4.27498H7.81065C6.71398 4.27498 5.95564 4.44998 5.53565 4.79998C5.11564 5.14998 4.90564 5.76831 4.90564 6.65498V19.85Z" fill="white" />
            <path d="M25.6467 5.49998L27.0467 8.15998C28.0034 7.24998 28.8667 6.54998 29.6367 6.05998C30.4067 5.56998 31.165 5.20831 31.9117 4.97498L32.2967 9.17498C31.83 9.29164 31.3167 9.46664 30.7567 9.69998C30.1967 9.90998 29.66 10.155 29.1467 10.435C28.6567 10.6916 28.2367 10.96 27.8867 11.24V23H23.5817V5.49998H25.6467Z" fill="white" />
          </svg>

        </div>
        <div id="googleOAuth-login">
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              // buttonText="Log In Using Google"
              onSuccess={onGoogleLoginSuccess}
              onFailure={onGoogleLoginFailure}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
      <div className="login-noaccount flex items-center">
        {/* <div className="h-4 w-fit  flex items-center svg-container">
          <svg width="256" height="18" viewBox="0 0 256 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.99995H5.9C7.21667 1.99995 8.29167 2.10828 9.125 2.32494C9.95833 2.54161 10.6083 2.94161 11.075 3.52495C11.5417 4.09161 11.8667 4.88328 12.05 5.89995C12.2333 6.89995 12.325 8.20828 12.325 9.82495C12.325 11.4249 12.2333 12.7333 12.05 13.7499C11.8667 14.7666 11.5417 15.5583 11.075 16.1249C10.6083 16.6916 9.95833 17.0833 9.125 17.2999C8.29167 17.5166 7.21667 17.6249 5.9 17.6249H0V1.99995ZM3.075 4.49995V15.1249H7.075C7.80833 15.1249 8.31667 14.9999 8.6 14.7499C8.88333 14.4833 9.025 14.0249 9.025 13.3749V6.24995C9.025 5.59995 8.88333 5.14995 8.6 4.89995C8.31667 4.63328 7.80833 4.49995 7.075 4.49995H3.075Z" fill="white" />
            <path d="M20.7715 17.8999C19.6715 17.8999 18.7548 17.7999 18.0215 17.5999C17.2882 17.3833 16.7048 17.0333 16.2715 16.5499C15.8382 16.0499 15.5298 15.3833 15.3465 14.5499C15.1632 13.6999 15.0715 12.6416 15.0715 11.3749C15.0715 10.1083 15.1632 9.05828 15.3465 8.22495C15.5298 7.37495 15.8382 6.70828 16.2715 6.22495C16.7048 5.72495 17.2882 5.37495 18.0215 5.17495C18.7548 4.95828 19.6715 4.84995 20.7715 4.84995C21.8882 4.84995 22.8132 4.95828 23.5465 5.17495C24.2798 5.37495 24.8548 5.72495 25.2715 6.22495C25.7048 6.70828 26.0132 7.36661 26.1965 8.19995C26.3798 9.03328 26.4715 10.0916 26.4715 11.3749C26.4715 12.6416 26.3798 13.6999 26.1965 14.5499C26.0132 15.3833 25.7048 16.0499 25.2715 16.5499C24.8548 17.0333 24.2715 17.3833 23.5215 17.5999C22.7882 17.7999 21.8715 17.8999 20.7715 17.8999ZM18.3215 15.4749H22.0965C22.5465 15.4749 22.8465 15.4333 22.9965 15.3499C23.1632 15.2499 23.2465 15.0749 23.2465 14.8249V7.27495H19.4715C19.0215 7.27495 18.7132 7.32494 18.5465 7.42495C18.3965 7.50828 18.3215 7.67495 18.3215 7.92495V15.4749Z" fill="white" />
            <path d="M29.8096 17.6249V5.12495H31.2596L32.0846 6.37495C32.7346 5.85828 33.4429 5.47495 34.2096 5.22495C34.9762 4.97495 35.8429 4.84995 36.8096 4.84995C37.9762 4.84995 38.8679 5.04995 39.4846 5.44995C40.1012 5.83328 40.4096 6.39995 40.4096 7.14995V17.6249H37.3346V7.37495H34.7346C34.0346 7.37495 33.5512 7.46661 33.2846 7.64995C33.0179 7.81661 32.8846 8.14995 32.8846 8.64995V17.6249H29.8096Z" fill="white" />
            <path d="M45.3615 6.74995L43.9865 6.29995L44.5615 3.87495C44.1282 3.77495 43.8282 3.59161 43.6615 3.32495C43.4949 3.05828 43.4115 2.62495 43.4115 2.02495C43.4115 1.29161 43.5532 0.791612 43.8365 0.524946C44.1199 0.241612 44.6199 0.0999451 45.3365 0.0999451C46.0199 0.0999451 46.4949 0.241612 46.7615 0.524946C47.0282 0.791612 47.1615 1.29161 47.1615 2.02495C47.1615 2.27495 47.1365 2.51661 47.0865 2.74995C47.0532 2.96661 46.9865 3.19995 46.8865 3.44995C46.8032 3.69994 46.6699 4.01661 46.4865 4.39994L45.3615 6.74995Z" fill="white" />
            <path d="M53.1918 17.8999C52.4585 17.8999 51.9168 17.7333 51.5668 17.3999C51.2168 17.0499 51.0418 16.5249 51.0418 15.8249V2.59995L54.0918 1.82495V15.3749C54.3418 15.4083 54.5918 15.4416 54.8418 15.4749C55.1085 15.4916 55.4335 15.5083 55.8168 15.5249L55.6418 17.5999C55.1085 17.6999 54.6418 17.7749 54.2418 17.8249C53.8418 17.8749 53.4918 17.8999 53.1918 17.8999ZM49.3918 7.19995V5.12495H56.2168V7.19995H49.3918Z" fill="white" />
            <path d="M65.2344 17.6249V1.24995L68.2344 0.999945V5.87495C68.7677 5.50828 69.3594 5.24995 70.0094 5.09994C70.6594 4.93328 71.401 4.84995 72.2344 4.84995C73.401 4.84995 74.2927 5.04995 74.9094 5.44995C75.526 5.83328 75.8344 6.39995 75.8344 7.14995V17.6249H72.7594V7.37495H70.3344C69.551 7.37495 69.0177 7.47495 68.7344 7.67495C68.451 7.85828 68.3094 8.20828 68.3094 8.72495V17.6249H65.2344Z" fill="white" />
            <path d="M82.8613 17.8999C81.4613 17.8999 80.453 17.5999 79.8363 16.9999C79.2197 16.3999 78.9113 15.4166 78.9113 14.0499C78.9113 13.1999 79.003 12.5166 79.1863 11.9999C79.3697 11.4666 79.7113 11.0583 80.2113 10.7749C80.7113 10.4916 81.428 10.2999 82.3613 10.1999C83.2947 10.0833 84.5113 10.0249 86.0113 10.0249H87.2363V11.8499H83.6863C82.9363 11.8499 82.4197 11.9499 82.1363 12.1499C81.853 12.3333 81.7113 12.6916 81.7113 13.2249V15.6499H84.5363C85.2863 15.6499 85.7947 15.5583 86.0613 15.3749C86.3447 15.1916 86.4863 14.8333 86.4863 14.2999V7.44995C85.953 7.28328 85.2113 7.19995 84.2613 7.19995C83.578 7.19995 82.8613 7.24995 82.1113 7.34995C81.378 7.44995 80.628 7.60828 79.8613 7.82495L79.4613 5.62495C79.928 5.45828 80.4447 5.31661 81.0113 5.19995C81.5947 5.08328 82.203 4.99995 82.8363 4.94995C83.4697 4.88328 84.0863 4.84995 84.6863 4.84995C85.8697 4.84995 86.8197 4.97495 87.5363 5.22495C88.253 5.45828 88.7697 5.84995 89.0863 6.39995C89.403 6.93328 89.5613 7.64995 89.5613 8.54995V17.6249H88.0863L87.2863 16.3749C86.6863 16.8916 86.0197 17.2749 85.2863 17.5249C84.5697 17.7749 83.7613 17.8999 82.8613 17.8999Z" fill="white" />
            <path d="M91.5814 5.12495H94.6064L97.3064 14.9749H97.5564L100.231 5.12495H103.256L99.7564 17.6249H95.0814L91.5814 5.12495Z" fill="white" />
            <path d="M109.946 17.8999C108.962 17.8999 108.129 17.7916 107.446 17.5749C106.762 17.3583 106.221 17.0083 105.821 16.5249C105.421 16.0249 105.129 15.3583 104.946 14.5249C104.779 13.6749 104.696 12.6249 104.696 11.3749C104.696 9.75828 104.871 8.47495 105.221 7.52495C105.571 6.55828 106.154 5.87495 106.971 5.47495C107.804 5.05828 108.912 4.84995 110.296 4.84995C111.646 4.84995 112.696 4.96661 113.446 5.19995C114.196 5.41661 114.721 5.80828 115.021 6.37495C115.337 6.92495 115.496 7.69995 115.496 8.69995C115.496 9.54995 115.396 10.2416 115.196 10.7749C114.996 11.2916 114.629 11.6916 114.096 11.9749C113.562 12.2583 112.804 12.4583 111.821 12.5749C110.837 12.6749 109.546 12.7249 107.946 12.7249H107.196V10.8999H110.696C111.479 10.8999 112.012 10.8083 112.296 10.6249C112.579 10.4249 112.721 10.0583 112.721 9.52495V7.24995H109.946C109.179 7.24995 108.654 7.34161 108.371 7.52495C108.087 7.70828 107.946 8.06661 107.946 8.59995V15.2999C108.279 15.3833 108.637 15.4499 109.021 15.4999C109.404 15.5333 109.871 15.5499 110.421 15.5499C111.104 15.5499 111.779 15.4999 112.446 15.3999C113.112 15.2999 113.887 15.1416 114.771 14.9249L115.171 17.1249C114.487 17.3749 113.687 17.5666 112.771 17.6999C111.871 17.8333 110.929 17.8999 109.946 17.8999Z" fill="white" />
            <path d="M128.198 17.8999C126.798 17.8999 125.79 17.5999 125.173 16.9999C124.557 16.3999 124.248 15.4166 124.248 14.0499C124.248 13.1999 124.34 12.5166 124.523 11.9999C124.707 11.4666 125.048 11.0583 125.548 10.7749C126.048 10.4916 126.765 10.2999 127.698 10.1999C128.632 10.0833 129.848 10.0249 131.348 10.0249H132.573V11.8499H129.023C128.273 11.8499 127.757 11.9499 127.473 12.1499C127.19 12.3333 127.048 12.6916 127.048 13.2249V15.6499H129.873C130.623 15.6499 131.132 15.5583 131.398 15.3749C131.682 15.1916 131.823 14.8333 131.823 14.2999V7.44995C131.29 7.28328 130.548 7.19995 129.598 7.19995C128.915 7.19995 128.198 7.24995 127.448 7.34995C126.715 7.44995 125.965 7.60828 125.198 7.82495L124.798 5.62495C125.265 5.45828 125.782 5.31661 126.348 5.19995C126.932 5.08328 127.54 4.99995 128.173 4.94995C128.807 4.88328 129.423 4.84995 130.023 4.84995C131.207 4.84995 132.157 4.97495 132.873 5.22495C133.59 5.45828 134.107 5.84995 134.423 6.39995C134.74 6.93328 134.898 7.64995 134.898 8.54995V17.6249H133.423L132.623 16.3749C132.023 16.8916 131.357 17.2749 130.623 17.5249C129.907 17.7749 129.098 17.8999 128.198 17.8999Z" fill="white" />
            <path d="M138.818 17.6249V5.12495H140.268L141.093 6.37495C141.743 5.85828 142.452 5.47495 143.218 5.22495C143.985 4.97495 144.852 4.84995 145.818 4.84995C146.985 4.84995 147.877 5.04995 148.493 5.44995C149.11 5.83328 149.418 6.39995 149.418 7.14995V17.6249H146.343V7.37495H143.743C143.043 7.37495 142.56 7.46661 142.293 7.64995C142.027 7.81661 141.893 8.14995 141.893 8.64995V17.6249H138.818Z" fill="white" />
            <path d="M162.427 17.8999C161.027 17.8999 160.018 17.5999 159.402 16.9999C158.785 16.3999 158.477 15.4166 158.477 14.0499C158.477 13.1999 158.568 12.5166 158.752 11.9999C158.935 11.4666 159.277 11.0583 159.777 10.7749C160.277 10.4916 160.993 10.2999 161.927 10.1999C162.86 10.0833 164.077 10.0249 165.577 10.0249H166.802V11.8499H163.252C162.502 11.8499 161.985 11.9499 161.702 12.1499C161.418 12.3333 161.277 12.6916 161.277 13.2249V15.6499H164.102C164.852 15.6499 165.36 15.5583 165.627 15.3749C165.91 15.1916 166.052 14.8333 166.052 14.2999V7.44995C165.518 7.28328 164.777 7.19995 163.827 7.19995C163.143 7.19995 162.427 7.24995 161.677 7.34995C160.943 7.44995 160.193 7.60828 159.427 7.82495L159.027 5.62495C159.493 5.45828 160.01 5.31661 160.577 5.19995C161.16 5.08328 161.768 4.99995 162.402 4.94995C163.035 4.88328 163.652 4.84995 164.252 4.84995C165.435 4.84995 166.385 4.97495 167.102 5.22495C167.818 5.45828 168.335 5.84995 168.652 6.39995C168.968 6.93328 169.127 7.64995 169.127 8.54995V17.6249H167.652L166.852 16.3749C166.252 16.8916 165.585 17.2749 164.852 17.5249C164.135 17.7749 163.327 17.8999 162.427 17.8999Z" fill="white" />
            <path d="M177.122 17.8999C176.205 17.8999 175.439 17.7999 174.822 17.5999C174.205 17.3833 173.714 17.0333 173.347 16.5499C172.997 16.0499 172.739 15.3833 172.572 14.5499C172.422 13.6999 172.347 12.6416 172.347 11.3749C172.347 10.1083 172.422 9.05828 172.572 8.22495C172.739 7.37495 172.997 6.70828 173.347 6.22495C173.714 5.72495 174.205 5.37495 174.822 5.17495C175.439 4.95828 176.205 4.84995 177.122 4.84995C177.589 4.84995 178.072 4.86661 178.572 4.89995C179.089 4.93328 179.58 4.99161 180.047 5.07494C180.514 5.14161 180.905 5.22495 181.222 5.32495L180.897 7.57495C180.347 7.44161 179.805 7.34995 179.272 7.29995C178.755 7.23328 178.214 7.19995 177.647 7.19995C176.88 7.19995 176.347 7.34995 176.047 7.64995C175.747 7.94995 175.597 8.48328 175.597 9.24995V15.2999C176.114 15.4666 176.864 15.5499 177.847 15.5499C178.397 15.5499 178.922 15.4999 179.422 15.3999C179.939 15.2999 180.53 15.1416 181.197 14.9249L181.497 17.1249C180.897 17.3749 180.214 17.5666 179.447 17.6999C178.697 17.8333 177.922 17.8999 177.122 17.8999Z" fill="white" />
            <path d="M188.426 17.8999C187.509 17.8999 186.742 17.7999 186.126 17.5999C185.509 17.3833 185.017 17.0333 184.651 16.5499C184.301 16.0499 184.042 15.3833 183.876 14.5499C183.726 13.6999 183.651 12.6416 183.651 11.3749C183.651 10.1083 183.726 9.05828 183.876 8.22495C184.042 7.37495 184.301 6.70828 184.651 6.22495C185.017 5.72495 185.509 5.37495 186.126 5.17495C186.742 4.95828 187.509 4.84995 188.426 4.84995C188.892 4.84995 189.376 4.86661 189.876 4.89995C190.392 4.93328 190.884 4.99161 191.351 5.07494C191.817 5.14161 192.209 5.22495 192.526 5.32495L192.201 7.57495C191.651 7.44161 191.109 7.34995 190.576 7.29995C190.059 7.23328 189.517 7.19995 188.951 7.19995C188.184 7.19995 187.651 7.34995 187.351 7.64995C187.051 7.94995 186.901 8.48328 186.901 9.24995V15.2999C187.417 15.4666 188.167 15.5499 189.151 15.5499C189.701 15.5499 190.226 15.4999 190.726 15.3999C191.242 15.2999 191.834 15.1416 192.501 14.9249L192.801 17.1249C192.201 17.3749 191.517 17.5666 190.751 17.6999C190.001 17.8333 189.226 17.8999 188.426 17.8999Z" fill="white" />
            <path d="M200.654 17.8999C199.554 17.8999 198.638 17.7999 197.904 17.5999C197.171 17.3833 196.588 17.0333 196.154 16.5499C195.721 16.0499 195.413 15.3833 195.229 14.5499C195.046 13.6999 194.954 12.6416 194.954 11.3749C194.954 10.1083 195.046 9.05828 195.229 8.22495C195.413 7.37495 195.721 6.70828 196.154 6.22495C196.588 5.72495 197.171 5.37495 197.904 5.17495C198.638 4.95828 199.554 4.84995 200.654 4.84995C201.771 4.84995 202.696 4.95828 203.429 5.17495C204.163 5.37495 204.738 5.72495 205.154 6.22495C205.588 6.70828 205.896 7.36661 206.079 8.19995C206.263 9.03328 206.354 10.0916 206.354 11.3749C206.354 12.6416 206.263 13.6999 206.079 14.5499C205.896 15.3833 205.588 16.0499 205.154 16.5499C204.738 17.0333 204.154 17.3833 203.404 17.5999C202.671 17.7999 201.754 17.8999 200.654 17.8999ZM198.204 15.4749H201.979C202.429 15.4749 202.729 15.4333 202.879 15.3499C203.046 15.2499 203.129 15.0749 203.129 14.8249V7.27495H199.354C198.904 7.27495 198.596 7.32494 198.429 7.42495C198.279 7.50828 198.204 7.67495 198.204 7.92495V15.4749Z" fill="white" />
            <path d="M220.167 5.12495V17.6249H218.692L217.892 16.3749C217.209 16.8916 216.467 17.2749 215.667 17.5249C214.867 17.7749 213.967 17.8999 212.967 17.8999C211.801 17.8999 210.942 17.6749 210.392 17.2249C209.842 16.7583 209.567 16.0333 209.567 15.0499V5.12495H212.642V15.6499H215.217C215.934 15.6499 216.426 15.5583 216.692 15.3749C216.959 15.1916 217.092 14.8583 217.092 14.3749V5.12495H220.167Z" fill="white" />
            <path d="M224.194 17.6249V5.12495H225.644L226.469 6.37495C227.119 5.85828 227.828 5.47495 228.594 5.22495C229.361 4.97495 230.228 4.84995 231.194 4.84995C232.361 4.84995 233.253 5.04995 233.869 5.44995C234.486 5.83328 234.794 6.39995 234.794 7.14995V17.6249H231.719V7.37495H229.119C228.419 7.37495 227.936 7.46661 227.669 7.64995C227.403 7.81661 227.269 8.14995 227.269 8.64995V17.6249H224.194Z" fill="white" />
            <path d="M241.546 17.8999C240.813 17.8999 240.271 17.7333 239.921 17.3999C239.571 17.0499 239.396 16.5249 239.396 15.8249V2.59995L242.446 1.82495V15.3749C242.696 15.4083 242.946 15.4416 243.196 15.4749C243.463 15.4916 243.788 15.5083 244.171 15.5249L243.996 17.5999C243.463 17.6999 242.996 17.7749 242.596 17.8249C242.196 17.8749 241.846 17.8999 241.546 17.8999ZM237.746 7.19995V5.12495H244.571V7.19995H237.746Z" fill="white" />
            <path d="M249.057 12.5249L248.782 8.49995C248.766 8.24995 248.866 8.04995 249.082 7.89995C249.316 7.74995 249.757 7.56661 250.407 7.34995L252.757 6.57494V4.07494C252.441 4.02495 252.107 3.99161 251.757 3.97495C251.407 3.94161 251.049 3.92494 250.682 3.92494C250.182 3.92494 249.591 3.97494 248.907 4.07494C248.224 4.15828 247.532 4.27495 246.832 4.42495L246.432 2.32494C247.216 2.09161 247.982 1.91661 248.732 1.79995C249.482 1.68328 250.191 1.62494 250.857 1.62494C252.124 1.62494 253.132 1.74161 253.882 1.97494C254.632 2.20828 255.174 2.58328 255.507 3.09995C255.841 3.61661 256.007 4.30828 256.007 5.17495C256.007 5.74161 255.941 6.22495 255.807 6.62495C255.691 7.02495 255.466 7.38328 255.132 7.69995C254.799 7.99995 254.316 8.29161 253.682 8.57495C253.049 8.85828 252.207 9.16661 251.157 9.49995L251.032 12.5249H249.057ZM248.257 15.9499C248.257 15.2833 248.374 14.8083 248.607 14.5249C248.841 14.2249 249.324 14.0749 250.057 14.0749C250.791 14.0749 251.266 14.2249 251.482 14.5249C251.716 14.8083 251.832 15.2833 251.832 15.9499C251.832 16.5999 251.716 17.0666 251.482 17.3499C251.266 17.6333 250.791 17.7749 250.057 17.7749C249.324 17.7749 248.841 17.6333 248.607 17.3499C248.374 17.0666 248.257 16.5999 248.257 15.9499Z" fill="white" />
          </svg>
        </div> */}
        Don't have an account
        <button className="sign-up" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signin;