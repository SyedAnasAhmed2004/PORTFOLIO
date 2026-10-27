import type { Profile } from '@/types/profile'

/**
 * Single source of truth for all personal content shown on the site.
 * TODO: replace the sample experience, projects, stats and links with your real details.
 */
export const profile: Profile = {
  name: 'Sajeel Tariq',
  role: 'AI Engineer',
  location: 'Pakistan · Open to remote',
  email: 'sajeeltariqst@gmail.com',
  headline: 'I build intelligent systems that turn language into action.',
  headlineHighlights: ['intelligent', 'action.'],
  summary:
    'AI Engineer focused on LLM applications — retrieval-augmented generation, conversational agents and the production infrastructure that makes them reliable. I care about systems that are measurable, fast and genuinely useful.',
  availability: 'Available for new projects',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:sajeeltariqst@gmail.com' },
  ],
  stats: [
    { value: '10+', label: 'AI systems shipped' },
    { value: '3+', label: 'Years building ML' },
    { value: '∞', label: 'Prompts iterated' },
  ],
  skills: [
    {
      category: 'LLMs & Agents',
      items: ['RAG', 'LangChain', 'LlamaIndex', 'Tool calling', 'Prompt engineering', 'Evals'],
    },
    {
      category: 'Machine Learning',
      items: ['PyTorch', 'Transformers', 'Fine-tuning', 'Embeddings', 'scikit-learn'],
    },
    {
      category: 'Backend & Data',
      items: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Vector databases'],
    },
    {
      category: 'Frontend & Ops',
      items: ['React', 'TypeScript', 'Docker', 'CI/CD', 'Vercel', 'Cloud deployment'],
    },
  ],
  experience: [
    {
      role: 'AI Engineer',
      company: 'Your Company',
      period: '2024 — Present',
      summary: 'Designing and shipping LLM-powered products end to end.',
      highlights: [
        'Built a retrieval-augmented assistant over internal documentation.',
        'Introduced an evaluation harness to track answer quality across releases.',
      ],
    },
    {
      role: 'Machine Learning Engineer',
      company: 'Previous Company',
      period: '2022 — 2024',
      summary: 'Trained and deployed models for production workloads.',
      highlights: [
        'Shipped NLP classification models behind low-latency APIs.',
        'Automated training and deployment pipelines.',
      ],
    },
  ],
  projects: [
    {
      title: 'Portfolio RAG Assistant',
      summary:
        'A chatbot grounded in my own work — embeddings, hybrid retrieval and cited answers, served from FastAPI.',
      tags: ['RAG', 'FastAPI', 'Embeddings'],
    },
    {
      title: 'Conversational Voice Agent',
      summary:
        'A real-time agent that listens, reasons with tools and responds in natural speech.',
      tags: ['Agents', 'Speech', 'Tool use'],
    },
    {
      title: 'LLM Evaluation Toolkit',
      summary:
        'Regression tests for prompts and pipelines — scoring faithfulness, relevance and latency.',
      tags: ['Evals', 'Python', 'CI'],
    },
  ],
}
