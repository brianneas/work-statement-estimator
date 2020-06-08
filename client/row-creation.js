function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

function createPartNumberEntry(newRow, part) {
   // Create text cell to input part number
   const partNumber = $('<td></td>')
   partNumber.attr("contenteditable", true)

   if (!isEmpty(part)) {
      partNumber.html(part.partNumber)
   }

   newRow.append(partNumber)
}

function createPartTypeEntry(newRow, part) {
   // add part type options
   const partSelection = $('<select></select>')

   partTypes.forEach((partType) => {
      partSelection.append($('<option></option>').text(partType))
   })

   if (!isEmpty(part)) {
      partSelection.val(part.partType)
   }

   newRow.append($('<td></td>').append(partSelection))
}

function createComplexityEntry(newRow, part) {
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
}

function createRow(part) {
   const newRow = $('<tr></tr>')
   newRow.addClass(rowClass)

   createPartNumberEntry(newRow, part)
   createPartTypeEntry(newRow, part)
   createComplexityEntry(newRow, part)

   return newRow
}