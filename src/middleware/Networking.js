import $ from 'jquery';

export function post(url, token, data, completion) {
  $.ajax({
    url: url,
    method: "POST",
    dataType: "JSON",
    data: data,
    headers: { 'Authorization': 'JWT ' + token },
    success: function (data, text) {
      if (completion) completion(null, data);
    },
    error: function (request, status, error) {
      if (error) completion(error);
    }
  });
}
