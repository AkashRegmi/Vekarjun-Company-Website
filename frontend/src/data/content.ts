export const company = {
  name: 'VEKARJUN ',
  subtitle: 'IT SOLUTION AND CONSULTING',
  tagline: 'Technology Consulting & AI Solutions',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: '20+', label: 'Projects delivered' },
  { value: '10+', label: 'Businesses supported' },
  { value: '5+', label: 'Core technology services' },
  { value: '99%', label: 'Client satisfaction' },
];

export const trustLabels = [
  'Web Platforms',
  'AI Systems',
  'Cloud Infrastructure',
  'E-commerce',
  'Automation',
  'Data & Analytics',
];

export type Service = {
  index: string;
  title: string;
  summary: string;
  items: string[];
  cta: string;
  icon: string;
};

export const services: Service[] = [
  {
    index: '01',
    title: 'Web Development',
    summary: 'Fast, modern, scalable websites and web applications built to convert visitors into customers.',
    items: ['Business Websites', 'E-commerce', 'Web Applications', 'Custom Dashboards', 'Landing Pages', 'CMS Solutions'],
    cta: 'Explore Web Development',
    icon: 'Code2',
  },
  {
    index: '02',
    title: 'AI & Agentic AI',
    summary: 'Intelligent systems that understand context, reason through problems, and execute business tasks.',
    items: ['AI Agents', 'AI Assistants', 'AI Chatbots', 'Workflow Automation', 'RAG Systems', 'LLM Integrations'],
    cta: 'Explore AI Solutions',
    icon: 'Sparkles',
  },
  {
    index: '03',
    title: 'Digital Marketing',
    summary: 'Attract the right audience and turn traffic into qualified, paying customers.',
    items: ['Social Media Marketing', 'Content Marketing', 'Paid Advertising', 'Conversion Optimization', 'Marketing Strategy'],
    cta: 'Explore Digital Marketing',
    icon: 'Megaphone',
  },
  {
    index: '04',
    title: 'SEO',
    summary: 'Sustainable organic visibility built on technical foundations and long-term strategy.',
    items: ['Technical SEO', 'On-page SEO', 'Keyword Strategy', 'Local SEO', 'Content SEO', 'SEO Audits'],
    cta: 'Explore SEO',
    icon: 'TrendingUp',
  },
  {
    index: '05',
    title: 'Business Automation',
    summary: 'Remove repetitive manual work and give your team back the hours they lose to it.',
    items: ['Workflow Automation', 'CRM Automation', 'Email Automation', 'API Integrations', 'Internal Business Tools'],
    cta: 'Explore Automation',
    icon: 'Workflow',
  },
  {
    index: '06',
    title: 'Data & Analytics',
    summary: 'Turn scattered business data into dashboards and decisions your team can act on.',
    items: ['Business Dashboards', 'Data Analysis', 'Reporting', 'Predictive Analytics', 'Machine Learning', 'Data Visualization'],
    cta: 'Explore Data Solutions',
    icon: 'BarChart3',
  },
];

export const aiWorkflow = [
  'Lead arrives',
  'AI qualifies the lead',
  'AI updates the CRM',
  'AI sends a personalized response',
  'Sales team receives a notification',
  'Customer enters the sales pipeline',
];

export const process = [
  {
    index: '01',
    title: 'Discover',
    description: 'We understand your business, your challenges, your customers, and what success looks like for you.',
  },
  {
    index: '02',
    title: 'Strategize',
    description: 'We define the right technology and growth strategy for where your business is headed next.',
  },
  {
    index: '03',
    title: 'Build',
    description: 'Our team designs and develops the solution, keeping you informed at every milestone.',
  },
  {
    index: '04',
    title: 'Grow',
    description: 'We continuously optimize, improve, and scale the system as your business grows.',
  },
];

export const benefits = [
  {
    title: 'Business First',
    description: 'We solve business problems, not just technical ones. Every recommendation starts with your goals.',
    icon: 'Target',
  },
  {
    title: 'Modern Technology',
    description: 'We build with current web, cloud, AI, and automation technology, not aging frameworks.',
    icon: 'Cpu',
  },
  {
    title: 'Scalable Solutions',
    description: 'What we build for you today is architected to grow with your business tomorrow.',
    icon: 'TrendingUp',
  },
  {
    title: 'Transparent Process',
    description: 'Clear communication, defined milestones, and deliverables you can see and understand.',
    icon: 'Eye',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We support your technology beyond launch day, not just until the invoice is paid.',
    icon: 'Handshake',
  },
  {
    title: 'Measurable Results',
    description: 'Technology should create measurable business value. We track it and show you.',
    icon: 'LineChart',
  },
];

