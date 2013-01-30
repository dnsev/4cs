function get_change_log() {
	var log_url = "https://raw.github.com/dnsev/4cs/master/web/changelog.txt";

	$.ajax({
		type: "GET",
		url: log_url,
		dataType: "text",
		success: function (data, status, jqXHR) {
			parse_change_log(data);
		},
		error: function (jqXHR, status, error) {
			alert(status+","+error+";");
			$("#change_log").css("display", "");
		}
	});
}
