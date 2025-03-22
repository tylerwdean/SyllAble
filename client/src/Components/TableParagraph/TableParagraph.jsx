import React, {useContext} from "react";
import FormContext from "../../Contexts/FormContext";

const TableParagraph = (props) => {
    const { paragraphs, setParagraphs } = useContext(FormContext)

    const currentParagraph = paragraphs.find((para) => para.id === props.id);
    let rows = currentParagraph.rows;
    let oneRow = rows.length == 1

    const setTitle = (newTitle) => {
        const updatedParagraph = paragraphs.map((para) => para.id === props.id ? {...para, title: newTitle} : para);
        setParagraphs(updatedParagraph);
    }

    const setParagraphRows = (rows) => {
        const newParagraphs = paragraphs.map((para) => 
            para.id === props.id ? {...para, rows} : para
        )
        setParagraphs(newParagraphs)
    }

    const addRow = () => {
        console.log("Adding Row", rows)
        const colNum = rows[0].length;
        const newRow = new Array(colNum).fill("");
        rows = [...rows, newRow];
        setParagraphRows(rows);
    };

    const addCol = () => {
        console.log("Adding Col", rows)
        rows = rows.map((row) => [...row, ""]);
        setParagraphRows(rows);
    };

    const removeRow = (rowIndex) => {
        rows = rows.filter((row, index) => index != rowIndex);
        setParagraphRows(rows);
    };

    const removeCol = (colIndex) => {
        rows = rows.map((row) => row.filter((_, index) => index != colIndex));
        setParagraphRows(rows);
    };

    const updateCell = (newData, row, col) => {
        rows[row][col] = newData;
        setParagraphRows(rows);
    };

    return (
        <>
            <input type="text" 
            className="form-control mb-3" 
            placeholder="Title (Optional)" 
            value={currentParagraph?.title || ""} 
            onChange={(e) => setTitle(e.target.value)}/> 
            {rows.map((row, rowIndex) => {
                return (
                    <div
                    className="row mx-0"
                    key = {props.id + "-row-" + rowIndex}
                    >
                        {row.map((cell, cellIndex) => {
                            return (
                                <input 
                                key = {props.id + "cell-" + rowIndex + "-" + cellIndex}
                                className="form-control col-sm"
                                value={cell}
                                onChange={(e) => updateCell(e.targetValue, rowIndex, cellIndex)}
                                />
                            )
                        })}
                        <button
                        className="btn btn-danger col-1 btn-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            removeRow(rowIndex);
                        }}
                        disabled = {oneRow}
                        >-</button>
                    </div>
                )
            })}

            <button className="btn btn-primary col-2 mt-3" onClick={(e) => {
                e.preventDefault();
                addRow();
            }}>
                Add Row
            </button>
            <button className="btn btn-primary col-2 offset-1 mt-3" 
            onClick={(e) => {
                e.preventDefault();
                addCol();
            }}>
                Add Column
            </button>
            <button className="btn btn-danger col-3 offset-4 mt-3" onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default TableParagraph;