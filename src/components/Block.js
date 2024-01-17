// src/components/Block.js
import React, { useState, } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const Block = ({ index, type, content, updateBlockContent, deleteBlock, moveBlock }) => {
  const [isEditing, setEditing] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleToggleEditing = () => {
    setEditing(!isEditing);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBlockContent(index, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="block">
      {type === 'text' ? (
        <div>
          <div className="editing-tools">
            <button onClick={handleToggleEditing}>
              {isEditing ? 'Finish Editing' : 'Edit Text'}
            </button>
          </div>
          {isEditing ? (
            <ReactQuill
              value={content}
              onChange={(value) => updateBlockContent(index, value)}
              modules={modules}
              formats={formats}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      ) : (
        <>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {content && <img src={content} alt="Uploaded" />}
      </>
      )}
      <div className="button-container">
        <button className="delete-btn" onClick={() => deleteBlock(index)}>
          Delete Block
        </button>
        <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="move-btn">
          Move Up
        </button>
        <button onClick={() => moveBlock(index, 'down')} disabled={index === content.length - 1} className="move-btn">
          Move Down
        </button>
      </div>
    </div>
  );
};

export default Block;
