export default function InfoMessage({message}: {message: string}) {
    return (
        <div className="p-5 border text-sm text-gray-600 bg-gray-100 rounded">
            {message}
        </div>
    )
}