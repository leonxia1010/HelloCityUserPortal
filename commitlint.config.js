module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'tools', 'test', 'docs', 'refactor', 'style', 'perf', 'ci', 'build', 'revert'],
    ],
    'header-pattern': [
      2,
      'always',
      /^[a-z]+\([a-z]+\) : \[SCRUM-\d+\] .+$/,
    ],
  },
};
