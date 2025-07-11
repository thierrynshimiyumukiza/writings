import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TerminalWindow from "@/components/TerminalWindow";
import { Post, InsertPost } from "@/types/Post";
import { slugify } from "@/lib/slugify";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    published: false
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
    enabled: isAuthenticated
  });

  const createPostMutation = useMutation({
    mutationFn: async (post: InsertPost) => {
      return await apiRequest('POST', '/api/posts', post);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      resetForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, post }: { id: number; post: Partial<InsertPost> }) => {
      return await apiRequest('PUT', `/api/posts/${id}`, post);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      setIsEditing(false);
      setEditingPost(null);
      resetForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('DELETE', `/api/posts/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      tags: '',
      featuredImage: '',
      published: false
    });
    setIsEditing(false);
    setEditingPost(null);
    setPreviewMode(false);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: slugify(title)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: InsertPost = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      featuredImage: formData.featuredImage || undefined,
      published: formData.published,
    };

    if (isEditing && editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, post: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      tags: post.tags?.join(', ') || '',
      featuredImage: post.featuredImage || '',
      published: post.published || false
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-slate-400 loading-dots">Loading</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-electric-400 mb-4">Admin Panel</h2>
          <p className="text-slate-400 text-lg">Manage blog posts and content</p>
        </div>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Post Editor</TabsTrigger>
            <TabsTrigger value="manage">Manage Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-8">
            <TerminalWindow className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-electric-400">
                  {isEditing ? 'Edit Post' : 'Create New Post'}
                </h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="btn-secondary"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    {previewMode ? 'Edit' : 'Preview'}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>

              {previewMode ? (
                <div className="prose prose-invert max-w-none">
                  <h1 className="text-3xl font-bold text-electric-400 mb-4">{formData.title || 'Preview Title'}</h1>
                  <div className="post-meta mb-6">
                    <span><i className="fas fa-calendar-alt mr-2"></i>{new Date().toLocaleDateString()}</span>
                    <span><i className="fas fa-clock mr-2"></i>{Math.ceil(formData.content.length / 200)} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.split(',').map((tag, index) => (
                      <span key={index} className="tag">{tag.trim()}</span>
                    ))}
                  </div>
                  <div className="text-slate-300 whitespace-pre-wrap">{formData.content || 'Your post content will appear here...'}</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-slate-300 mb-2 block">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="form-input"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-slate-300 mb-2 block">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="form-input"
                      placeholder="post-url-slug"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-slate-300 mb-2 block">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      className="form-input"
                      placeholder="security, reverse-engineering, exploit"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-slate-300 mb-2 block">Excerpt (optional)</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="form-textarea min-h-[100px]"
                      placeholder="Brief description of the post..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="featuredImage" className="text-slate-300 mb-2 block">Featured Image URL (optional)</Label>
                    <Input
                      id="featuredImage"
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      className="form-input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-slate-300 mb-2 block">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="form-textarea min-h-[400px]"
                      placeholder="Write your post content in Markdown..."
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded border-slate-600 bg-slate-700 text-electric-400 focus:ring-electric-400"
                    />
                    <Label htmlFor="published" className="text-slate-300">Publish immediately</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="btn-primary"
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      {isEditing ? 'Update Post' : 'Create Post'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                      className="btn-secondary"
                    >
                      <i className="fas fa-save mr-2"></i>
                      Save Draft
                    </Button>
                  </div>
                </form>
              )}
            </TerminalWindow>
          </TabsContent>

          <TabsContent value="manage" className="mt-8">
            <TerminalWindow className="p-8">
              <h3 className="text-xl font-bold text-electric-400 mb-6">Manage Posts</h3>
              
              {postsLoading ? (
                <div className="text-center text-slate-400">
                  <div className="loading-dots">Loading posts</div>
                </div>
              ) : !posts?.length ? (
                <div className="text-center text-slate-400">
                  No posts found. Create your first post using the editor.
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-deep-blue-800/30 border-slate-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-electric-400">{post.title}</CardTitle>
                            <p className="text-sm text-slate-400 mt-1">
                              {new Date(post.createdAt!).toLocaleDateString()} • 
                              {post.published ? (
                                <span className="text-neon-400 ml-1">Published</span>
                              ) : (
                                <span className="text-yellow-400 ml-1">Draft</span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(post)}
                              className="btn-secondary"
                            >
                              <i className="fas fa-edit mr-2"></i>
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(post.id)}
                            >
                              <i className="fas fa-trash mr-2"></i>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 mb-2">
                          {post.excerpt || post.content.substring(0, 100) + '...'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TerminalWindow>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
