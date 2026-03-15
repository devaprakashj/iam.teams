import { PortfolioPage } from '@/components/portfolio/PortfolioPage'

// Mock data for now (replace with DB fetch later)
const mockProfile = {
  username: 'devaprakash',
  name: 'Devaprakash J',
  title: 'AI/ML & Full Stack Developer',
  location: 'Chennai, Tamil Nadu, India',
  email: 'devaprakashofficial@gmail.com',
  linkedin: 'linkedin.com/in/devaprakashj',
  github: 'github.com/devaprakashofficial',
  summary: 'AI/ML & Full Stack Developer with 4+ years of experience in freelance and startup environments. Specialized in high-performance web applications and neural network implementations.',
  skills: ['Python', 'React', 'Node.js', 'ML', 'Firebase', 'Pandas', 'TensorFlow', 'Scikit-learn'],
  experience: [
    { role: 'AI Software Developer', company: 'Upwork', location: 'Chennai', period: 'Jul 2024 – Present', points: ["Developed ML models for international clients", "Built AI pipelines using Python"] },
    { role: 'Full Stack Developer', company: 'Fiverr', location: 'Remote', period: 'Apr 2021 – Present', points: ["Built 50+ web apps for startup clients"] },
    { role: 'AI Consultant', company: 'Amazon MTurk', location: 'Remote', period: 'May 2025 – Present' },
    { role: 'ML Intern', company: 'Codec Technologies', location: 'Chennai', period: 'Jun 2025' },
    { role: 'VP', company: 'TechSpark Club RIT', location: 'Chennai', period: 'Jun 2025 – Present' },
  ],
  education: [
    { degree: 'B.Tech CSE (AI & ML)', institution: 'Rajalakshmi Institute of Technology', location: 'Chennai', period: '2024–2028' }
  ],
  certifications: [
    'Tableau Desktop Certified Professional',
    'Accenture UK — Dev & Tech Simulation',
    'Ethical Hacking: Web App Hacking'
  ]
}

export default function UserPortfolio({ 
  params 
}: { 
  params: { username: string } 
}) {
  // In a real app, you would fetch the profile for params.username here
  // For now we show the mock profile if it's 'devaprakash' or any user
  return <PortfolioPage profile={{ ...mockProfile, username: params.username }} />
}
