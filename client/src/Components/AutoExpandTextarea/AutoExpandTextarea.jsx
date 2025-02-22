import React, { useRef, useEffect, useState } from "react";

function AutoExpandTextarea(props) {
    const textareaRef = useRef(null);
    const [text, setText] = useState(props.text);
    const readOnly = props.isReadOnly

    // Function to adjust height dynamically
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height to recalculate
            textarea.style.height = `${textarea.scrollHeight + 20}px`; // Set new height based on content
        }
    };

    useEffect(adjustHeight, [text]); // Adjust height whenever text changes

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="auto-textarea form-control"
            rows={4} // Minimum row height
            readOnly={readOnly}
            placeholder={props.placeholder}
        />
    );
};

export default AutoExpandTextarea;
