import React, { useEffect, useState } from "react"

const Toast = ({isShow, setIsShow, message}) =>{

    const toggle = () => {
        setTimeOutState(setTimeout(()=>{
            setIsShow(false);
        }, 3000));
    }
    
    const [timeOutState, setTimeOutState] = useState(0);

    useEffect(() => {
        if(isShow){
            toggle()
        }else{
            clearTimeout(timeOutState);
        }
    }, [isShow]);

    
    const closeBtn = () => {
        setIsShow(false);
    }

    return(

        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:"11"}} >
            <div id="liveToast" className={isShow ? 'toast show' : 'toast hide' } role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                <strong className="me-auto">알림</strong>
                <button onClick={closeBtn} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>

    );
};

export default Toast;