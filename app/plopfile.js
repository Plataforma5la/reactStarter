const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = (source) => {
  const list = readdirSync(source).map(name => join(source, name)).filter(isDirectory);
  if (list.length === 0) return ['.'];
  return list;
};
const filter = function filter(path) {
  const f = path.split('/');
  return f[f.length - 1];
};

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'this creates a new component with its story',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your component name?',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      },
    }, {
      type: 'list',
      name: 'folder',
      message: 'In which Component folder should I created it?',
      choices: getDirectories('./src/components'),
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'folder is required';
      },
      filter,
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{properCase folder}}/{{properCase name}}.jsx',
      templateFile: '.plop/component.js',
    }, {
      type: 'add',
      path: 'stories/{{properCase name}}.stories.jsx',
      templateFile: '.plop/stories.js',
    }, {
      type: 'add',
      path: 'src/components/{{properCase folder}}/{{properCase name}}.styl',
    }],
  });

  plop.setGenerator('container', {
    description: 'this creates a new connected Component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your connected container name?',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      },
    }, {
      type: 'list',
      name: 'folder',
      message: 'In which Container folder should I created it?',
      choices: getDirectories('./src/containers'),
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'folder is required';
      },
      filter,
    }],
    actions: [{
      type: 'add',
      path: 'src/containers/{{properCase folder}}/{{properCase name}}.jsx',
      templateFile: '.plop/container.js',
    }],
  });
};

