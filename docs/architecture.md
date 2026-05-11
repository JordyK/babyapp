# Technical Architecture: Baby Planning Platform

## Executive Summary

Our technical architecture prioritizes simplicity, maintainability, and scalability while remaining accessible to both human developers and AI coding assistants. We embrace modern web development best practices without overengineering, focusing on delivering value quickly and sustainably.

---

## Core Architecture Philosophy

### Guiding Principles
- **Simplicity Over Complexity**: Choose the simplest solution that meets requirements
- **Explicit Over Implicit**: Make code behavior obvious and self-documenting
- **Pragmatic Over Dogmatic**: Use patterns that solve real problems, not theoretical ones
- **Incremental Evolution**: Build what we need now, design for what we might need later

### Architecture Tenets
1. **Readability First**: Code should be easily understood by new team members
2. **Minimal Abstractions**: Only abstract when there's clear value
3. **Consistent Patterns**: Use the same approach for similar problems
4. **AI-Friendly Structure**: Code organization that AI assistants can easily navigate

---

## Technology Stack Philosophy

### Core Technologies
- **Frontend**: Next.js 14+ with App Router
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript with strict configuration
- **Deployment**: Vercel (frontend) + Supabase (backend)

### Technology Selection Criteria
1. **Developer Experience**: Tools that make development enjoyable and efficient
2. **Community Support**: Strong ecosystems and active maintenance
3. **Scalability Path**: Technologies that can grow with our needs
4. **Learning Curve**: Reasonable complexity for team onboarding

---

## Next.js App Router Best Practices

### App Router Structure
```
app/
├── (auth)/           # Route groups for authentication pages
├── (dashboard)/      # Route groups for authenticated user pages
├── api/              # API routes
├── globals.css       # Global styles
├── layout.tsx        # Root layout
├── page.tsx          # Homepage
└── loading.tsx       # Loading states
```

### App Router Principles
1. **Server Components First**: Use server components by default, client components only when necessary
2. **Nested Layouts**: Leverage layout components for shared UI
3. **Streaming Loading**: Implement loading.tsx files for progressive enhancement
4. **Route Groups**: Organize related routes without affecting URL structure

### Component Patterns
```typescript
// Server Component (default)
export default function BabyChecklistPage() {
  // Server-side data fetching
  const checklist = await getChecklist();
  
  return <ChecklistView checklist={checklist} />;
}

// Client Component (when needed)
'use client';

export default function InteractiveChecklist() {
  const [items, setItems] = useState([]);
  // Client-side interactivity
}
```

---

## Supabase Best Practices

### Database Design Philosophy
- **Single Source of Truth**: Supabase as the primary data layer
- **Row Level Security**: Implement security at the database level
- **Type Safety**: Use Supabase TypeScript generation
- **Real-time When Valuable**: Use subscriptions for collaborative features

### Database Schema Organization
```sql
-- Core tables
profiles (user data)
checklists (user checklists)
checklist_items (individual items)
products (product catalog)
recommendations (AI-powered suggestions)

-- Relationship tables
user_checklists (many-to-many)
product_affiliates (affiliate relationships)
```

### Supabase Patterns
1. **RLS First**: Every table has appropriate Row Level Security policies
2. **Type Generation**: Regularly update TypeScript types from schema
3. **Edge Functions**: Use for complex business logic, not simple CRUD
4. **Storage Strategy**: Organize files by user_id and type

---

## Tailwind CSS Best Practices

### Design System Philosophy
- **Component-First**: Build reusable UI components with Tailwind
- **Design Tokens**: Use CSS custom properties for brand colors and spacing
- **Responsive Mobile-First**: Design for mobile, enhance for desktop
- **Consistent Spacing**: Use Tailwind's spacing scale consistently

### Tailwind Configuration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
        },
        neutral: {
          // Custom neutral palette for calming interface
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem', // Custom spacing when needed
      }
    }
  }
}
```

### Styling Principles
1. **Utility-First**: Avoid custom CSS unless absolutely necessary
2. **Component Abstraction**: Create reusable components for common patterns
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Dark Mode Ready**: Design with dark mode considerations from the start

---

## TypeScript Conventions

### Type Safety Philosophy
- **Strict Configuration**: Enable all strict TypeScript options
- **Type-First Development**: Define types before implementations
- **Supabase Integration**: Use generated types from database schema
- **Component Props**: Strongly type all component interfaces

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Patterns
```typescript
// Database types (generated)
interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

// Component props
interface ChecklistItemProps {
  item: ChecklistItem;
  onToggle: (id: string) => void;
  isCompleted: boolean;
}

// API response types
interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}
```

---

## Folder Structure Philosophy

### Organization Principles
- **Feature-Based Grouping**: Group files by feature, not by file type
- **Clear Separation**: Separate concerns with clear boundaries
- **Shallow Structure**: Avoid deep nesting when possible
- **Predictable Locations**: Files should be where developers expect them

### Recommended Structure
```
src/
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (buttons, inputs)
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase client and helpers
│   ├── utils/             # General utilities
│   └── types/             # TypeScript type definitions
├── hooks/                 # Custom React hooks
├── styles/                # Global styles and Tailwind config
└── public/                # Static assets
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `ChecklistItem.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: camelCase with `types` suffix (e.g., `checklistTypes.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useChecklist.ts`)

---

## Reusable Component Philosophy

### Component Design Principles
- **Single Responsibility**: Each component does one thing well
- **Composition Over Inheritance**: Build complex UI from simple components
- **Props Interface**: Clear, typed props for all components
- **Default Behavior**: Sensible defaults with customization options

### Component Hierarchy
```
ui/                      # Base components
├── Button.tsx
├── Input.tsx
├── Card.tsx
└── Modal.tsx

