import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from 'nestjs-request-context';

/**
 * Setting some isolated context for each request.
 */

export class AppRequestContext extends RequestContext {
  requestId: string;
  headers: Record<string, any>;
  user: { id: string } | null
}

export class RequestContextService {
  private static storage = new AsyncLocalStorage<AppRequestContext>();

  static runWithContext(fn: () => void, context: AppRequestContext) {
    this.storage.run(context, fn);
  }

  static getContext(): AppRequestContext | undefined {
    return this.storage.getStore();
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    if (ctx) ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext()?.requestId ?? '';
  }

  static setUser(user: AppRequestContext["user"]): void {
    const ctx = this.getContext();
    if (ctx) ctx.user = user;
  }

  static getUser(): AppRequestContext["user"] {
    return this.getContext()?.user ?? null;
  }

  static setHeaders(headers: Record<string, string>): void {
    const ctx = this.getContext();
    
    if (ctx) ctx.headers = headers;
  }

  static getHeaders(): Record<string, string> {
    return this.getContext()?.headers ?? {};
  }
}