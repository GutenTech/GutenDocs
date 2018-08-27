# GutenDocs

> CLI to generate APIs by parsing JSDoc comments from you .js and .jsx files

## Team

- **Product Owner**: Uday Trivedi
- **Scrum Master**: Peter Gierke
- **Development Team Members**: Yuqi Zhu, David Park

> This product is currently in development.  We would love any feedback from anyone making use of GutenDocs while it is under development.  Email us at gutentechdevs@gmail.com.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> From anywhere: call `npm install -g gutendocs`.  This will give you access to the gutendocs shell command.
Now from any location, preferably the root of a repo you can call `gutendocs init [foldername]` which will initialize a API folder directly in the directory you are currently working in.  It will also create a settings file called `.gutenrc.sjon` and a `.gutenignore` that will allow you to customize your usage of gutendocs.  your gutenignore works just like a `.gitignore` file and will ignore folders and files you specify and allow for the use of * as a wild card.  `.gutenrc.json` is a file that contains all the settings you can customize for for your API.

>.gutenrc explanation
<pre width="100">
"apiDir" - this is the folder that your API has been created in.  This is GutenAPI by default, or whatever you specified with gutendocs init [foldername]
"skeleton": {  - this outlines the structure of how your API will be organize
    "sortByOrder": [  - the order the sort methods in this array will define in what order things are categorized
      "sortByFileName",
      "sortBySection",
      "sortByParentDirectoryName"
    ],
    "sortBySection": {  - sort by section allows you to define what tag you want to use as a grouping tool
      "section": "@section" - here we have specified that @section is the grouping tag.  So anything with @section group1 would be organized into group1 on the API.  @section group2 would create another section
    },
    "sortByFileName": { - this sorting method would group things by the file they are written in
      "includeExtension": false  
    },
    "sortByParentDirectoryName": { - this sorting method will group things based on the folder the file is in
      "targetDepth": 1 - defined how many folders above you wish to go.
    },
    "catchAll": {  - this will always run at the end and group anything not caught in another sorter into the group defined by the "section" key value
      "section": "Miscellaneous"
    }
  },
  "acornSettings": { - it is suggested you leave all these on, if false then the parser will crash on corresponding issues
    "allowImportExportEverywhere": true,
    "allowHashBang": true
  },
  "doctrineSettings": { - it is suggested you leave all these on, if false then the parser will crash on corresponding issues
    "unwrap": true,
    "recoverable": true,
    "sloppy": true
  },
  "verbosity": 1 - this defines how much information you will see from errors.  The higher the number the more information
}
</pre>

>gutenconfig.js explanation
<pre>
  banner: {  - image logo to use
    src: './imgs/newLogo.png',  
    alt: 'Guten Docs',
    height: '185',
    width: '175',
  },
  anchorHashJump: 10,  - how far above the linked hashtag to jump to
  introTxt: { - for every key in this object 1 section with be rendered with the title of the key and the content of the value of that key
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
};
</pre>
## Requirements

- Node 8.11.3+

## Development

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
