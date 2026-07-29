import { Bot } from "lucide-react";
import { useDispatch } from "react-redux";
import { openAI } from "../redux/aiChatSlice";

export default function AIAssistantButton() {

    const dispatch = useDispatch();

    return (
        <button
            type="button"
            onClick={() => dispatch(openAI())}
            aria-label="Open AI Assistant"
            className="
                fixed
                bottom-6
                right-6
                z-[1000]
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                text-white
                shadow-2xl
                ring-4
                ring-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-indigo-500/40
                active:scale-95
            "
        >
            <Bot size={28} />
        </button>
    );
}