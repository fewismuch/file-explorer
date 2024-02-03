import React, {useState} from "react";
import {useDragOver} from "@minoru/react-dnd-treeview";
// @ts-ignore
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const {id, droppable, data, text} = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;
  const [hover, setHover] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  const dragOverProps2 = props.autoExpand? dragOverProps: {}

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const handleAddNode = () => {

    props.onSubmit({
      text: 'test',
      parent: props.node.id,
      droppable: false,
      data: {
        fileType: 1
      }
    })
  }
  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{paddingInlineStart: indent}}
      {...dragOverProps2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            {'>'}
          </div>
        )}
      </div>
      <div>
        {/*<TypeIcon droppable={droppable} fileType={data?.fileType} />*/}
        {data?.fileType}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.textField}
              ${styles.nodeInput}`}
              value={labelText}
              onChange={handleChangeText}
            />
            <button
              className={styles.editButton}
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              ✅
            </button>
            <button className={styles.editButton} onClick={handleCancel}>
              ❎
            </button>
          </div>) : props.node.text}

        {hover && (
          <div style={{display: "flex"}}>
            {
              props.node.droppable ? <button onClick={handleAddNode}>+</button>:null
            }

            <div className={styles.actionButton} onClick={() => props.onDelete(id)}>
              <button> x</button>
            </div>
            <div className={styles.actionButton} onClick={handleShowInput}>
              <button>edit</button>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};
