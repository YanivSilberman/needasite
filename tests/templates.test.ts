import { describe, it, expect } from 'vitest';
import { detectTemplate, templates } from '../src/templates';

describe('templates', () => {
  describe('templates array', () => {
    it('should have at least 5 templates', () => {
      expect(templates.length).toBeGreaterThanOrEqual(5);
    });

    it('should have required fields for each template', () => {
      for (const template of templates) {
        expect(template.name).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.components).toBeInstanceOf(Array);
        expect(template.keywords).toBeInstanceOf(Array);
        expect(template.components.length).toBeGreaterThan(0);
        expect(template.keywords.length).toBeGreaterThan(0);
      }
    });
  });

  describe('detectTemplate', () => {
    it('should detect portfolio template for photographer prompts', () => {
      const template = detectTemplate('A portfolio for a photographer named Sarah');
      expect(template.name).toBe('portfolio');
    });

    it('should detect restaurant template for food-related prompts', () => {
      const template = detectTemplate('A website for my Italian restaurant');
      expect(template.name).toBe('restaurant');
    });

    it('should detect event template for wedding prompts', () => {
      const template = detectTemplate('A wedding invitation website for John and Jane');
      expect(template.name).toBe('event');
    });

    it('should detect service template for consultant prompts', () => {
      const template = detectTemplate('A website for my consulting business');
      expect(template.name).toBe('service');
    });

    it('should detect landing template for product prompts', () => {
      const template = detectTemplate('A landing page for my new mobile app');
      expect(template.name).toBe('landing');
    });

    it('should detect personal template for resume prompts', () => {
      const template = detectTemplate('A personal resume website');
      expect(template.name).toBe('personal');
    });

    it('should default to personal for ambiguous prompts', () => {
      const template = detectTemplate('A simple website');
      expect(template.name).toBe('personal');
    });

    it('should be case-insensitive', () => {
      const template = detectTemplate('A PORTFOLIO for a PHOTOGRAPHER');
      expect(template.name).toBe('portfolio');
    });
  });
});
