import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Get the body data from the request
    const { firstName, lastName, email, password } = await req.json();

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      console.error("Missing required fields:", { firstName, lastName, email, password });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Return the created user as a response
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return new Response(
      JSON.stringify({ error: "Error creating user" }),
      { status: 500 }
    );
  }
}