export const industries = [
  { name: 'E-commerce', description: 'Storefronts, checkout flows, and growth systems that sell.', icon: 'ShoppingCart' },
  { name: 'Healthcare', description: 'Secure, compliant platforms built around patient trust.', icon: 'HeartPulse' },
  { name: 'Education', description: 'Learning platforms and tools built for engagement.', icon: 'GraduationCap' },
  { name: 'Finance', description: 'Reliable, secure systems for financial services.', icon: 'Landmark' },
  { name: 'Real Estate', description: 'Listing platforms and lead systems that convert.', icon: 'Building2' },
  { name: 'Hospitality', description: 'Booking and guest experience technology.', icon: 'UtensilsCrossed' },
  { name: 'Professional Services', description: 'Client portals and operational tooling.', icon: 'Briefcase' },
  { name: 'Startups', description: 'MVPs and infrastructure built to move fast.', icon: 'Rocket' },
];

export const techStack = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Python', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  AI: ['OpenAI', 'LLMs', 'RAG', 'AI Agents', 'Vector Databases'],
  Cloud: ['AWS', 'Docker', 'Cloud Platforms', 'CI/CD'],
  Marketing: ['Google Analytics', 'Search Console', 'SEO Tools', 'Marketing Automation'],
};

export const articles = [
  {
    slug: 'ai-agents-business-automation',
    category: 'AI',
    title: 'How AI Agents Are Changing Business Automation',
    description: 'A practical look at where agentic AI creates real operational value today, and where it still needs a human in the loop.',
    readingTime: '5 min read',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Abstract illustration representing artificial intelligence and connected data',
    sections: [
      {
        heading: 'From fixed automation to goal-oriented systems',
        paragraphs: [
          'Traditional automation is strongest when every step is known in advance. It can move information between systems, apply consistent rules, and repeat a predictable process reliably. It becomes brittle, however, when requests arrive in different forms or an unexpected exception requires someone to interpret context.',
          'An AI agent adds a layer of interpretation and decision-making. Given a goal, it can gather information, choose from a set of approved tools, and determine what to do next. That does not make it an independent employee: it is a probabilistic system that needs clear instructions, constrained access, and supervision appropriate to the task.',
          'The most useful mental model is a capable assistant operating inside a carefully defined workflow. The business still sets the objective and the rules. The agent handles selected steps, explains what it did, and hands off work when it reaches a boundary or lacks enough information.',
        ],
      },
      {
        heading: 'Where agents can create practical value',
        paragraphs: [
          'Look first for work that is frequent, time-consuming, and bounded. An agent might classify incoming service requests, collect relevant details from approved knowledge sources, draft a response for a staff member to review, or prepare a summary before a team meeting. These tasks involve language and context, but they can still have a clear definition of success.',
          'Agents can also help coordinate multi-step work. For example, a system could check whether a request is complete, look up an order status, prepare the next action, and route an exception to the right person. Each tool call should be limited to what the task needs, and actions that change customer or financial records should have stronger controls than read-only research.',
          'Not every slow process is a good candidate. If a workflow is poorly understood, changes constantly, or depends on nuanced relationships that are not documented, adding an agent may make the process harder to manage. Simplify and document the work first; automation amplifies the quality of the process it is given.',
        ],
      },
      {
        heading: 'Designing a safe human-in-the-loop workflow',
        paragraphs: [
          'Start by mapping the current process from request to outcome. Identify the decisions people make, the information they rely on, common exceptions, and the cost of an incorrect action. Then choose a narrow first use case and decide which steps the agent may complete, which require approval, and which always belong to a person.',
          'Give the system access only to the data and tools it needs. Use read-only permissions where possible, validate inputs and outputs, and require explicit confirmation before sending messages or making changes with significant consequences. Keep a record of the source information, proposed actions, approvals, and final result so that staff can investigate issues.',
          'Human review should be meaningful rather than ceremonial. Show reviewers the evidence behind a suggestion, make it easy to correct or reject, and provide a clear handoff when confidence is low or information conflicts. Feedback from these reviews can also reveal missing instructions, weak data, or workflows that should not be automated.',
        ],
      },
      {
        heading: 'Pilot, measure, and improve',
        paragraphs: [
          'Establish a baseline before introducing the agent. Depending on the task, useful measures may include time to completion, rework, error rate, escalation frequency, customer satisfaction, and the amount of staff attention required. Compare like with like and include the time spent reviewing and maintaining the system.',
          'Run a limited pilot with real but appropriately controlled work. Review a sample of completed tasks, test known edge cases, and document failures as carefully as successes. Do not expand access simply because a demonstration looked convincing; reliability needs to hold across normal variation and less common cases.',
          'AI agents can make operations more responsive when they solve a specific problem within clear boundaries. The durable advantage comes from pairing the technology with sound workflow design, accountable owners, informed staff, and a plan for ongoing monitoring—not from removing people from every decision.',
        ],
      },
    ],
  },
  {
    slug: 'technical-seo-2026',
    category: 'SEO',
    title: 'Technical SEO: What Businesses Need to Know in 2026',
    description: 'The technical foundations that determine whether your content can rank at all, before strategy even enters the picture.',
    readingTime: '5 min read',
    date: 'Jul 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab8277781?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Laptop displaying charts and analytics on a desk',
    sections: [
      {
        heading: 'What technical SEO does—and does not do',
        paragraphs: [
          'Technical SEO helps search engines discover, crawl, render, and understand the useful pages on a website. It covers the foundations that allow content to be considered for search, including working URLs, accessible page resources, clear site structure, and signals that identify the preferred version of a page.',
          'A technically sound site is not a guarantee of rankings. Search visibility also depends on whether a page satisfies a searcher’s need, how useful and trustworthy the content is, and how it compares with other available results. Technical work removes barriers; it does not replace a sound content and business strategy.',
          'That distinction helps teams prioritize. Rather than treating every audit warning as urgent, focus on issues that prevent important pages from being found or used. A minor recommendation from an automated tool may matter less than a small number of broken pages that customers and search engines actually need.',
        ],
      },
      {
        heading: 'Make crawling and indexing predictable',
        paragraphs: [
          'Begin with the pages that matter most to the business. Check whether they return the expected status code, can be reached through internal links, and are not blocked by robots.txt or a noindex directive. Review indexing reports for patterns, then inspect individual URLs to understand what a crawler can access and render.',
          'An XML sitemap is a helpful discovery aid, especially on a large site, but it is not a substitute for navigation. Include the canonical URLs you want indexed and keep the sitemap current. Important pages should also be linked from relevant sections of the site so that visitors and crawlers can find them naturally.',
          'When a page is removed or its URL changes, decide what should happen next. Redirect a retired URL to the closest useful replacement when one exists; otherwise return an appropriate not-found or gone response. Avoid sending every old URL to the home page, which can confuse visitors and obscure the real destination.',
        ],
      },
      {
        heading: 'Control duplication and clarify page relationships',
        paragraphs: [
          'Several URLs can sometimes show substantially the same content—for example, because of tracking parameters, alternate paths, or inconsistent trailing slashes. Choose a preferred URL format and use it consistently in navigation, internal links, and sitemaps. Canonical tags can help signal which version should represent a set of similar pages.',
          'Canonical tags are hints, not a way to force unrelated pages together. Ensure the chosen destination is accessible and genuinely equivalent, and avoid conflicting signals such as a canonical pointing one way while redirects and internal links point another. For pages that should remain separate, make their purpose and content distinct.',
          'A clear information architecture also matters. Group related pages, use descriptive navigation, and link between content where it helps people continue their research. This gives search engines useful context while making the site easier for actual customers to understand.',
        ],
      },
      {
        heading: 'Improve experience, structured data, and monitoring',
        paragraphs: [
          'Performance and mobile usability are part of the technical foundation because slow or awkward pages frustrate users. Optimize large images, limit unnecessary scripts, and test important journeys on real device sizes. Use field performance data where available and prioritize changes that improve the experience rather than chasing a single lab score.',
          'Structured data can describe eligible visible information such as an organization, product, or article. Keep it accurate and aligned with the content users can see, then validate it with appropriate testing tools. Markup does not guarantee a special search appearance, and adding unsupported or misleading fields can undermine trust.',
          'Make technical SEO an ongoing routine. Record a baseline, monitor crawl and indexing reports, check important templates after releases, and watch for unexpected status-code or canonical changes. Combine those checks with organic landing-page performance and user feedback. A healthy technical base gives valuable content a fair chance to be discovered and used.',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-for-business',
    category: 'Web Development',
    title: 'When Should Your Business Build Custom Software?',
    description: 'A framework for deciding between off-the-shelf tools and custom-built systems, with real cost trade-offs.',
    readingTime: '5 min read',
    date: 'Jul 2026',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'A team collaborating around a laptop in a bright workspace',
    sections: [
      {
        heading: 'Start with the business problem, not the build',
        paragraphs: [
          'Custom software is worth considering when existing products cannot support an important business process without costly workarounds. That may happen when a workflow is central to how the organization serves customers, when several tools do not share information reliably, or when the business needs a capability that standard products do not provide.',
          'Before discussing features, describe the problem in plain language. Who experiences it? How often does it occur? What does the current process cost in time, errors, delays, or missed opportunities? Agree on what should improve and how the team will recognize success. A measurable problem statement keeps a project focused when new feature requests inevitably appear.',
          'Also check whether the real issue is a process or ownership problem. If teams follow different steps or data is incomplete, software may simply make inconsistent work happen faster. Document the current workflow, remove unnecessary steps, and establish shared definitions before choosing a technical solution.',
        ],
      },
      {
        heading: 'Compare the full lifecycle cost',
        paragraphs: [
          'A fair comparison includes more than the initial price. An off-the-shelf subscription may bundle hosting, support, upgrades, and security work, while still requiring configuration, training, and integration. Custom software involves discovery, design, development, testing, and deployment, followed by ongoing maintenance and operational responsibility.',
          'Plan for the full life of the system: cloud or hosting costs, backups, monitoring, security updates, support requests, compatibility changes, and future improvements. Decide who will own the product roadmap and who can respond if a critical feature fails. If the organization cannot support the system after launch, that risk belongs in the decision.',
          'Consider flexibility and dependency too. A vendor product can change its pricing or features; custom software can create reliance on a particular codebase, developer, or technology. Clear documentation, automated tests, managed credentials, and a maintainable architecture help reduce the risk of being unable to change course later.',
        ],
      },
      {
        heading: 'Consider configuration and hybrid options',
        paragraphs: [
          'The choice is not always between buying an unchanged product and building everything from scratch. Many business needs can be met by configuring an established platform, adding a small integration, or building a focused application around systems the company already uses.',
          'Keep commodity capabilities in proven products when they are not a differentiator. For example, a business may rely on established services for email, payments, or accounting, while investing in a custom workflow that connects those tools in a way that better serves its customers. This can narrow the scope and reduce the amount of software the business must maintain.',
          'Check the practical fit before selecting a vendor: data export options, integration support, access controls, compliance needs, service availability, and the process for leaving the platform. A product that solves the immediate requirement but traps essential data or cannot connect to other systems may create a more expensive problem later.',
        ],
      },
      {
        heading: 'Reduce risk with a staged first release',
        paragraphs: [
          'When custom development is justified, avoid trying to solve every related problem in the first release. Identify the smallest end-to-end workflow that can test the most important assumptions and deliver a useful outcome. A prototype can answer questions about usability or technical feasibility before the team commits to a larger implementation.',
          'For a production release, define acceptance criteria, data migration needs, security expectations, and a plan for user training and support. Test realistic cases—including failures and unusual inputs—and decide how the team can roll back or operate manually if the new system is unavailable.',
          'After launch, compare actual results with the original baseline. Ask users where the system saves effort and where it adds friction, monitor reliability, and prioritize changes based on evidence. Custom software is a good investment when the sustained business benefits justify its total cost and the organization is prepared to own it.',
        ],
      },
    ],
  },
];

export const contactInfo = {
  email: 'info@vekarjun.com',
  phone: '9818962979',
  location: 'Kathmandu, Nepla',
  hours: 'Mon–Fri, 9:00 AM – 6:00 PM',
};

export const serviceOptions = [
  'Web Development',
  'AI & Agentic AI',
  'Digital Marketing',
  'SEO',
  'Automation',
  'Data & Analytics',
  'IT Consulting',
  'Other',
];

export const budgetOptions = [
  'Under $1,000',
  '$1,000–$5,000',
  '$5,000–$10,000',
  '$10,000+',
  'Not sure yet',
];
