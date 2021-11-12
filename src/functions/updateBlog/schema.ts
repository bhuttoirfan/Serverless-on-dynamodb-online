export default {
  type: "object",
  properties: {
    author: {type: 'string'},
    title: {type: 'string'}
  },
  required: ['author', 'title']
} as const;
