# AI Development Standards & Rules

## Purpose

This document defines permanent coding rules and development standards for AI assistants working on this baby planning platform. All AI-generated code must adhere to these standards to ensure consistency, maintainability, and quality.

---

## Core Development Principles

### Non-Negotiable Rules
1. **Always Follow Project Documentation** - Never deviate from `docs/` guidelines
2. **Mobile-First Always** - Design for mobile, enhance for desktop
3. **Prioritize Readability** - Code should be self-documenting
4. **Avoid Overengineering** - Choose the simplest solution that works
5. **Prefer Reusable Components** - Build once, use everywhere
6. **Use TypeScript Strictly** - No `any` types, strict mode enabled
7. **Avoid Hardcoded UI Text** - Use constants or localization
8. **Keep Components Modular** - Single responsibility principle
9. **Use Tailwind Only** - No custom CSS unless absolutely necessary
10. **Prioritize Accessibility** - WCAG 2.1 AA compliance minimum
11. **Prioritize Maintainability** - Future developers should understand code
12. **Use Server Components Where Appropriate** - Default to server components
13. **Avoid Deeply Nested Abstractions** - Maximum 3 levels of nesting
14. **Prefer Boring Industry-Standard Patterns** - No experimental or clever solutions

### Development Philosophy
- **Simplicity Over Complexity**
- **Explicit Over Implicit**
- **Consistency Over Cleverness**
- **Pragmatism Over Dogmatism**

---

## Naming Conventions

### File Naming
```typescript
// Components - PascalCase
ChecklistItem.tsx
UserProfile.tsx
ProductCard.tsx

// Utilities - camelCase
formatDate.ts
validateEmail.ts
calculateProgress.ts

// Hooks - camelCase with 'use' prefix
useChecklist.ts
useAuth.ts
useLocalStorage.ts

// Types - camelCase with 'types' suffix
checklistTypes.ts
userTypes.ts
productTypes.ts

// Constants - UPPER_SNAKE_CASE
API_ENDPOINTS.ts
COLORS.ts
ERROR_MESSAGES.ts
```

### Variable Naming
```typescript
// Variables and functions - camelCase
const userName = 'john';
const getUserProfile = () => {};
const isCompleted = true;

// Constants - UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';

// Types and interfaces - PascalCase
interface UserProfile {
  id: string;
  name: string;
}

type ChecklistStatus = 'pending' | 'completed' | 'archived';

// Enums - PascalCase
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
```

### Component Naming
```typescript
// Component files export the component as default
export default function ChecklistItem() {
  // Component implementation
}

// Use descriptive names that indicate purpose
// Bad: Item, Card, Box
// Good: ChecklistItem, ProductCard, UserAvatar

// Compound components use the base name
Checklist.Item
Checklist.Header
Checklist.Footer
```

---

## Component Conventions

### Component Structure
```typescript
// 1. Imports (external first, then internal)
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import type { ChecklistItem as ChecklistItemType } from '@/types/checklistTypes';

// 2. Type definitions (if component-specific)
interface ChecklistItemProps {
  item: ChecklistItemType;
  onUpdate: (id: string, updates: Partial<ChecklistItemType>) => void;
  readonly?: boolean;
}

// 3. Component implementation
export default function ChecklistItem({ 
  item, 
  onUpdate, 
  readonly = false 
}: ChecklistItemProps) {
  // 4. Hooks (state, effects, custom hooks)
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // 5. Event handlers
  const handleToggle = async () => {
    if (readonly) return;
    
    setIsLoading(true);
    try {
      await onUpdate(item.id, { completed: !item.completed });
    } catch (error) {
      console.error('Failed to update item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Conditional rendering
  if (!item) {
    return null;
  }

  // 7. JSX return
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className={item.completed ? 'line-through text-gray-500' : ''}>
          {item.name}
        </span>
        {!readonly && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            disabled={isLoading}
          >
            {item.completed ? 'Undo' : 'Complete'}
          </Button>
        )}
      </div>
    </Card>
  );
}
```

### Component Rules
1. **Single Responsibility** - Each component does one thing well
2. **Props Interface** - Always define TypeScript interfaces for props
3. **Default Props** - Use default parameters instead of defaultProps
4. **Destructuring** - Destructure props at function signature
5. **Conditional Rendering** - Use early returns for complex conditions
6. **No Side Effects** - Keep components pure, use hooks for effects

### Server vs Client Components
```typescript
// Server Component (default) - No interactivity
export default function ChecklistPage() {
  const checklist = await getChecklist(); // Server-side data fetching
  
  return (
    <div>
      <h1>My Checklist</h1>
      <ChecklistView checklist={checklist} />
    </div>
  );
}

// Client Component - Interactivity required
'use client';

export default function InteractiveChecklist() {
  const [items, setItems] = useState([]);
  
  // Client-side logic
}
```

---

