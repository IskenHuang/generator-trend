'use strict';

/**
 * Doc url
 * https://github.com/yeoman/generator/wiki/base
 */

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    TMLogo = require('../libs/logo');

var TrendGenerator = module.exports = function TrendGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    // show trend logo
    console.log(TMLogo.logo);
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
    var _type = this.isCoffeeScript ? 'coffee' : 'js';
    this.directory('_app', 'app');
    this.template('_index.html', 'app/index.html');
    this.copy('_scripts_'+_type+'/app.'+_type, 'app/scripts/app.'+_type);
    this.copy('_scripts_'+_type+'/EventChannel.'+_type, 'app/scripts/EventChannel.'+_type);
    this.copy('_scripts_'+_type+'/main.'+_type, 'app/scripts/main.'+_type);
    this.copy('_scripts_'+_type+'/views/BaseView.'+_type, 'app/scripts/views/BaseView.'+_type);
    this.copy('_scripts_'+_type+'/views/ContentManager.'+_type, 'app/scripts/views/ContentManager.'+_type);
    this.copy('_scripts_'+_type+'/views/IndexLayout.'+_type, 'app/scripts/views/IndexLayout.'+_type);

    // project default
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');

    if(this.isCoffeeScript){
        this.copy('_Gruntfile_coffee_less.js', 'Gruntfile.js');
    }else{
        this.copy('_Gruntfile_js_less.js', 'Gruntfile.js');
    }
};

TrendGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_gitattributes', '.gitattributes');
    this.copy('_gitignore', '.gitignore');
    this.copy('_jshintrc', '.jshintrc');
};
