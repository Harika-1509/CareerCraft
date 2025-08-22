"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Trophy, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function LAKONOWNDashboard() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Mock data for demonstration - in real app, this would come from API
  const [recommendations, setRecommendations] = useState({
    courses: [
      {
        id: 1,
        title: "Advanced Machine Learning",
        platform: "Coursera",
        duration: "8 weeks",
        rating: 4.8,
        price: "$49",
        domain: "AI & Machine Learning",
        status: "recommended"
      },
      {
        id: 2,
        title: "Full Stack Web Development",
        platform: "Udemy",
        duration: "12 weeks",
        rating: 4.6,
        price: "$29",
        domain: "Web Development",
        status: "recommended"
      }
    ],
    hackathons: [
      {
        id: 1,
        title: "AI Innovation Challenge 2024",
        organizer: "TechCorp",
        date: "2024-03-15",
        prize: "$10,000",
        domain: "AI & Machine Learning",
        status: "upcoming"
      },
      {
        id: 2,
        title: "Web3 Development Hackathon",
        organizer: "Blockchain Inc",
        date: "2024-04-01",
        prize: "$5,000",
        domain: "Web Development",
        status: "upcoming"
      }
    ],
    competitions: [
      {
        id: 1,
        title: "Data Science Competition",
        organizer: "Kaggle",
        deadline: "2024-03-30",
        prize: "$15,000",
        domain: "Data Science",
        status: "active"
      }
    ]
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/profile?email=${session?.user?.email}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startScraping = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recommendations/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          domain: userData?.domain,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Started scraping courses, hackathons, and competitions for your domain!",
        });
      } else {
        throw new Error("Failed to start scraping");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start scraping. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">LAKO NOWN Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {session.user?.name || session.user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {userData?.domain || "Domain Selected"}
              </Badge>
              <Button onClick={startScraping} disabled={isLoading} size="sm">
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <TrendingUp className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Scraping..." : "Update Recommendations"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Ready to accelerate your career in {userData?.domain || "your chosen domain"}?
                  </h2>
                  <p className="text-blue-100 text-lg">
                    We've curated personalized recommendations for courses, hackathons, and competitions just for you.
                  </p>
                </div>
                <div className="hidden md:block">
                  <Target className="w-24 h-24 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{recommendations.courses.length}</p>
                  <p className="text-sm text-muted-foreground">Recommended Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{recommendations.hackathons.length}</p>
                  <p className="text-sm text-muted-foreground">Hackathons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{recommendations.competitions.length}</p>
                  <p className="text-sm text-muted-foreground">Competitions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Recommended Courses</span>
                </CardTitle>
                <CardDescription>
                  Personalized course recommendations based on your domain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">{course.platform}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{course.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-green-600">{course.price}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Hackathons Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span>Upcoming Hackathons</span>
                </CardTitle>
                <CardDescription>
                  Exciting hackathons in your domain with great prizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.hackathons.map((hackathon) => (
                  <div key={hackathon.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{hackathon.title}</h4>
                        <p className="text-xs text-muted-foreground">{hackathon.organizer}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">{hackathon.date}</span>
                          </div>
                          <span className="text-xs font-medium text-green-600">{hackathon.prize}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {hackathon.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Competitions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Active Competitions</span>
              </CardTitle>
              <CardDescription>
                Compete with others and showcase your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.competitions.map((competition) => (
                  <div key={competition.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{competition.title}</h4>
                        <p className="text-sm text-muted-foreground">{competition.organizer}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">Deadline: {competition.deadline}</span>
                          </div>
                          <span className="text-sm font-medium text-green-600">{competition.prize}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {competition.status}
                        </Badge>
                        <Button size="sm">
                          Participate
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Next Steps</h3>
                <p className="text-muted-foreground mb-4">
                  Your domain has been saved and we're ready to scrape personalized recommendations for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={startScraping} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Scraping..." : "Start Scraping Recommendations"}
                  </Button>
                  <Button variant="outline">
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
