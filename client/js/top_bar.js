Template.top_bar.events({
	'click .logout-button': function (event) {
		Meteor.logout(function(err){
			Router.go('login');
		});
	}
});