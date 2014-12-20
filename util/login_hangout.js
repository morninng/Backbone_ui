
function login_hangout(event_id){

	console.log("login hangout");

	Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");
	var currentUser = Parse.User.current();

	var hagout_domain = "https://plus.google.com/hangouts/_?"
	var hangout_gid = "gid=172012775158"
	var hangout_query_key = "&gd=";
	var hangout_query_value = currentUser.id;
	var hangout_query_split = "_";
	var hangout_second_query_value = event_id;
	var hangout_link= hagout_domain + hangout_gid + hangout_query_key + hangout_query_value + hangout_query_split + hangout_second_query_value;
	location.href = hangout_link;
};

