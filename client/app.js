const partTypes = []
const complexityOptions = []

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

function queryComplexityOptions() {
   $.get('/query-complexity-options')
      .done(complexities => {
         complexities.forEach((complexity) => {
            complexityOptions.push(complexity.complexity)
         })
      })
      .fail(xhr => {
         console.log('Error loading part types.', xhr.responseText)
      })
}

$(document).ready(
   queryPartTypes(),
   queryComplexityOptions()
)