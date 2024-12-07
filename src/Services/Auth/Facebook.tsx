import React from 'react';
import FacebookLogin from 'react-facebook-login-lite';
import "../../Components/Css/Custom.css"
import LogoFacebook from "../../assets/icons/facebook.png"

const responseFacebook = (response: any) => {
  console.log("este el id del cambron", response.authResponse.userID);
  console.log("este el nombre del cambron", response.user.name);
  console.log("este el email del cambron", response.user.email);
};

export const RenderFacebookLogin = () => {
  return (
    <div className="login-buttons">
      <FacebookLogin
        appId="2046558475758881"
        onSuccess={responseFacebook}
        onFailure={responseFacebook}
        fields="name,email,picture"
        btnText="Continue with Facebook"
        imgSrc={LogoFacebook}
      />
    </div>
  );
};

export default RenderFacebookLogin;
