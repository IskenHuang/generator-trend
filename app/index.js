'use strict';

/**
 * Doc url
 * https://github.com/yeoman/generator/wiki/base
 */

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    welcome = ''+'\n'+
'\n'+'               ██████████████'.red+
'\n'+'           ██████████████████████'.red+
'\n'+'        ███████████████████████████'.red+
'\n'+'      █████████████████████         █'.red+
'\n'+'    ██████████████████████████████'.red+'              ███████████   ██████████      ██████████    ████     ███    ████████'+
'\n'+'   ████████████████████████████████    █'.red+'        ███████████   ████████████    ██████████    ██████   ███    ███████████'+
'\n'+'  ██████████████████████████████████    █'.red+'           ███       ███      ███    ███           ███████  ███    ███     ████'+
'\n'+'  ██████████████████████████████████    █'.red+'           ███       ████████████    ██████████    ███ ████ ███    ███      ███'+
'\n'+' ███████████   ████████████████████    ███'.red+'          ███       ██████████      ███           ███  ███████    ███      ███'+
'\n'+' ████████     ████████████████████    ████'.red+'          ███       ███    ████     ███           ███   ██████    ███     ████'+
'\n'+' ████            ████████████████    █████'.red+'          ███       ███     ████    ██████████    ███    █████    ███████████'+
'\n'+' ██████     ████████████████████    ██████'.red+
'\n'+'  ████      ██████████████████    ███████'.red+'                                                                                TM'+
'\n'+'  ███      █████████████████    █████████'.red+'         ██   ██          ██           █████          ██████           █████'+
'\n'+'   ██      ██████████████     ██████████'.red+'          ███ ███          ██          ██   ██         ██   ██         █    ██'+
'\n'+'    █       █████████       ███████████'.red+'           █ █ █ █          ██          ██              ██████         ██    ██'+
'\n'+'                         █████████████'.red+'            █ ███ █          ██           ██████         ██  ██          ██████'+
'\n'+'                    ████████████████'.red+
'\n'+'          █████████████████████████'.red+
'\n'+'         █████████████████████████'.red+
'\n'+'          ███████████████████████'.red+
'\n'+'               ██████████████'.red+
'\n';
console.log(welcome);

var TrendGenerator = module.exports = function TrendGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TrendGenerator, yeoman.generators.Base);

TrendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
    {
        name: 'projectName',
        message: 'What do you want to call your project?',
        default: 'myProject',
        warning: 'Error'
    },
    {
        name: 'cssLanguage',
        message: 'Which stylesheet language (SASS or LESS)?',
        default: 'LESS',
        warning: 'Error'
    },
    {
        name: 'isCoffeeScript',
        message: 'Would you like to Coffee-script (y/n)?',
        default: 'y',
        warning: 'Error'
    }
    ];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.cssLanguage = props.cssLanguage.toUpperCase();
        if(props.isCoffeeScript.toLowerCase().indexOf('y') >= 0){
            this.isCoffeeScript = true;
        }else{
            this.isCoffeeScript = false;
        }

        cb();
    }.bind(this));
};

TrendGenerator.prototype.app = function app() {
    this.directory('_app', 'app');
    this.template('_index.html', 'app/index.html');

    // project default
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
};

TrendGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_gitattributes', '.gitattributes');
    this.copy('_gitignore', '.gitignore');
    this.copy('_jshintrc', '.jshintrc');
};
