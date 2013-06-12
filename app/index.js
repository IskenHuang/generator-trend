'use strict';
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




process.exit(0);

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

    var prompts = [{
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.someOption = props.someOption;

        cb();
    }.bind(this));
};

TrendGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

TrendGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
