const Slot =({ index,  candyColor,setObjDragged,setObjReplaced,onDragEnd})=>{
    
const dragStart= (e)=>{

    setObjDragged(e.target)
      }
      const onDrop = (e)=>{
    
        setObjReplaced(e.target)
    
      }

    return (<div className="slot">
      <img
        key={index}
       src={candyColor}
        alt={""}
        data-id={index}
        draggable={true}
        onDragStart={dragStart}
        onDragOver={e=>e.preventDefault()}
        onDragEnter={e=>e.preventDefault()}
        onDragLeave={e=>e.preventDefault()}
        onDrop={onDrop}
        onDragEnd={onDragEnd}

        />
    </div>
    )}
    export default Slot