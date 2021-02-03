// TÄHÄN KEKSIÄ MITEN SAIS SeN MAPIN JÄRKEVÄSTI TÄNNE
import React from 'react';

const Filter = (props) => (

    <div>

      <input
        type="text"
        onChange={e => props.setSearch(e.target.value)}
      />

    </div>
        
  )

  export default Filter