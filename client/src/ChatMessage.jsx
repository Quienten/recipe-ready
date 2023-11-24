import chef_icon from './chef.png';

function ChatMessage(props) {
    const { text, type} = props.message;

    return (<>
        <div className={`message ${type}`}>
            <img src={chef_icon} className={`chef`}/>
            <p>{text}</p>
        </div>
    </>)
}

export default ChatMessage