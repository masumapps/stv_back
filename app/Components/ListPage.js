import React from 'react'
import AddButton from './AddButton'

const ListPage = ({children,path}) => {
  return (
    <div className="bodyWrap">
      <div className="contentOrderWrap clientsTableWrap">
        <div className="leftSide">
          <AddButton path={path} />
          <div className="orderWrap">
       {children}
     
       </div>
        </div>
      </div>
    </div>
  )
}

export default ListPage