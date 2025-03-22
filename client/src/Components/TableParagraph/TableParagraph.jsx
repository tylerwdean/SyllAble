import React, {useContext} from "react";
import FormContext from "../../Contexts/FormContext";

const TableParagraph = (props) => {
    const { paragraphs, setParagraphs } = useContext(FormContext)

    const currentParagraph = paragraphs.find((para) => para.id === props.id);
    let rows = currentParagraph.rows;
    const oneRow = rows.length == 1;
    const oneCol = rows[0].length == 1;
    const colsFull = rows[0].length > 4;


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
        const colNum = rows[0].length;
        const newRow = new Array(colNum).fill("");
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
        setParagraphRows(rows);
    };

    const updateCell = (newData, row, col) => {
        rows[row][col] = newData;
        setParagraphRows(rows);
    };

    return (
        <>
            <hr/>
            <input type="text" 
            className="form-control form-control-lg mb-3" 
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

            <div className="row mx-0">
                {/* Creating a row of buttons that can delete the current column. Similarly to the rows, will be disabled when it gets to 1*/}
                {rows[0].map((_, index) => {
                    return (
                        <div className="col-sm mx-0 px-0" key={props.id + "-removeCol-" + index}>
                            <button className="btn btn-danger col-1-sm mx-0 px-3"
                            disabled = {oneCol}
                            onClick={(e) => {
                                e.preventDefault();
                                removeCol(index);
                            }}> - </button>
                        </div>
                    )
                })}
                <div className="col-1" id="forSpacingPurposes"></div>
            </div>

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
            }}
            disabled = {colsFull}>
                Add Col
            </button>
            <button className="btn btn-danger col-3 offset-4 mt-3" onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default TableParagraph;