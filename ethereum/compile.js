const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


function compilingPreperations() {
  const buildPath = path.resolve(__dirname, 'build');
  fs.removeSync(buildPath);
  return buildPath;
}

/**
 * Returns and Object describing what to compile and what need to be returned.
 */
function createConfiguration() {
  return {
    language: 'Solidity',
    sources: {
      'CampaignFactory.sol': {
        content: fs.readFileSync(
          path.resolve(__dirname, 'contracts', 'CampaignFactory.sol'),
          'utf8'
        )
      } /*
            'AnotherFileWithAnContractToCompile.sol': {
                content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'AnotherFileWithAnContractToCompile.sol'), 'utf8')
            }*/
    },
    settings: {
      outputSelection: {
        // return everything
        '*': {
          '*': ['*'], 
        }
      }
    }
  };
}

/**
 * Compiles the sources, defined in the config object with solc-js.
 * @param config - Configuration object.
 * @returns {any} - Object with compiled sources and errors object.
 */
function compileSources(config) {
  try {
    return JSON.parse(solc.compile(JSON.stringify(config), getImports));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Searches for dependencies in the Solidity files (import statements). All import Solidity files
 * need to be declared here.
 * @param dependency
 * @returns {*}
 */
function getImports(dependency) {
  console.log('Searching for dependency: ', dependency);
  switch (dependency) {
    case 'Campaign.sol':
      return {
        contents: fs.readFileSync(
          path.resolve(__dirname, 'contracts', 'Campaign.sol'),
          'utf8'
        )
      };
    case 'SafeMath.sol':
            return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts', 'SafeMath.sol'), 'utf8')};
    default:
      return { error: 'File not found' };
  }
}

/**
 * Shows when there were errors during compilation.
 * @param compiledSources
 */
function errorHandling(compiledSources) {
  if (!compiledSources) {
    console.error(
      '>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n',
      'NO OUTPUT'
    );
  } else if (compiledSources.errors) {
    // something went wrong.
    console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n');
    compiledSources.errors.map(error => console.log(error.formattedMessage));
  }
}


function writeOutput(compiled, buildPath) {
  fs.ensureDirSync(buildPath);

  for (let contractFileName in compiled.contracts) {
    const contractName = contractFileName.replace('.sol', '');
    console.log('Writing: ', contractName + '.json');
    fs.outputJsonSync(
      path.resolve(buildPath, contractName + '.json'),
      compiled.contracts[contractFileName][contractName]
    );
  }
}

// Workflow

const buildPath = compilingPreperations();
const config = createConfiguration();
const compiled = compileSources(config);
errorHandling(compiled);
writeOutput(compiled, buildPath);
