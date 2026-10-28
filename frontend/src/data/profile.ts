import type { Profile } from '@/types/profile'

/** Single source of truth for all personal content shown on the site (from resume & cover letter). */
export const profile: Profile = {
  name: 'Syed Anas Ahmed',
  roles: ['AI engineer &', 'generative AI developer'],
  location: 'Karachi, Pakistan',
  email: 'anas.ahd85@gmail.com',
  about:
    "I'm a Computer Science graduate specialising in Artificial Intelligence from NED University of Engineering & Technology. I build practical AI products: integrating models from OpenAI, Gemini and DeepSeek, fine-tuning with LoRA and QLoRA, and designing conversational systems people can actually talk to. I'm most interested in applied AI, agentic systems and turning AI into products that solve real business problems.",
  availability: 'Open to AI engineering roles',
  socials: [
    { label: 'GitHub', href: 'https://github.com/SyedAnasAhmed2004' },
    // TODO: replace with your LinkedIn profile URL
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:anas.ahd85@gmail.com' },
  ],
  // TODO: add your resume PDF to frontend/public/ and set this, e.g. '/Syed_Anas_Ahmed_Resume.pdf'
  resumeUrl: undefined,
  services: [
    {
      title: 'LLM engineering',
      tagline: 'Integrating and adapting large language models',
      description:
        'Multi-LLM integrations with OpenAI, Gemini and DeepSeek, fine-tuning with LoRA and QLoRA for domain adaptation, batching pipelines for performance, and conversational AI up to real-time speech-to-speech.',
      tools: ['OpenAI', 'Gemini', 'DeepSeek', 'LoRA / QLoRA', 'LangChain', 'LangGraph'],
    },
    {
      title: 'AI products',
      tagline: 'End-to-end applications built around AI',
      description:
        'React frontends with Django, Flask and FastAPI backends, backed by PostgreSQL, Redis and Milvus for data and retrieval, and shipped end to end from prototype to deployment.',
      tools: ['React', 'FastAPI', 'Django', 'Flask', 'PostgreSQL', 'Milvus'],
    },
    {
      title: 'Machine learning',
      tagline: 'Predictive models you can explain',
      description:
        'Models in PyTorch, TensorFlow and scikit-learn, from LightGBM prediction systems to deep learning, with SHAP and LIME to make their decisions transparent.',
      tools: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LightGBM', 'SHAP', 'LIME'],
    },
  ],
  timeline: [
    {
      year: '2025',
      title: 'AI Graduate Trainee Officer',
      organization: 'EOcean',
      description:
        'Fine-tuned OpenAI models and explored LoRA and QLoRA for domain adaptation. Engineered and deployed end-to-end products with React frontends and Django/Flask backends, with multi-LLM integrations (OpenAI, Gemini, DeepSeek) and batching pipelines. Built a speech-to-speech conversational chatbot.',
    },
    {
      year: '2022',
      title: 'BS Computer Science (Artificial Intelligence)',
      organization: 'NED University of Engineering & Technology',
      description:
        'Graduated with a CGPA of 3.58. Placed 3rd runner-up in the Koderz Kombat coding competition among 200+ teams. Coursework in algorithms, system analysis and design, machine learning and deep learning.',
    },
    {
      year: '2020',
      title: 'HSSC, Pre-Engineering',
      organization: 'Adamjee Govt. Science College',
      description: 'A-1 grade, with strong results in mathematics and science.',
    },
  ],
  projects: [
    {
      title: 'Real-Time Market Intelligence System',
      category: 'Final year project',
      summary:
        'An AI-powered strategic intelligence platform that automates competitive monitoring, market-signal detection and source-cited insight generation for real-time decisions.',
      tools: ['LLMs', 'Monitoring', 'Cited insights'],
      visual: 'market',
    },
    {
      title: 'Chess with AI',
      category: 'Algorithms / Game AI',
      summary:
        'A full chess application built on core data structures and algorithms, with a Minimax and Alpha-Beta pruning opponent and castling, en passant and promotion.',
      tools: ['Minimax', 'Alpha-Beta', 'BFS / DFS'],
      visual: 'chess',
    },
    {
      title: 'Urban Traffic Congestion Prediction',
      category: 'Machine learning / Geospatial',
      summary:
        'Congestion prediction with an LGBM classifier on historical traffic and weather data, enriched with live meteorological and geospatial APIs and explained with LIME and SHAP.',
      tools: ['LightGBM', 'SHAP', 'LIME'],
      visual: 'traffic',
    },
  ],
  techStack: [
    'Python',
    'C++',
    'Java',
    'Prolog',
    'PyTorch',
    'TensorFlow',
    'Keras',
    'Scikit-Learn',
    'Hugging Face',
    'LangChain',
    'LangGraph',
    'OpenAI',
    'Gemini',
    'DeepSeek',
    'React',
    'FastAPI',
    'Django',
    'Flask',
    'Streamlit',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Milvus',
    'Pandas',
    'Matplotlib',
    'Git',
    'GitHub',
    'GitLab',
  ],
}
