import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import toast from "react-hot-toast";

declare global {
    interface Window {
        axios: AxiosInstance;
        toast: typeof toast;
    }

    var route: typeof ziggyRoute;
}
