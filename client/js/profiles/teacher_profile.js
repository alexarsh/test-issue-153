Template.teacher_profile_update.events({
	'submit .teacher_profile_update': function (event) {
		event.preventDefault();
	}
});

Template.teacher_profile_update.helpers({
	errors: function () {
		return Session.get("errors");
	}
});

Template.students_list.helpers({
	students: function () {
		var students_query = {"profile.type": UserTypesEnum.STUDENT};
		Meteor.subscribe("users", {query: students_query});
		return Meteor.users.find(students_query).fetch();
	}
});

Template.teacher_profile_update.rendered = function() {
	var teacher_profile_update = new FormValidator('teacher_profile_update', [{
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
	},
	{
	    name: 'old_password',
		display: 'Old password'
	},
	{
	    name: 'new_password',
		display: 'New password'
	},
	{
	    name: 'school_name',
		display: 'School name'
	},
	{
	    name: 'state',
		display: 'State'
	},
	{
	    name: 'city',
		display: 'City'
	}],
	function(form_errors, event) {
		var errors = {};
		Session.set("errors", {});
	    if (form_errors.length > 0) {
	        for (var i in form_errors) {
		        errors[form_errors[i].name] = form_errors[i].message;
		        Session.set("errors", errors);
	        }
	    }
		else {
		    var user = Meteor.user();
		    var u = $("[name='first_name']").val();
		    var op = $("[name='new_password']").val();
		    var np = $("[name='old_password']").val();
		    if (u != user.username && Meteor.users.find({username:u}).count() > 0) {
				errors["general"] = "A user with this username already exists. Please pick another one.";
			    Session.set("errors", errors);
			}
		    else {
			    Meteor.users.update(user._id, {"$set" : {
				    "username": u,
				    "profile.name_prefix": $("[name='name_prefix']").val(),
				    "profile.first_name": $("[name='first_name']").val(),
				    "profile.last_name": $("[name='last_name']").val(),
				    "profile.school_name": $("[name='school_name']").val(),
				    "profile.state": $("[name='state']").val(),
				    "profile.city": $("[name='city']").val()
			    }});
			    if (op && np) {
					Accounts.changePassword(op, np, function(err) {
						errors["general"] = "Your old password is not correct.";
				        Session.set("errors", errors);
					});
		        }
		    }
	    }
	});
}