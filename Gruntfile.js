let fs = require("fs");
const Path = require("path");
function allFiles(path, end) {
    let toList = [path];
    let jsFiles = [];
    while (toList.length > 0) {
        let cur = toList.shift();
        let files = fs.readdirSync(cur);
        for (var file of files) {
            let realFile = cur + Path.sep + file;
            if (file.endsWith(end)) {
                jsFiles.push(realFile);
            } else {
                let items = cur + Path.sep + file;
                let stat = fs.statSync(items);
                if (stat.isDirectory()) {
                    toList.push(items);
                }
            }
        }
    }
    return jsFiles;
}

module.exports = function (grunt) {
    grunt.initConfig({
        cssResources: [],
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            files: ["public/js/custom/**/*.js"],
            options: {
                jshintrc: '.jshintrc',
            }
        },
        clean: {
            build: ['build']
        },
        copy: {
            run: {
                files: [
                    {cwd: 'public/css/', src: '**', dest: 'build/css/', expand: true},
                    {cwd: 'public/images/', src: '**', dest: 'build/images/', expand: true},
                    {cwd: 'public/js/', src: '**', dest: 'build/js/', expand: true},
                    {cwd: 'public/', src: 'index.html', dest: 'build/', expand: true},
                    {cwd: 'public/', src: 'main.html', dest: 'build/', expand: true},
                ]
            }
        },
        replace: {
            gather: {
                files: [
                    {
                        dest: "build/",
                        src: ["main.html"],
                        expand: true,
                        cwd: "public"
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: function (matchedString) {
                                let cssArray = matchedString.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                cssArray.forEach(function (element) {
                                    let resourceTarget = element.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[2];
                                    let spriteTarget = resourceTarget.match(/(.*)(.css)/);
                                    if (spriteTarget !== null) {
                                        let targetConfig = grunt.config("cssResources");
                                        let spritePath = spriteTarget[1] + "-sprite.css";
                                        let exit = fs.existsSync(spritePath);
                                        if (exit) {
                                            console.log("get css file, file name:" + spritePath);
                                            targetConfig.push(spritePath);
                                        } else {
                                            console.log("no css file, name=" + resourceTarget);
                                        }
                                    }

                                });
                                return "<!--that's ok-->";
                            }
                        }
                    ]
                }
            }
        },

        concat: {
            css: {
                src: allFiles("public/css", ".css"),
                dest: 'build/css/combined.min.css',
                nonull: true,
                options: {
                    separator: ";"
                }
            },
            js: {
                src: allFiles("public/js/custom", ".js"),
                dest: "build/js/custom/combined.js",
                nonull: true,
                options: {
                    separator: ";"
                }
            }
        },

        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/js/custom/combined.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                port: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask("re", ["clean", "replace"]);

    grunt.registerTask("default", ["jshint", "clean", "copy", "replace", "concat", "uglify"]);
};