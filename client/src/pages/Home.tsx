import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TerminalWindow from "@/components/TerminalWindow";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/Post";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts?published=true');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <TerminalWindow className="p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="typewriter-text text-electric-400">Welcome to Hacker's Blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 mb-8 font-mono">
              <span className="terminal-prompt">Reverse Engineering • Exploit Development • Security Research</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button className="btn-primary">
                  <i className="fas fa-user-secret mr-2"></i>
                  Explore My Work
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="btn-secondary">
                  <i className="fas fa-terminal mr-2"></i>
                  Read Blog Posts
                </Button>
              </Link>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-blue-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-electric-400 mb-4">Latest Research</h2>
            <p className="text-slate-400 text-lg">Exploring vulnerabilities and security techniques</p>
          </div>
          
          {isLoading ? (
            <div className="text-center text-slate-400">Loading posts...</div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center text-slate-400">No posts available yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
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
            <Link href="/blog">
              <Button className="btn-primary">
                <i className="fas fa-archive mr-2"></i>
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
