export default function ChatThumb({ name="USER_NAME", img="/assets/icons/user.svg", lastMessage="Last message...", online=false }) {
	return (
		<div onClick={ () => { console.log('click'); } } className="grow flex gap-2 border-2 bg-dark-bg-100 border-dark-bg-300 hover:border-dark-yellow-200 rounded-[5px] m-2 p-1">
			<div><img src={ img } className={ `size-14 object-cover rounded-[5px] border-2 ${online ? "border-dark-primary-200" : "border-dark-secondary-200"}` }/></div>
			<div>
				<div className={ `text-[22px]/[30px] ${online ? "text-dark-primary-200" : "text-dark-secondary-200"}` }>{ name }</div>
				<div className="text-base text-dark-bg-0">{ lastMessage }</div>
			</div>
		</div>
	)
}