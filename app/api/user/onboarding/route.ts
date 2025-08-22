import { NextRequest } from "next/server";
import { UserController } from "@/lib/controllers/userController";

export async function POST(request: NextRequest) {
  return UserController.updateOnboarding(request);
}
