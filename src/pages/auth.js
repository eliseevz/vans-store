import React, {useContext, useState} from "react"
import AuthButton from "../components/UI/AuthButton";
import Registration from "../components/Forms/Registration";
import Login from "../components/Forms/Login";
import Logout from "../components/Logout";
import {connect} from "react-redux";
import {AlertContext} from "../context/alert/alertContext";

const Auth = (props) => {

    const {show, hide} = useContext(AlertContext)

    const initState = {
        register: true
    }
    const [state, setState] = useState(initState);

    const buttonsHandler = (event) => {
        if (event.target.id === "REG" && !state.register) {
            setState({register: !state.register})
        }

        if (event.target.id === "LOGIN" && state.register) {
            setState({register: !state.register})
        }
    }

    if (!props.auth.isLogin) {
        console.log("hello")
        return (
            <div className="container mt-5">
                <div className="buttons mb-5">
                    <AuthButton
                        type={"REG"}
                        active={state.register}
                        onClick={(event) => buttonsHandler(event)}
                    >
                        Регистрация
                    </AuthButton>

                    <AuthButton
                        type={"LOGIN"}
                        onClick={(event) => buttonsHandler(event)}
                        active={!state.register}
                    >
                        Войти
                    </AuthButton>
                </div>
                {state.register
                    ? <Registration onSuccessReg={show}/>
                    : <Login/>
                }
            </div>
        )
    } else {
        return <Logout></Logout>
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Auth)