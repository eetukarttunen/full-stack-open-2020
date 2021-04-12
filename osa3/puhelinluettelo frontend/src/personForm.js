import React from 'react';
// props.addPerson

const PersonForm = (props) => ( 
<form onSubmit={props.handleHyvaksyminen}> 

        <div>
          name:  
          <input
          type ="text"
          name="name" 
          value={props.name} // täällä asetetaan arvot inputista APP:ille
          onChange={props.handlePersonChange} 
          />
        </div>
        <div>
          number:  
          <input
          type ="text"
          name="number"
          value={props.number}
          onChange={props.handleNumberChange} />

        </div>
  
  
        <div>
          <button 
          type="submit"
          >add</button>
        
        </div>  
    
      </form>
    
  )

export default PersonForm