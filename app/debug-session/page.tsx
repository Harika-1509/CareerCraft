"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugSessionPage() {
  const { data: session, status, update } = useSession();

  const refreshSession = async () => {
    await update();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Session Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Status:</h3>
              <p className="text-sm">{status}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Session Data:</h3>
              <pre className="bg-muted p-4 rounded text-xs overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">User ID:</h3>
              <p className="text-sm">{session?.user?.id || 'undefined'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Email:</h3>
              <p className="text-sm">{session?.user?.email || 'undefined'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Onboarding Status:</h3>
              <p className="text-sm">{session?.user?.onboarding ? 'Completed' : 'Not Completed'}</p>
            </div>

            <Button onClick={refreshSession}>
              Refresh Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
