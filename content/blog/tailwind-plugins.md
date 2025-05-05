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
head:
  templateParams:
    title: 'Tailwind 4 Plugin Migration'
    ogTitle: 'Tailwind 4 Plugin Migration'
    twitterTitle: 'Tailwind 4 Plugin Migration'
    description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
    ogDescription: 'Migrating Tailwind 3 Plugins to Tailwind 4'
    twitterDescription: 'Migrating Tailwind 3 Plugins to Tailwind 4'
image:
  src: 'https://picsum.photos/640/360'
  alt: 'Tailwind 4 Plugins'
seo: 
  title: 'Tailwind 4 Plugin Migration'
  ogTitle: 'Tailwind 4 Plugin Migration'
  twitterTitle: 'Tailwind 4 Plugin Migration'
  description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
  ogDescription: 'Migrating Tailwind 3 Plugins to Tailwind 4'
  twitterDescription: 'Migrating Tailwind 3 Plugins to Tailwind 4'
sitemap:
  loc: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
short: 'Tailwind 4 Plugin Migration'
icon: 'i-devicon-tailwindcss'
tags: ['CSS', 'Tailwind', 'Nuxt']
path: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
slug: 'migrating-tailwind-3-plugins-to-tailwind-4'
created: '2025-02-04'
---

It's been awhile since I last updated this site. I decided to take on the task of
migrating not only Tailwind to version 4, but updating/migrating a slew of other 
Nuxt modules & packages.

Tailwind 4 has provided a new way of creating plugins using the <a href="https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities" target="_blank">@utility</a> directive within your stylesheet, instead of using javascript.

You are still able to create plugins using javascript in v4, but the process has changed slightly. See <a href="https://tailwindcss.com/docs/functions-and-directives#plugin-directive" target="_blank">Tailwind 4 Legacy Plugins</a>.

Here are a few examples of plugins I created/migrated in Tailwind 4:

### Tailwind 3 Plugin
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

This is how you would add this plugin to your `tailwind.config.js` file under `plugins`:

```js [tailwind.config.js] meta-info=val
{
  plugins: [({ matchUtilities, theme }) => {
    aspectRatio({ matchUtilities, theme });
  }]
}
```

### Tailwind 4 Utility
We will now convert the above plugin to a Tailwind 4 utility using the `@utility` directive. We use the `--value()` function to get the value. 
In our case below, we need the value to be <a href="https://tailwindcss.com/docs/adding-custom-styles#fractions" target="_blank">fraction</a>.

This will match utilities like `aspect-[1/1]` and `aspect-[16/9]`. 

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

### Dynamic Header Utility
This utility allows me set default styles for my headers, but also allows me replicate those header styles on other elements. I'll also be adding a modifier for font weight.

1. I'll start off by defining theme values for headers. The <a href="https://tailwindcss.com/docs/functions-and-directives#spacing-function" target="_blank">--spacing</a> function generates a spacing based on the value passed in. We will be restricting the utility for headers 1-6.
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
1. Next, we will create the utility with a `font-weight` <a href="https://tailwindcss.com/docs/adding-custom-styles#modifiers" target="_blank">modifier</a>
2. This will match utilities like `header-1`, and `header-2`.
3. The modifier allows me to pass in a theme value for `font-weight` or a custom value.
4. With a modifier, I could use `header-1/semibold` and `header-3/normal` to set the font weight.
```css [styles.css] meta-info=val
@utility header-* {
  font-size: --value(--header-*);
  font-weight: --modifier(--font-weight-*, [length], [*]);
}
```

*To Be Continued...*
