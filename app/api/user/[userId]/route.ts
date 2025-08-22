import { NextRequest } from "next/server";
import { UserController } from "@/lib/controllers/userController";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  return UserController.getUserProfile(params.userId);
}
