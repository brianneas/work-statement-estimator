function addRow() {
   const newRow = $('<tr></tr>')
   const cellsInRow = 3

   for (i = 0; i < cellsInRow; i++) {
      const newCell = $('<td></td>')
      newCell.attr("contenteditable", true)
      newRow.append(newCell)
   }

   $("#table").append(newRow)
}

function deleteRow() {
   // Ensure that the table headings are never deleted
   if (($('#table tr').length) > 1) {
      $('#table tr:last').remove()
   }
}