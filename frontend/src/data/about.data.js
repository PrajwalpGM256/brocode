import { Terminal, Webhook, Github, Rocket } from 'lucide-react';

/**
 * About Page Data - Separated for maintainability
 */

// Feature tags shown on the About page
export const FEATURE_TAGS = ['AI-Powered', 'Auto PR Reviews', 'Gemini 2.5'];

// Webhook URL template (users replace with their own)
export const WEBHOOK_URL = 'https://your-api.com/api/webhooks/github';

// GitHub Integration Setup Steps
export const SETUP_STEPS = [
    {
        icon: Terminal,
        iconSize: 48,
        title: 'Deploy Backend',
        subtitle: 'Set up your server',
        content: `GEMINI_API_KEY=your_key
GITHUB_TOKEN=ghp_xxxx
GITHUB_WEBHOOK_SECRET=random_string`,
        color: '#f59e0b',
    },
    {
        icon: Webhook,
        iconSize: 48,
        title: 'Get Webhook URL',
        subtitle: 'Your endpoint',
        content: WEBHOOK_URL,
        copyable: true,
        color: '#8b5cf6',
    },
    {
        icon: Github,
        iconSize: 48,
        title: 'Configure GitHub',
        subtitle: 'Add webhook to repo',
        bullets: [
            'Settings → Webhooks → Add',
            'Paste your webhook URL',
            'Select: Pull Requests + Pushes',
            'Add your secret token',
        ],
        color: '#06b6d4',
    },
    {
        icon: Rocket,
        iconSize: 48,
        title: 'Launch!',
        subtitle: 'Open a PR and watch the magic',
        emoji: '🚀',
        color: '#22c55e',
    },
];

// Description text
export const ABOUT_DESCRIPTION =
    "Push code. Get instant AI reviews. BroCode connects to your GitHub and automatically reviews every Pull Request with Gemini AI.";
