import type { Profile } from '@/types/profile'

/** Single source of truth for all personal content shown on the site (from resume & cover letter). */
export const profile: Profile = {
  name: 'Syed Anas Ahmed',
  role: 'AI Engineer',
  location: 'Karachi, Pakistan',
  email: 'anas.ahd85@gmail.com',
  headline: 'Building practical AI that solves real-world problems.',
  headlineHighlights: ['practical', 'real-world'],
  summary:
    'AI Engineer and Computer Science (Artificial Intelligence) graduate from NED University of Engineering & Technology, with hands-on experience in generative AI, large language models and AI-powered application development. I am particularly interested in applied AI, agentic systems, intelligent automation and turning AI into useful, scalable products that address real business needs.',
  availability: 'Open to AI engineering opportunities',
  socials: [
    { label: 'GitHub', href: 'https://github.com/SyedAnasAhmed2004' },
    // TODO: replace with your LinkedIn profile URL
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:anas.ahd85@gmail.com' },
  ],
  stats: [
    { value: '3.58', label: 'CGPA · BS Computer Science (AI)' },
    { value: '3rd', label: 'Runner-up, Koderz Kombat · 200+ teams' },
    { value: '3', label: 'LLM providers integrated in production' },
  ],
  skills: [
    {
      category: 'LLMs & Generative AI',
      items: [
        'OpenAI',
        'Google Gemini',
        'DeepSeek',
        'Fine-tuning',
        'LoRA / QLoRA',
        'Hugging Face',
        'LangChain',
        'LangGraph',
        'Conversational AI',
      ],
    },
    {
      category: 'Machine & Deep Learning',
      items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'LightGBM', 'SHAP', 'LIME'],
    },
    {
      category: 'Web Development',
      items: ['React', 'FastAPI', 'Django', 'Flask', 'Streamlit'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'Milvus'],
    },
    {
      category: 'Data Analysis & Visualization',
      items: ['Pandas', 'Matplotlib', 'Seaborn', 'MS Office'],
    },
    {
      category: 'Languages & Tools',
      items: ['Python', 'C/C++', 'Java', 'Prolog', 'Git', 'GitHub', 'GitLab'],
    },
  ],
  experience: [
    {
      role: 'AI Graduate Trainee Officer',
      company: 'EOcean',
      period: 'Mar 2025 — Sep 2025',
      summary: 'Built and shipped AI-powered products end to end in Karachi, Sindh.',
      highlights: [
        'Fine-tuned OpenAI models on their platform and explored LoRA and QLoRA techniques for domain adaptation.',
        'Engineered and deployed end-to-end products with React frontends and Django/Flask backends, implementing multi-LLM integrations (OpenAI, Gemini, DeepSeek) and batching pipelines for optimized performance.',
        'Built a speech-to-speech conversational chatbot leveraging NLP tokenization and real-time communication workflows.',
      ],
    },
  ],
  projects: [
    {
      title: 'Real-Time Market Intelligence System',
      summary:
        'Final year project: an AI-powered strategic intelligence platform that automates competitive monitoring, market-signal detection and source-cited insight generation for real-time decision-making.',
      tags: ['LLMs', 'Agents', 'Final Year Project'],
    },
    {
      title: 'Chess with AI',
      summary:
        'A feature-rich chess application built on core data structures and algorithms, with a Minimax + Alpha-Beta pruning opponent and full rule support including castling, en passant and promotion.',
      tags: ['Algorithms', 'DSA', 'Game AI'],
    },
    {
      title: 'AI-Powered Urban Traffic Congestion System',
      summary:
        'Traffic congestion prediction with an LGBM classifier on historical traffic and weather data, enriched with real-time meteorological and geospatial APIs and explained with LIME and SHAP.',
      tags: ['Machine Learning', 'Geospatial', 'Explainable AI'],
    },
  ],
  education: [
    {
      institution: 'NED University of Engineering & Technology',
      credential: 'BS Computer Science (Artificial Intelligence) · CGPA 3.58',
      period: 'Oct 2022 — Jul 2026',
      details: [
        'Secured 3rd Runner-Up in the Koderz Kombat coding competition among 200+ teams.',
        'Relevant courses: Design and Analysis of Algorithms, System Analysis and Design, Machine Learning, Deep Learning.',
      ],
    },
    {
      institution: 'Adamjee Govt. Science College',
      credential: 'HSSC, Pre-Engineering · A-1 Grade',
      period: 'Jun 2020 — Jul 2022',
      details: ['Strong academic performance in Mathematics and Science.'],
    },
    {
      institution: 'Happy Home High School',
      credential: 'SSC, Science · A-One Grade',
      period: 'Apr 2008 — May 2020',
      details: ['Strong academic performance in Mathematics and Computer.'],
    },
  ],
}
