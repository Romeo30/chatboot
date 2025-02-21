
import { describe, it, expect } from 'vitest';
import { processMessage } from '../services/chat';

describe('Chat Service', () => {
  it('should process user message correctly', async () => {
    const result = await processMessage('Hello');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle empty messages', async () => {
    const result = await processMessage('');
    expect(result).toBe('Message cannot be empty');
  });
});
