const helpTxt = () => {
  console.log(`
  Usage: gutendocs <command>
  
  where <command> is one of:
    gutendocs --init, --i         initialize gutendocs with .gutenrc and a api html folder called GutenAPI
    gutendocs --init <folder>     initialize gutendocs with .gutenrc and an api html folder called <folder>
    gutendocs <filename>          parse <filename> and add the data to the auto-generated document
    gutendocs --all, --a          parse all js and jsx files in and above current directory
    gutendocs --refresh, --r      refresh the files in the gutendocs api folder to virgin state
    gutendocs --version, --v      logs the current version of gutendocs
    gutendocs --config, --c       updates the API styles to reflect the lastest update of config
    gutendocs --info              get info on available commands
    `);
};

module.exports = helpTxt;