# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an academic personal website built using the **al-folio** Jekyll theme, a feature-rich template designed for academics. The site is hosted on GitHub Pages and automatically deploys when changes are pushed to the main branch.

## Development Commands

### Local Development (Docker - Recommended)

```bash
# Pull and start the development server
docker compose pull
docker compose up

# For slimmer image (under 100MB)
docker compose -f docker-compose-slim.yml up

# Rebuild from scratch
docker compose up --build
```

The site will be available at `http://localhost:8080`.

### Local Development (Legacy)

```bash
# Install dependencies
bundle install
pip install jupyter  # If using Jupyter notebooks

# Serve the site locally
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

### Build Commands

```bash
# Build the site (generates static files in _site/)
bundle exec jekyll build

# Remove unused CSS classes (optional, for optimization)
purgecss -c purgecss.config.js
```

### Code Quality

```bash
# Format code with Prettier
npx prettier --write .

# Pre-commit hooks (configured in .pre-commit-config.yaml)
# - Trailing whitespace removal
# - End-of-file fixer
# - YAML validation
# - Large file detection
```

## Architecture

### Jekyll Static Site Generator

This is a **Jekyll-based static site** that compiles Markdown, Liquid templates, and data files into HTML/CSS/JS. The build process is handled by Jekyll and its plugin ecosystem.

### Key Architectural Patterns

1. **Collections-Based Content**: The site uses Jekyll collections for organizing different content types:
   - `_posts/` - Blog posts (built-in Jekyll collection)
   - `_projects/` - Project portfolio items
   - `_news/` - News/announcements displayed on homepage
   - `_books/` - Book reviews/reading list

2. **Data-Driven Components**: Several features are driven by YAML/JSON data files:
   - `_data/cv.yml` - CV information (fallback if JSON not present)
   - `assets/json/resume.json` - CV in JSON Resume format (preferred)
   - `_data/repositories.yml` - GitHub repository showcase
   - `_data/coauthors.yml` - Co-author metadata for publications
   - `_data/socials.yml` - Social media links

3. **Bibliography System**: Publications are managed via BibTeX:
   - `_bibliography/papers.bib` - All publications in BibTeX format
   - Jekyll-Scholar plugin processes and renders citations
   - Supports custom fields: `pdf`, `code`, `slides`, `poster`, `arxiv`, etc.

4. **Liquid Templating**: The UI is built with Liquid templates:
   - `_layouts/` - Page templates (default, page, post, distill, bib, etc.)
   - `_includes/` - Reusable components (header, footer, news, projects, etc.)

5. **Asset Pipeline**:
   - SASS/SCSS for styling (`_sass/` directory)
   - Jekyll processes and minifies assets
   - Responsive images via jekyll-imagemagick
   - Third-party libraries loaded via CDN (configured in `_config.yml`)

### Configuration Hierarchy

All site configuration is centralized in `_config.yml`:
- Site metadata (title, URL, description)
- Theme colors and layout options
- Plugin configurations (Jekyll Scholar, Archives, etc.)
- Third-party library versions and CDN URLs
- Feature flags (dark mode, analytics, etc.)

**Important**: Changes to `_config.yml` require a full site rebuild.

### Deployment Flow

1. Developer commits to `main` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. Jekyll builds the site in `production` environment
4. Generated HTML/CSS/JS is pushed to `gh-pages` branch
5. GitHub Pages serves the `gh-pages` branch

**Never manually edit the `gh-pages` branch** - it is auto-generated.

## Content Management

### Adding Publications

Edit `_bibliography/papers.bib` and add BibTeX entries. Publications auto-sort by year (newest first) unless configured otherwise in `_config.yml`.

Supported custom BibTeX fields:
- `abstract` - Show abstract button
- `pdf` - Link to PDF (place in `assets/pdf/`)
- `code` - Link to code repository
- `arxiv` - arXiv identifier (auto-generates link)
- `slides`, `poster`, `supp` - Supplementary materials
- `bibtex_show` - Show BibTeX button

### Adding Blog Posts

Create files in `_posts/` with naming convention: `YYYY-MM-DD-title.md`

Front matter example:
```yaml
---
layout: post
title: My Post Title
date: 2024-01-15
description: Brief description
tags: [tag1, tag2]
categories: [category]
---
```

### Adding Projects

Create Markdown files in `_projects/` directory. Projects display on a responsive grid.

### Modifying CV

Two options (JSON takes precedence):
1. Edit `assets/json/resume.json` (JSON Resume standard format)
2. Edit `_data/cv.yml` (used as fallback)

Delete the JSON file to use the YAML version.

### Updating Personal Information

- `_config.yml` - Name, title, description, URL, contact note
- `_data/socials.yml` - Social media links
- `_pages/about.md` - Main about page content

## Styling and Theming

### Theme Colors

Edit `_sass/_themes.scss` and change `--global-theme-color` variable. Stock color options are in `_sass/_variables.scss`.

### Layout Customization

- `_sass/_base.scss` - Base styles, fonts, spacing
- `_sass/_layout.scss` - Overall page layout
- `_sass/_cv.scss` - CV page specific styles
- `_sass/_distill.scss` - Distill-style blog posts

Use browser dev tools to inspect elements before modifying SASS.

## Important Files Reference

- `_config.yml` - All site configuration
- `Gemfile` - Ruby dependencies (Jekyll plugins)
- `package.json` - Node dependencies (Prettier)
- `_pages/` - Main website pages
- `_layouts/` - Page templates
- `_includes/` - Reusable components
- `bin/update_scholar_citations.py` - Auto-update citation counts from Google Scholar

## Jekyll Plugins in Use

- `jekyll-scholar` - Bibliography/citation management
- `jekyll-archives-v2` - Archive pages for posts/collections
- `jekyll-imagemagick` - Responsive image generation
- `jekyll-jupyter-notebook` - Jupyter notebook support
- `jekyll-paginate-v2` - Pagination
- `jekyll-feed` - RSS/Atom feed generation
- `jekyll-minifier` - HTML/CSS minification
- `jekyll-terser` - JavaScript minification

## Common Gotchas

1. **baseurl vs url**: For personal/org pages (`username.github.io`), set `url` to your GitHub Pages URL and leave `baseurl` empty. For project pages, set `baseurl` to `/<repo-name>/`.

2. **Collections must be defined**: If adding new collections, declare them in `_config.yml` under the `collections:` section and create corresponding landing pages.

3. **Image optimization**: ImageMagick must be installed locally for responsive images. The Docker image includes this by default.

4. **BibTeX author matching**: The `scholar:last_name` and `scholar:first_name` in `_config.yml` are used to identify and underline your name in publications. Keys in `_data/coauthors.yml` must be lowercase without accents.

5. **GitHub Actions permissions**: The repository must have "Read and write permissions" for GitHub Actions (Settings → Actions → General → Workflow permissions).

6. **Scheduled posts**: To enable scheduled publishing, rename `.github/workflows/schedule-posts.txt` to `.github/workflows/schedule-posts.yml` and use the `_scheduled/` directory for future-dated posts.
