import JWT from "jsonwebtoken";
import "dotenv/config";

export const sendTokenResponse = (user, res, statusCode, message) => {
  const token = JWT.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1h" }
  );

  console.log(token); // ! production

  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,  
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