features/                # Feature components
├── checklist/
│   ├── Checklist.tsx
│   ├── ChecklistItem.tsx
│   └── ChecklistForm.tsx
└── auth/
    ├── LoginForm.tsx
    └── SignupForm.tsx
```

### Component Patterns
```typescript
// Base UI component
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return (
    <button 
      className={cn(
        'base-button-styles',
        variants[variant],
        sizes[size]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Feature component using base components
export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span>{item.name}</span>
        <Button variant="secondary" size="sm" onClick={() => onToggle(item.id)}>
          {item.completed ? 'Undo' : 'Complete'}
        </Button>
      </div>
    </Card>
  );
}
```

---

## Performance Philosophy

### Performance Principles
- **User Experience First**: Optimize for perceived performance
- **Measure Before Optimizing**: Use data to drive performance decisions
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile Performance**: Prioritize mobile device performance

### Performance Strategies
1. **Code Splitting**: Lazy load routes and components
2. **Image Optimization**: Use Next.js Image component with proper sizing
3. **Database Optimization**: Efficient queries with proper indexing
4. **Bundle Analysis**: Regular monitoring of bundle size

### Implementation Patterns
```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Only load on client when needed
});

// Optimized images
import Image from 'next/image';

<Image
  src="/baby-product.jpg"
  alt="Baby product"
  width={300}
  height={200}
  placeholder="blur"
  priority // For above-the-fold images
/>
```

---

## Security Philosophy

### Security Principles
- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Minimum necessary permissions
- **Zero Trust**: Verify everything, trust nothing
- **Privacy by Design**: User privacy built into the architecture

### Security Implementation
1. **Supabase RLS**: Row Level Security for all data access
2. **Input Validation**: Validate all user inputs on both client and server
3. **Environment Variables**: Never expose sensitive data
4. **HTTPS Only**: All communication encrypted

### Security Patterns
```typescript
// Secure API route
export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedData = checklistSchema.parse(body);
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // RLS handles data access control
    const { data, error } = await supabase
      .from('checklists')
      .insert([validatedData])
      .select();
      
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

---

## AI-Friendly Development Philosophy

### AI Assistant Optimization
- **Clear File Organization**: Logical structure that AI can understand
- **Consistent Patterns**: Predictable code structure for AI assistance
- **Explicit Typing**: Strong TypeScript types for better AI comprehension
- **Documentation**: Self-documenting code with clear naming conventions

### AI Development Patterns
1. **Feature-Based Structure**: AI can easily locate related files
2. **Type-First Development**: AI understands interfaces before implementations
3. **Consistent Naming**: Predictable patterns for AI code generation
4. **Modular Components**: Small, focused components for AI assistance

### Code Style for AI
```typescript
// Clear, descriptive naming
interface UserChecklist {
  id: string;
  userId: string;
  title: string;
  items: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Explicit function signatures
async function createChecklist(
  userId: string,
  title: string,
  items: Omit<ChecklistItem, 'id'>[]
): Promise<UserChecklist> {
  // Implementation
}

// Clear component props
interface ChecklistProps {
  checklist: UserChecklist;
  onUpdate: (checklist: UserChecklist) => void;
  readOnly?: boolean;
}
```

---

## Development Workflow Philosophy

### Development Principles
- **Incremental Development**: Build and iterate in small steps
- **Testing Strategy**: Test what matters, avoid over-testing
- **Code Review**: Focus on logic and architecture, not style
- **Documentation**: Living documentation that evolves with code

### Workflow Patterns
1. **Feature Branches**: Isolated development for new features
2. **Pull Requests**: Code review before merging
3. **Automated Testing**: CI/CD for critical paths
4. **Staging Environment**: Production-like testing environment

### Quality Assurance
```typescript
// Simple, focused tests
describe('ChecklistItem', () => {
  it('toggles completion state', () => {
    const mockToggle = vi.fn();
    render(
      <ChecklistItem 
        item={mockItem} 
        onToggle={mockToggle}
        isCompleted={false}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalledWith(mockItem.id);
  });
});
```

---

## Anti-Patterns to Avoid

### What We Don't Do
- ❌ **Over-Abstraction**: Don't create abstractions without clear need
- ❌ **Premature Optimization**: Don't optimize without performance data
- ❌ **Enterprise Patterns**: Avoid complex patterns for simple problems
- ❌ **Prop Drilling**: Use context or state management when appropriate
- ❌ **Large Components**: Break down complex components into smaller pieces
- ❌ **Magic Numbers**: Use named constants and design tokens
- ❌ **Inconsistent Patterns**: Maintain consistency across the codebase

### Red Lines
- Never sacrifice readability for cleverness
- Never implement complex solutions for simple problems
- Never ignore TypeScript errors
- Never commit code without proper testing
- Never use libraries without understanding their impact

---

## Evolution Strategy

### Architecture Evolution
1. **Start Simple**: Begin with the simplest working solution
2. **Measure Usage**: Collect data on how features are used
3. **Iterate Based on Needs**: Evolve architecture based on real requirements
4. **Refactor Continuously**: Improve code quality incrementally

### Scaling Considerations
- **Database Optimization**: Add indexes and optimize queries as needed
- **CDN Integration**: Implement CDN for static assets when necessary
- **Caching Strategy**: Add caching layers for performance bottlenecks
- **Microservices Migration**: Consider services only when clear benefits exist

---

*This architecture document serves as our technical north star, guiding every development decision from component design to database schema. It prioritizes simplicity and maintainability while providing a foundation for scalable growth.*
