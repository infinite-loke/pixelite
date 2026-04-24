import { useContext } from "react"
import { InteractionContext } from "../context/InteractionContext"

export const useInteractionPane = () => {
    const interactionContext = useContext(InteractionContext);
    if (!interactionContext) {
        throw new Error("Please use `useInteractionPane` inside of InteractionPane")
    }
    return interactionContext;
}