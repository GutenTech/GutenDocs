const helpTxt = () => {
  console.log(`
  Usage: gutendocs <command>
  
  where <command> is one of:
    gutendocs --init              initialize gutendocs with .gutenrc and a api htlm folder called GutenAPI
    gutendocs --init <filename>   initialize gutendocs with .gutenrc and an api htlm file called <filename>
    gutendocs <filename>          parse <filename> and add the data to the auto-generated document
    gutendocs --all               parse all js and jsx files in and above current directory
    gutendocs --refresh           refresh the files in the gutendocs api folder to virgin state
    gutendocs --version           logs the current version of gutendocs
    `);
};

module.exports = helpTxt;