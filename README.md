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

> From anywhere:

```sh
npm install -g gutendocs
```

> From within the root directory of the repo you want to generate an API for:

```sh
gutendocs init
```

> To generate an API from JSDocs of a single .js/.jsx file:
```sh
gutendocs <filename>
```

> To generate an API from JSDocs of a multiple .js/.jsx files:
```sh
gutendocs <filename> <filename> <filename> <filename>
```

> To generate an API from JSDocs of a all .js/.jsx files in current directory and subdirectories:
```sh
gutendocs --all
```

> To restore the API to the original state run this at the same level or subdirectory of init location:
```sh
gutendocs reset
```

> To restore the API to the original state run this at the same level or subdirectory of init location:
```sh
gutendocs --help
```

> To update API with settings from gutenConfig.json:
```sh
gutendocs config
```

> To get latest version information:
```sh
gutendocs --info
```

> Customize the theme of the API:
```sh
edit styles.css or the gutenConfig.json and run:
gutendocs config
```

## Requirements

- Node 8.11.3+

## Development

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
