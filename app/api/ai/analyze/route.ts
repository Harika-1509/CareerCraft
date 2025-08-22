import { NextRequest, NextResponse } from "next/server";
import { GeminiService } from "@/lib/services/geminiService";

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();

    if (!answers) {
      return NextResponse.json(
        { error: "Answers are required" },
        { status: 400 }
      );
    }

    const analysis = await GeminiService.analyzeOnboardingAnswers(answers);

    return NextResponse.json({
      success: true,
      analysis
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze answers" },
      { status: 500 }
    );
  }
}
