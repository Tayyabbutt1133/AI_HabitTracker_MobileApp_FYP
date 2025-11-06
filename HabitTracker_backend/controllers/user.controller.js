import { StatusCodes } from 'http-status-codes'
import { prisma } from '../utils/prisma.js'


export async function signup(req, res) {

  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You missed something very Important !"
    })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })

  return res.status(StatusCodes.OK).json({
    message: "We Recieved user information successfully !"
  })
}



export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You missed something. Try again!",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
}


export async function changePassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You missed something. Try again!",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }

    if (user.password !== oldPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Old password is incorrect",
      });
    }

    await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });

    return res.status(StatusCodes.OK).json({
      message: "Password changed successfully!",
    });

  } catch (error) {
    console.error("Password change error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
}
