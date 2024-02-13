import React, {useEffect, useRef, useState} from "react";
//import Icon from "file-explorer/FileExplorer/icons";

interface IInput {
  text: string;
  onChange: (val: string, create?: boolean) => void;
  onCancel: (remove?: boolean) => void;
}

export const Input: React.FC<IInput> = (props) => {
  const {text, onChange, onCancel} = props;
  const inputRef = useRef<HTMLInputElement>(null)
  const [labelText, setLabelText] = useState(text);

  const handleChangeText = (e: any) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    if (labelText === '' && text==='') {
      onCancel(true)
      return
    }
    if (labelText === text || labelText.trim() === '') {
      onCancel()
      return
    }
    onChange(labelText, text === '');
  };

  const handleCancel = () => {
    if (text === '' || text === undefined) {
      onCancel(true)
      return
    }
    setLabelText(text);
    onCancel()
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      handleCancel()
    }
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return (
    <div className='inputWrapper file-explorer__node-actions'>
      <input
        ref={inputRef}
        className={`textField  nodeInput`}
        value={labelText}
        onChange={handleChangeText}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
      />
      {/*<span onClick={handleSubmit}>
        <Icon name='check'/>
      </span>
      <span onClick={handleCancel}>
        <Icon name='close'/>
      </span>*/}
    </div>
  )

}
