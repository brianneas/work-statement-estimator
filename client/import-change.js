const saveChangesButtonId = 'saveChangesButton'

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

function createSaveChangesButton() {
   const saveButton = $("<button></button")
   saveButton.html("Save Changes")
   saveButton.attr('id', saveChangesButtonId)
   saveButton.click(saveChanges)

   return saveButton
}

function saveChanges() {
   $("#changeNumber").attr("disabled", false)
   $("#submitChangeNumberButton").attr("disabled", false)
   $(this).remove()
}

function populateParts(parts) {
   parts.forEach((part, i) => {
      $("#table").append(createRow(part))
   })

   $("#changeNumber").attr("disabled", true)
   $("#submitChangeNumberButton").attr("disabled", true)
   $(".importChange").append(createSaveChangesButton())
}