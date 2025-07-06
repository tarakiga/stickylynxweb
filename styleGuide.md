# Web App Style Guide

## Color Palette

### Primary Colors
- **Aureolin (Yellow Accent)**: `#f6ee24ff` - Used for primary buttons, highlights, and important interactive elements
- **Raisin Black (Dark Neutral)**: `#1e1e24ff` - Primary text color and dark backgrounds

### Secondary Colors
- **Penn Red (Alert/Danger)**: `#92140cff` - Error messages, destructive actions
- **Space Cadet (Dark Blue)**: `#111d4aff` - Secondary buttons, headers
- **Blue Munsell (Light Blue)**: `#62929eff` - Accents, informational elements

## Typography
- **Primary Font**: Asap (Sans-serif)
- **Fallback Fonts**: Arial, Helvetica, sans-serif

### Font Sizes
- **H1**: 2.5rem (40px)
- **H2**: 2rem (32px)
- **H3**: 1.75rem (28px)
- **H4**: 1.5rem (24px)
- **Body Text**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Font Weights
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700

## UI Components

### Buttons
```css
/* Primary Button */
.btn-primary {
  background-color: var(--aureolin);
  color: var(--raisin-black);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--space-cadet);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
}

/* Danger Button */
.btn-danger {
  background-color: var(--penn-red);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
}
```

### Forms
```css
/* Input Fields */
.input-field {
  border: 1px solid var(--blue-munsell);
  border-radius: 4px;
  padding: 8px 12px;
  background-color: white;
  color: var(--raisin-black);
}

/* Labels */
.label {
  color: var(--raisin-black);
  font-weight: 500;
  margin-bottom: 4px;
}

/* Checkboxes/Radio Buttons */
.checkbox {
  accent-color: var(--aureolin);
}
```

### Navigation
```css
/* Navbar */
.navbar {
  background-color: var(--raisin-black);
  color: white;
}

/* Nav Links */
.nav-link {
  color: white;
  padding: 8px 16px;
}

.nav-link:hover {
  color: var(--aureolin);
}

/* Active Nav Link */
.nav-link.active {
  color: var(--aureolin);
  border-bottom: 2px solid var(--aureolin);
}
```

### Cards
```css
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #eee;
}

.card-header {
  background-color: var(--space-cadet);
  color: white;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
}

.card-body {
  padding: 16px;
}
```

## Spacing System
- **Base Unit**: 8px
- **Small**: 4px (0.5x)
- **Medium**: 8px (1x)
- **Large**: 16px (2x)
- **X-Large**: 24px (3x)
- **XX-Large**: 32px (4x)

## Shadows
```css
/* Small Shadow */
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Medium Shadow */
.shadow-md {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Large Shadow */
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}
```

## Utility Classes
```css
/* Text Colors */
.text-primary {
  color: var(--raisin-black);
}

.text-accent {
  color: var(--aureolin);
}

.text-danger {
  color: var(--penn-red);
}

.text-info {
  color: var(--blue-munsell);
}

/* Background Colors */
.bg-dark {
  background-color: var(--raisin-black);
}

.bg-accent {
  background-color: var(--aureolin);
}

.bg-info {
  background-color: var(--blue-munsell);
}

/* Margins and Paddings */
.m-1 { margin: 4px; }
.m-2 { margin: 8px; }
.m-3 { margin: 16px; }

.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
.p-3 { padding: 16px; }
```

## Accessibility Considerations
- Ensure sufficient contrast between text and background colors
- Use Aureolin sparingly for maximum impact
- Provide alternative text for icons and images
- Maintain consistent focus states for interactive elements

This style guide provides a comprehensive foundation for your web app using the specified color palette and Asap font family. The components and utilities can be extended as needed for your specific application requirements.