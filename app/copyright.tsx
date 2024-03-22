import "./copyright.css"

function Copyright() {
    return (
        <p className="copyright">Just another blog copyright &copy; {(new Date().getFullYear())} Jurica Migač</p>
    );
}

export default Copyright;