# Component API Reference

Complete API documentation for all reusable components.

---

## FormInput

Modern text input with validation, labels, and error states.

### Import
```jsx
import { FormInput } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | - | Input label text |
| `name` | string | - | Input name attribute |
| `placeholder` | string | - | Placeholder text |
| `value` | string | required | Current input value |
| `onChange` | function | required | Change event handler |
| `type` | string | 'text' | Input type (text, email, password, tel, number, etc.) |
| `error` | string | '' | Error message to display |
| `required` | boolean | false | Show required asterisk |
| `disabled` | boolean | false | Disable input |

### Example
```jsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

<FormInput
  label="Email Address"
  name="email"
  type="email"
  placeholder="user@example.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={error}
  required
/>
```

---

## Button

Versatile button component with multiple variants and sizes.

### Import
```jsx
import { Button } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button text/content |
| `variant` | string | 'primary' | 'primary', 'secondary', 'danger', 'ghost' |
| `size` | string | 'md' | 'sm', 'md', 'lg' |
| `onClick` | function | - | Click event handler |
| `type` | string | 'button' | 'button', 'submit', 'reset' |
| `disabled` | boolean | false | Disable button |
| `isLoading` | boolean | false | Show loading spinner |
| `fullWidth` | boolean | false | Stretch to full width |
| `icon` | string | '' | Icon/emoji prefix |
| `className` | string | '' | Additional CSS class |

### Variants
```jsx
// Primary (Blue) - Main actions
<Button variant="primary">Save</Button>

// Secondary (Green) - Confirmations
<Button variant="secondary">Confirm</Button>

// Danger (Red) - Destructive actions
<Button variant="danger">Delete</Button>

// Ghost (Outline) - Secondary actions
<Button variant="ghost">Cancel</Button>
```

### Sizes
```jsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

### Loading State
```jsx
const [isLoading, setIsLoading] = useState(false);

<Button
  isLoading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### With Icon
```jsx
<Button icon="💾">Save</Button>
<Button icon="🗑️" variant="danger">Delete</Button>
<Button icon="✓" variant="secondary">Confirm</Button>
```

---

## Card

Simple wrapper for card-based layouts.

### Import
```jsx
import { Card } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Card content |
| `hoverable` | boolean | false | Enable hover lift effect |
| `className` | string | '' | Additional CSS class |
| `style` | object | {} | Custom inline styles |

### Examples
```jsx
// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Hoverable card
<Card hoverable={true}>
  <h3>Click me</h3>
</Card>

// With custom styles
<Card style={{ padding: '24px' }}>
  Content
</Card>
```

---

## LoadingSpinner

Animated loading indicator with three sizes.

### Import
```jsx
import { LoadingSpinner } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | 'md' | 'sm' (24px), 'md' (40px), 'lg' (56px) |

### Example
```jsx
{isLoading ? (
  <LoadingSpinner size="md" />
) : (
  <div>Content</div>
)}
```

---

## Modal

Dialog/Modal component for important content.

### Import
```jsx
import { Modal } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | - | Is modal visible |
| `onClose` | function | - | Close handler |
| `title` | string | - | Modal title |
| `children` | ReactNode | - | Modal content |
| `size` | string | 'md' | 'sm' (400px), 'md' (600px), 'lg' (800px) |
| `actions` | ReactNode | null | Footer action buttons |

### Example
```jsx
const [isOpen, setIsOpen] = useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>
    Open Modal
  </Button>

  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm Deletion"
    size="sm"
    actions={
      <>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </>
    }
  >
    Are you sure you want to delete this item? This action cannot be undone.
  </Modal>
</>
```

---

## Badge

Label/tag component for categorization.

### Import
```jsx
import { Badge } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Badge text |
| `variant` | string | 'primary' | 'primary', 'secondary', 'danger', 'warning', 'success' |
| `size` | string | 'md' | 'sm', 'md' |

### Variants
```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="success">Success</Badge>
```

### Sizes
```jsx
<Badge size="sm">Small Badge</Badge>
<Badge size="md">Medium Badge</Badge>
```

### Example
```jsx
<div>
  <Badge variant="primary">Electronics</Badge>
  <Badge variant="secondary">In Stock</Badge>
  <Badge variant="danger">Limited</Badge>
</div>
```

---

## Alert

Notification/alert component with auto-dismiss.

### Import
```jsx
import { Alert } from '../components';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | 'info' | 'success', 'error', 'warning', 'info' |
| `message` | string | - | Alert message |
| `duration` | number | 5000 | Auto-close duration in ms (0 = no auto-close) |
| `onClose` | function | () => {} | Close handler |

### Types
```jsx
// Success (Green)
<Alert type="success" message="Item saved successfully!" />

