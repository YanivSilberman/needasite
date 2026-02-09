# needasite Brand Bible

## Core Ethos

**"The easiest site builder ever."**

Grandmas with zero internet experience should intuitively make and deploy websites in seconds.

This isn't a tagline—it's our product requirement. Every design decision, every word, every interaction must pass the grandma test: *Would my grandmother understand this without help?*

---

## Mission & Vision

**Mission**: Eliminate every barrier between having an idea and having a website.

**Vision**: A world where everyone—regardless of age, technical skill, or resources—can have a beautiful online presence.

**Promise**: Tell us what you want. We'll build it. That's it.

---

## Brand Personality

### We Are:
- **Warm** — Like a helpful friend, not a tech company
- **Clear** — No jargon, no confusion, no small print
- **Patient** — Never rushing, never judging
- **Confident** — We handle the hard stuff so you don't worry
- **Delightful** — Small moments of joy, not flashy gimmicks

### We Are NOT:
- Techy or "cool"
- Condescending or "dumbed down"
- Overwhelming with options
- Pushy with upsells
- Corporate or formal

### Brand Voice:
- Speak like a helpful neighbor, not a startup
- Use simple words (website, not "digital presence")
- One idea per sentence
- Active voice, present tense
- Celebrate small wins genuinely

**Examples:**
| ❌ Don't Say | ✅ Do Say |
|-------------|-----------|
| "Deploy your site to our CDN" | "Put your site online" |
| "Customize your template" | "Make changes" |
| "Error: Invalid input" | "Hmm, that didn't work. Try again?" |
| "Upgrade to Pro" | "Need more? We can help." |

---

## Target Audience

### Primary: The Intimidated
- 55+ years old
- Has avoided technology their whole life
- Wants a website for their small business, hobby, or family
- Has been told "it's easy" before and felt stupid when it wasn't
- Needs to feel safe, not judged

### Secondary: The Impatient
- Any age, tech-comfortable
- Just wants a quick site without learning a new tool
- Values time over customization
- "I don't want to become a web designer, I just need a website"

---

## Visual Identity

### Design Principles

1. **Generous Whitespace** — Breathing room reduces anxiety
2. **Large Touch Targets** — Minimum 48px, prefer 56px+ on mobile
3. **High Contrast** — WCAG AAA (7:1 ratio minimum)
4. **Single Focus** — One action per screen when possible
5. **Visible Text** — 18px minimum body, 16px absolute minimum
6. **No Surprises** — Buttons do what they say, always
7. **Forgiving** — Easy to undo, hard to break things

### Color Palette

#### Primary: Warm Purple
Our purple is softer and warmer than tech-purple. It feels approachable, not corporate.

| Name | Hex | Usage |
|------|-----|-------|
| **Purple 600** (Primary) | `#7C3AED` | Buttons, links, primary actions |
| **Purple 700** (Hover) | `#6D28D9` | Button hover states |
| **Purple 50** (Background) | `#F5F3FF` | Highlighted sections, cards |
| **Purple 100** (Border) | `#EDE9FE` | Subtle borders, dividers |

#### Neutral: Warm Grays
Our grays have a slight warm undertone—never cold or clinical.

| Name | Hex | Usage |
|------|-----|-------|
| **Gray 900** | `#1C1917` | Headings, important text |
| **Gray 700** | `#44403C` | Body text |
| **Gray 500** | `#78716C` | Secondary text, placeholders |
| **Gray 200** | `#E7E5E4` | Borders, dividers |
| **Gray 50** | `#FAFAF9` | Page backgrounds |
| **White** | `#FFFFFF` | Cards, input backgrounds |

#### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#16A34A` | Confirmations, completed states |
| **Success Light** | `#F0FDF4` | Success backgrounds |
| **Error** | `#DC2626` | Errors (gentle, not alarming) |
| **Error Light** | `#FEF2F2` | Error backgrounds |

### Typography

#### Font Family: Inter
- Clean, highly legible, excellent at all sizes
- Strong differentiation between similar letters (1, l, I)
- Open apertures for readability
- Free, widely available

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero heading | 36px / 2.25rem | 700 (Bold) | 1.2 |
| Page heading | 30px / 1.875rem | 700 (Bold) | 1.3 |
| Section heading | 24px / 1.5rem | 600 (Semibold) | 1.4 |
| Card heading | 20px / 1.25rem | 600 (Semibold) | 1.4 |
| Body large | 18px / 1.125rem | 400 (Regular) | 1.6 |
| Body | 16px / 1rem | 400 (Regular) | 1.6 |
| Button | 16px / 1rem | 500 (Medium) | 1 |
| Caption | 14px / 0.875rem | 400 (Regular) | 1.5 |

**Note:** Never go below 14px for any user-facing text.

### Icons

**Library:** Lucide Icons
- Simple, friendly, consistent stroke width
- Clear at small sizes
- Open source

**Usage:**
- Always pair with text labels (no icon-only buttons)
- Minimum size: 20px (prefer 24px)
- Use `stroke-width: 2` for consistency

### Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight internal spacing |
| `space-2` | 8px | Default internal spacing |
| `space-3` | 12px | Comfortable padding |
| `space-4` | 16px | Card padding, gaps |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large sections |
| `space-12` | 48px | Page sections |
| `space-16` | 64px | Hero spacing |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-md` | 6px | Small elements |
| `rounded-lg` | 8px | Buttons, inputs |
| `rounded-xl` | 12px | Cards |
| `rounded-2xl` | 16px | Modals, large cards |
| `rounded-full` | 9999px | Pills, avatars |

### Shadows

Subtle, warm shadows only:

```css
/* Card shadow */
box-shadow: 0 1px 3px rgba(28, 25, 23, 0.1), 0 1px 2px rgba(28, 25, 23, 0.06);

/* Elevated shadow (modals) */
box-shadow: 0 10px 25px rgba(28, 25, 23, 0.1), 0 4px 10px rgba(28, 25, 23, 0.05);
```

---

## Logo

### Concept
The needasite logo is typographic—just the wordmark. No abstract symbols that need explaining.

**Wordmark:** "needasite" in lowercase Inter Bold
- Lowercase feels friendly and approachable
- No spaces, reads as one simple unit
- The word itself explains what we do

### Logo Specifications

```
Font: Inter Bold (700)
Tracking: -0.02em (slightly tighter)
Color: Purple 600 (#7C3AED) or Gray 900 (#1C1917)
```

### Usage Rules
1. Use Purple 600 on light backgrounds
2. Use White on dark/purple backgrounds
3. Use Gray 900 when color isn't possible
4. Minimum size: 80px width
5. Clear space: Height of the "n" on all sides

### Logo Versions
- **Primary:** Purple wordmark on white
- **Reversed:** White wordmark on purple
- **Mono:** Gray 900 wordmark (for documents)

---

## UI Components

### Buttons

**Primary Button:**
```
Background: Purple 600 (#7C3AED)
Text: White, 16px, Medium weight
Padding: 12px 24px
Border Radius: 8px (rounded-lg)
Min Height: 48px
Hover: Purple 700 (#6D28D9)
```

**Secondary Button:**
```
Background: Gray 100 (#F5F5F4)
Text: Gray 700 (#44403C), 16px, Medium weight
Padding: 12px 24px
Border Radius: 8px
Hover: Gray 200 (#E7E5E4)
```

**Button Rules:**
- Always use text labels (icons optional, alongside text)
- Minimum width: 120px for primary actions
- Full-width on mobile for main CTAs
- One primary button per screen/section

### Inputs

```
Background: White
Border: 1px solid Gray 200 (#E7E5E4)
Border Radius: 12px (rounded-xl)
Padding: 12px 16px
Font Size: 16px (prevents iOS zoom)
Focus: 2px Purple 500 ring
Placeholder: Gray 500
```

### Cards

```
Background: White
Border Radius: 16px (rounded-2xl)
Padding: 24px
Shadow: Subtle card shadow
```

---

## Motion & Animation

### Principles
- **Purposeful**: Animation should communicate, not decorate
- **Quick**: 150-200ms for micro-interactions
- **Gentle**: Ease-out curves feel natural
- **Optional**: Respect `prefers-reduced-motion`

### Allowed Animations
- Button hover states (background color)
- Focus rings appearing
- Loading spinners
- Success checkmarks
- Page transitions (simple fade)

### Forbidden
- Carousels or auto-advancing content
- Parallax effects
- Bouncing or attention-seeking animations
- Anything that could cause motion sickness
- Animations longer than 300ms

---

## Accessibility Requirements

- **WCAG 2.1 Level AA** minimum (strive for AAA)
- Color contrast: 7:1 for body text, 4.5:1 for large text
- All interactive elements keyboard accessible
- Focus states clearly visible
- Error messages in text (not color alone)
- Touch targets minimum 48x48px
- No time limits on interactions
- No flashing or strobing content

---

## Content Guidelines

### Writing for Clarity

**Sentence Structure:**
- One idea per sentence
- 15 words or fewer when possible
- Active voice always

**Word Choice:**
- Use the simplest word that works
- "Use" not "utilize"
- "Help" not "assist"
- "Website" not "web presence"
- "Change" not "modify"

**Formatting:**
- Short paragraphs (2-3 sentences max)
- Bulleted lists over long paragraphs
- Bold for emphasis (sparingly)
- Never all caps except for abbreviations

### Error Messages

**Structure:**
1. What happened (simple statement)
2. What to do (clear action)

**Examples:**
- "That email doesn't look right. Check for typos?"
- "Something went wrong. Try again in a moment."
- "We couldn't save that. Your internet might be disconnected."

---

## Implementation Checklist

### Applying the Brand to needasite

- [ ] Update color palette to brand colors
- [ ] Switch to Inter font
- [ ] Increase base font size to 18px
- [ ] Ensure all buttons are 48px+ height
- [ ] Add proper focus states
- [ ] Update button styles to brand spec
- [ ] Increase border-radius on cards to 16px
- [ ] Warm up gray tones
- [ ] Add reduced-motion support
- [ ] Audit all copy for simplicity

---

*This brand bible is a living document. Update it as we learn what works for our users.*
