import JWT from "jsonwebtoken";
import "dotenv/config";

export const sendTokenResponse = (user, res, statusCode, message) => {
  const token = JWT.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  console.log(token); // ! production

  return res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(statusCode)
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
};
