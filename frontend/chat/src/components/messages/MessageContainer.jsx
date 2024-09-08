import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[650px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-5 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const {authUser} = useAuthContext()
    return (
        <div className='flex items-center justify-center h-full w-full'>
        <div className='flex flex-col items-center justify-center text-center p-4 bg-gray-800 rounded-lg'>
            <p className='text-gray-200 font-semibold text-lg sm:text-xl md:text-2xl mb-2'>
                Welcome 👋{authUser.fullName} to Messenger ❄
            </p>
            <p className='text-gray-200 font-semibold text-sm sm:text-lg md:text-xl mb-4'>
                Select a chat to start messaging
            </p>
            <TiMessages className='text-3xl md:text-6xl' />
        </div>
    </div>
    );
};

