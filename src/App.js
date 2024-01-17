
import React, { useState } from 'react';
import Block from './components/Block';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([]);

  const addBlock = (blockType) => {
    const newBlock = { type: blockType, content: '' };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockContent = (index, content) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = content;
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const moveBlock = (currentIndex, direction) => {
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < blocks.length) {
      const updatedBlocks = [...blocks];
      const [movedBlock] = updatedBlocks.splice(currentIndex, 1);
      updatedBlocks.splice(newIndex, 0, movedBlock);
      setBlocks(updatedBlocks);
    }
  };

  return (
    <div className="App">
      <h1>Web-Based Writing Tool</h1>
      {blocks.map((block, index) => (
        <Block
          key={index}
          index={index}
          type={block.type}
          content={block.content}
          updateBlockContent={updateBlockContent}
          deleteBlock={deleteBlock}
          moveBlock={moveBlock}
        />
      ))}
      <div className="button-container">
        <button className="add-btn" onClick={() => addBlock('text')}>
          Add Text Block
        </button>
        <button className="add-btn" onClick={() => addBlock('image')}>
          Add Image Block
        </button>
      </div>
    </div>
  );
}

export default App;
