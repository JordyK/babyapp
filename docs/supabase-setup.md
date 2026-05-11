# Supabase Setup Guide

This guide covers the complete setup of Supabase for the Baby Planning Platform following modern Next.js App Router best practices.

## Overview

Our Supabase integration provides:
- **Browser Client**: For client components and browser environments
- **Server Client**: For server components and API routes
- **Middleware**: For auth context and session management
- **Type Safety**: Full TypeScript support with generated types
- **Helper Utilities**: Common patterns and error handling

## Architecture

```
src/lib/supabase/
├── browser.ts      # Browser client configuration
├── server.ts       # Server client configuration
├── types.ts        # Database TypeScript types
├── helpers.ts       # Query and auth helpers
└── index.ts        # Module exports
```

## 1. Environment Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key from Settings > API

### 1.2 Configure Environment Variables

Create `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:**
- `NEXT_PUBLIC_*` variables are exposed to client-side code
- `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to client-side code
- Add `.env.local` to `.gitignore`

## 2. Database Schema

### 2.1 Core Tables

```sql
-- Users table (extends auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checklists table
CREATE TABLE checklists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  is_template BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checklist items table
CREATE TABLE checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  quantity INTEGER,
  notes TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own checklists" ON checklists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own checklists" ON checklists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own checklists" ON checklists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own checklists" ON checklists FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own checklist items" ON checklist_items FOR SELECT USING (
  auth.uid() = (SELECT user_id FROM checklists WHERE id = checklist_id)
);
CREATE POLICY "Users can manage own checklist items" ON checklist_items FOR ALL USING (
  auth.uid() = (SELECT user_id FROM checklists WHERE id = checklist_id)
);

-- Categories are public (read-only for all users)
CREATE POLICY "Categories are viewable by all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can create categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 3. Usage Examples

### 3.1 Browser Client (Client Components)

```typescript
'use client';

import { supabase } from '@/lib/supabase';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  return <div>Welcome {user?.email}</div>;
}
```

### 3.2 Server Client (Server Components)

```typescript
import { createServerClient } from '@/lib/supabase/server';

export default async function ServerComponent() {
  const supabase = createServerClient();
  
  const { data: checklists } = await supabase
    .from('checklists')
    .select('*');

  return (
    <div>
      {checklists?.map(checklist => (
        <div key={checklist.id}>{checklist.title}</div>
      ))}
    </div>
  );
}
```

### 3.3 Helper Utilities

```typescript
import { SupabaseQueryBuilder } from '@/lib/supabase';

export default async function ChecklistsPage() {
  const supabase = createServerClient();
  const queryBuilder = new SupabaseQueryBuilder(supabase);

  // Get all checklists for current user
  const { data: checklists, error } = await queryBuilder.getMany('checklists', {
    filter: { user_id: (await supabase.auth.getUser()).data.user?.id },
    orderBy: 'created_at',
  });

  if (error) {
    return <div>Error loading checklists</div>;
  }

  return (
    <div>
      {checklists?.map(checklist => (
        <div key={checklist.id}>{checklist.title}</div>
      ))}
    </div>
  );
}
```

## 4. Type Generation

### 4.1 Generate Types from Database

```bash
# Install Supabase CLI first
npm install -g supabase

# Generate types
npx supabase gen types typescript --project-id <PROJECT_ID> --schema public > src/lib/supabase/types.ts
```

### 4.2 Using Generated Types

```typescript
import { Database } from '@/lib/supabase/types';

type User = Database['public']['Tables']['users']['Row'];
type Checklist = Database['public']['Tables']['checklists']['Row'];
```

## 5. Best Practices

### 5.1 Client vs Server Usage

- **Use Browser Client** for:
  - Client components with interactivity
  - Real-time subscriptions
  - Authentication UI (sign in, sign up)

- **Use Server Client** for:
  - Server components
  - API routes
  - Data fetching during SSR/SSG
  - Admin operations

### 5.2 Error Handling

```typescript
import { createResult, handleSupabaseError } from '@/lib/supabase';

try {
  const result = await supabase.from('checklists').select('*');
  
  if (result.error) {
    handleSupabaseError(result.error);
  }
  
  return result.data;
} catch (error) {
  console.error('Unexpected error:', error);
  return null;
}
```

### 5.3 Security Considerations

- Never expose service role key to client-side code
- Always use RLS policies for data access control
- Validate user permissions on server-side operations
- Use environment variables for sensitive configuration

### 5.4 Performance Optimization

- Use server client for initial data loading
- Implement proper caching strategies
- Use real-time subscriptions sparingly
- Optimize database queries with proper indexes

## 6. Troubleshooting

### 6.1 Common Issues

**Environment Variables Not Loading**
- Ensure `.env.local` is in project root
- Restart development server after changes
- Check variable names match exactly

**TypeScript Errors**
- Regenerate types after schema changes
- Ensure proper import paths
- Check for outdated type definitions

**Authentication Issues**
- Verify RLS policies are correctly configured
- Check middleware configuration
- Ensure proper cookie handling

### 6.2 Debug Mode

Enable debug logging in development:

```typescript
const supabase = createClient(url, key, {
  auth: {
    debug: process.env.NODE_ENV === 'development',
  },
});
```

## 7. Migration Guide

### 7.1 From Legacy Auth Helpers

If migrating from older Supabase auth helpers:

```typescript
// Old way (deprecated)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// New way (recommended)
import { createBrowserClient } from '@/lib/supabase';
```

### 7.2 Updating Environment Variables

```bash
# Old format
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# New format (recommended)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 8. Next Steps

Once Supabase is set up:

1. **Implement Authentication**: Add sign in/sign up functionality
2. **Data Operations**: Implement CRUD operations for checklists
3. **Real-time Features**: Add real-time updates and subscriptions
4. **File Storage**: Add avatar and file upload capabilities
5. **Analytics**: Track user engagement and application usage

## 9. Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Database Design Best Practices](https://supabase.com/docs/guides/database)
