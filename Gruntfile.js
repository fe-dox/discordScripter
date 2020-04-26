module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['./build'],
        exec: {
            buildTS: {
                 cmd: "tsc --project tsconfig.json"
            },
            run:{
                cmd: "node ./build/app.js"
            }
        },


    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'exec:buildTS','exec:run']);
    grunt.registerTask('build', ['clean', 'exec:buildTS'])

};
