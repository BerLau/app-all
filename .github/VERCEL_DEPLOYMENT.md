# Vercel Deployment Setup

This repository is configured to automatically deploy to Vercel on every push to the `main` branch and for pull requests.

## Required GitHub Secrets

To enable automatic deployment, you need to configure the following secrets in your GitHub repository settings:

1. **VERCEL_TOKEN**: Your Vercel authentication token
2. **VERCEL_ORG_ID**: Your Vercel organization ID
3. **VERCEL_PROJECT_ID**: Your Vercel project ID

### How to Get These Values

#### 1. VERCEL_TOKEN

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token value
4. Add it as a secret named `VERCEL_TOKEN` in your GitHub repository settings

#### 2. VERCEL_ORG_ID and VERCEL_PROJECT_ID

##### Option 1: Using Vercel CLI

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel link` in your project directory
3. Follow the prompts to link your project
4. Check the `.vercel/project.json` file for the IDs:
   ```json
   {
     "orgId": "team_xxxxx",
     "projectId": "prj_xxxxx"
   }
   ```

##### Option 2: From Vercel Dashboard

1. Go to your project settings on [Vercel Dashboard](https://vercel.com/dashboard)
2. The Project ID can be found in the project settings
3. The Organization ID can be found in your team/account settings

### Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the three secrets mentioned above

## Workflow Details

The GitHub Actions workflow (`vercel-deployment.yml`) performs the following steps:

1. **Code Quality**: Runs linter to ensure code quality
2. **Build**: Builds the project using `npm run build`
3. **Deploy**: 
   - **Production**: Deploys to production when pushing to `main` branch
   - **Preview**: Creates preview deployments for pull requests

## Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

- If deployment fails, check that all three secrets are correctly configured
- Ensure your Vercel token has the necessary permissions
- Verify that the project is correctly linked in Vercel
