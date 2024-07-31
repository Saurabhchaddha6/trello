import dbConnect from "@/lib/dbConnect";
import User from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  console.log("API route started");
  await dbConnect();
  console.log("Database connected");

  try {
    const { name, email, password } = await request.json();
    console.log("Request parsed");

    const existingUserByEmail = await User.findOne({ email });
    console.log("User lookup completed");

    if (existingUserByEmail) {
      console.log("Existing user found");
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists with this email"
        }),
        { status: 400 }
      );
    } else {
      console.log("Hashing password");
      const hashedPassword = await bcrypt.hash(password, 6);
      console.log("Password hashed");

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        createdAt: Date.now(),
        task: []
      });

      console.log("Saving user");
      await newUser.save();
      console.log("User saved");

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