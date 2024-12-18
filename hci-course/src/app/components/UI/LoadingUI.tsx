import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingUI() {
    return (
        <div>
            <FontAwesomeIcon size="xs" icon={faSpinner} spin style={{color: "#ffffff",}} />

        </div>
    );
}