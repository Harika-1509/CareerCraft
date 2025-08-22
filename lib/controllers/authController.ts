import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../services/userService';
import dbConnect from '../db';

export class AuthController {
  // Register new user
  static async register(request: NextRequest) {
    try {
      await dbConnect();
      
      const body = await request.json();
      const { firstName, lastName, email, phone, password, confirmPassword } = body;

      // Validation
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }

      if (firstName.length > 50 || lastName.length > 50) {
        return NextResponse.json(
          { error: 'First name and last name must be 50 characters or less' },
          { status: 400 }
        );
      }

      if (password !== confirmPassword) {
        return NextResponse.json(
          { error: 'Passwords do not match' },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      // Create user
      const user = await UserService.createUser({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: error.message || 'Registration failed' },
        { status: 500 }
      );
    }
  }

  // Login user
  static async login(request: NextRequest) {
    try {
      await dbConnect();
      
      const body = await request.json();
      const { email, password } = body;

      // Validation
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      // Authenticate user
      const user = await UserService.authenticateUser(email, password);

      return NextResponse.json(user);
    } catch (error: any) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: error.message || 'Authentication failed' },
        { status: 401 }
      );
    }
  }
}
