# 🚀 Mitra Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Git** repository setup
3. **Vercel CLI** installed globally

```bash
npm install -g vercel
```

## 📋 Pre-Deployment Checklist

- [ ] All routes working locally (`npm run dev`)
- [ ] Production build successful (`npm run build:client`)
- [ ] Environment variables configured
- [ ] Static assets properly referenced
- [ ] API endpoints tested

## 🔧 Deployment Commands

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
# For first-time deployment
vercel

# For production deployment
vercel --prod

# For preview deployment
vercel --no-prod
```

### 4. Set Environment Variables
```bash
# Set environment variables via CLI
vercel env add VITE_API_BASE_URL
vercel env add NODE_ENV
vercel env add CRISIS_HOTLINE

# Or via Vercel Dashboard
# Go to Project Settings > Environment Variables
```

## 📁 Required Files for Deployment

### `vercel.json` (Already configured)
```json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/spa",
  "framework": null,
  "functions": {
    "api/[...slug].ts": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `package.json` Scripts (Already configured)
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "vite build --config vite.config.server.ts"
  }
}
```

## 🌐 Environment Variables Setup

### Required Variables
```bash
NODE_ENV=production
VITE_APP_NAME=Mitra
VITE_API_BASE_URL=https://your-domain.vercel.app/api
CRISIS_HOTLINE=9820466726
```

### Optional Variables
```bash
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
EMERGENCY_CONTACT=emergency@mitra.com
```

## 🔍 Post-Deployment Verification

### 1. Check Routes
- [ ] Landing page loads: `https://your-app.vercel.app/`
- [ ] App routes work: `https://your-app.vercel.app/app`
- [ ] API endpoints: `https://your-app.vercel.app/api/ping`

### 2. Test Navigation
- [ ] Sidebar navigation working
- [ ] Breadcrumbs generating correctly
- [ ] Protected routes redirecting properly

### 3. Verify Assets
- [ ] Favicon loading
- [ ] CSS styles applied
- [ ] Images and SVGs displaying
- [ ] Audio files accessible

## 🐛 Troubleshooting

### Common Issues

**1. 404 on Routes**
- Ensure `vercel.json` rewrites are configured
- Check SPA fallback is working

**2. API Routes Not Working**
- Verify `api/[...slug].ts` function exists
- Check serverless function configuration

**3. Build Failures**
- Run `npm run build:client` locally first
- Check for TypeScript errors
- Verify all dependencies installed

**4. Environment Variables**
- Prefix client variables with `VITE_`
- Set variables in Vercel dashboard
- Restart deployment after adding variables

### Debug Commands
```bash
# Check build locally
npm run build:client

# Test production build locally
npx serve dist/spa

# Check Vercel logs
vercel logs

# Redeploy
vercel --prod --force
```

## 📊 Performance Optimization

### Already Implemented
- ✅ Code splitting with lazy loading
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ Tree shaking

### Additional Recommendations
- Set up CDN for static assets
- Enable Vercel Analytics
- Configure caching headers
- Monitor Core Web Vitals

## 🔒 Security Considerations

- Environment variables properly secured
- API endpoints protected
- CORS configured correctly
- No sensitive data in client bundle

## 📈 Monitoring & Analytics

### Vercel Built-in
- Real User Monitoring (RUM)
- Web Vitals tracking
- Function logs and metrics

### Custom Implementation
- Error boundary reporting
- User interaction tracking
- Performance monitoring
