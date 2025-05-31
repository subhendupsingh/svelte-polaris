---
title: Button Component
description: Complete guide to Shopify Polaris Button component variants with code examples
---

import { Card, CardGrid } from '@astrojs/starlight/components';

# Button Component

The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## Props Overview

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'plain' \| 'monochromePlain'` | `'secondary'` | Changes the visual appearance |
| `tone` | `'critical' \| 'success'` | - | Provides semantic meaning |
| `size` | `'micro' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Determines the button size |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment within the button |
| `fullWidth` | `boolean` | `false` | Makes the button span the full width of its container |
| `pressed` | `boolean` | `false` | Indicates the pressed state (replaces deprecated `ariaPressed`) |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows loading state with spinner |
| `icon` | `IconSource` | - | Adds an icon to the button |
| `accessibilityLabel` | `string` | - | Provides screen reader accessible label |
| `onClick` | `() => void` | - | Callback when button is clicked |

## Variant Examples

### Primary Button
Primary buttons are used for the most important actions. Use them sparingly and only for the primary action on a page.

```jsx
<Button variant="primary">Save changes</Button>
<Button variant="primary" tone="success">Complete order</Button>
<Button variant="primary" tone="critical">Delete account</Button>
```

### Secondary Button (Default)
Secondary buttons are the default button style. Use them for secondary actions that complement the primary action.

```jsx
<Button>Cancel</Button>
<Button variant="secondary">View details</Button>
<Button tone="critical">Remove item</Button>
```

### Tertiary Button
Tertiary buttons are used for less important actions that still need to be discoverable.

```jsx
<Button variant="tertiary">Learn more</Button>
<Button variant="tertiary" tone="critical">Reset settings</Button>
```

### Plain Button
Plain buttons are used for actions that need to blend into the background or appear inline with text.

```jsx
<Button variant="plain">Edit</Button>
<Button variant="plain" tone="critical">Delete</Button>
```

### Monochrome Plain Button
Monochrome plain buttons are used when you need a subtle button that works on various backgrounds.

```jsx
<Button variant="monochromePlain">Settings</Button>
<Button variant="monochromePlain" pressed>Toggle view</Button>
```

## Size Variants

### Micro Button
Use micro buttons in tight spaces where a smaller button is needed.

```jsx
<Button size="micro">Edit</Button>
<Button size="micro" variant="primary">Save</Button>
```

### Small Button
Small buttons are useful in compact layouts or when multiple buttons need to fit in a limited space.

```jsx
<Button size="small">Cancel</Button>
<Button size="small" variant="primary">Apply</Button>
```

### Medium Button (Default)
Medium is the default size for most use cases.

```jsx
<Button>Default size</Button>
<Button variant="primary">Submit form</Button>
```

### Large Button
Large buttons are prominent and should be used for important actions that need extra emphasis.

```jsx
<Button size="large">Get started</Button>
<Button size="large" variant="primary">Create account</Button>
```

## Button States

### Disabled State
Disabled buttons indicate that an action is not currently available.

```jsx
<Button disabled>Unavailable action</Button>
<Button variant="primary" disabled>Submit (disabled)</Button>
```

### Loading State
Loading buttons show progress for asynchronous actions.

```jsx
<Button loading>Processing...</Button>
<Button variant="primary" loading>Saving changes</Button>
```

### Pressed State
Pressed state indicates that a toggle button is currently active.

```jsx
<Button pressed>Active filter</Button>
<Button variant="tertiary" pressed>Bold text</Button>
```

## Buttons with Icons

### Icon Only Button
Use icon-only buttons when space is limited and the icon meaning is clear.

```jsx
import { SearchIcon, DeleteIcon, EditIcon } from '@shopify/polaris-icons';

<Button accessibilityLabel="Search" icon={SearchIcon} />
<Button accessibilityLabel="Delete" icon={DeleteIcon} tone="critical" />
<Button accessibilityLabel="Edit" icon={EditIcon} variant="plain" />
```

### Button with Icon and Text
Combine icons with text to provide both visual and textual context.

```jsx
import { PlusIcon, SaveIcon, ExportIcon } from '@shopify/polaris-icons';

<Button icon={PlusIcon}>Add product</Button>
<Button icon={SaveIcon} variant="primary">Save changes</Button>
<Button icon={ExportIcon} variant="tertiary">Export data</Button>
```

## Layout Options

### Full Width Button
Full width buttons span the entire width of their container.

```jsx
<Button fullWidth>Full width button</Button>
<Button fullWidth variant="primary">Primary full width</Button>
```

### Text Alignment
Control how text is aligned within the button, especially useful with full width buttons.

```jsx
<Button fullWidth textAlign="left">Left aligned</Button>
<Button fullWidth textAlign="center">Center aligned</Button>
<Button fullWidth textAlign="right">Right aligned</Button>
```

## Complex Examples

### Form Actions
Common pattern for form submission and cancellation.

```jsx
import { ButtonGroup } from '@shopify/polaris';

<ButtonGroup>
  <Button>Cancel</Button>
  <Button variant="primary">Save product</Button>
</ButtonGroup>
```

### Action with Loading and Success States
Example showing state management for async actions.

```jsx
function ActionButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await performAction();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Button variant="primary" tone="success" disabled>
        ✓ Saved successfully
      </Button>
    );
  }

  return (
    <Button 
      variant="primary" 
      loading={loading}
      onClick={handleAction}
    >
      Save changes
    </Button>
  );
}
```

### Destructive Action with Confirmation
Pattern for dangerous actions that require user confirmation.

```jsx
import { Modal, TextContainer } from '@shopify/polaris';

function DeleteButton({ onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button 
        tone="critical" 
        variant="primary"
        onClick={() => setShowModal(true)}
      >
        Delete product
      </Button>
      
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Delete product"
        primaryAction={{
          content: 'Delete',
          destructive: true,
          onAction: () => {
            onDelete();
            setShowModal(false);
          },
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setShowModal(false),
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}
```

## Migration Notes

### From v11 to v12
The Button component was updated to replace boolean props with more semantic `variant` and `tone` props:

```jsx
// Old (deprecated)
<Button primary />
<Button destructive />
<Button plain />
<Button outline />

// New (recommended)
<Button variant="primary" />
<Button variant="primary" tone="critical" />
<Button variant="plain" />
<Button /> // outline is now the default secondary style
```

### From v5 to v6
- `ariaPressed` was replaced with `pressed`
- `stretchContent` was replaced with `fullWidth` and `textAlign="left"`

```jsx
// Old
<Button ariaPressed={true}>Toggle</Button>
<Button stretchContent>Full width</Button>

// New
<Button pressed={true}>Toggle</Button>
<Button fullWidth textAlign="left">Full width</Button>
```

## Accessibility

- Always provide descriptive text or `accessibilityLabel` for screen readers
- Use semantic `tone` props to convey meaning (critical for destructive actions)
- Ensure sufficient color contrast for all button variants
- Consider focus states and keyboard navigation
- For icon-only buttons, always include `accessibilityLabel`

## Best Practices

1. **Use primary buttons sparingly** - Only one primary button per page section
2. **Choose appropriate variants** - Match the visual weight to the action importance
3. **Provide clear labels** - Button text should clearly describe the action
4. **Consider loading states** - Always show progress for async actions
5. **Group related actions** - Use ButtonGroup for related actions
6. **Maintain consistency** - Use the same button variants for similar actions across your app

<Card title="Pro Tip">
When using buttons with icons, ensure the icon reinforces the text meaning rather than conflicting with it. Icons should feel natural and intuitive to users.
</Card>