// Error (Red)
<Alert type="error" message="An error occurred. Please try again." />

// Warning (Amber)
<Alert type="warning" message="Please review your changes." />

// Info (Blue)
<Alert type="info" message="Loading your data..." />
```

### With Auto-Close
```jsx
const [showAlert, setShowAlert] = useState(false);

<Alert
  type="success"
  message="Changes saved!"
  duration={3000}
  onClose={() => setShowAlert(false)}
/>
```

### Manual Close
```jsx
// Duration = 0 means no auto-close
<Alert
  type="error"
  message="Critical error occurred"
  duration={0}
/>
```

---

## AdminSidebar

Navigation sidebar for admin pages.

### Import
```jsx
import AdminSidebar from '../components/AdminSidebar';
```

### Usage
```jsx
import AdminSidebar from '../components/AdminSidebar';

export default function MyAdminPage() {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '260px' }}>
        {/* Your page content */}
      </div>
    </div>
  );
}
```

### Features
- ✅ Fixed width (260px)
- ✅ Active route highlighting
- ✅ Smooth animations
- ✅ Dark theme
- ✅ Version display

---

## Design Tokens

### Colors
```javascript
import { colors } from '../config/colors';

// Usage
const styles = {
  color: colors.text.primary,
  backgroundColor: colors.background.card,
  border: `1px solid ${colors.border.light}`,
  boxShadow: colors.shadow.md,
};
```

### Spacing
```javascript
import { spacing } from '../config/colors';

const styles = {
  padding: spacing.lg,
  margin: spacing.md,
  gap: spacing.sm,
};
```

### Border Radius
```javascript
import { borderRadius } from '../config/colors';

const styles = {
  borderRadius: borderRadius.md,
};
```

### Transitions
```javascript
import { transitions } from '../config/colors';

const styles = {
  transition: transitions.fast,
};
```

---

## Animation Classes

Apply animations using class names:

```jsx
<div className="fadeIn">Fade in</div>
<div className="slideInUp">Slide up</div>
<div className="slideInLeft">Slide left</div>
<div className="slideInRight">Slide right</div>
<div className="slideInDown">Slide down</div>
<div className="scaleIn">Scale in</div>
<div className="pulse">Pulsing</div>
<div className="bounce">Bouncing</div>
<div className="spin">Spinning</div>
```

Or use inline styles:

```jsx
<div style={{ animation: 'slideInUp 500ms ease-out' }}>
  Content
</div>
```

---

## Common Patterns

### Form with Validation
```jsx
const [form, setForm] = useState({ name: '', email: '' });
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);

const validateForm = () => {
  const newErrors = {};
  if (!form.name) newErrors.name = 'Name required';
  if (!form.email) newErrors.email = 'Email required';
  setErrors(newErrors);
  return !Object.keys(newErrors).length;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  setIsLoading(true);
  try {
    await API.post('/items', form);
    setForm({ name: '', email: '' });
  } finally {
    setIsLoading(false);
  }
};

return (
  <Card>
    <FormInput
      label="Name"
      name="name"
      value={form.name}
      onChange={(e) => setForm({...form, name: e.target.value})}
      error={errors.name}
      required
    />
    <FormInput
      label="Email"
      name="email"
      type="email"
      value={form.email}
      onChange={(e) => setForm({...form, email: e.target.value})}
      error={errors.email}
      required
    />
    <Button onClick={handleSubmit} isLoading={isLoading}>
      Submit
    </Button>
  </Card>
);
```

### Data Table with Actions
```jsx
{items.map((item) => (
  <div key={item.id}>
    <Badge variant="primary">{item.category}</Badge>
    <span>{item.name}</span>
    <Button
      size="sm"
      variant="danger"
      onClick={() => handleDelete(item.id)}
    >
      Delete
    </Button>
  </div>
))}
```

---

## Troubleshooting

### Component not rendering
- Check import path: `import { Button } from '../components'`
- Ensure component is exported in `components/index.js`

### Styles not applying
- Use `colors` from config, not hardcoded values
- Check that design tokens are imported correctly
- Verify inline styles syntax (no camelCase for CSS)

### Animations not working
- Check browser console for errors
- Ensure `injectGlobalStyles()` is called in App.jsx
- Verify animation names match CSS definitions

---

**Version:** 1.0.0  
**Last Updated:** December 27, 2025
