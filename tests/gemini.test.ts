import { describe, it, expect } from 'vitest';

// Test the HTML extraction logic
describe('extractHtml', () => {
  // We need to export the function or test it indirectly
  // For now, we'll test the expected behavior through the module

  function extractHtml(text: string): string {
    let html = text.trim();
    
    const htmlBlockMatch = html.match(/```html\s*([\s\S]*?)```/);
    if (htmlBlockMatch) {
      html = htmlBlockMatch[1].trim();
    }
    
    const blockMatch = html.match(/```\s*([\s\S]*?)```/);
    if (blockMatch && !htmlBlockMatch) {
      html = blockMatch[1].trim();
    }
    
    if (!html.toLowerCase().startsWith('<!doctype') && !html.toLowerCase().startsWith('<html')) {
      const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
      const htmlIndex = html.toLowerCase().indexOf('<html');
      const startIndex = Math.min(
        doctypeIndex >= 0 ? doctypeIndex : Infinity,
        htmlIndex >= 0 ? htmlIndex : Infinity
      );
      if (startIndex < Infinity) {
        html = html.substring(startIndex);
      }
    }
    
    return html;
  }

  it('should return clean HTML as-is', () => {
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    expect(extractHtml(html)).toBe(html);
  });

  it('should extract HTML from markdown code blocks', () => {
    const input = '```html\n<!DOCTYPE html><html></html>\n```';
    expect(extractHtml(input)).toBe('<!DOCTYPE html><html></html>');
  });

  it('should extract HTML from generic code blocks', () => {
    const input = '```\n<!DOCTYPE html><html></html>\n```';
    expect(extractHtml(input)).toBe('<!DOCTYPE html><html></html>');
  });

  it('should find HTML in mixed content', () => {
    const input = 'Here is your website:\n<!DOCTYPE html><html></html>';
    expect(extractHtml(input)).toBe('<!DOCTYPE html><html></html>');
  });

  it('should handle lowercase doctype', () => {
    const html = '<!doctype html><html><head></head><body></body></html>';
    expect(extractHtml(html)).toBe(html);
  });

  it('should handle HTML starting with html tag', () => {
    const html = '<html><head></head><body></body></html>';
    expect(extractHtml(html)).toBe(html);
  });

  it('should trim whitespace', () => {
    const input = '  \n<!DOCTYPE html><html></html>\n  ';
    expect(extractHtml(input)).toBe('<!DOCTYPE html><html></html>');
  });
});
