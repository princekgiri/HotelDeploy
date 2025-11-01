import { useContext } from "react";
import { noteContext } from "./NoteState/NoteState";

const Alert = () => {
  const { alert, showAlert } = useContext(noteContext);
  if (alert.showAlert=="false"){
    // {console.log("alert.showAlert in alert is in this ",alert.showAlert)};
    return null; }// don’t show when alert is false

  return (<>
    {/* {console.log("alert.showAlert in alert is ",alert.showAlert)} */}
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: alert.type=="Success"?"#0ccd15ff":"#ff4d4d",
        color: "white",
        padding: "14px 28px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontWeight: "600",
        fontSize: "16px",
        letterSpacing: "0.3px",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      {alert.message || "Something happened!"}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        `}
      </style>
    </div>
  </>);
};

export default Alert;
