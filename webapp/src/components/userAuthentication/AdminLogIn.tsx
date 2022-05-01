import {Component} from "react";
import {RouteComponentProps} from "react-router-dom";
import { Formik, Field, Form } from "formik";
import AuthService from "../../helpers/authService";


interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    username: string,
    password: string,
    loading: boolean
};

export default class AdminLogin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false
        };
    }

    handleLogin(formValue: { username: string; password: string }) {
        const {username, password} = formValue;

        this.setState({
            loading: true
        });


        AuthService.login(username, password).then(
            () => {
                this.props.history.push("/admin/panel");
                window.location.reload();
            },
            error => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                this.setState({
                    loading: false
                });
            }
        );
    }

    render() {
        const { loading } = this.state;

        const initialValues = {
            username: "",
            password: "",
        };

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.handleLogin}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control" />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    }
}