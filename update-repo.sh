#!/bin/bash

# Configure Git (if not already configured)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all modified files
git add .

# Commit changes
git commit -m "Update files with TypeScript fixes and code improvements

- Fix type issues in database and meal planner
- Improve component organization
- Remove unused imports and variables
- Add proper type definitions
- Fix TikTok icon component
- Update package dependencies"

# Push changes to main branch
git push origin main