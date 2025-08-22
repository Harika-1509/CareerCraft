import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../services/userService';
import dbConnect from '../db';

export class UserController {
  // Get user profile
  static async getUserProfile(userId: string) {
    try {
      await dbConnect();
      
      const user = await UserService.getUserById(userId);
      return NextResponse.json(user);
    } catch (error: any) {
      console.error('Get user error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch user data' },
        { status: 404 }
      );
    }
  }

  // Update onboarding data
  static async updateOnboarding(request: NextRequest) {
    try {
      await dbConnect();
      
      const body = await request.json();
      const { userId, domain, onboardingData, isComplete = false } = body;

      if (!userId) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        );
      }

      const user = await UserService.updateOnboarding(userId, {
        domain,
        onboardingData,
        isComplete,
      });

      return NextResponse.json({
        success: true,
        message: isComplete ? 'Onboarding completed successfully' : 'Progress saved successfully',
        user,
      });
    } catch (error: any) {
      console.error('Onboarding update error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to update onboarding data' },
        { status: 500 }
      );
    }
  }
}
