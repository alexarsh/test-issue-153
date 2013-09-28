Template.login.events({
	'click .teacher-registration': function (event) {
		Session.set("errors", {});
		Session.set("came_from_login", true);
		$(".login-form").hide('slow', function() {
	        Router.go('teacher_register');
        });
	},
	'click .student-registration': function (event) {
		Session.set("errors", {});
		Session.set("came_from_login", true);
		$(".login-form").hide('slow', function() {
	        Router.go('student_register');
        });
	},
	'submit .login-form': function (event) {
		event.preventDefault();
	}
});

Template.login.helpers({
	errors: function () {
		return Session.get("errors");
	}
});

//TODO: should be rewritten when easy forms will be ready
//TODO: (https://trello.com/c/qDjlN5C7/8-easy-forms)
Template.login.rendered = function() {
	var login = new FormValidator('login-form', [{
	    name: 'login_username',
	    display: 'Email or username',
	    rules: 'required'
	}, {
	    name: 'login_password',
		display: 'Password',
	    rules: 'required'
	}], function(form_errors, event) {
		var errors = {};
		Session.set("errors", {});
	    if (form_errors.length > 0) {
	        for (var i in form_errors) {
		        errors[form_errors[i].name] = form_errors[i].message;
	        }
	    }
		else {
		    var u = $("[name='login_username']").val();
		    var p = $("[name='login_password']").val();
		    Meteor.loginWithPassword(u, p, function(err){
				if (err) {
					errors["login"] = "Please check your username and password.";
					Session.set("errors", errors);
				} else {
					Router.go('demo');
				}
			});
	    }
		Session.set("errors", errors);
	});
}