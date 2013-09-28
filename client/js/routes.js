var users_sub = Meteor.subscribe("users");

Router.configure({
	layout: 'home-layout',
	renderTemplates: {
	    'top_bar': {to: 'top_bar'}
    }
});

Router.map(function() {
	this.route('login', {
		path: '/',
		data: function() {
			Session.set("errors",{});
		}
	});
	this.route('teacher_register');
	this.route('teacher_profile', {
        action: 'go_to_profile'
	});
});

TeacherProfileController = RouteController.extend({
	go_to_profile: function () {
		this.wait(users_sub, function () {
			var user = Meteor.user();
			if (!user) {
				this.redirect('login');
			}
			else if (user.profile.type != UserTypesEnum.TEACHER) {
				this.redirect('teacher_register');
			}
			else {
				this.run();
			}
		});
	}
});
