export const NODE_RULES = {
  customInput: {
    maxIncoming: 0,
    maxOutgoing: Infinity,
  },
  customOutput: {
    maxIncoming: Infinity,
    maxOutgoing: 0,
  },
  text: {
    maxIncoming: 1,
    maxOutgoing: Infinity,
  },
  jsonInput: {
    maxIncoming: 0,
    maxOutgoing: Infinity,
  },
  llm: {
    maxIncoming: 1,
    maxOutgoing: Infinity,
  },
};