## Folder Conventions

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups for auth pages
│   ├── (dashboard)/       # Route groups for dashboard
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── index.ts      # Barrel exports
│   ├── features/         # Feature-specific components
│   │   ├── checklist/
│   │   │   ├── Checklist.tsx
│   │   │   ├── ChecklistItem.tsx
│   │   │   └── index.ts
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       └── SignupForm.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client and helpers
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   └── types.ts
│   ├── utils/            # General utilities
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   └── types/            # TypeScript type definitions
│       ├── checklist.ts
│       ├── user.ts
│       └── api.ts
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   ├── useChecklist.ts
│   └── useLocalStorage.ts
├── styles/               # Global styles and Tailwind config
│   ├── globals.css
│   └── components.css
└── public/               # Static assets
    ├── icons/
    ├── images/
    └── fonts/
```

### Folder Organization Rules
1. **Feature-Based Grouping** - Group related files together
2. **Index Files** - Use index.ts for clean imports
3. **Consistent Naming** - Follow naming conventions for all folders
4. **Logical Separation** - Separate concerns with clear boundaries

---

## Commenting Philosophy

### When to Comment
```typescript
// ✅ Good: Explain complex business logic
// Calculate the due date based on the last menstrual period (LMP)
// Standard medical calculation: LMP + 280 days = Due Date
const calculateDueDate = (lmp: Date): Date => {
  return addDays(lmp, 280);
};

// ✅ Good: Explain non-obvious implementation details
// Use requestAnimationFrame to ensure smooth animations
// This prevents layout thrashing during rapid updates
const scheduleAnimation = (callback: () => void) => {
  requestAnimationFrame(callback);
};

// ✅ Good: Document API interfaces
interface ChecklistItem {
  /** Unique identifier for the checklist item */
  id: string;
  
  /** Display name of the item */
  name: string;
  
  /** Current completion status */
  completed: boolean;
  
  /** Priority level (1-5, where 5 is highest) */
  priority: number;
  
  /** Optional notes or additional context */
  notes?: string;
}

// ❌ Bad: Obvious code comments
// Increment the counter
count++;

// Return the user object
return user;
```

### Comment Style
1. **JSDoc for Functions** - Document parameters and return types
2. **Inline Comments** - Explain why, not what
3. **TODO Comments** - Use format: `// TODO: [description] - [author] [date]`
4. **FIXME Comments** - Use format: `// FIXME: [description] - [author] [date]`

---

## Scalability Philosophy

### Code Scalability
```typescript
// ✅ Good: Modular, extensible design
interface ChecklistService {
  getChecklist(id: string): Promise<Checklist>;
  createChecklist(data: CreateChecklistData): Promise<Checklist>;
  updateChecklist(id: string, data: UpdateChecklistData): Promise<Checklist>;
  deleteChecklist(id: string): Promise<void>;
}

class SupabaseChecklistService implements ChecklistService {
  // Implementation specific to Supabase
}

// Easy to swap implementations
const checklistService = new SupabaseChecklistService();

// ❌ Bad: Hardcoded, inflexible design
const getChecklist = async (id: string) => {
  // Direct Supabase implementation
  const { data } = await supabase
    .from('checklists')
    .select('*')
    .eq('id', id)
    .single();
  
  return data;
};
```

### Performance Scalability
1. **Lazy Loading** - Load components and data only when needed
2. **Memoization** - Use React.memo, useMemo, useCallback appropriately
3. **Code Splitting** - Split bundles by routes and features
4. **Database Optimization** - Efficient queries with proper indexing

---

## UI Consistency Philosophy

### Design System Adherence
```typescript
// ✅ Good: Use design system components
import { Button, Card, Input } from '@/components/ui';

export default function ChecklistForm() {
  return (
    <Card className="p-6">
      <Input placeholder="Enter checklist name" />
      <Button variant="primary" className="mt-4">
        Create Checklist
      </Button>
    </Card>
  );
}

// ❌ Bad: Custom styles and components
export default function ChecklistForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <input 
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Enter checklist name"
      />
      <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Create Checklist
      </button>
    </div>
  );
}
```

### Consistency Rules
1. **Component Library** - Always use components from `/components/ui`
2. **Color Usage** - Use design tokens, never hardcoded colors
3. **Spacing** - Use Tailwind spacing scale consistently
4. **Typography** - Use predefined typography classes
5. **Interactions** - Consistent hover states and transitions

---

## TypeScript Standards

