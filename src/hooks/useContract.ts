import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";

const useContract = () => {
    const context = useContext(ContractContext);

    if(!context) {
        throw new Error("useContract must be within a ContractProvider");
    }

    return context;
}

export default useContract;