const corruptFilePrompt = fileName => [
  {
    type: 'confirm',
    name: 'delete',
    message: `Your ${fileName} file seems to no longer be a valid file.\n`
    + 'Can I erase the existing file and replace it with the default?\n'
    + 'If not I\'ll just throw an error and tell you why its an invalid JSON',
    default: false,
  },
];

const confirmDeletePrompt = (fileName) => {
  const option1 = `I changed my mind, dont delete my ${fileName}`;
  const option2 = `Save a backup file for your current version of ${fileName}`;
  const option3 = 'Just overwrite it.';

  const questions = [
    {
      type: 'list',
      name: 'method',
      message: 'You could lose the information currently in the file.\n'
      + 'Are you sure you want to overwrite it?',
      choices: [
        option1,
        option2,
        option3,
      ],
    },
  ];
  return { questions, options: [option1, option2, option3] };
};

module.exports.confirmDeletePrompt = confirmDeletePrompt;
module.exports.corruptFilePrompt = corruptFilePrompt;