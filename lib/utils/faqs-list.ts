export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqsList: FaqItem[] = [
  {
    id: '1',
    question: 'How many PDFs can I upload for free?',
    answer:
      'With PDFGenie&apos;s free plan, you can upload up to 3 PDFs. This gives you full access to our AI-powered chat features, document analysis, and secure storage for your documents.',
  },
  {
    id: '2',
    question: 'What types of PDF files are supported?',
    answer:
      'PDFGenie supports all standard PDF files including text-based documents, scanned PDFs with OCR, academic papers, business reports, manuals, and more. Maximum file size is 50MB per document.',
  },
  {
    id: '3',
    question: 'How does the AI chat feature work?',
    answer:
      'Our advanced AI analyzes your PDF content and creates a knowledge base. You can then ask questions in natural language, request summaries, or search for specific information within your documents.',
  },
  {
    id: '4',
    question: 'Is my data secure and private?',
    answer:
      'Absolutely. PDFGenie uses enterprise-grade encryption for all data transmission and storage. Your documents are processed securely and are only accessible by you. We never share or use your content for training purposes.',
  },
  {
    id: '5',
    question: 'Can I upgrade my plan later?',
    answer:
      'Yes, you can upgrade to our premium plan at any time to unlock additional features like unlimited PDF uploads, priority processing, and advanced AI capabilities.',
  },
]
