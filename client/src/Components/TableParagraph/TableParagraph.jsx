import React, {useContext, useState} from "react";
import FormContext from "../../Contexts/FormContext";

const TableParagraph = (props) => {
    const [paragraphs, setParagraphs] = useContext(FormContext);

    const currentParagraph = paragraphs.find((para) => para.id === props.id);
    let rows = currentParagraph.rows;

    const setTitle = (newTitle) => {
        const updatedParagraph = paragraphs.map((para) => para.id === props.id ? {...para, title: newTitle} : para);
        setParagraphs(updatedParagraph);
    }

    const setParagraghRows = (rows) => {
        setParagraphs((prev) => {
            return prev.map((para) => 
                para.id === currentParagraph.id ? {...para, rows} : para
            )
        })
    }

    const addRow = () => {
        const colNum = rows[0].length;
        const newRow = newArray(colNum).fill("");
        rows = [...rows, newRow];
        setParagraphRows(rows);
    };

    const addCol = () => {
        rows = rows.map((row) => [...row, ""]);
        setParagraphRows(rows);
    };

    const removeRow = (rowIndex) => {
        rows = rows.filter((row, index) => index != rowIndex);
        setParagraphRows(rows);
    };

    const removeCol = (colIndex) => {
        rows = rows.map((row) => row.filter((_, index) => index != colIndex));
        setParagraghRows(rows);
    };

    const updateCell = (newData, row, col) => {
        rows[row][col] = newData;
        setParagraghRows(rows);
    };

    return (
        <>
            <input type="text" 
            className="form-control" 
            placeholder="Title (Optional)" 
            value={currentParagraph?.title || ""} 
            onChange={setTitle(e.target.value)}/> 
            {rows.map((row, rowIndex) => {
                return (
                    <div className="row"
                    key = {props.id + "-row-" + rowIndex}
                    >
                        {row.map((cell, cellIndex) => {
                            return (
                                <input 
                                key = {props.id + "cell-" + rowIndex + "-" + cellIndex}
                                className="form-control col-2"
                                value={cell}
                                onChange={updateCell(e.targetValue, rowIndex, cellIndex)}
                                />
                            )
                        })}
                        <button
                        className="btn btn-danger"
                        onClick={removeRow(rowIndex)}
                        >-</button>
                    </div>
                )
            })}
        </>
    )
}

export default TableParagraph;