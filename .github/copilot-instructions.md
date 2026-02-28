# Laxmi Agency Frontend - Copilot Instructions

## Architecture Overview

**Monorepo Structure**: React + Vite frontend with Express/MongoDB backend.

### Directory Structure
- `src/pages/` - Route components (Home, Login, Admin pages, Customer portal)
- `src/components/` - Reusable UI components (Button, FormInput, Card, Modal, Badge, etc.)
- `src/config/` - Design tokens & theme configuration
- `src/context/` - React Context (ThemeContext for light/dark mode)
- `src/styles/` - Global styles + animations
- `src/api/` - API client & utilities using Axios
- `public/` - Static assets including Laxmi Agency logo

## Brand Design System

### Color Palette (DO NOT hardcode colors - use theme system)
```javascript
// Always import from config/colorsTheme.js:
import { getColors } from '../config/colorsTheme';
const colors = getColors(isDarkMode); // Get theme-aware colors

// Key brand colors:
// Primary: #C2185B (Deep Pink - main CTAs, headings)
// Secondary: #1B5E20 (Dark Green - success states, buttons)
// Accent: #C9A646 (Gold - borders, highlights)
// Background: #FDF6F0 (Soft Cream)
// Gradients: Pink→Green for navbar, buttons
```

### Logo Usage
- **File**: `/Modern_LAXMI_AGENCY_Logo_in_Pink_and_Green-removebg-preview.png`
- **Navbar**: 50x50px with `animation: logoFadeScale 600ms ease-out`
- **Home Hero**: Large (320px) with glow effect: `filter: drop-shadow(0 8px 24px rgba(194, 24, 91, 0.15))`
- Always include `objectFit: 'contain'` to preserve logo aspect ratio

### Animation System
Standard animations injected via `globalStyles.js`. Use these for consistency:
- `logoFadeScale` - Logo fade + scale (600ms)
- `slideInUpSmooth` - Section entrance (600ms)
- `softGlow` - Soft pulsing shadow
- `slideInDown`, `slideInUp` - Standard slides (250ms)
- `fadeIn`, `scaleIn` - Standard effects (250ms)

Apply inline: `animation: 'slideInUpSmooth 600ms ease-out'`

## Component Patterns

### FormInput
```jsx
<FormInput
  label="Item Name"
  name="itemName"
  value={form.itemName}
  onChange={handleChange}
  error={errors.itemName}
  required
/>
// Automatically uses brand colors for focus states & errors
```

### Button Variants
```jsx
<Button variant="primary" size="lg" fullWidth onClick={handleSubmit}>
  Save Item
</Button>
// Variants: 'primary' (pink), 'secondary' (green), 'danger' (red), 'ghost'
// Primary animates to green on hover
```

### Using Theme Colors in Components
```jsx
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';

export default function MyComponent() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  
  const styles = {
    header: { color: colors.brand.main },
    border: { borderColor: colors.border.light },
    shadow: { boxShadow: colors.shadow.md },
  };
}
```

## Page-Specific Patterns

### Home Page
- Features large logo with drop shadow
- Star rating (★★★★★) in accent gold color
- Contact form with brand-themed inputs
- Scroll-triggered animations via IntersectionObserver
- Import theme colors for consistent styling

### Admin Pages (Admin.jsx, AdminTable.jsx, AdminInquiries.jsx)
- Sidebar navigation (260px width)
- Share `AdminSidebar` component
- Use design system for all spacing/colors
- Tables use brand colors for badges
- Edit modals with brand-themed buttons

### Customer Portal (Customer.jsx)
- Sidebar with category filters
- Uses `categoryButton` with brand colors (pink border when active)
- Grid or table view of items
- Search bar with 2px brand-colored borders on focus

### Login Page
- Logo text with `background: gradient.brand` + `WebkitBackgroundClip: text`
- Form card with subtle border
- Centered layout matching Laxmi branding

## API Integration

### Endpoints (all routes at `https://laxmi-agency-backend.onrender.com/api`)
```javascript
// Items
GET /items              // Fetch all items
POST /items             // Create item (admin)
PUT /items/:id          // Update item (admin)
DELETE /items/:id       // Delete item (admin)

// Inquiries
POST /inquiries         // Submit public inquiry
GET /inquiries          // Get all inquiries (admin)
DELETE /inquiries/:id   // Delete inquiry (admin)

// Auth
POST /auth/login        // Returns { token, role, email }
```

