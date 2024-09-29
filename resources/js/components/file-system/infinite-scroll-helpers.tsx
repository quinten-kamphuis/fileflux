import { Spinner } from '../spinner';

export const InfiniteLoader = () => {
    return (
        <div className="flex w-full items-center justify-center gap-2 py-24">
            <p>Loading...</p>
            <Spinner />
        </div>
    );
};

export const InfiniteEnd = () => {
    return <div className="w-full py-24"></div>;
};
