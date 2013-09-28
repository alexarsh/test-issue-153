Meteor.publish("users", function (query) {
	return Meteor.users.find(query);
});