import { useState } from 'react'
import './App.css'
import json from './data.json'

const ListData = ({ list, addNodeToList,deleteNodeFromList ,addFileToList}) => {
  const [isExpanded, setIsExpanded] = useState({})
  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.index}>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {' '}
              {!isExpanded?.[node.name] ? '▸' : '▾'}
            </span>
          )}
          <span>{node.name} </span>
          {node?.isFolder && (
            <><span onClick={() => addNodeToList(node.index)}>
              <img
                className="add-folder"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHS6tLr2_N-wrENchm2pcwO8XH1ye1TEWJ20aXnLcjQBk0idlxWAdjUh7wwlXLuVJ076k&usqp=CAU"
                alt="add"
              ></img>

            <span onClick={() => addFileToList(node.index)}>
                <img
                  className="add-file"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC93j3R-VV5UIPEkhE2hbUzVadybnZNgiQLw&s"
                  alt="add"
                ></img>

              </span></span></>
          )}
          <span onClick={() => deleteNodeFromList(node.index)}>
           <img
                className="delete-folder"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxlKWquCALZn0ICkdexTU_ELaRrCikd2kQA&s"
                alt="add"
              ></img>
              </span>
          {isExpanded?.[node.name] && node?.children && (
            <ListData list={node.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}  addFileToList={addFileToList}/>
          )}
        </div>
      ))}
    </div>
  )
}
function App() {
  const [data, setData] = useState(json)

  const addNodeToList = (parentId) => {

    const name = prompt('Enter name')

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.index === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { index: Date.now().toString(), name: name, isFolder: true, children: [] },
            ],
          }
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) }
        }
        return node
      })
    }
    setData((prev) => updateTree(prev))
    
  }
  const deleteNodeFromList =(itemId)=>
  {
const updateTree =(list)=>
{
return list.filter(node=> node.index !== itemId)
.map((node)=> {
  if(node.children){
    return {...node,children:updateTree(node.children)};
  }
  return node;
});
}
setData(prev => updateTree(prev));

  }
const addFileToList=(parentId)=>
{
  const name = prompt('Enter name')

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.index === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { index: Date.now().toString(), name: name, isFolder: false, children: [] },
            ],
          }
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) }
        }
        return node
      })
    }
    setData((prev) => updateTree(prev))
}

  return (
    <div className="App">
      Folder-Explorer
      <ListData list={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} addFileToList={addFileToList}></ListData>
    </div>
  )
}

export default App
