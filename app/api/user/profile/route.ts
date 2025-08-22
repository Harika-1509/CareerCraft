import { NextRequest, NextResponse } from "next/server";
import { UserController } from "@/lib/controllers/userController";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  return UserController.getUserProfileByEmail(email);
}