### Strict Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true
  }
}
```

### Type Definitions
```typescript
// ✅ Good: Specific, typed interfaces
interface UserProfile {
  readonly id: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Good: Union types for specific values
type ChecklistStatus = 'pending' | 'in_progress' | 'completed';

// ✅ Good: Generic types for reusable components
interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

// ❌ Bad: Generic any types
interface UserProfile {
  id: any;
  email: any;
  fullName: any;
}
```

### Type Usage Rules
1. **No Any Types** - Always use specific types
2. **Readonly Properties** - Use readonly for immutable data
3. **Optional Properties** - Use optional modifier appropriately
4. **Type Guards** - Use type guards for runtime type checking

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
```typescript
// ✅ Good: Accessible button with proper ARIA
export default function AccessibleButton({ 
  children, 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className="btn-primary"
    >
      {children}
    </button>
  );
}

// ✅ Good: Semantic HTML with proper labeling
export default function ChecklistItem({ item, onToggle }: Props) {
  return (
    <article role="listitem" aria-label={`Checklist item: ${item.name}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          aria-describedby={`item-${item.id}-name`}
          className="mr-3"
        />
        <span id={`item-${item.id}-name`}>{item.name}</span>
      </div>
    </article>
  );
}
```

### Accessibility Rules
1. **Semantic HTML** - Use proper HTML elements for their purpose
2. **ARIA Labels** - Provide descriptive labels for screen readers
3. **Keyboard Navigation** - Ensure all functionality works with keyboard
4. **Color Contrast** - Maintain WCAG AA contrast ratios
5. **Focus States** - Provide clear focus indicators

---

## Performance Standards

### Optimization Requirements
```typescript
// ✅ Good: Optimized component with memoization
import React, { memo, useMemo } from 'react';

interface ExpensiveComponentProps {
  data: largeDataSet;
  filter: string;
}

export default memo(function ExpensiveComponent({ 
  data, 
  filter 
}: ExpensiveComponentProps) {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <div>
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// ✅ Good: Lazy loaded heavy component
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false
});
```

### Performance Rules
1. **Bundle Size** - Keep JavaScript bundles under 250KB gzipped
2. **Image Optimization** - Use Next.js Image component with proper sizing
3. **Code Splitting** - Lazy load routes and heavy components
4. **Database Queries** - Optimize queries and use proper indexing

---

## Security Standards

### Security Requirements
```typescript
// ✅ Good: Secure API route with validation
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const createChecklistSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedData = createChecklistSchema.parse(body);
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Create checklist with RLS protection
    const { data, error } = await supabase
      .from('checklists')
      .insert([{ ...validatedData, user_id: user.id }])
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

### Security Rules
1. **Input Validation** - Validate all user inputs on both client and server
2. **Authentication** - Use Supabase Auth for all protected routes
3. **Authorization** - Implement Row Level Security (RLS) in database
4. **Environment Variables** - Never expose sensitive data in client code
5. **HTTPS Only** - All communication must be encrypted

---

## Testing Standards

### Testing Requirements
```typescript
// ✅ Good: Simple, focused component test
import { render, screen, fireEvent } from '@testing-library/react';
import { ChecklistItem } from './ChecklistItem';

describe('ChecklistItem', () => {
  const mockItem = {
    id: '1',
    name: 'Buy diapers',
    completed: false,
  };

  it('renders item name correctly', () => {
    render(<ChecklistItem item={mockItem} onUpdate={vi.fn()} />);
    expect(screen.getByText('Buy diapers')).toBeInTheDocument();
  });

  it('calls onUpdate when toggle button is clicked', () => {
    const mockOnUpdate = vi.fn();
    render(<ChecklistItem item={mockItem} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnUpdate).toHaveBeenCalledWith('1', { completed: true });
  });
});
```

### Testing Rules
1. **Unit Tests** - Test components and utilities in isolation
2. **Integration Tests** - Test component interactions
3. **User Behavior** - Focus on user interactions, not implementation details
4. **Coverage** - Maintain minimum 80% test coverage for critical paths

---

## Git Standards

### Commit Message Format
```
type(scope): description

feat(checklist): add item completion functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
style(button): improve hover state animation
refactor(utils): simplify date formatting function
test(checklist): add unit tests for item component
```

### Branch Naming
```
feature/checklist-completion
fix/auth-redirect
docs/update-readme
style/button-hover
```

---

## Review Checklist

Before submitting any code, verify:

### Code Quality
- [ ] Follows all naming conventions
- [ ] TypeScript strict mode compliance
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Components are modular and reusable

### UI/UX
- [ ] Mobile-first responsive design
- [ ] Uses design system components
- [ ] Proper accessibility attributes
- [ ] Consistent with UI guidelines
- [ ] Loading states implemented

### Performance
- [ ] Optimized images and assets
- [ ] Code splitting where appropriate
- [ ] No memory leaks in useEffect
- [ ] Efficient database queries
- [ ] Bundle size considerations

### Security
- [ ] Input validation implemented
- [ ] Authentication checks present
- [ ] No sensitive data exposed
- [ ] Proper error messages (no information leakage)
- [ ] HTTPS enforcement

---

## Emergency Rules

### When to Break Rules
1. **Performance Critical** - Break abstraction rules for performance bottlenecks
2. **Third-party Integration** - Adapt to external API requirements
3. **Legacy Migration** - Temporary exceptions during refactoring
4. **Security Fixes** - Immediate security overrides

### Rule Breaking Process
1. **Document Reason** - Explain why the rule was broken
2. **Add TODO** - Mark for future refactoring
3. **Team Review** - Get team approval for exceptions
4. **Timeline** - Set deadline for addressing the exception

---

*This document is the single source of truth for all AI-assisted development. Every AI assistant must read and follow these standards for every code change.*
