import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import TerminalWindow from "@/components/TerminalWindow";
import { Post } from "@/types/Post";

export default function Archive() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts?published=true');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  // Group posts by year and month
  const groupedPosts = posts?.reduce((acc, post) => {
    const date = new Date(post.createdAt!);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    
    acc[year][month].push(post);
    return acc;
  }, {} as Record<number, Record<string, Post[]>>);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-electric-400 mb-4">Post Archive</h2>
          <p className="text-slate-400 text-lg">All blog posts organized by date</p>
        </div>
        
        {isLoading ? (
          <div className="text-center text-slate-400">
            <div className="loading-dots">Loading archive</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            Failed to load archive. Please try again later.
          </div>
        ) : !groupedPosts || Object.keys(groupedPosts).length === 0 ? (
          <div className="text-center text-slate-400">
            No posts in archive yet.
          </div>
        ) : (
          <TerminalWindow className="p-8">
            <div className="space-y-8">
              {Object.entries(groupedPosts)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, monthData]) => (
                  <div key={year} className="archive-year">
                    <h3 className="text-2xl font-bold text-electric-400 mb-6">{year}</h3>
                    <div className="space-y-4">
                      {Object.entries(monthData)
                        .sort(([a], [b]) => new Date(`${a} 1, ${year}`).getTime() - new Date(`${b} 1, ${year}`).getTime())
                        .map(([month, monthPosts]) => (
                          <div key={month} className="archive-month">
                            <h4 className="text-xl font-semibold text-neon-400 mb-4">{month}</h4>
                            <div className="space-y-3">
                              {monthPosts.map((post) => (
                                <div key={post.id} className="flex items-center justify-between p-4 bg-deep-blue-800/30 rounded-lg hover:bg-deep-blue-800/50 transition-colors">
                                  <div>
                                    <h5 className="font-semibold text-electric-400">
                                      <Link href={`/post/${post.slug}`} className="hover:text-electric-300">
                                        {post.title}
                                      </Link>
                                    </h5>
                                    <p className="text-sm text-slate-400">
                                      {new Date(post.createdAt!).toLocaleDateString()} • {Math.ceil(post.content.length / 200)} min read
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    {post.tags?.slice(0, 2).map((tag, index) => (
                                      <span key={index} className="tag">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </TerminalWindow>
        )}
      </div>
    </section>
  );
}
