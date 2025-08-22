import { NextRequest } from "next/server";
import { AuthController } from "@/lib/controllers/authController";

export async function POST(request: NextRequest) {
  return AuthController.login(request);
}
