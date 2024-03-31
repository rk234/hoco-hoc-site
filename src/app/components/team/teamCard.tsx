export default function TeamCard(props) {
    return (
        <div className="w-48 p-2 pt-6 shadow-md transition duration-300 ease-in-out text-center flex flex-col items-start rounded-lg">
            <div className="flex w-full px-4">
                <div className="w-20 h-20 overflow-hidden rounded-full flex-shrink-0">
                    <img className="object-cover w-full h-full" src={props.image} alt={props.name} />
                </div>
                <div>
                    <p>{props.name}</p>
                    <p>{props.position}</p>
                </div>
            </div>
        </div>
    );
}
