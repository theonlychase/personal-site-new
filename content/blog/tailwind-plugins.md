---
id: 'migrating-tailwind-3-plugins-to-tailwind-4'
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev'
title: 'Tailwind 4 Plugin Migration'
description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
image:
  src: 'https://picsum.photos/640/360'
  alt: 'Tailwind 4 Plugins'
sitemap:
  loc: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
short: 'Tailwind 4 Plugin Migration'
icon: 'i-devicon-tailwindcss'
tags: ['CSS', 'Tailwind', 'Nuxt']
path: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
slug: 'migrating-tailwind-3-plugins-to-tailwind-4'
created: '2025-02-04'
---

## Tailwind 3 Plugin

This plugin takes in a dynamic value and sets the aspect ratio of an element. It also has support for older browsers that don't support the `aspect-ratio` property.

```js [aspect-ratio.plugin.js] meta-info=val
const aspectRatio = ({ matchUtilities, theme }) =>
  matchUtilities(
    {
      aspect: (value) => ({
        '@supports (aspect-ratio: 1 / 1)': {
          aspectRatio: value,
        },
        '@supports not (aspect-ratio: 1 / 1)': {
          '&::before': {
            content: '""',
            float: 'left',
            paddingTop: `calc(100% / (${value}))`,
          },
          '&::after': {
            clear: 'left',
            content: '""',
            display: 'block',
          },
        },
      }),
    },
    { values: theme('aspectRatio') }
  );
```

Example of how you might add this plugin to your `tailwind.config.js` file under `plugins`:

```js [tailwind.config.js] meta-info=val
{
  plugins: [({ matchUtilities, theme }) => {
    aspectRatio({ matchUtilities, theme });
  }]
}
```

### Tailwind 4 Utility

Converting the above plugin to now what is a called a Utility

```css [styles.css] meta-info=val
@utility aspect-* {
  @supports (aspect-ratio: 1 / 1) {
    aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
  }

  @supports not (aspect-ratio: 1 / 1) {
    &::before {
      content: '';
      float: left;
      padding-top: calc(100% / (--value(--aspect-ratio-*, ratio, [ratio])));
    }

    &::after {
      clear: left;
      content: '';
      display: block;
    }
  }
}
```

### Dynamic Header Utility with Modifiers

Defining the Font Sizes

```css [styles.css] meta-info=val
@theme inline {
  --header-1: --spacing(7);
  --header-2: --spacing(6.5);
  --header-3: --spacing(6);
  --header-4: --spacing(5);
  --header-5: --spacing(4.5);
  --header-6: --spacing(4);
}
```

Adding a font-weight modifier to the above header utilities. With this modifier, I can use `header-1/semibold` and `header-3/normal` to set the font weight.

```css [styles.css] meta-info=val
@utility header-* {
  font-size: --value(--header-*);
  font-weight: --modifier(--font-weight-*, [length], [*]);
}
```

*To Be Continued...*
