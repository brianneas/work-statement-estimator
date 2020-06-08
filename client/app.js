const rowIdPrefix = 'row_'
const rowClass = 'tableRow'

const buttonIdPrefix = 'button_'
const editButtonClass = 'editButton'

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

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function createRow(part) {
   const newRow = $('<tr></tr>')
   newRow.addClass(rowClass)

   // Create text cell to input part number
   const partNumber = $('<td></td>')
   partNumber.attr("contenteditable", true)

   if (!isEmpty(part)) {
      partNumber.html(part.partNumber)
   }

   newRow.append(partNumber)

   // add part type options
   const partOptions = ['Detail', 'Assembly', 'Module']
   const partSelection = $('<select></select>')

   partOptions.forEach((partType, i) => {
      partSelection.append($('<option></option>').text(partType))
   })

   if (!isEmpty(part)) {
      partSelection.val(part.partType)
   }

   newRow.append($('<td></td>').append(partSelection))

   // add complexity options
   const complexityOptions = ['Simple', 'Average', 'Complex']
   const complexitySelection = $('<select></select>')

   complexityOptions.forEach((complexityType, i) => {
      complexitySelection.append($('<option></option>').text(complexityType))
   })

   if (!isEmpty(part)) {
      complexitySelection.val(part.complexity)
   }

   newRow.append($('<td></td>').append(complexitySelection))

   return newRow
}

function addRows() {
   const numberOfAddedRows = $('#numberOfAddedRows').val()

   if (!isNaN(numberOfAddedRows)) {
      for (var i = 0; i < numberOfAddedRows; i++) {
         $("#table").append(createRow({}))
      }
   } else {
      alert('Invalid Number of Rows Entered')
   }
}

function deleteRow() {
   // Ensure that the table headings are never deleted
   if (($('#table tr').length) > 1) {
      $('#table tr:last').remove()
   }
}

function removeCurrentRow(thisButton) {
   // gets the button id and gets the numerical number of the button from it
   rowNumber = thisButton.id.split('_')[1]
   rowID = rowIdPrefix + rowNumber
   $('#' + rowID).remove()

   renumberRows()
   renumberButtons()
}

function renumberRows() {
   $('tr.' + rowClass).each(function(index) {
      if (index !== 0) {
         $(this).attr('id', rowIdPrefix + index)
      }
   })
}

function renumberButtons() {
   $('button.' + editButtonClass).each(function(index) {
      if (index !== 0) {
         $(this).attr('id', buttonIdPrefix + index)
      }
   })
}

function enableEditMode() {
   const tableRows = $("#table").find('tr')

   tableRows.find("th:first-child").remove()
   tableRows.find("td:first-child").remove()

   $('#addButton').prop("disabled", false)
   $('#deleteButton').prop("disabled", false)

   $('#table').removeClass('editMode')
}

function disableEditMode() {
   $('tr.' + rowClass).each(function(index) {
      if (index === 0) {
         $(this).prepend('<th>Remove</th>')
      } else {
         // add button with an id identifying the row it is on
         const button = $('<button>X</button>').click(function() {
            const thisButton = this
            removeCurrentRow(thisButton)
         })

         button.attr('id', buttonIdPrefix + index)
         button.addClass(editButtonClass)
         $(this).prepend($('<td></td>').append(button))

         // add a row id to each row
         $(this).attr('id', rowIdPrefix + index)
      }
   })

   $('#addButton').prop("disabled", true)
   $('#deleteButton').prop("disabled", true)

   $('#table').addClass('editMode')
}

function editRows() {
   if ($('#table').hasClass('editMode')) {
      enableEditMode()
   } else {
      disableEditMode()
   }
}