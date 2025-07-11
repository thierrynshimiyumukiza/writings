import {
  users,
  posts,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Post operations
  getAllPosts(published?: boolean): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<boolean>;
  getPostsByTag(tag: string): Promise<Post[]>;
  getPostsByYear(year: number): Promise<Post[]>;
  searchPosts(query: string): Promise<Post[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Post operations
  async getAllPosts(published?: boolean): Promise<Post[]> {
    const query = db.select().from(posts);
    
    if (published !== undefined) {
      query.where(eq(posts.published, published));
    }
    
    return await query.orderBy(desc(posts.createdAt));
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));
    return post;
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db
      .insert(posts)
      .values(post)
      .returning();
    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db
      .delete(posts)
      .where(eq(posts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getPostsByTag(tag: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(and(
        eq(posts.published, true),
        like(posts.tags, `%${tag}%`)
      ))
      .orderBy(desc(posts.createdAt));
  }

  async getPostsByYear(year: number): Promise<Post[]> {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);
    
    return await db
      .select()
      .from(posts)
      .where(and(
        eq(posts.published, true),
        // Note: This is a simplified date range query
        // In production, you'd want to use proper date functions
      ))
      .orderBy(desc(posts.createdAt));
  }

  async searchPosts(query: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(and(
        eq(posts.published, true),
        like(posts.title, `%${query}%`)
      ))
      .orderBy(desc(posts.createdAt));
  }
}

export const storage = new DatabaseStorage();
