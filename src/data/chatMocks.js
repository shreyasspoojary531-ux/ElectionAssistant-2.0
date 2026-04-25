export const starterQuestions = [
  'How do I register to vote?',
  'What documents do I need?',
  'Where is my polling booth?',
  'How does an EVM work?'
]

export const mockKnowledgeBase = [
  {
    keywords: ['eligible', 'eligibility', 'who can vote', '18'],
    answer:
      'In general, you need to be an Indian citizen, at least 18 years old, and enrolled in the electoral roll for your constituency. Exact registration cutoffs and documents can vary by election cycle, so the official voter services portal is the safest place to confirm your status.',
  },
  {
    keywords: ['voter id', 'epic', 'apply', 'registration', 'register'],
    answer:
      'If you do not have a voter ID yet, start from the official voter services portal and complete the current new-voter registration flow. Keep identity, age, and address documents ready, and track the application status online after submission.',
  },
  {
    keywords: ['booth', 'polling station', 'where do i vote'],
    answer:
      'You can find your polling booth by checking your voter slip or the official voter services portal. Try to confirm the booth address, part number, and serial number before polling day so the visit feels straightforward.',
  },
  {
    keywords: ['evm', 'machine', 'vvpat'],
    answer:
      'An EVM lets you vote by pressing the button next to your chosen candidate. The connected VVPAT briefly shows a paper slip view with the recorded choice, which then drops into a sealed box for audit support.',
  },
  {
    keywords: ['recorded', 'counted', 'safe'],
    answer:
      'Your vote is registered electronically and supported by the VVPAT paper trail. If something looks wrong at the moment of voting, inform polling staff immediately so the issue can be handled under the applicable procedure.',
  },
  {
    keywords: ['what to carry', 'documents', 'id proof'],
    answer:
      'Carry your voter ID if you have it, and keep a backup identity proof ready if needed. Comfortable clothing, water, and a charged phone can make the polling-day experience much easier.',
  },
  {
    keywords: ['first time', 'nervous', 'process'],
    answer:
      'First-time voters usually move through three simple stages: identity check, ink mark, then voting on the EVM. Arriving a little early and knowing your booth details in advance takes most of the stress out of it.',
  },
]

export const fallbackAnswer =
  'I can help with voter registration, polling booths, EVMs, VVPAT, and voting-day basics. Ask me something like "How do I check my booth?" or "What happens inside the polling station?"'

export function getMockResponse(question) {
  const normalized = question.toLowerCase()
  const match = mockKnowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  )

  return match?.answer ?? fallbackAnswer
}
