import {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from '@minoru/react-dnd-treeview';
import {SampleData} from './sampleData';
import './App.css';
import {CustomDragPreview} from "./CustomDragPreview.tsx";
// @ts-ignore
import styles from "./App.module.css";
import {CustomNode} from "./CustomNode.tsx";
import {Placeholder} from "./Placeholder.tsx";

const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);

  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  const handleSubmit = (newNode) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);

  };

  return (
    <>
      <div className="app">
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <Tree
            tree={treeData}
            rootId={0}
            enableAnimateExpand
            // render={(node, { depth, isOpen, onToggle }) => (
            //   <div style={{ marginInlineStart: depth * 10 }}>
            //     {node.droppable && (
            //       <span onClick={onToggle}>{isOpen ? '[-]' : '[+]'}</span>
            //     )}
            //     {node.text}
            //   </div>
            // )}
            render={(node, {depth, isOpen, onToggle}) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                onDelete={handleDelete}
                onTextChange={handleTextChange}
                onSubmit={handleSubmit}
              />
            )}
            dragPreviewRender={(monitorProps: any) => (
              <CustomDragPreview monitorProps={monitorProps}/>
            )}
            sort={false}
            insertDroppableFirst={false}
            canDrop={(tree, {dragSource, dropTargetId, dropTarget}) => {
              if (dragSource?.parent === dropTargetId) {
                return true;
              }
            }}
            dropTargetOffset={5}
            placeholderRender={(node, {depth}) => (
              <Placeholder node={node} depth={depth}/>
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              placeholder: styles.placeholderContainer,
              // 放置时目标节点样式
              //dropTarget: styles.dropTarget
            }}
          />
        </DndProvider>
      </div>
      <hr/>
      <div key={2} className="app">
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <Tree
            tree={treeData}
            rootId={0}
            enableAnimateExpand
            render={(node, {depth, isOpen, onToggle}) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                onDelete={handleDelete}
                onTextChange={handleTextChange}
                onSubmit={handleSubmit}
                autoExpand
              />
            )}
            dragPreviewRender={(monitorProps: any) => (
              <CustomDragPreview monitorProps={monitorProps}/>
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              placeholder: styles.placeholderContainer,
              // 放置时目标节点样式
              dropTarget: styles.dropTarget
            }}
          />
        </DndProvider>
      </div>
    </>
  );
}

export default App;
