export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  source: string;
  url: string;
  image: string;
  content?: string;
  author?: string;
  tags?: string[];
}

export interface NewsResponse {
  success: boolean;
  data: NewsItem[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

export interface NewsFilters {
  domain?: string;
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

class NewsService {
  constructor() {
    // Service now uses our API route to avoid CORS issues
  }

  // Fetch news from our API route (which proxies to NewsAPI)
  async fetchExternalNews(filters: NewsFilters): Promise<NewsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      // Build search query - use domain as the main query
      if (filters.search) {
        queryParams.append('search', filters.search);
      } else if (filters.domain) {
        queryParams.append('domain', filters.domain);
      }
      
      if (filters.category) {
        queryParams.append('category', filters.category);
      }
      
      if (filters.page) {
        queryParams.append('page', filters.page.toString());
      }
      
      if (filters.limit) {
        queryParams.append('limit', filters.limit.toString());
      }

      const response = await fetch(`/api/news?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`News API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch news data');
      }

      return data;
    } catch (error) {
      console.error('Error fetching external news:', error);
      throw error; // Re-throw error - no fallback to mock data
    }
  }





  // Search news by keyword
  async searchNews(query: string, domain?: string): Promise<NewsResponse> {
    return this.fetchExternalNews({ search: query, domain });
  }

  // Get news by category
  async getNewsByCategory(category: string, domain?: string): Promise<NewsResponse> {
    return this.fetchExternalNews({ category, domain });
  }

  // Get trending news
  async getTrendingNews(domain?: string): Promise<NewsResponse> {
    return this.fetchExternalNews({ domain, category: 'trending' });
  }
}

export const newsService = new NewsService();
