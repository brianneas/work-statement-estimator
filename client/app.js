const rowIdPrefix = 'row_'
const rowClass = 'tableRow'

const buttonIdPrefix = 'button_'
const editButtonClass = 'editButton'

const partTypes = []

function queryPartTypes() {
   $.get('/query-part-types')
      .done(types => {
         types.forEach((type) => {
            partTypes.push(type.partType)
         })
      })
      .fail(xhr => {
         console.log('Error loading part types.', xhr.responseText)
      })
}

$(document).ready(
   queryPartTypes()
)