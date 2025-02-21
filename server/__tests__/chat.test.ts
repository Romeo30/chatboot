
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

  it('should handle long messages', async () => {
    const longMessage = 'a'.repeat(1000);
    const result = await processMessage(longMessage);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle special characters', async () => {
    const specialChars = '!@#$%^&*()_+';
    const result = await processMessage(specialChars);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should maintain context between messages', async () => {
    await processMessage('My name is John');
    const result = await processMessage('What is my name?');
    expect(result.toLowerCase()).toContain('john');
  });
});
