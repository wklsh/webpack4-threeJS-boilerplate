# 7-1 SASS File System Pattern

```javascript
sass/
|
|– base/
|   |– _reset.scss          # Reset/normalize
|   |– _typography.scss     # Typography rules
|   |– _base-form.scss      # All form-related base DOM element overwrites (input, checkbox, button, etc.)
|   |– _base-overall.scss   # All base DOM element overwrites (main, section, etc.)
|   ...                     # Etc…
|
|– components/
|   |– _buttons.scss        # Buttons
|   |– _carousel.scss       # Carousel
|   |– _cover.scss          # Cover
|   |– _dropdown.scss       # Dropdown
|   ...                     # Etc…
|
|– layout/
|   |– _navigation.scss     # Navigation
|   |– _grid.scss           # Grid system
|   |– _header.scss         # Header
|   |– _footer.scss         # Footer
|   |– _sidebar.scss        # Sidebar
|   |– _forms.scss          # Forms
|   ...                     # Etc…
|
|– pages/
|   |– _home.scss           # Home specific styles
|   |– _contact.scss        # Contact specific styles
|   ...                     # Etc…
|
|– themes/
|   |– _theme.scss          # Default theme
|   |– _admin.scss          # Admin theme
|   ...                     # Etc…
|
|– utils/
|   |– _variables.scss      # Sass Variables
|   |– _functions.scss      # Sass Functions
|   |– _mixins.scss         # Sass Mixins
|   |– _helpers.scss        # Class & placeholders helpers
|
|– vendors/
|   |– _bootstrap.scss      # Bootstrap
|   |– _jquery-ui.scss      # jQuery UI
|   ...                     # Etc…
|
|
-– index.scss               # Main Sass file
```
