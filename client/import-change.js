function submitChange() {
   const changeNumber = $('#changeNumber').val()
   const changeNumberRequest = { 'changeNumber': changeNumber }

   $.post({
      url: '/change-query',
      data: JSON.stringify(changeNumberRequest),
      headers: {
      'content-type': 'application/json'
   }
   })
   .done(parts => {
      populateParts(parts)
   })
   .fail(xhr => {
      // TODO Come up with a message to the user.
      console.log('Error sending data to server.', xhr.responseText)
   })
}

function populateParts(parts) {
   parts.forEach((part, i) => {
      $("#table").append(createRow(part))
   })
}