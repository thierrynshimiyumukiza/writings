import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import TerminalWindow from "@/components/TerminalWindow";
import CodeBlock from "@/components/CodeBlock";
import { Post } from "@/types/Post";
import { renderMarkdown } from "@/lib/markdown";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ['/api/posts', slug],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-slate-400 loading-dots">Loading post</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-red-400">Post not found</div>
          <Link href="/blog">
            <Button className="btn-secondary mt-4">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="btn-secondary mb-6">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Blog
            </Button>
          </Link>
          
          <div className="post-meta mb-4">
            <span><i className="fas fa-calendar-alt mr-2"></i>{new Date(post.createdAt!).toLocaleDateString()}</span>
            <span><i className="fas fa-clock mr-2"></i>{Math.ceil(post.content.length / 200)} min read</span>
            <span><i className="fas fa-user mr-2"></i>By Hacker</span>
          </div>
          
          <h1 className="text-4xl font-bold text-electric-400 mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <TerminalWindow className="p-8">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
