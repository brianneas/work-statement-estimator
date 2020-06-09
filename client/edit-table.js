const rowIdPrefix = 'row_'
const rowClass = 'tableRow'

const buttonIdPrefix = 'button_'
const editButtonClass = 'editButton'

function createEmptyRow() {
   $("#table").append(createRow({}))
}

function addRows() {
   const numberOfAddedRows = $('#numberOfAddedRows').val()

   if (!isNaN(numberOfAddedRows)) {
      if (numberOfAddedRows === "") {
         createEmptyRow() // create a row even if there is a blank
      } else {
         for (var i = 0; i < numberOfAddedRows; i++) {
            createEmptyRow()
         }
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

function clearRows() {
   // remove all but the line with headers
   $('tr').each(function (index) {
      if (index !== 0) {
         $(this).remove()
      }
   })
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