"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");

class AuthController {
  async register({ request, auth, response }) {
    const username = request.input("username");
    const email = request.input("email");
    const password = request.input("password");

    let newUser;
    let user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    try {
      user = await user.save();
    } catch (error) {
      return response.status(500).json({
        msg: "Username or email has been used!"
      });
    }
    newUser = await User.findBy("username", username);

    let accessToken = await auth.withRefreshToken().generate(newUser);
    return response.status(200).json({
      user: newUser,
      access_token: accessToken
    });
  }

  async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");

    let user;
    user = await User.findBy("email", email);
    if (!user) {
      return response.status(403).json({
        msg: "You are not registered!"
      });
    }

    const isSame = await Hash.verify(password, user.password);

    if (isSame) {
      try {
        let access_token = await auth.withRefreshToken().generate(user);
        return response.status(200).json({
          user: user,
          access_token: access_token
        });
      } catch (error) {
        return response.status(403).json({
          msg: "You need to register firts!"
        });
      }
    } else {
      return response.status(403).json({
        msg: "Your password is wrong!"
      });
    }
  }

  async getUser({ request, auth, response }) {
    try {
      let user = await auth.getUser();
      response.status(200).json(user);
    } catch (error) {
      response.send("Missing or invalid jwt token");
    }
  }

  async refreshToken({ request, auth }) {
    const refreshToken = request.input("refresh_token");
    return await auth.newRefreshToken().generateForRefreshToken(refreshToken);
  }

  async logout({ request, auth, response }) {
    const apiToken = auth.getAuthHeader();
    await auth.revokeTokens([apiToken], true);
    return response.status(200).json({
      msg: "Logout Success!"
    });
  }
}

module.exports = AuthController;
