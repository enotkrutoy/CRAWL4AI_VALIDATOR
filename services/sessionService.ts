import { Message, MessageRole, SessionState } from '../types';

/**
 * InMemorySessionService
 * 
 * Simulates the storage layer for conversation history.
 * In a real backend, this would connect to Redis or a database.
 * Here it manages React state updates via a closure or simple object store pattern
 * adapted for a client-side singleton usage.
 */

class InMemorySessionService {
  private sessions: Map<string, Message[]> = new Map();

  public createSession(): string {
    const sessionId = crypto.randomUUID();
    this.sessions.set(sessionId, []);
    return sessionId;
  }

  public getHistory(sessionId: string): Message[] {
    return this.sessions.get(sessionId) || [];
  }

  public addMessage(sessionId: string, message: Message): void {
    const history = this.getHistory(sessionId);
    history.push(message);
    this.sessions.set(sessionId, history);
  }

  public clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}

export const sessionService = new InMemorySessionService();