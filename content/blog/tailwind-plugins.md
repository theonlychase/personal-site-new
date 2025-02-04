---
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev/'
title: 'Chase Isley - Tailwind 4 Plugin Migration'
description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
head:
  templateParams:
    title: 'Chase Isley - Tailwind 4 Plugin Migration'
    description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
image:
  src: 'https://picsum.photos/640/360?random=2'
  alt: 'Tailwind 4 Plugins'
seo: 
  title: 'Chase Isley - Tailwind 4 Plugin Migration'
  description: 'Migrating Tailwind 3 Plugins to Tailwind 4'
sitemap:
  loc: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
short: 'Tailwind 4 Plugin Migration'
tags: ['CSS', 'Tailwind', 'Nuxt']
path: '/blog/migrating-tailwind-3-plugins-to-tailwind-4'
created: 'Feb 4, 2025'
---

It's been awhile since I last updated this site. I decided to take on the task of
migrating not only Tailwind to version 4, but updating/migrating a slew of other 
Nuxt modules & packages. I'll save that for another post, but for now, I thought I'd share
some of the plugins I've had to migrate to Tailwind 4.

Tailwind 4 has provided a new way of creating plugins using the `@utlilty` directive within your stylesheet, instead of using javascript. 
<a href="https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities" target="_blank">Tailwind 4 Utilities</a>.

You are still able to create plugins using javascript in v4, but the process has changed slightly. See <a href="https://tailwindcss.com/docs/functions-and-directives#plugin-directive" target="_blank">Tailwind 4 Legacy Plugins</a>.

Here are a few examples of plugins I've had to migrate to Tailwind 4:

#### Tailwind 3 Plugin
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

You would then add this plugin to your `tailwind.config.js` file under `plugins`:

```js [tailwind.config.js] meta-info=val
{
  plugins: [({ addUtilities, matchUtilities, theme, e }) => {
    aspectRatio({ matchUtilities, theme });
  }]
}
```

#### Tailwind 4 Utility
We will now convert the above plugin to a Tailwind 4 utility using the `@utility` directive. We use the `--value()` function to get the arbitrary value. There is much more you can do with this function. 
In our case below, we need the value to be fraction. <a href="https://tailwindcss.com/docs/adding-custom-styles#fractions" target="_blank">Handling Fractions using --value()</a>

To use the new utility, simply add a valid aspect ratio value, such as `aspect-[1/1]`, as a class anywhere in your application. 

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

To Be Continued...




