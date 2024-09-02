import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    // Correcting the jwt.sign method syntax and parameters
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    // Correcting the res.cookie method syntax and options
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,
        sameSite: "strict"
    });
};

export default generateTokenAndSetCookie;
