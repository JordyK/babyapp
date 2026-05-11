# Database Schema Documentation

**Last Updated:** 2026-05-11  
**Project:** Baby Planning Platform  
**Database:** PostgreSQL via Supabase

---

## Overview

This document provides the complete database schema for the Baby Planning Platform. All tables are in the `public` schema unless otherwise noted.

---

## Tables

### checklist_categories

Categories for organizing checklist items.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NOT NULL | gen_random_uuid() | Primary key |
| key | text | NOT NULL | - | Unique identifier for the category (e.g., 'nursery', 'feeding') |
| name | text | NOT NULL | - | Display name of the category |
| description | text | NOT NULL | - | Category description |
| icon | text | NOT NULL | - | Icon identifier |
| color | text | NOT NULL | - | Primary color for UI display |
| background_color | text | NOT NULL | - | Background color for UI display |
| border_color | text | NOT NULL | - | Border color for UI display |
| sort_order | integer | NOT NULL | 0 | Display order (unique) |
| is_active | boolean | NOT NULL | true | Whether category is active/visible |
| created_at | timestamptz | NOT NULL | now() | Creation timestamp |
| updated_at | timestamptz | NOT NULL | now() | Last update timestamp |

**Constraints:**
- PRIMARY KEY: (id)
- UNIQUE: (key)
- UNIQUE: (sort_order)

**Relationships:**
- Referenced by: checklist_items.category_id

**Intended Usage:**
- Organize checklist items into logical categories
- Control display order and visibility
- Provide UI styling (colors, icons)

---

### checklist_items

Individual items that belong in baby planning checklists.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NOT NULL | gen_random_uuid() | Primary key |
| category_id | uuid | NOT NULL | - | Foreign key to checklist_categories |
| title | text | NOT NULL | - | Item title |
| description | text | - | - | Item description |
| priority | text | NOT NULL | - | Priority level (low, medium, high, critical) |
| estimated_cost_min | numeric | - | - | Minimum estimated cost |
| estimated_cost_max | numeric | - | - | Maximum estimated cost |
| required_for_all | boolean | NOT NULL | false | Whether item is required for all users |
| recommendation_logic | jsonb | - | - | Logic for personalized recommendations |
| sort_order | integer | NOT NULL | 0 | Display order within category |
| is_active | boolean | NOT NULL | true | Whether item is active/visible |
| tags | text[] | NOT NULL | '{}' | Array of tags for filtering |
| metadata | jsonb | - | - | Additional metadata |
| created_at | timestamptz | NOT NULL | now() | Creation timestamp |
| updated_at | timestamptz | NOT NULL | now() | Last update timestamp |

**Constraints:**
- PRIMARY KEY: (id)
- FOREIGN KEY: (category_id) → checklist_categories(id)
- CHECK: (priority = ANY (ARRAY['low', 'medium', 'high', 'critical']))

**Relationships:**
- Belongs to: checklist_categories
- Referenced by: user_checklist_items.checklist_item_id

**Intended Usage:**
- Master list of all possible baby planning items
- Store cost estimates and priority information
- Support personalized recommendation logic
- Enable filtering and categorization

---

### onboarding_answers

Stores user responses from onboarding questionnaire.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NOT NULL | gen_random_uuid() | Primary key |
| user_id | uuid | NOT NULL | - | Foreign key to auth.users |
| question_key | text | NOT NULL | - | Identifier for the onboarding question |
| answer_value | jsonb | NOT NULL | - | User's answer (stored as JSON for flexibility) |
| created_at | timestamptz | NOT NULL | now() | Creation timestamp |
| updated_at | timestamptz | NOT NULL | now() | Last update timestamp |

**Constraints:**
- PRIMARY KEY: (id)
- FOREIGN KEY: (user_id) → auth.users(id)

**Relationships:**
- Belongs to: auth.users

**Intended Usage:**
- Store onboarding questionnaire responses
- Support flexible answer formats via JSON
- Enable personalized recommendations based on answers

---

### profiles

Extended user profile information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NOT NULL | - | Primary key (matches auth.users.id) |
| updated_at | timestamptz | - | now() | Last update timestamp |
| username | text | - | - | Unique username (min 3 chars) |
| full_name | text | - | - | User's full name |
| avatar_url | text | - | - | URL to avatar image |
| website | text | - | - | Personal website URL |
| onboarding_completed | boolean | NOT NULL | false | Whether user completed onboarding |
| due_date | timestamptz | - | - | Baby's due date |
| budget_range | text | - | - | User's budget preference |
| first_child | boolean | NOT NULL | true | Whether this is first baby |
| onboarding_step | integer | NOT NULL | 0 | Current onboarding step |
| first_name | text | - | - | User's first name |
| last_name | text | - | - | User's last name |
| phone | text | - | - | Phone number |

