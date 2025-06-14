export interface Feature {
  id: string
  title: string
  description: string
}

export const featuresList: Feature[] = [
  {
    id: '1',
    title: 'Intelligent PDF Chat',
    description:
      'Engage in natural conversations with your PDF documents. Ask questions, get summaries, and extract key information using advanced AI technology.',
  },
  {
    id: '2',
    title: 'Smart Document Processing',
    description:
      'Automatically analyze and understand your PDFs. Extract insights, identify key topics, and organize information for easy access and retrieval.',
  },
  {
    id: '3',
    title: 'Secure Cloud Storage',
    description:
      'Your documents are safely stored with enterprise-grade security. All data is encrypted end-to-end, ensuring complete privacy and data protection.',
  },
]
