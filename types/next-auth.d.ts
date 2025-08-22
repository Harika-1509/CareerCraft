import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      name?: string | null;
      image?: string | null;
      onboarding: boolean;
      domain: string | null;
      onboardingData: any;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    onboarding: boolean;
    domain: string | null;
    onboardingData: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    onboarding: boolean;
    domain: string | null;
    onboardingData: any;
  }
}
