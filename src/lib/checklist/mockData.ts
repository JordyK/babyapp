import { 
  ChecklistItem, 
  ChecklistCategory, 
  ChecklistCategoryConfig,
  ChecklistProgress,
  ChecklistBudget,
  DueDateCountdown,
  Recommendation,
  MockDataOptions,
  ChecklistItemStatus,
  CATEGORY_METADATA
} from './types';

/**
 * Mock data generator for checklist dashboard
 * 
 * Provides realistic sample data for all categories with proper
 * distribution of priorities, statuses, and costs.
 */

export function generateMockData(options: MockDataOptions = {}): {
  categories: ChecklistCategoryConfig[];
  progress: ChecklistProgress;
  budget: ChecklistBudget;
  dueDateCountdown?: DueDateCountdown;
  recommendations: Recommendation[];
} {
  const {
    itemCount = 50,
    completionRate = 0.3,
    budgetRange = { min: 10, max: 500 },
    dueDate = new Date(Date.now() + (120 * 24 * 60 * 60 * 1000)), // 4 months from now
    categories = Object.keys(CATEGORY_METADATA) as ChecklistCategory[]
  } = options;

  // Generate items for each category
  const itemsByCategory: Record<ChecklistCategory, ChecklistItem[]> = {} as any;
  const categoriesConfig: ChecklistCategoryConfig[] = [];

  const itemTemplates = {
    sleeping: [
      { title: 'Crib', description: 'Safe sleeping space for baby', priority: 'critical' as const, cost: 300 },
      { title: 'Mattress', description: 'Firm crib mattress', priority: 'critical' as const, cost: 150 },
      { title: 'Swaddle blankets', description: 'Soft blankets for swaddling', priority: 'high' as const, cost: 30 },
      { title: 'Sleep sacks', description: 'Wearable blankets', priority: 'medium' as const, cost: 25 },
      { title: 'White noise machine', description: 'For better sleep', priority: 'low' as const, cost: 40 },
      { title: 'Baby monitor', description: 'Audio/video monitor', priority: 'high' as const, cost: 100 },
      { title: 'Crib sheets', description: 'Fitted sheets (set of 3)', priority: 'medium' as const, cost: 60 },
      { title: 'Sleep positioner', description: 'For proper positioning', priority: 'low' as const, cost: 25 }
    ],
    feeding: [
      { title: 'Bottles (set)', description: '8-12 bottles with nipples', priority: 'critical' as const, cost: 80 },
      { title: 'Bottle brush', description: 'Cleaning brush', priority: 'high' as const, cost: 8 },
      { title: 'Bottle sterilizer', description: 'Electric sterilizer', priority: 'medium' as const, cost: 60 },
      { title: 'Breast pump', description: 'Electric breast pump', priority: 'high' as const, cost: 200 },
      { title: 'Nursing pillow', description: 'Comfortable feeding pillow', priority: 'medium' as const, cost: 35 },
      { title: 'Bib set', description: 'Pack of 10 bibs', priority: 'medium' as const, cost: 20 },
      { title: 'High chair', description: 'Feeding chair', priority: 'high' as const, cost: 120 },
      { title: 'Formula containers', description: 'Storage for formula', priority: 'low' as const, cost: 15 }
    ],
    travel: [
      { title: 'Car seat', description: 'Infant car seat', priority: 'critical' as const, cost: 250 },
      { title: 'Stroller', description: 'Full-size stroller', priority: 'critical' as const, cost: 300 },
      { title: 'Diaper bag', description: 'Spacious diaper bag', priority: 'high' as const, cost: 60 },
      { title: 'Portable changing pad', description: 'Foldable changing pad', priority: 'medium' as const, cost: 25 },
      { title: 'Car window shades', description: 'Sun protection', priority: 'low' as const, cost: 20 },
      { title: 'Travel stroller', description: 'Lightweight travel stroller', priority: 'low' as const, cost: 150 },
      { title: 'Car seat protector', description: 'Seat protector', priority: 'medium' as const, cost: 30 }
    ],
    clothing: [
      { title: 'Onesies (set)', description: 'Pack of 10 onesies', priority: 'critical' as const, cost: 40 },
      { title: 'Sleepers', description: 'Pack of 6 sleepers', priority: 'high' as const, cost: 50 },
      { title: 'Socks (set)', description: 'Pack of 12 socks', priority: 'medium' as const, cost: 20 },
      { title: 'Hats', description: 'Sun hats and winter hats', priority: 'medium' as const, cost: 25 },
      { title: 'Mittens', description: 'Prevent scratching', priority: 'low' as const, cost: 15 },
      { title: 'Seasonal outfits', description: 'Weather-appropriate clothes', priority: 'medium' as const, cost: 80 },
      { title: 'Baby shoes', description: 'Soft shoes', priority: 'low' as const, cost: 20 }
    ],
    nursery: [
      { title: 'Changing table', description: 'Dedicated changing area', priority: 'high' as const, cost: 150 },
      { title: 'Changing pad', description: 'Safety pad', priority: 'critical' as const, cost: 40 },
      { title: 'Diaper pail', description: 'Odor-proof diaper disposal', priority: 'medium' as const, cost: 80 },
      { title: 'Rocking chair', description: 'Comfortable nursing chair', priority: 'medium' as const, cost: 200 },
      { title: 'Baby laundry detergent', description: 'Gentle detergent', priority: 'medium' as const, cost: 15 },
      { title: 'Hamper', description: 'Baby laundry hamper', priority: 'low' as const, cost: 35 },
      { title: 'Night light', description: 'Soft lighting', priority: 'low' as const, cost: 20 }
    ],
    'health-safety': [
      { title: 'First aid kit', description: 'Baby first aid supplies', priority: 'critical' as const, cost: 50 },
      { title: 'Thermometer', description: 'Digital thermometer', priority: 'critical' as const, cost: 25 },
      { title: 'Nasal aspirator', description: 'Nose clearing tool', priority: 'high' as const, cost: 15 },
      { title: 'Baby nail clippers', description: 'Safe nail clippers', priority: 'medium' as const, cost: 8 },
      { title: 'Grooming kit', description: 'Complete grooming set', priority: 'medium' as const, cost: 25 },
      { title: 'Outlet covers', description: 'Safety outlet covers', priority: 'high' as const, cost: 10 },
      { title: 'Corner guards', description: 'Furniture edge guards', priority: 'medium' as const, cost: 20 },
      { title: 'Baby gate', description: 'Safety gate', priority: 'medium' as const, cost: 40 }
    ],
    bathing: [
      { title: 'Baby bathtub', description: 'Safe baby tub', priority: 'high' as const, cost: 35 },
      { title: 'Baby soap', description: 'Gentle baby soap', priority: 'medium' as const, cost: 12 },
      { title: 'Baby shampoo', description: 'Tear-free shampoo', priority: 'medium' as const, cost: 10 },
      { title: 'Hooded towels', description: 'Pack of 3 towels', priority: 'medium' as const, cost: 30 },
      { title: 'Washcloths', description: 'Soft washcloths', priority: 'low' as const, cost: 15 },
      { title: 'Bath toys', description: 'Safe bath toys', priority: 'low' as const, cost: 20 },
      { title: 'Bath thermometer', description: 'Water temperature gauge', priority: 'low' as const, cost: 12 }
    ],
    essentials: [
      { title: 'Diapers (newborn)', description: 'Pack of newborn diapers', priority: 'critical' as const, cost: 45 },
      { title: 'Wipes', description: 'Baby wipes (pack)', priority: 'critical' as const, cost: 25 },
      { title: 'Diaper cream', description: 'Rash prevention cream', priority: 'high' as const, cost: 8 },
      { title: 'Burp cloths', description: 'Pack of 10 cloths', priority: 'high' as const, cost: 20 },
      { title: 'Pacifiers', description: 'Pack of pacifiers', priority: 'medium' as const, cost: 10 },
      { title: 'Baby carrier', description: 'Front-facing carrier', priority: 'medium' as const, cost: 80 },
      { title: 'Play mat', description: 'Soft play area', priority: 'low' as const, cost: 40 },
      { title: 'Teething toys', description: 'Safe teething toys', priority: 'medium' as const, cost: 25 }
    ]
  };

  // Generate items for each category
  categories.forEach(category => {
    const templates = itemTemplates[category] || [];
    const itemsPerCategory = Math.floor(itemCount / categories.length);
    const categoryItems: ChecklistItem[] = [];

    for (let i = 0; i < Math.min(itemsPerCategory, templates.length); i++) {
      const template = templates[i];
      if (!template) continue; // Skip if template is undefined
      
      const status = getRandomStatus(completionRate);
      const estimatedCost = template.cost + (Math.random() * 50 - 25); // Add some variation
      const actualCost = status === 'completed' ? estimatedCost * (0.8 + Math.random() * 0.4) : undefined;

      const item: ChecklistItem = {
        id: `${category}-${i}`,
        title: template.title,
        description: template.description,
        category,
        priority: template.priority,
        status,
        estimatedCost: Math.max(budgetRange.min, Math.min(budgetRange.max, estimatedCost)),
        actualCost: actualCost || undefined,
        notes: status === 'completed' ? 'Already purchased and tested' : undefined,
        info: `Essential ${category} item for baby care`,
        recommendations: getRandomRecommendations(category),
        completedAt: status === 'completed' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
        tags: getRandomTags(category),
        quantity: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 1
      };

      categoryItems.push(item);
    }

    itemsByCategory[category] = categoryItems;

    // Create category config
    const completedCount = categoryItems.filter(item => item.status === 'completed').length;
    const totalEstimatedCost = categoryItems.reduce((sum, item) => sum + (item.estimatedCost || 0), 0);
    const totalActualCost = categoryItems.reduce((sum, item) => sum + (item.actualCost || 0), 0);

    categoriesConfig.push({
      id: category,
      name: CATEGORY_METADATA[category].name,
      description: CATEGORY_METADATA[category].description,
      icon: CATEGORY_METADATA[category].icon,
      color: CATEGORY_METADATA[category].color,
      backgroundColor: CATEGORY_METADATA[category].backgroundColor,
      borderColor: CATEGORY_METADATA[category].borderColor,
      itemCount: categoryItems.length,
      completedCount,
      totalEstimatedCost,
      totalActualCost,
      items: categoryItems
    });
  });

  // Calculate overall progress
  const allItems = categoriesConfig.flatMap(cat => cat.items);
  const progress: ChecklistProgress = {
    totalItems: allItems.length,
    completedItems: allItems.filter(item => item.status === 'completed').length,
    inProgressItems: allItems.filter(item => item.status === 'in-progress').length,
    notStartedItems: allItems.filter(item => item.status === 'not-started').length,
    skippedItems: allItems.filter(item => item.status === 'skipped').length,
    percentage: (allItems.filter(item => item.status === 'completed').length / allItems.length) * 100,
    byCategory: {} as any
  };

  categoriesConfig.forEach(cat => {
    progress.byCategory[cat.id] = {
      total: cat.itemCount,
      completed: cat.completedCount,
      percentage: (cat.completedCount / cat.itemCount) * 100
    };
  });

  // Calculate budget
  const budget: ChecklistBudget = {
    totalEstimated: categoriesConfig.reduce((sum, cat) => sum + cat.totalEstimatedCost, 0),
    totalSpent: categoriesConfig.reduce((sum, cat) => sum + cat.totalActualCost, 0),
    remaining: 0,
    byCategory: {} as any,
    currency: 'USD'
  };
  budget.remaining = budget.totalEstimated - budget.totalSpent;

  categoriesConfig.forEach(cat => {
    budget.byCategory[cat.id] = {
      estimated: cat.totalEstimatedCost,
      spent: cat.totalActualCost,
      remaining: cat.totalEstimatedCost - cat.totalActualCost
    };
  });

  // Calculate due date countdown
  const countdown: DueDateCountdown = {
    dueDate,
    daysRemaining: Math.max(0, Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
    weeksRemaining: Math.max(0, Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7))),
    trimester: getTrimester(dueDate),
    progressPercentage: Math.max(0, Math.min(100, ((280 - Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) / 280) * 100)),
    isOverdue: dueDate.getTime() < Date.now(),
    message: getDueDateMessage(dueDate)
  };

  // Generate recommendations
  const recommendations: Recommendation[] = [
    {
      id: 'rec-1',
      title: 'Start with the essentials',
      description: 'Focus on critical items first, then add nice-to-haves later',
      type: 'tip',
      priority: 'high',
      tags: ['planning', 'budget']
    },
    {
      id: 'rec-2',
      title: 'Consider second-hand options',
      description: 'Many items like clothes and furniture can be purchased used',
      type: 'tip',
      priority: 'medium',
      tags: ['budget', 'sustainability']
    },
    {
      id: 'rec-3',
      title: 'Baby Monitor Buying Guide',
      description: 'Complete guide to choosing the right baby monitor',
      type: 'article',
      priority: 'medium',
      category: 'sleeping',
      tags: ['sleeping', 'safety']
    },
    {
      id: 'rec-4',
      title: 'Car Seat Safety Checklist',
      description: 'Essential safety checklist for car seat installation',
      type: 'checklist',
      priority: 'critical',
      category: 'travel',
      tags: ['travel', 'safety']
    },
    {
      id: 'rec-5',
      title: 'Nursery Setup on a Budget',
      description: 'Create a beautiful nursery without breaking the bank',
      type: 'article',
      priority: 'medium',
      category: 'nursery',
      tags: ['nursery', 'budget']
    }
  ];

  return {
    categories: categoriesConfig,
    progress,
    budget,
    dueDateCountdown: countdown,
    recommendations
  };
}

