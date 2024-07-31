import dbConnect from "@/lib/dbConnect";
import User from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists with this email"
        }),
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 6);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        createdAt: Date.now(), 
        task: []
      });
      await newUser.save();
      return new Response(
        JSON.stringify({
          success: true,
          message: "User registered successfully"
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error registering user"
      }),
      { status: 500 }
    );
  }
}
