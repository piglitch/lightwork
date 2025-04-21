import React, { useState } from 'react';

interface TextEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue = '', onChange }) => {
    const [content, setContent] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setContent(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="text-editor">
            <textarea
                value={content}
                onChange={handleChange}
                className="text-editor__area"
                rows={10}
                cols={50}
            />
        </div>
    );
};

export default TextEditor;