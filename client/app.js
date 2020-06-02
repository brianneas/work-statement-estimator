function addRow() {
   const newRow = $('<tr></tr>')

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

   $("#table").append(newRow)
}

function deleteRow() {
   // Ensure that the table headings are never deleted
   if (($('#table tr').length) > 1) {
      $('#table tr:last').remove()
   }
}