**Constraints:**
- PRIMARY KEY: (id)
- FOREIGN KEY: (id) → auth.users(id)
- CHECK: (char_length(username) >= 3)
- UNIQUE: (username)

**Relationships:**
- Belongs to: auth.users (1:1)

**Intended Usage:**
- Extend auth.users with additional profile information
- Store onboarding progress and completion status
- Track pregnancy details (due date, first child)
- Support personalization features

---

### user_checklist_items

User-specific checklist items (personalized checklists).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NOT NULL | gen_random_uuid() | Primary key |
| user_id | uuid | NOT NULL | - | Foreign key to auth.users |
| checklist_item_id | uuid | NOT NULL | - | Foreign key to checklist_items |
| status | text | NOT NULL | 'not-started' | Status (not-started, in-progress, completed, skipped) |
| purchased | boolean | NOT NULL | false | Whether item has been purchased |
| actual_cost | numeric | - | - | Actual cost paid |
| notes | text | - | - | User notes about the item |
| quantity | integer | NOT NULL | 1 | Quantity needed |
| custom_title | text | - | - | Custom title for user |
| completed_at | timestamptz | - | - | When item was completed |
| created_at | timestamptz | NOT NULL | now() | Creation timestamp |
| updated_at | timestamptz | NOT NULL | now() | Last update timestamp |

**Constraints:**
- PRIMARY KEY: (id)
- FOREIGN KEY: (user_id) → auth.users(id)
- FOREIGN KEY: (checklist_item_id) → checklist_items(id)
- CHECK: (status = ANY (ARRAY['not-started', 'in-progress', 'completed', 'skipped']))
- CHECK: (actual_cost IS NULL OR actual_cost >= 0)

**Relationships:**
- Belongs to: auth.users
- Belongs to: checklist_items

**Intended Usage:**
- Create personalized checklists for each user
- Track progress on individual items
- Store actual costs and notes
- Support custom quantities and titles

---

## Relationships Summary

```
auth.users (Supabase Auth)
    ├── profiles (1:1)
    │   └── id → auth.users.id
    ├── onboarding_answers (1:N)
    │   └── user_id → auth.users.id
    └── user_checklist_items (1:N)
        └── user_id → auth.users.id

checklist_categories
    └── checklist_items (1:N)
        └── category_id → checklist_categories.id

checklist_items
    └── user_checklist_items (1:N)
        └── checklist_item_id → checklist_items.id
```

---

## Foreign Key Constraints

1. **checklist_items_category_fkey**: checklist_items.category_id → checklist_categories(id)
2. **onboarding_answers_user_fkey**: onboarding_answers.user_id → auth.users(id)
3. **profiles_id_fkey**: profiles.id → auth.users(id)
4. **user_checklist_items_user_fkey**: user_checklist_items.user_id → auth.users(id)
5. **user_checklist_items_checklist_item_fkey**: user_checklist_items.checklist_item_id → checklist_items(id)

---

## Check Constraints

### checklist_items
- Priority must be one of: 'low', 'medium', 'high', 'critical'

### profiles
- Username must be at least 3 characters

### user_checklist_items
- Status must be one of: 'not-started', 'in-progress', 'completed', 'skipped'
- actual_cost must be NULL or >= 0

---

## Unique Constraints

### checklist_categories
- key: Unique category identifier
- sort_order: Unique display order

### profiles
- username: Unique username

---

## Default Values

- All tables use `gen_random_uuid()` for auto-generated UUID primary keys
- All timestamp columns default to `now()`
- Boolean columns typically default to `true` or `false` as appropriate
- Arrays default to empty arrays `'{}'::text[]`

---

## Important Notes

### Auth Integration
- `auth.users` is managed by Supabase Auth
- `profiles` has a 1:1 relationship with `auth.users`
- All user-facing tables reference `auth.users(id)`, not a custom users table

### JSONB Columns
- `recommendation_logic` in checklist_items: Stores complex recommendation rules
- `answer_value` in onboarding_answers: Flexible storage for various answer types
- `metadata` in checklist_items: Extensible storage for additional properties

### Array Columns
- `tags` in checklist_items: Text array for item categorization and filtering

---

## RLS Policies

**Note:** RLS policies are not included in this schema export. Check Supabase dashboard for current RLS configuration.
