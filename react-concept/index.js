const ChildComponent = (props) => {
    const { name, email } = props;
    return 
    (
        <div>
            <h1>Name: {name}</h1>
            <h1>Email: {email}</h1>
        </div>
    );
};
const ParentComponent = () => {
    return (
        <ChildComponent
            name="Anuj Sharma"
            email="anuj.sharma4105@gmail.com"
        />
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ParentComponent />);