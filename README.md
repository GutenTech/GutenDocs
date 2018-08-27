# GutenDocs

> CLI to generate APIs by parsing JSDoc comments from you .js and .jsx files

## Team

- **Product Owner**: Uday Trivedi
- **Scrum Master**: Peter Gierke
- **Development Team Members**: Yuqi Zhu, David Park

> This product is currently in development.  We would love any feedback from anyone making use of GutenDocs while it is under development.  Email us at gutentechdevs@gmail.com.

## Table of Contents

1. [Usage](#Usage)
1. [Trouble Shooting](#trouble-shooting)
1. [Requirements](#requirements)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

### Getting ready to use gutendocs

From anywhere call `npm install -g gutendocs`.  This will give you access to the gutendocs shell command.

### Initializing Gutendocs

Now from any location, preferably the root of a repo you can call `gutendocs init [foldername]` which will initialize a API folder directly in the directory you are currently working in.  It will also create a settings file called `.gutenrc.sjon` and a `.gutenignore` that will allow you to customize your usage of gutendocs.  your gutenignore works just like a `.gitignore` file and will ignore folders and files you specify and allow for the use of * as a wild card.  `.gutenrc.json` is a file that contains all the settings you can customize for for your API.

#### .gutenrc explanation
```javascript
"apiDir": // this is the folder that your API has been created in. [default = GutenAPI]
"skeleton": { // this outlines the structure of how your API will be organize
    "sortByOrder": [ // the order the sort methods in this array will define in what order things are categorized
      "sortByFileName",
      "sortBySection",
      "sortByParentDirectoryName"
    ],
    "sortBySection": {  // sort by section allows you to define what tag you want to use as a grouping tool
      "section": "@section" // here we have specified that @section is the grouping tag.  So anything with @section group1 would be organized into group1 on the API.  @section group2 would create another section
    },
    "sortByFileName": { // this sorting method would group things by the file they are written in
      "includeExtension": false  
    },
    "sortByParentDirectoryName": { // this sorting method will group things based on the folder the file is in
      "targetDepth": 1 // defined how many folders above you wish to go.
    },
    "catchAll": {  // this will always run at the end and group anything not caught in another sorter into the group defined by the "section" key value
      "section": "Miscellaneous"
    }
  },
  "acornSettings": { // it is suggested you leave all these on, if false then the parser will crash on corresponding issues
    "allowImportExportEverywhere": true,
    "allowHashBang": true
  },
  "doctrineSettings": { // it is suggested you leave all these on, if false then the parser will crash on corresponding issues
    "unwrap": true,
    "recoverable": true,
    "sloppy": true
  },
  "verbosity": 1 // this defines how much information you will see from errors.  The higher the number the more information
}
```

#### gutenconfig.js explanation

gutenconfig.json is a file that allows you to manage the design of the API.  It will be generated with defaults in your API folder.
```javascript
banner: {  // image logo to use
  src: './imgs/newLogo.png',  
  alt: 'Guten Docs',
  height: '185',
  width: '175',
},
anchorHashJump: 10,  // how far above the linked hashtag to jump to
introTxt: { // for every key in this object 1 section with be rendered with the title of the key and the content of the value of that key
  example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
},
```

#### Setting up your .gutenignore

`.gutenignore` is generated for you with the `node_modules` folder, any files or folders starging with a `.` and the generated API folder ignored.  You most likely will want to add other folders to this such as test folders, mock folders or anything else that you might not want or need included in the API.

### Adding your JSDoc string documented information to the API.

Now that you have configured gutendocs and your styles the way you want its time to extract all those well written comments from your code and organize them into a beautiful document. Go to whatever folder or file you want to generate an API for and run either `gutendocs parse [filename]` to parse a single file or `gutendocs parse --all` to parse the current directory or any subdirectories

Depending on your verbosity level (which can be set with `gutendocs verbosity/verbose [0-5]`) you will then see an output with information about the parsing process.  If you want to know more, like which files may not have been parsed, or why they were not parsed, then turn up the verbosity.

### Viewing your API

Now that you have set all your settings like you wanted and parsed the files you wanted included in the API a file named parsed Data.  This is a JS file that exports a JSON object containing all your parsed comment information.  Feel free to look this over, but you do not need to do anything here.

Now you can open the index.html file inside your API folder in your web browser of choice, et voila.  An API has been created for you.  Congradulations!

### Trouble Shooting

**Help! I've forgotten how to use gutendocs!** <br />
```No worries, just run `gutendocs help` or `gutendocs <command> --help` for more information.```

**Help! I've made a mess of my API folder. And I am missing files or don't know what it should look like.** <br />
```No worries,  If you want to start from scratch you can call `gutendocs reset` to overwrite your whole folder to be the way it was when you initialized.  If you want to retain a copy of the way it was before you can run `gutendocs reset --backup` and it will back up a copy of your current version of the folder as [foldername].backup.```

**Help! I've made a mess of my .gutenrc.json and its missing things I need or is now invalid.**<br />
```No worries,If your gutenrc.json is an invalid JSON objet and you try to run ang gutendocs commands it will ask you if you would like to restore the .gutenrc.json to it's original state.  If you choose to do that it will also ask if you want to save a backup file.  The backup will be saved in the same location as the .gutenrc.json as .gutenrc.backup.json so you can use it as a reference while you are rebuilding on the newly created gutenrc.json.```

**Help! I just want to start over from scratch.**<br />
```No worries.  Just delete your .gutenrc, .gutenignore and the API folder and rerun `gutendocs init```

**Help! I've found a problem that I don't know what to do with that isn't covered above!**<br />
```Sorry to hear that.  Please send an email to gutentechdevs@gmail.com and we will look into this issue for you.```

## Requirements

- Node 8.11.3+

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
