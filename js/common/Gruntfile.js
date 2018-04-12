module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            builda: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: false
                },
                files: {
                    'countdown.min.js': ['countdown.js'],
                    'slider-common.min.js': ['slider-common.js'],
                    'timer.min.js': ['timer.js'],
                    'util.min.js': ['util.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('min', ['uglify:builda']);
};
