import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./Modal.scss";

function Modal({ isOpen, title, message, buttons, onClose, onButtonClick }) {
    if (!isOpen) {
        return null;
    }

    // 根據 buttons 陣列來決定顯示哪些按鈕
    const renderButton = (type) => {
        switch (type) {
            case 'confirm':
                return (
                    <Button
                        label="確定"
                        icon="pi pi-check"
                        className="p-button-success p-button"
                        onClick={() => onButtonClick && onButtonClick('confirm')}
                    />
                );
            case 'cancel':
                return (
                    <Button
                        label="取消"
                        icon="pi pi-times"
                        className="p-button-secondary p-button"
                        onClick={onClose}
                    />
                );
            case 'delete':
                return (
                    <Button
                        label="刪除"
                        icon="pi pi-trash"
                        className="p-button-danger p-button"
                        onClick={() => onButtonClick && onButtonClick('delete')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            visible={isOpen}
            header={<p className="modal-header">{title}</p>}
            footer={
                <div className="modal-footer">
                    {buttons.includes('cancel') && renderButton('cancel')}
                    {buttons.includes('confirm') && renderButton('confirm')}
                    {buttons.includes('delete') && renderButton('delete')}
                </div>
            }
            onHide={onClose}
            breakpoints={{ "960px": "50vw", "640px": "60vw" }}
            style={{ width: "50vw", maxWidth: "500px" }}  // 調整視窗大小
            draggable={false}
        >
            <div className="modal-body">{message}</div>
        </Dialog>
    );
}

export default Modal;
