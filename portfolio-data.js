/* Central editable content. Replace examples with verified personal information.
   Contact uses an email-client draft, never a simulated server submission.
   Credentials render only when verified is explicitly true. */
window.PORTFOLIO = {
  name: 'Sarlinson Christian',
  email: 'sarlinson92@yahoo.com',
  linkedin: 'https://linkedin.com/in/sarlinson',
  location: 'London, UK',
  calendar: '',
  resumeUrl: 'resume.pdf',
  showInsights: false,
  pillars: [
    { icon: '♡', title: 'Customer Advocacy', text: 'Champion customer needs and build long-term trust.' },
    { icon: '◎', title: 'Product Adoption', text: 'Help customers realize value faster through onboarding and enablement.' },
    { icon: '◇', title: 'Retention', text: 'Identify risk early and create proactive success strategies.' },
    { icon: '↗', title: 'Expansion', text: 'Grow customer value through outcomes, not pushy selling.' }
  ],
  aiProjects: [
    {
      title: 'DecodeDx — AI-Driven Health Platform',
      category: 'AI Platform & Automation',
      description: 'Built and launched DecodeDx, an AI-powered SaaS health platform by translating complex clinical and user requirements into automated workflows, reducing manual effort by 25% and improving operational efficiency.',
      metric: '-25% Manual Effort',
      tags: ['SaaS', 'Workflow Automation', 'HealthTech', 'Clinical Workflows']
    },
    {
      title: 'DAVE Machinery — Equipment Sourcing Platform',
      category: 'B2B Sourcing & Transaction Automation',
      description: 'Engineered heavy equipment sourcing and buyer match workflows for UK and global buyers, automating machinery intake verification, structured customer inquiries, and deal-stage handoffs.',
      metric: 'Automated Routing',
      tags: ['Inventory Matching', 'B2B Sourcing', 'Buyer Workflows', 'CRM Sync']
    },
    {
      title: 'Proactive Health Scoring & Churn Detection',
      category: 'Customer Intelligence & Automation',
      description: 'Built automated multi-signal health score telemetry tracking feature adoption decline, support ticket velocity, and champion role changes to alert CSMs 30 days prior to contract renewal.',
      metric: '30-Day Churn Warning',
      tags: ['Health Scores', 'Early Warning System', 'Telemetry', 'Slack Alerts']
    },
    {
      title: 'Automated QBR & Value Milestone Synthesis',
      category: 'Reporting & Enablement Automation',
      description: 'Automated data synthesis pipeline aggregating account telemetry, license utilization, and business outcomes into executive-ready Quarterly Business Review decks.',
      metric: '4x Faster QBR Prep',
      tags: ['QBR Automation', 'Data Synthesis', 'Account Enablement', 'ROI Reporting']
    }
  ],
  roles: [
    {
      title: 'Senior Customer Success Manager',
      company: 'SeekThem',
      dates: 'Jun 2025 – Jun 2026',
      summary: 'Executive renewal strategy, account expansion, and revenue retention.',
      bullets: [
        'Secured $450K in contract renewals by developing executive presentations that demonstrated customer outcomes and reframed renewal discussions around business value.',
        'Managed customer communication and renewal planning, working with senior stakeholders to secure renewals worth $200K in recurring revenue while contributing to 108% NRR.',
        'Accomplished 118% NRR across 25+ accounts, $2.3M ARR enterprise portfolio by identifying customer requirements and coordinating relevant product expansion opportunities.'
      ],
      metrics: ['25+ accounts', '$2.3M ARR portfolio', '118% NRR', '$450K renewals']
    },
    {
      title: 'Senior Product Deployment Analyst',
      company: 'Meditab Software',
      dates: 'Aug 2019 – Jun 2025',
      summary: 'Enterprise portfolio delivery, structured onboarding, and QBR execution.',
      bullets: [
        'Owned delivery across a $3.8M, 15+ accounts mid-market portfolio, balancing high-touch customer engagement with scalable processes while maintaining 94% gross retention.',
        'Delivered 92% product adoption within 60 days across 120+ new clients by replacing ad hoc onboarding with a structured implementation and training programme.',
        'Reduced customer time-to-value by 22% by redesigning onboarding workflows and launching a self-service resource hub to reduce manual customer support.',
        'Achieved 96% QBR completion across the portfolio, creating a consistent review process that surfaced customer requirements and generated $900K in expansion pipeline.'
      ],
      metrics: ['$3.8M portfolio', '94% gross retention', '92% adoption in 60 days', '120+ new clients', '96% QBR completion']
    },
    {
      title: 'Interface Analyst',
      company: 'Meditab Software',
      dates: 'Jan 2018 – Aug 2019',
      summary: 'Customer data analysis, risk mitigation, and account activity monitoring.',
      bullets: [
        'Analysed customer data and account activity to identify emerging risks and service issues, surfacing actionable insights for stakeholders to prioritise interventions and protect customer value.'
      ],
      metrics: []
    }
  ],
  framework: [
    { title: 'Understand', text: 'Listen first. Map goals, challenges, stakeholders, and desired outcomes.' },
    { title: 'Onboard', text: 'Create a clear path to first value with shared milestones and ownership.' },
    { title: 'Adopt', text: 'Build successful habits through meaningful usage and targeted enablement.' },
    { title: 'Grow', text: 'Connect evolving needs to opportunities that create genuine customer value.' },
    { title: 'Advocate', text: 'Turn successful customers into long-term partners and advocates.' }
  ],
  cases: [
    {
      category: 'AI PLATFORM & AUTOMATION',
      title: 'Built and launched DecodeDx to eliminate operational friction.',
      subtitle: 'AI-Driven Health Platform - DecodeDx',
      visual: 'onboarding',
      metric: '-25%',
      metricLabel: 'manual effort',
      secondary: 'Improved operational efficiency',
      challenge: 'Translating complex clinical workflows and user requirements into scalable automated processes without sacrificing usability.',
      context: 'AI-powered SaaS health platform DecodeDx translating user requirements into automated workflows.',
      strategy: 'Translate user requirements into automated workflows to streamline operations and eliminate manual friction.',
      actions: [
        'Analyzed user requirements and mapped key operational and clinical workflows.',
        'Engineered automated workflows directly within the AI-powered SaaS platform.',
        'Launched DecodeDx with end-to-end testing and stakeholder validation.',
        'Measured workflow efficiency and refined automated handoffs.'
      ],
      collaboration: 'Partnered across product, engineering, and user groups to ensure requirements aligned with operational outcomes.',
      result: 'Illustrative outcome: Built and launched DecodeDX, an AI-powered SaaS platform by translating user requirements into automated workflows, reducing manual effort by 25% and improving operational efficiency.',
      takeaway: 'Meaningful automation starts with listening to users and mapping workflows before building technology.'
    },
    {
      category: 'RETENTION & RELATIONSHIPS',
      title: 'Secured $450K renewals by demonstrating customer outcomes.',
      subtitle: 'Demonstrating Value to Protect and Grow Accounts',
      visual: 'retention',
      metric: '95%',
      metricLabel: 'retention rate',
      secondary: '-11% churn reduction',
      challenge: 'Maintaining high gross retention across enterprise accounts and reframing renewal conversations around realized business value.',
      context: 'Enterprise accounts and revenue growth across a $2.2M portfolio.',
      strategy: 'Develop executive presentations that demonstrate customer outcomes and reframe renewal discussions around business value.',
      actions: [
        'Audited account activity and customer health metrics to identify early risks.',
        'Constructed executive-ready presentations highlighting delivered business value.',
        'Engaged senior stakeholders early to align on future milestones and shared ROI.',
        'Structured renewal agreements tied to long-term success plans.'
      ],
      collaboration: 'Coordinated with senior customer stakeholders, executive leadership, and sales to secure renewals.',
      result: 'Illustrative outcome: Secured $450K in contract renewals and achieved 108% NRR while maintaining 95% retention rate and reducing churn by 11%.',
      takeaway: 'Executive renewals succeed when discussions center on customer value and verified outcomes rather than contractual terms.'
    },
    {
      category: 'ONBOARDING & SCALE',
      title: 'Delivered 92% product adoption within 60 days.',
      subtitle: 'Structured Implementation & Scalable Enablement',
      visual: 'adoption',
      metric: '92%',
      metricLabel: 'product adoption',
      secondary: '22% faster time-to-value',
      challenge: 'Ad hoc customer onboarding led to inconsistent adoption and prolonged time-to-value across a high volume of new accounts.',
      context: '120+ new clients across a mid-market portfolio requiring rapid, scalable onboarding.',
      strategy: 'Replace ad hoc onboarding with a structured implementation and training programme and a self-service resource hub.',
      actions: [
        'Designed standardized onboarding milestones and structured implementation timelines.',
        'Launched a comprehensive self-service resource hub to reduce manual customer support.',
        'Conducted tailored user and administrator training sessions within the first 60 days.',
        'Tracked adoption milestones and intervened proactively at early signs of drop-off.'
      ],
      collaboration: 'Worked closely with product deployment teams and client champions to deliver smooth handoffs.',
      result: 'Illustrative outcome: Delivered 92% product adoption within 60 days across 120+ new clients and reduced customer time-to-value by 22%.',
      takeaway: 'Scaling onboarding requires blending structured processes with self-service resources that empower users immediately.'
    }
  ],
  metrics: [
    { value: 95, suffix: '%', label: 'Customer retention', caption: 'Managed portfolio retention rate', points: '0,32 20,26 40,28 60,18 80,20 100,10 120,5' },
    { value: 92, suffix: '%', label: 'Product adoption', caption: 'Within 60 days across 120+ clients', points: '0,34 20,30 40,23 60,25 80,13 100,16 120,3' },
    { value: 2.3, prefix: '$', suffix: 'M', decimals: 1, label: 'Portfolio ARR', caption: 'Enterprise portfolio managed', points: '0,32 20,31 40,24 60,19 80,17 100,9 120,6' },
    { value: 118, suffix: '%', label: 'Net Retention Rate', caption: 'NRR across 25+ accounts', points: '0,25 20,21 40,24 60,13 80,15 100,8 120,4' },
    { value: 120, suffix: '+', label: 'New clients onboarded', caption: 'Structured implementation', points: '0,35 20,29 40,29 60,21 80,15 100,12 120,3' },
    { value: 22, suffix: '%', label: 'Faster time-to-value', caption: 'Redesigned onboarding workflows', points: '0,5 20,12 40,10 60,20 80,23 100,29 120,34' }
  ],
  skills: [
    {
      icon: '♡',
      title: 'Customer Success',
      description: 'Enterprise account management and lifecycle strategy.',
      items: [
        'Enterprise Account Management',
        'Customer Onboarding',
        'Renewal',
        'Expansion',
        'Quarterly Business Reviews (QBR)',
        'Customer Health Score',
        'Churn Mitigation',
        'Stakeholder Management'
      ]
    },
    {
      icon: '◇',
      title: 'AI & Data',
      description: 'Analytics, health metrics, and workflow automation.',
      items: [
        'Health Metrics',
        'Automation',
        'Data Analysis'
      ]
    },
    {
      icon: '▥',
      title: 'Tools & Platforms',
      description: 'Enterprise CRM and customer success systems.',
      items: [
        'Salesforce',
        'HubSpot',
        'Intercom',
        'Gainsight',
        'ChurnZero',
        'SQL',
        'Jira',
        'Slack'
      ]
    }
  ],
  journey: [
    { title: 'Discover', text: 'Bring the voice of the customer into early conversations and connect needs to potential outcomes.' },
    { title: 'Evaluate', text: 'Partner with Sales to align expectations, validate fit, and define what success should look like.' },
    { title: 'Onboard', text: 'Align stakeholders, establish milestones, remove friction, and accelerate time-to-value.' },
    { title: 'Adopt', text: 'Use engagement signals and tailored enablement to build habits that deliver meaningful value.' },
    { title: 'Expand', text: 'Explore evolving goals and recommend opportunities only when they support customer outcomes.' },
    { title: 'Renew', text: 'Review demonstrated value, address remaining risks, and agree on the next chapter of partnership.' },
    { title: 'Advocate', text: 'Invite successful customers to share their experience through feedback, community, and approved stories.' }
  ],
  testimonials: [
    { quote: 'Working with Sarlinson transformed the way our team approached customer success. They consistently brought structure, empathy, and commercial thinking to every conversation.', name: 'Colleague', role: 'Product Leader · Enterprise SaaS', initials: 'PL' },
    { quote: 'Sarlinson made us feel understood, not just supported. Every conversation connected our goals to a clear next step, and every commitment was followed through.', name: 'Customer Champion', role: 'Operations Director · HealthTech', initials: 'OD' },
    { quote: 'A thoughtful partner who connects the dots between customer needs and business priorities. Sarlinson brings a proactive, collaborative approach to the team.', name: 'Executive Sponsor', role: 'VP Customer Operations · SaaS', initials: 'VP' }
  ],
  credentials: [
    { name: 'Bachelor of Business Administration', issuer: 'DY Patil University', year: 'Dec 2026', verified: true }
  ],
  insights: [
    { category: 'CUSTOMER STRATEGY', readingTime: '2 min read', date: '2026-09-13', title: 'Why Customer Success Starts Before Onboarding', excerpt: 'The first step to a successful partnership isn’t a kickoff call. It’s a shared understanding of what success looks like.', paragraphs: ['A customer arrives at onboarding with expectations already formed. Those expectations come from their buying experience, internal conversations, and the promises made along the way. A thoughtful handoff makes that context visible.', 'Start with a shared definition of success: what is the customer trying to change, who needs to be involved, and how will they recognize progress? Capture these answers in the customer’s language rather than relying on a list of purchased features.', 'Sales and Customer Success should agree on ownership, known risks, and the first meaningful milestone. Invite the customer to validate the plan instead of presenting assumptions as facts.', 'A useful first step is a short handoff brief covering desired outcomes, key stakeholders, commitments, and open questions. The goal is continuity: customers should not have to tell their story from the beginning each time they meet a new team.'] },
    { category: 'VALUE REALIZATION', readingTime: '2 min read', date: '2026-09-13', title: 'The Difference Between Product Usage and Customer Value', excerpt: 'A login is a signal. A business outcome is the story. Good success plans connect the two.', paragraphs: ['Product usage is useful, but it is not the same as customer value. A team may log in every day while still struggling to achieve the outcome that led them to buy the product.', 'Connect each adoption goal to a business goal. Instead of simply increasing dashboard views, ask whether the dashboard helps a manager make a faster or better-informed decision. That connection gives enablement a purpose.', 'Combine usage data with direct customer feedback. Ask what has changed in their workflow, where they still encounter friction, and which outcomes they can confidently attribute to the product.', 'In a business review, distinguish leading indicators such as engagement from outcomes such as time saved or work completed. Be explicit about assumptions and measurement limits. Credible evidence is more valuable than an impressive number without context.'] },
    { category: 'PROACTIVE SUCCESS', readingTime: '2 min read', date: '2026-09-13', title: 'Building a Proactive Customer Health Strategy', excerpt: 'Better health scores start with better questions—and end with a clear plan for action.', paragraphs: ['A health score should help a team decide what to do next. If a score changes but nobody knows why or what action to take, it is a reporting artifact rather than an operating tool.', 'Start with a small set of signals that reflect the customer segment and stage of their journey. Adoption progress, sponsor engagement, unresolved blockers, and confirmed value can tell different stories at different stages.', 'Treat a signal as an invitation to investigate, not a verdict. Low activity might indicate seasonal work rather than dissatisfaction. A high-volume account may still be at risk if its executive sponsor has changed.', 'Assign an owner and a response to meaningful changes. Review whether interventions helped, compare outcomes across segments, and refine the model over time. A proactive health strategy combines data with context and disciplined follow-through.'] }
  ]
};