// Helper functions
function getRandomStatus(completionRate: number): ChecklistItemStatus {
  const rand = Math.random();
  if (rand < completionRate) return 'completed';
  if (rand < completionRate + 0.2) return 'in-progress';
  if (rand < completionRate + 0.25) return 'skipped';
  return 'not-started';
}

function getRandomRecommendations(category: ChecklistCategory): string[] {
  const recommendations = {
    sleeping: ['Consider a white noise machine for better sleep', 'Get 2-3 sets of crib sheets'],
    feeding: ['Start with 8-12 bottles', 'Consider both manual and electric pumps'],
    travel: ['Check car seat expiration dates', 'Register car seat with manufacturer'],
    clothing: ['Buy multiple sizes in advance', 'Focus on comfort over style'],
    nursery: ['Position changing table near outlet', 'Consider storage solutions'],
    'health-safety': ['Keep first aid kit accessible', 'Check product recalls regularly'],
    bathing: ['Test water temperature before use', 'Have everything within reach'],
    essentials: ['Stock up on diapers in multiple sizes', 'Keep wipes in multiple locations']
  };
  
  const categoryRecs = recommendations[category] || [];
  return categoryRecs.slice(0, Math.floor(Math.random() * 3) + 1);
}

function getRandomTags(category: ChecklistCategory): string[] {
  const tagPool = ['essential', 'safety', 'comfort', 'budget-friendly', 'premium', 'must-have', 'nice-to-have'];
  return tagPool.slice(0, Math.floor(Math.random() * 3) + 1);
}

function getTrimester(dueDate: Date): 1 | 2 | 3 {
  const daysUntilDue = (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  const weeksPregnant = 40 - (daysUntilDue / 7);
  
  if (weeksPregnant <= 13) return 1;
  if (weeksPregnant <= 27) return 2;
  return 3;
}

function getDueDateMessage(dueDate: Date): string {
  const daysRemaining = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) return 'Baby has arrived!';
  if (daysRemaining === 0) return 'Due today!';
  if (daysRemaining === 1) return 'Due tomorrow!';
  if (daysRemaining <= 7) return `Due in ${daysRemaining} days`;
  if (daysRemaining <= 30) return `Due in ${Math.ceil(daysRemaining / 7)} weeks`;
  return `Due in ${Math.ceil(daysRemaining / 7)} weeks`;
}