### API Client Pattern
```javascript
import API from '../api/api';

try {
  const res = await API.get('/items');
  setItems(res.data);
} catch (err) {
  console.error('Error:', err);
  setError('Failed to load items. Please try again.');
}
```

## Theming & Dark Mode

### Context Setup
- `ThemeContext` provides `isDarkMode` + `toggleTheme()`
- Automatically persists to localStorage
- Respects system preference on first load
- Theme button in `ThemeToggle` component

### Theme-Aware Component Pattern
```jsx
const { isDarkMode } = useTheme();
const themeColors = getColors(isDarkMode);

return (
  <div style={{ 
    background: themeColors.background.main,
    color: themeColors.text.primary 
  }}>
    {/* All nested components inherit theme */}
  </div>
);
```

## Styling Guidelines

### Spacing System (use exclusively)
- `xs`: 4px (tight)
- `sm`: 8px (compact)
- `md`: 12px (default)
- `lg`: 16px (comfortable)
- `xl`: 24px (spacious)
- `xxl`: 32px (very spacious)
- `xxxl`: 48px (section spacing)

### Import: `import { spacing } from '../config/colors'`

### Border Radius
- `sm`: 4px, `md`: 8px, `lg`: 12px, `xl`: 16px, `full`: 9999px
- **Use**: Form inputs, cards = `md` or `lg`; buttons = `md`

### Transitions
- `fast`: 150ms (hover effects)
- `base`: 250ms (standard animations)
- `slow`: 350ms (emphasis animations)

## State Management Patterns

### Loading States
```jsx
const [isLoading, setIsLoading] = useState(false);

return isLoading ? <LoadingSpinner size="md" /> : <Content />;
```

### Error Handling
```jsx
const [error, setError] = useState('');

{error && (
  <div style={{
    backgroundColor: colors.danger.lighter,
    color: colors.danger.dark,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  }}>
    {error}
  </div>
)}
```

### Form Validation Pattern
```jsx
const validateForm = () => {
  const newErrors = {};
  if (!form.itemName.trim()) newErrors.itemName = 'Item name is required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Common Mistakes to Avoid

❌ **Don't hardcode colors** - Always use `colors` from `getColors(isDarkMode)`  
❌ **Don't use inline pixels** - Use spacing constants  
❌ **Don't forget theme in new pages** - Always import `useTheme()` + `getColors()`  
❌ **Don't skip animations** - Add `animation: 'slideInUpSmooth...'` to section divs  
❌ **Don't ignore logo asset** - Use the pink/green logo from public folder  

## Development Workflow

### Add a New Page
1. Create file in `src/pages/[PageName].jsx`
2. Import theme: `import { useTheme } from '../context/ThemeContext'`
3. Import colors: `import { getColors } from '../config/colorsTheme'`
4. Use spacing + borderRadius from config
5. Apply animations from globalStyles
6. Add route in `App.jsx`

### Update Colors Globally
- **Only** edit `src/config/colorsTheme.js` (light/dark definitions)
- Changes apply everywhere via `getColors(isDarkMode)`
- No individual file updates needed

### Add New Component
1. Create in `src/components/`
2. Accept `isDarkMode` via `useTheme()` hook
3. Use `getColors()` for all colors
4. Export from `src/components/index.js`
5. Use design tokens for spacing/radius

## Performance Notes

- Logo image is PNG with transparent bg (no whitespace)
- Animations use CSS (hardware accelerated)
- Global styles injected once via `injectGlobalStyles()` in App.jsx
- Form validations are synchronous (fine for this scale)

## Key Files Reference

| File | Purpose |
|------|---------|
| `config/colorsTheme.js` | Brand colors (light/dark) + gradients |
| `config/colors.js` | Spacing, border-radius, transitions constants |
| `styles/globalStyles.js` | Animations + global CSS |
| `context/ThemeContext.jsx` | Dark mode toggle + persistence |
| `components/Button.jsx` | Primary brand button with pink→green hover |
| `components/FormInput.jsx` | Branded form inputs with validation |
| `pages/Home.jsx` | Landing page with large logo + inquiry form |
| `pages/Admin.jsx` | Admin add-item form |
| `pages/AdminTable.jsx` | Admin inventory management |

---

**Last Updated**: Feb 21, 2026  
**Brand Colors**: Pink #C2185B, Green #1B5E20, Gold #C9A646  
**Build**: `npm run build` | **Dev**: `npm run dev` (port 5173)
