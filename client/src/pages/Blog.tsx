import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TerminalWindow from "@/components/TerminalWindow";
import { Post } from "@/types/Post";

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts?published=true');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-electric-400 mb-4">Security Research</h2>
          <p className="text-slate-400 text-lg">Exploring vulnerabilities and security techniques</p>
        </div>
        
        {isLoading ? (
          <div className="text-center text-slate-400">
            <div className="loading-dots">Loading posts</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            Failed to load posts. Please try again later.
          </div>
        ) : posts?.length === 0 ? (
          <div className="text-center text-slate-400">
            No posts available yet. Check back soon!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <article key={post.id} className="terminal-window p-6 card-hover">
                <div className="terminal-dots"></div>
                <div className="pt-8">
                  <div className="post-meta mb-4">
                    <span><i className="fas fa-calendar-alt mr-2"></i>{new Date(post.createdAt!).toLocaleDateString()}</span>
                    <span><i className="fas fa-clock mr-2"></i>{Math.ceil(post.content.length / 200)} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-electric-400 mb-3">
                    <Link href={`/post/${post.slug}`} className="hover:text-electric-300">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/post/${post.slug}`}>
                    <Button variant="outline" className="btn-secondary">
                      Read More <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/archive">
            <Button className="btn-primary">
              <i className="fas fa-archive mr-2"></i>
              View Archive
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
