#!/bin/bash

# Mitra Deployment Script
# Usage: ./deploy.sh [environment]
# Environment: dev (default) | prod

set -e

ENVIRONMENT=${1:-dev}
PROJECT_NAME="mitra-mental-health"

echo "🚀 Starting Mitra deployment..."
echo "Environment: $ENVIRONMENT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_success "Prerequisites check completed"

# Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Run type checking
print_status "Running type check..."
npm run typecheck
print_success "Type check passed"

# Build the project
print_status "Building project..."
npm run build:client
print_success "Build completed"

# Deploy based on environment
if [ "$ENVIRONMENT" = "prod" ]; then
    print_status "Deploying to production..."
    vercel --prod --yes
    print_success "Production deployment completed!"
    
    # Get deployment URL
    DEPLOYMENT_URL=$(vercel ls --scope=personal | grep $PROJECT_NAME | head -1 | awk '{print $2}')
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        print_success "🌐 Production URL: https://$DEPLOYMENT_URL"
    fi
else
    print_status "Deploying to preview..."
    vercel --yes
    print_success "Preview deployment completed!"
    
    # Get preview URL
    DEPLOYMENT_URL=$(vercel ls --scope=personal | grep $PROJECT_NAME | head -1 | awk '{print $2}')
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        print_success "🌐 Preview URL: https://$DEPLOYMENT_URL"
    fi
fi

# Post-deployment checks
print_status "Running post-deployment checks..."

if [ ! -z "$DEPLOYMENT_URL" ]; then
    # Check if site is accessible
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEPLOYMENT_URL" || echo "000")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        print_success "✅ Site is accessible"
    else
        print_warning "⚠️  Site returned HTTP $HTTP_STATUS"
    fi
    
    # Check API endpoint
    API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEPLOYMENT_URL/api/ping" || echo "000")
    
    if [ "$API_STATUS" = "200" ]; then
        print_success "✅ API endpoint is working"
    else
        print_warning "⚠️  API endpoint returned HTTP $API_STATUS"
    fi
else
    print_warning "Could not determine deployment URL"
fi

print_success "🎉 Deployment process completed!"

# Show next steps
echo ""
echo "📋 Next Steps:"
echo "1. Test all routes and functionality"
echo "2. Set up environment variables if needed"
echo "3. Configure custom domain (optional)"
echo "4. Set up monitoring and analytics"
echo ""
echo "📚 For more details, check DEPLOYMENT.md"
