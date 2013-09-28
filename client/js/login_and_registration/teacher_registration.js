Template.teacher_register.events({
	'submit .teacher-register-form': function (event) {
		event.preventDefault();
	}
});

Template.teacher_register.helpers({
	errors: function () {
		return Session.get("errors");
	}
});

Template.teacher_register.rendered = function() {
	if (Session.get("came_from_login")) {
		$(".teacher-register-form").show('slow');
	}
	else {
		$(".teacher-register-form").show();
	}
	Session.set("came_from_login", false);
	var teacher_register = new FormValidator('teacher-register-form', [{
	    name: 'first_name',
		display: 'First name',
	    rules: 'required'
	},
	{
	    name: 'last_name',
		display: 'Last name',
	    rules: 'required'
	},
	{
	    name: 'username',
	    display: 'Email or username',
	    rules: 'required'
	}, {
	    name: 'password',
		display: 'Password',
	    rules: 'required'
	},
	{
	    name: 'teacher-policy',
		display: 'Policy agreement',
	    rules: 'required'
	}], function(form_errors, event) {
		var errors = {};
		Session.set("errors", {});
	    if (form_errors.length > 0) {
	        for (var i in form_errors) {
		        errors[form_errors[i].name] = form_errors[i].message;
		        Session.set("errors", errors);
	        }
	    }
		else {
		    var u = $("[name='username']").val();
			var p = $("[name='password']").val();
		    if (Meteor.users.find({username:u}).count() > 0) {
			    errors["register"] = "This user already exists. Please try to login.";
			    Session.set("errors", errors);
		    }
		    else {
			    Accounts.createUser({username:u, password:p,
			        profile: {
				        name_prefix: $("[name='name_prefix']").val(),
						first_name: $("[name='first_name']").val(),
				        last_name: $("[name='last_name']").val(),
						type: UserTypesEnum.TEACHER,
				        created_at: Date()
			        }
			    },function(err){
					if (err) {
						errors["register"] = "This user already exists. Please try to login.";
			            Session.set("errors", errors);
					} else {
					    Meteor.loginWithPassword(u, p, function(err){
							Router.go('teacher_profile');
						});
					}
				});
		    }
	    }
	});
}