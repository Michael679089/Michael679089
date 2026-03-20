---
title: Tutorial on how to create a portfolio website like this
published: 2026-02-15
description: Learn to deploy a static portfolio page (like this). We will be using Astro as our Framework and Obsidian as our CMS (Content Management Service)
image: ""
tags:
  - programming/astro
  - application/obsidian
category: Portfolio
draft: false
---
# Tools we’re using
- Astro
- Obsidian (for static content management (you put more content by git pushing not via server).)


Below is the tutorial

---
# Step 1: Get an Astro Theme
Get an Astro theme website here: https://astro.build/themes/1/.

# Step 2: Follow this tutorial

Usually the astro theme has a .github folder which handles the way the portfolio website becomes a static page in github pages, if not please follow this tutorial:

https://docs.astro.build/en/guides/deploy/github/

# Step 3: Download Vault CMS

After you’re done setting up your astro website, install Vault CMS, here’s their official website: https://vaultcms.org/

At the root of the project do this command:

```bash
npm create vault-cms
```

or if the project uses pnpm do this command:

```bash
pnpm create vault-cms
```

> [!NOTE]
> always check if the astro theme you used, uses pnpm or npm.


# Step 4: Download Obsidian (if you don’t have one)
- We will need to add content via obsidian text editor, which is free forever, but it’s closed source. 
- Download obsidian here: https://obsidian.md/download

# Step 5: Open Obsidian at the src/content folder

if the astro theme you chose has a src/content folder in it, you can run obsidian in that folder and you can start adding content. Just follow the wizard guide set up and you can do start adding content. 


---

# Conclusion
And now you’re done, you now have a free static github page that you can easily add more content into without having to pay any fees and it’s yours to keep forever. 

Please share this page if you find it helpful.







