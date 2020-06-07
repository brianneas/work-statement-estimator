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
   .done(() => {
      // populate table
   })
   .fail(xhr => {
      // TODO Come up with a message to the user.
      console.log('Error sending data to server.', xhr.responseText)
   })
}

function createRow() {
   const newRow = $('<tr></tr>')
   newRow.addClass(rowClass)

   // Create text cell to input part number
   const newCell = $('<td></td>')
   newCell.attr("contenteditable", true)
   newRow.append(newCell)

   // add part type options
   const partOptions = ['Detail', 'Assembly', 'Module']
   const partSelection = $('<select></select>')

   partOptions.forEach((partType, i) => {
      partSelection.append($('<option></option>').text(partType))
   })

   newRow.append($('<td></td>').append(partSelection))

   // add complexity options
   const complexityOptions = ['Simple', 'Average', 'Complex']
   const complexitySelection = $('<select></select>')

   complexityOptions.forEach((complexityType, i) => {
      complexitySelection.append($('<option></option>').text(complexityType))
   })

   newRow.append($('<td></td>').append(complexitySelection))

   return newRow
}

function addRows() {
   const numberOfAddedRows = $('#numberOfAddedRows').val()

   if (!isNaN(numberOfAddedRows)) {
      for (var i = 0; i < numberOfAddedRows; i++) {
         $("#table").append(createRow())
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