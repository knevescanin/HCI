import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingUI() {
    return (
        <div className="flex justify-center items-center">
            <FontAwesomeIcon size="2xl" spin icon={faSpinner} color="#4E00AF" />
            {/* Loading... */}
        </div>
    );
}