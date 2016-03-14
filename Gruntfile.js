//包装函数
module.exports = function(grunt){

	//任务配置，所有插件配置信息
	grunt.initConfig({

		//获取package.json的信息
		pkg:grunt.file.readJSON('package.json'),
		//uglify插件的配置信息
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build:{
				src:'src/js/test.js',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		//cssmin插件的配置信息
		cssmin: {
			build:{
				src:'src/css/test.css',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.css'
			}
		},
		//jshint插件的配置信息
		jshint:{
			build:['Gruntfile.js','src/js/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		connect: {
      		options: {
	        	port: 9000,
	        	hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
	        	livereload: 35729  //声明给 watch 监听的端口
      		},
	      	server: {
	        	options: {
	         		open: true, //自动打开网页 http://
	          		base: ['src/']  //主目录
	          	}
	      	}
	    },
		//watch插件的配置信息
		watch:{
			livereload: {
		        options: {
		        	livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
	        	},
		        files:[  //下面文件的改变就会实时刷新网页
		          'src/*.html',
		          'src/css/*.css',
		          'src/js/*.js',
		          'src/img/{,*/}*.{png,jpg}'
		        ]
			}
		},
		//sass插件的配置信息
		sass: {
            build: {
                files: {
                    'build/test.css': 'src/sass/test.scss',
                    'src/css/test.css':'src/sass/test.scss'
                }
            }
        },
	});

	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');

	//告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
	grunt.registerTask('default',['connect:server','jshint','uglify','watch']);
};