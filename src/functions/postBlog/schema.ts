export default {
  type: "object",
  properties: {
    author: {type: String},
    title: {type: String},
    desc: {type: String},
    content: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String}
  },
  required: ['author', 'title', 'content']
} as const;
